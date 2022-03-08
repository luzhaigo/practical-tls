const https = require("https");
const fs = require("fs");

const port = 4000;

const server = https.createServer(
  {
    key: fs.readFileSync("./bilbo.com.key"),
    cert: fs.readFileSync("./bilbo.com.cert"),
  },
  (req, res) => {
    res.end("hello world");
  }
);

server.listen(port, () => {
  https.get(
    `https://localhost:${port}`,
    {
      // rejectUnauthorized: false,
      ca: fs.readFileSync("./RootCA/ca.cert"),
    },
    (res) => {
      res.on("data", (chunk) => {
        console.log(chunk + "");
      });
    }
  );
});
