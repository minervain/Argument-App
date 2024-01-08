import { useMemo, useState } from "react"
import { signUp } from "./api";
import { Axios } from "axios";
import InputS from "./Components/input";
import { useTranslation } from "react-i18next";
import LangugageSelect from "../../shared/Components/LangugageSelect";
export function SignUp() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [succesmessage, setMessage] = useState();
    const [errormessage, setErrormessage] = useState("");
    const {t}=useTranslation();


    const onSubmit = async (e) => {
        e.preventDefault();
        setApiProgress(true)
        setMessage();

        try {
            const response = await signUp(
                {
                    username,
                    email,
                    password
                })
            setMessage(response.data.message)
        }
        catch (err) {
            if (err.response?.data && err.response.data.status === 400) {
                console.log(err)
                setErrormessage(err.response.validationErrors
                )
            }

        }
        finally { setApiProgress(false) }

    }

    const passwordRepeatError = useMemo(() => {
        if (password && password != passwordRepeat) {
            return t('passwordMismatch')
        }
        return ''

    }, [password, passwordRepeat]);




    return (

        <div className="container  ">
            <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 ">
                <form onSubmit={onSubmit} className="card" >
                    <div className="card-header">
                        <h1>{t('signUp')}</h1>
                    </div>
                    <div className="card-body">
                        <InputS id={username} label={t("username")} onChange={(e) => setUsername(e.target.value)} />

                        {errormessage && <div className="invalid-feedback">
                            {errormessage.username}
                        </div>}
                        <InputS id={email} label={t("email")} onChange={(e) => setEmail(e.target.value)} />

                        <InputS id={password} label={t("password")} onChange={(e) => setPassword(e.target.value)} />

                        <InputS id={password} label={t("passwordRepeat")} onChange={(e) => setPasswordRepeat(e.target.value)} error={passwordRepeatError} />

                        <div>{succesmessage && <div className="alert alert-success" role="alert"> {succesmessage}</div>

                        }</div>
                        <div className="text-center">
                            <button className="btn btn-primary flex justify-center" disabled={apiProgress || (!password || password !== passwordRepeat)} >
                                {apiProgress &&
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>}{t('signbtn')}</button>
                        </div>
                    </div>
                    <LangugageSelect/>

                </form>
            </div>
        </div>
    )
}