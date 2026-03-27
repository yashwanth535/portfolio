import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import VideoLink from "./models/VideoLink.js";
import { extractYouTubeId, fetchYouTubeMeta } from "./utils/youtube.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const mongoUri = process.env.MONGODB_URI;
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

if (!mongoUri) {
  console.error("MONGODB_URI is missing in .env");
  process.exit(1);
}

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get("/api/health", (_, res) => {
  res.json({ ok: true });
});

app.get("/api/yt", async (_, res) => {
  try {
    const links = await VideoLink.find().sort({ createdAt: -1 }).lean();
    res.json({ links });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos.", error: String(error) });
  }
});

app.post("/api/yt", async (req, res) => {
  try {
    const rawUrl = req.body?.url;
    const section = req.body?.section || "watch-now";
    const customTitle = (req.body?.title || "").trim();

    if (!rawUrl) {
      return res.status(400).json({ message: "url is required." });
    }
    if (!["watch-now", "watch-later"].includes(section)) {
      return res.status(400).json({ message: "Invalid section." });
    }

    const videoId = extractYouTubeId(rawUrl);
    if (!videoId) {
      return res.status(400).json({ message: "Invalid YouTube URL or video ID." });
    }

    const metadata = await fetchYouTubeMeta(videoId);
    const normalizedUrl = `https://www.youtube.com/watch?v=${videoId}`;

    const link = await VideoLink.create({
      url: normalizedUrl,
      videoId,
      title: customTitle || metadata.title,
      thumbnailUrl: metadata.thumbnailUrl,
      section,
    });

    res.status(201).json({ link });
  } catch (error) {
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ message: "This video already exists in the selected section." });
    }
    res.status(500).json({ message: "Failed to add video.", error: String(error) });
  }
});

app.patch("/api/yt/:id/section", async (req, res) => {
  try {
    const section = req.body?.section;
    if (!["watch-now", "watch-later"].includes(section)) {
      return res.status(400).json({ message: "Invalid section." });
    }

    const updated = await VideoLink.findByIdAndUpdate(
      req.params.id,
      { section },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Video not found." });
    }
    res.json({ link: updated });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        message: "This video already exists in that section.",
      });
    }
    res.status(500).json({ message: "Failed to move video.", error: String(error) });
  }
});

app.delete("/api/yt/:id", async (req, res) => {
  try {
    const deleted = await VideoLink.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Video not found." });
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove video.", error: String(error) });
  }
});

async function start() {
  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`YT API running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
