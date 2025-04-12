import { execa } from "execa";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { select, confirm } from "@inquirer/prompts";

export const nextjs_i = async (packageManager, name) => {
  const wait = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

  try {
    console.log(
      chalk.cyanBright(
        `Preparing Next.js app creation using ${packageManager} for project: ${name}...`,
      ),
    );

    // Ask for all Next.js configuration options
    const useTypeScript = await confirm({
      message: "Would you like to use TypeScript?",
      default: true,
    });

    const useESLint = await confirm({
      message: "Would you like to use ESLint?",
      default: true,
    });

    const useTailwind = await confirm({
      message: "Would you like to use Tailwind CSS?",
      default: true,
    });

    const routerType = await select({
      message: "Which router would you like to use?",
      choices: [
        { name: "App Router (recommended)", value: "app" },
        { name: "Pages Router", value: "pages" },
      ],
      default: "app",
    });

    const useSrcDir = await confirm({
      message: "Would you like to use src/ directory?",
      default: true,
    });

    const useImportAlias = await confirm({
      message: "Would you like to customize the default import alias (@/*)?",
      default: false,
    });

    // Build command and arguments
    let command;
    let args = [];

    if (packageManager === "yarn") {
      command = "yarn";
      args = ["create", "next-app", name];
    } else if (packageManager === "pnpm") {
      command = "pnpm";
      args = ["create", "next-app", name];
    } else if (packageManager === "npx") {
      command = "npx";
      args = ["create-next-app", name];
    } else if (packageManager === "bunx") {
      command = "bunx";
      args = ["create-next-app", name];
    } else {
      console.error(
        chalk.redBright(`Unsupported package manager: ${packageManager}`),
      );
      return;
    }

    // Add flags based on user choices
    if (useTypeScript) args.push("--ts");
    else args.push("--js");

    if (useESLint) args.push("--eslint");
    else args.push("--no-eslint");

    if (useTailwind) args.push("--tailwind");
    else args.push("--no-tailwind");

    if (routerType === "app") args.push("--app");
    else args.push("--pages");

    if (useSrcDir) args.push("--src-dir");
    else args.push("--no-src-dir");

    if (!useImportAlias) args.push("--import-alias", "@/*");

    // Log the full command being executed
    console.log(chalk.blue(`Executing: ${command} ${args.join(" ")}`));

    // Create spinner and execute command
    const spinner = createSpinner("Creating Next.js app...").start();
    await execa(command, args, { stdio: "inherit" });
    spinner.success({ text: `Next.js app "${name}" created successfully!` });

    console.log(chalk.green("\n✨ Project setup complete! ✨"));
    console.log(chalk.yellow(`To get started, run:\n`));
    console.log(chalk.white(`  cd ${name}`));

    // Suggest startup command based on package manager
    let startCmd = "";
    if (packageManager === "yarn") {
      startCmd = "yarn dev";
    } else if (packageManager === "pnpm") {
      startCmd = "pnpm dev";
    } else if (packageManager === "bunx") {
      startCmd = "bun dev";
    } else {
      startCmd = "npm run dev";
    }

    console.log(chalk.white(`  ${startCmd}`));
    console.log(chalk.yellow("\nEnjoy building your Next.js app! 🚀"));
  } catch (error) {
    console.error(chalk.redBright("Failed to create Next.js app."), error);
  }
};
