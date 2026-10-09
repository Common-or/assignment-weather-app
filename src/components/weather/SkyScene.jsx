// Drawn sky pattern behind the hero — a full-scene doodle per weather kind.
// Kept subtle (low opacity, white ink) so the temperature stays the focal point.

function Cloud({ x, y, s = 1, o = 1, dark = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o} fill={dark ? '#1e293b' : '#ffffff'} stroke="#1c1917" strokeWidth="4">
      <ellipse cx="0" cy="0" rx="26" ry="15" />
      <ellipse cx="20" cy="-8" rx="22" ry="15" />
      <ellipse cx="-20" cy="-6" rx="18" ry="12" />
    </g>
  )
}

function Sun({ x, y, s = 1, o = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o} stroke="#1c1917" strokeWidth="4" strokeLinecap="round">
      <circle r="14" fill="#ffc93c" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4
        return <line key={i} x1={Math.cos(a) * 20} y1={Math.sin(a) * 20} x2={Math.cos(a) * 29} y2={Math.sin(a) * 29} />
      })}
    </g>
  )
}

function Moon({ x, y, s = 1, o = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
      <path d="M14 -20 A26 26 0 1 0 26 20 A20 20 0 0 1 14 -20 Z" fill="#fde047" stroke="#1c1917" strokeWidth="4" strokeLinejoin="round" />
    </g>
  )
}

function Drop({ x, y, s = 1, o = 1 }) {
  return (
    <path
      d={`M${x} ${y} q ${7 * s} ${10 * s} 0 ${16 * s} a ${8 * s} ${8 * s} 0 1 1 ${-14 * s} ${-4 * s} q ${4 * s} ${-6 * s} ${14 * s} ${-12 * s}`}
      fill="#7dd3fc"
      stroke="#1c1917"
      strokeWidth="3"
      opacity={o}
    />
  )
}

function Bolt({ x, y, s = 1, o = 1 }) {
  return (
    <path
      d={`M${x} ${y} L${x - 12 * s} ${y + 26 * s} L${x - 2 * s} ${y + 26 * s} L${x - 10 * s} ${y + 48 * s} L${x + 12 * s} ${y + 20 * s} L${x + 1 * s} ${y + 20 * s} Z`}
      fill="#fde047"
      stroke="#1c1917"
      strokeWidth="3"
      strokeLinejoin="round"
      opacity={o}
    />
  )
}

function Flake({ x, y, s = 1, o = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o} stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round">
      {[0, 60, 120].map((r) => (
        <line key={r} x1="-11" y1="0" x2="11" y2="0" transform={`rotate(${r})`} />
      ))}
      <circle r="2.5" fill="#1c1917" stroke="none" />
    </g>
  )
}

function Star({ x, y, s = 1, o = 1 }) {
  return (
    <path
      d={`M${x} ${y - 9 * s} Q${x + 2 * s} ${y - 2 * s} ${x + 9 * s} ${y} Q${x + 2 * s} ${y + 2 * s} ${x} ${y + 9 * s} Q${x - 2 * s} ${y + 2 * s} ${x - 9 * s} ${y} Q${x - 2 * s} ${y - 2 * s} ${x} ${y - 9 * s} Z`}
      fill="#fff"
      opacity={o}
    />
  )
}

function Wave({ y, o = 1 }) {
  return <path d={`M-20 ${y} Q 60 ${y - 14} 140 ${y} T 300 ${y} T 460 ${y} T 620 ${y} T 780 ${y} T 940 ${y}`} fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity={o} />
}

const SCENES = {
  sunny: (
    <>
      <Sun x={680} y={70} s={1.6} o={0.9} />
      <Sun x={120} y={170} s={0.7} o={0.5} />
      <Cloud x={300} y={60} s={0.8} o={0.55} />
      <Cloud x={520} y={170} s={0.6} o={0.4} />
      <Cloud x={820} y={160} s={0.9} o={0.5} />
    </>
  ),
  partly: (
    <>
      <Sun x={640} y={70} s={1.2} o={0.85} />
      <Cloud x={280} y={70} s={1} o={0.8} />
      <Cloud x={500} y={165} s={0.7} o={0.55} />
      <Cloud x={800} y={150} s={0.9} o={0.6} />
      <Cloud x={120} y={170} s={0.6} o={0.45} />
    </>
  ),
  cloudy: (
    <>
      <Cloud x={140} y={70} s={1.1} o={0.8} />
      <Cloud x={360} y={45} s={0.9} o={0.65} />
      <Cloud x={580} y={80} s={1.2} o={0.8} />
      <Cloud x={790} y={50} s={0.9} o={0.65} />
      <Cloud x={260} y={165} s={0.7} o={0.5} />
      <Cloud x={660} y={170} s={0.8} o={0.55} />
    </>
  ),
  rain: (
    <>
      <Cloud x={180} y={55} s={1.1} o={0.9} dark />
      <Cloud x={480} y={40} s={1} o={0.85} dark />
      <Cloud x={760} y={60} s={1.1} o={0.9} dark />
      <Drop x={120} y={110} o={0.9} />
      <Drop x={220} y={130} s={0.8} o={0.7} />
      <Drop x={330} y={110} o={0.9} />
      <Drop x={440} y={135} s={0.8} o={0.7} />
      <Drop x={550} y={110} o={0.9} />
      <Drop x={660} y={130} s={0.8} o={0.7} />
      <Drop x={770} y={110} o={0.9} />
    </>
  ),
  storm: (
    <>
      <Cloud x={200} y={50} s={1.2} o={0.95} dark />
      <Cloud x={520} y={40} s={1.1} o={0.9} dark />
      <Cloud x={790} y={55} s={1} o={0.9} dark />
      <Bolt x={250} y={100} o={0.95} />
      <Bolt x={560} y={95} s={0.8} o={0.85} />
      <Bolt x={770} y={105} s={0.9} o={0.9} />
    </>
  ),
  snow: (
    <>
      <Cloud x={200} y={50} s={1.1} o={0.9} />
      <Cloud x={520} y={40} s={1} o={0.85} />
      <Cloud x={780} y={55} s={1} o={0.9} />
      <Flake x={130} y={120} o={0.95} />
      <Flake x={260} y={150} s={0.7} o={0.8} />
      <Flake x={400} y={120} s={1.2} o={0.95} />
      <Flake x={540} y={150} s={0.8} o={0.85} />
      <Flake x={680} y={120} o={0.95} />
      <Flake x={810} y={150} s={0.7} o={0.8} />
    </>
  ),
  fog: (
    <>
      <Wave y={60} o={0.7} />
      <Wave y={100} o={0.55} />
      <Wave y={140} o={0.7} />
      <Wave y={180} o={0.45} />
      <Cloud x={700} y={55} s={0.9} o={0.6} />
    </>
  ),
  night: (
    <>
      <Moon x={700} y={70} s={1.4} o={0.95} />
      <Star x={120} y={50} s={1} o={0.9} />
      <Star x={260} y={130} s={0.7} o={0.7} />
      <Star x={400} y={50} s={0.9} o={0.85} />
      <Star x={540} y={140} s={0.7} o={0.7} />
      <Star x={830} y={130} s={0.9} o={0.85} />
      <Star x={620} y={150} s={0.6} o={0.6} />
      <Cloud x={300} y={70} s={0.8} o={0.4} dark />
    </>
  ),
}

function sceneFor(kind) {
  if (kind === 'sunny') return SCENES.sunny
  if (kind === 'partly') return SCENES.partly
  if (kind === 'cloudy') return SCENES.cloudy
  if (kind === 'rain') return SCENES.rain
  if (kind === 'storm') return SCENES.storm
  if (kind === 'snow') return SCENES.snow
  if (kind === 'fog') return SCENES.fog
  return SCENES.night // clear-night, partly-night, cloudy-night, rain-night, storm-night
}

export function SkyScene({ kind }) {
  return (
    <svg
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 900 220"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {sceneFor(kind)}
    </svg>
  )
}
