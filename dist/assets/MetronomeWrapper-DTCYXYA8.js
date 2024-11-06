import{j as h,g as A,G as T,P as j,u as v}from"./ui-8DO9Joc5.js";import{r as d,a as B}from"./vendor-Bn94jRP8.js";import{T as O,o as L,S as D,n as U,i as z,a as c,b as N,d as g,c as E,e as P,f as w,g as I,h as q,j as C,k as F,X as V,l as Y,m as X,A as S,p as y,P as u,q as x,s as G,u as W}from"./index-BVaiB58p.js";class _ extends O{constructor(){const t=L(_.getDefaults(),arguments,["callback","value"]);super(t),this.name="ToneEvent",this._state=new D("stopped"),this._startOffset=0,this._loop=t.loop,this.callback=t.callback,this.value=t.value,this._loopStart=this.toTicks(t.loopStart),this._loopEnd=this.toTicks(t.loopEnd),this._playbackRate=t.playbackRate,this._probability=t.probability,this._humanize=t.humanize,this.mute=t.mute,this._playbackRate=t.playbackRate,this._state.increasing=!0,this._rescheduleEvents()}static getDefaults(){return Object.assign(O.getDefaults(),{callback:U,humanize:!1,loop:!1,loopEnd:"1m",loopStart:0,mute:!1,playbackRate:1,probability:1,value:null})}_rescheduleEvents(t=-1){this._state.forEachFrom(t,s=>{let e;if(s.state==="started"){s.id!==-1&&this.context.transport.clear(s.id);const a=s.time+Math.round(this.startOffset/this._playbackRate);if(this._loop===!0||z(this._loop)&&this._loop>1){e=1/0,z(this._loop)&&(e=this._loop*this._getLoopDuration());const r=this._state.getAfter(a);r!==null&&(e=Math.min(e,r.time-a)),e!==1/0&&(e=new c(this.context,e));const o=new c(this.context,this._getLoopDuration());s.id=this.context.transport.scheduleRepeat(this._tick.bind(this),o,new c(this.context,a),e)}else s.id=this.context.transport.schedule(this._tick.bind(this),new c(this.context,a))}})}get state(){return this._state.getValueAtTime(this.context.transport.ticks)}get startOffset(){return this._startOffset}set startOffset(t){this._startOffset=t}get probability(){return this._probability}set probability(t){this._probability=t}get humanize(){return this._humanize}set humanize(t){this._humanize=t}start(t){const s=this.toTicks(t);return this._state.getValueAtTime(s)==="stopped"&&(this._state.add({id:-1,state:"started",time:s}),this._rescheduleEvents(s)),this}stop(t){this.cancel(t);const s=this.toTicks(t);if(this._state.getValueAtTime(s)==="started"){this._state.setStateAtTime("stopped",s,{id:-1});const e=this._state.getBefore(s);let a=s;e!==null&&(a=e.time),this._rescheduleEvents(a)}return this}cancel(t){t=g(t,-1/0);const s=this.toTicks(t);return this._state.forEachFrom(s,e=>{this.context.transport.clear(e.id)}),this._state.cancel(s),this}_tick(t){const s=this.context.transport.getTicksAtTime(t);if(!this.mute&&this._state.getValueAtTime(s)==="started"){if(this.probability<1&&Math.random()>this.probability)return;if(this.humanize){let e=.02;N(this.humanize)||(e=this.toSeconds(this.humanize)),t+=(Math.random()*2-1)*e}this.callback(t,this.value)}}_getLoopDuration(){return(this._loopEnd-this._loopStart)/this._playbackRate}get loop(){return this._loop}set loop(t){this._loop=t,this._rescheduleEvents()}get playbackRate(){return this._playbackRate}set playbackRate(t){this._playbackRate=t,this._rescheduleEvents()}get loopEnd(){return new c(this.context,this._loopEnd).toSeconds()}set loopEnd(t){this._loopEnd=this.toTicks(t),this._loop&&this._rescheduleEvents()}get loopStart(){return new c(this.context,this._loopStart).toSeconds()}set loopStart(t){this._loopStart=this.toTicks(t),this._loop&&this._rescheduleEvents()}get progress(){if(this._loop){const t=this.context.transport.ticks,s=this._state.get(t);if(s!==null&&s.state==="started"){const e=this._getLoopDuration();return(t-s.time)%e/e}else return 0}else return 0}dispose(){return super.dispose(),this.cancel(),this._state.dispose(),this}}class b extends _{constructor(){const t=L(b.getDefaults(),arguments,["callback","events"]);super(t),this.name="Part",this._state=new D("stopped"),this._events=new Set,this._state.increasing=!0,t.events.forEach(s=>{E(s)?this.add(s[0],s[1]):this.add(s)})}static getDefaults(){return Object.assign(_.getDefaults(),{events:[]})}start(t,s){const e=this.toTicks(t);if(this._state.getValueAtTime(e)!=="started"){s=g(s,this._loop?this._loopStart:0),this._loop?s=g(s,this._loopStart):s=g(s,0);const a=this.toTicks(s);this._state.add({id:-1,offset:a,state:"started",time:e}),this._forEach(r=>{this._startNote(r,e,a)})}return this}_startNote(t,s,e){s-=e,this._loop?t.startOffset>=this._loopStart&&t.startOffset<this._loopEnd?(t.startOffset<e&&(s+=this._getLoopDuration()),t.start(new c(this.context,s))):t.startOffset<this._loopStart&&t.startOffset>=e&&(t.loop=!1,t.start(new c(this.context,s))):t.startOffset>=e&&t.start(new c(this.context,s))}get startOffset(){return this._startOffset}set startOffset(t){this._startOffset=t,this._forEach(s=>{s.startOffset+=this._startOffset})}stop(t){const s=this.toTicks(t);return this._state.cancel(s),this._state.setStateAtTime("stopped",s),this._forEach(e=>{e.stop(t)}),this}at(t,s){const e=new P(this.context,t).toTicks(),a=new c(this.context,1).toSeconds(),r=this._events.values();let o=r.next();for(;!o.done;){const l=o.value;if(Math.abs(e-l.startOffset)<a)return w(s)&&(l.value=s),l;o=r.next()}return w(s)?(this.add(t,s),this.at(t)):null}add(t,s){t instanceof Object&&Reflect.has(t,"time")&&(s=t,t=s.time);const e=this.toTicks(t);let a;return s instanceof _?(a=s,a.callback=this._tick.bind(this)):a=new _({callback:this._tick.bind(this),context:this.context,value:s}),a.startOffset=e,a.set({humanize:this.humanize,loop:this.loop,loopEnd:this.loopEnd,loopStart:this.loopStart,playbackRate:this.playbackRate,probability:this.probability}),this._events.add(a),this._restartEvent(a),this}_restartEvent(t){this._state.forEach(s=>{s.state==="started"?this._startNote(t,s.time,s.offset):t.stop(new c(this.context,s.time))})}remove(t,s){return I(t)&&t.hasOwnProperty("time")&&(s=t,t=s.time),t=this.toTicks(t),this._events.forEach(e=>{e.startOffset===t&&(q(s)||w(s)&&e.value===s)&&(this._events.delete(e),e.dispose())}),this}clear(){return this._forEach(t=>t.dispose()),this._events.clear(),this}cancel(t){return this._forEach(s=>s.cancel(t)),this._state.cancel(this.toTicks(t)),this}_forEach(t){return this._events&&this._events.forEach(s=>{s instanceof b?s._forEach(t):t(s)}),this}_setAll(t,s){this._forEach(e=>{e[t]=s})}_tick(t,s){this.mute||this.callback(t,s)}_testLoopBoundries(t){this._loop&&(t.startOffset<this._loopStart||t.startOffset>=this._loopEnd)?t.cancel(0):t.state==="stopped"&&this._restartEvent(t)}get probability(){return this._probability}set probability(t){this._probability=t,this._setAll("probability",t)}get humanize(){return this._humanize}set humanize(t){this._humanize=t,this._setAll("humanize",t)}get loop(){return this._loop}set loop(t){this._loop=t,this._forEach(s=>{s.loopStart=this.loopStart,s.loopEnd=this.loopEnd,s.loop=t,this._testLoopBoundries(s)})}get loopEnd(){return new c(this.context,this._loopEnd).toSeconds()}set loopEnd(t){this._loopEnd=this.toTicks(t),this._loop&&this._forEach(s=>{s.loopEnd=t,this._testLoopBoundries(s)})}get loopStart(){return new c(this.context,this._loopStart).toSeconds()}set loopStart(t){this._loopStart=this.toTicks(t),this._loop&&this._forEach(s=>{s.loopStart=this.loopStart,this._testLoopBoundries(s)})}get playbackRate(){return this._playbackRate}set playbackRate(t){this._playbackRate=t,this._setAll("playbackRate",t)}get length(){return this._events.size}dispose(){return super.dispose(),this.clear(),this}}class R extends _{constructor(){const t=L(R.getDefaults(),arguments,["callback","events","subdivision"]);super(t),this.name="Sequence",this._part=new b({callback:this._seqCallback.bind(this),context:this.context}),this._events=[],this._eventsArray=[],this._subdivision=this.toTicks(t.subdivision),this.events=t.events,this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this.playbackRate=t.playbackRate,this.probability=t.probability,this.humanize=t.humanize,this.mute=t.mute,this.playbackRate=t.playbackRate}static getDefaults(){return Object.assign(C(_.getDefaults(),["value"]),{events:[],loop:!0,loopEnd:0,loopStart:0,subdivision:"8n"})}_seqCallback(t,s){s!==null&&!this.mute&&this.callback(t,s)}get events(){return this._events}set events(t){this.clear(),this._eventsArray=t,this._events=this._createSequence(this._eventsArray),this._eventsUpdated()}start(t,s){return this._part.start(t,s&&this._indexTime(s)),this}stop(t){return this._part.stop(t),this}get subdivision(){return new c(this.context,this._subdivision).toSeconds()}_createSequence(t){return new Proxy(t,{get:(s,e)=>s[e],set:(s,e,a)=>(F(e)&&isFinite(parseInt(e,10))&&E(a)?s[e]=this._createSequence(a):s[e]=a,this._eventsUpdated(),!0)})}_eventsUpdated(){this._part.clear(),this._rescheduleSequence(this._eventsArray,this._subdivision,this.startOffset),this.loopEnd=this.loopEnd}_rescheduleSequence(t,s,e){t.forEach((a,r)=>{const o=r*s+e;if(E(a))this._rescheduleSequence(a,s/a.length,o);else{const l=new c(this.context,o,"i").toSeconds();this._part.add(l,a)}})}_indexTime(t){return new c(this.context,t*this._subdivision+this.startOffset).toSeconds()}clear(){return this._part.clear(),this}dispose(){return super.dispose(),this._part.dispose(),this}get loop(){return this._part.loop}set loop(t){this._part.loop=t}get loopStart(){return this._loopStart}set loopStart(t){this._loopStart=t,this._part.loopStart=this._indexTime(t)}get loopEnd(){return this._loopEnd}set loopEnd(t){this._loopEnd=t,t===0?this._part.loopEnd=this._indexTime(this._eventsArray.length):this._part.loopEnd=this._indexTime(t)}get startOffset(){return this._part.startOffset}set startOffset(t){this._part.startOffset=t}get playbackRate(){return this._part.playbackRate}set playbackRate(t){this._part.playbackRate=t}get probability(){return this._part.probability}set probability(t){this._part.probability=t}get progress(){return this._part.progress}get humanize(){return this._part.humanize}set humanize(t){this._part.humanize=t}get length(){return this._part.length}}const Q=({icon:i,active:t,fSize:s})=>{const e=d.useMemo(()=>({fill:t?"currentColor":"#ffffff0"}),[t]);return h.jsx(h.Fragment,{children:h.jsx(A,{sx:{display:"flex",alignItems:"center",justifyContent:"space-around",borderRadius:1,marginTop:"1vh",fontSize:s-1+"vw",paddingBottom:"15px"},children:B.cloneElement(i,{sx:e})})})},H=d.memo(Q);function K({id:i,fSize:t,noteDuration:s}){let e,a;if(s==="4n")e=i+1,a="warning.main";else if(s==="8n")e=i%2===0?Math.floor(i/2)+1:"и",a=i%2===0?"warning.main":"text.primary";else if(s==="16n"){const r=i%4;r===0?(e=Math.floor(i/4)+1,a="warning.main"):r===1||r===2?(e=r===1?"та":"и",a="text.primary"):(e="та",a="text.primary")}else e=i+1,a="warning.main";return h.jsx(A,{sx:{display:"flex",alignItems:"center",justifyContent:"space-around",fontSize:t/2+"vw",color:a},children:e})}const Z=({noteDuration:i,isSmd:t,beatPattern:s,activeBeat:e})=>{let a=t?14:6;const r=s,o=t?4:16,l=d.useMemo(()=>r.map((n,p)=>{const m=p%2!==0;switch(n){case"0":return m?h.jsx(S,{fontSize:"inherit",color:"disabled"}):h.jsx(y,{fontSize:"inherit",color:"disabled"});case"1":return m?h.jsx(S,{fontSize:"inherit",color:"primary"}):h.jsx(y,{fontSize:"inherit",color:"primary"});case"A":return m?h.jsx(S,{fontSize:"inherit",color:"warning"}):h.jsx(y,{fontSize:"inherit",color:"warning"});case"x":return h.jsx(X,{fontSize:"inherit",color:"primary"});case"c":return m?h.jsx(V,{fontSize:"inherit",color:"primary"}):h.jsx(Y,{fontSize:"inherit",color:"primary"});default:return null}}),[r]);return h.jsx(T,{container:!0,spacing:2,sx:{padding:2},justifyContent:"center",children:r.map((n,p)=>h.jsx(T,{item:!0,xs:12/o,children:h.jsxs(j,{elevation:3,sx:{borderRadius:"8px"},children:[h.jsx(K,{id:p,noteDuration:i,fSize:a}),h.jsx(H,{id:p,icon:l[p],fSize:a,active:e===p})]})},p))})},J=d.memo(Z),$=""+new URL("click1-CrkR6NUM.wav",import.meta.url).href,tt=""+new URL("click2-LM7Avgww.wav",import.meta.url).href,st=""+new URL("g1-Fk1Yt-Yl.mp3",import.meta.url).href,et=""+new URL("g2-zlYTM2Qn.mp3",import.meta.url).href,it=""+new URL("g3-CwlsbLbq.mp3",import.meta.url).href,at=""+new URL("g4-BBrjkEi4.mp3",import.meta.url).href,ot=""+new URL("g5-B9N5OY6V.mp3",import.meta.url).href,rt=""+new URL("g6-BHzWupgw.mp3",import.meta.url).href,nt=""+new URL("g1L-C3v0XYvl.mp3",import.meta.url).href,lt=""+new URL("g2L-DBaBGgM2.mp3",import.meta.url).href,ht=""+new URL("g3L-BYq5PhOx.mp3",import.meta.url).href,ct=""+new URL("g4L-D7UYUSKR.mp3",import.meta.url).href,pt=""+new URL("g5L-GhzT02A2.mp3",import.meta.url).href,ut=""+new URL("g6L--qZ-q0s2.mp3",import.meta.url).href,f={g1:new u(st).toDestination(),g2:new u(et).toDestination(),g3:new u(it).toDestination(),g4:new u(at).toDestination(),g5:new u(ot).toDestination(),g6:new u(rt).toDestination(),g1L:new u(nt).toDestination(),g2L:new u(lt).toDestination(),g3L:new u(ht).toDestination(),g4L:new u(ct).toDestination(),g5L:new u(pt).toDestination(),g6L:new u(ut).toDestination(),click1:new u($).toDestination(),click2:new u(tt).toDestination()},M={down:{samples:["g6","g5","g4","g3","g2","g1"],spread:4,bias:[5,1,2,3,4,6]},downA:{samples:["g6","g5","g4","g3","g2","g1"],spread:6,bias:[1,2,3,4,5,6]},up:{samples:["g6","g5","g4","g3","g2","g1"],spread:4,bias:[6,6,3,1,2,4]},upA:{samples:["g6","g5","g4","g3","g2","g1"],spread:5,bias:[6,5,3,1,2,4]},x:{samples:["g6L","g5L","g4L","g3L","g2L","g1L"],spread:6,bias:[1,2,3,4,5,6]},upM:{samples:["g6L","g5L","g4L","g3L","g2L","g1L"],spread:4,bias:[6,6,3,1,2,4]},downM:{samples:["g6L","g5L","g4L","g3L","g2L","g1L"],spread:4,bias:[5,1,2,3,4,6]}};function ft(i,t){const s=[-1,0,0,0,0,0],e=(o,l,n)=>o*(1-n)+l*n,a=o=>Math.random()*o*2-o,r=e(0,i,.75)+a(.4);for(let o=0;o<6;o++)isNaN(s[o])||(t[o]>Math.ceil(r)?s[o]=NaN:t[o]>Math.floor(r)&&(s[o]=r%1>.25?s[o]-26*(1-Math.log10(1+r%1*9)):NaN));return s}function dt(i){const s={},a=i==="up"?5:0,r=i==="up"?0:5,o=i==="up"?-1:1;for(let l=0,n=a;i==="up"?n>=r:n<=r;n+=o,l++){const p=l*.003+(i==="down"&&n===0&&l>0?Math.min(.003,.01):0)+.001*Math.random();s[n]=p}return s}function _t(i,t,s,e){if(e){let a,r,o,l;switch(i){case"nothing":return;case"up":case"upA":case"upM":a=M[i],r="up";break;case"down":case"downA":case"downM":case"x":a=M[i],r="down";break;default:console.log("Note not found in dataset or unsupported note type.");return}o=dt(r),l=ft(a.spread,a.bias),a.samples.forEach((n,p)=>{const m=o[p],k=l[p];console.log(p,n,m,k),isNaN(k)||f[n]&&(f[n].volume.value=k,f[n].fadeOut=.12,f[n].start(t+m,.05,s))})}}const mt=(i,t,s,e,a,r,o)=>{s&&(r&&t===0?f.click2.start(i):o==="4n"?f.click1.start(i):o==="8n"?t%2===0?e&&f.click1.start(i):a&&f.click1.start(i):o==="16n"&&(t%4===0?e&&f.click1.start(i):a&&f.click1.start(i)))};function gt(i){return i.split("").map((t,s)=>{let e="nothing";switch(t){case"0":e="nothing";break;case"1":e=s%2===0?"down":"up";break;case"A":e=s%2===0?"downA":"upA";break;case"x":e="x";break;case"c":e=s%2===0?"downM":"upM";break;default:e="nothing";break}return e})}function bt(i,t){const s=new Array(i.length);let e={[t]:1};for(let a=i.length-1;a>=0;a--)i[a]!=="nothing"?(s[a]=e,e={[t]:1}):(s[a]={[t]:1},e=kt(e,[t]));return s}function kt(i,t){return i[t]===1?{[t]:2}:i[t]===2?{[t]:3}:i[t]===3?{[t]:4}:{[t]:i[t]+1}}function wt(i){const[t,s]=d.useState(0),e=d.useRef(null);return d.useEffect(()=>{if(!i.isPlaying)return;x().bpm.value=i.tempo||120;const a=gt(i.beatPattern),r=bt(a,i.noteDuration),o=new R((l,n)=>{const p=a[n];s(n),_t(p,l,r[n],i.isBeatSound),mt(l,n,i.isMetronomeSound,i.clickMainBeat,i.clickSubbeat,i.clickTaktBeat,i.noteDuration)},Array.from({length:a.length},(l,n)=>n),i.noteDuration||"8n").start(0);return e.current=o,()=>{o.dispose()}},[i.isPlaying,i.beatPattern,i.isBeatSound,i.isMetronomeSound,i.isDownbeatSound,i.isUpbeatSound,i.isAcsentbeatSound,i.tempo,i.noteDuration,i.clickMainBeat,i.clickSubbeat,i.clickTaktBeat]),d.useEffect(()=>{i.isPlaying?G().then(()=>{x().start()}):x().stop()},[i.isPlaying]),i.isPlaying?t:null}function Et(){const{config:i}=W(),{beatPattern:t,noteDuration:s}=i,e=wt(i),a=v("only screen and (max-width : 768px)"),r=d.useMemo(()=>t.split(""),[t]),o=d.useMemo(()=>s,[s]);return h.jsx(J,{noteDuration:o,isSmd:a,beatPattern:r,activeBeat:e})}export{Et as default};
