"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanOpenAIModels = scanOpenAIModels;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function walk(dir, files = []) {
    for (const entry of fs_1.default.readdirSync(dir)) {
        const fullPath = path_1.default.join(dir, entry);
        const stat = fs_1.default.statSync(fullPath);
        if (stat.isDirectory() && entry !== "node_modules") {
            walk(fullPath, files);
        }
        else if (entry.endsWith(".js") || entry.endsWith(".ts")) {
            files.push(fullPath);
        }
    }
    return files;
}
function scanOpenAIModels(root) {
    const results = [];
    const files = walk(root);
    for (const file of files) {
        const lines = fs_1.default.readFileSync(file, "utf8").split("\n");
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
