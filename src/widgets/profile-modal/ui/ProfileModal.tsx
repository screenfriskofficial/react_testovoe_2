import { IconButton, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { auth, storage } from "~app/firebase.ts";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import cls from "./ProfileModal.module.scss";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { LoadingButton } from "@mui/lab";

export const ProfileModal = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      displayName: auth.currentUser?.displayName,
    },
    validationSchema: Yup.object().shape({
      displayName: Yup.string()
        .min(6, "name must be at least 6 characters long")
        .max(12)
        .required("required field"),
    }),
    onSubmit: async (values) => {
      const { displayName } = values;
      if (!fileInputRef.current?.files) return;
      const file = fileInputRef.current.files[0];

      const date = new Date().getTime();
      const storageRef = ref(
        storage,
        `userAvatars/${displayName ? displayName + date : ""}`,
      );
      setLoading(true);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            if (auth.currentUser) {
              await updateProfile(auth.currentUser, {
                displayName,
                photoURL: downloadURL,
              });
              toast.success("Profile has been changed!");
              setOpen(!setOpen);
              setLoading(!loading);
            }
          } catch (error) {
            toast.error("You have been error!");
            setLoading(!loading);
          }
        });
      });
    },
  });

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form className={cls.modal} onSubmit={formik.handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit your profile
          </Typography>
          <TextField
            id={"displayName"}
            name={"displayName"}
            title={"displayName"}
            type={"text"}
            label={"Update username"}
            error={Boolean(formik.errors.displayName)}
            helperText={formik.errors.displayName}
            value={formik.values.displayName}
            onChange={formik.handleChange}
            placeholder={"Type here"}
          />
          <input ref={fileInputRef} type="file" />
          <LoadingButton
            loading={loading}
            type={"submit"}
            variant={"contained"}
          >
            Submit
          </LoadingButton>
        </form>
      </Modal>

      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
    </>
  );
};
