import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    threads: true,
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
