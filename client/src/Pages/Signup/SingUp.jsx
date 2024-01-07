import { useMemo, useState } from "react"
import { signUp } from "./api";
import { Axios } from "axios";
import InputS from "./Components/input";
export function SignUp() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [succesmessage, setMessage] = useState();
    const [errormessage, setErrormessage] = useState("");


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
            return "password mismatch"
        }
        return ''

    }, [password, passwordRepeat]);




    return (

        <div className="container  ">
            <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 ">
                <form onSubmit={onSubmit} className="card" >
                    <div className="card-header">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="card-body">
                        <InputS id={username} label={"Username"} onChange={(e) => setUsername(e.target.value)} />

                        {errormessage && <div className="invalid-feedback">
                            {errormessage.username}
                        </div>}
                        <InputS id={email} label={"E-mail"} onChange={(e) => setEmail(e.target.value)} />

                        <InputS id={password} label={"Password"} onChange={(e) => setPassword(e.target.value)} />

                        <InputS id={password} label={"Repeat Password"} onChange={(e) => setPasswordRepeat(e.target.value)} error={passwordRepeatError} />

                        <div>{succesmessage && <div className="alert alert-success" role="alert"> {succesmessage}</div>

                        }</div>
                        <div className="text-center">
                            <button className="btn btn-primary flex justify-center" disabled={apiProgress || (!password || password !== passwordRepeat)} >
                                {apiProgress &&
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>}Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}