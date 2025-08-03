import { runApp } from "./app/app";

(async function main() {
  try {
    runApp();
  } catch (err) {
    console.error(`app failed to start :`, err);
  }
})();
