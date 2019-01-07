export declare enum ErrorCode {
    NO_ERROR = 0,
    NETWORK_ERROR = 1,
    ABORT = 2
}
export declare class NetworkResponse {
    readonly body: string;
    readonly status: number;
    readonly statusText: string;
    constructor(body: string, status: number, statusText: string);
}
export default class NetworkIo {
    private xhr;
    private errorCode;
    private sent;
    readonly promise: Promise<NetworkResponse>;
    constructor();
    send(url: string, method: string, opt_body?: ArrayBufferView | Blob | string | null): Promise<NetworkResponse>;
}
