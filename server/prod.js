// This file configures a web server for testing the production build
// on your local machine.
import chalk from 'chalk';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';

const chalkProcessing = chalk.blue;

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production server...'));

// Run Browsersync
browserSync({
  port: 3000,
  ui: {
    port: 3001,
  },
  server: {
    baseDir: 'build',
  },

  files: [
    'src/*.html',
  ],

  middleware: [historyApiFallback()],
});
