const { spawnSync } = require("child_process");
const { promisify } = require("util");
const glob = promisify(require("glob"));

function generateCommand(filename) {
  return `openssl x509 -in ${filename} -noout -issuer`;
}

function getSpawnSyncArgs(s) {
  const [arg0, ...restArgs] = s.split(/\s+/);
  return [arg0, restArgs];
}

async function getIssuers() {
  const certs = await glob("*.cert");
  certs.forEach((c) => {
    const { stdout } = spawnSync(...getSpawnSyncArgs(generateCommand(c)));
    console.log(`issuser in cert: ${c}`, stdout + "");
  });
}

getIssuers();

//ans:
// psylocke -> apocalypse ->  magneto -> thanos RootCA
// venom -> bane -> joker -> thanos RootCA
// dark -> magneto -> thanos RootCA
// ultron -> loki -> thanos RootCA
