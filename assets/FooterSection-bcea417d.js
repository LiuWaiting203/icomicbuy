import{V as y,a as i}from"./VRow-6d3d5382.js";import{p as V,aN as R,m as x,av as F,aO as P,b as B,c as S,d as p,g as w,ao as z,u as I,t as d,aP as L,ay as N,f as T,Z as E,_ as j,z as a,aQ as H,l as O,o as t,ac as D,B as Q,C as U,E as Z,F as o,af as $,L as m,ag as n,aR as q}from"./index-acf387ef.js";const A=V({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...R(),...x(),...F(),...P(),...B(),...S({tag:"footer"}),...p()},"VFooter"),G=w()({name:"VFooter",props:A(),setup(e,l){let{slots:s}=l;const{themeClasses:h}=z(e),{backgroundColorClasses:g,backgroundColorStyles:f}=I(d(e,"color")),{borderClasses:_}=L(e),{elevationClasses:v}=N(e),{roundedClasses:b}=T(e),r=E(32),{resizeRef:k}=j(u=>{u.length&&(r.value=u[0].target.clientHeight)}),c=a(()=>e.height==="auto"?r.value:parseInt(e.height,10)),{layoutItemStyles:C}=H({id:e.name,order:a(()=>parseInt(e.order,10)),position:a(()=>"bottom"),layoutSize:c,elementSize:a(()=>e.height==="auto"?void 0:c.value),active:a(()=>e.app),absolute:d(e,"absolute")});return O(()=>t(e.tag,{ref:k,class:["v-footer",h.value,g.value,_.value,v.value,b.value,e.class],style:[f.value,e.app?C.value:{height:D(e.height)},e.style]},s)),{}}}),J=n("text",{class:"text-h6 font-weight-bold"},"關於 iComic",-1),K=n("a",null,"登入 / 註冊",-1),M=n("a",null,"關於我們",-1),W=n("a",{class:"text-decoration-none",href:"#"},"回首頁",-1);function X(e,l){const s=Q("RouterLink");return U(),Z(G,{class:"bg-grey-lighten-3 border-top"},{default:o(()=>[t(y,{justify:"center","no-gutters":""},{default:o(()=>[t(i,{class:"mb-3",cols:"12"},{default:o(()=>[J]),_:1}),t($),t(i,{class:"d-flex justify-between mt-2",cols:"12"},{default:o(()=>[t(s,{class:"text-decoration-none",to:"/login"},{default:o(()=>[K]),_:1}),t(m),t(s,{class:"text-decoration-none",to:"/aboutus"},{default:o(()=>[M]),_:1}),t(m),W]),_:1})]),_:1})]),_:1})}const Y={},oe=q(Y,[["render",X]]);export{oe as F};
