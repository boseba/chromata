import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
      all: true,
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/index.ts", // si tu ne veux pas forcer 100% sur des barils
        "src/**/types/**",
      ],
    },
  },
});
