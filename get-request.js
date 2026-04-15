const http = require("http");

const server = http.createServer((req, res) => {
  // Check if request is GET and URL is /users
  if (req.method === "GET" && req.url === "/users") {
    
    const users = [
      { id: 1, name: "Kiran" },
      { id: 2, name: "Raj" }
    ];

    // Set status and headers
    res.writeHead(200, { "Content-Type": "application/json" });

    // Send response
    res.end(JSON.stringify(users));
  } else {
    // Handle unknown routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
