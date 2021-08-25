const core = require('@actions/core');
const github = require('@actions/github');

const {
    getSecrets,
    loadJsonConfig
} = require('@keeper-security/secrets-manager-core')

const getKeeperRecords = async (configJson) => {
    const storage = loadJsonConfig(configJson)
    const {records} = await getSecrets({storage: storage})
    return records[0]
}

try {
    const config = core.getInput('keeper-secret-config');
    console.log(`Config: ${config}`);
    console.log(`Config Length: ${config.length}`);
    const configObj = JSON.parse(config)
    console.log('Config parsed:', configObj);
    getKeeperRecords(config).then(x => core.setOutput("secret", x[0]))
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}