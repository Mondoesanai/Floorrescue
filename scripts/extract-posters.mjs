// One-off asset prep: extract poster frames from the canonical cinematic clips.
// The build package ships no poster PNGs, and implementation/video-state-machine.md
// explicitly says to fall back to an extracted video frame rather than fail the build.
import { spawnSync } from "node:child_process";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const videoDir = path.join(process.cwd(), "public/assets/video");
const imageDir = path.join(process.cwd(), "public/assets/images");

const jobs = [
  // [source clip, output poster, seek position]
  ["intro floor restoration video.mp4", "00-intro-damaged-start.jpg", "0.1"],
  ["intro floor loop video.mp4", "01-gold-garage-hero.jpg", "0.5"],
  ["intro to commercial video.mp4", "03-commercial-building-in-garage.jpg", "end"],
  ["commercial from skyscraper into lobby.mp4", "04-commercial-ground-floor-lobby.jpg", "end"],
  ["commercial from lobby to entrance.mp4", "05-commercial-final-hero.jpg", "end"],
];

function getDuration(file) {
  const res = spawnSync(ffmpegPath, ["-i", file], { encoding: "utf8" });
  const match = res.stderr.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
  if (!match) return 5;
  const [, h, m, s] = match;
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
}

for (const [src, out, seek] of jobs) {
  const inputFile = path.join(videoDir, src);
  const outputFile = path.join(imageDir, out);
  let seekSeconds = seek;
  if (seek === "end") {
    const duration = getDuration(inputFile);
    seekSeconds = Math.max(0, duration - 0.15).toFixed(2);
  }
  const result = spawnSync(ffmpegPath, [
    "-y",
    "-ss", String(seekSeconds),
    "-i", inputFile,
    "-frames:v", "1",
    "-vf", "scale='min(1920,iw)':-2",
    "-q:v", "4",
    outputFile,
  ]);
  if (result.status !== 0) {
    console.error(`Failed to extract poster for ${src}`);
  } else {
    console.log(`Extracted ${out} @ ${seekSeconds}s`);
  }
}
