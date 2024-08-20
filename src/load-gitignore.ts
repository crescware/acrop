import ignore from 'ignore';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export function loadGitignore(dir: string): ReturnType<typeof ignore> {
  const gitignorePath = join(dir, '.gitignore');
  if (existsSync(gitignorePath)) {
    const content = readFileSync(gitignorePath, 'utf-8');
    return ignore().add(content);
  }
  return ignore();
}
