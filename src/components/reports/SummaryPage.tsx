import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface SummaryCardProps {
  title: string;
  value: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        textAlign: "center",
        minWidth: 200,
        "&.dark": {
          backgroundColor: "primary.main",
          color: "white",
        },
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" color="primary">
        {value}
      </Typography>
    </Paper>
  );
};

export default SummaryCard;