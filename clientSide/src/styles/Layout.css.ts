import { style } from "@vanilla-extract/css";
import { vars } from "./global/themes.css";

export const app = style({
  fontFamily:vars.fonts.body,
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: vars.colors.white,
});

export const appContent = style({
  margin: "1rem 0",
  flex: 1,
});