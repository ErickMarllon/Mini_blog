import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Login.module.css";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email: email,
      password: password,
    };

    const response = await login(user);

    console.log(response);
  };
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1>Login</h1>
        <p>Faça o login para poder utilizar o sistema</p>
      </div>
      <div className={styles.login}>
        <form onSubmit={handleSubmit}>
          <label>
            <span>E-mail:</span>
            <input
              type="email"
              name="email"
              required
              placeholder="E-mail do Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              type="password"
              name="password"
              required
              placeholder="Insira sua senha"
              value={password}
             
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="error">{error}</p>}
          <span className={styles.button_center}>
            {!loading && <button className="btn">Entrar</button>}
            {loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
