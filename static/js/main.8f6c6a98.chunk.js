(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[4],{232:function(e,t,n){},234:function(e,t,n){},259:function(e,t,n){"use strict";n.r(t);n(135),n(136),n(137),n(117);var c=n(0),r=n.n(c),a=n(87),o=n.n(a),s=(n(232),n(2)),i=(n(233),n(234),n(132)),l=n(7),u=n(1),d=["component"],j=function(e){var t=e.component,n=Object(i.a)(e,d);return Object(u.jsx)(l.b,Object(s.a)(Object(s.a)({},n),{},{render:function(e){return localStorage.getItem("accessToken")?Object(u.jsx)(t,Object(s.a)({},e)):Object(u.jsx)(l.a,{to:{pathname:"".concat("/filmapp-react-frontend/","login"),state:{from:e.location}}})}}))},b=n(52),h=n(85),f=function(){var e=Object(c.useContext)(b.a),t=e.removeModalData,n=e.remove,r=e.clear;return Object(u.jsxs)(h.a,{id:"removeModal",title:"Delete ".concat(t.type),onClose:function(){return r()},hide:!0,footer:Object(u.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(){return n()},children:"Delete"}),children:["Do you really want to delete ",t.type," ",Object(u.jsx)("b",{children:t.title}),"?",Object(u.jsx)("br",{}),"Action cannot be undone!"]})},O=n(64),m=n(123),g=n(35),p=n(60),x=n(86),v=n(30),y=n(51),k=function(e){var t=e.children,n=Object(c.useContext)(y.a).logout;return Object(c.useMemo)((function(){v.a.interceptors.response.use((function(e){return e}),(function(e){var t=localStorage.getItem("accessToken"),c=e.config;return e.response&&401===e.response.status&&t&&!c._retry?"auth/refresh"===e.config.url?(n(),Promise.reject(e)):(c._retry=!0,Object(x.c)({refreshToken:JSON.parse(localStorage.getItem("refreshToken"))}).then((function(e){if(201===e.status){var t=e.data.token;return localStorage.setItem("accessToken",JSON.stringify(t)),c.headers.Authorization="Bearer "+t,Object(v.a)(c)}}))):Promise.reject(e)}))}),[]),t},w=n(29),N=n(83),S=function(e){var t=e.children,n=Object(l.h)().pathname,r=Object(c.useState)({name:"",id:null,auth:!1,isInitialLoaded:!1}),a=Object(w.a)(r,2),o=a[0],i=a[1];Object(c.useEffect)((function(){window.scrollTo(0,0)}),[n]),Object(c.useEffect)((function(){!function(){var e=localStorage.getItem("accessToken");if(e){var t=Object(N.a)(e);i((function(){return{name:t.name,auth:!0,id:t.id,isInitialLoaded:!0}}))}else i((function(e){return Object(s.a)(Object(s.a)({},e),{},{isInitialLoaded:!0})}))}()}),[]);return Object(u.jsx)(y.a.Provider,{value:{user:o,login:function(e,t,n,c){localStorage.setItem("accessToken",JSON.stringify(n)),localStorage.setItem("refreshToken",JSON.stringify(c)),i((function(){return{name:e,auth:!0,id:t,isInitialLoaded:!0}}))},logout:function(){localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),i((function(e){return Object(s.a)(Object(s.a)({},e),{},{name:"",auth:!1,id:null})}))},clearUser:function(){i((function(e){return Object(s.a)(Object(s.a)({},e),{},{isInitialLoaded:!1})}))},updateUser:function(e){localStorage.setItem("accessToken",JSON.stringify(e));var t=Object(N.a)(e);i((function(e){return Object(s.a)(Object(s.a)({},e),{},{name:t.name})})),window.location.reload()}},children:t})},I=n(10),T=n(11),C=n(19),P=n(18),z=n.p+"static/media/error_500.b91562a5.svg",R=function(e){Object(C.a)(n,e);var t=Object(P.a)(n);function n(e){var c;return Object(I.a)(this,n),(c=t.call(this,e)).state={hasError:!1},c}return Object(T.a)(n,[{key:"componentDidCatch",value:function(e,t){console.error("BoundaryError",e),console.error("BoundaryError",t)}},{key:"render",value:function(){return this.state.hasError?Object(u.jsxs)(u.Fragment,{children:[this.props.children[1].props.children[0],Object(u.jsxs)("div",{className:"text-center",children:[Object(u.jsx)("div",{className:"col-12 col-sm-12 my-4 px-4",children:Object(u.jsx)("div",{className:"ratio ratio-21x9",children:Object(u.jsx)("img",{className:"embed-responsive-item",src:z,alt:""})})}),Object(u.jsx)("h1",{children:"Something went wrong!"}),Object(u.jsx)("h5",{children:"Try reloading this page"}),Object(u.jsx)("div",{className:"btn btn-success",children:"Reload page"})]})]}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),n}(r.a.Component);m.b.add(g.f,g.h,g.i,g.m,g.l,g.d,g.e);var E="/filmapp-react-frontend/",J=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(8),n.e(16)]).then(n.bind(null,437))})),D=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(19)]).then(n.bind(null,439))})),L=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(21)]).then(n.bind(null,440))})),B=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(7),n.e(3),n.e(20)]).then(n.bind(null,436))})),M=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(9),n.e(10)]).then(n.bind(null,438))})),_=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(11)]).then(n.bind(null,441))})),A=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(17)]).then(n.bind(null,442))})),F=Object(c.lazy)((function(){return n.e(22).then(n.bind(null,443))})),U=Object(c.lazy)((function(){return n.e(13).then(n.bind(null,432))})),W=Object(c.lazy)((function(){return n.e(15).then(n.bind(null,433))})),$=Object(c.lazy)((function(){return n.e(12).then(n.bind(null,434))})),q=Object(c.lazy)((function(){return n.e(14).then(n.bind(null,435))})),G=Object(c.lazy)((function(){return n.e(18).then(n.bind(null,444))}));var H=function(){var e=Object(c.useContext)(p.a).toast;return Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{className:"toast-root",children:Object(u.jsxs)("div",{className:"toast bg-secondary",id:"mainToast","data-bs-autohide":"false",role:"alert","aria-live":"assertive","aria-atomic":"true",children:[Object(u.jsx)("div",{className:"toast-header",children:Object(u.jsx)("strong",{className:"me-auto",children:e.header})}),Object(u.jsx)("div",{className:"toast-body",children:e.message})]})}),Object(u.jsx)(O.a,{children:Object(u.jsx)(S,{children:Object(u.jsx)(k,{children:Object(u.jsxs)(R,{children:[Object(u.jsxs)(c.Suspense,{fallback:Object(u.jsx)(u.Fragment,{}),children:[Object(u.jsx)(j,{exact:!0,path:["".concat(E,"settings"),"".concat(E,"profile/settings"),"".concat(E,"film/:id/settings"),"".concat(E,"search/settings"),"".concat(E,"add/settings"),"".concat(E,"playlists/settings")],component:G}),Object(u.jsx)(l.b,{exact:!0,path:["".concat(E,"login"),"".concat(E,"film/:id/login"),"".concat(E,"search/login"),"".concat(E,"add/login"),"".concat(E,"playlists/login")],render:function(e){return Object(u.jsx)(U,Object(s.a)({},e))}}),Object(u.jsx)(l.b,{exact:!0,path:["".concat(E,"register"),"".concat(E,"film/:id/register"),"".concat(E,"search/register"),"".concat(E,"add/register"),"".concat(E,"playlists/register")],render:function(e){return Object(u.jsx)(q,Object(s.a)({},e))}}),Object(u.jsx)(l.b,{exact:!0,path:["".concat(E,"reset/:token"),"".concat(E,"film/:id/reset/:token"),"".concat(E,"search/reset/:token"),"".concat(E,"add/reset/:token"),"".concat(E,"playlists/reset/:token")],render:function(e){return Object(u.jsx)(W,Object(s.a)({},e))}}),Object(u.jsx)(l.b,{exact:!0,path:["".concat(E,"forgot"),"".concat(E,"film/:id/forgot"),"".concat(E,"search/forgot"),"".concat(E,"add/forgot"),"".concat(E,"playlists/forgot")],render:function(e){return Object(u.jsx)($,Object(s.a)({},e))}})]}),Object(u.jsxs)(c.Suspense,{fallback:Object(u.jsxs)("div",{className:"suspense-loader",children:[" ",Object(u.jsx)("div",{className:"spinner-border"})]}),children:[Object(u.jsx)(l.b,{render:function(){return Object(u.jsx)(J,{})}}),Object(u.jsxs)(l.d,{children:[Object(u.jsx)(l.b,{exact:!0,path:["".concat(E,"film/:id"),"".concat(E,"film/:id/login"),"".concat(E,"film/:id/register"),"".concat(E,"film/:id/reset/:token"),"".concat(E,"film/:id/forgot"),"".concat(E,"film/:id/settings")],render:function(e){return Object(u.jsx)(B,Object(s.a)({},e))}}),Object(u.jsx)(l.b,{exact:!0,path:["".concat(E),"".concat(E,"login"),"".concat(E,"register"),"".concat(E,"settings"),"".concat(E,"reset/:token"),"".concat(E,"forgot")],render:function(e){return Object(u.jsx)(L,Object(s.a)({},e))}}),Object(u.jsx)(l.b,{exact:!0,path:["".concat(E,"search"),"".concat(E,"search/login"),"".concat(E,"search/settings"),"".concat(E,"search/register"),"".concat(E,"search/reset/:token"),"".concat(E,"search/forgot")],render:function(e){return Object(u.jsx)(M,Object(s.a)({},e))}}),Object(u.jsx)(l.b,{exact:!0,path:["".concat(E,"playlists"),"".concat(E,"playlists/login"),"".concat(E,"playlists/settings"),"".concat(E,"playlists/register"),"".concat(E,"playlists/reset/:token"),"".concat(E,"playlists/forgot")],render:function(e){return Object(u.jsx)(_,Object(s.a)({},e))}}),Object(u.jsx)(j,{exact:!0,path:["".concat(E,"add"),"".concat(E,"add/settings")],component:A}),Object(u.jsx)(j,{exact:!0,path:["".concat(E,"profile"),"".concat(E,"profile/settings")],component:D}),Object(u.jsx)(l.b,{exact:!0,path:"*",render:function(e){return Object(u.jsx)(F,Object(s.a)({},e))}})]})]})]})})})}),Object(u.jsx)(f,{})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var K=n(42),Q=function(e){var t=e.children,n=2350,r=Object(c.useState)({header:"",message:"",isPrevoius:!1}),a=Object(w.a)(r,2),o=a[0],s=a[1],i=Object(c.useRef)(null),l=Object(c.useRef)(null);return Object(u.jsx)(p.a.Provider,{value:{toast:o,createToast:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Playlist",c=K.d.getOrCreateInstance("#mainToast");i.current&&(console.log("hide",i.current),clearTimeout(i.current),i.current=null),o.isPrevoius?(c.hide(),l.current&&(console.log("toastShow",i.current),clearTimeout(l.current)),l.current=setTimeout((function(){console.log("ladladll"),c.show(),s({header:t,message:e,isPrevoius:!0}),i.current=setTimeout((function(){console.log("ccsda"),c.hide()}),n)}),850)):(c.show(),s({header:t,message:e,isPrevoius:!0}),l.current=setTimeout((function(){c.hide()}),n))}},children:t})},V=function(e){var t=e.children,n=Object(c.useState)({show:!1,isRemoving:!1,id:null,type:null,title:""}),r=Object(w.a)(n,2),a=r[0],o=r[1],i=Object(c.useRef)();return Object(u.jsx)(b.a.Provider,{value:{showModal:function(e,t,n){i.current=K.c.getOrCreateInstance("#removeModal"),i.current.show(),o({show:!0,isRemoving:!1,id:e,type:t,title:n})},removeModalData:a,remove:function(){i.current.hide(),o((function(e){return Object(s.a)(Object(s.a)({},e),{},{show:!1,isRemoving:!0})}))},clear:function(){i.current.hide(),o({show:!1,isRemoving:!1,id:null,type:null,title:""})}},children:t})};o.a.render(Object(u.jsx)(Q,{children:Object(u.jsx)(V,{children:Object(u.jsx)(H,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},30:function(e,t,n){"use strict";var c=n(134),r=n.n(c).a.create({baseURL:"https://marm007-filmapp-backend-node.herokuapp.com/api/"});t.a=r},51:function(e,t,n){"use strict";var c=n(0),r=Object(c.createContext)({name:"",id:null,auth:!1,isInitialLoaded:!1});t.a=r},52:function(e,t,n){"use strict";var c=n(0),r=Object(c.createContext)({show:!1,isRemoving:!1,id:null,type:null,title:""});t.a=r},60:function(e,t,n){"use strict";var c=n(0),r=Object(c.createContext)("");t.a=r},84:function(e,t,n){"use strict";t.a=function(){var e=JSON.parse(localStorage.getItem("accessToken"));return e?{Authorization:"Bearer "+e}:{}}},85:function(e,t,n){"use strict";var c=n(0),r=n(42),a=n(1);t.a=function(e){var t=e.id,n=e.title,o=e.children,s=e.onClose,i=e.footer,l=e.hide,u=Object(c.useRef)(null);Object(c.useEffect)((function(){return u.current=r.c.getOrCreateInstance("#".concat(t)),l?u.current.hide():u.current.show(),function(){u.current.hide()}}),[t,l]);var d=function(){s(),u.current.hide()};return Object(a.jsx)("div",{className:"modal fade",id:t,tabIndex:"-1",children:Object(a.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(a.jsxs)("div",{className:"modal-content",children:[Object(a.jsxs)("div",{className:"modal-header",children:[Object(a.jsx)("h5",{className:"modal-title",children:n}),Object(a.jsx)("button",{type:"button",className:"btn-close",onClick:d})]}),Object(a.jsx)("div",{className:"modal-body",children:o}),Object(a.jsxs)("div",{className:"modal-footer",children:[Object(a.jsx)("button",{type:"button",className:"btn btn-primary",onClick:d,children:"Close"}),i]})]})})})}},86:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"d",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"e",(function(){return l}));var c=n(84),r=n(30),a=function(e){return r.a.post("auth",{},{auth:{username:e.email,password:e.password}})},o=function(e){return r.a.post("users",e)},s=function(e){return r.a.post("auth/refresh",e,{headers:Object(c.a)()})},i=function(e){return r.a.post("auth/password/forgot",e)},l=function(e,t){return r.a.post("auth/password/reset/".concat(e),t)}}},[[259,5,6]]]);
//# sourceMappingURL=main.8f6c6a98.chunk.js.map