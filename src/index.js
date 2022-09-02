import * as core from '@actions/core';
import * as github from '@actions/github';

const main = async () => {
  try {
    const { pull_request } = github.context.payload;
    const teams = pull_request?.requested_teams;

    if (!teams ||teams.length === 0) {
      core.info('No team reviews requested.');

      return;
    }

    const token = core.getInput('token');

    if (!token) {
      throw new Error('Token is not available.')
    }
  
    const pullRequestNumber = pull_request?.number;
    const repo = pull_request?.base?.repo?.name;
    const owner = pull_request?.base?.repo?.owner?.login;

    core.debug(`Setting labels for #${pullRequestNumber} in ${owner}/${repo}…`);

    const labels = teams.map(team => `teams/${team.slug}`);

    const octokit = new github.getOctokit(token);
    await octokit.rest.issues.addLabels({
      issue_number: pullRequestNumber,
      labels,
      owner,
      repo
    });

    core.info('Labels added:');
    core.info(labels.map(label => `- ${label}`).join('\n'));
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
