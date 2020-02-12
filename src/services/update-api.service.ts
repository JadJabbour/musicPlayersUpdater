import fetch from './mock-fetch.service';

export default class UpdateAPI {

    private baseURL: string;
    private authToken: string;

    constructor(baseURL: string, authToken: string) { 
        this.baseURL = baseURL;
        this.authToken = authToken;
    }

    private parse(data: any): any {
        if(data.statusCode){
            throw new Error(JSON.stringify(data));
        } else {
            return data;
        }
    }

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