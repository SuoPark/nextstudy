import { ReactNode, useRef, useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch } from "react-redux";
import { dialogsActions } from "@/store/reducers/dialogsReducer";

interface IProps {
  id: string;
  title?: string;
  initialProps?: Omit<DialogProps, "open">;
  children?: ReactNode;
  dialogActions?: {
    label: string;
    onClick: any;
    fieldProps?: { [key: string]: any };
  }[];
  isHiden?: boolean;
}

const DialogsComp: React.FC<IProps> = ({
  id,
  title,
  initialProps = {},
  children,
  dialogActions,
  isHiden = false,
}) => {
  const [dialogProps] = useState<DialogProps>({ open: true, ...initialProps });
  const dispatch = useDispatch();
  const descriptionElementRef = useRef<HTMLElement>(null);
  const handleClose = () => {
    //dialog종료시 dialog 제거
    dispatch(dialogsActions.removeDialog({ id }));
  };

  return (
    <Dialog
      fullWidth
      {...dialogProps}
      disableEscapeKeyDown
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers={dialogProps.scroll === "paper"}>
        <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={({ spacing }) => {
          return {
            p: `${spacing(2.5)} !important`,
          };
        }}
      >
        {/* 추가한 버튼이 있는 경우 버튼 추가 */}
        {dialogActions && dialogActions.length > 0 && (
          <>
            {dialogActions.map(({ label, fieldProps, onClick }, i) => (
              <Button key={i} onClick={onClick} {...fieldProps}>
                {label}
              </Button>
            ))}
          </>
        )}
        {(!dialogActions || dialogActions.length === 0) && isHiden === false && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleClose}
          >
            닫기
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogsComp;
