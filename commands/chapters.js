import axios from 'axios';
import chalk from 'chalk';
import formatTime from '../util/time-formatter.js';
import fs from 'fs';

const chapters = async (asin, { region, path, debug }) => {
  var l = 0;
  var c = [];
  var cf = '';

  if (asin) {
    await axios
      .get(`https://api.audnex.us/books/${asin}/chapters`, {
        params: {
          region,
        },
      })
      .then((response) => {
        if (response.data.chapters.length > 0) {
          response.data.chapters.forEach((chapter) => {
            c.push({
              title: chapter.title,
              timestamp: formatTime(l),
            });

            cf += `${formatTime(l)} ${chapter.title}`;

            // If the chapter is not the last chapter, add a new line
            if (
              response.data.chapters.indexOf(chapter) !==
              response.data.chapters.length - 1
            ) {
              cf += '\n';
            }

            l += chapter.lengthMs;
          });
        }
      })
      .catch((error) => {
        console.log(chalk.red(error.response.data.message));
        process.exit(1);
      });

    if (!debug) {
      fs.writeFile(
        path,
        cf,
        { flag: 'wx' },
        (err) => err && console.error(chalk.red(err))
      );
    } else {
      printChapters(c);
    }
  } else {
    console.error(chalk.red('No ASIN provided'));
    process.exit(1);
  }
};

const printChapters = async (chapters) => {
  if (chapters.length > 0) {
    console.log('The following chapters were found:');
    chapters.forEach((chapter) => {
      console.log(
        `${chalk.bgGray.white(chapter.timestamp)} ${chalk.blue(chapter.title)}`
      );
    });
  }
};

export default chapters;
