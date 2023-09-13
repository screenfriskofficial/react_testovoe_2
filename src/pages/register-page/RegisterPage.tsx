import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { userRegisterStore } from "~features/session";

const RegisterPage = () => {
  const { register } = userRegisterStore();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      displayName: Yup.string().min(3).required("required field"),
      email: Yup.string()
        .email("invalid email format!")
        .required("required field"),
      password: Yup.string()
        .min(6, "your password must have at least 6 characters!")
        .required("required field"),
    }),
    onSubmit: (values) => {
      register(values, handleNavigate);
    },
  });

  return (
    <div className={"auth"}>
      <form onSubmit={formik.handleSubmit}>
        <h1>register</h1>
        <TextField
          error={Boolean(formik.errors.displayName)}
          helperText={formik.errors.displayName}
          variant={"standard"}
          label={"username"}
          id={"displayName"}
          name={"displayName"}
          value={formik.values.displayName}
          onChange={formik.handleChange}
          placeholder={"enter your username"}
          type="text"
        />
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
          Register
        </Button>
        <p>
          Have an account? <Link to={"/login"}>login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
