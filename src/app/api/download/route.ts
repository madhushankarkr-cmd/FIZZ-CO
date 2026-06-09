import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import https from "https";

const IMAGES = {
  "electric_lime.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuDPFtv9Qw07qZ9OhnADHhBoBOczMJ013MQReyaO7aPNB-cwakn4ajYZMqLsmKO1YswxP8s7HAkjQqo7FD7fJfFrkxcETBymGPev24I2yI27NM3Eo0Sje0tbcZqESwKwrvXh7P_wWjHxu8qxBL9878igG3EugL8Q48yRzEYAzye9x_4XPdItled67dkZYSlC5boiTZJfxoHSFPaTX_iQkcClt1cfOkAMW2q1fwDm_Op6IYtlNWg5pz9N5eSKj2NPvirzVFjMQ0R2PDk",
  "tropical_mango.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuBeIVNUHd9iTMur5F5OzXZU6wd2kkalye2nCySCrENogCNr6NNYeSVdigz-jgy_yC3xWEAHadEmEKsv8D3YAiUjBSSVz6V5xpXOA0iVmD1ha9R_xXIgICMe_Ll4l6MGHAzrieb0z1flgco9N5oQEj1zSn7bOAUAf1VjFfXlrprkOMWthWRxFlisPITX3CPU4RGcbetLD2zXhh6sJf7nF2evlLN6e2Y2NY81OELUA-Ph52iS8VmfYtqE5bSXzAJCveg9DNZTpS32mew",
  "zesty_berry.png": "https://lh3.googleusercontent.com/aida-public/AB6AXuDBvAVvzNYoF7zCaa8Gu13l1IdpbllKNhynGSnV-EFrS5Q4hR0o_0n5jijgBE_xH6KDfzwIszn7j5VbYVXQ3Kj-y_T7cNIzkv91Y-e7NdAbEH0w02VFJRcHmXWit-lbonEhsERM1_8sihUOo0RBxHj0HMUjqcUR5lPV4kiWLIggRhvvYdD3CYZbHl7q1IgSgcTbawPVycPuddfTokvomtVNd3dd2HjsuLjbUDuRbyC7U-iqpzf6zHUkA97bYDFx9lenZoyThMUIKh8"
};

function download(filename: string, url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  
  try {
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
  } catch (err: any) {
    console.warn("[download/route] Could not access or create public directory (read-only filesystem):", err.message);
    return NextResponse.json({
      success: true,
      warning: "Read-only filesystem detected. Client will use CDN fallbacks.",
      results: []
    });
  }

  const results: string[] = [];

  for (const [filename, url] of Object.entries(IMAGES)) {
    const filePath = path.join(publicDir, filename);
    if (!fs.existsSync(filePath)) {
      try {
        await download(filename, url, filePath);
        results.push(`Downloaded ${filename}`);
      } catch (err: any) {
        console.warn(`[download/route] Failed to write ${filename}: ${err.message}`);
        results.push(`Failed to write ${filename} (falling back to CDN)`);
      }
    } else {
      results.push(`${filename} already exists`);
    }
  }

  return NextResponse.json({ success: true, results });
}
