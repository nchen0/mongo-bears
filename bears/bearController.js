const router = require("express").Router();
const Bear = require("./bearModel");

router.get("/", async (req, res) => {
  try {
    const foundBears = await Bear.find();
    res.status(200).json(foundBears);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
  /* Promise way.
  Bear.find()
  .then(foundBears => {
    res.status(200).json(foundBears);
  })
  .catch(err => {
    res.status(404).json({ error: err.message });
  });*/
});

router.post("/", (req, res) => {
  const newBear = new Bear(req.body);
  newBear
    .save() // this will `insert` a document into the Bear collection
    .then(savedBear => {
      res.status(201).json(savedBear);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

// Different syntax of routes:

// The two checks for below are because the 1st (outside catch), checks if the objectID is valid, not if it exists, because if it's valid it'll return a success either way even if it doesn't exist.
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const singleBear = await Bear.findById(req.params.id);
      if (singleBear) {
        res.status(200).json(singleBear);
      } else {
        res.status(400).json("Not found by ID");
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id) // This funciton is a mongoose function.
      .then(bear => {
        if (bear) {
          res.status(200).json(bear);
        } else {
          res.status(400).json("Not found by ID");
        }
      })
      .catch(err => res.status(500).json(err.message));
  })
  .put(async (req, res) => {
    const { id } = req.params;

    if (!req.body.species && !req.body.latinName) {
      return res.status(400).json("Please put something in the body to change.");
    }
    try {
      const newBear = await Bear.findByIdAndUpdate(id, req.body);
      if (newBear) {
        res.status(200).json(newBear);
      } else {
        res.status(404).json("Not found by ID");
      }
    } catch (err) {
      res.status(400).json(err.message);
    }
  });

module.exports = router;
