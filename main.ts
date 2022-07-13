import * as core from "./deps/actions/core.ts";
import { context as ctx } from "./deps/actions/github.ts";
import { parse } from "./deps/yaml.ts";

const eventPath = Deno.env.get("GITHUB_EVENT_PATH")!;

console.log({
  actor: Deno.env.get("GITHUB_ACTOR"),
  baseRef: Deno.env.get("GITHUB_BASE_REF"),
  env: Deno.env.get("GITHUB_ENV"),
  eventPath,
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

console.log("payload yo:", {
  action: ctx.payload.action,
  comment: ctx.payload.comment,
  installation: ctx.payload.installation,
  issue: ctx.payload.issue,
  pr: ctx.payload.pull_request,
  repository: ctx.payload.repository,
  sender: ctx.payload.sender,
});

console.log({
  read: Deno.readTextFileSync(eventPath),
});

const manifestPath = core.getInput("manifest");
if (typeof manifestPath !== "string") {
  core.setFailed("");
  Deno.exit();
}

const manifestRaw = await Deno.readTextFile(manifestPath);
// TODO: check that matches schema
const manifest = parse(manifestRaw, { filename: manifestPath });

// const actor = ctx.actor;

console.log({ manifest });
