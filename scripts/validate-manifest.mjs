import { access, readFile } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(repositoryRoot, "manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const failures = [];
const groupIds = new Set();
const exampleIds = new Set();

if (!isRecord(manifest) || manifest.version !== 1 || !Array.isArray(manifest.groups)) {
  failures.push("manifest.json must contain version 1 and a groups array.");
}

for (const group of Array.isArray(manifest.groups) ? manifest.groups : []) {
  if (!isRecord(group) || !isText(group.id) || !isText(group.title) || !Array.isArray(group.examples)) {
    failures.push("Every group needs non-empty id/title strings and an examples array.");
    continue;
  }
  if (groupIds.has(group.id)) failures.push(`Duplicate group ID: ${group.id}`);
  groupIds.add(group.id);

  for (const example of group.examples) {
    if (!isRecord(example) || ![example.id, example.title, example.summary, example.path, example.filename].every(isText)) {
      failures.push(`Every example in ${group.id} needs id, title, summary, path, and filename strings.`);
      continue;
    }
    if (exampleIds.has(example.id)) failures.push(`Duplicate example ID: ${example.id}`);
    exampleIds.add(example.id);
    if (!isSafePath(example.path)) failures.push(`Unsafe example path: ${example.path}`);
    if (!/\.ee\.(?:js|py)$/.test(example.filename)) failures.push(`Unsupported filename: ${example.filename}`);
    if (example.path.split("/").at(-1) !== example.filename) failures.push(`Filename does not match path: ${example.path}`);

    const resolvedPath = resolve(repositoryRoot, example.path);
    if (relative(repositoryRoot, resolvedPath).startsWith("..")) {
      failures.push(`Example escapes repository root: ${example.path}`);
    } else {
      try {
        await access(resolvedPath);
      } catch {
        failures.push(`Missing example file: ${example.path}`);
      }
    }
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${exampleIds.size} examples in ${groupIds.size} groups.`);
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isSafePath(value) {
  return typeof value === "string" &&
    value === value.trim() &&
    !value.startsWith("/") &&
    !value.includes("\\") &&
    !value.split("/").some((part) => !part || part === "." || part === "..") &&
    [".js", ".py"].includes(extname(value));
}
