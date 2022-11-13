#! /usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import chapters from './commands/chapters.js';
import description from './commands/description.js';
import cover from './commands/cover.js';

program
  .command('chapters <asin>')
  .option('-r, --region <region>', 'Region to use for the request')
  .option(
    '-d, --debug',
    'Setting this flag will prevent the program from writing the chapter list to a file. The output will be printed to the console instead.'
  )
  .action(chapters);

program
  .command('description <asin>')
  .option('-r, --region <region>', 'Region to use for the request')
  .option(
    '-d, --debug',
    'Setting this flag will prevent the program from creating a file. The output will be printed to the console instead.',
    false
  )
  .action(description);

program
  .command('cover <asin>')
  .option('-r, --region <region>', 'Region to use for the request')
  .option(
    '-d, --debug',
    'Setting this flag will prevent the program from creating a file. The output will be printed to the console instead.',
    false
  )
  .action(cover);

program.parse();
