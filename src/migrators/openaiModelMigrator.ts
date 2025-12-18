import fs from "fs";
import { ScanResult } from "../rules/types";

export async function migrateOpenAIModels(findings: ScanResult[]) {
  const files = [...new Set(findings.map(f => f.file))];

  for (const file of files) {
    let code = fs.readFileSync(file, "utf8");

    code = code.replace(/gpt-3\.5-turbo/g, "gpt-4.1-mini");

    fs.writeFileSync(file, code, "utf8");
  }
}
