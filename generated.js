// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const ghToken = Deno.env.get("GITHUB_TOKEN");
const repo = Deno.env.get("REPO");
console.log({
    ghToken,
    repo
});
