"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanStripeCharges = scanStripeCharges;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function scanStripeCharges(root) {
    const results = [];
    function walk(dir) {
        for (const entry of fs_1.default.readdirSync(dir)) {
            const fullPath = path_1.default.join(dir, entry);
            if (entry === "node_modules" ||
                entry === "dist" ||
                entry.startsWith(".git") ||
                entry === "src" // ignore action source
            )
                continue;
            const stat = fs_1.default.statSync(fullPath);
            if (stat.isDirectory()) {
                walk(fullPath);
            }
            else if (fullPath.endsWith(".js") ||
                fullPath.endsWith(".ts")) {
                const lines = fs_1.default.readFileSync(fullPath, "utf8").split("\n");
                lines.forEach((line, i) => {
                    if (line.includes("stripe.charges.create")) {
                        results.push({
                            file: fullPath,
                            line: i + 1,
                            code: line.trim()
                        });
                    }
                });
            }
        }
    }
    walk(root);
    return results;
}
