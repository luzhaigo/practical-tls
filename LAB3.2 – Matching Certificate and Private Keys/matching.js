const { spawnSync } = require("child_process");

const certs = [
  "Blue.cert",
  "Green.cert",
  "Orange.cert",
  "Violet.cert",
  "Yellow.cert",
];

const keys = ["key1.key", "key2.key", "key3.key", "key4.key", "key5.key"];

function execOpenssl(sub, filename) {
  return spawnSync("openssl", [sub, "-in", filename, "-noout", "-modulus"]);
}

const res = {};

certs.forEach((c) => {
  const { stdout } = execOpenssl("x509", c);
  const modulusCert = (stdout + "").trim();

  const key = keys.find((k) => {
    const { stdout } = execOpenssl("rsa", k);
    const keyCert = (stdout + "").trim();

    return modulusCert === keyCert;
  });

  res[c] = key;
});

console.log("key - cert matching\n", res);
