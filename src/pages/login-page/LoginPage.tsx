import { Link } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloudIcon from "@mui/icons-material/Cloud";
import { EmailRounded, PasswordRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useAuth, useAuthStore } from "~features/session";

const LoginPage = () => {
  const { signIn } = useAuth();
  const { isLoading, error } = useAuthStore();

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
    onSubmit: (values) => signIn(values),
  });
  return (
    <div className={"auth"}>
      <h2>
        <span>Cloud Images</span> <CloudIcon />
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <h1>login</h1>
        <TextField
          required
          variant={"standard"}
          label={"email"}
          id={"email"}
          name={"email"}
          placeholder={"enter your email"}
          type="email"
          error={Boolean(formik.errors.email) || Boolean(error)}
          helperText={formik.errors.email || error}
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
          Login
        </LoadingButton>
        <p>
          No have an account? <Link to={"/register"}>register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
