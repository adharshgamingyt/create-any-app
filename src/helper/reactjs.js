import { execa } from "execa";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { select, confirm } from "@inquirer/prompts";

export const react_i = async (packageManager, name) => {
  try {
    console.log(
      chalk.cyanBright(
        `Preparing React app creation using ${packageManager} for project: ${name}...`,
      ),
    );

    const useTypeScript = await confirm({
      message: "Would you like to use TypeScript?",
      default: true,
    });

    let command;
    let args = [name];

    if (packageManager === "yarn") {
      command = "yarn";
      args.unshift("create", "react-app");
    } else if (packageManager === "pnpm") {
      command = "pnpm";
      args.unshift("create", "react-app");
    } else if (packageManager === "npx") {
      command = "npx";
      args.unshift("create-react-app");
    } else if (packageManager === "bunx") {
      command = "bunx";
      args.unshift("create-react-app");
    } else {
      console.error(
        chalk.redBright(`Unsupported package manager: ${packageManager}`),
      );
      return;
    }

    if (useTypeScript) {
      args.push("--template", "typescript");
    }

    console.log(chalk.blue(`Executing: ${command} ${args.join(" ")}`));

    const spinner = createSpinner("Creating React app...").start();
    await execa(command, args, { stdio: "inherit" });
    spinner.success({ text: `React app "${name}" created successfully!` });

    console.log(chalk.green("\n✨ Project setup complete! ✨"));
    console.log(chalk.yellow(`To get started, run:\n`));
    console.log(chalk.white(`  cd ${name}`));

    let startCmd = "";
    if (packageManager === "yarn") {
      startCmd = "yarn start";
    } else if (packageManager === "pnpm") {
      startCmd = "pnpm start";
    } else if (packageManager === "bunx") {
      startCmd = "bun start";
    } else {
      startCmd = "npm start";
    }

    console.log(chalk.white(`  ${startCmd}`));
    console.log(chalk.yellow("\nEnjoy building your React app! ⚛️"));
  } catch (error) {
    console.error(chalk.redBright("Failed to create React app."), error);
  }
};
