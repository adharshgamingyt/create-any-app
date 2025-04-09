#!usr/bin/env node

import fs from "fs";
import path from "path";
import { execa } from "execa";

import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
