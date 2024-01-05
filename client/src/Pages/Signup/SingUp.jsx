import axios from "axios";
import { useState } from "react"
import { signUp } from "./api";
export function SignUp() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [succesmessage, setMessage] = useState();

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
        catch {

        }
        finally { setApiProgress(false) }

    }


    return (

        <div className="container  ">
            <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 ">
                <form onSubmit={onSubmit} className="card" >
                    <div className="card-header">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">

                            <label htmlFor="username" className="form-label" >Username</label>
                            <input id="username" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input id="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input id="password" className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordRepeat" className="form-label" >Repeat Password</label>
                            <input id="passwordRepeat" className="form-control" type="password" onChange={(e) => setPasswordRepeat(e.target.value)} />
                        </div>
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