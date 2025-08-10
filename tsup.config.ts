import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  dts: {
    entry: "src/index.ts",
    resolve: true,
  },
  clean: true,
  minify: false,
  sourcemap: false,
  target: "es2019",
  skipNodeModulesBundle: true,
  bundle: true,
  splitting: false,
});
