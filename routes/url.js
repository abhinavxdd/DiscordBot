const express = require("express");
const router = express.Router();
const { findEntry } = require("../controllers/url");

router.get("/:shortID", async function (req, res) {
  const id = req.params.shortID;

  try {
    const entry = await findEntry(id);

    if (!entry) {
      return res.status(404).send("Short URL not found!");
    }

    return res.redirect(entry);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

module.exports = router;
