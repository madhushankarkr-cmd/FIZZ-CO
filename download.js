const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
  'electric_lime.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPFtv9Qw07qZ9OhnADHhBoBOczMJ013MQReyaO7aPNB-cwakn4ajYZMqLsmKO1YswxP8s7HAkjQqo7FD7fJfFrkxcETBymGPev24I2yI27NM3Eo0Sje0tbcZqESwKwrvXh7P_wWjHxu8qxBL9878igG3EugL8Q48yRzEYAzye9x_4XPdItled67dkZYSlC5boiTZJfxoHSFPaTX_iQkcClt1cfOkAMW2q1fwDm_Op6IYtlNWg5pz9N5eSKj2NPvirzVFjMQ0R2PDk',
  'tropical_mango.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeIVNUHd9iTMur5F5OzXZU6wd2kkalye2nCySCrENogCNr6NNYeSVdigz-jgy_yC3xWEAHadEmEKsv8D3YAiUjBSSVz6V5xpXOA0iVmD1ha9R_xXIgICMe_Ll4l6MGHAzrieb0z1flgco9N5oQEj1zSn7bOAUAf1VjFfXlrprkOMWthWRxFlisPITX3CPU4RGcbetLD2zXhh6sJf7nF2evlLN6e2Y2NY81OELUA-Ph52iS8VmfYtqE5bSXzAJCveg9DNZTpS32mew',
  'zesty_berry.png': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBvAVvzNYoF7zCaa8Gu13l1IdpbllKNhynGSnV-EFrS5Q4hR0o_0n5jijgBE_xH6KDfzwIszn7j5VbYVXQ3Kj-y_T7cNIzkv91Y-e7NdAbEH0w02VFJRcHmXWit-lbonEhsERM1_8sihUOo0RBxHj0HMUjqcUR5lPV4kiWLIggRhvvYdD3CYZbHl7q1IgSgcTbawPVycPuddfTokvomtVNd3dd2HjsuLjbUDuRbyC7U-iqpzf6zHUkA97bYDFx9lenZoyThMUIKh8'
};

function download(filename, url) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(__dirname, 'public', filename));
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename} successfully`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(__dirname, 'public', filename), () => {});
      reject(err);
    });
  });
}

async function main() {
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  for (const [filename, url] of Object.entries(images)) {
    try {
      await download(filename, url);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}

main();
