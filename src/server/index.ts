#!/usr/bin/env node
import "regenerator-runtime/runtime";
import * as path from "path";
import { register } from "ts-node";
import express from "express";

async function readTheme(themeFilePath: string) {
  const absoluteThemePath = path.join(process.cwd(), themeFilePath);
  register({
    project: path.join(__dirname, "tsconfig.theme.json"),
    dir: path.basename(absoluteThemePath),
  });
  const module = await import(absoluteThemePath);
  return module.default ?? module.theme;
}

/**
 * Reads the theme file, generates the typings interface and prints it to stdout
 */
async function run() {
  const themeFile =
    process.argv[2] || path.join(__dirname, "..", "src", "theme.ts");

  if (themeFile === "--help") {
    process.stdout.write(`
Chakra UI Theme Explorer
    
Example call:
    npx chakra-ui-theme-explorer path/to/your/theme.ts
`);
    process.exit(0);
  }

  if (!themeFile) {
    throw new Error("No path to theme file provided.");
  }

  const theme = await readTheme(themeFile);
  const port = process.env.PORT || 3333;

  const app = express();
  app.get("/theme", (_, res) => {
    res.json(theme);
  });

  app.use(express.static(path.join(__dirname, "..", "example", "dist")));

  const server = app.listen(port, () => {
    const address = server.address();
    const host =
      typeof address === "string"
        ? address
        : `${
            address?.address && address.address !== "::"
              ? address.address
              : "localhost"
          }:${address?.port}`;

    process.stdout.write(
      `Serving chakra UI theme at http://${host}/local.html`
    );
  });
}

run().catch((e) => {
  process.stderr.write(e.message);
  process.exit(1);
});
