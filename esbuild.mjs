import { build } from "esbuild";
import { readFile } from 'fs/promises';
const packageJson = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
);

const banner = `/* Residently SDK v${packageJson.version} */`;

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  sourcemap: true,
  minify: true,
  target: "esnext",
  banner: { js: banner },
};

await Promise.all([
  build({
    ...sharedConfig,
    outfile: "dist/index.cjs.js",
    format: "cjs",
  }),
  build({
    ...sharedConfig,
    outfile: "dist/index.js",
    format: "esm",
  }),
  build({
    ...sharedConfig,
    outfile: "dist/residently.global.js",
    format: "iife",
    globalName: "Residently",
  }),
]);

console.log("Build complete! ✅");
