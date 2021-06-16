import axios from "axios";
export let nameUser = '';
export let idUser = '';


export async function createUser(user) {
    await axios.post('http://localhost:4000/user/create', user).then(
        res => {
            console.log('create user: ' + JSON.stringify(res));
            idUser = res.data.user._id;
            localStorage.setItem('token', res.data.token);
        },
        err => {
            console.log(`Error: ${err}`);
        }
    )
}

export async function loginUser(user) {
    console.log(user, "login");
    await axios.post(`http://localhost:4000/user/login`, user)
        .then(
            res => {
                console.log('login user: ' + JSON.stringify(res));
                console.log(res);
                idUser = res.data.user._id;
                localStorage.setItem('token', res.data.token);
            },
            err => {
                console.log(`Error: ${err}`);
            }
        )
}