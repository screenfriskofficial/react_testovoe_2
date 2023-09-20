import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "~app/firebase.ts";
import React, { useRef } from "react";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

const UploadPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      text: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().min(10).max(70).required("required field"),
      text: Yup.string().min(6).max(12).required("required field"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { text, description } = values;
      const date = new Date().getTime();
      if (!fileInputRef.current?.files) return;
      const file = fileInputRef.current.files[0];
      const storageRef = ref(storage, `home/${text + date}`);
      const imagesCollection = collection(db, "images");
      setLoading(true);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            if (auth.currentUser) {
              await updateDoc(doc(imagesCollection, "imageWall"), {
                allImages: arrayUnion({
                  id: nanoid(),
                  photoURL: downloadURL,
                  liked: false,
                  author: auth.currentUser.displayName,
                  title: text,
                  description,
                }),
              });
            }
            toast.success("Successfully uploaded!");
            setLoading(false);
            resetForm();
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        });
      });
    },
  });

  return (
    <form className={"upload"} onSubmit={formik.handleSubmit}>
      <Box className={"add_cred"}>
        <TextField
          required
          className={"input"}
          id={"text"}
          name={"text"}
          type={"text"}
          label={"Add your title"}
          variant={"outlined"}
          placeholder={"Type here"}
          onChange={formik.handleChange}
          value={formik.values.text}
          error={Boolean(formik.errors.text)}
          helperText={formik.errors.text}
        />
        <TextField
          required
          className={"input"}
          id={"description"}
          name={"description"}
          type={"text"}
          label={"Description"}
          variant={"outlined"}
          placeholder={"Type here"}
          onChange={formik.handleChange}
          value={formik.values.description}
          error={Boolean(formik.errors.description)}
          helperText={formik.errors.description}
          multiline
        />
      </Box>
      <Box className={"add_image"}>
        <input ref={fileInputRef} id={"file"} name={"file"} type="file" />
        <label htmlFor="file" className={"imageBox"}>
          Choose a file
        </label>
        <LoadingButton
          loading={loading}
          type={"submit"}
          fullWidth
          variant={"contained"}
        >
          Upload
        </LoadingButton>
      </Box>
    </form>
  );
};

export default UploadPage;
