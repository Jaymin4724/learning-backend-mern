import express from "express";
import morgan from "morgan";
const server = express();

// ------------------------------------------------------------------------------
// (1)Application Level Middleware
// Custom Logger - it creates an log for each requests and response (it contains various informations/logs related to req and res)
// server.use((req, res, next) => {
//   console.log(
//     req.method,
//     req.ip,
//     req.hostname,
//     new Date(),
//     req.get("User-Agent")
//   );
//   next();
// });

// ------------------------------------------------------------------------------
// (4)Third-party Middleware - For example, HTTP request logger - morgan.
server.use(morgan("tiny"));
// server.use(morgan("dev"));
// server.use(morgan("default")); // deprecated

// ------------------------------------------------------------------------------
// (3)Built-in Middleware
server.use(express.json()); // BodyParser
server.use(express.static("public"));
// server.use(express.urlencoded()); → we will learn it later in forms

// ------------------------------------------------------------------------------
// (2)Authentication Middleware (Router Level)
const auth = (req, res, next) => {
  // console.log(req.query);
  // if (req.query.password == "123")
  if ((req.body.password = "123")) {
    next();
  } else {
    res.status(401).send("Unauthorized User"); // Authentication Failed
  }
};

// ------------------------------------------------------------------------------
// Creating APIs/EndPoints for same Routes (but Different METHODS) :
server.get("/", (req, res) => {
  res.json({ type: "get" });
});
// with Auth Middleware
server.post("/", auth, (req, res) => {
  res.json({ type: "post" });
});
server.put("/", (req, res) => {
  res.json({ type: "put" });
});
server.delete("/", (req, res) => {
  res.json({ type: "delete" });
});
server.patch("/", (req, res) => {
  res.json({ type: "patch" });
});

// server.get("/", (req, res) => {
//  res.send("hello");
// (1)Sends data of any type (string, buffer, object, array, etc.).
// (1)Automatically sets the Content-Type based on the data type.
// (1)Converts objects/arrays to JSON if necessary.
// ------------------------------------------------------------------------------
// res.sendStatus(404);
// (2)for sending only status code
// ------------------------------------------------------------------------------
// res.status(404).send('Sorry, we cannot find that!');
// (2)for sending status code with html body
// ------------------------------------------------------------------------------
// res.json({ message: "Hello" });
// (3)Always sends JSON
// (3)Explicitly sends JSON data.
// (3)Ensures the Content-Type is always application/json.
// (3)Converts objects/arrays into JSON format if not already.
// });

server.listen(8080, () => {
  console.log("Server Started at http://localhost:8080/");
});
