const express = require("express");
const multer = require("multer");
const { getReceipes, getReceipe, addReceipe, editReceipe, deleteReceipe } = require("../controllers/receipe");

const router = express.Router();

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Routes
router.get("/", getReceipes);
router.get("/:id", getReceipe);
router.post("/", upload.single("file"), addReceipe); // Handle file upload
router.put("/:id", editReceipe);
router.delete("/:id", deleteReceipe);

module.exports = router;
