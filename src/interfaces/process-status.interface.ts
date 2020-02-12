/**
 * The process state interface
 */
export default interface ProcessStatus {
    file: { path: string, valid_file: boolean },
    errors?: { service: string, function: string, message: string, data: any }[],
    failedUpdates?: { clientId: string, error: any }[],
    successUpdates?: { clientId: string, response: any }[]
}