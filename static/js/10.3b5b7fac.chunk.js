(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[10],{277:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"e",(function(){return n})),a.d(t,"d",(function(){return i})),a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return r}));var c=10,n=12,i=10,s=40,r=20},278:function(e,t,a){"use strict";var c=a(0),n=a(292),i=a.n(n),s=function(e,t,a){return e?i()(t,e,a):t};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=Object(c.useMemo)((function(){var e,a,c,n,i;return{offset:null!==(e=null===t||void 0===t?void 0:t.offset)&&void 0!==e?e:20,debounce:null!==(a=null===t||void 0===t?void 0:t.debounce)&&void 0!==a?a:200,debounceOptions:null!==(c=null===t||void 0===t?void 0:t.debounceOptions)&&void 0!==c?c:{leading:!0},triggerOnNoScroll:null!==(n=null===t||void 0===t?void 0:t.triggerOnNoScroll)&&void 0!==n&&n,id:null!==(i=null===t||void 0===t?void 0:t.id)&&void 0!==i?i:null}}),[null===t||void 0===t?void 0:t.offset,null===t||void 0===t?void 0:t.debounce,null===t||void 0===t?void 0:t.debounceOptions,null===t||void 0===t?void 0:t.triggerOnNoScroll,null===t||void 0===t?void 0:t.id]),n=a.offset,i=a.triggerOnNoScroll,r=a.debounce,l=a.debounceOptions,o=a.id,d=Object(c.useMemo)((function(){return s(r,e,l)}),[e,r,l]),u=Object(c.useRef)(null),p=Object(c.useCallback)((function(){if(null!=u.current){var e=u.current,t=Math.round(e.scrollTop+e.clientHeight);Math.round(e.scrollHeight-n)<=t&&d()}else if(null!==o){var a=document.getElementById(o);if(a){var c=Math.round(a.scrollTop+a.clientHeight);Math.round(a.scrollHeight-n)<=c&&d()}}else{var i=document.scrollingElement||document.documentElement,s=Math.round(i.scrollTop+window.innerHeight);Math.round(i.scrollHeight-n)<=s&&d()}}),[d,n,o]);return Object(c.useEffect)((function(){var e=u.current,t=document.getElementById(o);return null!=e?e.addEventListener("scroll",p):null!==t?t.addEventListener("scroll",p):window.addEventListener("scroll",p),i&&p(),function(){null!=e?e.removeEventListener("scroll",p):null!==t?t.addEventListener("scroll",p):window.removeEventListener("scroll",p)}}),[p,i,o]),u}},280:function(e,t,a){"use strict";var c=a(29),n=a(298),i=a.n(n),s=a(1);t.a=function(e){var t=e.onClick,a=e.children,n=e.className,r=i()({background:"black"}),l=Object(c.a)(r,2),o=l[0],d=l[1];return Object(s.jsxs)("button",{style:{color:"black"},onClick:function(e){t(e)},onMouseDown:o,className:"btn btn-link button-ripple ".concat(n),children:[a,d]})}},281:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"c",(function(){return s})),a.d(t,"f",(function(){return r})),a.d(t,"g",(function(){return l})),a.d(t,"b",(function(){return o})),a.d(t,"d",(function(){return d})),a.d(t,"e",(function(){return u}));var c=a(30),n=a(84),i=function(e){return c.a.get("films/",{params:e})},s=function(e){return c.a.get("films/".concat(e))},r=function(e){return c.a.get("films/search",{params:e})},l=function(e){return c.a.patch("films/".concat(e,"/view"))},o=function(e){return c.a.post("films",e,{headers:Object(n.a)()})},d=function(e,t){return c.a.patch("films/".concat(e,"/action"),t,{headers:Object(n.a)()})},u=function(e){return c.a.delete("films/".concat(e),{headers:Object(n.a)()})}},282:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return s})),a.d(t,"e",(function(){return r})),a.d(t,"c",(function(){return l})),a.d(t,"d",(function(){return o}));var c=a(30),n=a(84),i=function(e){return c.a.post("playlists",e,{headers:Object(n.a)()})},s=function(e){return c.a.get("playlists/".concat(e),{headers:Object(n.a)()})},r=function(e){return c.a.get("playlists",{params:e,headers:Object(n.a)()})},l=function(e,t){return c.a.patch("playlists/".concat(e),t,{headers:Object(n.a)()})},o=function(e){return c.a.delete("playlists/".concat(e),{headers:Object(n.a)()})}},286:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return s}));var c=a(30),n=a(84),i=function(e){return c.a.get("users/me",{params:e,headers:Object(n.a)()})},s=function(e){return c.a.patch("users",e,{headers:Object(n.a)()})}},287:function(e,t,a){"use strict";var c=a(270),n=a.n(c),i=a(271),s=a(29),r=a(276),l=a(0),o=a(282),d=a(280),u=a(1);t.a=function(e){var t=e.isPublic,a=e.id,c=e.isProfile,p=e.dispatchPrivacyUpdate,b=e.filmDispatch,f=Object(l.useState)(!1),j=Object(s.a)(f,2),m=j[0],h=j[1];Object(l.useEffect)((function(){function e(){return(e=Object(i.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.c(a,{is_public:!t}).then((function(e){h(!1),p({type:"change-playlist-privacy-success",payload:e.data}),void 0!==b&&b({type:"field",fieldName:"reloadPlaylist",payload:!0})})).catch((function(e){console.error(e),h(!1)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}m&&function(){e.apply(this,arguments)}()}),[p,m,t,a,b]);var O=Object(u.jsx)(d.a,{className:"button-ripple-24 p-0",onClick:function(e){e.stopPropagation(),m||h(!0)},children:Object(u.jsx)(r.a,{icon:t?"globe-europe":"lock"})});return c?Object(u.jsx)("div",{className:"col text-center justify-content-center d-flex align-items-center p-0 flex-grow-0",children:Object(u.jsx)("div",{className:"col remove-holder p-0 m-0 flex-grow-0",style:{height:"24px",width:"24"},children:O})}):O}},288:function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return r})),a.d(t,"d",(function(){return l})),a.d(t,"c",(function(){return o}));var c=a(270),n=a.n(c),i=n.a.mark(o),s=function(e){return!!("path"===e.tagName&&e.parentNode.className.animVal&&e.parentNode.className.animVal.includes("playlist-add-icon")||"svg"===e.tagName&&e.className.animVal&&e.className.animVal.includes("playlist-add-icon")||e.className&&"string"===typeof e.className&&e.className.includes("playlist-add-icon-holder"))},r=function(e){var t=new Date(Date.parse(e.createdAt));return("0"+t.getDate()).slice(-2)+"-"+("0"+(t.getMonth()+1)).slice(-2)+"-"+("0"+t.getFullYear()).slice(-2)+" o "+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)},l=function(e){var t=new Date(Date.parse(e.createdAt)),a=new Date,c=Math.abs(Math.floor((Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes())-Date.UTC(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes()))/6e4));return c/60>=1?(c/=60)/24>=1?(c/=24)/30>=1?(c/=30)/12>=1?(c/=12,c=Math.floor(c)+" years "):c=Math.floor(c)+" months ":c=Math.floor(c)+" days ":c=Math.floor(c)+" hours ":c=Math.floor(c)+" minutes ",c+="ago"};function o(e,t){var a;return n.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:a=0;case 1:if(!(a<e)){c.next=7;break}return c.next=4,t(a);case 4:++a,c.next=1;break;case 7:case"end":return c.stop()}}),i)}},291:function(e,t,a){"use strict";var c=a(29),n=a(0),i=a.n(n),s=function(e){var t=e.target,a=e.onIntersect,c=e.threshold,n=void 0===c?.1:c,s=e.rootMargin,r=void 0===s?"0px":s;i.a.useEffect((function(){var e=new IntersectionObserver(a,{rootMargin:r,threshold:n}),c=t.current;return e.observe(c),function(){e.unobserve(c)}}))},r=(a(297),a(1)),l=function(e){var t=e.src,a=e.thumb,i=e.isCached,s=Object(n.useState)(i),l=Object(c.a)(s,2),o=l[0],d=l[1];return Object(r.jsxs)("div",{className:"ratio ratio-16x9",children:[Object(r.jsx)("img",{className:"image thumb",alt:"",src:a,style:{visibility:o?"hidden":"visible"}}),Object(r.jsx)("img",{onLoad:function(){d(!0)},className:"image full",style:{opacity:o?1:0},alt:"",src:t})]})};t.a=function(e){var t=e.image,a=Object(n.useRef)(),i=Object(n.useState)(!1),o=Object(c.a)(i,2),d=o[0],u=o[1],p=Object(n.useState)(!1),b=Object(c.a)(p,2),f=b[0],j=b[1];return s({target:a,onIntersect:function(e,n){if(Object(c.a)(e,1)[0].isIntersecting){var i=new Image;i.src=t.concat("?width=small_webp"),j(i.complete),u(!0),n.unobserve(a.current)}}}),Object(r.jsx)("div",{ref:a,className:"image-container ratio ratio-16x9 play-image",children:d&&Object(r.jsx)(l,{isCached:f,src:t.concat("?width=small_webp"),thumb:t.concat("?width=preview_webp")})})}},297:function(e,t,a){},317:function(e,t,a){},338:function(e,t,a){"use strict";var c=a(29),n=a(0),i=a(276),s=a(2),r=a(270),l=a.n(r),o=a(271),d=a(286),u=a(282),p=a(60),b=a(278),f=a(27),j=a(44),m=a(277),h={playlists:[],isLoading:!0,isAllFetched:!1,isCreating:!1,isAdding:!1,playlistToUpgrade:null,title:"",isPublic:!1,error:""};function O(e,t){switch(t.type){case"field":return Object(s.a)(Object(s.a)({},e),{},Object(j.a)({error:""},t.fieldName,t.payload));case"load":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!0,isAllFetched:!1});case"load-success":return Object(s.a)(Object(s.a)({},e),{},{playlists:[].concat(Object(f.a)(e.playlists),Object(f.a)(t.payload)),isLoading:!1,isAllFetched:t.payload.length<m.d,error:""});case"create":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,isCreating:!0});case"create-success":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,isCreating:!1});case"add":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,isAdding:!0,playlistToUpgrade:t.payload});case"add-update-playlist":return Object(s.a)(Object(s.a)({},e),{},{playlists:e.playlists.map((function(t){return t.id===e.playlistToUpgrade.id?Object(s.a)(Object(s.a)({},t),{},{contains:!t.contains}):t})),playlistToUpgrade:null});case"add-success":return Object(s.a)(Object(s.a)({},e),{},{isAdding:!1});case"change-playlist-privacy-success":return Object(s.a)(Object(s.a)({},e),{},{playlists:e.playlists.map((function(e){return e.id===t.payload.id?Object(s.a)(Object(s.a)({},e),{},{is_public:t.payload.is_public}):e}))});case"error":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,isCreating:!1,error:t.payload,title:""});default:return e}}var v=a(287),y=a(280),x=a(1);var g=function(e){var t=e.filmID,a=e.handlePlaylistClose,r=e.isRecommendations,f=e.filmDispatch,j=Object(n.useContext)(p.a).createToast,g=Object(n.useRef)(),N=Object(n.useReducer)(O,h),w=Object(c.a)(N,2),k=w[0],C=w[1],L=k.playlists,E=k.title,D=k.isPublic,M=k.isLoading,_=k.isAllFetched,P=k.isCreating,S=k.isAdding,A=k.playlistToUpgrade,T=k.error,I=Object(n.useCallback)((function(){M||_||P||S||C({type:"load"})}),[M,_,P,S]),F=Object(b.a)(I);Object(n.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a({playlists:!0,skip:L.length,limit:m.d}).then((function(e){var a=e.data.playlists;a.forEach((function(e){e.contains=e.films.indexOf(t)>-1})),C({type:"load-success",payload:a})})).catch((function(e){console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}M&&function(){e.apply(this,arguments)}()}),[t,L,M]),Object(n.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){var c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={title:E,is_public:D,films_id:[t]},e.next=3,u.a(c).then((function(e){C({type:"create-success"}),j("Created playlist ".concat(E)),a()})).catch((function(e){console.error(e);var t=null;e.response&&e.response.data&&e.response.data.error?t=e.response.data.error:e.response&&e.response.data&&e.response.data.errors&&(t=e.response.data.errors[0]),g.current.classList.add("is-invalid"),C({type:"error",payload:"Path `title` is required."===t?"Playlist title is required":t})}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}P&&function(){e.apply(this,arguments)}()}),[P,E,D,j,a,t]),Object(n.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){var a,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={films_id:[t]},a=A.contains?Object(s.a)(Object(s.a)({},a),{},{is_remove_films:!0}):Object(s.a)(Object(s.a)({},a),{},{is_remove_films:!1}),c=A.contains?"Deleted from playlist ".concat(A.title):"Added to playlist ".concat(A.title),C({type:"add-update-playlist",playlist:A}),e.next=6,u.c(A.id,a).then((function(e){C({type:"add-success"}),r&&f({type:"field",fieldName:"reloadPlaylist",payload:!0}),j(c)})).catch((function(e){return console.error(e)}));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}S&&A&&function(){e.apply(this,arguments)}()}),[S,A,j,f,t,r]);var H=function(e,t){g.current.classList.remove("is-invalid"),C({type:"field",fieldName:e,payload:t})};return Object(x.jsxs)("div",{onClick:function(e){return e.stopPropagation()},style:{width:"240px",left:"50px !important"},children:[Object(x.jsxs)("div",{className:"row m-0 m-button button-ripple",children:[Object(x.jsx)("div",{className:"col playlist-add-exit-text-width",children:"Save to..."}),Object(x.jsx)(y.a,{className:"button-ripple-24 playlist-add-icon-holder p-0 d-flex align-items-center text-center justify-content-center",onClick:function(){return setTimeout(a,150)},children:Object(x.jsx)(i.a,{icon:"times"})})]}),Object(x.jsx)("hr",{className:"dropdown-divider"}),Object(x.jsxs)("div",{ref:F,style:{maxHeight:"100px",overflowY:"scroll",minHeight:"3rem"},children:[L.map((function(e,t){return Object(x.jsxs)("div",{className:"row m-0 playlist-form-group",children:[Object(x.jsx)("div",{className:"col-10 col-sm-10 p-0",children:Object(x.jsxs)("div",{id:e.id,className:"form-check",children:[Object(x.jsx)("input",{type:"checkbox",id:"add-playlist-".concat(e.id),className:"form-check-input",onChange:function(){return function(e){C({type:"add",payload:e})}(e)},checked:e.contains}),Object(x.jsx)("label",{className:"form-check-label",htmlFor:"add-playlist-".concat(e.id),children:Object(x.jsx)("p",{className:"playlist-check-label",children:e.title})})]})}),Object(x.jsx)(v.a,{id:e.id,isPublic:e.is_public,isProfile:!1,filmDispatch:f,dispatchPrivacyUpdate:C})]},e.id)})),!_&&Object(x.jsx)("div",{style:{height:"3rem"},className:"fetch-spinner d-flex justify-content-center align-items-center",children:M&&Object(x.jsx)("div",{className:"spinner-border"})})]}),Object(x.jsx)("hr",{className:"dropdown-divider"}),Object(x.jsx)("div",{className:"row m-0 p-0",children:Object(x.jsx)("span",{className:"m-0",children:"Create a new playlist"})}),Object(x.jsx)("div",{className:"row m-0 p-0",children:Object(x.jsxs)("form",{onSubmit:function(e){e.preventDefault(),e.stopPropagation(),C({type:"create"})},children:[Object(x.jsxs)("div",{className:"input-group mb-2 mt-2",children:[Object(x.jsx)("input",{type:"text",className:"form-control","aria-label":"playlistNameInput",placeholder:"Enter playlist title...",ref:g,onChange:function(e){return H("title",e.target.value)}}),Object(x.jsx)("div",{className:"invalid-feedback",children:T})]}),Object(x.jsx)("div",{className:"mb-2 mt-2",children:Object(x.jsxs)("select",{className:"form-select",onChange:function(e){return H("isPublic","public"===e.target.value)},children:[Object(x.jsx)("option",{value:"private",children:"Private"}),Object(x.jsx)("option",{value:"public",children:"Public"})]})}),Object(x.jsxs)("div",{className:"d-flex align-items-center mt-2",children:[Object(x.jsx)("button",{type:"submit",className:"btn btn-primary",disabled:P,children:"Create"}),P&&Object(x.jsx)("div",{className:"spinner-grow ms-2"})]})]})})]})},N=a(51),w=a(298),k=a.n(w),C=a(35),L=a(42);a(317);t.a=function(e){var t=e.isRecommendations,a=e.filmDispatch,s=e.filmID,r=Object(n.useRef)(),l=Object(n.useContext)(N.a).user,o=k()({background:"black"}),d=Object(c.a)(o,2),u=d[0],p=d[1],b=Object(n.useState)(!1),f=Object(c.a)(b,2),j=f[0],m=f[1],h=Object(n.useState)(null),O=Object(c.a)(h,2),v=O[0],y=O[1],w=function(){console.log("open"),m(!0)},E=function(){console.log("close"),m(!1)};return Object(n.useEffect)((function(){var e=r.current;if(e&&l.auth)return e.addEventListener("show.bs.dropdown",w),e.addEventListener("hide.bs.dropdown",E),y(new L.b("#playlist-dropdown-".concat(s))),function(){e.removeEventListener("show.bs.dropdown",w),e.removeEventListener("hide.bs.dropdown",E)}}),[s,r,l.auth]),l.auth?Object(x.jsxs)("div",{ref:r,className:"p-0 dropdown",style:{width:"26px"},children:[Object(x.jsx)("button",{onClick:function(){v&&(j?v.show():v.hide())},className:"btn btn-link m-button button-ripple dropdown-toggle p-0",type:"button",id:"playlist-dropdown-".concat(s),"data-bs-toggle":"dropdown","aria-expanded":"false",style:{color:"black"},children:Object(x.jsx)("div",{style:{display:"inline-block",width:"100%",height:"100%"},children:Object(x.jsxs)("div",{onClick:u,className:"col playlist-add-icon-holder p-0 button-ripple button-ripple-24",children:[Object(x.jsx)(i.a,{style:{opacity:j?1:""},className:"playlist-add-icon",icon:C.a}),p]})})}),Object(x.jsx)("div",{className:"dropdown-menu","aria-labelledby":"playlist-dropdown-".concat(s),children:j&&Object(x.jsx)(g,{isRecommendations:t,filmDispatch:a,filmID:s,handlePlaylistClose:function(){m(!1),v.hide()}})})]}):null}},427:function(e,t,a){},438:function(e,t,a){"use strict";a.r(t);var c=a(27),n=a(270),i=a.n(n),s=a(2),r=a(271),l=a(29),o=a(0),d=a(7),u=a(276),p=a(35),b=a(307),f=a.n(b),j=a(293),m=a.n(j),h=a(426),O=a(44),v=a(277),y={films:null,isLoading:!1,isAllFetched:!1,isInitialLoaded:!1,error:null,search:"",filter:"",sort:"",dir:1,sorts:[{id:"upload_date",title:"Upload date",dir:1},{id:"view_count",title:"View count",dir:1},{id:"rating",title:"Rating",dir:1}]},x=function(e,t){switch(t.type){case"field":return Object(s.a)(Object(s.a)({},e),{},Object(O.a)({},t.fieldName,t.payload));case"initial-success":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,isInitialLoaded:!0,error:null,isAllFetched:t.payload.films.length<v.c,films:t.payload.films,search:t.payload.params.search,sort:t.payload.params.sort,filter:t.payload.params.filter,dir:t.payload.params.dir});case"load":return e.isLoading||e.isAllFetched||!e.isInitialLoaded||e.error?e:Object(s.a)(Object(s.a)({},e),{},{isLoading:!0});case"load-success":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,error:null,isAllFetched:t.payload.length<v.c,films:[].concat(Object(c.a)(e.films),Object(c.a)(t.payload))});case"sorts-change":return Object(s.a)(Object(s.a)({},e),{},{sort:t.resetSort?"":e.sort,sorts:e.sorts.map((function(e){return e.id===t.payload.id?t.payload:e}))});case"error":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,error:!0});default:return e}},g=a(291),N=a(338),w=a(281),k=a(288),C=a(278),L=a(280),E=(a(427),a(306)),D=a.n(E),M=a(1),_=function(){return Object(M.jsx)("div",{className:"col-12 col-sm-12 col-lg-8 m-0 mb-1",children:Object(M.jsxs)("div",{className:"row mb-4 m-0",children:[Object(M.jsx)("div",{className:"col-8 col-sm-4 p-0",children:Object(M.jsx)("div",{className:"ratio ratio-16x9",children:Object(M.jsx)(D.a,{className:"w-100 h-100",style:{lineHeight:"1.5"}})})}),Object(M.jsxs)("div",{className:"col-4 col-sm-8",children:[Object(M.jsx)("div",{className:"col-12 col-sm-12 p-0 pb-1 h-25",children:Object(M.jsx)(D.a,{className:"w-100 h-100",style:{lineHeight:"1.5"}})}),Object(M.jsx)("div",{className:"col-12 col-sm-12 h-75 pt-1",children:Object(M.jsx)(D.a,{className:"w-100 h-100",style:{lineHeight:"1.5"}})})]})]})})},P=[{id:"last_hour",title:"Last hour"},{id:"today",title:"Today"},{id:"this_week",title:"This week"},{id:"this_month",title:"This month"},{id:"this_year",title:"This year"}];t.default=function(){var e=Object(d.g)(),t=Object(d.h)(),a=Object(o.useReducer)(x,y),n=Object(l.a)(a,2),b=n[0],j=n[1],O=b.films,E=b.isLoading,D=b.isAllFetched,S=b.search,A=b.sort,T=b.filter,I=b.dir,F=b.sorts,H=b.error,R=b.isInitialLoaded,U=Object(o.useState)(!1),W=Object(l.a)(U,2),z=W[0],V=W[1],Y=Object(o.useCallback)((function(){E||D||H||!R||j({type:"load"})}),[H,D,R,E]);Object(C.a)(Y),Object(o.useEffect)((function(){var e,a,c,n=f.a.parse(t.search),l={search:n.title,sort:null!==(e=n.sort)&&void 0!==e?e:"",filter:null!==(a=n.filter)&&void 0!==a?a:"",dir:null!==(c=n.dir)&&void 0!==c?c:1};function o(){return(o=Object(r.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.f(Object(s.a)(Object(s.a)({},l),{},{limit:v.c})).then((function(e){j({type:"initial-success",payload:{films:e.data,params:l}})})).catch((function(e){j({type:"error"}),console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t.state&&t.state.films?j({type:"initial-success",payload:{films:t.state.films,params:l}}):function(){o.apply(this,arguments)}()}),[t]),Object(o.useEffect)((function(){function e(){return(e=Object(r.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.f({search:S,sort:A,filter:T,dir:I,skip:O.length,limit:v.c}).then((function(e){j({type:"load-success",payload:e.data})})).catch((function(e){j({type:"error"}),console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}E&&function(){e.apply(this,arguments)}()}),[I,O,T,E,S,A]);var B=function(t,a){var c=T,n=A,i=I;if("filter"===t)c=c===a.id?"":a.id;else{var s=a;n===a.id?(n=a.id,1===s.dir?(s.dir=-1,i=a.dir):-1===s.dir&&(s.dir=1,n=""),j({type:"sorts-change",payload:s,resetSort:""===n}),i=a.dir):(n=a.id,i=a.dir)}""!==n&&""!==c?e.push({search:"?title=".concat(S,"&sort=").concat(n,"&dir=").concat(i,"&filter=").concat(c)}):""===n&&""!==c?e.push({search:"?title=".concat(S,"&filter=").concat(c)}):""!==n&&""===c?e.push({search:"?title=".concat(S,"&sort=").concat(n,"&dir=").concat(i)}):""===n&&""===c&&e.push({search:"?title=".concat(S)})};return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(L.a,{className:"mt-3 mx-4 search-button p-0",onClick:function(){return V(!z)},children:Object(M.jsx)("div",{"aria-controls":"filter-collapse","aria-expanded":z,"data-bs-toggle":"collapse","data-bs-target":"#searchCollapse",className:"px-4 py-2",children:Object(M.jsx)(u.a,{style:{cursor:"pointer"},icon:p.c})})}),Object(M.jsx)("div",{className:"collapse",id:"searchCollapse",children:Object(M.jsxs)("div",{id:"filter-collapse",className:"row mx-2",children:[Object(M.jsxs)("div",{className:"col col-sm-4 mt-4",children:[Object(M.jsx)("p",{style:{fontWeight:500},children:"UPLOAD DATE"}),Object(M.jsx)("div",{className:"col col-sm-8 mt-3 mb-3 divider"}),P.map((function(e){return Object(M.jsx)("p",{style:T===e.id?{fontWeight:700,fontSize:"80%"}:{fontWeight:400,fontSize:"80%"},onClick:function(){return B("filter",e)},className:"search-filter",children:e.title},e.id)}))]}),Object(M.jsxs)("div",{className:"col col-sm-4 mt-4",children:[Object(M.jsx)("p",{style:{fontWeight:500},children:"SORT BY"}),Object(M.jsx)("div",{className:"col col-sm-8 mt-3 mb-3 divider"}),F.map((function(e){return Object(M.jsxs)("div",{className:"col d-flex",children:[Object(M.jsx)("p",{style:A===e.id?{fontWeight:700,fontSize:"80%"}:{fontWeight:400,fontSize:"80%"},onClick:function(){return B("sort",e)},className:"search-filter",children:e.title}),A===e.id&&1===e.dir?Object(M.jsx)(u.a,{className:"ms-2",icon:"sort-up"}):A===e.id&&-1===e.dir?Object(M.jsx)(u.a,{className:"ms-2",icon:"sort-down"}):""]},e.id)}))]})]})}),Object(M.jsx)("div",{className:"col col-sm-12 mt-2 mb-3 divider"}),Object(M.jsx)("div",{className:"row mx-2 mt-4",children:O?O.map((function(t,a){var c=Object(k.d)(t);return Object(M.jsx)("div",{className:"col-12 col-sm-12 col-lg-8",children:Object(M.jsx)("div",{className:"col play-outer-container m-0 mb-1",onClick:function(a){var c;Object(k.a)(a.target)||(c=t.id,e.push("".concat("/filmapp-react-frontend/","film/")+c))},children:Object(M.jsxs)("div",{className:"row search-style mb-4 m-0",children:[Object(M.jsx)("div",{className:"col-8 col-sm-4 p-0",children:Object(M.jsxs)("div",{className:"embed-responsive embed-responsive-16by9 z-depth-1-half play-container",children:[Object(M.jsx)(g.a,{image:"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(t.id,"/thumbnail")}),Object(M.jsx)(u.a,{className:"play-middle",icon:"play"})]})}),Object(M.jsxs)("div",{className:"col-4 col-sm-8",children:[Object(M.jsxs)("div",{className:"row m-0",children:[Object(M.jsx)("div",{className:"col p-0 mb-1",style:{flex:"0 0 auto !important",width:"calc(83.33333333% - 24px) !important"},children:Object(M.jsx)(h.a,{lines:1,className:"mb-0 search-title fw-bold",children:t.title})}),Object(M.jsx)("div",{className:"col d-flex justify-content-end",children:Object(M.jsx)(N.a,{index:a,filmID:t.id})})]}),Object(M.jsx)("p",{className:"d-none d-sm-inline mb-1 author-nick-search",children:Object(M.jsxs)("span",{children:[t.author_name," \xb7 ",t.views," views \xb7 ",c]})}),Object(M.jsx)("p",{className:"d-inline d-sm-none mb-0 author-nick",children:Object(M.jsxs)("span",{children:[t.author_name," \xb7 ",t.views," views"]})}),Object(M.jsx)("span",{className:"d-none d-sm-inline  author-nick-search",children:Object(M.jsx)(m.a,{className:"mb-0",line:2,text:t.description})})]})]})})},t.id)})):Object(c.a)(Object(k.c)(20,(function(e){return Object(M.jsx)(_,{},e)})))}),!D&&Object(M.jsx)("div",{className:"fetch-loader d-flex justify-content-center",children:E&&Object(M.jsx)("div",{className:"spinner-border"})})]})}}}]);
//# sourceMappingURL=10.3b5b7fac.chunk.js.map