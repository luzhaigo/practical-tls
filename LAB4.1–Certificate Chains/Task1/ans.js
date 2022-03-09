const { spawnSync } = require("child_process");

const certs = [
  "brown.net.cert",
  "cyan.net.cert",
  "magenta.net.cert",
  "olive.net.cert",
  "yellow.net.cert",
];

function generateCommand(filename) {
  return `openssl x509 -in ${filename} -noout -issuer`;
}

function getSpawnSyncArgs(s) {
  const [arg0, ...restArgs] = s.split(/\s+/);
  return [arg0, restArgs];
}

certs.forEach((c) => {
  const { stdout } = spawnSync(...getSpawnSyncArgs(generateCommand(c)));
  console.log(`issuser in cert: ${c}`, stdout + "");
});

//ans: brown -> olive -> yellow -> magenta -> cyan <= RootCA
