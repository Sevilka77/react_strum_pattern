const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Cs7wKAId.js","assets/ui-CMXPLWPe.js","assets/vendor-Bn94jRP8.js","assets/useCycleSettings-DWfpFlSS.js","assets/index-BEXy74El.js","assets/Icons-jkWiUZ6y.js","assets/useSequenceSettings-DPi8VQfn.js","assets/LDJson-CbQ8G8qI.js","assets/useEditMode-Ba77VuAd.js"])))=>i.map(i=>d[i]);
import{_,u as f,a as h}from"./index-BEXy74El.js";import{j as e,g as x}from"./ui-CMXPLWPe.js";import{u as P,H as S,L as j}from"./LDJson-CbQ8G8qI.js";import{r as s}from"./vendor-Bn94jRP8.js";import{u as A,C as D}from"./useSequenceSettings-DPi8VQfn.js";import{p as O}from"./patterns-Df8ZQUM2.js";import"./Icons-jkWiUZ6y.js";const N=s.lazy(()=>_(()=>import("./index-Cs7wKAId.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8])).then(i=>({default:i.MetronomePlayer})));function C(){const i=f(),{beatPattern:o}=h(),{dispatch:n}=P(),{sequenceSettings:c,dispatch:r}=A(),{pattern:l}=c,a=i.state,[u,m]=s.useState("Выбор боя"),[d,T]=s.useState(""),[E,g]=s.useState({});return s.useEffect(()=>{if(a)m(a.title||"Пользовательский бой"),r({type:"SET_BEAT_PATTERN",payload:a.pattern}),n({type:"SET_NOTE_DURATION",payload:a.note}),n({type:"SET_TEMPO",payload:a.temp});else if(o){const t=O.find(p=>p.pattern===o);if(t){m(t.title||"Выбор боя"),r({type:"SET_BEAT_PATTERN",payload:t.pattern}),n({type:"SET_NOTE_DURATION",payload:t.note}),n({type:"SET_TEMPO",payload:t.temp});const p=`https://strumming.ru/assets/images/svg/${t.image}`;T(p);const y={"@context":"https://schema.org","@type":"WebPage","@id":`https://strumming.ru/pattern/${t.pattern}`,url:`https://strumming.ru/pattern/${t.pattern}`,name:`${t.title}`,description:`Схема для гитарного боя ${t.title}`,image:{"@type":"ImageObject",url:p},mainEntityOfPage:`https://strumming.ru/pattern/${t.pattern}`};g(y)}else m("Пользовательский бой"),r({type:"SET_BEAT_PATTERN",payload:o})}else r({type:"SET_BEAT_PATTERN",payload:l})},[a,o,l,d,n,r]),e.jsxs(e.Fragment,{children:[e.jsx(S,{title:u}),e.jsx(j,{data:E}),e.jsxs(x,{component:"main",sx:{display:"flex",minHeight:"80dvh",flexDirection:"column",alignItems:"center",justifyContent:"center"},maxWidth:"xl",children:[e.jsx(s.Suspense,{fallback:e.jsx("div",{children:"Загрузка..."}),children:e.jsx(N,{})}),e.jsx(D,{})]})]})}export{C as default};
