import{p as oe,I as fe,m as Le,c as ke,W as Be,g as re,X as De,y as Ve,Y as Oe,Z as $,z as B,_ as ve,$ as Ae,a0 as Ie,l as ie,o as n,a1 as pe,V as Q,a2 as Me,a3 as Fe,a4 as $e,a5 as Ue,i as He,A as K,J as le,q as se,a6 as Ne,a7 as Ge,a8 as qe,a9 as je,aa as Xe,u as Ye,t as F,ab as We,ac as Ke,ad as te,r as Je,x as Ce,B as Ze,C as A,E as ne,F as b,K as Pe,ae as Qe,P as W,U as Z,af as me,ag as et,ah as tt,T as at,D as j,H as X,ai as ye,N as J,O as ge,aj as lt,ak as ee,al as st,am as nt,an as be,ao as he}from"./index-2c369155.js";import{F as ot}from"./FooterSection-4c267932.js";import{V as Se}from"./VContainer-129d0fb9.js";import{V as ae,a as Y}from"./VRow-1ef26a63.js";function xe(t){const u=Math.abs(t);return Math.sign(t)*(u/((1/.501-2)*(1-u)+1))}function we(t){let{selectedElement:e,containerSize:u,contentSize:o,isRtl:p,currentScrollOffset:s,isHorizontal:r}=t;const a=r?e.clientWidth:e.clientHeight,v=r?e.offsetLeft:e.offsetTop,c=p&&r?o-v-a:v,i=u+s,h=a+c,S=a*.4;return c<=s?s=Math.max(c-S,0):i<=h&&(s=Math.min(s-(i-h-S),o-u)),s}function rt(t){let{selectedElement:e,containerSize:u,contentSize:o,isRtl:p,isHorizontal:s}=t;const r=s?e.clientWidth:e.clientHeight,a=s?e.offsetLeft:e.offsetTop,v=p&&s?o-a-r/2-u/2:a+r/2-u/2;return Math.min(o-u,Math.max(0,v))}const it=Symbol.for("vuetify:v-slide-group"),Ee=oe({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:it},nextIcon:{type:fe,default:"$next"},prevIcon:{type:fe,default:"$prev"},showArrows:{type:[Boolean,String],validator:t=>typeof t=="boolean"||["always","desktop","mobile"].includes(t)},...Le(),...ke(),...Be({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),Te=re()({name:"VSlideGroup",props:Ee(),emits:{"update:modelValue":t=>!0},setup(t,e){let{slots:u}=e;const{isRtl:o}=De(),{mobile:p}=Ve(),s=Oe(t,t.symbol),r=$(!1),a=$(0),v=$(0),c=$(0),i=B(()=>t.direction==="horizontal"),{resizeRef:h,contentRect:S}=ve(),{resizeRef:y,contentRect:g}=ve(),k=B(()=>s.selected.value.length?s.items.value.findIndex(l=>l.id===s.selected.value[0]):-1),m=B(()=>s.selected.value.length?s.items.value.findIndex(l=>l.id===s.selected.value[s.selected.value.length-1]):-1);if(Ae){let l=-1;Ie(()=>[s.selected.value,S.value,g.value,i.value],()=>{cancelAnimationFrame(l),l=requestAnimationFrame(()=>{if(S.value&&g.value){const f=i.value?"width":"height";v.value=S.value[f],c.value=g.value[f],r.value=v.value+1<c.value}if(k.value>=0&&y.value){const f=y.value.children[m.value];k.value===0||!r.value?a.value=0:t.centerActive?a.value=rt({selectedElement:f,containerSize:v.value,contentSize:c.value,isRtl:o.value,isHorizontal:i.value}):r.value&&(a.value=we({selectedElement:f,containerSize:v.value,contentSize:c.value,isRtl:o.value,currentScrollOffset:a.value,isHorizontal:i.value}))}})})}const x=$(!1);let V=0,C=0;function O(l){const f=i.value?"clientX":"clientY";C=(o.value&&i.value?-1:1)*a.value,V=l.touches[0][f],x.value=!0}function E(l){if(!r.value)return;const f=i.value?"clientX":"clientY",L=o.value&&i.value?-1:1;a.value=L*(C+V-l.touches[0][f])}function I(l){const f=c.value-v.value;a.value<0||!r.value?a.value=0:a.value>=f&&(a.value=f),x.value=!1}function _(){h.value&&(h.value[i.value?"scrollLeft":"scrollTop"]=0)}const P=$(!1);function D(l){if(P.value=!0,!(!r.value||!y.value)){for(const f of l.composedPath())for(const L of y.value.children)if(L===f){a.value=we({selectedElement:L,containerSize:v.value,contentSize:c.value,isRtl:o.value,currentScrollOffset:a.value,isHorizontal:i.value});return}}}function z(l){P.value=!1}function U(l){var f;!P.value&&!(l.relatedTarget&&((f=y.value)!=null&&f.contains(l.relatedTarget)))&&w()}function G(l){y.value&&(i.value?l.key==="ArrowRight"?w(o.value?"prev":"next"):l.key==="ArrowLeft"&&w(o.value?"next":"prev"):l.key==="ArrowDown"?w("next"):l.key==="ArrowUp"&&w("prev"),l.key==="Home"?w("first"):l.key==="End"&&w("last"))}function w(l){var f,L,ue,ce,de;if(y.value)if(!l)(f=Me(y.value)[0])==null||f.focus();else if(l==="next"){const N=(L=y.value.querySelector(":focus"))==null?void 0:L.nextElementSibling;N?N.focus():w("first")}else if(l==="prev"){const N=(ue=y.value.querySelector(":focus"))==null?void 0:ue.previousElementSibling;N?N.focus():w("last")}else l==="first"?(ce=y.value.firstElementChild)==null||ce.focus():l==="last"&&((de=y.value.lastElementChild)==null||de.focus())}function M(l){const f=a.value+(l==="prev"?-1:1)*v.value;a.value=Fe(f,0,c.value-v.value)}const H=B(()=>{let l=a.value>c.value-v.value?-(c.value-v.value)+xe(c.value-v.value-a.value):-a.value;a.value<=0&&(l=xe(-a.value));const f=o.value&&i.value?-1:1;return{transform:`translate${i.value?"X":"Y"}(${f*l}px)`,transition:x.value?"none":"",willChange:x.value?"transform":""}}),q=B(()=>({next:s.next,prev:s.prev,select:s.select,isSelected:s.isSelected})),d=B(()=>{switch(t.showArrows){case"always":return!0;case"desktop":return!p.value;case!0:return r.value||Math.abs(a.value)>0;case"mobile":return p.value||r.value||Math.abs(a.value)>0;default:return!p.value&&(r.value||Math.abs(a.value)>0)}}),R=B(()=>Math.abs(a.value)>0),T=B(()=>c.value>Math.abs(a.value)+v.value);return ie(()=>n(t.tag,{class:["v-slide-group",{"v-slide-group--vertical":!i.value,"v-slide-group--has-affixes":d.value,"v-slide-group--is-overflowing":r.value},t.class],style:t.style,tabindex:P.value||s.selected.value.length?-1:0,onFocus:U},{default:()=>{var l,f,L;return[d.value&&n("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!R.value}],onClick:()=>M("prev")},[((l=u.prev)==null?void 0:l.call(u,q.value))??n(pe,null,{default:()=>[n(Q,{icon:o.value?t.nextIcon:t.prevIcon},null)]})]),n("div",{key:"container",ref:h,class:"v-slide-group__container",onScroll:_},[n("div",{ref:y,class:"v-slide-group__content",style:H.value,onTouchstartPassive:O,onTouchmovePassive:E,onTouchendPassive:I,onFocusin:D,onFocusout:z,onKeydown:G},[(f=u.default)==null?void 0:f.call(u,q.value)])]),d.value&&n("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!T.value}],onClick:()=>M("next")},[((L=u.next)==null?void 0:L.call(u,q.value))??n(pe,null,{default:()=>[n(Q,{icon:o.value?t.prevIcon:t.nextIcon},null)]})])]}})),{selected:s.selected,scrollTo:M,scrollOffset:a,focus:w}}});const ze=Symbol.for("vuetify:v-tabs"),ut=oe({fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...$e(Ue({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),Re=re()({name:"VTab",props:ut(),setup(t,e){let{slots:u,attrs:o}=e;const{textColorClasses:p,textColorStyles:s}=He(t,"sliderColor"),r=B(()=>t.direction==="horizontal"),a=$(!1),v=K(),c=K();function i(h){var y,g;let{value:S}=h;if(a.value=S,S){const k=(g=(y=v.value)==null?void 0:y.$el.parentElement)==null?void 0:g.querySelector(".v-tab--selected .v-tab__slider"),m=c.value;if(!k||!m)return;const x=getComputedStyle(k).color,V=k.getBoundingClientRect(),C=m.getBoundingClientRect(),O=r.value?"x":"y",E=r.value?"X":"Y",I=r.value?"right":"bottom",_=r.value?"width":"height",P=V[O],D=C[O],z=P>D?V[I]-C[I]:V[O]-C[O],U=Math.sign(z)>0?r.value?"right":"bottom":Math.sign(z)<0?r.value?"left":"top":"center",w=(Math.abs(z)+(Math.sign(z)<0?V[_]:C[_]))/Math.max(V[_],C[_]),M=V[_]/C[_],H=1.5;Ne(m,{backgroundColor:[x,"currentcolor"],transform:[`translate${E}(${z}px) scale${E}(${M})`,`translate${E}(${z/H}px) scale${E}(${(w-1)/H+1})`,"none"],transformOrigin:Array(3).fill(U)},{duration:225,easing:Ge})}}return ie(()=>{const[h]=le.filterProps(t);return n(le,se({symbol:ze,ref:v,class:["v-tab",t.class],style:t.style,tabindex:a.value?0:-1,role:"tab","aria-selected":String(a.value),active:!1,block:t.fixed,maxWidth:t.fixed?300:void 0,rounded:0},h,o,{"onGroup:selected":i}),{default:()=>{var S;return[((S=u.default)==null?void 0:S.call(u))??t.text,!t.hideSlider&&n("div",{ref:c,class:["v-tab__slider",p.value],style:s.value},null)]}})}),{}}});function ct(t){return t?t.map(e=>typeof e=="string"?{title:e,value:e}:e):[]}const dt=oe({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...Ee({mandatory:"force"}),...qe(),...ke()},"VTabs"),ft=re()({name:"VTabs",props:dt(),emits:{"update:modelValue":t=>!0},setup(t,e){let{slots:u}=e;const o=je(t,"modelValue"),p=B(()=>ct(t.items)),{densityClasses:s}=Xe(t),{backgroundColorClasses:r,backgroundColorStyles:a}=Ye(F(t,"bgColor"));return We({VTab:{color:F(t,"color"),direction:F(t,"direction"),stacked:F(t,"stacked"),fixed:F(t,"fixedTabs"),sliderColor:F(t,"sliderColor"),hideSlider:F(t,"hideSlider")}}),ie(()=>{const[v]=Te.filterProps(t);return n(Te,se(v,{modelValue:o.value,"onUpdate:modelValue":c=>o.value=c,class:["v-tabs",`v-tabs--${t.direction}`,`v-tabs--align-tabs-${t.alignTabs}`,{"v-tabs--fixed-tabs":t.fixedTabs,"v-tabs--grow":t.grow,"v-tabs--stacked":t.stacked},s.value,r.value,t.class],style:[{"--v-tabs-height":Ke(t.height)},a.value,t.style],role:"tablist",symbol:ze}),{default:()=>[u.default?u.default():p.value.map(c=>n(Re,se(c,{key:c.title}),null))]})}),{}}});function vt(t){let{swiper:e,extendParams:u,on:o,emit:p,params:s}=t;e.autoplay={running:!1,paused:!1,timeLeft:0},u({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let r,a,v=s&&s.autoplay?s.autoplay.delay:3e3,c=s&&s.autoplay?s.autoplay.delay:3e3,i,h=new Date().getTime,S,y,g,k,m,x;function V(d){!e||e.destroyed||!e.wrapperEl||d.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",V),D())}const C=()=>{if(e.destroyed||!e.autoplay.running)return;e.autoplay.paused?S=!0:S&&(c=i,S=!1);const d=e.autoplay.paused?i:h+c-new Date().getTime();e.autoplay.timeLeft=d,p("autoplayTimeLeft",d,d/v),a=requestAnimationFrame(()=>{C()})},O=()=>{let d;return e.virtual&&e.params.virtual.enabled?d=e.slides.filter(T=>T.classList.contains("swiper-slide-active"))[0]:d=e.slides[e.activeIndex],d?parseInt(d.getAttribute("data-swiper-autoplay"),10):void 0},E=d=>{if(e.destroyed||!e.autoplay.running)return;cancelAnimationFrame(a),C();let R=typeof d>"u"?e.params.autoplay.delay:d;v=e.params.autoplay.delay,c=e.params.autoplay.delay;const T=O();!Number.isNaN(T)&&T>0&&typeof d>"u"&&(R=T,v=T,c=T),i=R;const l=e.params.speed,f=()=>{!e||e.destroyed||(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(l,!0,!0),p("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,l,!0,!0),p("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(l,!0,!0),p("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,l,!0,!0),p("autoplay")),e.params.cssMode&&(h=new Date().getTime(),requestAnimationFrame(()=>{E()})))};return R>0?(clearTimeout(r),r=setTimeout(()=>{f()},R)):requestAnimationFrame(()=>{f()}),R},I=()=>{e.autoplay.running=!0,E(),p("autoplayStart")},_=()=>{e.autoplay.running=!1,clearTimeout(r),cancelAnimationFrame(a),p("autoplayStop")},P=(d,R)=>{if(e.destroyed||!e.autoplay.running)return;clearTimeout(r),d||(x=!0);const T=()=>{p("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",V):D()};if(e.autoplay.paused=!0,R){m&&(i=e.params.autoplay.delay),m=!1,T();return}i=(i||e.params.autoplay.delay)-(new Date().getTime()-h),!(e.isEnd&&i<0&&!e.params.loop)&&(i<0&&(i=0),T())},D=()=>{e.isEnd&&i<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(h=new Date().getTime(),x?(x=!1,E(i)):E(),e.autoplay.paused=!1,p("autoplayResume"))},z=()=>{if(e.destroyed||!e.autoplay.running)return;const d=te();d.visibilityState==="hidden"&&(x=!0,P(!0)),d.visibilityState==="visible"&&D()},U=d=>{d.pointerType==="mouse"&&(x=!0,P(!0))},G=d=>{d.pointerType==="mouse"&&e.autoplay.paused&&D()},w=()=>{e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",U),e.el.addEventListener("pointerleave",G))},M=()=>{e.el.removeEventListener("pointerenter",U),e.el.removeEventListener("pointerleave",G)},H=()=>{te().addEventListener("visibilitychange",z)},q=()=>{te().removeEventListener("visibilitychange",z)};o("init",()=>{e.params.autoplay.enabled&&(w(),H(),h=new Date().getTime(),I())}),o("destroy",()=>{M(),q(),e.autoplay.running&&_()}),o("beforeTransitionStart",(d,R,T)=>{e.destroyed||!e.autoplay.running||(T||!e.params.autoplay.disableOnInteraction?P(!0,!0):_())}),o("sliderFirstMove",()=>{if(!(e.destroyed||!e.autoplay.running)){if(e.params.autoplay.disableOnInteraction){_();return}y=!0,g=!1,x=!1,k=setTimeout(()=>{x=!0,g=!0,P(!0)},200)}}),o("touchEnd",()=>{if(!(e.destroyed||!e.autoplay.running||!y)){if(clearTimeout(k),clearTimeout(r),e.params.autoplay.disableOnInteraction){g=!1,y=!1;return}g&&e.params.cssMode&&D(),g=!1,y=!1}}),o("slideChange",()=>{e.destroyed||!e.autoplay.running||(m=!0)}),Object.assign(e.autoplay,{start:I,stop:_,pause:P,resume:D})}const _e={__name:"ProductCard",props:{_id:{type:String,default:()=>""},category:{type:String,default:()=>""},image:{type:String,default:()=>""},description:{type:String,default:()=>""},name:{type:String,default:()=>""},price:{type:Number,default:()=>0},sell:{type:Boolean,default:()=>!0}},setup(t){const e=t,u=Je(),o=Ce(),p=async()=>{try{const{data:s}=await at.post("/users/cart",{product:e._id,quantity:1});u.cart=s.result}catch(s){o({text:s.response.data.message,showCloseButton:!1,snackbarProps:{timeout:3e3,color:"error",location:"bottom"}})}};return(s,r)=>{const a=Ze("RouterLink");return A(),ne(tt,{class:"rounded-0",ripple:"",variant:"text"},{default:b(()=>[n(a,{class:"text-decoration-none",to:"/products/"+t._id},{default:b(()=>[n(Pe,{class:"product-img-border",src:t.image,cover:"",aspectRatio:1},null,8,["src"]),n(Qe,{class:"pa-0 text-h6 text-primary font-weight-black"},{default:b(()=>[W(Z(t.name),1)]),_:1})]),_:1},8,["to"]),n(me,{class:"px-0 text-subtitle-1"},{default:b(()=>[W(Z(t.category),1)]),_:1}),n(me,{class:"px-0 text-subtitle-2 text-pink"},{default:b(()=>[W("$"+Z(t.price),1)]),_:1}),n(et,{class:"px-0"},{default:b(()=>[n(le,{color:"primary","prepend-icon":"mdi-cart",variant:"tonal",block:"",onClick:p},{default:b(()=>[W("加入購物車")]),_:1})]),_:1})]),_:1})}}},pt={class:"d-flex align-center"},mt=ee("text",{class:"text-h6 font-weight-bold ms-2"},"給喜歡動漫的你",-1),yt={class:"d-flex align-center"},gt=ee("p",{class:"text-h6 font-weight-bold ms-2 text-white"},"更多更棒的商品推薦給你",-1),wt={__name:"ProductsView",setup(t){const e=Ce(),{name:u,thresholds:o}=Ve(),p=K(null),s=["漫畫","插畫","素材","音樂","3D模型","遊戲","公仔"],r=[vt],a=[{path:new URL(""+new URL("carousel_01_big-3beb7af4.jpg",import.meta.url).href,self.location).href},{path:new URL(""+new URL("carousel_02_big-a9ab6d55.jpg",import.meta.url).href,self.location).href},{path:new URL(""+new URL("carousel_03_big-3d114b04.jpg",import.meta.url).href,self.location).href}],v=K([]),c={[o.value.xs]:{slidesPerView:1},[o.value.sm]:{slidesPerView:1},[o.value.md]:{slidesPerView:2},[o.value.lg]:{slidenPerView:2},[o.value.xl]:{slidenPerView:3},[o.value.xxl]:{slidenPerView:3}},i=B(()=>u.value==="lg"?2:1),h=async()=>{try{const{data:g}=await ye.get("/products/?category="+p.value);v.value=[...g.result]}catch(g){e({text:g.response.data.message,showCloseButton:!1,snackbarProps:{timeout:3e3,color:"error",location:"bottom"}})}};h();const S=K([]);return(async()=>{try{const{data:g}=await ye.get("/products/random");S.value.push(...g.result)}catch(g){e({text:g.response.data.message,showCloseButton:!1,snackbarProps:{timeout:3e3,color:"error",location:"bottom"}})}})(),(g,k)=>(A(),j(X,null,[n(ft,{class:"elevation-1",modelValue:p.value,"onUpdate:modelValue":[k[0]||(k[0]=m=>p.value=m),h],"bg-color":"light-blue-lighten-3",grow:"",density:"compact","fixed-tabs":!0},{default:b(()=>[(A(),j(X,null,J(s,m=>n(Re,{class:"rounded-0",key:m,value:m,border:""},{default:b(()=>[W(Z(m),1)]),_:2},1032,["value"])),64))]),_:1},8,["modelValue"]),n(Se,{fluid:""},{default:b(()=>[n(ae,null,{default:b(()=>[n(Y,{class:"pa-0",cols:"12"},{default:b(()=>[n(ge(st),{class:"mySwiper",style:{height:"300px",width:"100%"},loop:!0,spaceBetween:50,autoplay:{delay:2500,disableOnInteraction:!1},modules:r,effect:"fade",breakpoints:c,slidesPerView:i.value},{default:b(()=>[(A(),j(X,null,J(a,(m,x)=>n(ge(nt),{key:x},{default:b(()=>[n(Pe,{src:m.path,height:300,cover:""},null,8,["src"])]),_:2},1024)),64))]),_:1},8,["slidesPerView"])]),_:1})]),_:1})]),_:1}),n(lt,{class:"ma-5"}),n(Se,null,{default:b(()=>[n(ae,null,{default:b(()=>[n(Y,{class:"bg-pink-accent-2 rounded-pill pa-1 mb-5",cols:"12"},{default:b(()=>[ee("div",pt,[n(Q,{class:"ms-2",start:!0,icon:"mdi-book-open-blank-variant",size:"x-large",color:"yellow"}),mt])]),_:1}),(A(!0),j(X,null,J(v.value,m=>(A(),ne(Y,{class:"px-5",cols:"12",md:"6",lg:"3",key:m._id},{default:b(()=>[n(_e,be(he(m)),null,16)]),_:2},1024))),128)),n(Y,{class:"bg-light-blue-accent-2 rounded-pill pa-1 mb-5",cols:"12"},{default:b(()=>[ee("div",yt,[n(Q,{class:"ms-2",color:"pink",icon:"mdi-package",size:"x-large"}),gt])]),_:1})]),_:1}),n(ae,null,{default:b(()=>[(A(!0),j(X,null,J(S.value,m=>(A(),ne(Y,{class:"px-5",cols:"12",md:"6",lg:"3",key:m._id},{default:b(()=>[n(_e,be(he(m)),null,16)]),_:2},1024))),128))]),_:1})]),_:1}),n(ot,{style:{height:"150px"}})],64))}};export{wt as default};