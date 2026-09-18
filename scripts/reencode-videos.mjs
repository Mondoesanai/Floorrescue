import ffmpeg from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const dir = "public/assets/video";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mp4"));

for (const file of files) {
  const inPath = path.join(dir, file);
  const tmpPath = path.join(dir, `__tmp__${file}`);
  const before = fs.statSync(inPath).size;
  console.log(`Re-encoding ${file} (${(before / 1024 / 1024).toFixed(1)}MB)...`);
  execFileSync(ffmpeg, [
    "-y",
    "-i", inPath,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "23",
    "-maxrate", "6M",
    "-bufsize", "10M",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-an",
    tmpPath,
  ], { stdio: ["pipe", "pipe", "pipe"] });
  const after = fs.statSync(tmpPath).size;
  fs.renameSync(tmpPath, inPath);
  console.log(`  -> ${(after / 1024 / 1024).toFixed(1)}MB (${Math.round((1 - after / before) * 100)}% smaller)`);
}
console.log("done");
