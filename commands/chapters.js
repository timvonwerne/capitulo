import axios from 'axios';
import chalk from 'chalk';
import formatTime from '../util/time-formatter.js';

const chapters = async (asin, { region }) => {
  var l = 0;
  var c = [];

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

            l += chapter.lengthMs;
          });
        }
      })
      .catch((error) => {
        console.log(chalk.red(error.response.data.message));
        process.exit(1);
      });

    return c;
  } else {
    console.error(chalk.red('No ASIN provided'));
    process.exit(1);
  }
};

const printChapters = async (asin, options) => {
  const c = await chapters(asin, options);
  if (c !== '') {
    console.log('The following chapters were found:');
    c.forEach((chapter) => {
      console.log(
        `${chalk.bgGray.white(chapter.timestamp)} ${chalk.blue(chapter.title)}`
      );
    });
  }
};

export { chapters, printChapters };
