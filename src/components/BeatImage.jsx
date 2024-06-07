import { ArrowU, ArrowD, XIcon, XUpIcon, XDownIcon } from "./Icons"; // Замени на путь к своим иконкам

export default function BeatImage({ beatString }) {
  const iconSize = 24; // Размер иконок

  const beatIcons = beatString.split("").map((beat, index) => {
    let IconComponent;
    let iconColor = "primary";
    switch (beat) {
      case "0":
        iconColor = "disabled";
        IconComponent =
          index % 2 === 0 ? (
            <ArrowD color={iconColor} />
          ) : (
            <ArrowU color={iconColor} />
          );

        break;
      case "1":
        IconComponent =
          index % 2 === 0 ? (
            <ArrowD color={iconColor} />
          ) : (
            <ArrowU color={iconColor} />
          );

        break;
      case "A":
        iconColor = "warning";
        IconComponent =
          index % 2 === 0 ? (
            <ArrowD color={iconColor} />
          ) : (
            <ArrowU color={iconColor} />
          );

        break;
      case "x":
        IconComponent = <XIcon color={iconColor} />;

        break;
      case "c":
        IconComponent =
          index % 2 === 0 ? (
            <XUpIcon color={iconColor} />
          ) : (
            <XDownIcon color={iconColor} />
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

  return <div style={{ display: "flex" }}>{beatIcons}</div>;
}
