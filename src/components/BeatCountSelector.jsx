
import IncDec from "./IncDec";



export default function BeatCountSelector({ beatCount, onBeatCountChanged }) {
  return (
    <div>
      <p>Number of beats</p>

      <IncDec
        label={"" + beatCount}
        onInc={() => onBeatCountChanged(beatCount + 1)}
        onDec={() => onBeatCountChanged(beatCount - 1)}
      />
    </div>
  );
}
