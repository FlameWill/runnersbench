#!/usr/bin/env python3
"""Run bench/run.py on a Buildkite hosted queue and fetch its result.

Creates a build of .buildkite/pipeline.yml for the current commit, waits for it,
downloads result.json and adds queue and job times from the Buildkite API.
Needs BUILDKITE_API_TOKEN with the read_builds, write_builds and read_artifacts
scopes, and RUNNER_SPEC with a "buildkite" object naming the organization,
pipeline and queue.
"""

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime

API = "https://api.buildkite.com/v2"
POLL_SECONDS = 15


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def api(path, body=None):
    req = urllib.request.Request(
        path if path.startswith("https://") else f"{API}/{path}",
        data=json.dumps(body).encode() if body is not None else None,
        headers={"Authorization": f"Bearer {os.environ['BUILDKITE_API_TOKEN']}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as e:
        sys.exit(f"Buildkite API {req.get_method()} {req.full_url} failed: {e.code} {e.read().decode()[:500]}")


def download(url):
    # The API redirects to a pre-signed S3 URL, which rejects our Authorization header.
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {os.environ['BUILDKITE_API_TOKEN']}"})
    try:
        urllib.request.build_opener(NoRedirect).open(req, timeout=30)
    except urllib.error.HTTPError as e:
        if e.code not in (301, 302, 303, 307, 308):
            raise
        url = e.headers["Location"]
    with urllib.request.urlopen(url, timeout=60) as resp:
        return json.load(resp)


def seconds_between(start, end):
    if not start or not end:
        return None
    parse = lambda v: datetime.fromisoformat(v.replace("Z", "+00:00"))
    return (parse(end) - parse(start)).total_seconds()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    spec = json.loads(os.environ["RUNNER_SPEC"])
    bk = spec["buildkite"]
    pipeline = f"organizations/{bk['organization']}/pipelines/{bk['pipeline']}"
    env = {k: os.environ[k] for k in ("GITHUB_REPOSITORY", "GITHUB_RUN_ID", "GITHUB_RUN_ATTEMPT", "GITHUB_SHA")}
    build = api(f"{pipeline}/builds", {
        "commit": os.environ["GITHUB_SHA"],
        "branch": os.environ["GITHUB_REF_NAME"],
        "message": f"Benchmark {spec['label']} ({spec['rep']}) for GitHub run {env['GITHUB_RUN_ID']}",
        "env": {**env, "RUNNER_SPEC": json.dumps(spec), "BENCH_QUEUE": bk["queue"]},
    })
    print(f"::notice title=Buildkite build::{build['web_url']}", flush=True)

    while not build.get("finished_at"):
        time.sleep(POLL_SECONDS)
        build = api(f"{pipeline}/builds/{build['number']}")
        print(f"Build {build['number']}: {build['state']}", flush=True)

    job = next((j for j in build["jobs"] if j.get("step_key") == "bench"), None)
    if not job or job.get("state") != "passed":
        sys.exit(f"Benchmark job did not pass (build state {build['state']}): {build['web_url']}")

    artifacts = api(f"{pipeline}/builds/{build['number']}/jobs/{job['id']}/artifacts")
    artifact = next((a for a in artifacts if a["filename"] == "result.json"), None)
    if not artifact:
        sys.exit(f"No result.json artifact on {job['web_url']}")
    result = download(artifact["download_url"])
    result["timing"] = {
        "queue_seconds": seconds_between(job.get("runnable_at"), job.get("started_at")),
        "job_seconds": seconds_between(job.get("started_at"), job.get("finished_at")),
    }
    result["buildkite"] = {"build_url": build["web_url"], "job_url": job["web_url"]}

    os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)
    with open(args.output, "w") as f:
        json.dump(result, f, indent=2)
    print(f"Wrote {args.output}")


if __name__ == "__main__":
    main()
