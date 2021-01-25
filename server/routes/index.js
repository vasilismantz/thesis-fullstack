var express = require("express");
var router = express.Router();

var app = express();

var withAuth = require("../withAuth");

/* GET home page. */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

router.get("/checkToken", withAuth.checkToken);

module.exports = router;
