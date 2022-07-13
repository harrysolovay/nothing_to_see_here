// import $ from "https://raw.githubusercontent.com/dsherret/ax/1893a76986a67cf22bc1d5ff135d794b4af36492/mod.ts";
import * as dntShim from "./_dnt.shims.js";
const ghToken = dntShim.Deno.env.get("GITHUB_TOKEN");
const repo = dntShim.Deno.env.get("REPO");
// console.log({ $ });
console.log({ ghToken, repo });
//# sourceMappingURL=main.js.map