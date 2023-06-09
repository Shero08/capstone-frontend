import toast from "react-hot-toast";

export default class HotToast {
    constructor(message) {
        this.message = message;
    }

    loginError() {
        return toast.error(this.message);
    }

    passwordAlert(){
        return toast.error('Le password non corrispondono.');
    }

    signupConfirm(){
        return toast.success('Registrazione avvenuta con successo! Sarai automaticamente reinderizzato alla pagina di accesso in pochi secondi.');
    }

    signupError(){
        return toast.error('Errore interno del server.');
    }

    signupErrorNickname(){
        return toast.error(this.message);
    }

    signupErrorMail(){
        return toast.error(this.message);
    }

    postSuccess(){
        return toast.success(this.message);
    }

    postError(){
        return toast.error(this.message);
    }

    updateSuccess(){
        return toast.success(this.message);
    }

    deleteSuccess(){
        return toast.success(this.message);
    }
}