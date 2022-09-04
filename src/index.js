const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    const teams = github.context.payload.pull_request?.requested_teams ?? [];

    if (teams.length === 0) {
      core.info('🟢 No teams requested.');

      return;
    }


    core.info(`🔵 ${teams.length} ${teams.length ? 'team' : 'teams'} requested.`);

    core.info(teams);

  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
