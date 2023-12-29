import Beat from "./Beat";

export default function Strum() {
  return (
    <main id="strumPattern" className="grid grid-cols-4 gap-4">

      <Beat beat={1} /> <Beat beat={2} /><Beat beat={3} />

    </main>
  )
}