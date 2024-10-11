import { ArrowU, ArrowD, XIcon, XUpIcon, XDownIcon } from "./Icons"; // Замени на путь к своим иконкам

export default function BeatImage({ beatString, fill }) {
  const iconSize = 24; // Размер иконок

  const beatIcons = beatString.split("").map((beat, index) => {
    let IconComponent;
    let iconColor = "primary";
    let iconFill = fill && "currentColor";
    switch (beat) {
      case "0":
        iconColor = "disabled";
        IconComponent =
          index % 2 === 0 ? (
            <ArrowD color={iconColor} sx={{ fill: iconFill }} />
          ) : (
            <ArrowU color={iconColor} sx={{ fill: iconFill }} />
          );

        break;
      case "1":
        IconComponent =
          index % 2 === 0 ? (
            <ArrowD color={iconColor} sx={{ fill: iconFill }} />
          ) : (
            <ArrowU color={iconColor} sx={{ fill: iconFill }} />
          );

        break;
      case "A":
        iconColor = "warning";
        IconComponent =
          index % 2 === 0 ? (
            <ArrowD color={iconColor} sx={{ fill: iconFill }} />
          ) : (
            <ArrowU color={iconColor} sx={{ fill: iconFill }} />
          );

        break;
      case "x":
        IconComponent = <XIcon color={iconColor} sx={{ fill: iconFill }} />;

        break;
      case "c":
        IconComponent =
          index % 2 === 0 ? (
            <XDownIcon color={iconColor} sx={{ fill: iconFill }} />
          ) : (
            <XUpIcon color={iconColor} sx={{ fill: iconFill }} />
          );
        break;
      default:
        IconComponent = null;
    }

    return (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox={`0 0 ${iconSize} ${iconSize}`}
      >
        <g>{IconComponent}</g>
      </svg>
    );
  });

  return <span style={{ display: "flex" }}>{beatIcons}</span>;
}
