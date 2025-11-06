const shortid = require("shortid");
const URL = require("../models/url");

async function generateShortID(url) {
  const shortID = shortid.generate();

  await URL.create({
    shortID: shortID,
    originalURL: url,
  });

  return shortID;
}

async function findEntry(shortID) {
  const entry = await URL.findOne({ shortID });
  if (!entry) return null;
  return entry.originalURL;
}

module.exports = { generateShortID, findEntry };
