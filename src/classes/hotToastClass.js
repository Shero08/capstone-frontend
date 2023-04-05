import toast from "react-hot-toast";

export default class HotToast {
    constructor() {}

    loginError() {
        return toast.error('Email o password errate.');
    }
}