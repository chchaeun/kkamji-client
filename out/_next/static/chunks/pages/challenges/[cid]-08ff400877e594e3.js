(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[826],{1537:function(e,n,t){var i=t(9953),r=t(7225);function a(e){if(e&&e.__esModule)return e;var n=Object.create(null);return e&&Object.keys(e).forEach((function(t){if("default"!==t){var i=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,i.get?i:{enumerable:!0,get:function(){return e[t]}})}})),n.default=e,Object.freeze(n)}var o=a(i),l=a(r),s=function(){return s=Object.assign||function(e){for(var n,t=1,i=arguments.length;t<i;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},s.apply(this,arguments)},c=function(e){var n,t=e.bgColor,i=e.completed,r=e.baseBgColor,a=e.height,l=e.width,c=e.margin,u=e.padding,d=e.borderRadius,p=e.labelAlignment,f=e.labelColor,h=e.labelSize,g=e.isLabelVisible,x=e.customLabelStyles,m=e.transitionDuration,b=e.transitionTimingFunction,w=e.className,v=e.dir,y=e.ariaValuemin,C=e.ariaValuemax,j=e.ariaValuetext,I=e.maxCompleted,_=e.customLabel,k=e.animateOnRender,E=e.barContainerClassName,z=e.completedClassName,O=e.labelClassName,S=e.initCompletedOnAnimation,N=void 0===S?0:S,P="left"===(n=p)?"flex-start":"center"===n?"center":"right"===n?"flex-end":null,Z="number"===typeof N?"".concat(N,"%"):N,B=function(e,n){if(e){var t=Number(n)/e;return t>1?"100%":"".concat(100*t,"%")}return Z}(I,i),L=o.useState(Z),A=L[0],D=L[1],R={height:a,background:r,borderRadius:d,padding:u,width:l,margin:c},q={height:a,width:k?A:B,background:t,transition:"width ".concat(m||"1s"," ").concat(b||"ease-in-out"),borderRadius:"inherit",display:"flex",alignItems:"center",justifyContent:"outside"!==p&&P?P:"normal"},F=s({padding:"outside"===p?"0 0 0 5px":"5px",color:f,fontWeight:"bold",fontSize:h,display:g?"initial":"none"},x),W={display:"outside"===p?"flex":"initial",alignItems:"outside"===p?"center":"initial"},T="number"===typeof i?"".concat(i,"%"):"".concat(i),U=_||T;return o.useEffect((function(){k&&requestAnimationFrame((function(){return D(B)}))}),[B,k]),o.createElement("div",{style:w?void 0:W,className:w,dir:v,role:"progressbar","aria-valuenow":parseFloat(U),"aria-valuemin":y,"aria-valuemax":C,"aria-valuetext":"".concat(null===j?U:j)},o.createElement("div",{style:E?void 0:R,className:E},o.createElement("div",{style:z?void 0:q,className:z},"outside"!==p&&o.createElement("span",{style:O?void 0:F,className:O},U))),"outside"===p&&o.createElement("span",{style:O?void 0:F,className:O},U))};c.propTypes={completed:l.oneOfType([l.string,l.number]).isRequired,bgColor:l.string,baseBgColor:l.string,height:l.string,width:l.string,borderRadius:l.string,margin:l.string,padding:l.string,labelAlignment:l.oneOf(["left","center","right","outside"]),labelColor:l.string,labelSize:l.string,isLabelVisible:l.bool,className:l.string,dir:l.oneOf(["rtl","ltr","auto"]),maxCompleted:l.number,customLabel:l.string,animateOnRender:l.bool,barContainerClassName:l.string,completedClassName:l.string,labelClassName:l.string,initCompletedOnAnimation:l.oneOfType([l.string,l.number])},c.defaultProps={bgColor:"#6a1b9a",height:"20px",width:"100%",borderRadius:"50px",labelAlignment:"right",baseBgColor:"#e0e0de",labelColor:"#fff",labelSize:"15px",isLabelVisible:!0,dir:"ltr",ariaValuemin:0,ariaValuemax:100,ariaValuetext:null,maxCompleted:100,animateOnRender:!1,initCompletedOnAnimation:0},n.Z=c},2252:function(e,n,t){"use strict";t.d(n,{s1:function(){return d},I2:function(){return p},jC:function(){return h},GH:function(){return f}});var i=t(934),r=t(1193),a=t(7511),o=t(7873),l=function(e){var n=e.challengeId;return"/challenges/".concat(n)},s=function(e){var n=e.challengeId;return"/challenges/".concat(n,"/now")},c=function(e){var n=e.challengeId;return"/challenges/".concat(n,"/weeks")},u="/my/challenges";function d(e){var n=e.challengeId,t=e.suspense,i=void 0!==t&&t;return(0,r.useQuery)([l({challengeId:n})],(function(){return(0,a.r)({url:l({challengeId:n})})}),{enabled:!!n,suspense:i})}function p(e){var n=e.challengeId;return(0,r.useQuery)([s({challengeId:n})],(function(){return(0,a.r)({url:s({challengeId:n})})}),{select:function(e){return e.week},enabled:!!n})}function f(e){var n=e.challengeId;return(0,r.useQuery)([c({challengeId:n})],(function(){return(0,a.r)({url:c({challengeId:n})})}),{enabled:!!n,select:function(e){return{totalWeeks:e.totalWeeks,weeks:Object.entries(e.weeks).map((function(e){var n=(0,i.Z)(e,2),t=n[0],r=n[1];return{week:Number(t),status:r}}))}}})}function h(){return(0,r.useQuery)([u],(function(){return(0,a.r)({url:u})}),{enabled:!!(0,o.r)(),suspense:!0})}},8647:function(e,n,t){"use strict";t.d(n,{BB:function(){return g},Fb:function(){return h},V1:function(){return b},nx:function(){return x},J1:function(){return m}});var i=t(1335),r=t(1193),a=t(7511),o=t(7873),l=function(e){var n=e.quizId;return"/quizzes/".concat(n,"/content")},s=function(e){var n=e.quizId;return"/my/quizzes/".concat(n)},c=function(e){var n=e.challengeId;switch(e.page){case"READABLE":return"/challenges/".concat(n,"/quizzes");case"MY":return"/challenges/".concat(n,"/my/quizzes");case"LIKED":return"/challenges/".concat(n,"/my-good-quizzes")}},u=function(e){var n=e.challengeId;return"/challenges/".concat(n,"/my/quizzes/count")},d="/my/quizzes/count";function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function f(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){(0,i.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function h(e){var n=e.quizId;return(0,r.useQuery)([l({quizId:n})],(function(){return(0,a.r)({url:l({quizId:n})})}),{enabled:!!n,onError:function(e){}})}function g(e){var n=e.quizId,t=e.successHandler;return(0,r.useQuery)([s({quizId:n})],(function(){return(0,a.r)({url:s({quizId:n})})}),{select:function(e){return f(f({},e),{},{quizRubric:JSON.parse(e.quizRubric)})},enabled:!!n,onSuccess:function(e){t&&t(e)}})}function x(e){var n=e.challengeId,t=e.page,i=e.suspense,o=void 0!==i&&i,l=[c({challengeId:n,page:t})],s={enabled:!0,suspense:o,select:function(e){return e.sort((function(e,n){return+new Date(n.quizCreatedDate)-+new Date(e.quizCreatedDate)}))}};return(0,r.useQuery)(l,(function(){return(0,a.r)({url:c({challengeId:n,page:t})})}),s)}function m(e){var n=e.challengeId,t=e.week;return(0,r.useQuery)([u({challengeId:n})],(function(){return(0,a.r)({url:u({challengeId:n}),params:{week:t}})}),{select:function(e){return e.count},enabled:!(!n||!t)})}function b(){return(0,r.useQuery)([d],(function(){return(0,a.r)({url:d})}),{enabled:!!(0,o.r)(),suspense:!0,select:function(e){return e.map((function(e){return e.count}))}})}},6119:function(e,n,t){"use strict";t.d(n,{h:function(){return i}});var i=function(e){return{Authorization:e}}},7511:function(e,n,t){"use strict";t.d(n,{r:function(){return p}});var i=t(4048),r=t(8306),a=t.n(r),o=t(897),l=t(6119),s=t(4609),c=t(7873),u=t(4185),d=function(e,n){var t=e;for(var i in n&&(t+="?"),n)t+="".concat(i,"=").concat(String(n[i]),"&");return"&"===t.at(-1)&&(t=t.slice(0,-1)),t},p=function(){var e=(0,i.Z)(a().mark((function e(n){var t,i,r,p,f,h,g,x,m,b,w,v,y,C,j,I;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.url,i=n.headers,r=void 0===i?(0,l.h)((0,c.r)()):i,p=n.params,f=n.apiVersion,h="indexedDB",g="api-store",x=1,m=1===(void 0===f?1:f)?s._:s.V,!navigator.onLine){e.next=13;break}return e.next=8,m.get(t,{headers:r,params:p});case 8:return b=e.sent,w=b.data,e.abrupt("return",w);case 13:if(!(h in window)){e.next=24;break}return e.next=16,(0,o.X3)(g,x);case 16:return v=e.sent,y=v.transaction("store").objectStore("store"),C=d(t,p),j=u.SHA256(C).toString(),e.next=22,y.get(j).then((function(e){var n=u.AES.decrypt(e.value,"https://dev.kkamjidot.com").toString(u.enc.Utf8);return JSON.parse(n)})).catch((function(){throw new Error("No Data")}));case 22:return I=e.sent,e.abrupt("return",I);case 24:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},4609:function(e,n,t){"use strict";t.d(n,{V:function(){return o},_:function(){return a}});var i=t(8390),r=t.n(i),a=r().create({baseURL:"https://dev.kkamjidot.com/v1"}),o=r().create({baseURL:"https://dev.kkamjidot.com/v2"})},1035:function(e,n,t){"use strict";var i,r,a,o,l=t(3974),s=t(1884),c=t.n(s),u=(t(9953),t(2309)),d=t(2252),p=t(719),f=t(686),h=t(1874);n.Z=function(e){var n=e.challengeId,t=(0,d.s1)({challengeId:n}).data;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(f.Z,{name:"".concat(null===t||void 0===t?void 0:t.title," \ucc4c\ub9b0\uc9c0 : \uae5c\uc9c0")}),t&&(0,h.jsx)(g,{bgImage:t.imageUrl,className:"w-[1036px] h-[140px] rounded-lg bg-black",children:(0,h.jsxs)(x,{children:[(0,h.jsx)(c(),{href:"/challenges/".concat(n),children:(0,h.jsxs)(m,{titleLength:t.title.length,children:[t.title," ",t.chapter,"\uae30"]})}),(0,h.jsx)(b,{children:[t.university,t.department,t.professorName].join(" ")})]})})]})};var g=u.ZP.div.withConfig({displayName:"ChallengeOverview__Container",componentId:"sc-9i9ywy-0"})(["position:relative;width:100%;height:140px;background:linear-gradient(0deg,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(",");background-repeat:no-repeat;background-position:center;background-size:cover;border-radius:8px;",""],(function(e){return e.bgImage}),p.B.medium(i||(i=(0,l.Z)(["\n    width: 100%;\n    height: 130px;\n  "])))),x=u.ZP.div.withConfig({displayName:"ChallengeOverview__Block",componentId:"sc-9i9ywy-1"})(["display:flex;flex-direction:column;align-items:flex-start;padding:0px;gap:8px;position:relative;width:100%;height:63px;left:24px;top:57px;",""],p.B.medium(r||(r=(0,l.Z)(["\n    width: 320px;\n    height: 54px;\n    left: 20px;\n    top: 56px;\n  "])))),m=u.ZP.h1.withConfig({displayName:"ChallengeOverview__Title",componentId:"sc-9i9ywy-2"})(["width:100%;height:38px;font-weight:600;font-size:32px;line-height:38px;cursor:pointer;color:#ffffff;",""],p.B.medium(a||(a=(0,l.Z)(["\n    font-size: ",";\n    line-height: ",";\n  "])),(function(e){return e.titleLength>20?"24px":"20px"}),(function(e){return e.titleLength>20?"29px":"24px"}))),b=u.ZP.div.withConfig({displayName:"ChallengeOverview__Description",componentId:"sc-9i9ywy-3"})(["font-weight:500;font-size:14px;line-height:17px;color:#ffffff;opacity:0.8;",""],p.B.medium(o||(o=(0,l.Z)(["\n    font-size: 14px;\n    line-height: 17px;\n  "]))))},5740:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return Y}});var i,r=t(3974),a=t(1670),o=t(9953),l=t(1035),s=t(2309),c=t(719),u=t(2252),d=t(1874);var p,f,h=function(e){var n=e.challengeId,t=(0,o.useState)(0),i=t[0],r=t[1],a=(0,o.useState)(!1),l=a[0],s=a[1],c=(0,u.s1)({challengeId:n}).data;return(0,o.useEffect)((function(){return window.addEventListener("scroll",(function(){return r(window.pageYOffset)})),s(i>150),function(){window.removeEventListener("scroll",(function(){return r(window.pageYOffset)}))}})),(0,d.jsxs)(g,{fixItem:l,children:["\ud83d\udd25 \uc774\ubc88\uc8fc ",null===c||void 0===c?void 0:c.numberOfChallengerWhoCompleted,"\uba85 \ucc4c\ub9b0\uc9c0 \ubbf8\uc158 \uc644\ub8cc!"]})},g=s.ZP.div.withConfig({displayName:"ChallengeSuccessPeople__Container",componentId:"sc-1gp60e2-0"})(["display:flex;flex-direction:row;justify-content:center;align-items:center;padding:11px 10px;gap:10px;position:",";width:",";height:41px;top:",";background:#000000;border-radius:",";color:#ffffff;font-weight:400;font-size:16px;line-height:19px;z-index:10;",";"],(function(e){return e.fixItem?"fixed":"relative"}),(function(e){return e.fixItem?"100vw":"100%"}),(function(e){return e.fixItem?"60px":"0px"}),(function(e){return e.fixItem?"0px":"8px"}),c.B.medium(i||(i=(0,r.Z)(["\n    width: ",";\n    top: ",";\n\n    font-size: 14px;\n  "])),(function(e){return e.fixItem?"100vw":"100%"}),(function(e){return e.fixItem?"51px":"0px"}))),x=t(1537);function m(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return n.filter(Boolean).join(" ")}var b,w,v,y,C,j,I=function(e){var n=e.openWeeks;return(0,d.jsx)(_,{children:n.weeks.map((function(e){return(0,d.jsx)(k,{status:e.status,className:m("CLOSED"===e.status||"UNREADABLE"===e.status?"bg-[#ebebeb]":"bg-[#b2a4e5] text-white","flex justify-center items-center w-7 h-7 rounded font-semibold cursor-default"),children:e.week},e.week)}))})},_=s.ZP.div.withConfig({displayName:"ChallengeOpenWeekList__Block",componentId:"sc-wax23l-0"})(["display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%;",";"],c.B.medium(p||(p=(0,r.Z)(["\n    display:grid;\n    grid-template-columns: repeat(5, minmax(0, 1fr));\n    gap: 8px;\n  "])))),k=s.ZP.span.withConfig({displayName:"ChallengeOpenWeekList__WeekBox",componentId:"sc-wax23l-1"})(["display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0px;gap:10px;width:42px;height:40px;background:",";border-radius:8px;font-size:16px;color:",";",""],(function(e){return"CLOSED"===e.status?"#F3F4F6":"UNREADABLE"===e.status?"#FEF2F2":"#ecfdf5"}),(function(e){return"CLOSED"===e.status?"#374151":"UNREADABLE"===e.status?"#EF4444":"#047857"}),c.B.medium(f||(f=(0,r.Z)(["\n    width: 32px;\n    height: 32px;\n    \n    border-radius: 6px;\n\n    font-size: 14px;\n  "]))));var E=function(e){var n=e.challengeId,t=(0,u.I2)({challengeId:n}).data,i=(0,u.GH)({challengeId:n}).data,r=(0,u.s1)({challengeId:n}).data,a=function(e){if(!i&&!r)return 0;var n=i.weeks.filter((function(e){return"READABLE"===e.status||"READABLE_CLOSED"===e.status})).length,t=i.weeks.filter((function(e){return"UNREADABLE"===e.status})).length;return"SUCCESS"===e?n:"FAIL"===e?t:r.totalWeeks-n-t};return r?(0,d.jsxs)(z,{children:[(0,d.jsx)(O,{children:"\ub098\uc758 \ucc4c\ub9b0\uc9c0 \ud604\ud669"}),t&&(0,d.jsxs)(S,{children:[(0,d.jsxs)("h3",{className:"flex items-center gap-2 text-lg",children:["\uc885\uac15\uae4c\uc9c0 ",r.totalWeeks-t,"\uc8fc"]}),(0,d.jsx)(x.Z,{completed:t,bgColor:"#4F46E5",height:"28px",borderRadius:"8px",baseBgColor:"#E0E7FF",labelColor:"#ffffff",labelSize:window.innerWidth>700?"14px":"12px",animateOnRender:!0,maxCompleted:r.totalWeeks,customLabel:"\ud604\uc7ac ".concat(t,"\uc8fc\ucc28"),customLabelStyles:{fontWeight:400,paddingRight:"10px"}}),(0,d.jsxs)(N,{color:"#3730a3",children:["\ucd1d ",r.totalWeeks,"\uc8fc"]})]}),i&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(S,{children:[(0,d.jsx)("h3",{className:"flex items-center gap-2 text-lg",children:"\ubbf8\uc158 \ub2ec\uc131\ub960"}),(0,d.jsx)(x.Z,{completed:a("SUCCESS"),bgColor:"#059669",height:"28px",borderRadius:"8px",baseBgColor:"#ECFDF5",labelColor:"#ffffff",labelSize:window.innerWidth>700?"14px":"12px",animateOnRender:!0,maxCompleted:r.totalWeeks,customLabel:"".concat(a("SUCCESS"),"\ud68c (").concat(Math.floor(a("SUCCESS")/(null===i||void 0===i?void 0:i.totalWeeks)*100),"%)"),customLabelStyles:{fontWeight:400,paddingRight:"10px"}}),(0,d.jsxs)(N,{color:"#15803D",children:[r.totalWeeks,"\ud68c"]})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)("h3",{children:"\uc8fc\ucc28\ubcc4 \ubbf8\uc158"}),(0,d.jsx)(I,{openWeeks:i})]})]}),i&&t&&(0,d.jsxs)(Z,{children:[(0,d.jsxs)(B,{mission:"SUCCESS",children:[(0,d.jsx)("span",{children:"\ubbf8\uc158 \uc131\uacf5"}),(0,d.jsx)("span",{className:"text-lg font-semibold",children:a("SUCCESS")})]}),(0,d.jsxs)(B,{mission:"FAIL",children:[(0,d.jsx)("span",{children:"\ubbf8\uc158 \uc2e4\ud328"}),(0,d.jsx)("span",{className:"text-lg font-semibold",children:a("FAIL")})]}),(0,d.jsxs)(B,{mission:"REMAIN",children:[(0,d.jsx)("span",{children:"\ub0a8\uc740 \ubbf8\uc158"}),(0,d.jsx)("span",{className:"text-lg font-semibold",children:a("REMAIN")})]})]})]}):(0,d.jsx)(d.Fragment,{})},z=s.ZP.div.withConfig({displayName:"ChallengeProgressContainer__Container",componentId:"sc-qhhul6-0"})(["display:flex;flex-direction:column;align-items:center;gap:30px;padding:20px 24px;position:relative;width:100%;height:473px;left:0px;background:#ffffff;box-shadow:0px 1px 2px rgba(0,0,0,0.05);border-radius:8px;",""],c.B.medium(b||(b=(0,r.Z)(["\n    height: 533px;\n  "])))),O=s.ZP.h2.withConfig({displayName:"ChallengeProgressContainer__Title",componentId:"sc-qhhul6-1"})(["position:relative;width:100%;font-weight:700;font-size:20px;line-height:24px;color:#111827;"]),S=s.ZP.div.withConfig({displayName:"ChallengeProgressContainer__Block",componentId:"sc-qhhul6-2"})(["display:flex;flex-direction:column;gap:8px;width:90%;height:53px;h3{font-size:14px;font-weight:600;}",""],c.B.medium(w||(w=(0,r.Z)(["\n    width: 100%;\n  "])))),N=s.ZP.span.withConfig({displayName:"ChallengeProgressContainer__ProgressEndLabel",componentId:"sc-qhhul6-3"})(["position:relative;display:flex;align-items:center;justify-content:end;width:100%;right:10px;bottom:33px;color:",";font-size:14px;",""],(function(e){return e.color}),c.B.medium(v||(v=(0,r.Z)(["\n    font-size: 12px;\n    bottom: 31px;\n   "])))),P=(0,s.ZP)(S).withConfig({displayName:"ChallengeProgressContainer__MissionBlock",componentId:"sc-qhhul6-4"})(["",""],c.B.medium(y||(y=(0,r.Z)(["\n    height: 137px;\n   "])))),Z=s.ZP.div.withConfig({displayName:"ChallengeProgressContainer__BorderBox",componentId:"sc-qhhul6-5"})(["display:flex;align-items:center;justify-content:center;gap:27px;width:90%;height:124px;border:1px solid #f3f4f6;border-radius:8px;",""],c.B.medium(C||(C=(0,r.Z)(["\n    width: 100%;\n    height: 136px;\n  "])))),B=s.ZP.div.withConfig({displayName:"ChallengeProgressContainer__Card",componentId:"sc-qhhul6-6"})(["display:flex;flex-direction:column;align-items:center;gap:10px;span{&:first-child{font-size:12px;}&:last-child{display:flex;flex-direction:column;justify-content:center;align-items:center;width:62px;height:62px;background:",";border-radius:8px;font-weight:600;font-size:32px;line-height:38px;color:",";","}}"],(function(e){return"SUCCESS"===e.mission?"#ecfdf5":"FAIL"===e.mission?"#FEF2F2":"#F3F4F6"}),(function(e){return"SUCCESS"===e.mission?"#047857":"FAIL"===e.mission?"#EF4444":"#4B5563"}),c.B.medium(j||(j=(0,r.Z)(["\n        width: 50px;\n        height: 50px;\n\n        font-size: 26px;\n    "])))),L=t(1884),A=t.n(L),D=t(8647);var R,q=function(e){var n=e.title,t=e.page,i=e.challengeId,r=(0,D.nx)({challengeId:i,page:t}).data,a=function(e){var n="/challenges/".concat(i,"/quizzes");switch(t){case"READABLE":return n+"".concat(e?"/".concat(e):"");case"MY":return n+"".concat(e?"/".concat(e):"","/my");case"LIKED":return n+"".concat(e?"/".concat(e):"","/like")}},o=function(e){var n=new Date(e),t=n.toLocaleString("en-US",{month:"short"}),i=n.getDate(),r=n.getFullYear(),a=n.getHours(),o=n.getMinutes();return"".concat(t," ").concat(i,", ").concat(r," ").concat(a,":").concat(o)};return(0,d.jsxs)(F,{children:[(0,d.jsxs)(W,{children:[" ",n]}),(0,d.jsx)("ul",{children:null===r||void 0===r?void 0:r.slice(0,5).map((function(e){return(0,d.jsx)(A(),{href:a(e.quizId),children:(0,d.jsxs)(T,{children:[(0,d.jsx)("a",{children:e.quizTitle}),(0,d.jsxs)("div",{children:[(0,d.jsx)("span",{children:e.writerName}),(0,d.jsx)("span",{children:o(e.quizCreatedDate)})]})]})},e.quizId)}))}),(0,d.jsx)(A(),{href:a(),children:(0,d.jsx)(U,{type:"button",children:"\ub354\ubcf4\uae30"})})]})},F=s.ZP.div.withConfig({displayName:"ChallengeQuizSummary__Container",componentId:"sc-10pw37e-0"})(["display:flex;flex-direction:column;gap:20px;padding:20px 24px;height:530px;background:#ffffff;box-shadow:0px 1px 2px rgba(0,0,0,0.05);border-radius:8px;"]),W=s.ZP.h2.withConfig({displayName:"ChallengeQuizSummary__Title",componentId:"sc-10pw37e-1"})(["position:relative;width:100%;font-weight:700;font-size:20px;line-height:24px;color:#111827;"]),T=s.ZP.li.withConfig({displayName:"ChallengeQuizSummary__Li",componentId:"sc-10pw37e-2"})(["display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:8px 0px;gap:8px;width:100%;height:79px;border-top:1px solid #f4f4f5;cursor:pointer;a{font-weight:600;font-size:14px;line-height:17px;color:#111827;&:hover{text-decoration:underline;}}div{display:flex;flex-direction:row;gap:12px;span{font-weight:400;font-size:12px;line-height:14px;&:first-child{color:#374151;}&:last-child{color:#9ca3af;}}}"]),U=s.ZP.button.withConfig({displayName:"ChallengeQuizSummary__Button",componentId:"sc-10pw37e-3"})(["display:flex;flex-direction:row;justify-content:center;align-items:center;padding:10px 24px;gap:10px;width:100%;height:36px;background:#f3f4f6;border-radius:8px;font-weight:600;font-size:12px;line-height:16px;color:#4b5563;cursor:pointer;&:hover{background:#e5e7eb;}"]);var Q,V,M=function(e){var n=e.challengeId,t=(0,u.GH)({challengeId:n}).data;return(0,d.jsxs)(H,{children:[t&&(0,d.jsx)(q,{challengeId:n,title:"\uc804\uccb4 \ubb38\uc81c",page:"READABLE"}),(0,d.jsx)(q,{challengeId:n,title:"\uc81c\ucd9c\ud55c \ubb38\uc81c",page:"MY"}),(0,d.jsx)(q,{challengeId:n,title:"\uc88b\uc544\uc694\ud55c \ubb38\uc81c",page:"LIKED"})]})},H=s.ZP.div.withConfig({displayName:"ChallengeQuizSummaryContainer__Container",componentId:"sc-fpo6ou-0"})(["display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:0px;width:100%;height:530px;",""],c.B.medium(R||(R=(0,r.Z)(["\n    display:flex;\n    flex-direction: column;\n    height: 1590px;\n  "]))));var Y=function(){var e=(0,a.useRouter)(),n=String(e.query.cid);return(0,d.jsx)(G,{children:(0,d.jsx)(J,{children:n&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.Z,{challengeId:n}),(0,d.jsx)(h,{challengeId:n}),(0,d.jsx)(E,{challengeId:n}),(0,d.jsx)(M,{challengeId:n}),(0,d.jsx)(A(),{href:"/challenges/".concat(n,"/write"),children:(0,d.jsx)(K,{type:"button",children:"\ubb38\uc81c \uc81c\ucd9c\ud558\uae30"})})]})})})},G=s.ZP.div.withConfig({displayName:"cid__Background",componentId:"sc-24em3v-0"})(["background-color:#f8fafc;"]),J=s.ZP.div.withConfig({displayName:"cid__Frame",componentId:"sc-24em3v-1"})(["box-sizing:border-box;display:flex;flex-direction:column;gap:16px;align-items:center;justify-content:center;padding:80px 0px;width:1040px;margin:0 auto;background-color:#f8fafc;",""],c.B.medium(Q||(Q=(0,r.Z)(["\n    width: 100%;\n    padding: 88px 12px;\n  "])))),K=s.ZP.button.withConfig({displayName:"cid__Button",componentId:"sc-24em3v-2"})(["display:flex;flex-direction:row;justify-content:center;align-items:center;padding:16px;gap:10px;position:fixed;width:862px;height:48px;bottom:24px;left:50%;transform:translate(-50%);background:#4f46e5;box-shadow:0px 4px 6px rgba(79,70,229,0.2);border-radius:12px;font-weight:600;font-size:16px;line-height:16px;color:#ffffff;cursor:pointer;&:hover{background:#4338ca;}",""],c.B.medium(V||(V=(0,r.Z)(["\n    width: 90%;\n    height: 48px;\n    bottom: 16px;\n  "]))))},5362:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/challenges/[cid]",function(){return t(5740)}])},6178:function(e,n,t){"use strict";var i=t(4730);function r(){}function a(){}a.resetWarningCache=r,e.exports=function(){function e(e,n,t,r,a,o){if(o!==i){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function n(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:a,resetWarningCache:r};return t.PropTypes=t,t}},7225:function(e,n,t){e.exports=t(6178)()},4730:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},5241:function(){}},function(e){e.O(0,[390,185,774,888,179],(function(){return n=5362,e(e.s=n);var n}));var n=e.O();_N_E=n}]);