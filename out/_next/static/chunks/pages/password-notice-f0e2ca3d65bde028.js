(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[584],{4609:function(e,n,t){"use strict";t.d(n,{V:function(){return a},_:function(){return o}});var s=t(8390),r=t.n(s),o=r().create({baseURL:"https://dev.kkamjidot.com/v1"}),a=r().create({baseURL:"https://dev.kkamjidot.com/v2"})},5627:function(e,n,t){"use strict";t.r(n);var s=t(1335),r=t(4048),o=t(8306),a=t.n(o),i=t(1013),c=t(1193),l=t(1670),u=t(9953),d=t(4265),f=t(4609),p=t(686),x=t(1874);function h(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);n&&(s=s.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,s)}return t}function m(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?h(Object(t),!0).forEach((function(n){(0,s.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):h(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}n.default=function(){var e,n,t=(0,l.useRouter)(),s="password",o="text",h=(0,u.useState)(!1),w=h[0],g=h[1],b=(0,u.useState)(!1),j=b[0],v=b[1],y=(0,d.cI)(),O=y.register,N=y.handleSubmit,P=y.formState.errors,_=(0,y.watch)("newPassword"),k=(0,c.useMutation)(function(){var e=(0,r.Z)(a().mark((function e(n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f._.patch("/users/password",n);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),{onSuccess:function(){t.push("/login")},onError:function(){alert("\ube44\ubc00\ubc88\ud638 \ubcc0\uacbd\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4. \uc785\ub825\ud55c \uc815\ubcf4\ub97c \ud655\uc778\ud574\uc8fc\uc138\uc694.")}}),E=k.mutate,S=function(){var e=(0,r.Z)(a().mark((function e(n){var t,s;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=n.newPassword,s=n.newPasswordConfirm,t===s?E(n):alert("\ube44\ubc00\ubc88\ud638\uc640 \ube44\ubc00\ubc88\ud638 \ud655\uc778\uc774 \ub2e4\ub985\ub2c8\ub2e4.");case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(p.Z,{name:"\ube44\ubc00\ubc88\ud638 \ubcc0\uacbd : \uae5c\uc9c0"}),(0,x.jsxs)("div",{className:"flex flex-col items-center gap-10 px-40 pt-20 sm:px-10",children:[(0,x.jsx)("h2",{className:"text-2xl font-bold",children:"\ube44\ubc00\ubc88\ud638\ub97c \ubcc0\uacbd\ud574\uc8fc\uc138\uc694."}),(0,x.jsx)("p",{children:"\ud68c\uc6d0\ub2d8\ub4e4\uc758 \uc18c\uc911\ud55c \uac1c\uc778\uc815\ubcf4\ub97c \ubcf4\ud638\ud558\uae30 \uc704\ud574 \ub85c\uadf8\uc778 \ubc29\uc2dd\uc774 \ubcc0\uacbd\ub429\ub2c8\ub2e4. \ub2e4\uc74c \ub85c\uadf8\uc778\ubd80\ud130\ub294 \uc0c8 \ube44\ubc00\ubc88\ud638\ub85c \ub85c\uadf8\uc778\ud574\uc8fc\uc2dc\uae38 \ubc14\ub78d\ub2c8\ub2e4. \uac10\uc0ac\ud569\ub2c8\ub2e4."}),(0,x.jsxs)("form",{onSubmit:N(S),className:"flex flex-col gap-8",children:[(0,x.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,x.jsxs)("label",{children:["\uc774\uba54\uc77c",(0,x.jsx)("div",{className:"flex",children:(0,x.jsx)("input",m(m({type:"email"},O("email",{required:"\uc774\uba54\uc77c\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694."})),{},{className:"w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"}))})]}),(0,x.jsxs)("label",{children:["\uae30\uc874 \ube44\ubc00\ubc88\ud638",(0,x.jsx)("div",{className:"flex",children:(0,x.jsx)("input",m(m({type:"password"},O("existingPassword",{required:"\uae30\uc874 \ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694.",minLength:{value:4,message:"\uae30\uc874 \ube44\ubc00\ubc88\ud638\ub294 4\uc790\uc785\ub2c8\ub2e4."},maxLength:{value:4,message:"\uae30\uc874 \ube44\ubc00\ubc88\ud638\ub294 4\uc790\uc785\ub2c8\ub2e4."}})),{},{className:"w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"}))})]}),(0,x.jsxs)("label",{className:"flex flex-col",children:["\uc0c8 \ube44\ubc00\ubc88\ud638",(0,x.jsxs)("div",{className:"flex",children:[(0,x.jsx)("input",m(m({type:w?o:s},O("newPassword",{required:"\uc0c8 \ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694.",minLength:{value:8,message:"\ucd5c\uc18c 8\uc790 \uc774\uc0c1\uc758 \ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694."},maxLength:{value:255,message:"\ube44\ubc00\ubc88\ud638\ub294 255\uc790\ub97c \ucd08\uacfc\ud558\uba74 \uc548\ub429\ub2c8\ub2e4."},pattern:{value:/^(?=.*\d)(?=.*[A-Za-z])[\40-\176]{8,255}$/,message:"\uc601\ubb38, \uc22b\uc790\ub97c \ud63c\uc6a9\ud558\uc5ec \uc785\ub825\ud574\uc8fc\uc138\uc694."}})),{},{className:"w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"})),(0,x.jsx)("button",{onClick:function(){g((function(e){return!e}))},type:"button",className:"px-2",children:w?(0,x.jsx)(i.JO,{icon:"ant-design:eye-filled",color:"#696969"}):(0,x.jsx)(i.JO,{icon:"ant-design:eye-invisible-filled",color:"#696969"})})]}),(0,x.jsx)("em",{children:null===(e=P.newPassword)||void 0===e?void 0:e.message})]}),(0,x.jsxs)("label",{className:"flex flex-col",children:["\uc0c8 \ube44\ubc00\ubc88\ud638 \ud655\uc778",(0,x.jsxs)("div",{className:"flex",children:[(0,x.jsx)("input",m(m({type:j?o:s},O("newPasswordConfirm",{required:"\uc0c8 \ube44\ubc00\ubc88\ud638 \ud655\uc778\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694.",validate:function(e){return e===_||"\ube44\ubc00\ubc88\ud638\uc640 \ube44\ubc00\ubc88\ud638 \ud655\uc778\uc774 \ub2e4\ub985\ub2c8\ub2e4."}})),{},{className:"w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"})),(0,x.jsx)("button",{onClick:function(){v((function(e){return!e}))},type:"button",className:"px-2",children:j?(0,x.jsx)(i.JO,{icon:"ant-design:eye-filled",color:"#696969"}):(0,x.jsx)(i.JO,{icon:"ant-design:eye-invisible-filled",color:"#696969"})})]}),(0,x.jsx)("em",{children:null===(n=P.newPasswordConfirm)||void 0===n?void 0:n.message})]})]}),(0,x.jsx)("button",{type:"submit",className:"bg-[#5c3cde] hover:bg-[#4026ab] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer",children:"\ube44\ubc00\ubc88\ud638 \ubcc0\uacbd"})]})]})]})}},8450:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/password-notice",function(){return t(5627)}])}},function(e){e.O(0,[390,265,774,888,179],(function(){return n=8450,e(e.s=n);var n}));var n=e.O();_N_E=n}]);