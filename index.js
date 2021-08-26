const core = require('@actions/core');

const {
    getSecrets,
    loadJsonConfig
} = require('@keeper-security/secrets-manager-core')

async function run() {
    try {
        const configJson = core.getInput('keeper-secret-config');
        const storage = loadJsonConfig(configJson)
        const {records} = await getSecrets({storage: storage})
        console.log(records)
        core.setOutput("secret", records[0])
    } catch (error) {
        core.setFailed(error.message);
    }
}

core.setOutput("secret2", "bla bla")
run()