"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[265],{4265:function(e,r,t){t.d(r,{Dq:function(){return ae},cI:function(){return Be}});var s=t(9953),a=e=>"checkbox"===e.type,n=e=>e instanceof Date,i=e=>null==e;const o=e=>"object"===typeof e;var u=e=>!i(e)&&!Array.isArray(e)&&o(e)&&!n(e),l=e=>u(e)&&e.target?a(e.target)?e.target.checked:e.target.value:e,c=(e,r)=>e.has((e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e)(r)),d=e=>Array.isArray(e)?e.filter(Boolean):[],f=e=>void 0===e,y=(e,r,t)=>{if(!r||!u(e))return t;const s=d(r.split(/[,[\].]+?/)).reduce(((e,r)=>i(e)?e:e[r]),e);return f(s)||s===e?f(e[r])?t:e[r]:s};const m="blur",h="focusout",g="onBlur",p="onChange",_="onSubmit",v="onTouched",b="all",A="max",x="min",F="maxLength",V="minLength",w="pattern",k="required",S="validate",D=s.createContext(null),C=()=>s.useContext(D);var E=(e,r,t,s=!0)=>{const a={};for(const n in e)Object.defineProperty(a,n,{get:()=>{const a=n;return r[a]!==b&&(r[a]=!s||b),t&&(t[a]=!0),e[a]}});return a},j=e=>u(e)&&!Object.keys(e).length,O=(e,r,t)=>{const{name:s,...a}=e;return j(a)||Object.keys(a).length>=Object.keys(r).length||Object.keys(a).find((e=>r[e]===(!t||b)))},N=e=>Array.isArray(e)?e:[e];function B(e){const r=s.useRef(e);r.current=e,s.useEffect((()=>{const t=!e.disabled&&r.current.subject.subscribe({next:r.current.callback});return()=>(e=>{e&&e.unsubscribe()})(t)}),[e.disabled])}var T=e=>"string"===typeof e,U=(e,r,t,s)=>{const a=Array.isArray(e);return T(e)?(s&&r.watch.add(e),y(t,e)):a?e.map((e=>(s&&r.watch.add(e),y(t,e)))):(s&&(r.watchAll=!0),t)},M=e=>"function"===typeof e,L=e=>{for(const r in e)if(M(e[r]))return!0;return!1};var q=(e,r,t,s,a)=>r?{...t[e],types:{...t[e]&&t[e].types?t[e].types:{},[s]:a||!0}}:{},R=e=>/^\w*$/.test(e),I=e=>d(e.replace(/["|']|\]/g,"").split(/\.|\[/));function $(e,r,t){let s=-1;const a=R(r)?[r]:I(r),n=a.length,i=n-1;for(;++s<n;){const r=a[s];let n=t;if(s!==i){const t=e[r];n=u(t)||Array.isArray(t)?t:isNaN(+a[s+1])?{}:[]}e[r]=n,e=e[r]}return e}const H=(e,r,t)=>{for(const s of t||Object.keys(e)){const t=y(e,s);if(t){const{_f:e,...s}=t;if(e&&r(e.name)){if(e.ref.focus&&f(e.ref.focus()))break;if(e.refs){e.refs[0].focus();break}}else u(s)&&H(s,r)}}};var W=()=>{const e="undefined"===typeof performance?Date.now():1e3*performance.now();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(r=>{const t=(16*Math.random()+e)%16|0;return("x"==r?t:3&t|8).toString(16)}))},P=(e,r,t={})=>t.shouldFocus||f(t.shouldFocus)?t.focusName||`${e}.${f(t.focusIndex)?r:t.focusIndex}.`:"",z=(e,r,t)=>!t&&(r.watchAll||r.watch.has(e)||[...r.watch].some((r=>e.startsWith(r)&&/^\.\w+/.test(e.slice(r.length)))));function G(e,r){return[...e,...N(r)]}var J="undefined"!==typeof window&&"undefined"!==typeof window.HTMLElement&&"undefined"!==typeof document;function K(e){let r;const t=Array.isArray(e);if(e instanceof Date)r=new Date(e);else if(e instanceof Set)r=new Set(e);else{if(J&&(e instanceof Blob||e instanceof FileList)||!t&&!u(e))return e;r=t?[]:{};for(const t in e){if(M(e[t])){r=e;break}r[t]=K(e[t])}}return r}var Q=e=>Array.isArray(e)?e.map((()=>{})):void 0;function X(e,r,t){return[...e.slice(0,r),...N(t),...e.slice(r)]}var Y=(e,r,t)=>Array.isArray(e)?(f(e[t])&&(e[t]=void 0),e.splice(t,0,e.splice(r,1)[0]),e):[];function Z(e,r){return[...N(r),...N(e)]}var ee=(e,r)=>f(r)?[]:function(e,r){let t=0;const s=[...e];for(const a of r)s.splice(a-t,1),t++;return d(s).length?s:[]}(e,N(r).sort(((e,r)=>e-r))),re=(e,r,t)=>{e[r]=[e[t],e[t]=e[r]][0]};function te(e,r){const t=R(r)?[r]:I(r),s=1==t.length?e:function(e,r){const t=r.slice(0,-1).length;let s=0;for(;s<t;)e=f(e)?s++:e[r[s++]];return e}(e,t),a=t[t.length-1];let n;s&&delete s[a];for(let i=0;i<t.slice(0,-1).length;i++){let r,s=-1;const a=t.slice(0,-(i+1)),o=a.length-1;for(i>0&&(n=e);++s<a.length;){const t=a[s];r=r?r[t]:e[t],o===s&&(u(r)&&j(r)||Array.isArray(r)&&!r.filter((e=>!f(e))).length)&&(n?delete n[t]:delete e[t]),n=r}}return e}var se=(e,r,t)=>(e[r]=t,e);function ae(e){const r=C(),{control:t=r.control,name:a,keyName:n="id",shouldUnregister:i}=e,[o,u]=s.useState(t._getFieldArray(a)),l=s.useRef(t._getFieldArray(a).map(W)),c=s.useRef(o),d=s.useRef(a),f=s.useRef(!1);d.current=a,c.current=o,t._names.array.add(a);B({callback:s.useCallback((({values:e,name:r})=>{if(r===d.current||!r){const r=y(e,d.current,[]);u(r),l.current=r.map(W)}}),[]),subject:t._subjects.array});const m=s.useCallback((e=>{f.current=!0,t._updateFieldArray(a,e)}),[t,a]);return s.useEffect((()=>{t._stateFlags.action=!1,z(a,t._names)&&t._subjects.state.next({}),f.current&&t._executeSchema([a]).then((e=>{const r=y(e.errors,a),s=y(t._formState.errors,a);(s?!r&&s.type:r&&r.type)&&(r?$(t._formState.errors,a,r):te(t._formState.errors,a),t._subjects.state.next({errors:t._formState.errors}))})),t._subjects.watch.next({name:a,values:t._formValues}),t._names.focus&&H(t._fields,(e=>e.startsWith(t._names.focus))),t._names.focus="",t._proxyFormState.isValid&&t._updateValid()}),[o,a,t]),s.useEffect((()=>(!y(t._formValues,a)&&t._updateFieldArray(a),()=>{(t._options.shouldUnregister||i)&&t.unregister(a)})),[a,t,n,i]),{swap:s.useCallback(((e,r)=>{const s=t._getFieldArray(a);re(s,e,r),re(l.current,e,r),m(s),u(s),t._updateFieldArray(a,s,re,{argA:e,argB:r},!1)}),[m,a,t]),move:s.useCallback(((e,r)=>{const s=t._getFieldArray(a);Y(s,e,r),Y(l.current,e,r),m(s),u(s),t._updateFieldArray(a,s,Y,{argA:e,argB:r},!1)}),[m,a,t]),prepend:s.useCallback(((e,r)=>{const s=N(K(e)),n=Z(t._getFieldArray(a),s);t._names.focus=P(a,0,r),l.current=Z(l.current,s.map(W)),m(n),u(n),t._updateFieldArray(a,n,Z,{argA:Q(e)})}),[m,a,t]),append:s.useCallback(((e,r)=>{const s=N(K(e)),n=G(t._getFieldArray(a),s);t._names.focus=P(a,n.length-1,r),l.current=G(l.current,s.map(W)),m(n),u(n),t._updateFieldArray(a,n,G,{argA:Q(e)})}),[m,a,t]),remove:s.useCallback((e=>{const r=ee(t._getFieldArray(a),e);l.current=ee(l.current,e),m(r),u(r),t._updateFieldArray(a,r,ee,{argA:e})}),[m,a,t]),insert:s.useCallback(((e,r,s)=>{const n=N(K(r)),i=X(t._getFieldArray(a),e,n);t._names.focus=P(a,e,s),l.current=X(l.current,e,n.map(W)),m(i),u(i),t._updateFieldArray(a,i,X,{argA:e,argB:Q(r)})}),[m,a,t]),update:s.useCallback(((e,r)=>{const s=K(r),n=se(t._getFieldArray(a),e,s);l.current=[...n].map(((r,t)=>r&&t!==e?l.current[t]:W())),m(n),u([...n]),t._updateFieldArray(a,n,se,{argA:e,argB:s},!0,!1)}),[m,a,t]),replace:s.useCallback((e=>{const r=N(K(e));l.current=r.map(W),m([...r]),u([...r]),t._updateFieldArray(a,[...r],(e=>e),{},!0,!1)}),[m,a,t]),fields:s.useMemo((()=>o.map(((e,r)=>({...e,[n]:l.current[r]||W()})))),[o,n])}}function ne(){let e=[];return{get observers(){return e},next:r=>{for(const t of e)t.next(r)},subscribe:r=>(e.push(r),{unsubscribe:()=>{e=e.filter((e=>e!==r))}}),unsubscribe:()=>{e=[]}}}var ie=e=>i(e)||!o(e);function oe(e,r){if(ie(e)||ie(r))return e===r;if(n(e)&&n(r))return e.getTime()===r.getTime();const t=Object.keys(e),s=Object.keys(r);if(t.length!==s.length)return!1;for(const a of t){const t=e[a];if(!s.includes(a))return!1;if("ref"!==a){const e=r[a];if(n(t)&&n(e)||u(t)&&u(e)||Array.isArray(t)&&Array.isArray(e)?!oe(t,e):t!==e)return!1}}return!0}var ue=e=>({isOnSubmit:!e||e===_,isOnBlur:e===g,isOnChange:e===p,isOnAll:e===b,isOnTouch:e===v}),le=e=>"boolean"===typeof e,ce=e=>"file"===e.type,de=e=>{const r=e?e.ownerDocument:0;return e instanceof(r&&r.defaultView?r.defaultView.HTMLElement:HTMLElement)},fe=e=>"select-multiple"===e.type,ye=e=>"radio"===e.type,me=e=>de(e)&&e.isConnected;function he(e,r={}){const t=Array.isArray(e);if(u(e)||t)for(const s in e)Array.isArray(e[s])||u(e[s])&&!L(e[s])?(r[s]=Array.isArray(e[s])?[]:{},he(e[s],r[s])):i(e[s])||(r[s]=!0);return r}function ge(e,r,t){const s=Array.isArray(e);if(u(e)||s)for(const a in e)Array.isArray(e[a])||u(e[a])&&!L(e[a])?f(r)||ie(t[a])?t[a]=Array.isArray(e[a])?he(e[a],[]):{...he(e[a])}:ge(e[a],i(r)?{}:r[a],t[a]):t[a]=!oe(e[a],r[a]);return t}var pe=(e,r)=>ge(e,r,he(r));const _e={value:!1,isValid:!1},ve={value:!0,isValid:!0};var be=e=>{if(Array.isArray(e)){if(e.length>1){const r=e.filter((e=>e&&e.checked&&!e.disabled)).map((e=>e.value));return{value:r,isValid:!!r.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!f(e[0].attributes.value)?f(e[0].value)||""===e[0].value?ve:{value:e[0].value,isValid:!0}:ve:_e}return _e},Ae=(e,{valueAsNumber:r,valueAsDate:t,setValueAs:s})=>f(e)?e:r?""===e||i(e)?NaN:+e:t&&T(e)?new Date(e):s?s(e):e;const xe={isValid:!1,value:null};var Fe=e=>Array.isArray(e)?e.reduce(((e,r)=>r&&r.checked&&!r.disabled?{isValid:!0,value:r.value}:e),xe):xe;function Ve(e){const r=e.ref;if(!(e.refs?e.refs.every((e=>e.disabled)):r.disabled))return ce(r)?r.files:ye(r)?Fe(e.refs).value:fe(r)?[...r.selectedOptions].map((({value:e})=>e)):a(r)?be(e.refs).value:Ae(f(r.value)?e.ref.value:r.value,e)}var we=e=>e instanceof RegExp,ke=e=>f(e)?void 0:we(e)?e.source:u(e)?we(e.value)?e.value.source:e.value:e;function Se(e,r,t){const s=y(e,t);if(s||R(t))return{error:s,name:t};const a=t.split(".");for(;a.length;){const s=a.join("."),n=y(r,s),i=y(e,s);if(n&&!Array.isArray(n)&&t!==s)return{name:t};if(i&&i.type)return{name:s,error:i};a.pop()}return{name:t}}var De=e=>T(e)||s.isValidElement(e);function Ce(e,r,t="validate"){if(De(e)||Array.isArray(e)&&e.every(De)||le(e)&&!e)return{type:t,message:De(e)?e:"",ref:r}}var Ee=e=>u(e)&&!we(e)?e:{value:e,message:""},je=async(e,r,t,s)=>{const{ref:n,refs:o,required:l,maxLength:c,minLength:d,min:f,max:y,pattern:m,validate:h,name:g,valueAsNumber:p,mount:_,disabled:v}=e._f;if(!_||v)return{};const b=o?o[0]:n,D=e=>{s&&b.reportValidity&&(b.setCustomValidity(le(e)?"":e||" "),b.reportValidity())},C={},E=ye(n),O=a(n),N=E||O,B=(p||ce(n))&&!n.value||""===r||Array.isArray(r)&&!r.length,U=q.bind(null,g,t,C),L=(e,r,t,s=F,a=V)=>{const i=e?r:t;C[g]={type:e?s:a,message:i,ref:n,...U(e?s:a,i)}};if(l&&(!N&&(B||i(r))||le(r)&&!r||O&&!be(o).isValid||E&&!Fe(o).isValid)){const{value:e,message:r}=De(l)?{value:!!l,message:l}:Ee(l);if(e&&(C[g]={type:k,message:r,ref:b,...U(k,r)},!t))return D(r),C}if(!B&&(!i(f)||!i(y))){let e,s;const a=Ee(y),o=Ee(f);if(i(r)||isNaN(r)){const t=n.valueAsDate||new Date(r);T(a.value)&&(e=t>new Date(a.value)),T(o.value)&&(s=t<new Date(o.value))}else{const t=n.valueAsNumber||+r;i(a.value)||(e=t>a.value),i(o.value)||(s=t<o.value)}if((e||s)&&(L(!!e,a.message,o.message,A,x),!t))return D(C[g].message),C}if((c||d)&&!B&&T(r)){const e=Ee(c),s=Ee(d),a=!i(e.value)&&r.length>e.value,n=!i(s.value)&&r.length<s.value;if((a||n)&&(L(a,e.message,s.message),!t))return D(C[g].message),C}if(m&&!B&&T(r)){const{value:e,message:s}=Ee(m);if(we(e)&&!r.match(e)&&(C[g]={type:w,message:s,ref:n,...U(w,s)},!t))return D(s),C}if(h)if(M(h)){const e=Ce(await h(r),b);if(e&&(C[g]={...e,...U(S,e.message)},!t))return D(e.message),C}else if(u(h)){let e={};for(const s in h){if(!j(e)&&!t)break;const a=Ce(await h[s](r),b,s);a&&(e={...a,...U(s,a.message)},D(a.message),t&&(C[g]=e))}if(!j(e)&&(C[g]={ref:b,...e},!t))return C}return D(!0),C};const Oe={mode:_,reValidateMode:p,shouldFocusError:!0};function Ne(e={}){let r,t={...Oe,...e},s={isDirty:!1,isValidating:!1,dirtyFields:{},isSubmitted:!1,submitCount:0,touchedFields:{},isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,errors:{}},o={},u=K(t.defaultValues)||{},g=t.shouldUnregister?{}:K(u),p={action:!1,mount:!1,watch:!1},_={mount:new Set,unMount:new Set,array:new Set,watch:new Set},v=0,A={};const x={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},F={watch:ne(),array:ne(),state:ne()},V=ue(t.mode),w=ue(t.reValidateMode),k=t.criteriaMode===b,S=async e=>{let r=!1;return x.isValid&&(r=t.resolver?j((await O()).errors):await B(o,!0),e||r===s.isValid||(s.isValid=r,F.state.next({isValid:r}))),r},D=(e,r,t,s)=>{const a=y(o,e);if(a){const n=y(g,e,f(t)?y(u,e):t);f(n)||s&&s.defaultChecked||r?$(g,e,r?n:Ve(a._f)):R(e,n),p.mount&&S()}},C=(e,r,t,a,n)=>{let i=!1;const o={name:e},l=y(s.touchedFields,e);if(x.isDirty){const e=s.isDirty;s.isDirty=o.isDirty=L(),i=e!==o.isDirty}if(x.dirtyFields&&(!t||a)){const t=y(s.dirtyFields,e);oe(y(u,e),r)?te(s.dirtyFields,e):$(s.dirtyFields,e,!0),o.dirtyFields=s.dirtyFields,i=i||t!==y(s.dirtyFields,e)}return t&&!l&&($(s.touchedFields,e,t),o.touchedFields=s.touchedFields,i=i||x.touchedFields&&l!==t),i&&n&&F.state.next(o),i?o:{}},E=async(t,a,n,i)=>{const o=y(s.errors,t),u=x.isValid&&s.isValid!==a;var l;if(e.delayError&&n?(l=()=>((e,r)=>{$(s.errors,e,r),F.state.next({errors:s.errors})})(t,n),r=e=>{clearTimeout(v),v=window.setTimeout(l,e)},r(e.delayError)):(clearTimeout(v),r=null,n?$(s.errors,t,n):te(s.errors,t)),(n?!oe(o,n):o)||!j(i)||u){const e={...i,...u?{isValid:a}:{},errors:s.errors,name:t};s={...s,...e},F.state.next(e)}A[t]--,x.isValidating&&!Object.values(A).some((e=>e))&&(F.state.next({isValidating:!1}),A={})},O=async e=>t.resolver?await t.resolver({...g},t.context,((e,r,t,s)=>{const a={};for(const n of e){const e=y(r,n);e&&$(a,n,e._f)}return{criteriaMode:t,names:[...e],fields:a,shouldUseNativeValidation:s}})(e||_.mount,o,t.criteriaMode,t.shouldUseNativeValidation)):{},B=async(e,r,a={valid:!0})=>{for(const n in e){const i=e[n];if(i){const{_f:e,...n}=i;if(e){const n=await je(i,y(g,e.name),k,t.shouldUseNativeValidation);if(n[e.name]&&(a.valid=!1,r))break;r||(n[e.name]?$(s.errors,e.name,n[e.name]):te(s.errors,e.name))}n&&await B(n,r,a)}}return a.valid},L=(e,r)=>(e&&r&&$(g,e,r),!oe(Q(),u)),q=(e,r,t)=>{const s={...p.mount?g:f(r)?u:T(e)?{[e]:r}:r};return U(e,_,s,t)},R=(e,r,t={})=>{const s=y(o,e);let n=r;if(s){const t=s._f;t&&(!t.disabled&&$(g,e,Ae(r,t)),n=J&&de(t.ref)&&i(r)?"":r,fe(t.ref)?[...t.ref.options].forEach((e=>e.selected=n.includes(e.value))):t.refs?a(t.ref)?t.refs.length>1?t.refs.forEach((e=>!e.disabled&&(e.checked=Array.isArray(n)?!!n.find((r=>r===e.value)):n===e.value))):t.refs[0]&&(t.refs[0].checked=!!n):t.refs.forEach((e=>e.checked=e.value===n)):ce(t.ref)?t.ref.value="":(t.ref.value=n,t.ref.type||F.watch.next({name:e})))}(t.shouldDirty||t.shouldTouch)&&C(e,n,t.shouldTouch,t.shouldDirty,!0),t.shouldValidate&&G(e)},I=(e,r,t)=>{for(const s in r){const a=r[s],i=`${e}.${s}`,u=y(o,i);!_.array.has(e)&&ie(a)&&(!u||u._f)||n(a)?R(i,a,t):I(i,a,t)}},W=(e,r,t={})=>{const a=y(o,e),n=_.array.has(e),l=K(r);$(g,e,l),n?(F.array.next({name:e,values:g}),(x.isDirty||x.dirtyFields)&&t.shouldDirty&&(s.dirtyFields=pe(u,g),F.state.next({name:e,dirtyFields:s.dirtyFields,isDirty:L(e,l)}))):!a||a._f||i(l)?R(e,l,t):I(e,l,t),z(e,_)&&F.state.next({}),F.watch.next({name:e})},P=async e=>{const a=e.target;let n=a.name;const i=y(o,n);if(i){let c,d;const f=a.type?Ve(i._f):l(e),p=e.type===m||e.type===h,v=!((u=i._f).mount&&(u.required||u.min||u.max||u.maxLength||u.minLength||u.pattern||u.validate))&&!t.resolver&&!y(s.errors,n)&&!i._f.deps||((e,r,t,s,a)=>!a.isOnAll&&(!t&&a.isOnTouch?!(r||e):(t?s.isOnBlur:a.isOnBlur)?!e:!(t?s.isOnChange:a.isOnChange)||e))(p,y(s.touchedFields,n),s.isSubmitted,w,V),b=z(n,_,p);$(g,n,f),p?(i._f.onBlur&&i._f.onBlur(e),r&&r(0)):i._f.onChange&&i._f.onChange(e);const x=C(n,f,p,!1),D=!j(x)||b;if(!p&&F.watch.next({name:n,type:e.type}),v)return D&&F.state.next({name:n,...b?{}:x});if(!p&&b&&F.state.next({}),A[n]=(A[n],1),F.state.next({isValidating:!0}),t.resolver){const{errors:e}=await O([n]),r=Se(s.errors,o,n),t=Se(e,o,r.name||n);c=t.error,n=t.name,d=j(e)}else c=(await je(i,y(g,n),k,t.shouldUseNativeValidation))[n],d=await S(!0);i._f.deps&&G(i._f.deps),E(n,d,c,x)}var u},G=async(e,r={})=>{let a,n;const i=N(e);if(F.state.next({isValidating:!0}),t.resolver){const r=await(async e=>{const{errors:r}=await O();if(e)for(const t of e){const e=y(r,t);e?$(s.errors,t,e):te(s.errors,t)}else s.errors=r;return r})(f(e)?e:i);a=j(r),n=e?!i.some((e=>y(r,e))):a}else e?(n=(await Promise.all(i.map((async e=>{const r=y(o,e);return await B(r&&r._f?{[e]:r}:r)})))).every(Boolean),(n||s.isValid)&&S()):n=a=await B(o);return F.state.next({...!T(e)||x.isValid&&a!==s.isValid?{}:{name:e},...t.resolver?{isValid:a}:{},errors:s.errors,isValidating:!1}),r.shouldFocus&&!n&&H(o,(e=>y(s.errors,e)),e?i:_.mount),n},Q=e=>{const r={...u,...p.mount?g:{}};return f(e)?r:T(e)?y(r,e):e.map((e=>y(r,e)))},X=(e,r)=>({invalid:!!y((r||s).errors,e),isDirty:!!y((r||s).dirtyFields,e),isTouched:!!y((r||s).touchedFields,e),error:y((r||s).errors,e)}),Y=(e,r={})=>{for(const a of e?N(e):_.mount)_.mount.delete(a),_.array.delete(a),y(o,a)&&(r.keepValue||(te(o,a),te(g,a)),!r.keepError&&te(s.errors,a),!r.keepDirty&&te(s.dirtyFields,a),!r.keepTouched&&te(s.touchedFields,a),!t.shouldUnregister&&!r.keepDefaultValue&&te(u,a));F.watch.next({}),F.state.next({...s,...r.keepDirty?{isDirty:L()}:{}}),!r.keepIsValid&&S()},Z=(e,r={})=>{let s=y(o,e);const n=le(r.disabled);return $(o,e,{_f:{...s&&s._f?s._f:{ref:{name:e}},name:e,mount:!0,...r}}),_.mount.add(e),s?n&&$(g,e,r.disabled?void 0:y(g,e,Ve(s._f))):D(e,!0,r.value),{...n?{disabled:r.disabled}:{},...t.shouldUseNativeValidation?{required:!!r.required,min:ke(r.min),max:ke(r.max),minLength:ke(r.minLength),maxLength:ke(r.maxLength),pattern:ke(r.pattern)}:{},name:e,onChange:P,onBlur:P,ref:n=>{if(n){Z(e,r),s=y(o,e);const t=f(n.value)&&n.querySelectorAll&&n.querySelectorAll("input,select,textarea")[0]||n,i=(e=>ye(e)||a(e))(t),l=s._f.refs||[];if(i?l.find((e=>e===t)):t===s._f.ref)return;$(o,e,{_f:{...s._f,...i?{refs:[...l.filter(me),t,...Array.isArray(y(u,e))?[{}]:[]],ref:{type:t.type,name:e}}:{ref:t}}}),D(e,!1,void 0,t)}else s=y(o,e,{}),s._f&&(s._f.mount=!1),(t.shouldUnregister||r.shouldUnregister)&&(!c(_.array,e)||!p.action)&&_.unMount.add(e)}}};return{control:{register:Z,unregister:Y,getFieldState:X,_executeSchema:O,_getWatch:q,_getDirty:L,_updateValid:S,_removeUnmounted:()=>{for(const e of _.unMount){const r=y(o,e);r&&(r._f.refs?r._f.refs.every((e=>!me(e))):!me(r._f.ref))&&Y(e)}_.unMount=new Set},_updateFieldArray:(e,r=[],t,a,n=!0,i=!0)=>{if(a&&t){if(p.action=!0,i&&Array.isArray(y(o,e))){const r=t(y(o,e),a.argA,a.argB);n&&$(o,e,r)}if(x.errors&&i&&Array.isArray(y(s.errors,e))){const r=t(y(s.errors,e),a.argA,a.argB);n&&$(s.errors,e,r),((e,r)=>{!d(y(e,r)).length&&te(e,r)})(s.errors,e)}if(x.touchedFields&&i&&Array.isArray(y(s.touchedFields,e))){const r=t(y(s.touchedFields,e),a.argA,a.argB);n&&$(s.touchedFields,e,r)}x.dirtyFields&&(s.dirtyFields=pe(u,g)),F.state.next({isDirty:L(e,r),dirtyFields:s.dirtyFields,errors:s.errors,isValid:s.isValid})}else $(g,e,r)},_getFieldArray:r=>d(y(p.mount?g:u,r,e.shouldUnregister?y(u,r,[]):[])),_subjects:F,_proxyFormState:x,get _fields(){return o},get _formValues(){return g},get _stateFlags(){return p},set _stateFlags(e){p=e},get _defaultValues(){return u},get _names(){return _},set _names(e){_=e},get _formState(){return s},set _formState(e){s=e},get _options(){return t},set _options(e){t={...t,...e}}},trigger:G,register:Z,handleSubmit:(e,r)=>async a=>{a&&(a.preventDefault&&a.preventDefault(),a.persist&&a.persist());let n=!0,i=K(g);F.state.next({isSubmitting:!0});try{if(t.resolver){const{errors:e,values:r}=await O();s.errors=e,i=r}else await B(o);j(s.errors)?(F.state.next({errors:{},isSubmitting:!0}),await e(i,a)):(r&&await r({...s.errors},a),t.shouldFocusError&&H(o,(e=>y(s.errors,e)),_.mount))}catch(u){throw n=!1,u}finally{s.isSubmitted=!0,F.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:j(s.errors)&&n,submitCount:s.submitCount+1,errors:s.errors})}},watch:(e,r)=>M(e)?F.watch.subscribe({next:t=>e(q(void 0,r),t)}):q(e,r,!0),setValue:W,getValues:Q,reset:(r,t={})=>{const a=r||u,n=K(a),i=r&&!j(r)?n:u;if(t.keepDefaultValues||(u=a),!t.keepValues){if(t.keepDirtyValues)for(const e of _.mount)y(s.dirtyFields,e)?$(i,e,y(g,e)):W(e,y(i,e));else{if(J&&f(r))for(const e of _.mount){const r=y(o,e);if(r&&r._f){const e=Array.isArray(r._f.refs)?r._f.refs[0]:r._f.ref;try{de(e)&&e.closest("form").reset();break}catch(l){}}}o={}}g=e.shouldUnregister?t.keepDefaultValues?K(u):{}:n,F.array.next({values:i}),F.watch.next({values:i})}_={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},p.mount=!x.isValid||!!t.keepIsValid,p.watch=!!e.shouldUnregister,F.state.next({submitCount:t.keepSubmitCount?s.submitCount:0,isDirty:t.keepDirty||t.keepDirtyValues?s.isDirty:!(!t.keepDefaultValues||oe(r,u)),isSubmitted:!!t.keepIsSubmitted&&s.isSubmitted,dirtyFields:t.keepDirty||t.keepDirtyValues?s.dirtyFields:t.keepDefaultValues&&r?pe(u,r):{},touchedFields:t.keepTouched?s.touchedFields:{},errors:t.keepErrors?s.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})},resetField:(e,r={})=>{y(o,e)&&(f(r.defaultValue)?W(e,y(u,e)):(W(e,r.defaultValue),$(u,e,r.defaultValue)),r.keepTouched||te(s.touchedFields,e),r.keepDirty||(te(s.dirtyFields,e),s.isDirty=r.defaultValue?L(e,y(u,e)):L()),r.keepError||(te(s.errors,e),x.isValid&&S()),F.state.next({...s}))},clearErrors:e=>{e?N(e).forEach((e=>te(s.errors,e))):s.errors={},F.state.next({errors:s.errors})},unregister:Y,setError:(e,r,t)=>{const a=(y(o,e,{_f:{}})._f||{}).ref;$(s.errors,e,{...r,ref:a}),F.state.next({name:e,errors:s.errors,isValid:!1}),t&&t.shouldFocus&&a&&a.focus&&a.focus()},setFocus:(e,r={})=>{const t=y(o,e)._f,s=t.refs?t.refs[0]:t.ref;s.focus(),r.shouldSelect&&s.select()},getFieldState:X}}function Be(e={}){const r=s.useRef(),[t,a]=s.useState({isDirty:!1,isValidating:!1,dirtyFields:{},isSubmitted:!1,submitCount:0,touchedFields:{},isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,errors:{}});r.current?r.current.control._options=e:r.current={...Ne(e),formState:t};const n=r.current.control,i=s.useCallback((e=>{O(e,n._proxyFormState,!0)&&(n._formState={...n._formState,...e},a({...n._formState}))}),[n]);return B({subject:n._subjects.state,callback:i}),s.useEffect((()=>{n._stateFlags.mount||(n._proxyFormState.isValid&&n._updateValid(),n._stateFlags.mount=!0),n._stateFlags.watch&&(n._stateFlags.watch=!1,n._subjects.state.next({})),n._removeUnmounted()})),r.current.formState=E(t,n._proxyFormState),r.current}}}]);