const router = require("express").Router();
const Bear = require("./bearModel");

router
  .route("/")
  .get((req, res) => {
    Bear.find()
      .then(foundBears => {
        res.status(200).json(foundBears);
      })
      .catch(err => {
        res.status(404).json({ error: err.message });
      });
  })
  .post((req, res) => {
    const newBear = new Bear(req.body);
    newBear
      .save() // this will `insert` a document into the Bear collection
      .then(savedBear => {
        res.status(201).json(savedBear);
      })
      .catch(err => {
        res.status(404).json({ error: err.message });
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    res.status(200).json({ route: "/api/bears/" + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({ status: "please implement DELETE functionality" });
  })
  .put((req, res) => {
    res.status(200).json({ status: "please implement PUT functionality" });
  });

module.exports = router;
