import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/global/themes.css";

export const searchForm = style({
  width: "90%",
  height: "70px",
  paddingLeft: "50%",
  transform: "translateX(-20%)",
  "@media screen and (max-width: 768px)": { width: "100vw" },
});
