import { useState, useRef, useEffect } from "react"
const axios = require('axios')

/*function Login(){

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
}*/

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[errMsg, setErrMsg] = useState('');
    const[sucess, setSucess] = useState(false);

    useEffect(() => {
      userRef.current.focus();
    }, [])

    useEffect(() => {
      setErrMsg('');
    }, [email, password])

  return (
    <div className="App">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <header className="App-header">
            <div className="login-form-wrap">
              <h2>Login</h2>
              <form className="login-form">
                <label htmlFor="email" className="labelInput">Email</label>
                <input 
                type="email" name="email" placeholder="Email" required
                id="email" ref={userRef} autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
                <label htmlFor="password">Senha</label>
                <input type="password" name="password" placeholder="Password" required
                id="password" ref={userRef}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />                
                <button type="submit"
                 className="btn-login"
                 >Login</button>
              </form>
              <p>
                Não possui uma conta?
                <span> 
                  {}
                  <a href='#'>
                    Registre-se
                  </a>
                </span>
              </p>
            </div>
          </header>
        </div>
  )
}

export default Login;