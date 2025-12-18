import fs from "fs";
import path from "path";

export interface ScanResult {
  file: string;
  line: number;
  code: string;
}

function walk(dir: string, files: string[] = []) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && entry !== "node_modules") {
      walk(fullPath, files);
    } else if (entry.endsWith(".js") || entry.endsWith(".ts")) {
      files.push(fullPath);
    }
  }
  return files;
}

export function scanOpenAIModels(root: string): ScanResult[] {
  const results: ScanResult[] = [];
  const files = walk(root);

  for (const file of files) {
    const lines = fs.readFileSync(file, "utf8").split("\n");

    lines.forEach((line, idx) => {
      if (line.includes("gpt-3.5-turbo")) {
        results.push({
          file,
          line: idx + 1,
          code: line.trim()
        });
      }
    });
  }

  return results;
}
