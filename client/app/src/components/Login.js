import { useState } from "react"
const axios = require('axios')

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(email, password)

        const response = await axios.post('http://localhost:3000',
            JSON.stringify({email, password})
        );
    };

    return(
      <div className="App">
          <header className="App-header">
            <div className="login-form-wrap">
              <h2>Login</h2>
              <form className="login-form">
                <input 
                type="email" name="email" placeholder="Email" required
                onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" name="password" placeholder="Password" required
                onChange={(e) => setPassword(e.target.value)}
                />                <button type="submit"
                 className="btn-login"
                 onClick={(e) => handleLogin(e)}
                 >Login</button>
              </form>
            </div>
          </header>
        </div>
    );
}

export default Login;