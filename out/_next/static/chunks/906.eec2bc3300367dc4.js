"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[906],{8647:function(e,n,t){t.d(n,{BB:function(){return g},Fb:function(){return h},V1:function(){return j},nx:function(){return x},J1:function(){return z}});var i=t(1335),r=t(1193),c=t(7511),o=t(7873),s=function(e){var n=e.quizId;return"/quizzes/".concat(n,"/content")},u=function(e){var n=e.quizId;return"/my/quizzes/".concat(n)},a=function(e){var n=e.challengeId;switch(e.page){case"READABLE":return"/challenges/".concat(n,"/quizzes");case"MY":return"/challenges/".concat(n,"/my/quizzes");case"LIKED":return"/challenges/".concat(n,"/my-good-quizzes")}},l=function(e){var n=e.challengeId;return"/challenges/".concat(n,"/my/quizzes/count")},d="/my/quizzes/count";function f(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?f(Object(t),!0).forEach((function(n){(0,i.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function h(e){var n=e.quizId;return(0,r.useQuery)([s({quizId:n})],(function(){return(0,c.r)({url:s({quizId:n})})}),{enabled:!!n,onError:function(e){}})}function g(e){var n=e.quizId,t=e.successHandler;return(0,r.useQuery)([u({quizId:n})],(function(){return(0,c.r)({url:u({quizId:n})})}),{select:function(e){return p(p({},e),{},{quizRubric:JSON.parse(e.quizRubric)})},enabled:!!n,onSuccess:function(e){t&&t(e)}})}function x(e){var n=e.challengeId,t=e.page,i=e.suspense,o=void 0!==i&&i,s=[a({challengeId:n,page:t})],u={enabled:!0,suspense:o,select:function(e){return e.sort((function(e,n){return+new Date(n.quizCreatedDate)-+new Date(e.quizCreatedDate)}))}};return(0,r.useQuery)(s,(function(){return(0,c.r)({url:a({challengeId:n,page:t})})}),u)}function z(e){var n=e.challengeId,t=e.week;return(0,r.useQuery)([l({challengeId:n})],(function(){return(0,c.r)({url:l({challengeId:n}),params:{week:t}})}),{select:function(e){return e.count},enabled:!(!n||!t)})}function j(){return(0,r.useQuery)([d],(function(){return(0,c.r)({url:d})}),{enabled:!!(0,o.r)(),suspense:!0,select:function(e){return e.map((function(e){return e.count}))}})}},1906:function(e,n,t){t.r(n),t.d(n,{default:function(){return k}});var i=t(9953),r=t(8647),c=t(7297),o=t(4082),s=t(2309),u=t(1013),a=t(1670),l=t(1175),d=t(934),f=t(1874);var p=function(e){var n=e.quizListLength,t=(0,c.FV)(l.O),r=(0,d.Z)(t,2),o=r[0],s=r[1],a=Math.ceil(n/10),p=(0,i.useState)(0),z=p[0],j=p[1];(0,i.useEffect)((function(){o%10!==0&&(o+1)%10!==0||j(Math.floor(o/10))}),[o]);var m=function(e){switch(e.direction){case"prev":o>0&&s((function(e){return e-1}));break;case"next":o<a&&s((function(e){return e+1}))}};return(0,f.jsxs)(h,{children:[(0,f.jsx)(g,{disabled:o<=0,isDisabled:o<=0,onClick:function(){return m({direction:"prev"})},children:(0,f.jsx)(u.JO,{icon:"zondicons:cheveron-left",color:o<=0?"#E5E7EB":"#9CA3AF"})}),Array.from({length:a},(function(e,n){return n})).slice(10*z,10*z+10).map((function(e,n){return(0,f.jsx)(x,{onClick:function(){return function(e){var n=e.page;s(n)}({page:e})},isCurrentPage:o===e,children:e+1},n)})),(0,f.jsx)(g,{disabled:o>=a-1,isDisabled:o>=a-1,onClick:function(){return m({direction:"next"})},children:(0,f.jsx)(u.JO,{icon:"zondicons:cheveron-right",color:o>=a-1?"#E5E7EB":"#9CA3AF"})})]})},h=s.ZP.div.withConfig({displayName:"QuizListPagination__Container",componentId:"sc-15m2ozz-0"})(["display:flex;gap:8px;justify-content:center;align-items:center;"]),g=s.ZP.button.withConfig({displayName:"QuizListPagination__ArrowButton",componentId:"sc-15m2ozz-1"})(["display:flex;justify-content:center;align-items:center;width:20px;height:20px;border-radius:4px;cursor:",";&:hover{background:",";}"],(function(e){return e.isDisabled?"default":"pointer"}),(function(e){return e.isDisabled?"#ffffff":"#f3f4f6"})),x=s.ZP.button.withConfig({displayName:"QuizListPagination__Button",componentId:"sc-15m2ozz-2"})(["box-sizing:border-box;display:flex;flex-direction:row;justify-content:center;align-items:center;padding:8px 10px;gap:10px;width:34px;height:34px;background:",";border:1px solid #e5e7eb;border-radius:4px;font-weight:700;font-size:14px;line-height:17px;color:",";&:hover{background:",";}"],(function(e){return e.isCurrentPage?"#ffffff":"#F9FAFB"}),(function(e){return e.isCurrentPage?"#4f46e5":"#9CA3AF"}),(function(e){return e.isCurrentPage?"#ffffff":"#F3F4F6"}));var z=function(e){var n,t=e.challengeId,i=e.page,r=e.quizzes,o=(0,a.useRouter)(),s=(0,c.sJ)(l.O),d=function(e){o.push(function(e){var n="/challenges/".concat(t,"/quizzes/").concat(e);switch(i){case"MY":return"".concat(n,"/my");case"LIKED":return"".concat(n,"/like");case"READABLE":return"".concat(n)}}(e))};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("table",{children:[(0,f.jsx)("thead",{children:(0,f.jsxs)(j,{children:[(0,f.jsx)(m,{children:"\ubc88\ud638"}),(0,f.jsx)(m,{widthPixel:516,textAlign:"left",children:"\uc81c\ubaa9"}),(0,f.jsx)(m,{children:"\uc791\uc131\uc790"}),(0,f.jsx)(m,{children:"\ubb38\uc81c \ud480\ub9b0 \ud69f\uc218"}),(0,f.jsx)(m,{children:"\uc8fc\ucc28"}),(0,f.jsx)(m,{children:"\uc88b\uc544\uc694"}),(0,f.jsx)(m,{children:"\ud574\uacb0"})]})}),(0,f.jsx)("tbody",{children:null===r||void 0===r||null===(n=r.slice(10*s,10*s+10))||void 0===n?void 0:n.map((function(e){return(0,f.jsxs)(j,{onClick:function(){return d(e.quizId)},children:[(0,f.jsx)(y,{children:e.quizId}),(0,f.jsx)(y,{textAlign:"left",children:e.quizTitle}),(0,f.jsx)(y,{children:e.writerName}),(0,f.jsxs)(y,{children:[e.cntOfSolved,"\ud68c"]}),(0,f.jsxs)(y,{children:[e.quizWeek,"\uc8fc"]}),(0,f.jsx)(y,{children:(0,f.jsxs)(b,{children:[(0,f.jsx)(u.JO,{icon:"icon-park-solid:good-two",color:"#6B7280"}),(0,f.jsx)("span",{children:e.cntOfGood?e.cntOfGood:0})]})}),e.isSolved?(0,f.jsx)(y,{children:(0,f.jsx)(u.JO,{icon:"heroicons-solid:badge-check",height:22,style:{display:"inline",color:"#6366f1"}})}):(0,f.jsx)(y,{children:(0,f.jsx)(u.JO,{icon:"heroicons-solid:badge-check",height:22,style:{display:"inline",color:"#E5E7EB"}})})]},e.quizId)}))})]}),(0,f.jsx)(p,{quizListLength:r.length})]})},j=s.ZP.tr.withConfig({displayName:"QuizListLarge__Tr",componentId:"sc-1vmen4r-0"})(["&:hover > td{background:#f9fafb;}"]),m=s.ZP.th.withConfig({displayName:"QuizListLarge__Th",componentId:"sc-1vmen4r-1"})(["background:#f3f4f6;box-shadow:inset 0px -1px 0px rgba(0,0,0,0.05);width:",";padding:12px 16px;text-align:",";font-weight:600;font-size:14px;line-height:115%;color:#111827;"],(function(e){return"".concat(e.widthPixel,"px")}),(function(e){return"left"===e.textAlign?"left":"center"})),y=s.ZP.td.withConfig({displayName:"QuizListLarge__Td",componentId:"sc-1vmen4r-2"})(["background:#ffffff;text-align:",";padding:16px;font-size:14px;cursor:pointer;"],(function(e){return"left"===e.textAlign?"left":"center"})),b=s.ZP.span.withConfig({displayName:"QuizListLarge__IconSpan",componentId:"sc-1vmen4r-3"})(["display:flex;gap:3px;align-items:center;justify-content:center;"]),w=t(6832),v=t(1884),E=t.n(v);var I=function(e){var n=e.challengeId,t=e.page,r=e.quizzes,c={SEEMORE:"\ub354\ubcf4\uae30",CLOSE:"\uc811\uae30"};Object.freeze(c);var o=(0,i.useState)(5),s=o[0],a=o[1],l=(0,i.useState)(c.SEEMORE),d=l[0],p=l[1],h=function(e){var i="/challenges/".concat(n,"/quizzes");switch(t){case"READABLE":return i+"".concat("/".concat(e));case"MY":return i+"".concat("/".concat(e),"/my");case"LIKED":return i+"".concat("/".concat(e),"/like")}};return(0,i.useEffect)((function(){var e=r.length;s<e?p(c.SEEMORE):s>=e&&p(c.CLOSE)}),[c.CLOSE,c.SEEMORE,s,r.length]),(0,f.jsxs)(O,{children:[(0,f.jsx)("ul",{children:null===r||void 0===r?void 0:r.slice(0,s).map((function(e){return(0,f.jsx)(E(),{href:h(e.quizId),children:(0,f.jsxs)(C,{children:[(0,f.jsx)("a",{children:e.quizTitle}),(0,f.jsxs)("div",{children:[(0,f.jsx)("span",{children:e.writerName}),(0,f.jsx)("span",{children:(0,f.jsxs)(L,{children:[(0,f.jsx)(u.JO,{icon:"icon-park-solid:good-two",color:"#6B7280"}),(0,f.jsx)("span",{children:e.cntOfGood?e.cntOfGood:0})]})}),(0,f.jsx)("span",{children:e.isSolved?(0,f.jsx)(u.JO,{icon:"heroicons-solid:badge-check",height:16,style:{display:"inline",color:"#6366f1"}}):(0,f.jsx)(u.JO,{icon:"heroicons-solid:badge-check",height:16,style:{display:"inline",color:"#E5E7EB"}})})]})]})},e.quizId)}))}),(0,f.jsx)(q,{type:"button",onClick:function(){var e=r.length;s<e?(a((function(e){return e+5})),p(c.SEEMORE)):s>=e&&(a((function(e){return e-5})),p(c.CLOSE))},children:d})]})},O=s.ZP.div.withConfig({displayName:"QuizListMedium__Container",componentId:"sc-1ctol07-0"})(["display:flex;flex-direction:column;gap:24px;"]),C=s.ZP.li.withConfig({displayName:"QuizListMedium__Li",componentId:"sc-1ctol07-1"})(["display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:8px 0px;gap:8px;width:100%;height:79px;border-top:1px solid #f4f4f5;cursor:pointer;a{font-weight:600;font-size:14px;line-height:17px;color:#111827;&:hover{text-decoration:underline;}}div{display:flex;flex-direction:row;gap:12px;span{font-weight:400;font-size:12px;line-height:14px;&:first-child{color:#374151;}&:last-child{color:#9ca3af;}}}"]),q=s.ZP.button.withConfig({displayName:"QuizListMedium__Button",componentId:"sc-1ctol07-2"})(["display:flex;flex-direction:row;justify-content:center;align-items:center;padding:10px 24px;gap:10px;width:100%;height:36px;background:#f3f4f6;border-radius:8px;font-weight:600;font-size:12px;line-height:16px;color:#4b5563;cursor:pointer;&:hover{background:#e5e7eb;}"]),L=s.ZP.span.withConfig({displayName:"QuizListMedium__IconSpan",componentId:"sc-1ctol07-3"})(["display:flex;gap:3px;align-items:center;justify-content:center;"]);var k=function(e){var n=e.challengeId,t=e.week,s=e.page,u=(0,c.sJ)(o.T),a=(0,i.useState)(),l=a[0],d=a[1],p=(0,i.useState)(),h=p[0],g=p[1],x=(0,r.nx)({challengeId:n,page:s,week:t,suspense:!0}).data;(0,i.useEffect)((function(){if(x){var e=x.filter((function(e){return u[e.quizWeek-1]}));d(e)}}),[x,u]);var j=(0,w.debounce)((function(){g(window.innerWidth)}),500);return(0,i.useEffect)((function(){return g(window.innerWidth),window.addEventListener("resize",j),function(){window.removeEventListener("resize",j)}}),[]),(0,f.jsxs)(_,{children:[(0,f.jsx)(P,{children:function(){switch(s){case"MY":return"\uc81c\ucd9c\ud55c \ubb38\uc81c";case"LIKED":return"\uc88b\uc544\uc694\ud55c \ubb38\uc81c";case"READABLE":return"\uc804\uccb4 \ubb38\uc81c"}}()}),l&&l.length>0?(0,f.jsx)(f.Fragment,{children:h&&h>1039?(0,f.jsx)(z,{quizzes:l,page:s,challengeId:n}):(0,f.jsx)(I,{quizzes:l,page:s,challengeId:n})}):(0,f.jsx)(S,{children:"\ubb38\uc81c\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."})]})},_=s.ZP.div.withConfig({displayName:"QuizListContainer__Container",componentId:"sc-6seuuq-0"})(["display:flex;flex-direction:column;gap:20px;"]),P=s.ZP.h2.withConfig({displayName:"QuizListContainer__Title",componentId:"sc-6seuuq-1"})(["font-weight:700;font-size:20px;line-height:24px;color:#111827;"]),S=s.ZP.div.withConfig({displayName:"QuizListContainer__EmptyBox",componentId:"sc-6seuuq-2"})(["display:flex;justify-content:center;align-items:center;padding:100px 0px;font-size:14px;color:gray;"])}}]);