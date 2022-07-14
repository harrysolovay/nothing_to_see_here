import "./_dnt.polyfills.js";
import * as dntShim from "./_dnt.shims.js";
import * as core from "@actions/core";
import { context as ctx } from "@actions/github";
import { parse } from "./deps/yaml.js";
function fail(reason) {
    core.setFailed(reason);
    dntShim.Deno.exit();
}
const manifestPath = core.getInput("manifest");
if (typeof manifestPath !== "string") {
    fail("TODO");
}
console.log({ cwd: dntShim.Deno.cwd() });
const manifestRaw = await dntShim.Deno.readTextFile(manifestPath);
// TODO: check that matches schema
const manifest = parse(manifestRaw, { filename: manifestPath });
if (!ctx.payload.repository) {
    fail("TODO");
}
console.log({ manifest });
//# sourceMappingURL=main.js.map