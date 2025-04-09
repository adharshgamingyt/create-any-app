#!usr/bin/env node

import fs from "fs";
import path from "path";
import { execa } from "execa";
import { fileURLToPath } from "url";

import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatepath = path.dirname(__dirname, "../template");

console.log(templatepath);
