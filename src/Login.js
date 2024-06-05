import LoginGithub from 'react-login-github';

import { useContext } from 'react';
import UserContext from './User';

const onSuccess = response => console.log(response);
const onFailure = error => console.error(error);


function Login() {

    const user = useContext(UserContext);

    return (
        <LoginGithub
            className="btn btn-link p-0"
            clientId="Iv1.5dceb0507b750647"
            redirectUri="https://dnd-mdn.github.io/oauth/pop.html"
            onSuccess={onSuccess}
            onFailure={onFailure}
            popupHeight={300}
            buttonText={user.name}
        />
    )
}


export default Login;