import fs from "fs";

type Finding = {
  file: string;
  line: number;
  code: string;
};

export function migrateStripeCharges(findings: Finding[]) {
  const touchedFiles = new Set<string>();

  for (const finding of findings) {
    if (touchedFiles.has(finding.file)) continue;

    const content = fs.readFileSync(finding.file, "utf8");

    const updated = content.replaceAll(
      "stripe.charges.create",
      "stripe.paymentIntents.create"
    );

    if (content !== updated) {
      fs.writeFileSync(finding.file, updated, "utf8");
      touchedFiles.add(finding.file);
      console.log(`✏️ Migrated file: ${finding.file}`);
    }
  }
}
