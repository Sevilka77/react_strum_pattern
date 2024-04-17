
import { useEffect } from "react";
import click1 from "./click1.wav"
import click2 from "./click2.wav"


// export class RecordedClickService {


//   play(id, note) {

//     if (id % note === 0) {
//       click1.play();
//     } else {
//       click2.play();
//     }
//   }
// }

// const recordedClickService = new RecordedClickService();



// export default class useMetronomeSound extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       activeBeatIndex: this.props.activeBeatIndex,
//       isPlaying: this.props.isPlaying,
//       isMetronomeSound: this.props.isMetronomeSound,
//       note: this.props.note,
//     }
//     this.click1 = new Audio(click1);
//     this.click2 = new Audio(click2);
//   }

//   playClick = () => {
//     const { activeBeatIndex, note } = this.state;

//     if (activeBeatIndex % note === 0) {
//       this.click2.play();

//     } else {
//       this.click1.play();
//     }
//   }

// useEffect(() => {
//   if (activeBeatIndex !== null && isPlaying && isMetronomeSound && (activeBeatIndex % 1 == 0)) recordedClickService.play(activeBeatIndex, note)
// }
//   , [activeBeatIndex, isPlaying, isMetronomeSound, note]
// );

export default function useMetronomeSound(activeBeatIndex, isPlaying, isMetronomeSound, note) {
  const cl1 = new Audio(click1)
  const cl2 = new Audio(click2)
  useEffect(() => {
    if (isPlaying && isMetronomeSound) {
      console.log(activeBeatIndex % note)
      if (activeBeatIndex % note === 0) {
        cl2.play()
      } else {
        cl1.play();
      }
    }

  }, [activeBeatIndex, isMetronomeSound, isPlaying, note])

}
