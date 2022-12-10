const http = require("http");
const app = require("./app");
const server = http.createServer(app);

server.listen(5000, () => {
  console.log("Server running on 5000");
});
