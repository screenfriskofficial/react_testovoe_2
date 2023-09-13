import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className={"auth"}>
      <form>
        <h1>login</h1>
        <input placeholder={"email"} type="email" />
        <input placeholder={"password"} type="password" />
        <button>Login</button>
        <p>
          No have an account? <Link to={"/register"}>register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
