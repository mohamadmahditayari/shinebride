import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  ...defineCloudflareConfig(),
  buildCommand: "next build",
};

export default config;