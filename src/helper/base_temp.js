import { execa } from "execa";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

export const nextjs_i = async (packageManager, name = "my-next-app") => {
  const wait = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));
  try {
    console.log(
      chalk.cyanBright(
        `Starting Next.js app creation using ${packageManager} for project: ${name}...`,
      ),
    );
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

    await execa(command, args, { stdio: "inherit" });
    const spinner = createSpinner(
      `Confirming Next.js app installation via ${packageManager}...`,
    ).start();
    await wait(3000);
    spinner.success({ text: `Next.js app "${name}" created successfully!` });
  } catch (error) {
    console.error(chalk.redBright("Failed to create Next.js app."), error);
  }
};
