import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*@(ts|tsx)"],
  treeshake: true,
  sourcemap: "inline",
  minify: true,
  clean: true,
  dts: true,
  splitting: false,
  format: ["esm"],
  external: ["react", "react-dom", "axios"],
  injectStyle: false,
  loader: {
    ".ts": "ts",
    ".tsx": "tsx",
  },
});
