import main from './main';

/**
 * wrapper around the main process
 * @param csvPath 
 */
const runAutoUpdater = (csvPath: string) => main(csvPath);

// read input from console
runAutoUpdater("");