import fs from "fs";
import path from "path";

export function scanStripeCharges(root: string) {
    const results: { file: string; line: number; code: string }[] = [];

    function walk(dir: string) {
        for (const entry of fs.readdirSync(dir)) {
            const fullPath = path.join(dir, entry);

            if (
                entry === "node_modules" ||
                entry === "dist" ||
                entry.startsWith(".git") ||
                entry === "src" // ignore action source
            ) continue;


            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                walk(fullPath);
            } else if (
                fullPath.endsWith(".js") ||
                fullPath.endsWith(".ts")
            ) {
                const lines = fs.readFileSync(fullPath, "utf8").split("\n");

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
