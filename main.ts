import * as core from "./deps/actions/core.ts";
import { context as ctx } from "./deps/actions/github.ts";
import { parse } from "./deps/yaml.ts";

function fail(reason: string): never {
  core.setFailed(reason);
  Deno.exit();
}

const manifestPath = core.getInput("manifest");
if (typeof manifestPath !== "string") {
  fail("TODO");
}

console.log({ cwd: Deno.cwd() });

const manifestRaw = await Deno.readTextFile(manifestPath);
// TODO: check that matches schema
const manifest = parse(manifestRaw, { filename: manifestPath });

if (!ctx.payload.repository) {
  fail("TODO");
}

console.log({ manifest });
