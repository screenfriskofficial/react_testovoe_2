import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const UploadPage = () => {
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: Yup.object().shape({
      text: Yup.string().required("required field"),
    }),
    onSubmit: async (values) => {
      const { text } = values;
      console.log(text);
    },
  });

  return (
    <form className={"upload"} onSubmit={formik.handleSubmit}>
      <Box className={"add_cred"}>
        <TextField
          className={"input"}
          id={"text"}
          name={"text"}
          type={"text"}
          label={"Add your title"}
          variant={"outlined"}
          placeholder={"Type here"}
          error={Boolean(formik.errors.text)}
          helperText={formik.errors.text}
        />
      </Box>
      <Box className={"add_image"}>
        <input id={"file"} name={"file"} type="file" />
        <label htmlFor="file" className={"imageBox"}>
          Choose a file
        </label>
        <Button type={"submit"} fullWidth variant={"contained"}>
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default UploadPage;
