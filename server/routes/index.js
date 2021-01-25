var express = require("express");
var router = express.Router();

var withAuth = require("../withAuth");

/* GET home page. */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "build", "index.html"))
  );
}

router.get("/checkToken", withAuth.checkToken);

module.exports = router;
