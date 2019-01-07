import NetworkIo from "./network_io"

class Hello {
    name: string;
    payload: object;

    constructor(name: string) {
        this.name = name;
    }

    configure(payload: object): Hello {
        this.payload = payload;
        return this;
    }

    send(): void {
        new NetworkIo().send(
            "https://jsonplaceholder.typicode.com/posts",
            "POST",
            JSON.stringify(this.payload)).then(res => {
                console.log(res.body);
        })
    }
}

export default new Hello("world");
