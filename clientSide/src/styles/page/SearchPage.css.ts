import { style } from "@vanilla-extract/css";
import { vars } from "../global/themes.css";
import * as fonts from "../fonts/fonts.css";

export const container = style({
  // width: "100%",
  // marginTop: "20vh",
  width: "70vw",
  height: "auto",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  margin: "15vh auto",
  "@media screen and (max-width: 768px)": { width: "100vw" },
});

export const List = style({
  width: "100%",
  padding: "5rem 0",
});

export const warnText = style({
  display: "flex",
  justifyContent: "center",
  marginTop: "20vh",
  fontFamily: fonts.futuraTabText,
  
});


export const Item = style({
  // height: "400px",
  // overflow: "hidden",
  // boxShadow: "1px 2px 8px 2px rgba(0, 0, 0, 0.3)",
  // margin: "20px 4px",
  height: "420px",
  overflow: "hidden",
  boxShadow: "1px 2px 8px 2px rgba(0, 0, 0, 0.3)",
  margin: "20px 4px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "5px",
});

export const ItemText = style({
  // height: "65px",
  // fontSize: "16px",
  // position: "relative",
  // textAlign: "left",
  // //   textAlign: "center",
  // padding: "2% 5%",
  // //   paddingLeft: "1rem",
  // fontWeight: "600",
  textAlign: "left",
  position: "relative",
  padding: "1.1rem",
});

export const ItemImage = style({
  // opacity: 1,
  // width: "100%",
  // height: "230px",
  // padding: 0,
  // transition: "all 0.5s ease",
  // ":hover": { opacity: 0.8 },
  opacity: 1,
  width: "100%",
  height: "230px",
  overflow: "hidden",
  padding: 0,
  transition: "all 0.5s ease",
  ":hover": { opacity: 0.9 },
});

export const code = style({
  fontSize: vars.fontSizes["1x"],
  fontWeight: vars.fontWeights.normal,
  opacity: 0.7,
});
// export const description = style({
//   fontFamily: vars.fonts.body,
//   fontSize: vars.fontSizes["1x"],
//   fontWeight: vars.fontWeights.normal,
// });

// export const button = style({
//   fontFamily: vars.fonts.brand,
//   fontSize: vars.fontSizes["1x"],
//   fontWeight: vars.fontWeights.normal,
//   border: "none",
//   outline: 0,
//   display: "inline-block",
//   padding: "4px",
//   color: "white",
//   backgroundColor: vars.colors.brand,
//   textAlign: "center",
//   cursor: "pointer",
//   width: "80%",
//   position: "absolute",
//   marginTop: 0,
//   left: "10%",
//   ":hover": { backgroundColor: vars.colors.brandDark },
// });

export const button = style({
  fontFamily: vars.fonts.brand,
  fontSize: vars.fontSizes["1x"],
  fontWeight: vars.fontWeights.normal,
  border: "none",
  outline: 0,
  display: "inline-block",
  padding: "4px",
  color: "white",
  backgroundColor: vars.colors.brand,
  textAlign: "center",
  cursor: "pointer",
  width: "80%",
  marginTop: "auto",
  marginLeft: "10%",
  marginBottom: "1rem",
  ":hover": { backgroundColor: vars.colors.brandDark },
});
