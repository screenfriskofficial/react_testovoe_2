import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputAdornment, TextField } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { LoadingButton } from "@mui/lab";
import {
  AccountCircle,
  EmailRounded,
  PasswordRounded,
} from "@mui/icons-material";
import { useAuth, useAuthStore } from "~features/session";

const RegisterPage = () => {
  const { signUp } = useAuth();
  const { isLoading } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      displayName: Yup.string()
        .min(3, "username must be at least 3 characters")
        .max(12, "username must be at most 10 characters")
        .required("required field"),
      email: Yup.string()
        .email("invalid email format!")
        .required("required field"),
      password: Yup.string()
        .min(6, "your password must have at least 6 characters!")
        .required("required field"),
    }),
    onSubmit: (values) => signUp(values),
  });

  return (
    <div className={"auth"}>
      <h2>
        <span>Cloud Images</span> <CloudIcon />
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <h1>register</h1>
        <TextField
          required
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
          required
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
          required
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
          loading={isLoading}
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
