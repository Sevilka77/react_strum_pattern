import{j as h,a as A,G as R}from"./ui-D-9Vtnrj.js";import{r as f,a as j}from"./vendor-Bn94jRP8.js";import{T as O,o as E,S as D,n as v,i as z,a as c,b as B,d as m,c as x,e as U,f as k,g as F,h as N,j as I,k as q,X as P,l as C,m as V,A as w,p as S,P as p,q as y,s as Y,u as X}from"./index-B6Um_23E.js";class _ extends O{constructor(){const t=E(_.getDefaults(),arguments,["callback","value"]);super(t),this.name="ToneEvent",this._state=new D("stopped"),this._startOffset=0,this._loop=t.loop,this.callback=t.callback,this.value=t.value,this._loopStart=this.toTicks(t.loopStart),this._loopEnd=this.toTicks(t.loopEnd),this._playbackRate=t.playbackRate,this._probability=t.probability,this._humanize=t.humanize,this.mute=t.mute,this._playbackRate=t.playbackRate,this._state.increasing=!0,this._rescheduleEvents()}static getDefaults(){return Object.assign(O.getDefaults(),{callback:v,humanize:!1,loop:!1,loopEnd:"1m",loopStart:0,mute:!1,playbackRate:1,probability:1,value:null})}_rescheduleEvents(t=-1){this._state.forEachFrom(t,s=>{let e;if(s.state==="started"){s.id!==-1&&this.context.transport.clear(s.id);const o=s.time+Math.round(this.startOffset/this._playbackRate);if(this._loop===!0||z(this._loop)&&this._loop>1){e=1/0,z(this._loop)&&(e=this._loop*this._getLoopDuration());const r=this._state.getAfter(o);r!==null&&(e=Math.min(e,r.time-o)),e!==1/0&&(e=new c(this.context,e));const a=new c(this.context,this._getLoopDuration());s.id=this.context.transport.scheduleRepeat(this._tick.bind(this),a,new c(this.context,o),e)}else s.id=this.context.transport.schedule(this._tick.bind(this),new c(this.context,o))}})}get state(){return this._state.getValueAtTime(this.context.transport.ticks)}get startOffset(){return this._startOffset}set startOffset(t){this._startOffset=t}get probability(){return this._probability}set probability(t){this._probability=t}get humanize(){return this._humanize}set humanize(t){this._humanize=t}start(t){const s=this.toTicks(t);return this._state.getValueAtTime(s)==="stopped"&&(this._state.add({id:-1,state:"started",time:s}),this._rescheduleEvents(s)),this}stop(t){this.cancel(t);const s=this.toTicks(t);if(this._state.getValueAtTime(s)==="started"){this._state.setStateAtTime("stopped",s,{id:-1});const e=this._state.getBefore(s);let o=s;e!==null&&(o=e.time),this._rescheduleEvents(o)}return this}cancel(t){t=m(t,-1/0);const s=this.toTicks(t);return this._state.forEachFrom(s,e=>{this.context.transport.clear(e.id)}),this._state.cancel(s),this}_tick(t){const s=this.context.transport.getTicksAtTime(t);if(!this.mute&&this._state.getValueAtTime(s)==="started"){if(this.probability<1&&Math.random()>this.probability)return;if(this.humanize){let e=.02;B(this.humanize)||(e=this.toSeconds(this.humanize)),t+=(Math.random()*2-1)*e}this.callback(t,this.value)}}_getLoopDuration(){return(this._loopEnd-this._loopStart)/this._playbackRate}get loop(){return this._loop}set loop(t){this._loop=t,this._rescheduleEvents()}get playbackRate(){return this._playbackRate}set playbackRate(t){this._playbackRate=t,this._rescheduleEvents()}get loopEnd(){return new c(this.context,this._loopEnd).toSeconds()}set loopEnd(t){this._loopEnd=this.toTicks(t),this._loop&&this._rescheduleEvents()}get loopStart(){return new c(this.context,this._loopStart).toSeconds()}set loopStart(t){this._loopStart=this.toTicks(t),this._loop&&this._rescheduleEvents()}get progress(){if(this._loop){const t=this.context.transport.ticks,s=this._state.get(t);if(s!==null&&s.state==="started"){const e=this._getLoopDuration();return(t-s.time)%e/e}else return 0}else return 0}dispose(){return super.dispose(),this.cancel(),this._state.dispose(),this}}class g extends _{constructor(){const t=E(g.getDefaults(),arguments,["callback","events"]);super(t),this.name="Part",this._state=new D("stopped"),this._events=new Set,this._state.increasing=!0,t.events.forEach(s=>{x(s)?this.add(s[0],s[1]):this.add(s)})}static getDefaults(){return Object.assign(_.getDefaults(),{events:[]})}start(t,s){const e=this.toTicks(t);if(this._state.getValueAtTime(e)!=="started"){s=m(s,this._loop?this._loopStart:0),this._loop?s=m(s,this._loopStart):s=m(s,0);const o=this.toTicks(s);this._state.add({id:-1,offset:o,state:"started",time:e}),this._forEach(r=>{this._startNote(r,e,o)})}return this}_startNote(t,s,e){s-=e,this._loop?t.startOffset>=this._loopStart&&t.startOffset<this._loopEnd?(t.startOffset<e&&(s+=this._getLoopDuration()),t.start(new c(this.context,s))):t.startOffset<this._loopStart&&t.startOffset>=e&&(t.loop=!1,t.start(new c(this.context,s))):t.startOffset>=e&&t.start(new c(this.context,s))}get startOffset(){return this._startOffset}set startOffset(t){this._startOffset=t,this._forEach(s=>{s.startOffset+=this._startOffset})}stop(t){const s=this.toTicks(t);return this._state.cancel(s),this._state.setStateAtTime("stopped",s),this._forEach(e=>{e.stop(t)}),this}at(t,s){const e=new U(this.context,t).toTicks(),o=new c(this.context,1).toSeconds(),r=this._events.values();let a=r.next();for(;!a.done;){const n=a.value;if(Math.abs(e-n.startOffset)<o)return k(s)&&(n.value=s),n;a=r.next()}return k(s)?(this.add(t,s),this.at(t)):null}add(t,s){t instanceof Object&&Reflect.has(t,"time")&&(s=t,t=s.time);const e=this.toTicks(t);let o;return s instanceof _?(o=s,o.callback=this._tick.bind(this)):o=new _({callback:this._tick.bind(this),context:this.context,value:s}),o.startOffset=e,o.set({humanize:this.humanize,loop:this.loop,loopEnd:this.loopEnd,loopStart:this.loopStart,playbackRate:this.playbackRate,probability:this.probability}),this._events.add(o),this._restartEvent(o),this}_restartEvent(t){this._state.forEach(s=>{s.state==="started"?this._startNote(t,s.time,s.offset):t.stop(new c(this.context,s.time))})}remove(t,s){return F(t)&&t.hasOwnProperty("time")&&(s=t,t=s.time),t=this.toTicks(t),this._events.forEach(e=>{e.startOffset===t&&(N(s)||k(s)&&e.value===s)&&(this._events.delete(e),e.dispose())}),this}clear(){return this._forEach(t=>t.dispose()),this._events.clear(),this}cancel(t){return this._forEach(s=>s.cancel(t)),this._state.cancel(this.toTicks(t)),this}_forEach(t){return this._events&&this._events.forEach(s=>{s instanceof g?s._forEach(t):t(s)}),this}_setAll(t,s){this._forEach(e=>{e[t]=s})}_tick(t,s){this.mute||this.callback(t,s)}_testLoopBoundries(t){this._loop&&(t.startOffset<this._loopStart||t.startOffset>=this._loopEnd)?t.cancel(0):t.state==="stopped"&&this._restartEvent(t)}get probability(){return this._probability}set probability(t){this._probability=t,this._setAll("probability",t)}get humanize(){return this._humanize}set humanize(t){this._humanize=t,this._setAll("humanize",t)}get loop(){return this._loop}set loop(t){this._loop=t,this._forEach(s=>{s.loopStart=this.loopStart,s.loopEnd=this.loopEnd,s.loop=t,this._testLoopBoundries(s)})}get loopEnd(){return new c(this.context,this._loopEnd).toSeconds()}set loopEnd(t){this._loopEnd=this.toTicks(t),this._loop&&this._forEach(s=>{s.loopEnd=t,this._testLoopBoundries(s)})}get loopStart(){return new c(this.context,this._loopStart).toSeconds()}set loopStart(t){this._loopStart=this.toTicks(t),this._loop&&this._forEach(s=>{s.loopStart=this.loopStart,this._testLoopBoundries(s)})}get playbackRate(){return this._playbackRate}set playbackRate(t){this._playbackRate=t,this._setAll("playbackRate",t)}get length(){return this._events.size}dispose(){return super.dispose(),this.clear(),this}}class L extends _{constructor(){const t=E(L.getDefaults(),arguments,["callback","events","subdivision"]);super(t),this.name="Sequence",this._part=new g({callback:this._seqCallback.bind(this),context:this.context}),this._events=[],this._eventsArray=[],this._subdivision=this.toTicks(t.subdivision),this.events=t.events,this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this.playbackRate=t.playbackRate,this.probability=t.probability,this.humanize=t.humanize,this.mute=t.mute,this.playbackRate=t.playbackRate}static getDefaults(){return Object.assign(I(_.getDefaults(),["value"]),{events:[],loop:!0,loopEnd:0,loopStart:0,subdivision:"8n"})}_seqCallback(t,s){s!==null&&!this.mute&&this.callback(t,s)}get events(){return this._events}set events(t){this.clear(),this._eventsArray=t,this._events=this._createSequence(this._eventsArray),this._eventsUpdated()}start(t,s){return this._part.start(t,s&&this._indexTime(s)),this}stop(t){return this._part.stop(t),this}get subdivision(){return new c(this.context,this._subdivision).toSeconds()}_createSequence(t){return new Proxy(t,{get:(s,e)=>s[e],set:(s,e,o)=>(q(e)&&isFinite(parseInt(e,10))&&x(o)?s[e]=this._createSequence(o):s[e]=o,this._eventsUpdated(),!0)})}_eventsUpdated(){this._part.clear(),this._rescheduleSequence(this._eventsArray,this._subdivision,this.startOffset),this.loopEnd=this.loopEnd}_rescheduleSequence(t,s,e){t.forEach((o,r)=>{const a=r*s+e;if(x(o))this._rescheduleSequence(o,s/o.length,a);else{const n=new c(this.context,a,"i").toSeconds();this._part.add(n,o)}})}_indexTime(t){return new c(this.context,t*this._subdivision+this.startOffset).toSeconds()}clear(){return this._part.clear(),this}dispose(){return super.dispose(),this._part.dispose(),this}get loop(){return this._part.loop}set loop(t){this._part.loop=t}get loopStart(){return this._loopStart}set loopStart(t){this._loopStart=t,this._part.loopStart=this._indexTime(t)}get loopEnd(){return this._loopEnd}set loopEnd(t){this._loopEnd=t,t===0?this._part.loopEnd=this._indexTime(this._eventsArray.length):this._part.loopEnd=this._indexTime(t)}get startOffset(){return this._part.startOffset}set startOffset(t){this._part.startOffset=t}get playbackRate(){return this._part.playbackRate}set playbackRate(t){this._part.playbackRate=t}get probability(){return this._part.probability}set probability(t){this._part.probability=t}get progress(){return this._part.progress}get humanize(){return this._part.humanize}set humanize(t){this._part.humanize=t}get length(){return this._part.length}}const G=({icon:i,active:t})=>{const s=f.useMemo(()=>({fill:t?"currentColor":"#ffffff0",fontSize:"inherit"}),[t]);return h.jsx(A,{variant:"h2",sx:{display:"flex",alignItems:"center"},children:j.cloneElement(i,{sx:s})})},W=f.memo(G);function H({id:i,noteDuration:t}){let s,e;if(t==="4n")s=i+1,e="warning.main";else if(t==="8n")s=i%2===0?Math.floor(i/2)+1:"и",e=i%2===0?"warning.main":"#FFFFFF";else if(t==="16n"){const o=i%4;o===0?(s=Math.floor(i/4)+1,e="warning.main"):o===1||o===2?(s=o===1?"та":"и",e="#FFFFFF"):(s="та",e="#FFFFFF")}else s=i+1,e="warning.main";return h.jsx(A,{variant:"h4",sx:{textAlign:"center",color:e},children:s})}const K=({noteDuration:i,beatPattern:t,activeBeat:s})=>{const e=t,o=f.useMemo(()=>e.map((r,a)=>{const n=a%2!==0;switch(r){case"0":return n?h.jsx(w,{fontSize:"inherit",color:"disabled"}):h.jsx(S,{fontSize:"inherit",color:"disabled"});case"1":return n?h.jsx(w,{fontSize:"inherit",color:"primary"}):h.jsx(S,{fontSize:"inherit",color:"primary"});case"A":return n?h.jsx(w,{fontSize:"inherit",color:"warning"}):h.jsx(S,{fontSize:"inherit",color:"warning"});case"x":return h.jsx(V,{fontSize:"inherit",color:"primary"});case"c":return n?h.jsx(P,{fontSize:"inherit",color:"primary"}):h.jsx(C,{fontSize:"inherit",color:"primary"});default:return null}}),[e]);return h.jsx(R,{component:"main",container:!0,columns:8,alignItems:"center",justifyContent:"center",children:e.map((r,a)=>h.jsxs(R,{size:{xs:2,sm:1,md:1},sx:{boxSizing:"border-box",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[h.jsx(H,{id:a,noteDuration:i}),h.jsx(W,{icon:o[a],active:s===a})]},a))})},Q=f.memo(K),Z=""+new URL("click1-CrkR6NUM.wav",import.meta.url).href,J=""+new URL("click2-LM7Avgww.wav",import.meta.url).href,$=""+new URL("g1-Fk1Yt-Yl.mp3",import.meta.url).href,tt=""+new URL("g2-zlYTM2Qn.mp3",import.meta.url).href,st=""+new URL("g3-CwlsbLbq.mp3",import.meta.url).href,et=""+new URL("g4-BBrjkEi4.mp3",import.meta.url).href,it=""+new URL("g5-B9N5OY6V.mp3",import.meta.url).href,ot=""+new URL("g6-BHzWupgw.mp3",import.meta.url).href,at=""+new URL("g1L-C3v0XYvl.mp3",import.meta.url).href,rt=""+new URL("g2L-DBaBGgM2.mp3",import.meta.url).href,nt=""+new URL("g3L-BYq5PhOx.mp3",import.meta.url).href,lt=""+new URL("g4L-D7UYUSKR.mp3",import.meta.url).href,ht=""+new URL("g5L-GhzT02A2.mp3",import.meta.url).href,ct=""+new URL("g6L--qZ-q0s2.mp3",import.meta.url).href,u={g1:new p($).toDestination(),g2:new p(tt).toDestination(),g3:new p(st).toDestination(),g4:new p(et).toDestination(),g5:new p(it).toDestination(),g6:new p(ot).toDestination(),g1L:new p(at).toDestination(),g2L:new p(rt).toDestination(),g3L:new p(nt).toDestination(),g4L:new p(lt).toDestination(),g5L:new p(ht).toDestination(),g6L:new p(ct).toDestination(),click1:new p(Z).toDestination(),click2:new p(J).toDestination()},M={down:{samples:["g6","g5","g4","g3","g2","g1"],spread:4,bias:[5,1,2,3,4,6]},downA:{samples:["g6","g5","g4","g3","g2","g1"],spread:6,bias:[1,2,3,4,5,6]},up:{samples:["g6","g5","g4","g3","g2","g1"],spread:4,bias:[6,6,3,1,2,4]},upA:{samples:["g6","g5","g4","g3","g2","g1"],spread:5,bias:[6,5,3,1,2,4]},x:{samples:["g6L","g5L","g4L","g3L","g2L","g1L"],spread:6,bias:[1,2,3,4,5,6]},upM:{samples:["g6L","g5L","g4L","g3L","g2L","g1L"],spread:4,bias:[6,6,3,1,2,4]},downM:{samples:["g6L","g5L","g4L","g3L","g2L","g1L"],spread:4,bias:[5,1,2,3,4,6]}};function pt(i,t){const s=[-1,0,0,0,0,0],e=(a,n,l)=>a*(1-l)+n*l,o=a=>Math.random()*a*2-a,r=e(0,i,.75)+o(.4);for(let a=0;a<6;a++)isNaN(s[a])||(t[a]>Math.ceil(r)?s[a]=NaN:t[a]>Math.floor(r)&&(s[a]=r%1>.25?s[a]-26*(1-Math.log10(1+r%1*9)):NaN));return s}function ut(i){const s={},o=i==="up"?5:0,r=i==="up"?0:5,a=i==="up"?-1:1;for(let n=0,l=o;i==="up"?l>=r:l<=r;l+=a,n++){const d=n*.003+(i==="down"&&l===0&&n>0?Math.min(.003,.01):0)+.001*Math.random();s[l]=d}return s}function ft(i,t,s,e){if(e){let o,r,a,n;switch(i){case"nothing":return;case"up":case"upA":case"upM":o=M[i],r="up";break;case"down":case"downA":case"downM":case"x":o=M[i],r="down";break;default:console.log("Note not found in dataset or unsupported note type.");return}a=ut(r),n=pt(o.spread,o.bias),o.samples.forEach((l,d)=>{const T=a[d],b=n[d];console.log(d,l,T,b),isNaN(b)||u[l]&&(u[l].volume.value=b,u[l].fadeOut=.12,u[l].start(t+T,.05,s))})}}const _t=(i,t,s,e,o,r,a)=>{s&&(r&&t===0?u.click2.start(i):a==="4n"?u.click1.start(i):a==="8n"?t%2===0?e&&u.click1.start(i):o&&u.click1.start(i):a==="16n"&&(t%4===0?e&&u.click1.start(i):o&&u.click1.start(i)))};function dt(i){return i.split("").map((t,s)=>{let e="nothing";switch(t){case"0":e="nothing";break;case"1":e=s%2===0?"down":"up";break;case"A":e=s%2===0?"downA":"upA";break;case"x":e="x";break;case"c":e=s%2===0?"downM":"upM";break;default:e="nothing";break}return e})}function mt(i,t){const s=new Array(i.length);let e={[t]:1};for(let o=i.length-1;o>=0;o--)i[o]!=="nothing"?(s[o]=e,e={[t]:1}):(s[o]={[t]:1},e=gt(e,[t]));return s}function gt(i,t){return i[t]===1?{[t]:2}:i[t]===2?{[t]:3}:i[t]===3?{[t]:4}:{[t]:i[t]+1}}function bt(i){const[t,s]=f.useState(0),e=f.useRef(null);return f.useEffect(()=>{if(!i.isPlaying)return;y().bpm.value=i.tempo||120;const o=dt(i.beatPattern),r=mt(o,i.noteDuration),a=new L((n,l)=>{const d=o[l];s(l),ft(d,n,r[l],i.isBeatSound),_t(n,l,i.isMetronomeSound,i.clickMainBeat,i.clickSubbeat,i.clickTaktBeat,i.noteDuration)},Array.from({length:o.length},(n,l)=>l),i.noteDuration||"8n").start(0);return e.current=a,()=>{a.dispose()}},[i.isPlaying,i.beatPattern,i.isBeatSound,i.isMetronomeSound,i.isDownbeatSound,i.isUpbeatSound,i.isAcsentbeatSound,i.tempo,i.noteDuration,i.clickMainBeat,i.clickSubbeat,i.clickTaktBeat]),f.useEffect(()=>{i.isPlaying?Y().then(()=>{y().start()}):y().stop()},[i.isPlaying]),i.isPlaying?t:null}function yt(){const{config:i}=X(),{beatPattern:t,noteDuration:s}=i,e=bt(i),o=f.useMemo(()=>t.split(""),[t]),r=f.useMemo(()=>s,[s]);return h.jsx(Q,{noteDuration:r,beatPattern:o,activeBeat:e})}export{yt as default};
