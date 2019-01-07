export enum ErrorCode {
    NO_ERROR = 0,
    NETWORK_ERROR = 1,
    ABORT = 2
}

export class NetworkResponse {
    readonly body: string;
    readonly status: number;
    readonly statusText: string;

    constructor(body: string, status: number, statusText: string) {
        this.body = body;
        this.status = status;
        this.statusText = statusText;
    }
}

export default class NetworkIo {
    private xhr: XMLHttpRequest;
    private errorCode: ErrorCode;
    private sent: boolean = false;
    readonly promise: Promise<NetworkResponse>;

    constructor() {
        this.xhr = new XMLHttpRequest();
        this.errorCode = ErrorCode.NO_ERROR;
        this.promise = new Promise((resolve: (p: NetworkResponse) => void, reject: (p: Error) => void) => {
            this.xhr.addEventListener("abort", () => {
                this.errorCode = ErrorCode.ABORT;
                reject(new DOMException('Aborted', 'AbortError'));
            });
            this.xhr.addEventListener("error", () => {
                this.errorCode = ErrorCode.NETWORK_ERROR;
                // TODO: rejectする。
                resolve(null);
            });
            this.xhr.addEventListener("load", () => {
                const status = this.xhr.status;
                const statusText = this.xhr.statusText;
                const body = this.xhr.response || this.xhr.responseText;
                resolve(new NetworkResponse(body as string, status, statusText));
            })
        })
    }

    send(
        url: string,
        method: string,
        opt_body?: ArrayBufferView | Blob | string | null,
    ) {
        if (this.sent) {
            throw new Error('cannot .send() more than once');
        }
        this.sent = true;
        this.xhr.open(method, url, true);
        if (opt_body != null) {
            this.xhr.send(opt_body);
        } else {
            this.xhr.send();
        }
        return this.promise;
    }
}
