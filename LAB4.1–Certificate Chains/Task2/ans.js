const { spawnSync } = require("child_process");

const certs = [
  "batman.com.cert",
  "ironman.com.cert",
  "professorX.com.cert",
  "spiderman.com.cert",
  "superman.com.cert",
  "thor.com.cert",
  "wolverine.com.cert",
  "wonder.woman.com.cert",
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

//ans:
// superman -> batman -> professorX RootCA
// ironman -> thor -> spiderman -> professorX RootCA
// wonder woman -> wolverline -> professorX RootCA
