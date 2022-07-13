import "./_dnt.polyfills.js";
import * as dntShim from "./_dnt.shims.js";
import * as core from "@actions/core";
import { context as ctx } from "@actions/github";
import { parse } from "./deps/yaml.js";
const eventPath = dntShim.Deno.env.get("GITHUB_EVENT_PATH");
console.log({
    actor: dntShim.Deno.env.get("GITHUB_ACTOR"),
    baseRef: dntShim.Deno.env.get("GITHUB_BASE_REF"),
    env: dntShim.Deno.env.get("GITHUB_ENV"),
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
    read: dntShim.Deno.readTextFileSync(eventPath),
});
const manifestPath = core.getInput("manifest");
if (typeof manifestPath !== "string") {
    core.setFailed("");
    dntShim.Deno.exit();
}
const manifestRaw = await dntShim.Deno.readTextFile(manifestPath);
// TODO: check that matches schema
const manifest = parse(manifestRaw, { filename: manifestPath });
// const actor = ctx.actor;
console.log({ manifest });
//# sourceMappingURL=main.js.map