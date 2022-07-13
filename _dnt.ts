import * as fs from "https://deno.land/std@0.148.0/fs/mod.ts";
import { build } from "https://deno.land/x/dnt@0.28.0/mod.ts";

const OUT_DIR = "lib";

await fs.emptyDir(OUT_DIR);

await build({
  entryPoints: ["main.ts"],
  outDir: OUT_DIR,
  package: {
    name: "Publish Guard",
    version: "IRRELEVANT",
  },
  scriptModule: false,
  skipSourceOutput: true,
  declaration: false,
  compilerOptions: {
    lib: ["dom"],
    importHelpers: true,
    sourceMap: true,
    target: "ES2021",
  },
  mappings: Object.fromEntries(
    ([
      ["core", "1.9.0"],
      // ["exec", "1.1.1"],
      ["github", "5.0.3"],
    ] as const).map(([name, version]) => {
      return [`./deps/actions/${name}.ts`, {
        name: `@actions/${name}`,
        version,
        peerDependency: true,
      }];
    }),
  ),
  shims: {
    deno: true,
  },
  test: false,
  typeCheck: false,
});

await Deno.remove("lib/.npmignore");
