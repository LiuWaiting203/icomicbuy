import{x as J,A as r,T as U,B as q,C as Q,D as W,o as l,F as s,aC as X,H as Y,am as P,b4 as Z,K as ee,J as B,O as o,al as ae,aE as le,aF as te,P as D,b3 as oe,an as se,aG as re,L as ne,ag as ue}from"./index-83bd9652.js";import{c as ie,a as M,b as de,f as ce,u as me,d as c,V as pe}from"./vee-validate.esm-0dcbe930.js";import{V as ge}from"./VContainer-8d0b1d58.js";import{V as ve,a as E}from"./VRow-35e5f215.js";import{V as be,a as Ve}from"./VSwitch-baf48da3.js";import{V as fe}from"./VTextarea-58971f5c.js";import"./_commonjsHelpers-39b5b250.js";const ye=ue("h1",{class:"text-center"},"商品管理",-1),Pe={__name:"ProductsView",setup(we){const h=J(),k=r(5),m=r([{key:"name",order:"asc"}]),p=r(1),x=r([]),K=[{title:"圖片",align:"center",sortable:!1,key:"image"},{title:"名稱",align:"center",sortable:!0,key:"name"},{title:"價格",align:"center",sortable:!0,key:"price"},{title:"說明",align:"center",sortable:!1,key:"description"},{title:"分類",align:"center",sortable:!0,key:"category"},{title:"上架",align:"center",sortable:!0,key:"sell"},{title:"編輯",align:"center",sortable:!1,key:"edit"}],C=r(!1),A=r(0),g=r(""),T=()=>{p.value=1,u()},u=async()=>{var t,e;C.value=!0;try{const{data:n}=await U.get("/products/all",{params:{page:p.value,itemsPerPage:k.value,sortBy:((t=m.value[0])==null?void 0:t.key)||"_id",sortOrder:((e=m.value[0])==null?void 0:e.order)||"asc",search:g.value}});x.value.splice(0,x.value.length,...n.result.data),A.value=n.result.count}catch(n){console.log(n),h({text:n.response.data.message,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}C.value=!1};u();const L=t=>{i.value=t._id,b.value.value=t.name,V.value.value=t.price,f.value.value=t.description,y.value.value=t.category,w.value.value=t.sell,v.value=!0},v=r(!1),i=r(""),z=async t=>{i.value=t._id;const e=new FormData;e.append("sell",!t.sell),await U.patch("/products/"+i.value,e)},I=()=>{v.value=!1,O(),$.value.deleteFileRecord()},N=["漫畫","插畫","素材","音樂","3D模型","遊戲","公仔"],j=ie({name:M().required("缺少名稱"),price:de().typeError("價格錯誤").required("缺少價格").min(0,"價格錯誤"),description:M().required("缺少說明"),category:M().required("缺少分類").test("isCategory",t=>["漫畫","插畫","素材","音樂","3D模型","遊戲","公仔"].includes(t)),sell:ce()}),{handleSubmit:H,isSubmitting:S,resetForm:O}=me({validationSchema:j,initialValues:{name:"",price:0,description:"",category:"",sell:!1}}),b=c("name"),V=c("price"),f=c("description"),y=c("category"),w=c("sell"),d=r([]),_=r([]),$=r(null),R=H(async t=>{if(!(i.value.length===0&&d.value.length===0))try{const e=new FormData;e.append("name",t.name),e.append("price",t.price),e.append("description",t.description),e.append("category",t.category),e.append("sell",t.sell),d.value.length>0&&e.append("image",d.value[0].file),i.value.length>0&&await U.patch("/products/"+i.value,e),h({text:"修改成功",showCloseButton:!1,snackbarProps:{timeout:3e3,color:"success",location:"bottom"}}),I(),u()}catch(e){h({text:e.response.data.message,showCloseButton:!1,snackbarProps:{timeout:3e3,color:"error",location:"bottom"}})}});return(t,e)=>{const n=q("VDataTableServer"),G=q("VueFileAgent");return Q(),W(Y,null,[l(ge,null,{default:s(()=>[l(ve,{class:"elevation-3"},{default:s(()=>[l(E,{class:"bg-indigo",cols:"12"},{default:s(()=>[ye]),_:1}),l(E,{class:"bg-cyan-lighten-4",cols:"12"},{default:s(()=>[l(n,{class:"data-table","items-per-page":k.value,"onUpdate:itemsPerPage":[e[1]||(e[1]=a=>k.value=a),u],"sort-by":m.value,"onUpdate:sortBy":[e[2]||(e[2]=a=>m.value=a),u],page:p.value,"onUpdate:page":[e[3]||(e[3]=a=>p.value=a),u],items:x.value,headers:K,loading:C.value,"items-length":A.value,hover:"",search:g.value},{top:s(()=>[l(P,{class:"w-50 ml-5",variant:"underlined",placeholder:"請輸入詳細資料","prepend-inner-icon":"mdi-magnify","onClick:prependInner":T,modelValue:g.value,"onUpdate:modelValue":e[0]||(e[0]=a=>g.value=a),onKeydown:Z(T,["enter"]),clearable:""},null,8,["modelValue","onKeydown"])]),"item.image":s(({item:a})=>[l(ee,{class:"rounded mx-auto",src:a.raw.image,"min-width":150,"aspect-ratio":1,cover:""},null,8,["src"])]),"item.sell":s(({item:a})=>[l(be,{color:"success",density:"compact",modelValue:a.raw.sell,"onUpdate:modelValue":F=>a.raw.sell=F,onClick:F=>z(a.raw)},null,8,["modelValue","onUpdate:modelValue","onClick"])]),"item.edit":s(({item:a})=>[l(B,{variant:"text",icon:"mdi-square-edit-outline",onClick:F=>L(a.raw)},null,8,["onClick"])]),_:2},1032,["items-per-page","sort-by","page","items","loading","items-length","search"])]),_:1})]),_:1})]),_:1}),l(X,{persistent:"",scrollable:"",width:"500",modelValue:v.value,"onUpdate:modelValue":e[11]||(e[11]=a=>v.value=a)},{default:s(()=>[l(pe,{disabled:o(S),onSubmit:ae(o(R),["prevent"])},{default:s(()=>[l(le,null,{default:s(()=>[l(te,{class:"mb-5 bg-blue-lighten-2 text-white font-weight-bold"},{default:s(()=>[D("管理商品")]),_:1}),l(oe,{style:{height:"400px"}},{default:s(()=>[l(P,{label:"名稱",modelValue:o(b).value.value,"onUpdate:modelValue":e[4]||(e[4]=a=>o(b).value.value=a),"error-messages":o(b).errorMessage.value,variant:"solo-filled"},null,8,["modelValue","error-messages"]),l(P,{label:"價格",modelValue:o(V).value.value,"onUpdate:modelValue":e[5]||(e[5]=a=>o(V).value.value=a),modelModifiers:{number:!0},"error-messages":o(V).errorMessage.value,type:"number",variant:"solo-filled"},null,8,["modelValue","error-messages"]),l(fe,{label:"說明",modelValue:o(f).value.value,"onUpdate:modelValue":e[6]||(e[6]=a=>o(f).value.value=a),"error-messages":o(f).errorMessage.value,variant:"solo-filled"},null,8,["modelValue","error-messages"]),l(se,{chips:"",label:"類別",modelValue:o(y).value.value,"onUpdate:modelValue":e[7]||(e[7]=a=>o(y).value.value=a),"error-messages":o(y).errorMessage.value,items:N,variant:"solo-filled",hint:"請選擇分類"},null,8,["modelValue","error-messages"]),l(Ve,{label:"上架",modelValue:o(w).value.value,"onUpdate:modelValue":e[8]||(e[8]=a=>o(w).value.value=a),"error-messages":o(w).errorMessage.value,color:"blue"},null,8,["modelValue","error-messages"]),l(G,{modelValue:d.value,"onUpdate:modelValue":e[9]||(e[9]=a=>d.value=a),"raw-model-value":_.value,"onUpdate:rawModelValue":e[10]||(e[10]=a=>_.value=a),"max-files":1,"max-size":"1MB",accept:"image/jpg, image/jpeg, image/png",multiple:!1,"error-text":{type:"檔案格式錯誤",size:"檔案太大"},"help-text":"選擇檔案或拖放到這裡","thumbnail-size":1200,deletable:"",ref_key:"fileAgent",ref:$},null,8,["modelValue","raw-model-value"])]),_:1}),l(re,null,{default:s(()=>[l(ne),l(B,{type:"submit",color:"success",variant:"tonal",loading:o(S)},{default:s(()=>[D("確認")]),_:1},8,["loading"]),l(B,{color:"error",variant:"tonal",onClick:I,loading:o(S)},{default:s(()=>[D("取消")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},8,["modelValue"])],64)}}};export{Pe as default};