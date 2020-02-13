/**
 * The update API request interface
 */
export default interface UpdateRequest {
    profile: {  applications: { applicationId: string, version: string }[] }
}