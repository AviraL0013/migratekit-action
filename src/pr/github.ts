import { execSync } from "child_process";
import * as github from "@actions/github";

export async function createPullRequest(
  token: string,
  branchName: string,
  title: string,
  body: string
) {
  const octokit = github.getOctokit(token);
  const { owner, repo } = github.context.repo;

  execSync(`git checkout -b ${branchName}`);
  execSync(`git add .`);
  execSync(`git commit -m "${title}"`);
  execSync(`git push origin ${branchName}`);

  await octokit.rest.pulls.create({
    owner,
    repo,
    title,
    head: branchName,
    base: "main",
    body
  });

  console.log(`🔁 Pull Request created: ${title}`);
}
