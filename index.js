const core = require('@actions/core');

const {
    getSecrets,
    loadJsonConfig
} = require('@keeper-security/secrets-manager-core')

async function run() {
    try {
        const configJson = core.getInput('keeper-secret-config');
        const secrets = core.getInput('secrets');
        console.log(secrets)
        const storage = loadJsonConfig(configJson)
        const {records} = await getSecrets({storage: storage})
        const record = records.find(x => x.recordUid === 'BediNKCMG21ztm5xGYgNww')
        const value = record.data.fields.find(x => x.type === 'password')
        console.log(value)
        core.setOutput("secret", value)
    } catch (error) {
        core.setFailed(error.message);
    }
}
run()