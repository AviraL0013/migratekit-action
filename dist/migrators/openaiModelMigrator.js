"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateOpenAIModels = migrateOpenAIModels;
const fs_1 = __importDefault(require("fs"));
async function migrateOpenAIModels(findings) {
    const files = [...new Set(findings.map(f => f.file))];
    for (const file of files) {
        let code = fs_1.default.readFileSync(file, "utf8");
        code = code.replace(/gpt-3\.5-turbo/g, "gpt-4.1-mini");
        fs_1.default.writeFileSync(file, code, "utf8");
    }
}
