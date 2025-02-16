import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Box, Typography } from "@mui/material";

import useSnackbar from "@/datastore/snackbar";

type PropsType = {
  onFileChosen: (fileContents: string) => void;
};

export function FileDropZone(props: PropsType) {
  const { onFileChosen } = props;

  const { displayMessage: snackbar } = useSnackbar();

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => snackbar("Aborted file read", "info");
      reader.onerror = () => snackbar("Could not read file", "error");
      // callback for when the file has been read
      reader.onload = () => {
        onFileChosen(reader.result as string);

        // const binaryStr = reader.result;
        // console.log(binaryStr);
      };
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });

  return (
    <Box {...getRootProps()}>
      <input {...getInputProps()} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "30em",
          height: "12em",
          border: "3px dashed grey",
          borderRadius: "16px",
          opacity: "0.6",
        }}
      >
        <Typography variant="body1">
          Upload a CSV export from Adventurer's League Logs
        </Typography>
        <br />
        <Typography variant="body2">
          Drag CSV file here or click to select a file
        </Typography>
      </Box>
    </Box>
  );
}

export default FileDropZone;
