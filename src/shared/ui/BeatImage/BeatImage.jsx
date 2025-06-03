import { useTheme } from "@mui/material";
import { ArrowPath, XPath, XArrowPath, HalfArrowPath } from "@/shared/ui/Icons";
export default function BeatImage({ beatString, title }) {
  const theme = useTheme();
  const iconSize = 24;
  const beatNumbers = beatString.length;

  const beatPath = beatString.split("").map((beat, index) => {
    const transform = index % 2 === 0 ? "" : "rotate(180 12 12)";
    const transformHalfBArrow = index % 2 === 0 ? "" : "rotate(180 12 6.5)";
    const transformHalfHArrow =
      index % 2 === 0 ? "translate(0 11)" : "rotate(180 12 12)";
    const translate = `translate(${iconSize * index} 0)`;

    const beatComponents = {
      0: (
        <g
          key={index}
          fill="none"
          stroke={theme.palette.action.disabled}
          transform={`${translate} ${transform}`}
        >
          {ArrowPath}
        </g>
      ),
      1: (
        <g
          key={index}
          fill="none"
          stroke={theme.palette.primary.main}
          transform={`${translate} ${transform}`}
        >
          {ArrowPath}
        </g>
      ),
      x: (
        <g
          key={index}
          fill="none"
          stroke={theme.palette.primary.main}
          transform={`${translate} ${transform}`}
        >
          {XPath}
        </g>
      ),
      A: (
        <g
          key={index}
          fill="none"
          stroke={theme.palette.warning.main}
          transform={`${translate} ${transform}`}
        >
          {ArrowPath}
        </g>
      ),
      c: (
        <g
          key={index}
          fill="none"
          stroke={theme.palette.primary.main}
          transform={`${translate} ${transform}`}
        >
          {XArrowPath}
        </g>
      ),
      b: (
        <g
          key={index}
          fill="none"
          stroke={theme.palette.primary.main}
          transform={`${translate} ${transformHalfBArrow}`}
        >
          {HalfArrowPath}
        </g>
      ),
      h: (
        <g
          key={index}
          fill="none"
          stroke={theme.palette.primary.main}
          transform={`${translate} ${transformHalfHArrow}`}
        >
          {HalfArrowPath}
        </g>
      ),
    };

    return beatComponents[beat] || null;
  });
  return (
    <svg
      key={beatString}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${iconSize * beatNumbers} ${iconSize}`}
      width={`${iconSize * beatNumbers}`}
      height={`${iconSize}`}
      role="img"
      aria-labelledby="title desc"
    >
      <title id="title">{title}</title>
      <desc id="desc">Cхема гитарного боя: {title}</desc>
      {beatPath}
    </svg>
  );
}
