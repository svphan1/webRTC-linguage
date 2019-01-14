const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Setting public folder as root
app.use(express.static("public"));
// Providing access to node_modules from the client-side
app.use("/scripts", express.static(`${__dirname}/node_modules/`));
// Redirecting all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Your port is on ${port}`));

function notFound(err, req, res, next) {
  res
    .status(404)
    .send({ error: "Not found!", status: 404, url: req.originalUrl });
};

function errorHandler(err, req, res, next) {
  console.error("Error", err);
  const stack = process.env.NODE_ENV !== "production" ? err.stack : undefined;
  res.status(500).send({ error: err.message, stack, url: req.originalUrl });
};
