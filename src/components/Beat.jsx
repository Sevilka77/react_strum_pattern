// eslint-disable-next-line react/prop-types
export default function Beat({ beat }) {

  const isDown = beat % 2 !== 0
  const icon = isDown ? '↓' : '↑'
  const style = isDown ? 'strum-down' : 'strum-up'


  return (<button id={beat} className={'strum ' + style}>{icon}
    <span className="sr-only"></span>
  </button>)
}