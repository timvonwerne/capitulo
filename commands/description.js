import axios from 'axios';
import chalk from 'chalk';

const description = async (asin, { region }) => {
  var d = '';
  if (asin) {
    await axios
      .get(`https://api.audnex.us/books/${asin}`, {
        params: {
          region,
        },
      })
      .then((response) => {
        // Clean up the description from HTML tags
        d = response.data.summary.replace(/(<([^>]+)>)/gi, '');
      })
      .catch((error) => {
        console.error(chalk.red(error.response.data.message));
        process.exit(1);
      });
  } else {
    console.error(chalk.red('No ASIN provided'));
    process.exit(1);
  }

  return d;
};

const printDescription = async (asin, options) => {
  const d = await description(asin, options);

  if (d !== '') {
    console.log(d);
  }
};

export { description, printDescription };
