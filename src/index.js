#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import chalk from "chalk";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import gradient, { mind } from "gradient-string";
import {
  input,
  select,
  checkbox,
  confirm,
  expand,
  editor,
  number,
  rawlist,
} from "@inquirer/prompts";
import { nextjs_i } from "./helper/base_temp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const templatePath = path.join(projectRoot, "templates");

const templates = fs.readdirSync(templatePath);
const extra = fs.readdirSync(path.join(templatePath, "extra"));

export const main = async () => {
  const wait = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

  figlet("Create Any App", (err, data) => {
    if (err) {
      console.error("Something went wrong...", err);
      return;
    }
    console.log(mind(data));
  });

  await wait(250);

  const platform = await select({
    message: chalk.blue("Select the platform you want your app to work on:"),
    choices: [
      {
        name: "🌐 Web",
        value: "website",
        description: "A web-only application.",
      },
      {
        name: "📱 Mobile",
        value: "mobile",
        description: "A mobile-only application.",
      },
      {
        name: "💻 Desktop",
        value: "desktop",
        description: "A desktop-only application.",
      },
      {
        name: "🌐📱 Web and mobile application",
        value: "web-mobile",
        description: "A web and mobile application.",
      },
    ],
  });

  const useDefaultTemplates = await select({
    message: chalk.yellow(
      "Do you want to use default templates? (Choosing 'No' allows for more advanced options like database integration later.)",
    ),
    choices: [
      {
        name: "Yes",
        value: "yes",
        description: "Use basic templates provided.",
      },
      {
        name: "No",
        value: "no",
        description: "Explore templates with more features (recommended).",
      },
    ],
  });

  if (platform === "website") {
    if (useDefaultTemplates === "yes") {
      const frameworks = [
        "Next.js",
        "React.js",
        "Vue.js",
        "Angular",
        "Svelte.js",
      ];
      const frameworkColors = {
        "Next.js": chalk.black,
        "React.js": chalk.blue,
        "Vue.js": chalk.yellow,
        Angular: chalk.red,
        "Svelte.js": chalk.magenta,
      };

      const framework = await select({
        message: chalk.cyan("Select the framework you want to use:"),
        choices: frameworks.map((fw) => ({
          name: frameworkColors[fw](fw),
          value: fw.toLowerCase(),
        })),
      });

      if (framework === "next.js") {
        const packageManagers = [
          {
            name: chalk.red("npm"), // npm uses a red logo
            value: "npx",
          },
          {
            name: chalk.hex("#2C8EBB")("yarn"), // yarn uses a blue color (#2C8EBB)
            value: "yarn",
          },
          {
            name: chalk.hex("#F69220")("pnpm"), // pnpm uses orange (#F69220)
            value: "pnpm",
          },
          {
            name: chalk.hex("#FBF0DF")("bun"), // bun uses a light beige/cream color (#FBF0DF)
            value: "bunx",
          },
        ];

        const packageManager = await select({
          message: chalk.red("Select the package manager you want to use:"),
          choices: packageManagers,
        });

        const name = await input({
          message: chalk.green("Enter the name of your app:"),
        });

        const spinner = createSpinner("Redirecting to Next.js CLI...").start();
        await wait(1000);
        spinner.success({ text: "Next.js app creation will start!" });
        nextjs_i(packageManager, name);
      } else {
        console.log(
          chalk.greenBright(
            `You selected ${framework}. Default template setup for this framework is not yet implemented.`,
          ),
        );
      }
    } else {
      console.log(
        chalk.greenBright(
          "You chose to explore templates with more features. This functionality is under development.",
        ),
      );
    }
  } else {
    console.log(
      chalk.greenBright(
        `Template creation for ${platform} is not yet implemented.`,
      ),
    );
  }
};

main();
