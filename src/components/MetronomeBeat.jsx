
import { Stack, Box } from "@mui/material";
import { createSvgIcon } from '@mui/material/utils';


const ArrowD = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 32"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.03 1H7.97a.5.5 0 0 0-.5.5v15.91a.5.5 0 0 1-.5.5H2.074a.5.5 0 0 0-.383.82l9.927 11.814a.5.5 0 0 0 .766 0l9.927-11.813a.5.5 0 0 0-.383-.822h-4.898a.5.5 0 0 1-.5-.5V1.5a.5.5 0 0 0-.5-.5Z" />
  </svg>,
  'ArrowD',
);
const ArrowU = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 32"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.03 31H7.97a.5.5 0 0 1-.5-.5V14.59a.5.5 0 0 0-.5-.5H2.074a.5.5 0 0 1-.383-.82l9.927-11.814a.5.5 0 0 1 .766 0l9.927 11.813a.5.5 0 0 1-.383.822h-4.898a.5.5 0 0 0-.5.5V30.5a.5.5 0 0 1-.5.5Z" />
  </svg>,
  'ArrowU',
);
const XIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 32"
    strokeWidth={1}
    stroke="currentColor"
  >
    <path fillRule="evenodd" d="M7.094 6.852a3 3 0 0 0-4.188 4.296L7.882 16l-4.976 4.852a3 3 0 1 0 4.188 4.296l5.086-4.958 5.085 4.958a3 3 0 1 0 4.188-4.296L16.477 16l4.976-4.852a3 3 0 0 0-4.188-4.296L12.18 11.81 7.094 6.852Z" /><path d="m7.094 6.852-.349.358.35-.358Zm-4.188 4.296.349-.358-.35.358ZM7.882 16l.35.358.366-.358-.367-.358-.349.358Zm-4.976 4.852-.35-.358.35.358Zm-.054 4.242-.358.35.358-.35Zm4.242.054-.349-.358.35.358Zm5.086-4.958.349-.358-.35-.34-.348.34.349.358Zm5.085 4.958-.35.358.35-.358Zm4.242-.054.358.35-.358-.35Zm-.054-4.242.35-.358-.35.358ZM16.477 16l-.35-.358-.366.358.367.358.349-.358Zm4.976-4.852-.349-.358.35.358Zm.054-4.242.358-.35-.358.35Zm-4.242-.054-.35-.358.35.358ZM12.18 11.81l-.35.358.35.34.349-.34-.35-.358ZM3.21 7.255a2.5 2.5 0 0 1 3.535-.045l.698-.716a3.5 3.5 0 0 0-4.949.063l.716.698Zm.045 3.535a2.5 2.5 0 0 1-.045-3.535l-.716-.698a3.5 3.5 0 0 0 .063 4.949l.698-.716Zm4.976 4.852L3.255 10.79l-.698.716 4.976 4.852.698-.716ZM3.255 21.21l4.976-4.852-.698-.716-4.976 4.852.698.716Zm-.045 3.535a2.5 2.5 0 0 1 .045-3.535l-.698-.716a3.5 3.5 0 0 0-.063 4.95l.716-.699Zm3.535.045a2.5 2.5 0 0 1-3.535-.045l-.716.698a3.5 3.5 0 0 0 4.95.063l-.699-.716Zm5.086-4.958L6.745 24.79l.698.716 5.086-4.958-.698-.716Zm5.783 4.958-5.085-4.958-.698.716 5.085 4.958.698-.716Zm3.535-.045a2.5 2.5 0 0 1-3.535.045l-.698.716a3.5 3.5 0 0 0 4.949-.063l-.716-.698Zm-.045-3.535a2.5 2.5 0 0 1 .045 3.535l.716.698a3.5 3.5 0 0 0-.063-4.949l-.698.716Zm-4.976-4.852 4.976 4.852.698-.716-4.976-4.852-.698.716Zm4.976-5.568-4.976 4.852.698.716 4.976-4.852-.698-.716Zm.045-3.535a2.5 2.5 0 0 1-.045 3.535l.698.716a3.5 3.5 0 0 0 .063-4.95l-.716.699Zm-3.535-.045a2.5 2.5 0 0 1 3.535.045l.716-.698a3.5 3.5 0 0 0-4.95-.063l.699.716Zm-5.085 4.958 5.085-4.958-.698-.716-5.085 4.958.698.716ZM6.745 7.21l5.086 4.958.698-.716-5.086-4.958-.698.716Z" />
  </svg>,

  'XIcon',
);
const XDownIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 32"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" d="M10.567 4.133 8 1.63M10.567 1.63 8 4.133M10.567 8.566 8 6.063M10.567 6.063 8 8.566M10.625 13 8 10.44M10.625 10.44 8 13M16 4.133 13.433 1.63M16 1.63l-2.567 2.503M16 8.566l-2.567-2.503M16 6.063l-2.567 2.503M16 13l-2.567-2.503M16 10.497 13.433 13" />
    <path d="M16.557 15.002 7.5 15a.5.5 0 0 0-.5.5v1.883a.5.5 0 0 1-.5.5H2.039a.5.5 0 0 0-.376.83l9.96 11.357a.5.5 0 0 0 .753-.001l9.902-11.358a.5.5 0 0 0-.377-.828h-4.344a.5.5 0 0 1-.5-.5v-1.881a.5.5 0 0 0-.5-.5Z" />
  </svg>,
  'XDownIcon',
);
// eslint-disable-next-line no-unused-vars
const XUpIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 32"
    strokeWidth={2}
    stroke="currentColor"
  >

    <path strokeLinecap="round" d="M10.567 27.867 8 30.37M10.567 30.37 8 27.867M10.567 23.434 8 25.936M10.567 25.936 8 23.434M10.625 19 8 21.56M10.625 21.56 8 19M16 27.867l-2.567 2.503M16 30.37l-2.567-2.503M16 23.434l-2.567 2.502M16 25.936l-2.567-2.502M16 19l-2.567 2.503M16 21.503 13.433 19" />
    <path d="M16.557 16.998 7.5 17a.5.5 0 0 1-.5-.5v-1.883a.5.5 0 0 0-.5-.5H2.039a.5.5 0 0 1-.376-.83l9.96-11.357a.5.5 0 0 1 .753.001l9.902 11.358a.5.5 0 0 1-.377.828h-4.344a.5.5 0 0 0-.5.5v1.881a.5.5 0 0 1-.5.5Z" />
  </svg>,
  'XUpIcon',
);


export default function MetronomeBeat({ id, beatStatus, active, note }) {

  const isUp = id % 2 !== 0
  let nameId

  if (isUp) {
    nameId = "e"
  } else {
    nameId = (id + 2) / 2
  }

  let color = "primary.main";
  let icon
  if (id % note === 0) {
    color = 'warning.main'
  }
  let bColor = "#ffffff0";
  let aColor = "#ffffff0";
  if (active) {
    bColor = "currentColor";
    aColor = '#ed6c02'
  }



  if (beatStatus == "0") {

    if (isUp) {
      icon = <ArrowU fontSize="inherit" color="disabled" sx={{ fill: bColor }} />
    } else {
      icon = <ArrowD fontSize="inherit" color="disabled" sx={{ fill: bColor }} />
    }

  }

  if (beatStatus == "1") {

    if (isUp) {

      icon = <ArrowU fontSize="inherit" color="primary" sx={{ fill: bColor }} />
    } else {

      icon = <ArrowD fontSize="inherit" color="primary" sx={{ fill: bColor }} />
    }

  }
  if (beatStatus == "A") {

    if (isUp) {

      icon = <ArrowU c color="warning" sx={{ fill: bColor }} />
    } else {

      icon = <ArrowD fontSize="inherit" color="warning" sx={{ fill: bColor }} />
    }

  }
  if (beatStatus == "x") {

    if (isUp) {

      icon = <XIcon fontSize="inherit" color="primary" sx={{ fill: bColor }} />
    } else {

      icon = <XIcon fontSize="inherit" color="primary" sx={{ fill: bColor }} />
    }
  }
  if (beatStatus == "c") {
    if (isUp) {

      icon = <XUpIcon fontSize="inherit" color="primary" sx={{ fill: bColor, fontSize: 120 }} />
    } else {

      icon = <XDownIcon fontSize="inherit" color="primary" sx={{ fill: bColor }} />
    }

  }




  return (
    <Stack orientation="vertical" sx={{
      width: "auto", fontSize: "6vw"
    }} >
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: "-2vh",

        color: color
      }}> {nameId} </Box>
      <Box sx={{ height: "1vh", bgcolor: aColor, marginBottom: "1vh" }} />
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 1,

      }}
      >
        {icon
        }
      </Box>
    </ Stack >
  );
}
