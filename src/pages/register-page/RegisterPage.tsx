import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "~app/firebase.ts";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

const RegisterPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().min(3).required("required field"),
      email: Yup.string()
        .email("Invalid email format!")
        .required("required field"),
      password: Yup.string()
        .min(6, "your password must have at least 6 characters!")
        .required("required field"),
    }),
    onSubmit: async (values) => {
      const { username, email, password } = values;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          username,
          email,
          password,
        });
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className={"auth"}>
      <form onSubmit={formik.handleSubmit}>
        <h1>register</h1>
        <input
          id={"username"}
          name={"username"}
          value={formik.values.username}
          onChange={formik.handleChange}
          placeholder={"username"}
          type="text"
        />
        {<p className={"error"}>{formik.errors.username}</p>}
        <input
          id={"email"}
          name={"email"}
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder={"email"}
          type="email"
        />
        {<p className={"error"}>{formik.errors.email}</p>}
        <input
          id={"password"}
          name={"password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder={"password"}
          type="password"
        />
        {<p className={"error"}>{formik.errors.password}</p>}
        <button>Register</button>
        <p>
          You have an account? <Link to={"/login"}>login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
