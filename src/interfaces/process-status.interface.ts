export default interface ProcessStatus {
    file: { path: string, validCSV: boolean },
    error?: { service: string, function: string, message: string, data: any },
    failedUpdates?: { clientId: string, response: any }[] 
}