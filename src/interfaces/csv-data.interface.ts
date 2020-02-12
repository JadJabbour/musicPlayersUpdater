/**
 * The CSV Reader object interface
 */
export default interface CSVData {
    mac_addresses: string,
    /** we only care about the mac address at this point */
    [propName: string]: any
}