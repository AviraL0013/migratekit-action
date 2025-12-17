import { runAgent } from "./agent/agent";

async function main() {
  console.log("🚀 MigrateKit action started");

  const migrationType = process.env.INPUT_MIGRATION;

  if (!migrationType) {
    throw new Error("Missing input: migration");
  }

  await runAgent({
    migrationType,
    repoPath: process.cwd()
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
