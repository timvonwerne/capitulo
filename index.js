#! /usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import { chapters, printChapters } from './commands/chapters.js';
import { description, printDescription } from './commands/description.js';

program
  .command('chapters <asin>')
  .option('-r, --region <region>', 'Region to use for the request')
  .action(printChapters);

program
  .command('description <asin>')
  .option('-r, --region <region>', 'Region to use for the request')
  .action(printDescription);

program.parse();
