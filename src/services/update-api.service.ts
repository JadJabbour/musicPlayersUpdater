import fetch from './mock-fetch.service';
import FetchResponse from '../interfaces/mock-fetch.interface'

export default class UpdateAPI {

    private baseURL: string;
    private authToken: string;

    constructor(baseURL: string, authToken: string) { 
        this.baseURL = baseURL;
        this.authToken = authToken;
    }

    private parse(data: any): Promise<any> {

    }

    public updateClient(clientId: string): Promise<any> {
        return fetch().then((r: FetchResponse) => r.json()).then((data: any) => this.parse(data))
    }
}