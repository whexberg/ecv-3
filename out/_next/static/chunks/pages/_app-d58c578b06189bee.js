(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[636],{8424:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(4561)}])},5157:(e,t,r)=>{"use strict";function l(e,t,r,l){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return l}}),r(2063),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6397:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return v}});let l=r(7677),n=r(4848),a=l._(r(6540)),o=r(6847),s=r(7785),u=r(2772),c=r(1278),i=r(6185),f=r(7644),d=r(6334),p=r(5157),h=r(296),b=r(1903),m=new Set;function x(e,t,r,l){if((0,s.isLocalURL)(t)){if(!l.bypassPrefetchedCheck){let n=t+"%"+r+"%"+(void 0!==l.locale?l.locale:"locale"in e?e.locale:void 0);if(m.has(n))return;m.add(n)}e.prefetch(t,r,l).catch(e=>{})}}function y(e){return"string"==typeof e?e:(0,u.formatUrl)(e)}let v=a.default.forwardRef(function(e,t){let r,l;let{href:u,as:m,children:v,prefetch:g=null,passHref:j,replace:_,shallow:w,scroll:N,locale:M,onClick:k,onMouseEnter:C,onTouchStart:O,legacyBehavior:P=!1,...E}=e;r=v,P&&("string"==typeof r||"number"==typeof r)&&(r=(0,n.jsx)("a",{children:r}));let L=a.default.useContext(f.RouterContext),R=!1!==g,{href:S,as:T}=a.default.useMemo(()=>{if(!L){let e=y(u);return{href:e,as:m?y(m):e}}let[e,t]=(0,o.resolveHref)(L,u,!0);return{href:e,as:m?(0,o.resolveHref)(L,m):t||e}},[L,u,m]),D=a.default.useRef(S),I=a.default.useRef(T);P&&(l=a.default.Children.only(r));let F=P?l&&"object"==typeof l&&l.ref:t,[A,H,U]=(0,d.useIntersection)({rootMargin:"200px"}),z=a.default.useCallback(e=>{(I.current!==T||D.current!==S)&&(U(),I.current=T,D.current=S),A(e)},[T,S,U,A]),G=(0,b.useMergedRef)(z,F);a.default.useEffect(()=>{L&&H&&R&&x(L,S,T,{locale:M})},[T,S,H,M,R,null==L?void 0:L.locale,L]);let K={ref:G,onClick(e){P||"function"!=typeof k||k(e),P&&l.props&&"function"==typeof l.props.onClick&&l.props.onClick(e),L&&!e.defaultPrevented&&function(e,t,r,l,n,a,o,u){let{nodeName:c}=e.currentTarget;"A"===c.toUpperCase()&&(function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!(0,s.isLocalURL)(r))||(e.preventDefault(),(()=>{let e=null==o||o;"beforePopState"in t?t[n?"replace":"push"](r,l,{shallow:a,locale:u,scroll:e}):t[n?"replace":"push"](l||r,{scroll:e})})())}(e,L,S,T,_,w,N,M)},onMouseEnter(e){P||"function"!=typeof C||C(e),P&&l.props&&"function"==typeof l.props.onMouseEnter&&l.props.onMouseEnter(e),L&&x(L,S,T,{locale:M,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){P||"function"!=typeof O||O(e),P&&l.props&&"function"==typeof l.props.onTouchStart&&l.props.onTouchStart(e),L&&x(L,S,T,{locale:M,priority:!0,bypassPrefetchedCheck:!0})}};if((0,c.isAbsoluteUrl)(T))K.href=T;else if(!P||j||"a"===l.type&&!("href"in l.props)){let e=void 0!==M?M:null==L?void 0:L.locale,t=(null==L?void 0:L.isLocaleDomain)&&(0,p.getDomainLocale)(T,e,null==L?void 0:L.locales,null==L?void 0:L.domainLocales);K.href=t||(0,h.addBasePath)((0,i.addLocale)(T,e,null==L?void 0:L.defaultLocale))}return P?a.default.cloneElement(l,K):(0,n.jsx)("a",{...E,...K,children:r})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6334:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return u}});let l=r(6540),n=r(4959),a="function"==typeof IntersectionObserver,o=new Map,s=[];function u(e){let{rootRef:t,rootMargin:r,disabled:u}=e,c=u||!a,[i,f]=(0,l.useState)(!1),d=(0,l.useRef)(null),p=(0,l.useCallback)(e=>{d.current=e},[]);return(0,l.useEffect)(()=>{if(a){if(c||i)return;let e=d.current;if(e&&e.tagName)return function(e,t,r){let{id:l,observer:n,elements:a}=function(e){let t;let r={root:e.root||null,margin:e.rootMargin||""},l=s.find(e=>e.root===r.root&&e.margin===r.margin);if(l&&(t=o.get(l)))return t;let n=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=n.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:n},s.push(r),o.set(r,t),t}(r);return a.set(e,t),n.observe(e),function(){if(a.delete(e),n.unobserve(e),0===a.size){n.disconnect(),o.delete(l);let e=s.findIndex(e=>e.root===l.root&&e.margin===l.margin);e>-1&&s.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:r})}else if(!i){let e=(0,n.requestIdleCallback)(()=>f(!0));return()=>(0,n.cancelIdleCallback)(e)}},[c,r,t,i,d.current]),[p,i,(0,l.useCallback)(()=>{f(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1903:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return n}});let l=r(6540);function n(e,t){let r=(0,l.useRef)(()=>{}),n=(0,l.useRef)(()=>{});return(0,l.useMemo)(()=>e&&t?l=>{null===l?(r.current(),n.current()):(r.current=a(e,l),n.current=a(t,l))}:e||t,[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4561:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>b});var l=r(4848);r(6557);var n=r(8285),a=r.n(n),o=r(4877),s=r.n(o),u=r(6540);let c=()=>{let e=new Date().getFullYear(),t="Lord Sholto Douglas Chapter E Clampus Vitus";return 2025===e?(0,l.jsx)("footer",{className:"py-4",children:(0,l.jsx)("div",{className:"container mx-auto px-4 text-center",children:(0,l.jsxs)("p",{children:["\xa9 2025 ",t,". All rights reserved."]})})}):(0,l.jsx)("footer",{className:"py-4",children:(0,l.jsx)("div",{className:"container mx-auto px-4 text-center",children:(0,l.jsxs)("p",{children:["\xa9 2025 - ",new Date().getFullYear()," ",t,". All rights reserved."]})})})};var i=r(1106),f=r.n(i);let d=[{href:"/",text:"Home"},{href:"/hall-of-humbugery",text:"Hall of Humbugery"},{href:"/board-members",text:"Board Members"},{href:"/calendar",text:"Calendar"}],p=()=>{let[e,t]=(0,u.useState)(!1),r=()=>t(!e);return(0,u.useEffect)(()=>(e?document.body.classList.add("overflow-hidden"):document.body.classList.remove("overflow-hidden"),()=>document.body.classList.remove("overflow-hidden")),[e]),(0,l.jsxs)("header",{className:"bg-red-800 text-white py-4",children:[(0,l.jsxs)("div",{className:"container mx-auto px-4 flex items-center justify-between",children:[(0,l.jsx)(f(),{href:"/",children:(0,l.jsx)("h1",{className:"text-2xl font-bold",children:"Lord Sholto Douglas, ECV Chapter #3"})}),(0,l.jsxs)("button",{onClick:r,className:"z-40 flex flex-col cursor-pointer items-center justify-center w-10 h-10 gap-1 ","aria-label":"Toggle Menu",children:[(0,l.jsx)("span",{className:"block w-6 h-1 bg-white"}),(0,l.jsx)("span",{className:"block w-6 h-1 bg-white"}),(0,l.jsx)("span",{className:"block w-6 h-1 bg-white"})]})]}),(0,l.jsxs)("div",{className:"fixed top-0 z-50 right-0 w-64 h-full bg-red-800 text-white transform transition-transform duration-300 ".concat(e?"translate-x-0":"translate-x-full"),children:[(0,l.jsxs)("button",{onClick:r,className:"flex flex-col items-center justify-center w-10 h-10 gap-1 text-white rounded-md focus:outline-none","aria-label":"Toggle Menu",children:[(0,l.jsx)("span",{className:"block w-6 h-1 bg-white transition-transform rotate-45 translate-y-2"}),(0,l.jsx)("span",{className:"block w-6 h-1 bg-white transition-opacity opacity-0"}),(0,l.jsx)("span",{className:"block w-6 h-1 bg-white transition-transform -rotate-45 -translate-y-2"})]}),(0,l.jsx)("nav",{className:"mt-16",children:(0,l.jsx)("ul",{className:"flex flex-col space-y-4 px-6",children:d.map(e=>{let{href:t,text:n}=e;return(0,l.jsx)("li",{children:(0,l.jsx)(f(),{href:t,className:"hover:underline",onClick:r,children:n})},t)})})})]}),e&&(0,l.jsx)("div",{onClick:r,className:"fixed inset-0 bg-black/50 z-40"})]})},h=e=>{let{children:t}=e;return(0,l.jsx)("main",{className:"flex-grow",children:t})};function b(e){let{Component:t,pageProps:r}=e;return(0,u.useEffect)(()=>(document.body.classList.add(s().variable,a().variable),()=>{document.body.classList.remove(s().variable,a().variable)}),[]),(0,l.jsxs)("div",{className:"antialiased flex flex-col min-h-screen border-2 border-gray-200",children:[(0,l.jsx)(p,{}),(0,l.jsx)(h,{children:(0,l.jsx)(t,{...r})}),(0,l.jsx)(c,{})]})}},6557:()=>{},8285:e=>{e.exports={style:{fontFamily:"'Geist', 'Geist Fallback'",fontStyle:"normal"},className:"__className_4d318d",variable:"__variable_4d318d"}},4877:e=>{e.exports={style:{fontFamily:"'Geist Mono', 'Geist Mono Fallback'",fontStyle:"normal"},className:"__className_ea5f4b",variable:"__variable_ea5f4b"}},1106:(e,t,r)=>{e.exports=r(6397)}},e=>{var t=t=>e(e.s=t);e.O(0,[593,792],()=>(t(8424),t(8440))),_N_E=e.O()}]);