import { useState } from "react";
import { useRouter } from "next/router";
import { loginSuperAdmin } from "../../service/Api";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginSuperAdmin({ email, password, token });
    if (response.token) {
      const setToken = localStorage.setItem("token", response.token);
      router.push("/superadmin");
    } else {
      setError(response.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Super Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <style jsx>{`
        .login-container {
          max-width: 300px;
          margin: auto;
          padding: 20px;
          text-align: center;
        }
        input {
          display: block;
          width: 100%;
          padding: 10px;
          margin: 10px 0;
        }
        .error {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default SuperAdminLogin;
