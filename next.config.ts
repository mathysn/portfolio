import { readFileSync } from "node:fs";
import path from "node:path";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Turbopack only accepts serializable plugin options, so the Shiki theme is
// loaded as plain JSON rather than imported as a module.
const shikiTheme = JSON.parse(
  readFileSync(path.join(process.cwd(), "src/lib/shiki-theme.json"), "utf8"),
);

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter"],
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        { theme: shikiTheme, keepBackground: false, defaultLang: { block: "plaintext" } },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  // Dev only: let tunnels (e.g. `cloudflared tunnel --url localhost:3000`) load the dev assets,
  // otherwise Next blocks them and the page never hydrates on the phone.
  allowedDevOrigins: ["*.trycloudflare.com"],
  // Sources are AVIF: serve AVIF too (WebP fallback), otherwise next/image re-encodes them to WebP.
  images: { formats: ["image/avif", "image/webp"] },
};

export default withMDX(nextConfig);
