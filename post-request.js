const http = require("http");

let users = [
  { id: 1, name: "Kiran" },
  { id: 2, name: "Raj" }
];

let nextId = 3;

const server = http.createServer((req, res) => {

  // ✅ GET /users
  if (req.method === "GET" && req.url === "/users") {

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));

  }

  // ✅ POST /users
  else if (req.method === "POST" && req.url === "/users") {

    let body = "";

    // collect incoming data
    req.on("data", chunk => {
      body += chunk.toString();
    });

    // when all data is received
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);

        // validation
        if (!parsed.name) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Name is required" }));
        }

        // create new user
        const newUser = {
          id: nextId++,
          name: parsed.name
        };

        users.push(newUser);

        // response
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newUser));

      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });

  }

  // ❌ unknown route
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }

});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
