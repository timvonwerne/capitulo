import axios from 'axios';
import chalk from 'chalk';
import fs from 'fs';

const description = async (asin, { region, debug }) => {
  var d = '';
  if (asin) {
    await axios
      .get(`https://api.audnex.us/books/${asin}`, {
        params: {
          region,
        },
      })
      .then((response) => {
        d = response.data.summary.replace(/(<([^>]+)>)/gi, '');

        if (!debug) {
          fs.writeFile(
            `description.txt`,
            d,
            { flag: 'wx' },
            (err) => err && console.error(chalk.red(err))
          );
        } else {
          console.log(d);
        }
      })
      .catch((error) => {
        console.log(error);
        console.error(chalk.red(error.response.data.message));
        process.exit(1);
      });
  } else {
    console.error(chalk.red('No ASIN provided'));
    process.exit(1);
  }
};

export default description;
