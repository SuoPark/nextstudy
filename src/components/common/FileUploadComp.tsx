import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ReactNode, useEffect, useMemo } from "react";
import { Close, FileDocumentOutline } from "mdi-material-ui";
import { FileUploadOutlined as FileUploadOutlinedIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useFile from "@/hooks/useFile";
import { useDispatch } from "react-redux";
import { dialogsActions } from "@/store/reducers/dialogsReducer";
import DialogsComp from "@/components/Dialog/DialogComp";

interface IProps {
  multiple?: boolean;
  thumbNail?: boolean;
  size?: "small" | "medium";
  error?: boolean;
  helperText?: string | null;
  handleChange?: (files: Array<File | string>) => void;
  children?: ReactNode;
  disabled?: boolean;
  fileTypes?: string[];
  fileLength?: number;
  volume?: number;
  attachedFiles?: string;
  uploadIcon?: boolean;
  fileUpload?: File[];
  buttonStyle?: any;
}

const handleImageModal = (url: string, dispatch: any) => {
  dispatch(
    dialogsActions.setDialog({
      id: "imageModal",
      comp: (
        <DialogsComp
          id="imageModal"
          title="상세이미지"
          initialProps={{ scroll: "paper", maxWidth: "sm" }}
          dialogActions={[
            {
              label: "확인",
              onClick: () => dispatch(dialogsActions.clear({})),
            },
          ]}
        >
          <img src={url} alt="상세이미지" />
        </DialogsComp>
      ),
    })
  );
};

const renderFilePreview = (file: File | string, dispatch: any) => {
  const isAttached = typeof file === "string";
  if (!isAttached && file.type.startsWith("image")) {
    return (
      <img
        width={38}
        height={38}
        alt={file.name}
        src={URL.createObjectURL(file as any)}
        onClick={() =>
          handleImageModal(URL.createObjectURL(file as any), dispatch)
        }
      />
    );
  } else if (isAttached) {
    const fileType = String(file.split(".")[1]).toLocaleLowerCase();
    const stringArr = file.split("/");
    const name = stringArr[stringArr.length - 1] || "";
    if (
      fileType === "png" ||
      fileType === "jpg" ||
      fileType === "jpeg" ||
      fileType === "gif"
    ) {
      return (
        <img
          width={38}
          height={38}
          alt={name}
          src={`${process.env.NEXT_PUBLIC_S3_URL}/${file}`}
          onClick={() =>
            handleImageModal(
              `${process.env.NEXT_PUBLIC_S3_URL}/${file}`,
              dispatch
            )
          }
        />
      );
    }
  }
  return <FileDocumentOutline />;
};

const StyleList = styled(List)(({ theme }) => ({
  padding: 0,
  marginTop: theme.spacing(6.25),
  "& .MuiListItem-root": {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2.5, 2.4, 2.5, 6),
    border: `1px solid ${
      theme.palette.mode === "light"
        ? "rgba(93, 89, 98, 0.14)"
        : "rgba(247, 244, 254, 0.14)"
    }`,
    "& .file-details": {
      display: "flex",
      alignItems: "center",
    },
    "& .file-preview": {
      display: "flex",
      marginRight: theme.spacing(3.75),
      "& svg": {
        fontSize: "2rem",
      },
    },
    "& img": {
      width: 38,
      height: 38,
      padding: theme.spacing(0.75),
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${
        theme.palette.mode === "light"
          ? "rgba(93, 89, 98, 0.14)"
          : "rgba(247, 244, 254, 0.14)"
      }`,
    },
    "& .file-name": {
      fontWeight: 600,
    },
    "& + .MuiListItem-root": {
      marginTop: theme.spacing(3.5),
    },
  },
  "& + .buttons": {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(6.25),
    "& > :first-of-type": {
      marginRight: theme.spacing(3.5),
    },
  },
}));

const FileUploadComp: React.FC<IProps> = function ({
  multiple = false,
  thumbNail = false,
  size = "small",
  error = false,
  helperText,
  handleChange,
  children,
  disabled = false,
  fileTypes,
  fileLength,
  volume,
  attachedFiles,
  uploadIcon = false,
  fileUpload,
  buttonStyle,
}) {
  const {
    props: { files, onChange, handleRemoveFile },
    setFiles,
  } = useFile({ multiple, fileTypes, fileLength, volume });

  const dispatch = useDispatch();

  const valueNames = useMemo<string>(() => {
    return Array.from(files || [])
      .map((file) => {
        const isAttached = typeof file === "string";
        if (isAttached) {
          const stringArr = file.split("/");
          return stringArr[stringArr.length - 1] || "";
        } else {
          return file.name;
        }
      })
      .join(", ");
  }, [files]);

  useEffect(() => {
    if (files.length >= 0 && handleChange) {
      handleChange(files);
    }
  }, [files]);

  useEffect(() => {
    if (attachedFiles && attachedFiles !== "undefined") {
      const fileArr = String(attachedFiles).split(",");
      setFiles(fileArr);
    }
  }, []);

  useEffect(() => {
    if (
      fileUpload &&
      fileUpload.length !== 0 &&
      Array.isArray(fileUpload) &&
      fileUpload[0] !== undefined
    ) {
      setFiles(fileUpload);
    }
  }, [fileUpload]);

  return (
    <FormControl error={error} variant="standard">
      <Stack direction="row" alignItems="center" spacing={2}>
        {!thumbNail && (
          <TextField value={valueNames} disabled={true} size={size} />
        )}
        {disabled && (
          <Button
            style={buttonStyle}
            size="small"
            variant="contained"
            component="label"
            disabled={true}
            startIcon={uploadIcon && <FileUploadOutlinedIcon />}
          >
            {children || "Upload"}
            <input hidden multiple={multiple} type="file" onChange={onChange} />
          </Button>
        )}
        {!disabled && (
          <Button
            style={buttonStyle}
            size="small"
            variant="contained"
            component="label"
            disabled={false}
            sx={{ color: "#fff !important" }}
            startIcon={uploadIcon && <FileUploadOutlinedIcon />}
          >
            {children || "Upload"}
            <input hidden multiple={multiple} type="file" onChange={onChange} />
          </Button>
        )}
      </Stack>
      {thumbNail && (
        <StyleList>
          {Array.from(files || []).map((file) => {
            const isAttached = typeof file === "string";
            if (isAttached) {
              const stringArr = file.split("/");
              const name = stringArr[stringArr.length - 1] || "";

              return (
                <ListItem key={name}>
                  <div className="file-details">
                    <div className="file-preview">
                      {renderFilePreview(file, dispatch)}
                    </div>
                    <div>
                      <Typography className="file-name">{name}</Typography>
                    </div>
                  </div>
                  {!disabled && (
                    <IconButton onClick={() => handleRemoveFile(file)}>
                      <Close fontSize="small" />
                    </IconButton>
                  )}
                </ListItem>
              );
            }
            return (
              <ListItem key={file.name}>
                <div className="file-details">
                  <div className="file-preview">
                    {renderFilePreview(file, dispatch)}
                  </div>
                  <div>
                    <Typography className="file-name">{file.name}</Typography>
                    <Typography className="file-size" variant="body2">
                      {Math.round(file.size / 100) / 10 > 1000
                        ? `${(Math.round(file.size / 100) / 10000).toFixed(
                            1
                          )} mb`
                        : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                    </Typography>
                  </div>
                </div>
                {!disabled && (
                  <IconButton onClick={() => handleRemoveFile(file)}>
                    <Close fontSize="small" />
                  </IconButton>
                )}
              </ListItem>
            );
          })}
        </StyleList>
      )}
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default FileUploadComp;
