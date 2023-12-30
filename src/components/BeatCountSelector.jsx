
import IncDec from "./IncDec";



export default function BeatCountSelector({ beatCount, onBeatCountChanged }) {
  return (
    <div className="flex flex-col items-center">
      <p>Number of beats</p>

      <IncDec
        label={"" + beatCount}
        onInc={() => onBeatCountChanged(beatCount + 1)}
        onDec={() => onBeatCountChanged(beatCount - 1)}
      />
    </div>
  );
}
