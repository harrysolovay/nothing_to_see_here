import * as dntShim from "./_dnt.shims.js";
import * as core from "@actions/core";
import * as gh from "@actions/github";
const ctx = gh.context;
console.log({
    actor: dntShim.Deno.env.get("GITHUB_ACTOR"),
    baseRef: dntShim.Deno.env.get("GITHUB_BASE_REF"),
    env: dntShim.Deno.env.get("GITHUB_ENV"),
    eventPath: dntShim.Deno.env.get("GITHUB_EVENT_PATH"),
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
    dntShim.Deno.exit();
}
const manifestPath = core.getInput("manifest");
if (typeof manifestPath !== "string") {
    core.setFailed("");
    dntShim.Deno.exit();
}
console.log({ manifestPath });
//# sourceMappingURL=main.js.map