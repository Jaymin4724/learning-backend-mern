import { createServer } from "http";
import { readFileSync } from "fs";

// Read the files
const indexTemplate = readFileSync("index.html", "utf-8");
const products = JSON.parse(readFileSync("data.json", "utf-8")).products;

const server = createServer((req, res) => {
  console.log("Server started!");
  console.log(req.url, req.method); // Log incoming requests

  // Routing
  switch (true) {
    case req.url === "/": {
      // Serve home page
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Welcome! Visit /product/{id} to view a product.</h1>");
      break;
    }
    case req.url.startsWith("/product/"): {
      // Extract product ID from the URL
      const id = req.url.split("/")[2];
      const product = products.find((p) => p.id === +id);

      if (product) {
        // Render product page with dynamic content
        const productPage = indexTemplate
          .replace("**title**", product.title)
          .replace("**url**", product.thumbnail)
          .replace("**price**", product.price)
          .replace("**rating**", product.rating);

        res.setHeader("Content-Type", "text/html");
        res.end(productPage);
      } else {
        // Product not found
        res.writeHead(404, "Product Not Found");
        res.end("<h1>Product Not Found</h1>");
      }
      break;
    }
    case req.url === "/api": {
      // Serve JSON data
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(products));
      break;
    }
    default: {
      // Handle 404
      res.writeHead(404, "404 Not Found");
      res.end("<h1>Page Not Found</h1>");
    }
  }
});

// Start the server
server.listen(8080, () => {
  console.log("Server is running at http://localhost:8080");
});
