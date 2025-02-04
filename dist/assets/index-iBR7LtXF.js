import{j as n,e as P,I as G,M as Z,n as m,L as b,w as F}from"./ui-BOFvu-yV.js";import{r as d,a as Y}from"./vendor-Bn94jRP8.js";import{u as q}from"./useCycleSettings-C509ogUw.js";import{A as k,X as L,a as H,b as V,c as U,d as J,e as M,f as K,g as Q}from"./Icons-BmYRTnAw.js";import{u as C,a as tt}from"./useSequenceSettings-BdskOJ0w.js";import{c as W,a as st,u as X}from"./LDJson-B43UvX_X.js";import{u as et}from"./useEditMode-DBICx88K.js";import{e as N,o as D,f as $,n as it,i as v,h as u,j as ot,k as T,l as B,m as at,p as O,q as nt,r as rt,t as ct,v as lt,w as ht,x as pt,y as ut,z as x,A as _,B as w,g as R,D as dt,s as ft}from"./index-DAaUKsB7.js";class g extends N{constructor(){const t=D(g.getDefaults(),arguments,["callback","value"]);super(t),this.name="ToneEvent",this._state=new $("stopped"),this._startOffset=0,this._loop=t.loop,this.callback=t.callback,this.value=t.value,this._loopStart=this.toTicks(t.loopStart),this._loopEnd=this.toTicks(t.loopEnd),this._playbackRate=t.playbackRate,this._probability=t.probability,this._humanize=t.humanize,this.mute=t.mute,this._playbackRate=t.playbackRate,this._state.increasing=!0,this._rescheduleEvents()}static getDefaults(){return Object.assign(N.getDefaults(),{callback:it,humanize:!1,loop:!1,loopEnd:"1m",loopStart:0,mute:!1,playbackRate:1,probability:1,value:null})}_rescheduleEvents(t=-1){this._state.forEachFrom(t,s=>{let e;if(s.state==="started"){s.id!==-1&&this.context.transport.clear(s.id);const i=s.time+Math.round(this.startOffset/this._playbackRate);if(this._loop===!0||v(this._loop)&&this._loop>1){e=1/0,v(this._loop)&&(e=this._loop*this._getLoopDuration());const a=this._state.getAfter(i);a!==null&&(e=Math.min(e,a.time-i)),e!==1/0&&(e=new u(this.context,e));const r=new u(this.context,this._getLoopDuration());s.id=this.context.transport.scheduleRepeat(this._tick.bind(this),r,new u(this.context,i),e)}else s.id=this.context.transport.schedule(this._tick.bind(this),new u(this.context,i))}})}get state(){return this._state.getValueAtTime(this.context.transport.ticks)}get startOffset(){return this._startOffset}set startOffset(t){this._startOffset=t}get probability(){return this._probability}set probability(t){this._probability=t}get humanize(){return this._humanize}set humanize(t){this._humanize=t}start(t){const s=this.toTicks(t);return this._state.getValueAtTime(s)==="stopped"&&(this._state.add({id:-1,state:"started",time:s}),this._rescheduleEvents(s)),this}stop(t){this.cancel(t);const s=this.toTicks(t);if(this._state.getValueAtTime(s)==="started"){this._state.setStateAtTime("stopped",s,{id:-1});const e=this._state.getBefore(s);let i=s;e!==null&&(i=e.time),this._rescheduleEvents(i)}return this}cancel(t){t=T(t,-1/0);const s=this.toTicks(t);return this._state.forEachFrom(s,e=>{this.context.transport.clear(e.id)}),this._state.cancel(s),this}_tick(t){const s=this.context.transport.getTicksAtTime(t);if(!this.mute&&this._state.getValueAtTime(s)==="started"){if(this.probability<1&&Math.random()>this.probability)return;if(this.humanize){let e=.02;ot(this.humanize)||(e=this.toSeconds(this.humanize)),t+=(Math.random()*2-1)*e}this.callback(t,this.value)}}_getLoopDuration(){return(this._loopEnd-this._loopStart)/this._playbackRate}get loop(){return this._loop}set loop(t){this._loop=t,this._rescheduleEvents()}get playbackRate(){return this._playbackRate}set playbackRate(t){this._playbackRate=t,this._rescheduleEvents()}get loopEnd(){return new u(this.context,this._loopEnd).toSeconds()}set loopEnd(t){this._loopEnd=this.toTicks(t),this._loop&&this._rescheduleEvents()}get loopStart(){return new u(this.context,this._loopStart).toSeconds()}set loopStart(t){this._loopStart=this.toTicks(t),this._loop&&this._rescheduleEvents()}get progress(){if(this._loop){const t=this.context.transport.ticks,s=this._state.get(t);if(s!==null&&s.state==="started"){const e=this._getLoopDuration();return(t-s.time)%e/e}else return 0}else return 0}dispose(){return super.dispose(),this.cancel(),this._state.dispose(),this}}class j extends g{constructor(){const t=D(j.getDefaults(),arguments,["callback","events"]);super(t),this.name="Part",this._state=new $("stopped"),this._events=new Set,this._state.increasing=!0,t.events.forEach(s=>{B(s)?this.add(s[0],s[1]):this.add(s)})}static getDefaults(){return Object.assign(g.getDefaults(),{events:[]})}start(t,s){const e=this.toTicks(t);if(this._state.getValueAtTime(e)!=="started"){s=T(s,this._loop?this._loopStart:0),this._loop?s=T(s,this._loopStart):s=T(s,0);const i=this.toTicks(s);this._state.add({id:-1,offset:i,state:"started",time:e}),this._forEach(a=>{this._startNote(a,e,i)})}return this}_startNote(t,s,e){s-=e,this._loop?t.startOffset>=this._loopStart&&t.startOffset<this._loopEnd?(t.startOffset<e&&(s+=this._getLoopDuration()),t.start(new u(this.context,s))):t.startOffset<this._loopStart&&t.startOffset>=e&&(t.loop=!1,t.start(new u(this.context,s))):t.startOffset>=e&&t.start(new u(this.context,s))}get startOffset(){return this._startOffset}set startOffset(t){this._startOffset=t,this._forEach(s=>{s.startOffset+=this._startOffset})}stop(t){const s=this.toTicks(t);return this._state.cancel(s),this._state.setStateAtTime("stopped",s),this._forEach(e=>{e.stop(t)}),this}at(t,s){const e=new at(this.context,t).toTicks(),i=new u(this.context,1).toSeconds(),a=this._events.values();let r=a.next();for(;!r.done;){const c=r.value;if(Math.abs(e-c.startOffset)<i)return O(s)&&(c.value=s),c;r=a.next()}return O(s)?(this.add(t,s),this.at(t)):null}add(t,s){t instanceof Object&&Reflect.has(t,"time")&&(s=t,t=s.time);const e=this.toTicks(t);let i;return s instanceof g?(i=s,i.callback=this._tick.bind(this)):i=new g({callback:this._tick.bind(this),context:this.context,value:s}),i.startOffset=e,i.set({humanize:this.humanize,loop:this.loop,loopEnd:this.loopEnd,loopStart:this.loopStart,playbackRate:this.playbackRate,probability:this.probability}),this._events.add(i),this._restartEvent(i),this}_restartEvent(t){this._state.forEach(s=>{s.state==="started"?this._startNote(t,s.time,s.offset):t.stop(new u(this.context,s.time))})}remove(t,s){return nt(t)&&t.hasOwnProperty("time")&&(s=t,t=s.time),t=this.toTicks(t),this._events.forEach(e=>{e.startOffset===t&&(rt(s)||O(s)&&e.value===s)&&(this._events.delete(e),e.dispose())}),this}clear(){return this._forEach(t=>t.dispose()),this._events.clear(),this}cancel(t){return this._forEach(s=>s.cancel(t)),this._state.cancel(this.toTicks(t)),this}_forEach(t){return this._events&&this._events.forEach(s=>{s instanceof j?s._forEach(t):t(s)}),this}_setAll(t,s){this._forEach(e=>{e[t]=s})}_tick(t,s){this.mute||this.callback(t,s)}_testLoopBoundries(t){this._loop&&(t.startOffset<this._loopStart||t.startOffset>=this._loopEnd)?t.cancel(0):t.state==="stopped"&&this._restartEvent(t)}get probability(){return this._probability}set probability(t){this._probability=t,this._setAll("probability",t)}get humanize(){return this._humanize}set humanize(t){this._humanize=t,this._setAll("humanize",t)}get loop(){return this._loop}set loop(t){this._loop=t,this._forEach(s=>{s.loopStart=this.loopStart,s.loopEnd=this.loopEnd,s.loop=t,this._testLoopBoundries(s)})}get loopEnd(){return new u(this.context,this._loopEnd).toSeconds()}set loopEnd(t){this._loopEnd=this.toTicks(t),this._loop&&this._forEach(s=>{s.loopEnd=t,this._testLoopBoundries(s)})}get loopStart(){return new u(this.context,this._loopStart).toSeconds()}set loopStart(t){this._loopStart=this.toTicks(t),this._loop&&this._forEach(s=>{s.loopStart=this.loopStart,this._testLoopBoundries(s)})}get playbackRate(){return this._playbackRate}set playbackRate(t){this._playbackRate=t,this._setAll("playbackRate",t)}get length(){return this._events.size}dispose(){return super.dispose(),this.clear(),this}}class I extends g{constructor(){const t=D(I.getDefaults(),arguments,["callback","events","subdivision"]);super(t),this.name="Sequence",this._part=new j({callback:this._seqCallback.bind(this),context:this.context}),this._events=[],this._eventsArray=[],this._subdivision=this.toTicks(t.subdivision),this.events=t.events,this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this.playbackRate=t.playbackRate,this.probability=t.probability,this.humanize=t.humanize,this.mute=t.mute,this.playbackRate=t.playbackRate}static getDefaults(){return Object.assign(ct(g.getDefaults(),["value"]),{events:[],loop:!0,loopEnd:0,loopStart:0,subdivision:"8n"})}_seqCallback(t,s){s!==null&&!this.mute&&this.callback(t,s)}get events(){return this._events}set events(t){this.clear(),this._eventsArray=t,this._events=this._createSequence(this._eventsArray),this._eventsUpdated()}start(t,s){return this._part.start(t,s&&this._indexTime(s)),this}stop(t){return this._part.stop(t),this}get subdivision(){return new u(this.context,this._subdivision).toSeconds()}_createSequence(t){return new Proxy(t,{get:(s,e)=>s[e],set:(s,e,i)=>(lt(e)&&isFinite(parseInt(e,10))&&B(i)?s[e]=this._createSequence(i):s[e]=i,this._eventsUpdated(),!0)})}_eventsUpdated(){this._part.clear(),this._rescheduleSequence(this._eventsArray,this._subdivision,this.startOffset),this.loopEnd=this.loopEnd}_rescheduleSequence(t,s,e){t.forEach((i,a)=>{const r=a*s+e;if(B(i))this._rescheduleSequence(i,s/i.length,r);else{const c=new u(this.context,r,"i").toSeconds();this._part.add(c,i)}})}_indexTime(t){return new u(this.context,t*this._subdivision+this.startOffset).toSeconds()}clear(){return this._part.clear(),this}dispose(){return super.dispose(),this._part.dispose(),this}get loop(){return this._part.loop}set loop(t){this._part.loop=t}get loopStart(){return this._loopStart}set loopStart(t){this._loopStart=t,this._part.loopStart=this._indexTime(t)}get loopEnd(){return this._loopEnd}set loopEnd(t){this._loopEnd=t,t===0?this._part.loopEnd=this._indexTime(this._eventsArray.length):this._part.loopEnd=this._indexTime(t)}get startOffset(){return this._part.startOffset}set startOffset(t){this._part.startOffset=t}get playbackRate(){return this._part.playbackRate}set playbackRate(t){this._part.playbackRate=t}get probability(){return this._part.probability}set probability(t){this._part.probability=t}get progress(){return this._part.progress}get humanize(){return this._part.humanize}set humanize(t){this._part.humanize=t}get length(){return this._part.length}}/**
 * @license lucide-react v0.302.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=W("Delete",[["path",{d:"M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z",key:"1oy587"}],["line",{x1:"18",x2:"12",y1:"9",y2:"15",key:"1olkx5"}],["line",{x1:"12",x2:"18",y1:"9",y2:"15",key:"1n50pc"}]]);/**
 * @license lucide-react v0.302.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=W("Wrench",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]]),bt=({id:o,icon:t})=>{const{cycleSettings:s}=q();return n.jsx(P,{variant:"h1",component:"p",sx:{display:"flex",alignItems:"center"},children:Y.cloneElement(t,{sx:{fill:s.activeBeat===o?"currentColor":"#ffffff0",fontSize:"inherit"}})})},gt=d.memo(bt,(o,t)=>o.icon===t.icon&&o.active===t.active),yt=(o,t)=>{let s,e;const i=o%4;switch(t){case"4n":s=o+1,e="#ffa726";break;case"8n":s=o%2===0?Math.floor(o/2)+1:"и",e=o%2===0?"#ffa726":"#FFFFFF";break;case"16n":switch(i){case 0:s=Math.floor(o/4)+1,e="#ffa726";break;case 1:case 2:s=i===1?"та":"и",e="#FFFFFF";break;default:s="та",e="#FFFFFF"}break;default:s=o+1,e="warning.main"}return{nameId:s,color:e}};function xt({id:o,noteDuration:t}){const{nameId:s,color:e}=yt(o,t);return n.jsx(P,{variant:"h4",component:"p",sx:{textAlign:"center",color:e,textShadow:`0 0 42px ${e}`},children:s})}const kt=({index:o})=>{const{sequenceSettings:t,dispatch:s}=C(),{beatPattern:e}=t,[i,a]=d.useState(null),r=!!i,c=p=>{const E=e.split("").map((S,A)=>A===o?p:S).join("");s({type:"SET_BEAT_PATTERN",payload:E})},l=()=>{if(o>=0){const p=e.split("").filter((E,S)=>S!==o).join("");s({type:"SET_BEAT_PATTERN",payload:p})}},h=p=>{["A","1","0","x","c","h","b"].includes(p)?c(p):p==="del"&&l(),y()},f=p=>{a(p.currentTarget)},y=()=>{a(null)};return n.jsxs(n.Fragment,{children:[n.jsx(G,{id:"basic-button","aria-controls":r?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":r?"true":void 0,onClick:f,sx:{borderRadius:"8px",border:"2px solid #4A434B",mt:1},children:n.jsx(mt,{})}),n.jsxs(Z,{id:"basic-menu",anchorEl:i,open:r,onClose:y,MenuListProps:{"aria-labelledby":"basic-button"},children:[n.jsxs(m,{onClick:()=>h("A"),children:[n.jsx(b,{children:n.jsx(k,{color:"warning"})}),"Акцент"]}),n.jsxs(m,{onClick:()=>h("1"),children:[n.jsx(b,{children:n.jsx(k,{color:"primary"})}),"Удар"]}),n.jsxs(m,{onClick:()=>h("c"),children:[n.jsx(b,{children:n.jsx(L,{color:"primary"})}),"По заглушеным"]}),n.jsxs(m,{onClick:()=>h("b"),children:[n.jsx(b,{children:n.jsx(H,{color:"primary"})}),"По басам"]}),n.jsxs(m,{onClick:()=>h("h"),children:[n.jsx(b,{children:n.jsx(V,{color:"primary"})}),"По высоким"]}),n.jsxs(m,{onClick:()=>h("x"),children:[n.jsx(b,{children:n.jsx(U,{color:"primary"})}),"Заглушка"]}),n.jsxs(m,{onClick:()=>h("0"),children:[n.jsx(b,{children:n.jsx(k,{color:"disabled"})}),"Пропуск"]}),n.jsxs(m,{onClick:()=>h("del"),children:[n.jsx(b,{children:n.jsx(_t,{})}),"Удалить"]})]})]})},St=d.memo(kt),Et=(o,t)=>{switch(o){case"0":return t?n.jsx(M,{color:"disabled"}):n.jsx(k,{color:"disabled"});case"1":return t?n.jsx(M,{color:"primary"}):n.jsx(k,{color:"primary"});case"b":return t?n.jsx(Q,{color:"primary"}):n.jsx(H,{color:"primary"});case"h":return t?n.jsx(K,{color:"primary"}):n.jsx(V,{color:"primary"});case"A":return t?n.jsx(M,{color:"warning"}):n.jsx(k,{color:"warning"});case"x":return n.jsx(U,{color:"primary"});case"c":return t?n.jsx(J,{color:"primary"}):n.jsx(L,{color:"primary"});default:return null}},wt=({noteDuration:o,beatPattern:t})=>{const{editMode:s}=et(),e=t,i=d.useMemo(()=>t.map((a,r)=>{const c=r%2!==0;return Et(a,c)}),[t]);return n.jsx(n.Fragment,{children:n.jsx(F,{container:!0,columns:8,alignContent:"center",alignItems:"center",justifyContent:"center",flexGrow:"1",children:e.map((a,r)=>n.jsxs(F,{size:{xs:2,sm:1,md:1},sx:{boxSizing:"border-box",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minWidth:"max-content"},children:[n.jsx(xt,{id:r,noteDuration:o}),n.jsx(gt,{id:r,icon:i[r]}),s.edit&&n.jsx(St,{index:r})]},r))})})},Tt=d.memo(wt),jt={down:{type:"play",spread:3.7,bias:"strumD"},downA:{type:"play",spread:6,bias:"strumD",accent:!0},downB:{type:"play",spread:2,bias:"low"},downH:{type:"play",spread:3,bias:"high"},up:{type:"play",spread:3.7,bias:"strumU"},upA:{type:"play",spread:6,bias:"strum",accent:!0},upB:{type:"play",spread:2,bias:"low"},upH:{type:"play",spread:3,bias:"high"},x:{type:"chop",spread:6,bias:"low"},upM:{type:"mute",spread:6,bias:"low"},downM:{type:"mute",spread:6,bias:"low"},nothing:{type:"nothing",spread:0,bias:"no"}};function At(o,t){const s=ht[o];if(!s)return console.warn(`Аккорд ${o} не найден!`),[];const{spread:e,bias:i}=t,a=s.config.bias[i],r=s.config.stringVolumes.slice();let c=e+Math.random();for(let l=0;l<6;l++)isNaN(r[l])||(isNaN(a[l])?r[l]=NaN:a[l]>Math.ceil(c)?r[l]=NaN:a[l]>Math.floor(c)&&(r[l]=c%1>.25?r[l]-26*(1-Math.log10(1+c%1*9)):NaN));return r}function Mt(o,t){const s=t.accent?.001:.005,e=[],i=5,a=o==="up"?i:0,r=o==="up"?0:i,c=o==="up"?-1:1;for(let l=0,h=a;o==="up"?h>=r:h<=r;h+=c,l++)e[h]=l*s+.001*Math.random();return e}function Ot(o,t){const s={0:()=>"nothing",1:i=>i%2===0?"down":"up",A:i=>i%2===0?"downA":"upA",x:()=>"x",c:i=>i%2===0?"downM":"upM",h:i=>i%2===0?"downH":"upH",b:i=>i%2===0?"downB":"upB"},e=pt(t);return!e||!e.length?(console.warn(`Сэмплы для аккорда ${t} не найдены!`),[]):o.split("").map((i,a)=>{const c=(s[i]||(()=>"nothing"))(a),l=a%2===0?"down":"up",h=jt[c]||{},{type:f,accent:y}=h,p=Mt(l,h),E=At(t,h),S=e.map((A,z)=>({type:f,sample:A,db:E[z]+0,offset:p[z]}));return{index:a,instructions:S}})}function Rt(o,t,s,e,i){let a;switch(t){case"play":a=o.concat("Z");break;case"mute":a=o.replace(/[^o]/g,"F").concat("Z");break;case"chop":a=o.concat("C");break;default:a=o}if(!_[a]){console.warn(`Player ${a} not loaded`);return}if(w[_[a].stringId]){let r=w[_[a].stringId];_[r]&&(_[r].fadeOut=.05,_[r].stop(s),w[_[a].stringId]="")}_[a].volume.value=t=="chop"?e-7:t=="mute"?e+5:e,w[_[a].stringId]=a,_[a].start(s+i,.03)}function Bt(o,t){o.forEach(s=>{const{type:e,sample:i,db:a,offset:r}=s;e!=="nothing"&&!isNaN(a)&&Rt(i,e,t,a,r)})}function Ct(o,t){o[0].type!="nothing"&&ut.hihat.start(t)}const Dt=(o,t,s,e,i,a)=>{i&&t===0?x.click2.start(o):a==="4n"?x.click1.start(o):a==="8n"?t%2===0?s&&x.click1.start(o):e&&x.click1.start(o):a==="16n"&&(t%4===0?s&&x.click1.start(o):e&&x.click1.start(o))},It=()=>{const{soundSettings:o}=st(),{toneSettings:t}=X(),{sequenceSettings:s}=C(),{chordSettings:e}=tt(),{beatPattern:i}=s,{dispatch:a}=q(),r=d.useRef(null),c=d.useRef([]);d.useEffect(()=>{c.current=Ot(i,e.currentChord)},[i,e.currentChord]),d.useEffect(()=>{R().bpm.value=t.tempo||120},[t.tempo]);const l=d.useCallback((h,f)=>{const y=c.current[f].instructions,p=h+.1;dt().schedule(()=>{a({type:"SET_ACTIVE_BEAT",payload:f}),f===c.current.length-1&&a({type:"INCREMENT_CYCLE"})},p+.1),o.isBeatSound&&Bt(y,p,o.isBeatSound),o.isHitSound&&Ct(y,p),o.isMetronomeSound&&Dt(p,f,o.clickMainBeat,o.clickSubbeat,o.clickTaktBeat,t.noteDuration)},[o.isBeatSound,o.isHitSound,o.isMetronomeSound,o.clickMainBeat,o.clickSubbeat,o.clickTaktBeat,a,t.noteDuration]);d.useEffect(()=>{if(!t.isPlaying){R().stop(),a({type:"SET_ACTIVE_BEAT",payload:null});return}return ft().then(()=>{R().start()}),(!r.current||r.current.length!==c.current.length)&&(r.current&&r.current.dispose(),r.current=new I(l,Array.from({length:c.current.length},(h,f)=>f),t.noteDuration||"8n").start(0)),()=>{r.current&&r.current.dispose(),a({type:"RESET_CYCLE"})}},[t.noteDuration,l,a,t.isPlaying])},Vt=()=>{const{sequenceSettings:o}=C(),{beatPattern:t}=o,{toneSettings:s}=X();It();const e=d.useMemo(()=>t.split(""),[t]),i=d.useMemo(()=>s.noteDuration,[s.noteDuration]);return n.jsx(Tt,{noteDuration:i,beatPattern:e})};export{Vt as MetronomePlayer};
