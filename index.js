#! /usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import { chapters, printChapters } from './commands/chapters.js';
import description from './commands/description.js';

program
  .command('chapters <asin>')
  .option('-r, --region <region>', 'Region to use for the request')
  .action(printChapters);

program
  .command('description <asin>')
  .option('-r, --region <region>', 'Region to use for the request')
  .option(
    '-d, --debug',
    'Setting this flag will prevent the program from creating a file. The output will be printed to the console instead.',
    false
  )
  .action(description);

program.parse();
