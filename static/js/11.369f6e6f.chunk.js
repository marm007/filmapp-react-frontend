(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[11],{277:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"e",(function(){return a})),n.d(t,"d",(function(){return i})),n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return l}));var c=10,a=12,i=10,s=40,l=20},278:function(e,t,n){"use strict";var c=n(0),a=n(292),i=n.n(a),s=function(e,t,n){return e?i()(t,e,n):t};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Object(c.useMemo)((function(){var e,n,c,a,i;return{offset:null!==(e=null===t||void 0===t?void 0:t.offset)&&void 0!==e?e:20,debounce:null!==(n=null===t||void 0===t?void 0:t.debounce)&&void 0!==n?n:200,debounceOptions:null!==(c=null===t||void 0===t?void 0:t.debounceOptions)&&void 0!==c?c:{leading:!0},triggerOnNoScroll:null!==(a=null===t||void 0===t?void 0:t.triggerOnNoScroll)&&void 0!==a&&a,id:null!==(i=null===t||void 0===t?void 0:t.id)&&void 0!==i?i:null}}),[null===t||void 0===t?void 0:t.offset,null===t||void 0===t?void 0:t.debounce,null===t||void 0===t?void 0:t.debounceOptions,null===t||void 0===t?void 0:t.triggerOnNoScroll,null===t||void 0===t?void 0:t.id]),a=n.offset,i=n.triggerOnNoScroll,l=n.debounce,r=n.debounceOptions,o=n.id,u=Object(c.useMemo)((function(){return s(l,e,r)}),[e,l,r]),d=Object(c.useRef)(null),f=Object(c.useCallback)((function(){if(null!=d.current){var e=d.current,t=Math.round(e.scrollTop+e.clientHeight);Math.round(e.scrollHeight-a)<=t&&u()}else if(null!==o){var n=document.getElementById(o);if(n){var c=Math.round(n.scrollTop+n.clientHeight);Math.round(n.scrollHeight-a)<=c&&u()}}else{var i=document.scrollingElement||document.documentElement,s=Math.round(i.scrollTop+window.innerHeight);Math.round(i.scrollHeight-a)<=s&&u()}}),[u,a,o]);return Object(c.useEffect)((function(){var e=d.current,t=document.getElementById(o);return null!=e?e.addEventListener("scroll",f):null!==t?t.addEventListener("scroll",f):window.addEventListener("scroll",f),i&&f(),function(){null!=e?e.removeEventListener("scroll",f):null!==t?t.addEventListener("scroll",f):window.removeEventListener("scroll",f)}}),[f,i,o]),d}},280:function(e,t,n){"use strict";var c=n(29),a=n(298),i=n.n(a),s=n(1);t.a=function(e){var t=e.onClick,n=e.children,a=e.className,l=i()({background:"black"}),r=Object(c.a)(l,2),o=r[0],u=r[1];return Object(s.jsxs)("button",{style:{color:"black"},onClick:function(e){t(e)},onMouseDown:o,className:"btn btn-link button-ripple ".concat(a),children:[n,u]})}},282:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return s})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return r})),n.d(t,"d",(function(){return o}));var c=n(30),a=n(84),i=function(e){return c.a.post("playlists",e,{headers:Object(a.a)()})},s=function(e){return c.a.get("playlists/".concat(e),{headers:Object(a.a)()})},l=function(e){return c.a.get("playlists",{params:e,headers:Object(a.a)()})},r=function(e,t){return c.a.patch("playlists/".concat(e),t,{headers:Object(a.a)()})},o=function(e){return c.a.delete("playlists/".concat(e),{headers:Object(a.a)()})}},287:function(e,t,n){"use strict";var c=n(270),a=n.n(c),i=n(271),s=n(29),l=n(276),r=n(0),o=n(282),u=n(280),d=n(1);t.a=function(e){var t=e.isPublic,n=e.id,c=e.isProfile,f=e.dispatchPrivacyUpdate,p=e.filmDispatch,b=Object(r.useState)(!1),m=Object(s.a)(b,2),j=m[0],h=m[1];Object(r.useEffect)((function(){function e(){return(e=Object(i.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.c(n,{is_public:!t}).then((function(e){h(!1),f({type:"change-playlist-privacy-success",payload:e.data}),void 0!==p&&p({type:"field",fieldName:"reloadPlaylist",payload:!0})})).catch((function(e){console.error(e),h(!1)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}j&&function(){e.apply(this,arguments)}()}),[f,j,t,n,p]);var v=Object(d.jsx)(u.a,{className:"button-ripple-24 p-0",onClick:function(e){e.stopPropagation(),j||h(!0)},children:Object(d.jsx)(l.a,{icon:t?"globe-europe":"lock"})});return c?Object(d.jsx)("div",{className:"col text-center justify-content-center d-flex align-items-center p-0 flex-grow-0",children:Object(d.jsx)("div",{className:"col remove-holder p-0 m-0 flex-grow-0",style:{height:"24px",width:"24"},children:v})}):v}},288:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return l})),n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return o}));var c=n(270),a=n.n(c),i=a.a.mark(o),s=function(e){return!!("path"===e.tagName&&e.parentNode.className.animVal&&e.parentNode.className.animVal.includes("playlist-add-icon")||"svg"===e.tagName&&e.className.animVal&&e.className.animVal.includes("playlist-add-icon")||e.className&&"string"===typeof e.className&&e.className.includes("playlist-add-icon-holder"))},l=function(e){var t=new Date(Date.parse(e.createdAt));return("0"+t.getDate()).slice(-2)+"-"+("0"+(t.getMonth()+1)).slice(-2)+"-"+("0"+t.getFullYear()).slice(-2)+" o "+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)},r=function(e){var t=new Date(Date.parse(e.createdAt)),n=new Date,c=Math.abs(Math.floor((Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes())-Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes()))/6e4));return c/60>=1?(c/=60)/24>=1?(c/=24)/30>=1?(c/=30)/12>=1?(c/=12,c=Math.floor(c)+" years "):c=Math.floor(c)+" months ":c=Math.floor(c)+" days ":c=Math.floor(c)+" hours ":c=Math.floor(c)+" minutes ",c+="ago"};function o(e,t){var n;return a.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:n=0;case 1:if(!(n<e)){c.next=7;break}return c.next=4,t(n);case 4:++n,c.next=1;break;case 7:case"end":return c.stop()}}),i)}},291:function(e,t,n){"use strict";var c=n(29),a=n(0),i=n.n(a),s=function(e){var t=e.target,n=e.onIntersect,c=e.threshold,a=void 0===c?.1:c,s=e.rootMargin,l=void 0===s?"0px":s;i.a.useEffect((function(){var e=new IntersectionObserver(n,{rootMargin:l,threshold:a}),c=t.current;return e.observe(c),function(){e.unobserve(c)}}))},l=(n(297),n(1)),r=function(e){var t=e.src,n=e.thumb,i=e.isCached,s=Object(a.useState)(i),r=Object(c.a)(s,2),o=r[0],u=r[1];return Object(l.jsxs)("div",{className:"ratio ratio-16x9",children:[Object(l.jsx)("img",{className:"image thumb",alt:"",src:n,style:{visibility:o?"hidden":"visible"}}),Object(l.jsx)("img",{onLoad:function(){u(!0)},className:"image full",style:{opacity:o?1:0},alt:"",src:t})]})};t.a=function(e){var t=e.image,n=Object(a.useRef)(),i=Object(a.useState)(!1),o=Object(c.a)(i,2),u=o[0],d=o[1],f=Object(a.useState)(!1),p=Object(c.a)(f,2),b=p[0],m=p[1];return s({target:n,onIntersect:function(e,a){if(Object(c.a)(e,1)[0].isIntersecting){var i=new Image;i.src=t.concat("?width=small_webp"),m(i.complete),d(!0),a.unobserve(n.current)}}}),Object(l.jsx)("div",{ref:n,className:"image-container ratio ratio-16x9 play-image",children:u&&Object(l.jsx)(r,{isCached:b,src:t.concat("?width=small_webp"),thumb:t.concat("?width=preview_webp")})})}},294:function(e,t,n){},297:function(e,t,n){},299:function(e,t,n){"use strict";var c=n(276),a=n(280),i=n(1);t.a=function(e){var t=e.handleRemove;return Object(i.jsx)(a.a,{className:"button-ripple-24 remove-holder p-0",onClick:t,children:Object(i.jsx)(c.a,{icon:"trash-alt"})})}},300:function(e,t,n){"use strict";var c=n(306),a=n.n(c),i=(n(294),n(1));t.a=function(){return Object(i.jsxs)("div",{className:"col mb-5 col-12 col-sm-6 col-md-3 col-lg-2",children:[Object(i.jsx)("div",{className:"col-12 col-sm-12",children:Object(i.jsx)("div",{className:"embed-responsive embed-responsive-16by9 z-depth-1-half play-container",children:Object(i.jsx)("div",{className:"ratio ratio-16x9",children:Object(i.jsx)(a.a,{className:"w-100 h-100",style:{lineHeight:"1.5"}})})})}),Object(i.jsxs)("div",{className:"col-12 col-sm-12 mt-2",children:[Object(i.jsx)("div",{className:"col p-0",children:Object(i.jsx)(a.a,{className:"col w-100"})}),Object(i.jsx)("div",{className:"col p-0",children:Object(i.jsx)(a.a,{className:"w-100"})})]})]})}},318:function(e,t,n){"use strict";var c=n(29),a=n(0),i=n(276),s=n(293),l=n.n(s),r=n(291),o=n(299),u=n(287),d=n(1);t.a=function(e){var t=e.playlist,n=e.handleRedirect,s=e.handleRemove,f=e.isProfile,p=e.dispatchPrivacyUpdate,b=f?8:10,m=Object(a.useState)("mb-5 play-outer-container remove-container"),j=Object(c.a)(m,2),h=j[0],v=j[1];return Object(a.useEffect)((function(){t.film_id||v("mb-5 play-cursor-default remove-container")}),[t.film_id]),Object(d.jsx)("div",{className:"col-12 col-sm-6 col-md-3 col-lg-2",children:Object(d.jsxs)("div",{className:"col ".concat(h),onClick:function(){return n(t.id,t.film_id)},children:[Object(d.jsxs)("div",{className:"embed-responsive embed-responsive-16by9 z-depth-1-half play-container",children:[Object(d.jsx)(r.a,{image:t.img}),Object(d.jsxs)("div",{style:{width:"100%",margin:0},className:"row play-middle",children:[Object(d.jsx)("div",{className:"col-5 col-sm-5",style:{display:"flex",justifyContent:"flex-end",alignItems:"center"},children:Object(d.jsx)(i.a,{icon:"play"})}),Object(d.jsx)("div",{className:"col-7 col-sm-7",style:{display:"flex",justifyContent:"flex-start",alignItems:"center"},children:Object(d.jsx)("small",{className:"fw-bold",children:"Play all"})})]})]}),Object(d.jsxs)("div",{className:"row m-0 mt-1",children:[Object(d.jsx)("div",{className:"p-0 col-".concat(b," col-sm-").concat(b),children:Object(d.jsx)(l.a,{line:1,text:t.title,className:"mb-1 mt-1 title "})}),f&&Object(d.jsxs)("div",{className:"col-4 col-sm-4 p-0 d-flex justify-content-end",children:[Object(d.jsx)(u.a,{id:t.id,isPublic:t.is_public,isProfile:!0,dispatchPrivacyUpdate:p}),Object(d.jsx)(o.a,{handleRemove:s})]})]}),Object(d.jsx)("p",{className:"mb-0 author-nick",children:Object(d.jsx)("span",{children:t.author_name})})]})},t.id)}},441:function(e,t,n){"use strict";n.r(t);var c=n(27),a=n(270),i=n.n(a),s=n(271),l=n(29),r=n(0),o=n(7),u=n(44),d=n(2),f=n(277),p={playlists:null,playlistsCount:0,isLoading:!1,isAllFetched:!1,isInitialLoaded:!1,error:null},b=function(e,t){switch(t.type){case"field":return Object(d.a)(Object(d.a)({},e),{},Object(u.a)({},t.fieldName,t.payload));case"initial-success":return Object(d.a)(Object(d.a)({},e),{},{playlists:Object(c.a)(new Set(Object(c.a)(t.playlists))),isLoading:!1,isInitialLoaded:!0,isAllFetched:t.responseCount<f.b,playlistsCount:e.playlistsCount+t.responseCount});case"load":return Object(d.a)(Object(d.a)({},e),{},{isLoading:!0,isAllFetched:!1,error:null});case"success":return Object(d.a)(Object(d.a)({},e),{},{playlists:Object(c.a)(new Set([].concat(Object(c.a)(e.playlists),Object(c.a)(t.playlists)))),isLoading:!1,isAllFetched:t.responseCount<f.c,playlistsCount:e.playlistsCount+t.responseCount,error:null});case"clear":return p;case"error":return Object(d.a)(Object(d.a)({},e),{},{isLoading:!1,isAllFetched:!1,error:t.payload});default:return e}},m=n(300),j=n(318),h=n(282),v=n(288),O=n(278),g=n(1);t.default=function(){var e=Object(o.g)(),t=Object(r.useReducer)(b,p),n=Object(l.a)(t,2),a=n[0],u=n[1],d=a.playlists,y=a.isLoading,x=a.isAllFetched,N=a.isInitialLoaded,w=a.playlistsCount,k=Object(r.useCallback)((function(){y||x||!N||u({type:"load"})}),[x,y,N]);Object(O.a)(k,{triggerOnNoScroll:!0}),Object(r.useEffect)((function(){function e(){return(e=Object(s.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.e({limit:f.b}).then((function(e){var t=e.data,n=t.filter((function(e){return e.film_id}));n.forEach((function(e){e.img="".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(e.film_id,"/thumbnail")})),u({type:"initial-success",playlists:n,responseCount:t.length})})).catch((function(e){console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}u({type:"clear"}),function(){e.apply(this,arguments)}()}),[]),Object(r.useEffect)((function(){function e(){return(e=Object(s.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.e({skip:w,limit:f.c}).then((function(e){var t=e.data,n=t.filter((function(e){return e.film_id}));n.forEach((function(e){e.img="".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(e.film_id,"/thumbnail")})),u({type:"success",playlists:n,responseCount:t.length})})).catch((function(e){console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}y&&N&&function(){e.apply(this,arguments)}()}),[y,N,d,w]);var C=function(t,n){e.push({pathname:"".concat("/filmapp-react-frontend/","film/")+n,search:"?list=".concat(t)})};return Object(g.jsxs)("div",{className:"row mt-5 mx-2",children:[d?d.map((function(e,t){return Object(g.jsx)(j.a,{playlist:e,index:t,handleRedirect:C},e.id)})):Object(c.a)(Object(v.c)(20,(function(e){return Object(g.jsx)(m.a,{},e)}))),!x&&Object(g.jsx)("div",{className:"fetch-loader d-flex justify-content-center",children:y&&Object(g.jsx)("div",{className:"spinner spinner-border"})})]})}}}]);
//# sourceMappingURL=11.369f6e6f.chunk.js.map