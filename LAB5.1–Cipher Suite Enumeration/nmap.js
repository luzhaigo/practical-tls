const fs = require("fs");
const { spawnSync } = require("child_process");

const sites = [
  "null.badssl.com",
  "dh512.badssl.com",
  "rc4.badssl.com",
  "rc4-md5.badssl.com",
  "3des.badssl.com",
  "cbc.badssl.com",
];

function generateCommand(site) {
  return `docker  run --rm instrumentisto/nmap --script ssl-enum-ciphers  -p 443 ${site}`;
}

function getSpawnSyncArgs(s) {
  const [arg0, ...restArgs] = s.split(/\s+/);
  return [arg0, restArgs];
}

sites.forEach((s) => {
  const { stdout } = spawnSync(...getSpawnSyncArgs(generateCommand(s)));

  fs.writeFileSync(`${s}.txt`, stdout);
});
