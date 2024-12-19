import { createServer } from "http";
import { readFileSync } from "fs";

const index = readFileSync("index.html", "utf-8");
const api = readFileSync("data.json", "utf-8");
const data = { age: 5 };
const server = createServer((req, res) => {
  console.log("server started!!");
  res.setHeader("DummyHeader", "DummyValue"); // setting dummy response header

  // Request URL
  console.log(req.url, req.method);
  switch (req.url) {
    // ROUTING
    case "/": {
      res.setHeader("Content-Type", "text/html");
      res.end(index); // response body
      break;
    }
    case "/api":
      res.setHeader("Content-Type", "application/json");
      res.end(api); // response body
      break;
    case "/data":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data)); // response body
      break;
    default:
      res.writeHead(404, "404 Error Page Not Found !!");
      res.end("Page Not Found");
    //Page not Found Error
    //   res.end("Hello World");
  }
});
server.listen(8080);

// HTTP headers - MDN Web Docs :- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
