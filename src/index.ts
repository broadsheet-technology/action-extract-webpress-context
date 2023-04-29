import { getInput, setFailed, setOutput } from "@actions/core";
import { mkdirP } from "@actions/io";
import { appendFile, exists, writeFile, stat } from "fs";
import { dirname, join as joinPath, resolve as resolvePath } from "path";
import { promisify } from "util";

import * as fs from "fs";
import * as path from "path";
import { Config } from "./stencil.config"; // Replace this path with the correct path to the stencil.config.ts file in your repository

const packageJsonPath = path.join(process.cwd(), "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

async function run() {
  try {
    // If the code is not checked out, check it out.
    if (!fs.existsSync(process.cwd() + "/.git")) {
      console.log("Code not checked out, checking out now...");
      await exec(
        "git",
        ["clone", "https://github.com/<username>/<repository>.git", "."],
        { cwd: process.cwd() }
      );
    }

    // Load the Config object from stencil.config.ts
    console.log("Loading stencil.config.ts...");
    const config: Config = require("./stencil.config").Config;

    console.log(config);
    console.log(packageJson);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
