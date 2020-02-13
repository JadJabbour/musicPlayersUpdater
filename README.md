# Music Player Component Updater

## -- Introduction

This CLI tool's purpose is to update music players' components based on a CSV file of MAC addresses to update.

## -- For Users

### - Building the tool for your OS (Advanced users)

After cloning the repository, run the following commands.

``` 
. cd musicplayerupdater/
. npm install 
. npm install -g pkg (required for packaging CLI tool for host OS)
. npm run package
```

After running the above, the packaged CLI tool for your host OS could be found under the bin/ folder.
run "./musicplayerupdater --help" for instructions.

### - Downloading packaged CLI tool for your host OS

Just go to our repository's bin/ folder (coming soon).

## -- For Developers

### - Getting started

After cloning the repository, run the following commands.

``` 
. cd musicplayerupdater/
. npm install 
. npm install -g pkg (required for packaging CLI tool for host OS)
. npm install -g typedoc (required for generating documentation from comments)
```

### - Run Dev

To use the tool in dev mode, run "npm run dev".
This will also launch a watcher on changes under src/ to automatically re-run.

Actual command running: ts-node-dev --respawn src/index.ts --file csv/input.csv.

### - Running tests 

To run jest tests, run "npm run test".
The .spec.ts files can be found under the test/ folder.

Actual command running: jest --outputFile=testResults.json --json.

### - Building Typescript to JS 

To build the typescript files into JS with .d.ts files run "npm run build".
The output can be found under the dist/ folder.

Actual command running: tsc.

### - Documentation 

Developer documentation can be found under the docs/ folder.
"typedoc" is used to generate documentation from the comments and code.

To generate new or to update documentations run "npm run docs".
This will lint the code and generate new documentation under docs/ folder.

Actual command running: typedoc --out docs src.

### - Packaging for host OS

To create a packaged (one file executable) CLI tool (for your host OS).
run "npm run package", the resulting executable will be generated and stored under bin/ folder.

Actual command running: tsc && pkg ./package.json --target node12 --out-path bin.

### - Packaging for different OSs

Check the pkg package documentation at https://www.npmjs.com/package/pkg
