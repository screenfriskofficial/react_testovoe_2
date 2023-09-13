import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userLoginStore } from "~features/session";

const LoginPage = () => {
  const { login } = userLoginStore();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("invalid email format!")
        .required("required field"),
      password: Yup.string().required("required field"),
    }),
    onSubmit: (values) => {
      login(values, handleNavigate);
    },
  });
  return (
    <div className={"auth"}>
      <form onSubmit={formik.handleSubmit}>
        <h1>login</h1>
        <TextField
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
          variant={"standard"}
          label={"email"}
          id={"email"}
          name={"email"}
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder={"enter your email"}
          type="email"
        />
        <TextField
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password}
          variant={"standard"}
          label={"password"}
          id={"password"}
          name={"password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder={"enter your password"}
          type="password"
        />
        <Button type={"submit"} variant={"contained"} fullWidth>
          Login
        </Button>
        <p>
          No have an account? <Link to={"/register"}>register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
