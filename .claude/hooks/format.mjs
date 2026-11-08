// Claude Code PostToolUse hook: format the file that was just edited or written
// with the project's pinned Prettier (node_modules), so agent output always
// matches `npm run format:check`.
//
// Input: hook JSON on stdin (tool_input.file_path).
// Exit 0: nothing to do or formatted. Exit 2: Prettier failed (e.g. a syntax
// error); stderr is shown to Claude so it can fix the file.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const projectDir = path.resolve(
  process.env.CLAUDE_PROJECT_DIR ?? process.cwd(),
);

let filePath;
try {
  filePath = JSON.parse(readFileSync(0, 'utf8'))?.tool_input?.file_path;
} catch {
  process.exit(0);
}
if (!filePath) process.exit(0);

const target = path.resolve(projectDir, filePath);
const relative = path.relative(projectDir, target);
if (relative.startsWith('..') || path.isAbsolute(relative)) process.exit(0); // outside the project
if (!existsSync(target)) process.exit(0);

const prettier = path.join(
  projectDir,
  'node_modules',
  'prettier',
  'bin',
  'prettier.cjs',
);
if (!existsSync(prettier)) {
  console.error('Prettier is not installed. Run `npm ci` in the repo root.');
  process.exit(0);
}

try {
  execFileSync(
    process.execPath,
    [prettier, '--write', '--ignore-unknown', target],
    {
      cwd: projectDir,
      stdio: ['ignore', 'ignore', 'pipe'],
    },
  );
} catch (error) {
  console.error(
    `Prettier could not format ${relative}:\n${error.stderr?.toString() ?? error.message}`,
  );
  process.exit(2);
}
