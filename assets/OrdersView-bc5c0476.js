import{A as f,x as g,T as y,C as o,E as V,F as n,o as l,ah as k,ae as w,P as S,b0 as i,ak as t,D as d,N as _,H as b,U as c}from"./index-2c369155.js";import{V as R}from"./VContainer-129d0fb9.js";import{a as B,V as C}from"./VRow-1ef26a63.js";const D=t("thead",null,[t("tr",null,[t("th",{class:"text-center"},"會員"),t("th",{class:"text-center"},"暱稱"),t("th",{class:"text-center"},"訂單ID"),t("th",{class:"text-center"},"日期"),t("th",{class:"text-center"},"金額"),t("th",{class:"text-center"},"商品"),t("th",{class:"text-center"},"地址")])],-1),N={class:"text-center border-table-R text-body-2"},T={class:"text-center border-table-R text-body-2"},$={class:"text-center text-caption border-table-R"},F={class:"text-center border-table-R text-caption"},q={class:"text-center border-table-R text-subtitle-2 text-pink"},v={class:"text-center border-table-R px-0"},A={class:"border-table-B"},E={class:"w-25 border-table-B"},L={class:"text-center border-table-R text-body-2"},M={__name:"OrdersView",setup(P){const u=f([]),x=g(),h=a=>a.split("").splice(11).join(""),p=a=>{const s=new Date(a),e=s.getFullYear(a),r=String(s.getMonth()+1).padStart(2,"0"),m=String(s.getDate()).padStart(2,"0");return`${e}${r}${m}`};return(async()=>{try{const{data:a}=await y.get("/orders/all");u.value.push(...a.result.map(s=>(s.total=s.cart.reduce((e,r)=>e+r.product.price*r.quantity,0),s)))}catch(a){x({text:a.response.data.message,showCloseButton:!1,snackbarProps:{timeout:3e3,color:"error",location:"bottom"}})}})(),(a,s)=>(o(),V(R,null,{default:n(()=>[l(C,null,{default:n(()=>[l(B,{cols:"12"},{default:n(()=>[l(k,null,{default:n(()=>[l(w,{class:"bg-blue text-center font-weight-bold text-h5"},{default:n(()=>[S("訂單資料")]),_:1}),l(i,null,{default:n(()=>[D,t("tbody",null,[(o(!0),d(b,null,_(u.value,e=>(o(),d("tr",{key:e._id},[t("td",N,c(e.user.account),1),t("td",T,c(e.user.name),1),t("td",$,c(p(e.date)+h(e._id)),1),t("td",F,c(new Date(e.date).toLocaleString()),1),t("td",q,"$"+c(e.total),1),t("td",v,[l(i,null,{default:n(()=>[(o(!0),d(b,null,_(e.cart,r=>(o(),d("tr",{class:"text-subtitle-2",key:r._id},[t("td",A,c(r.product.name),1),t("td",E,c(r.quantity)+" 個",1)]))),128))]),_:2},1024)]),t("td",L,c(e.address),1)]))),128))])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}};export{M as default};