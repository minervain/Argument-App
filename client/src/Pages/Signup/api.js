import axios from "axios";

export function signUp(obje) {
    axios.post('/api/v1/users', obje,
        {
            headers: {

            }
        })

}