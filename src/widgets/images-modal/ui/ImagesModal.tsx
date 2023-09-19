import cls from "./ImagesModal.module.scss";
import { Box, Modal } from "@mui/material";

interface ImagesModalProps {
  img: string;
  open: boolean;
  title: string;
  description: string;
  handleClose: () => void;
}

export const ImagesModal = ({
  img,
  open,
  handleClose,
  title,
  description,
}: ImagesModalProps) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={cls.modal}>
          <img className={cls.img} src={img} alt="" />
          <Box className={cls.infoBox}>
            <h4>{title}</h4>
            <p>Description: {description}</p>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
