import * as core from "./deps/actions/core.ts";
import * as gh from "./deps/actions/gh.ts";

const ctx = gh.context;

console.log({
  actor: Deno.env.get("GITHUB_ACTOR"),
  baseRef: Deno.env.get("GITHUB_BASE_REF"),
  env: Deno.env.get("GITHUB_ENV"),
  eventPath: Deno.env.get("GITHUB_EVENT_PATH"),
  context: {
    action: ctx.action,
    actor: ctx.actor,
    api: ctx.apiUrl,
    eventName: ctx.eventName,
    issue: ctx.issue,
    job: ctx.job,
    payload: ctx.payload,
    ref: ctx.ref,
    repo: ctx.repo,
    runId: ctx.runId,
    runNumber: ctx.runNumber,
    serverUrl: ctx.serverUrl,
    workflow: ctx.workflow,
  },
});

const ghToken = core.getInput("github-token");
if (typeof ghToken !== "string") {
  core.setFailed("");
  Deno.exit();
}

const manifestPath = core.getInput("manifest");
if (typeof manifestPath !== "string") {
  core.setFailed("");
  Deno.exit();
}

console.log({ manifestPath });
