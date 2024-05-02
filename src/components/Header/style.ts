import styled from "@emotion/styled";
import { LinkProps, Toolbar, ToolbarProps } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)<LinkProps>(() => ({
    textDecoration: 'none', // Remove underline
    color: 'inherit', // Inherit color from parent
    marginRight: "16px"
}))

export const StyledToolbar = styled(Toolbar)<ToolbarProps>(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}))