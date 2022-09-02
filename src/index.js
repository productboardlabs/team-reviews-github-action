const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    core.info(JSON.stringify(github.context.payload.pull_request?.requested_teams));
    core.info(JSON.stringify(github.context.payload.pull_request?.requested_reviewers));
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
