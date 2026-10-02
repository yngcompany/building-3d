import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './three.css'
import ThreeBuilding from './ThreeBuilding'

const rooms = [
  { id:'rooftop', floor:'ROOF', icon:'☼', title:'Garden after hours', type:'ROOFTOP', color:'#d4ff45', text:'Mina is winding down among the plants. The rooftop shifts from work mode to a tiny, shared escape.', detail:'Ambient activity · 08:42 PM', person:'mina', x:'70%', y:'8%' },
  { id:'studio', floor:'03', icon:'✦', title:'Ideas, in progress.', type:'CREATIVE STUDIO', color:'#a1b8ff', text:'Joon is arranging the next prototype. Clickable objects become short stories, not interface clutter.', detail:'Focus session · 04:18 PM', person:'joon', x:'30%', y:'31%' },
  { id:'library', floor:'02', icon:'◌', title:'The quietest room.', type:'LIBRARY', color:'#f2bb7c', text:'An open library doubles as a private thinking space — daylight, notes and time slowed down.', detail:'Reading ritual · 11:05 AM', person:'ara', x:'72%', y:'57%' },
  { id:'game', floor:'02', icon:'▶', title:'Level up, together.', type:'GAME LOUNGE', color:'#ff765e', text:'A game night is rendered as a living moment. Screens glow, friends gather and the room becomes the interface.', detail:'Multiplayer · 09:26 PM', person:'dani', x:'25%', y:'62%' },
  { id:'kitchen', floor:'01', icon:'✳', title:'Morning, unhurried.', type:'KITCHEN', color:'#ffca58', text:'The kitchen is where the building wakes up. Small interactions reveal routines, objects and human presence.', detail:'Breakfast prep · 07:34 AM', person:'sol', x:'66%', y:'87%' },
  { id:'work', floor:'01', icon:'↗', title:'Deep work in daylight.', type:'HOME OFFICE', color:'#73dbbd', text:'A focused workstation turns an everyday room into a productive world, with context hiding in every detail.', detail:'Design review · 02:10 PM', person:'neo', x:'27%', y:'84%' },
]

const Room = ({ room, selected, onSelect }) => <button className={`hotspot ${selected?.id === room.id ? 'selected' : ''}`} style={{'--x':room.x,'--y':room.y,'--accent':room.color}} onClick={() => onSelect(room)} aria-label={`Explore ${room.title}`}><span className="pulse"/><span className="pin">{room.icon}</span><span className="pin-name">{room.type}</span></button>

function Person({ kind, label }) { return <div className={`person ${kind}`}><div className="head"/><div className="hair"/><div className="body"/><div className="leg left"/><div className="leg right"/><span>{label}</span></div> }

function Floor({ number, children, tone }) { return <section className={`floor floor-${number}`} style={{'--tone':tone}}><div className="floor-label"><b>{number}</b><span>{number === 'ROOF' ? 'OPEN AIR' : 'LEVEL'}</span></div>{children}</section> }

function App(){
  const [selected,setSelected]=useState(rooms[1]); const [night,setNight]=useState(false)
  useEffect(()=>{const handler=e=>{if(e.key==='Escape')setSelected(null)};window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler)},[])
  return <main className={night?'app night':'app'}>
    <header><a className="brand"><span>H/</span> HOME<span>SCAPE</span><small>by yngcompany</small></a><p>INTERACTIVE LIVING BUILDING <i>✦</i> 2026</p><button className="mode" onClick={()=>setNight(!night)}>{night?'DAY MODE':'NIGHT MODE'} <b>{night?'☼':'◐'}</b></button></header>
    <aside className="intro"><p className="kicker">EXPLORE A LIVED-IN WORLD</p><h1>Every room<br/>has a <em>story.</em></h1><p className="intro-copy">A scrollable building cutaway where spaces, people and everyday rituals become interactive.</p><div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i>↓</i></div></aside>
    <div className="building-wrap"><div className="building-shadow"/><div className="building">
      <Floor number="ROOF" tone="#65794b"><div className="roof-rail"/><div className="plant p1">♧</div><div className="plant p2">♣</div><div className="deck-chair"/><Person kind="sitting" label="MINA"/><div className="moon">☾</div></Floor>
      <Floor number="03" tone="#55738b"><div className="room studio-room"><div className="window large"><i/></div><div className="desk"><div className="monitor"/></div><div className="shelf"><i/><i/><i/></div><div className="canvas-art">∿</div><Person kind="working" label="JOON"/></div></Floor>
      <Floor number="02" tone="#855f51"><div className="room game-room"><div className="sofa"/><div className="screen">PLAY<br/><b>ON</b></div><div className="game-console"/><Person kind="gaming" label="DANI"/></div><div className="room library-room"><div className="window"><i/></div><div className="bookcase"><b/><b/><b/><b/></div><div className="lamp"/><div className="reading-chair"/><Person kind="reading" label="ARA"/></div></Floor>
      <Floor number="01" tone="#79735b"><div className="room work-room"><div className="window"><i/></div><div className="desk workdesk"><div className="monitor"/></div><div className="noticeboard">✦<br/>○</div><Person kind="working" label="NEO"/></div><div className="room kitchen-room"><div className="cabinets"/><div className="counter"><i/></div><div className="fridge"/><div className="table"><i/></div><Person kind="cooking" label="SOL"/></div></Floor>
      {rooms.map(room=><Room key={room.id} room={room} selected={selected} onSelect={setSelected}/>)}</div></div>
    {selected&&<aside className="story-card" style={{'--accent':selected.color}}><button className="close" onClick={()=>setSelected(null)}>×</button><div className="card-top"><span>{selected.floor}F / {selected.type}</span><b>{selected.icon}</b></div><h2>{selected.title}</h2><p>{selected.text}</p><footer><span>{selected.detail}</span><button onClick={()=>setSelected(null)}>KEEP EXPLORING <i>→</i></button></footer></aside>}
    <div className="legend"><span><i className="legend-pin"/> CLICKABLE MOMENTS</span><span>6 SPACES · 6 STORIES</span></div>
  </main>
}
createRoot(document.getElementById('root')).render(<ThreeBuilding/>)
