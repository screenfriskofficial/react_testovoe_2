import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputAdornment, TextField } from "@mui/material";
import { userRegisterStore } from "~features/session";
import CloudIcon from "@mui/icons-material/Cloud";
import { LoadingButton } from "@mui/lab";
import {
  AccountCircle,
  EmailRounded,
  PasswordRounded,
} from "@mui/icons-material";
import React from "react";

const RegisterPage = () => {
  const { register } = userRegisterStore();
  const [loader, setLoader] = React.useState(false);
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
      setLoader(true);
      register(values, handleNavigate);
    },
  });

  return (
    <div className={"auth"}>
      <h2>
        <span>Cloud Images</span> <CloudIcon />
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <h1>register</h1>
        <TextField
          variant={"standard"}
          label={"username"}
          id={"displayName"}
          name={"displayName"}
          placeholder={"enter your username"}
          type="text"
          error={Boolean(formik.errors.displayName)}
          helperText={formik.errors.displayName}
          value={formik.values.displayName}
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle sx={{ color: "#343a40" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant={"standard"}
          label={"email"}
          id={"email"}
          name={"email"}
          placeholder={"enter your email"}
          type="email"
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailRounded sx={{ color: "#343a40" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant={"standard"}
          label={"password"}
          id={"password"}
          name={"password"}
          placeholder={"enter your password"}
          type="password"
          error={Boolean(formik.errors.password)}
          helperText={formik.errors.password}
          value={formik.values.password}
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PasswordRounded sx={{ color: "#343a40" }} />
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          loading={loader}
          type={"submit"}
          variant={"contained"}
          fullWidth
        >
          Register
        </LoadingButton>
        <p>
          Have an account? <Link to={"/login"}>login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
