import fetch from './mock-fetch.service';

/**
 * Update api service
 */
export default class UpdateAPI {

    /**
     * Base url of update api
     */
    private baseURL: string;

    /**
     * Auth token of update api
     */
    private authToken: string;

    /**
     * Creates an instance of update api.
     * @param baseURL base URL of api to call
     * @param authToken authentication token
     */
    constructor(baseURL: string, authToken: string) { 
        this.baseURL = baseURL;
        this.authToken = authToken;
    }

    /**
     * Parses update api response and throws exception  on error
     * @param data the response data from the api call
     * @returns parsed response data
     */
    private parse(data: any): any {
        if(data.statusCode){
            throw new Error(JSON.stringify(data));
        } else {
            return data;
        }
    }

    /**
     * Updates client aoos via API
     * @param clientId the client ID being updated
     * @param updateRequest the update request data
     * @returns client returned data wrapped in a Promise
     */
    public updateClient(clientId: string, updateRequest: any): Promise<any> {
        return fetch(
                this.baseURL + '/profiles/clientId:' + clientId, 
                { 
                    method: 'PUT', 
                    body: JSON.stringify(updateRequest), 
                    headers: { 
                        'Content-Type': 'application/json',
                        'x-client-id': clientId,
                        'x-authentication-token': this.authToken
                    }
                }
            ).then((r: any) => r.json()).then((data: any) => this.parse(data))
    }
}