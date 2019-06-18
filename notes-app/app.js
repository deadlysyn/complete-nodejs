const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes.js');

const command = process.argv[2];

// Customize yargs version
yargs.version('1.0.1');

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    console.log(`Title: ${argv.title}`);
    console.log(`Body: ${argv.body}`);
  },
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler() {
    console.log('Removing note');
  },
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler() {
    console.log('Reading note');
  },
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'List notes',
  handler() {
    console.log('Listing notes');
  },
});

yargs.parse();
