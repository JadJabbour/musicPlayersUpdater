import ProcessStatus from './interfaces/process-status.interface';
import CSVData from './interfaces/csv-data.interface';
import UpdateRequest from './interfaces/update-request.interface';

import CSVReader from './services/csv-reader.service';
import UpdateAPI from './services/update-api.service';

import Configuration from './config';

import { merge, cloneDeep } from 'lodash';

/**
 * The main process state (ideally this would be immutable)
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
const main = (csvPath: string, logger: any): Promise<ProcessStatus> => {
    return new Promise((resolve) => {
        /** updating process state with csv file path being used */
        updateState({
            file: {
                path: csvPath
            }
        });

        /** Mocking a call to auth token server (returns random str of 13 chars) */
        const authToken = (() => Math.random().toString(36).substring(13))();

        /** initialising empty lists for erros, failed aupdates nd success updates */
        const failedUpdates: { clientId: string, error: any }[] = [];
        const successUpdates: { clientId: string, response: any }[] = [];
        const errors: { service: string, function: string, message: string, data: any }[] = [];

        /** Promise list to resolve in unison */
        const promiseList: Promise<any>[] = [];

        /** initialising required services */
        const reader = new CSVReader(csvPath);
        const updaterApi = new UpdateAPI(Configuration.update_api_url, authToken);

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

        /**
         * Preparing the request data (ideally this would have been prepared by another service)
         */
        const preparePutData: UpdateRequest = {
            profile: {
                applications: [
                    {
                    "applicationId": "music_app",
                    "version": "v1.4.10"
                    },
                    {
                    "applicationId": "diagnostic_app",
                    "version": "v1.2.6"
                    },
                    {
                    "applicationId": "settings_app",
                    "version": "v1.1.5"
                    }
                ]
            }
        }

        /** start reading the CSV file supplying the reader with OnRow and OnEnd callback functions */
        reader.read((data: CSVData) => {
            if(!data.mac_addresses){
                errors.push({ 
                    service: 'CSVReader', 
                    function: 'read', 
                    message: 'The expected object properly mac_addresses does not exist', 
                    data: data 
                });
            } else {
                if(validMacAddress(data.mac_addresses)){
                    /** bundling the promises from API calls for Promise.all */
                    promiseList.push(
                        updaterApi.updateClient(data.mac_addresses, preparePutData)
                            .then(onUpdateSuccess(data.mac_addresses))
                            .catch(onUpdateFailed(data.mac_addresses))
                    );
                } else {
                    /** adding invalid mac addresses to failed updates list */
                    failedUpdates.push({
                        clientId: data.mac_addresses,
                        error: 'invalid mac address'
                    });
                }
            }
        }, 
        () => {
            /** updating state with failed and success updates lists on read end */
            Promise.all(promiseList).then(() => {
                updateState({failedUpdates: failedUpdates, successUpdates: successUpdates, errors: errors});
                /** resolving when all promises are satisfied and returning process state */
                resolve(state);
            });
        });
    });
}

export default main;