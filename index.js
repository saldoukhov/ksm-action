const core = require('@actions/core');
const github = require('@actions/github');

const {
    getSecrets,
    localConfigStorage
} = require('@keeper-security/secrets-manager-core')

const getKeeperRecords = async () => {
    const storage = localConfigStorage("config.json")
    const {records} = await getSecrets({storage: storage})
}

try {
    const config = core.getInput('keeper-secret-config');
    console.log(`Config: ${config}`);
    getKeeperRecords().then(x => core.setOutput("secret", x[0]))
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}