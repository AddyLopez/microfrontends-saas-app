import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const ProgressBar = () => {
  return (
    <Box sx={{ width: "100%", "& > * + *": { mt: 2 } }}>
      <LinearProgress />
    </Box>
  );
};

export default ProgressBar;
