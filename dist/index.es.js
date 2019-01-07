var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["NO_ERROR"] = 0] = "NO_ERROR";
    ErrorCode[ErrorCode["NETWORK_ERROR"] = 1] = "NETWORK_ERROR";
    ErrorCode[ErrorCode["ABORT"] = 2] = "ABORT";
})(ErrorCode || (ErrorCode = {}));
var NetworkResponse = /** @class */ (function () {
    function NetworkResponse(body, status, statusText) {
        this.body = body;
        this.status = status;
        this.statusText = statusText;
    }
    return NetworkResponse;
}());
var NetworkIo = /** @class */ (function () {
    function NetworkIo() {
        var _this = this;
        this.sent = false;
        this.xhr = new XMLHttpRequest();
        this.errorCode = ErrorCode.NO_ERROR;
        this.promise = new Promise(function (resolve, reject) {
            _this.xhr.addEventListener("abort", function () {
                _this.errorCode = ErrorCode.ABORT;
                reject(new DOMException('Aborted', 'AbortError'));
            });
            _this.xhr.addEventListener("error", function () {
                _this.errorCode = ErrorCode.NETWORK_ERROR;
                // TODO: rejectする。
                resolve(null);
            });
            _this.xhr.addEventListener("load", function () {
                var status = _this.xhr.status;
                var statusText = _this.xhr.statusText;
                var body = _this.xhr.response || _this.xhr.responseText;
                resolve(new NetworkResponse(body, status, statusText));
            });
        });
    }
    NetworkIo.prototype.send = function (url, method, opt_body) {
        if (this.sent) {
            throw new Error('cannot .send() more than once');
        }
        this.sent = true;
        this.xhr.open(method, url, true);
        if (opt_body != null) {
            this.xhr.send(opt_body);
        }
        else {
            this.xhr.send();
        }
        return this.promise;
    };
    return NetworkIo;
}());

var Hello = /** @class */ (function () {
    function Hello(name) {
        this.name = name;
    }
    Hello.prototype.configure = function (payload) {
        this.payload = payload;
        return this;
    };
    Hello.prototype.send = function () {
        new NetworkIo().send("https://jsonplaceholder.typicode.com/posts", "POST", JSON.stringify(this.payload)).then(function (res) {
            console.log(res.body);
        });
    };
    return Hello;
}());
var index = new Hello("world");

export default index;
