"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateStripeCharges = migrateStripeCharges;
const fs_1 = __importDefault(require("fs"));
function migrateStripeCharges(findings) {
    const touchedFiles = new Set();
    for (const finding of findings) {
        if (touchedFiles.has(finding.file))
            continue;
        const content = fs_1.default.readFileSync(finding.file, "utf8");
        const updated = content.replaceAll("stripe.charges.create", "stripe.paymentIntents.create");
        if (content !== updated) {
            fs_1.default.writeFileSync(finding.file, updated, "utf8");
            touchedFiles.add(finding.file);
            console.log(`✏️ Migrated file: ${finding.file}`);
        }
    }
}
