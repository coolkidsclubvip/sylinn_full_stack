import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "./global/themes.css";




export const imageContainer = style({
  backgroundImage: "url(/images/title_images/category_bg.png)",
  backgroundSize: "cover",
  position: "relative",
  height: "200px",
  marginTop: "70px",
  "@media screen and (max-width: 768px)": { marginTop: "150px" },
});
export const titleText = style({
  backgroundColor: "white",
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSizes["6x"],
  fontWeight: vars.fontWeights.bolder,
  margin: "0 auto",
  padding: "1rem",
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  mixBlendMode: "screen",
});

export const container = style({
  position: "relative",
  width: "100%",
  marginTop: "90px",
  minHeight: "68vh",
  textAlign: "center",
  // backgroundColor: "greenyellow",
});


export const addItemBG = style({
  position: "absolute",
  width: "100vw",
  height: "auto", // Set height to cover the entire screen
  
  backgroundColor: "rgba(200, 200, 200, 0.95)",
  backgroundSize: "cover", // Change to cover
  zIndex: 100,
  left: "50%", // Change to left instead of marginLeft
  transform: "translateX(-50%)", // Change to transform

  padding: "5rem 2rem",
});

