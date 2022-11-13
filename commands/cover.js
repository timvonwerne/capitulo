import axios from 'axios';
import chalk from 'chalk';
import fs from 'fs';

const cover = async (asin, { region, path, debug }) => {
  var c = '';
  if (asin) {
    await axios
      .get(`https://api.audnex.us/books/${asin}`, {
        params: {
          region,
        },
      })
      .then((response) => {
        c = response.data.image;

        // If the cover URL is not empty, download the cover
        if (c !== '') {
          if (!debug) {
            axios({
              method: 'get',
              url: c,
              responseType: 'stream',
            }).then((response) => {
              response.data.pipe(fs.createWriteStream(path));
            });
          } else {
            console.log(chalk.green('Cover URL: ') + c);
          }
        } else {
          console.error(chalk.red('No cover found'));
          process.exit(1);
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

export default cover;
