(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8647:function(n,e,i){"use strict";i.d(e,{BB:function(){return h},Fb:function(){return u},V1:function(){return j},nx:function(){return g},J1:function(){return m}});var t=i(1335),o=i(1193),r=i(7511),s=i(7873),a=function(n){var e=n.quizId;return"/quizzes/".concat(e,"/content")},c=function(n){var e=n.quizId;return"/my/quizzes/".concat(e)},l=function(n){var e=n.challengeId;switch(n.page){case"READABLE":return"/challenges/".concat(e,"/quizzes");case"MY":return"/challenges/".concat(e,"/my/quizzes");case"LIKED":return"/challenges/".concat(e,"/my-good-quizzes")}},d=function(n){var e=n.challengeId;return"/challenges/".concat(e,"/my/quizzes/count")},p="/my/quizzes/count";function f(n,e){var i=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.push.apply(i,t)}return i}function x(n){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?f(Object(i),!0).forEach((function(e){(0,t.Z)(n,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(i)):f(Object(i)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(i,e))}))}return n}function u(n){var e=n.quizId;return(0,o.useQuery)([a({quizId:e})],(function(){return(0,r.r)({url:a({quizId:e})})}),{enabled:!!e,onError:function(n){}})}function h(n){var e=n.quizId,i=n.successHandler;return(0,o.useQuery)([c({quizId:e})],(function(){return(0,r.r)({url:c({quizId:e})})}),{select:function(n){return x(x({},n),{},{quizRubric:JSON.parse(n.quizRubric)})},enabled:!!e,onSuccess:function(n){i&&i(n)}})}function g(n){var e=n.challengeId,i=n.page,t=n.suspense,s=void 0!==t&&t,a=[l({challengeId:e,page:i})],c={enabled:!0,suspense:s,select:function(n){return n.sort((function(n,e){return+new Date(e.quizCreatedDate)-+new Date(n.quizCreatedDate)}))}};return(0,o.useQuery)(a,(function(){return(0,r.r)({url:l({challengeId:e,page:i})})}),c)}function m(n){var e=n.challengeId,i=n.week;return(0,o.useQuery)([d({challengeId:e})],(function(){return(0,r.r)({url:d({challengeId:e}),params:{week:i}})}),{select:function(n){return n.count},enabled:!(!e||!i)})}function j(){return(0,o.useQuery)([p],(function(){return(0,r.r)({url:p})}),{enabled:!!(0,s.r)(),suspense:!0,select:function(n){return n.map((function(n){return n.count}))}})}},6119:function(n,e,i){"use strict";i.d(e,{h:function(){return t}});var t=function(n){return{Authorization:n}}},7511:function(n,e,i){"use strict";i.d(e,{r:function(){return f}});var t=i(4048),o=i(8306),r=i.n(o),s=i(897),a=i(6119),c=i(4609),l=i(7873),d=i(4185),p=function(n,e){var i=n;for(var t in e&&(i+="?"),e)i+="".concat(t,"=").concat(String(e[t]),"&");return"&"===i.at(-1)&&(i=i.slice(0,-1)),i},f=function(){var n=(0,t.Z)(r().mark((function n(e){var i,t,o,f,x,u,h,g,m,j,y,w,b,v,_,C;return r().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(i=e.url,t=e.headers,o=void 0===t?(0,a.h)((0,l.r)()):t,f=e.params,x=e.apiVersion,u="indexedDB",h="api-store",g=1,m=1===(void 0===x?1:x)?c._:c.V,!navigator.onLine){n.next=13;break}return n.next=8,m.get(i,{headers:o,params:f});case 8:return j=n.sent,y=j.data,n.abrupt("return",y);case 13:if(!(u in window)){n.next=24;break}return n.next=16,(0,s.X3)(h,g);case 16:return w=n.sent,b=w.transaction("store").objectStore("store"),v=p(i,f),_=d.SHA256(v).toString(),n.next=22,b.get(_).then((function(n){var e=d.AES.decrypt(n.value,"https://dev.kkamjidot.com").toString(d.enc.Utf8);return JSON.parse(e)})).catch((function(){throw new Error("No Data")}));case 22:return C=n.sent,n.abrupt("return",C);case 24:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},4609:function(n,e,i){"use strict";i.d(e,{V:function(){return s},_:function(){return r}});var t=i(8390),o=i.n(t),r=o().create({baseURL:"https://dev.kkamjidot.com/v1"}),s=o().create({baseURL:"https://dev.kkamjidot.com/v2"})},5096:function(n,e,i){"use strict";var t=i(9953),o=i(1874);e.Z=function(n){var e=n.children,i=(0,t.useState)(!1),r=i[0],s=i[1];return(0,t.useEffect)((function(){var n=setTimeout((function(){s(!0)}),300);return function(){return clearTimeout(n)}}),[]),r?(0,o.jsx)(o.Fragment,{children:e}):null}},9115:function(n,e,i){"use strict";i.r(e),i.d(e,{default:function(){return te}});var t,o,r,s,a=i(9953),c=i(7873),l=i(3974),d=i(9381),p=i.n(d),f=i(2309),x=i(719),u=i(686),h=i(9446),g=(i(6298),i(1874));var m,j,y,w=function(){return(0,g.jsxs)(b,{children:[(0,g.jsxs)(v,{children:[(0,g.jsx)(h.Z,{className:"img-box"}),(0,g.jsx)(h.Z,{count:2,className:"info-box"})]}),(0,g.jsxs)(v,{children:[(0,g.jsx)(h.Z,{className:"img-box"}),(0,g.jsx)(h.Z,{count:2,className:"info-box"})]}),(0,g.jsxs)(v,{children:[(0,g.jsx)(h.Z,{className:"img-box"}),(0,g.jsx)(h.Z,{count:2,className:"info-box"})]})]})},b=f.ZP.div.withConfig({displayName:"ChallengeListSkeleton__Container",componentId:"sc-1mwa0bv-0"})(["display:flex;flex-direction:row;gap:10px;width:100%;",""],x.B.medium(t||(t=(0,l.Z)(["\n    flex-direction: column;    \n    gap: 0px;\n  "])))),v=f.ZP.div.withConfig({displayName:"ChallengeListSkeleton__Block",componentId:"sc-1mwa0bv-1"})(["display:flex;flex-direction:column;gap:10px;width:100%;"," .img-box{display:block;width:100%;height:180px;","}.info-box{display:block;width:100%;","}"],x.B.medium(o||(o=(0,l.Z)(["\n    gap: 2px;\n  "]))),x.B.medium(r||(r=(0,l.Z)(["\n      display: none;\n    "]))),x.B.medium(s||(s=(0,l.Z)(["\n    "])))),_=i(5096),C=i(1013),Z=i(1193),k=i(7511),I="/my/point";var P=function(){var n=(0,a.useState)(!1),e=n[0],i=n[1],t=(0,a.useState)(!1),o=t[0],r=t[1],s=(0,Z.useQuery)([I],(function(){return(0,k.r)({url:I})}),{select:function(n){return n.point}}).data;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(z,{children:[(0,g.jsx)("span",{children:"\ub0b4 \ud3ec\uc778\ud2b8"}),(0,g.jsxs)(B,{children:[(0,g.jsx)("span",{children:null===s||void 0===s?void 0:s.toLocaleString()}),(0,g.jsx)(N,{children:(0,g.jsx)(C.JO,{icon:"heroicons:information-circle-20-solid",onMouseOver:function(){return i(!0)},onMouseOut:function(){return i(!1)},onClick:function(){return r((function(n){return!n}))}})})]})]}),(e||o)&&(0,g.jsxs)(S,{children:[(0,g.jsx)(q,{}),(0,g.jsxs)(O,{children:["\ub0b4 \ubb38\uc81c\uac00 \ud480\ub838\uc744 \ub54c \uc313\uc774\ub294 \ud3ec\uc778\ud2b8\uc785\ub2c8\ub2e4. ",(0,g.jsx)("br",{}),"\ud3ec\uc778\ud2b8 \uc0ac\uc6a9\uc740 \uc11c\ud3ec\ud130\uc988\uc5d0\uac8c \ubb38\uc758\ud574\uc8fc\uc138\uc694."]})]})]})},z=f.ZP.div.withConfig({displayName:"MyPointBlock__Container",componentId:"sc-kh06b5-0"})(["display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding:10px 12px 10px 16px;gap:10px;position:absolute;width:180px;margin:10px 24px;background:#10b981;border-radius:6px;font-weight:600;font-size:14px;line-height:17px;color:#ffffff;",""],x.B.medium(m||(m=(0,l.Z)(["\n    position: relative;\n    top: 0px;\n    right: 0px;\n\n    width: 100%;\n    margin: 0;\n\n    border-radius: 0px 0px 8px 8px;\n  "])))),B=f.ZP.span.withConfig({displayName:"MyPointBlock__RowBox",componentId:"sc-kh06b5-1"})(["display:flex;align-items:center;gap:5px;z-index:10;"]),N=f.ZP.span.withConfig({displayName:"MyPointBlock__InfoIcon",componentId:"sc-kh06b5-2"})(["cursor:pointer;"]),S=f.ZP.div.withConfig({displayName:"MyPointBlock__TooltipBlock",componentId:"sc-kh06b5-3"})(["display:flex;flex-direction:column;align-items:flex-end;position:absolute;"]),q=f.ZP.span.withConfig({displayName:"MyPointBlock__TooltipTail",componentId:"sc-kh06b5-4"})(["position:relative;width:8px;height:8px;top:52px;right:38px;"," transform:rotate(45deg);background:rgba(0,0,0);"],x.B.medium(j||(j=(0,l.Z)(["\n    top: 74px;\n    right: 16px;\n  "])))),O=f.ZP.span.withConfig({displayName:"MyPointBlock__Tooltip",componentId:"sc-kh06b5-5"})(["display:flex;justify-content:center;align-items:center;position:relative;width:243px;height:58px;top:48px;right:24px;"," font-weight:400;font-size:12px;line-height:15px;text-align:center;background:rgba(0,0,0);border-radius:6px;color:#ffffff;"],x.B.medium(y||(y=(0,l.Z)(["\n    top: 68px;\n    right: 0px;\n  "])))),E=i(1751),A=i(4710),F=i(8647);A.kL.register(A.uw,A.f$,A.od,A.jn);var T=function(){var n=(0,a.useState)(),e=n[0],i=n[1],t=(0,a.useState)(),o=t[0],r=t[1],s=(0,F.V1)().data;return(0,a.useEffect)((function(){if(s){for(var n=Array(15).fill(0).map((function(n,e){return e+1==s.length?{width:2,color:"#A5B4FC"}:{width:0,color:"#F9FAFB"}})),e=0,t=Array(),o=0;o<s.length;o++)e+=s[o],t.push(e);i({labels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],datasets:[{label:"Dataset",data:t,borderColor:"black",fill:!1,stepped:!0,backgroundColor:"#F9FAFB"}]}),r({responsive:!0,maintainAspectRatio:!1,scales:{yAxes:{ticks:{color:["#9CA3AF"]},grid:{color:["#E5E7EB"]}},xAxes:{ticks:{color:["#9CA3AF"]},grid:{display:!0,lineWidth:null===n||void 0===n?void 0:n.map((function(n){return n.width})),color:null===n||void 0===n?void 0:n.map((function(n){return n.color}))}}},plugins:{title:{display:!0,text:"\ubb38\uc81c \uc81c\ucd9c \ud604\ud669"}},elements:{line:{borderWidth:2}}})}}),[s]),(0,g.jsxs)(g.Fragment,{children:[" ",(0,g.jsx)(D,{children:"\ubb38\uc81c \uc81c\ucd9c \uc218"}),e&&o&&(0,g.jsx)(E.x1,{data:e,options:o}),(0,g.jsx)(M,{children:"\uc8fc\ucc28"})]})},M=f.ZP.div.withConfig({displayName:"MissionStackedCountChart__Label",componentId:"sc-1tkp47u-0"})(["font-weight:400;font-size:10px;line-height:12px;text-align:center;color:#9ca3af;"]),D=(0,f.ZP)(M).withConfig({displayName:"MissionStackedCountChart__YLabel",componentId:"sc-1tkp47u-1"})(["display:flex;align-items:flex-start;width:100%;"]),L=i(4270);var R,Q=function(){return(0,g.jsx)(G,{children:(0,g.jsx)(L.g4,{height:"80",width:"80",radius:"9",color:"#adadad",ariaLabel:"three-dots-loading",visible:!0})})},G=f.ZP.div.withConfig({displayName:"ThreeDotsSkeleton__Container",componentId:"sc-1h7r2il-0"})(["display:flex;justify-content:center;align-items:center;width:100%;height:100%;"]);var V,H,J,U=function(){return(0,g.jsxs)(X,{children:[(0,g.jsx)(W,{children:"\ub0b4 \ubb38\uc81c \uc81c\ucd9c \ud604\ud669"}),(0,g.jsx)(a.Suspense,{fallback:(0,g.jsx)(_.Z,{children:(0,g.jsx)(Q,{})}),children:(0,g.jsx)(T,{})})]})},X=f.ZP.div.withConfig({displayName:"MissionStackedCountContainer__Container",componentId:"sc-1kf2dsa-0"})(["display:flex;flex-direction:column;align-items:flex-end;gap:10px;width:100%;height:275px;padding:20px 24px 80px;background:rgb(249,250,251);border-radius:8px;",""],x.B.medium(R||(R=(0,l.Z)(["\n    height: 234px;\n    border-radius: 8px 8px 0px 0px;\n  "])))),W=f.ZP.h2.withConfig({displayName:"MissionStackedCountContainer__Title",componentId:"sc-1kf2dsa-1"})(["width:100%;font-weight:600;font-size:16px;line-height:19px;color:#111827;"]),Y=p()((function(){return i.e(249).then(i.bind(i,1249))}),{suspense:!0,ssr:!1,loadableGenerated:{webpack:function(){return[1249]}}}),K=["\ubcbc\ub77d\uce58\uae30\ub97c \ud558\uace0 \uc788\ub294 \uc804\uad6d\uc758 50%\uc758 \ub300\ud559\uc0dd\ub4e4\uc744 \uc55e\uc11c\uace0 \uc788\uc2b5\ub2c8\ub2e4! \uc870\uae08\ub9cc \ub354 \ud654\uc774\ud305!","\uc9c0\uae08 \uacf5\ubd80\ud558\ub294 1\uc2dc\uac04\uc774 \uc2dc\ud5d8 \uae30\uac04\uc5d0 \ub2e4\ub978 \ud559\uc0dd\ub4e4\uacfc \uaca9\ucc28\ub97c \ubc8c\ub9b4 \uc218 \uc788\ub294 1\uc2dc\uac04\uc785\ub2c8\ub2e4! \uacc4\uc18d \ud654\uc774\ud305\ud574\ubd10\uc694!","\uc5ec\ub7ec\ubd84\ub4e4\uc740 \uc9c0\uae08\uae4c\uc9c0 1\ub2ec \ub3d9\uc548 \uafb8\uc900\ud788 \uacf5\ubd80\ub97c \ud574\uc624\uc168\uc2b5\ub2c8\ub2e4! \uc2dc\ud5d8 \uae30\uac04\uae4c\uc9c0 \uc870\uae08\ub9cc \ub354 \ud654\uc774\ud305\ud574\uc694!"],$=Math.floor(Math.random()*K.length);var nn,en,tn,on,rn,sn,an,cn,ln,dn,pn=function(){return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(u.Z,{name:"\ub0b4 \ucc4c\ub9b0\uc9c0 : \uae5c\uc9c0"}),(0,g.jsxs)(fn,{children:[(0,g.jsx)(xn,{children:"\ub0b4 \ucc4c\ub9b0\uc9c0"}),(0,g.jsxs)(un,{children:["\ud83d\udce2 ",K[$]]}),(0,g.jsxs)(hn,{children:[(0,g.jsx)(U,{}),(0,g.jsx)(P,{})]}),(0,g.jsx)(a.Suspense,{fallback:(0,g.jsx)(_.Z,{children:(0,g.jsx)(w,{})}),children:(0,g.jsx)(Y,{})})]})]})},fn=f.ZP.div.withConfig({displayName:"dashboard__Frame",componentId:"sc-l8roo6-0"})(["box-sizing:border-box;display:flex;flex-direction:column;gap:16px;align-items:center;justify-content:center;width:1040px;padding:80px;margin:0 auto;",""],x.B.medium(V||(V=(0,l.Z)(["\n    width: 100%;\n    padding: 88px 20px;\n    gap: 20px;\n  "])))),xn=f.ZP.h1.withConfig({displayName:"dashboard__Title",componentId:"sc-l8roo6-1"})(["display:flex;align-items:flex-start;width:100%;font-weight:700;font-size:24px;line-height:29px;color:#111827;"]),un=f.ZP.div.withConfig({displayName:"dashboard__HighlightBar",componentId:"sc-l8roo6-2"})(["display:flex;flex-direction:row;justify-content:center;align-items:center;padding:10px 16px;gap:10px;width:100%;background:#000000;border-radius:8px;font-weight:500;font-size:14px;line-height:17px;text-align:center;color:#ffffff;",""],x.B.medium(H||(H=(0,l.Z)(["\n    line-height: 21px;\n    text-align: start;\n  "])))),hn=f.ZP.div.withConfig({displayName:"dashboard__LayoutBlock",componentId:"sc-l8roo6-3"})(["display:flex;justify-content:flex-end;width:100%;",""],x.B.medium(J||(J=(0,l.Z)(["\n    display: flex;\n    flex-direction: column;\n    align-items: flex-end;\n  "])))),gn=f.ZP.h2.withConfig({displayName:"styles__Title",componentId:"sc-1t6mix0-0"})(['font-family:"GongGothicMedium";font-style:normal;font-weight:500;font-size:24px;line-height:150%;text-align:center;color:',";",""],(function(n){return n.color}),x.B.medium(nn||(nn=(0,l.Z)(["\n    font-size: 20px;\n  "])))),mn=f.ZP.p.withConfig({displayName:"styles__Description",componentId:"sc-1t6mix0-1"})(["font-style:normal;font-weight:500;font-size:16px;line-height:150%;text-align:center;color:",";opacity:0.8;",""],(function(n){return n.color}),x.B.medium(en||(en=(0,l.Z)(["\n    font-size: 14px;\n  "])))),jn=f.ZP.div.withConfig({displayName:"styles__Speechs",componentId:"sc-1t6mix0-2"})(["display:flex;flex-direction:column;gap:20px;padding:30px 0px;"]),yn=f.ZP.div.withConfig({displayName:"styles__FirstSpeech",componentId:"sc-1t6mix0-3"})(["display:flex;justify-content:flex-end;img{width:260px;}",""],x.B.medium(tn||(tn=(0,l.Z)(["\n    justify-content: center;\n\n    img{\n        width: 236px;\n    }\n  "])))),wn=f.ZP.div.withConfig({displayName:"styles__SecondSpeech",componentId:"sc-1t6mix0-4"})(["display:flex;justify-content:flex-start;img{width:443px;}",""],x.B.medium(on||(on=(0,l.Z)(["\n    justify-content: center;\n\n    img{\n        width: 326px;\n    }\n  "])))),bn=f.ZP.br.withConfig({displayName:"styles__Br",componentId:"sc-1t6mix0-5"})(["display:none;",""],x.B.medium(rn||(rn=(0,l.Z)(["\n    display: block;\n  "]))));var vn,_n=function(){return(0,g.jsxs)(Cn,{children:[(0,g.jsxs)(gn,{color:"#0F172A",children:["\uae5c\uc9c0\uc5d0\uc11c\ub294 \ub9e4\uc8fc \ubb38\uc81c\ub97c \ub9cc\ub4e4\uc5b4",(0,g.jsx)("br",{}),"\uc81c\ucd9c\ud558\ub294 \ucc4c\ub9b0\uc9c0\ub97c \uc9c4\ud589\ud569\ub2c8\ub2e4."]}),(0,g.jsxs)(mn,{color:"#333e4c",children:["\uc9c1\uc811 \ubb38\uc81c\uc640 \ud574\uc124\uc744 \ub9cc\ub4e4\uc5b4 \ubcf4\uba74\uc11c \uc790\uc2e0\uc774 \ucd9c\uc81c\ud55c ",(0,g.jsx)("br",{}),"\ubb38\uc81c\uc758 \uac1c\ub150\uc744 \ud655\uc2e4\ud558\uac8c \ud559\uc2b5\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."]}),(0,g.jsxs)(jn,{children:[(0,g.jsx)(yn,{children:(0,g.jsx)("img",{src:"image/landing/speech1.png"})}),(0,g.jsx)(wn,{children:(0,g.jsx)("img",{src:"image/landing/speech2.png"})})]}),(0,g.jsxs)(Zn,{children:[(0,g.jsxs)(kn,{children:[(0,g.jsx)("span",{children:"\ucd1d \uc81c\ucd9c \ubb38\uc81c \uc218"}),(0,g.jsx)("span",{children:"520+"})]}),(0,g.jsxs)(kn,{children:[(0,g.jsx)("span",{children:"\uc11c\ube44\uc2a4 \ud3c9\uade0 \ub9cc\uc871\ub3c4"}),(0,g.jsx)("span",{children:"4.75 \u2605"})]}),(0,g.jsxs)(kn,{children:[(0,g.jsx)("span",{children:"\ubcf4\uc720 \uc6b0\uc218 \ud559\uc2b5 \uc790\ub8cc"}),(0,g.jsx)("span",{children:"50+"})]})]}),(0,g.jsx)(In,{children:"\ubb38\uc81c \uc81c\ucd9c \uc591\uc740 \uae5c\uc9c0 OT\uc5d0\uc11c \uc548\ub0b4\ub420 \uc608\uc815\uc774\uba70, \ucc4c\ub9b0\uc9c0 \uc9c4\ud589 \uc911 \ud53c\ub4dc\ubc31\uc5d0 \ub530\ub77c \ubb38\uc81c \uc81c\ucd9c \uc591\uc774 \ubcc0\ub3d9\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4."})]})},Cn=f.ZP.div.withConfig({displayName:"ChallengeContainer__Container",componentId:"sc-6doxo-0"})(["display:flex;flex-direction:column;justify-content:center;align-items:center;padding:54px 330px;gap:10px;background:#f8fafc;",""],x.B.medium(sn||(sn=(0,l.Z)(["\n    padding: 54px 20px;\n  "])))),Zn=f.ZP.div.withConfig({displayName:"ChallengeContainer__Blocks",componentId:"sc-6doxo-1"})(["display:flex;gap:15px;margin-bottom:15px;",""],x.B.medium(an||(an=(0,l.Z)(["\n    flex-direction: column;\n    gap: 8px;\n   "])))),kn=f.ZP.div.withConfig({displayName:"ChallengeContainer__Block",componentId:"sc-6doxo-2"})(["display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;padding:26px 50px;gap:8px;width:246px;height:121px;background:#ffffff;border-radius:12px;"," span:first-child{font-style:normal;font-weight:500;font-size:16px;line-height:19px;color:#64748b;","}span:last-child{font-weight:700;font-size:32px;line-height:38px;color:#334155;","}"],x.B.medium(cn||(cn=(0,l.Z)(["\n    align-items: center;\n\n    width: 100%;\n    height: fit-content;\n  "]))),x.B.medium(ln||(ln=(0,l.Z)(["\n        font-size: 12px;\n        line-height: 14px;\n    "]))),x.B.medium(dn||(dn=(0,l.Z)(["\n        font-size: 24px;\n        line-height: 29px;\n    "])))),In=f.ZP.div.withConfig({displayName:"ChallengeContainer__Extra",componentId:"sc-6doxo-3"})(["text-align:center;font-weight:500;font-size:14px;line-height:17px;color:#64748b;"]);var Pn,zn=function(){return(0,g.jsxs)(Bn,{children:[(0,g.jsxs)(gn,{color:"white",children:["\uad50\uc218\ub2d8\uc774 \ub9d0\uc500\ud558\uc2e0 A+\uc758 \uc9c0\ub984\uae38,",(0,g.jsx)("br",{}),"\ubc14\ub85c \ubb38\uc81c \ub9cc\ub4e4\uae30\uc785\ub2c8\ub2e4."]}),(0,g.jsx)(mn,{color:"white",children:'"\uc2ec\ud654 \uc9c0\uc2dd\uc744 \uc694\uad6c\ud558\ub294 \uc804\uacf5 \uc774\ub860 \uacfc\ubaa9\uc758 \uacbd\uc6b0, \uc9c1\uc811 \ubb38\uc81c\ub97c \ub9cc\ub4e4\uba70 \uacf5\ubd80\ud588\uc744 \ub54c \ub354\uc6b1 \ub192\uc740 \ud559\uc2b5 \ud6a8\uacfc\ub97c \uac70\ub458 \uc218 \uc788\uc2b5\ub2c8\ub2e4."'}),(0,g.jsxs)(Nn,{children:[(0,g.jsx)("img",{src:"image/landing/professor.png"}),(0,g.jsx)("span",{children:"\uae40\ubbfc\uc815 \uad50\uc218 (\ub2e8\uad6d\ub300\ud559\uad50 \uad50\uc9c1\uad50\uc721\uacfc)"})]})]})},Bn=f.ZP.div.withConfig({displayName:"ProfessorContainer__Container",componentId:"sc-1opc9os-0"})(["display:flex;flex-direction:column;justify-content:center;align-items:center;padding:54px 470px;gap:10px;background:#0f172a;",""],x.B.medium(vn||(vn=(0,l.Z)(["\n    padding: 54px 40px;\n  "])))),Nn=f.ZP.div.withConfig({displayName:"ProfessorContainer__Profile",componentId:"sc-1opc9os-1"})(['display:flex;align-items:center;gap:12px;font-family:"Pretendard";font-style:normal;font-weight:700;font-size:14px;line-height:17px;color:#ffffff;img{width:32px;height:32px;}']);var Sn,qn,On=function(){return(0,g.jsxs)(En,{children:[(0,g.jsxs)(gn,{color:"#0F172A",children:["\uc6b0\uc218\ud55c \uae30\ucd9c \ubb38\uc81c\ub97c \ud1b5\ud574 ",(0,g.jsx)(bn,{}),"\ud6a8\uacfc\uc801\uc778 \ud559\uc2b5\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4."]}),(0,g.jsx)(mn,{color:"#333e4c",children:"\uae5c\uc9c0\uc5d0\uc11c \ubb38\uc81c \uc81c\ucd9c \ubbf8\uc158\uc744 \ub2ec\uc131\ud558\uba74 \ub2e4\ub978 \ucc4c\ub9b0\uc800\ub4e4\uc774 \uc791\uc131\ud55c \ubb38\uc81c\ub4e4\uc744 \ud480 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),(0,g.jsxs)(jn,{children:[(0,g.jsx)(yn,{children:(0,g.jsx)("img",{src:"image/landing/speech3.png"})}),(0,g.jsx)(wn,{children:(0,g.jsx)("img",{src:"image/landing/speech4.png"})})]}),(0,g.jsxs)(An,{children:[(0,g.jsx)("img",{src:"image/landing/quiz3.png"}),(0,g.jsx)("img",{src:"image/landing/quiz2.png"}),(0,g.jsx)("img",{src:"image/landing/quiz1.png"}),(0,g.jsx)("img",{src:"image/landing/quiz4.png"})]})]})},En=f.ZP.div.withConfig({displayName:"QuizExampleContainer__Container",componentId:"sc-1yusoxj-0"})(["display:flex;flex-direction:column;justify-content:center;align-items:center;padding:54px 330px;gap:10px;background:#ffffff;",""],x.B.medium(Pn||(Pn=(0,l.Z)(["\n    padding: 54px 20px;\n  "])))),An=f.ZP.div.withConfig({displayName:"QuizExampleContainer__Images",componentId:"sc-1yusoxj-1"})(["display:flex;overflow-x:scroll;img{object-fit:contain;}"]);var Fn,Tn=function(){return(0,g.jsxs)(Mn,{children:[(0,g.jsxs)(gn,{color:"#ffffff",children:["\uae5c\uc9c0\ub97c \uacbd\ud5d8\ud55c \ud559\uc0dd\ub4e4\uc758 ",(0,g.jsx)(bn,{}),"\ub530\ub048\ub530\ub048\ud55c \ud6c4\uae30!"]}),(0,g.jsxs)(Dn,{children:[(0,g.jsxs)(Ln,{children:[(0,g.jsx)("img",{src:"image/landing/profile1.png"}),(0,g.jsx)("span",{children:"\uae5c\uc9c0\ub97c \ud1b5\ud574 \ud034\uc988\ub97c \ub9cc\ub4e4\uba74\uc11c \uc911\uc694\ud558\uac8c \uc0dd\uac01\ub418\ub294 \ubd80\ubd84\uc744 \ud55c\ubc88 \ub354 \uc9da\uc5b4\ubcfc \uc218 \uc788\uc5c8\uace0, \ubd80\uc871\ud55c \ubd80\ubd84\uc744 \ub2e4\uc2dc \uc0dd\uac01\ud558\ub294 \uacc4\uae30\uac00 \ub418\uc5c8\uc2b5\ub2c8\ub2e4~!!"})]}),(0,g.jsxs)(Ln,{children:[(0,g.jsx)("img",{src:"image/landing/profile2.png"}),(0,g.jsx)("span",{children:"\ubc30\uc6b4 \ub0b4\uc6a9\uc744 \ubcf5\uc2b5\ud558\uace0 \uc751\uc6a9\ubb38\uc81c\ub97c \ub9cc\ub4e4\uae30 \uc704\ud574 \uace0\ubbfc\ud558\ub294 \uacfc\uc815\uc774 \uac1c\ub150\uc744 \uc644\uc804\ud788 \uc2b5\ub4dd\ud558\ub294\ub370 \ub3c4\uc6c0\uc774 \ub418\uc5c8\uc2b5\ub2c8\ub2e4."})]}),(0,g.jsxs)(Ln,{children:[(0,g.jsx)("img",{src:"image/landing/profile3.png"}),(0,g.jsx)("span",{children:"\uc0dd\uac01\ubcf4\ub2e4 \uae30\ub300 \uc774\uc0c1\uc778 \ud004\ub9ac\ud2f0\uc758 \ubb38\uc81c\ub4e4\uc744 \ud1b5\ud574 \ub354 \ub9ce\uc774 \ud559\uc2b5\ud560 \uc218 \uc788\uc5c8\uc2b5\ub2c8\ub2e4!!"})]}),(0,g.jsxs)(Ln,{children:[(0,g.jsx)("img",{src:"image/landing/profile4.png"}),(0,g.jsx)("span",{children:"\uc798\ubabb \uc0dd\uac01\ud558\uace0 \uc788\uc5c8\ub358 \ubd80\ubd84\uc744 \ubc14\ub85c\uc7a1\uc744 \uc218 \uc788\uc73c\uba70, \ud655\uc2e4\ud55c \ub0b4\uc6a9\ub3c4 \ud55c\ubc88 \ub354 \ud655\uc778\ud560 \uc218 \uc788\uc5c8\uc2b5\ub2c8\ub2e4\u314e\u314e \uc624\ud508\ubd81\uc5d0 \uc790\ubc1c\uc801\uc73c\ub85c \ubb38\uc81c\ub97c \ud480\uc5b4\ubcf4\ub294\uac70\ub77c \ubd80\ub2f4 \uc5c6\uc774 \uacf5\ubd80\ud560 \uc218 \uc788\uc5c8\uace0 \uac1c\ub150\uc744 \ud655\uc778\ud558\ub294 \uc88b\uc740 \uae30\ud68c\uac00 \ub418\uc5c8\uc2b5\ub2c8\ub2e4!!"})]})]})]})},Mn=f.ZP.div.withConfig({displayName:"ReviewContainer__Container",componentId:"sc-11tanc1-0"})(["display:flex;flex-direction:column;justify-content:center;align-items:center;padding:54px 330px;gap:24px;background:#06b6d4;",""],x.B.medium(Sn||(Sn=(0,l.Z)(["\n    padding: 54px 20px;\n  "])))),Dn=f.ZP.div.withConfig({displayName:"ReviewContainer__Blocks",componentId:"sc-11tanc1-1"})(["display:flex;flex-direction:column;gap:8px;"]),Ln=f.ZP.div.withConfig({displayName:"ReviewContainer__Block",componentId:"sc-11tanc1-2"})(["display:flex;flex-direction:row;align-items:center;padding:16px 24px;gap:16px;width:548px;background:#ffffff;border-radius:12px;font-weight:700;font-size:16px;line-height:150%;color:#1e293b;"," img{width:32px;height:32px;}"],x.B.medium(qn||(qn=(0,l.Z)(["\n    width: 100%;\n  "]))));var Rn,Qn,Gn,Vn,Hn=function(){return(0,g.jsxs)(Jn,{children:[(0,g.jsxs)(gn,{color:"#ffffff",children:["\ub05d\uae4c\uc9c0 \uacf5\ubd80\ud560 \uc218 \uc788\ub3c4\ub85d ",(0,g.jsx)(bn,{}),"\ucc10\ud55c \uc11c\ud3ec\ud2b8\ub97c \uc81c\uacf5\ud569\ub2c8\ub2e4."]}),(0,g.jsx)(mn,{color:"#ffffff",children:"'\uc870\uae08\ub9cc \ub354 \uc77c\ucc0d \uacf5\ubd80 \uc2dc\uc791\ud560 \uac78...'"}),(0,g.jsxs)(Un,{children:["\uc2dc\ud5d8 \uae30\uac04\uc774 \ub2e4\uac00\uc624\uba74 \ubbf8\ub9ac \uacf5\ubd80\ud558\uc9c0 \ubabb\ud55c \uac83\uc5d0 \ub300\ud55c \uc544\uc26c\uc6c0\uc774 \ub0a8\uae30 \ub9c8\ub828\uc785\ub2c8\ub2e4. ",(0,g.jsx)("br",{}),"\uc774\ub7f0 \uc5ec\ub7ec\ubd84\ub4e4\uc774 \ud6c4\ud68c\ud558\uc9c0 \uc54a\ub3c4\ub85d, \uc11c\ud3ec\ud130\uc988\uac00 \uc9c1\uc811 \uc5ec\ub7ec\ubd84\ub4e4\uc5d0\uac8c \ucc3e\uc544\uac11\ub2c8\ub2e4! ",(0,g.jsx)("br",{}),(0,g.jsx)("br",{}),"\ucc4c\ub9b0\uc9c0 \ubbf8\uc158 \ub2ec\uc131\uc774 \uc548\ub418\uc5c8\uc744 \ub54c \uc11c\ud3ec\ud130\uc988\uac00 ",(0,g.jsx)(bn,{})," \ud83e\udd19",(0,g.jsx)("span",{children:"\uc9c1\uc811 \uc804\ud654\ub97c \uac78\uc5b4"}),(0,g.jsx)("br",{}),"\uc5ec\ub7ec\ubd84\ub4e4\uc774 \ucc4c\ub9b0\uc9c0\ub97c \ub05d\uae4c\uc9c0 \uc644\uc218\ud560 \uc218 \uc788\ub3c4\ub85d \ucc10\ud558\uac8c \uad00\ub9ac\ud569\ub2c8\ub2e4."]}),(0,g.jsx)(Xn,{children:"\uae5c\uc9c0 \uc11c\ud3ec\ud130\uc988 \uc11c\ube44\uc2a4\ub294 \uc758\ubb34\uac00 \uc544\ub2cc \uc2e0\uccad \uc11c\ube44\uc2a4\uc785\ub2c8\ub2e4. \ucd94\ud6c4 \ucc4c\ub9b0\uc9c0 \uc9c4\ud589\uc790\ub4e4\uc5d0\uac8c \uc2e0\uccad \uc5ec\ubd80\uc5d0 \ub300\ud574 \uc5f0\ub77d\uc744 \ub4dc\ub9b4 \uc608\uc815\uc785\ub2c8\ub2e4."})]})},Jn=f.ZP.div.withConfig({displayName:"SupportContainer__Container",componentId:"sc-1btk1qo-0"})(["display:flex;flex-direction:column;justify-content:center;align-items:center;padding:54px 316px;gap:10px;background:#0f172a;",""],x.B.medium(Fn||(Fn=(0,l.Z)(["\n    padding: 54px 20px;\n  "])))),Un=f.ZP.div.withConfig({displayName:"SupportContainer__Block",componentId:"sc-1btk1qo-1"})(["margin:14px 0px;padding:32px;background:#ffffff;border-radius:12px;font-style:normal;font-weight:700;font-size:16px;line-height:150%;text-align:center;color:#0f172a;span{text-decoration:underline;}"]),Xn=f.ZP.p.withConfig({displayName:"SupportContainer__Extra",componentId:"sc-1btk1qo-2"})(["font-weight:500;font-size:14px;line-height:17px;color:#ffffff;opacity:0.6;"]);var Wn=function(){return(0,g.jsxs)(Yn,{children:[(0,g.jsxs)("div",{children:[(0,g.jsxs)(Kn,{children:["\uc885\uac15\uae4c\uc9c0 \ucc45\uc784\uc9c0\ub294",(0,g.jsx)("br",{}),"\ucc10\ud55c \ud559\uc810 \uad00\ub9ac"]}),(0,g.jsx)($n,{children:"\uae5c\uc9c0."})]}),(0,g.jsx)(ne,{children:(0,g.jsx)("img",{src:"image/landing/screen.png"})})]})},Yn=f.ZP.div.withConfig({displayName:"TitleContainer__Container",componentId:"sc-1l73aog-0"})(["display:flex;justify-content:center;align-items:center;gap:30px;width:100%;height:440px;background:#6366f1;",""],x.B.medium(Rn||(Rn=(0,l.Z)(["\n    flex-direction: column;\n    height: fit-content;\n    padding-top: 40px;\n  "])))),Kn=f.ZP.h2.withConfig({displayName:"TitleContainer__SubTitle",componentId:"sc-1l73aog-1"})(['font-family:"GongGothicMedium";font-style:normal;font-weight:500;font-size:40px;line-height:150%;color:#ffffff;',""],x.B.medium(Qn||(Qn=(0,l.Z)(["\n    font-size: 24px;\n    text-align: center;\n  "])))),$n=f.ZP.h1.withConfig({displayName:"TitleContainer__Logo",componentId:"sc-1l73aog-2"})(['font-family:"HSSummer";font-style:normal;font-weight:700;font-size:80px;line-height:150%;color:#ffffff;',""],x.B.medium(Gn||(Gn=(0,l.Z)(["\n    font-size: 48px;\n    text-align: center;\n  "])))),ne=f.ZP.div.withConfig({displayName:"TitleContainer__ImageBlock",componentId:"sc-1l73aog-3"})(["display:flex;align-items:flex-end;width:460px;height:100%;",""],x.B.medium(Vn||(Vn=(0,l.Z)(["\n      width: 260px;\n  "]))));var ee=function(){return(0,g.jsxs)(ie,{children:[(0,g.jsx)(Wn,{}),(0,g.jsx)(zn,{}),(0,g.jsx)(_n,{}),(0,g.jsx)(On,{}),(0,g.jsx)(Hn,{}),(0,g.jsx)(Tn,{})]})},ie=f.ZP.div.withConfig({displayName:"landing__Frame",componentId:"sc-iv7xuj-0"})(["padding-top:50px;"]);var te=function(){var n=(0,c.r)();return(0,g.jsx)(g.Fragment,{children:n?(0,g.jsx)(pn,{}):(0,g.jsx)(ee,{})})}},7720:function(n,e,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return i(9115)}])},5241:function(){}},function(n){n.O(0,[947,390,185,790,892,774,888,179],(function(){return e=7720,n(n.s=e);var e}));var e=n.O();_N_E=e}]);