import cls from "./ImagesModal.module.scss";
import { Box, Modal } from "@mui/material";

interface ImagesModalProps {
  img: string;
  open: boolean;
  handleClose: () => void;
}

export const ImagesModal = ({ img, open, handleClose }: ImagesModalProps) => {
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
        </Box>
      </Modal>
    </>
  );
};
