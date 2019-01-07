declare class Hello {
    name: string;
    payload: object;
    constructor(name: string);
    configure(payload: object): Hello;
    send(): void;
}
declare const _default: Hello;
export default _default;
