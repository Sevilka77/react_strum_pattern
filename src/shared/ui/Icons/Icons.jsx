import createSvgIcon from "@mui/material/utils/createSvgIcon";

const ArrowPath = (
  <path
    d="m15.11,1l-6.16,0a0.38,0.37 0 0 0 -0.38,0.37l0,11.73a0.38,0.37 0 0 1 -0.38,0.37l-3.74,0a0.38,0.37 0 0 0 -0.29,0.6l7.59,8.71a0.38,0.37 0 0 0 0.58,0l7.59,-8.71a0.38,0.37 0 0 0 -0.29,-0.6l-3.74,0a0.38,0.37 0 0 1 -0.38,-0.37l0,-11.73a0.38,0.37 0 0 0 -0.38,-0.37z"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

const XPath = (
  <path d="m8.01,4.99a2.33,2.24 0 0 0 -3.25,3.22l3.86,3.63l-3.86,3.63a2.33,2.24 0 1 0 3.25,3.22l3.95,-3.71l3.95,3.71a2.33,2.24 0 1 0 3.25,-3.22l-3.86,-3.63l3.86,-3.63a2.33,2.24 0 0 0 -3.25,-3.22l-3.95,3.71l-3.95,-3.71z" />
);
const XArrowPath = (
  <>
    <path
      d="m10.68,3.03l-2.41,-1.96m2.41,0l-2.41,1.96m2.41,3.48l-2.41,-1.97m2.41,0l-2.41,1.97m2.46,3.47l-2.46,-2.01m2.46,0l-2.46,2.01m7.5,-6.95l-2.41,-1.96m2.41,0l-2.41,1.96m2.41,3.48l-2.41,-1.97m2.41,0l-2.41,1.97m2.41,3.47l-2.41,-1.96m2.41,0l-2.41,1.96"
      strokeWidth="1"
    />
    <path d="m15.5,12.01l-6.93,0a0.38,0.36 0 0 0 -0.38,0.36l0,1.36a0.38,0.36 0 0 1 -0.38,0.36l-3.41,0a0.38,0.36 0 0 0 -0.29,0.6l7.62,8.22a0.38,0.36 0 0 0 0.58,0l7.58,-8.22a0.38,0.36 0 0 0 -0.29,-0.6l-3.32,0a0.38,0.36 0 0 1 -0.38,-0.36l0,-1.36a0.38,0.36 0 0 0 -0.38,-0.36l-0.02,0z" />
  </>
);
const HalfArrowPath = (
  <path d="m8.42,1l-3.52,0a0.36,0.41 0 0 0 -0.27,0.68l7.13,9.73a0.36,0.41 0 0 0 0.55,0l7.13,-9.73a0.36,0.41 0 0 0 -0.27,-0.68l-3.52,0l-7.23,0z" />
);

const ShareIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1}
    stroke="currentColor"
  >
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
  </svg>,
  "ShareIcon",
);
const EditIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1}
    stroke="currentColor"
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>,
  "EditIcon",
);
const ListIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1}
    stroke="currentColor"
  >
    <path d="M21 15V6" />
    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    <path d="M12 12H3" />
    <path d="M16 6H3" />
    <path d="M12 18H3" />
  </svg>,
  "ListIcon",
);
const ArrowD = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
  >
    {ArrowPath}
  </svg>,
  "ArrowD",
);
const ArrowDH = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <g transform="translate(0 11)"> {HalfArrowPath}</g>
  </svg>,
  "ArrowDH",
);
const ArrowDB = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    {HalfArrowPath}
  </svg>,
  "ArrowDB",
);
const ArrowUH = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <g transform="rotate(180 12 12)"> {HalfArrowPath}</g>
  </svg>,
  "ArrowUH",
);
const ArrowUB = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <g transform="rotate(180 12 6.5)"> {HalfArrowPath}</g>
  </svg>,
  "ArrowUB",
);
const ArrowU = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    transform="rotate(180 0 0)"
  >
    {ArrowPath}
  </svg>,
  "ArrowU",
);
const XIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    {XPath}
  </svg>,
  "XIcon",
);
const XDownIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    {XArrowPath}
  </svg>,
  "XDownIcon",
);

const XUpIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    transform="rotate(180 0 0)"
  >
    {XArrowPath}
  </svg>,
  "XUpIcon",
);
const PlayIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>,
  "PlayIcon",
);
const SquareIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1}
    stroke="currentColor"
  >
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
  </svg>,
  "StopIcon",
);

export {
  ShareIcon,
  EditIcon,
  ListIcon,
  ArrowD,
  ArrowDH,
  ArrowDB,
  ArrowU,
  ArrowUH,
  ArrowUB,
  XDownIcon,
  XUpIcon,
  XIcon,
  PlayIcon,
  SquareIcon,
  ArrowPath,
  XArrowPath,
  XPath,
  HalfArrowPath,
};
