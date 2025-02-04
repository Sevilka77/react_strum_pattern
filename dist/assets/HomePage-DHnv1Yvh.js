import{s as c,a as l,j as t,b as m,d as p,e as r,f as d,g as x,B as i}from"./ui-CMXPLWPe.js";import{L as g,H as u}from"./LDJson-CbQ8G8qI.js";import{L as h}from"./index-BEXy74El.js";import"./vendor-Bn94jRP8.js";const j=c(l)({backgroundColor:"rgb(55,65,81)",width:"100%",textTransform:"uppercase",borderRadius:"4px",color:"#FFF","&:hover":{backgroundColor:"rgb(75,85,99)"}}),f=({title:e,description:n,color:o,link:s})=>t.jsxs(m,{component:"li",sx:{backgroundColor:"rgb(31,41,55)",minWidth:275,borderRadius:"8px",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[t.jsxs(p,{children:[t.jsx(r,{variant:"h5",component:"h2",color:o,textAlign:"center",marginBottom:2,children:e}),t.jsx(r,{variant:"body2",color:"#9D9CA4",textAlign:"center",children:n})]}),t.jsx(d,{style:{justifyContent:"flex-end"},children:t.jsx(j,{component:h,to:s,children:e})})]}),b=[{title:"Создай свой бой",description:"Создавай уникальные ритмы с помощью удобного конструктора. Настрой упражнения под себя и тренируйся эффективно.",color:"#FFD700",link:"/create"},{title:"Тренировка боя",description:"Тренируйся с 22 ритмическими заданиями. Улучши чувство ритма и отточи технику шаг за шагом.",color:"rgb(99, 179, 237)",link:"/learn"},{title:"Основные бои",description:"Изучи классические гитарные бои, такие как «Шестёрка» и «Восьмёрка». Тренируйся с метрономом для укрепления техники.",color:"rgb(72, 187, 120)",link:"/patterns"},{title:"Пользовательские бои",description:"Открывай популярные ритмы, созданные другими пользователями, и вдохновляйся уникальными идеями.",color:"rgb(237, 100, 166)",link:"/custom"}];function w(){const e={"@context":"https://schema.org","@type":"WebSite",url:"https://strumming.ru",name:"Strumming - Онлайн тренажер гитарного боя",description:"Онлайн тренажер гитарного боя. Освойте схемы гитарных боев: шестерка, восьмерка, четверка, бой галоп.",potentialAction:[{"@type":"ViewAction",target:"https://strumming.ru/create",name:"Создать гитарный бой"},{"@type":"ViewAction",target:"https://strumming.ru/learn",name:"Изучить гитарный бой"},{"@type":"ViewAction",target:"https://strumming.ru/patterns",name:"Список схем гитарного боя"},{"@type":"ViewAction",target:"https://strumming.ru/custom",name:"Пользовательские схемы боя"}]};return t.jsxs(t.Fragment,{children:[t.jsx(g,{data:e}),t.jsx(u,{}),t.jsxs(x,{component:"main",maxWidth:"xl",children:[t.jsxs(i,{component:"section",sx:{display:"flex",flexDirection:"column"},children:[t.jsxs(r,{component:"h1",sx:{fontSize:"clamp(24px,5.75vw, 360px)",lineHeight:"1",textAlign:"center",fontWeight:700,mb:{xs:1,sm:2,md:3}},children:["Освой гитарные бои"," ",t.jsx("span",{style:{color:"#FFD700"},children:"с легкостью!"})]}),t.jsx(r,{sx:{lineHeight:"1",textAlign:"center",color:"rgb(156, 153, 175)",fontSize:"clamp(16px, 2.08vw, 40px)",mb:{xs:1,sm:2,md:3}},children:"Развивайте чувство ритма и совершенствуйте навыки игры с помощью упражнений, гитарных боев и тренировок под метроном. Сделай свой прогресс на гитаре быстрее!"})]}),t.jsx(i,{component:"section",children:t.jsx(i,{component:"ul",sx:{display:"grid",gridTemplateColumns:{xs:"repeat(1, 1fr)",md:"repeat(2, 1fr)",lg:"repeat(4, 1fr)"},p:0,gap:{xs:1,md:2,lg:4},listStyle:"none"},children:b.map(({title:n,description:o,color:s,link:a})=>t.jsx(f,{title:n,color:s,description:o,link:a},n))})})]})]})}export{w as default};
