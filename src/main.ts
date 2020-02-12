import ProcessStatus from './interfaces/process-status.interface';
import CSVData from './interfaces/csv-data.interface';

import CSVReader from './services/csv-reader.service';
import UpdateAPI from './services/update-api.service';

import { merge, cloneDeep } from 'lodash';

/**
 * The main process state
 */
let state: ProcessStatus = {
    file: {
        path: '',
        valid_file: false
    }
};

/**
 * Updates the process state by merging the input object
 * @param input sub-state object to merge with state
 */
const updateState = (input: any): ProcessStatus => merge(state, cloneDeep(input));

/**
 * Validates MAC address string format
 * @param address MAC address to be validated as string
 */
const validMacAddress = (address: string): boolean => new RegExp("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$").test(address);

/**
 * The main process
 * @param csvPath the path to the CSV file
 * @param logger the logger object injected from index
 */
const main = (csvPath: string, logger: any): ProcessStatus => {
    updateState({
        file: {
            path: csvPath
        }
    });

    /** initialising empty lists for failed and success updates */
    const failedUpdates: { clientId: string, error: any }[] = [];
    const successUpdates: { clientId: string, response: any }[] = [];

    /** initialising required services */
    const reader = new CSVReader(csvPath);
    const updaterApi = new UpdateAPI();

    /** updating state with file validity (reader didn't throw an exception) */
    updateState({
        file: {
            valid_file: true
        }
    });

    /**
     * On API update failed, updating the failed updates list
     * @param mac_address the current mac address being updated
     */
    const onUpdateFailed = (mac_address: string) => (error: any) => failedUpdates.push({ clientId: mac_address, error: error });
    
    /**
     * On API update success, updating the success updates list
     * @param mac_address the current mac address being updated
     */  
    const onUpdateSuccess = (mac_address: string) => (response: any) => successUpdates.push({ clientId: mac_address, response: response });

    /** start reading the CSV file supplying the reader with OnRow and OnEnd callback functions */
    reader.read((data: CSVData) => {
        if(validMacAddress(data.mac_addresses)){
            updaterApi.updateClient(data.mac_addresses)
                      .then(onUpdateSuccess(data.mac_addresses))
                      .catch(onUpdateFailed(data.mac_addresses))
        } else {
            failedUpdates.push({
                clientId: data.mac_addresses,
                error: 'invalid mac address'
            });
        }
    }, 
    () => {
        /** updating state with failed and success updates lists on read end */
        updateState({failedUpdates: failedUpdates});
        updateState({successUpdates: successUpdates});
    });

    return {
        file: {
            path: csvPath,
            valid_file: false
        }
    }
}

export default main;