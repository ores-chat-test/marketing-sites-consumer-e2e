import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("loads the reviewed production component from the main organization", async () => {
  const html = await read("site/index.html");
  assert.match(html, /https:\/\/ores-chat\.github\.io\/components\/v1\/ores-chat-footer-link\.js/);
  assert.equal((html.match(/<ores-chat-footer-link/g) ?? []).length, 2);
  assert.equal((html.match(/mode="dialog"/g) ?? []).length, 2);
});

test("keeps marketing contexts independent", async () => {
  const [html, worker] = await Promise.all([
    read("site/index.html"),
    read("site/mock-api-worker.js"),
  ]);
  for (const context of ["main-marketing", "partner-marketing"]) {
    assert.match(html, new RegExp(`context-id="${context}"`));
    assert.match(worker, new RegExp(`"${context}"`));
  }
  assert.match(html, /ores-chat-test\.github\.io\/marketing-sites-consumer-e2e\/mock-api\//);
});

test("labels deterministic responses and contains no credential material", async () => {
  const source = `${await read("site/index.html")}\n${await read("site/mock-api-worker.js")}`;
  assert.match(source, /deterministic/i);
  assert.match(source, /This fixture is not a production model endpoint/);
  assert.doesNotMatch(source, /authorization\s*:/i);
  assert.doesNotMatch(source, /bearer\s+[a-z0-9]/i);
  assert.doesNotMatch(source, /api[_-]?key\s*[:=]/i);
});

test("uses no React-family source", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  assert.equal(packageJson.dependencies, undefined);
  assert.equal(packageJson.devDependencies, undefined);
  const html = await read("site/index.html");
  assert.doesNotMatch(html, /react(?:-dom)?|next\.js|\.tsx|\.jsx/i);
});
