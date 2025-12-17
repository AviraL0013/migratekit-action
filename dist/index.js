"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agent_1 = require("./agent/agent");
async function main() {
    console.log("🚀 MigrateKit action started");
    const migrationType = process.env.INPUT_MIGRATION;
    if (!migrationType) {
        throw new Error("Missing input: migration");
    }
    await (0, agent_1.runAgent)({
        migrationType,
        repoPath: process.cwd()
    });
}
main().catch(err => {
    console.error(err);
    process.exit(1);
});
