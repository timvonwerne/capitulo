#! /usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import chapters from './commands/chapters.js';
import description from './commands/description.js';
import cover from './commands/cover.js';

program
  .version('1.0.0')
  .argument(
    '<asin>',
    'ASIN of the book. To be retrieved from the URL of the book on Audible.'
  )
  .option('-r, --region <region>', 'Region of the book', 'us')
  .option('-p, --path <path>', 'Path to save the files', '')
  .action((asin, options) => {
    chapters(asin, {
      region: options.region,
      path: options.path + '/chapters.txt',
    });

    description(asin, {
      region: options.region,
      path: options.path + '/description.txt',
    });

    cover(asin, {
      region: options.region,
      path: options.path + '/cover.jpg',
    });
  });

program
  .command('chapters <asin>')
  .description('Get the chapters and their timestamps.')
  .option('-r, --region <region>', 'Region to use for the request', 'us')
  .option(
    '-p, --path <path>',
    'Path to save the chapters file to',
    'chapters.txt'
  )
  .option(
    '-d, --debug',
    'Setting this flag will prevent the program from writing the chapter list to a file. The output will be printed to the console instead.'
  )
  .action(chapters);

program
  .command('description <asin>')
  .description('Get the description of the audiobook.')
  .option('-r, --region <region>', 'Region to use for the request', 'us')
  .option(
    '-p, --path <path>',
    'Path to save the file containing the description to',
    'description.txt'
  )
  .option(
    '-d, --debug',
    'Setting this flag will prevent the program from creating a file. The output will be printed to the console instead.',
    false
  )
  .action(description);

program
  .command('cover <asin>')
  .description('Get the cover of the audiobook.')
  .option('-r, --region <region>', 'Region to use for the request', 'us')
  .option('-p, --path <path>', 'Path to save the cover image to', 'cover.jpg')
  .option(
    '-d, --debug',
    'Setting this flag will prevent the program from creating a file. The output will be printed to the console instead.',
    false
  )
  .action(cover);

program.parse();
