import { RULES } from "../rules";
import { createPullRequest } from "../pr/github";

export async function runAgent(ctx: {
  migrationType?: string;
  repoPath: string;
  dryRun?: boolean;
}) {
  console.log("🧠 Agent running");
  console.log(`🧪 Dry run: ${ctx.dryRun === true}`);

  const appliedRules = [];

  for (const rule of RULES) {
    if (ctx.migrationType && ctx.migrationType !== rule.id) continue;

    const findings = await rule.scan(ctx.repoPath);

    if (findings.length === 0) {
      console.log(`✅ No issues for rule: ${rule.id}`);
      continue;
    }

    console.log(`⚠️ ${rule.id}: Found ${findings.length} issues`);
    findings.forEach(f =>
      console.log(`${f.file}:${f.line} → ${f.code}`)
    );

    // 🔒 DRY-RUN: do not mutate
    if (ctx.dryRun) {
      appliedRules.push(rule);
      continue;
    }

    const changed = await rule.migrate(findings);
    if (changed) appliedRules.push(rule);
  }

  if (appliedRules.length === 0) {
    console.log("✅ No migrations applicable");
    return;
  }

  // 🧪 DRY-RUN EXIT
  if (ctx.dryRun) {
    console.log("\n🧪 Dry-run summary:");
    appliedRules.forEach(rule => {
      console.log(`• ${rule.id}: ${rule.description}`);
      console.log(`  PR Title: ${rule.pr.title}`);
      console.log(`  Review Notes: ${rule.pr.humanReviewNotes}`);
    });

    console.log("\n❌ No code was changed. No PR created.");
    return;
  }

  // Normal mode — create PR
  const token = process.env.INPUT_GITHUB_TOKEN;
  if (!token) throw new Error("Missing GitHub token");

  const rule = appliedRules[0]; // MVP: one-rule PR

  await createPullRequest(
    token,
    rule.pr.branch,
    rule.pr.title,
    rule.pr.body
  );
}
