(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[1],{542:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"e",(function(){return i})),n.d(t,"d",(function(){return a})),n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return r})),n.d(t,"f",(function(){return o}));var c=10,i=12,a=10,s=40,r=20,o=10},545:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"c",(function(){return s})),n.d(t,"d",(function(){return r})),n.d(t,"h",(function(){return o})),n.d(t,"i",(function(){return l})),n.d(t,"b",(function(){return d})),n.d(t,"f",(function(){return u})),n.d(t,"e",(function(){return p})),n.d(t,"g",(function(){return b}));var c=n(44),i=n(142),a=function(e){return c.a.get("films/",{params:e})},s=function(e){return c.a.get("films/".concat(e))},r=function(e){return c.a.get("films/".concat(e,"/details"))},o=function(e){return c.a.get("films/search",{params:e})},l=function(e){return c.a.patch("films/".concat(e,"/view"))},d=function(e){return c.a.post("films",e,{headers:Object(i.a)()})},u=function(e,t){return c.a.patch("films/".concat(e),t,{headers:Object(i.a)()})},p=function(e,t){return c.a.patch("films/".concat(e,"/action"),t,{headers:Object(i.a)()})},b=function(e){return c.a.delete("films/".concat(e),{headers:Object(i.a)()})}},546:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return s})),n.d(t,"e",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"d",(function(){return l}));var c=n(44),i=n(142),a=function(e){return c.a.post("playlists",e,{headers:Object(i.a)()})},s=function(e){return c.a.get("playlists/".concat(e),{headers:Object(i.a)()})},r=function(e){return c.a.get("playlists",{params:e,headers:Object(i.a)()})},o=function(e,t){return c.a.patch("playlists/".concat(e),t,{headers:Object(i.a)()})},l=function(e){return c.a.delete("playlists/".concat(e),{headers:Object(i.a)()})}},547:function(e,t,n){"use strict";var c=n(1),i=n(559),a=n.n(i),s=function(e,t,n){return e?a()(t,e,n):t};t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=Object(c.useMemo)((function(){var e,n,c,i,a;return{offset:null!==(e=null===t||void 0===t?void 0:t.offset)&&void 0!==e?e:20,debounce:null!==(n=null===t||void 0===t?void 0:t.debounce)&&void 0!==n?n:200,debounceOptions:null!==(c=null===t||void 0===t?void 0:t.debounceOptions)&&void 0!==c?c:{leading:!0},triggerOnNoScroll:null!==(i=null===t||void 0===t?void 0:t.triggerOnNoScroll)&&void 0!==i&&i,id:null!==(a=null===t||void 0===t?void 0:t.id)&&void 0!==a?a:null}}),[null===t||void 0===t?void 0:t.offset,null===t||void 0===t?void 0:t.debounce,null===t||void 0===t?void 0:t.debounceOptions,null===t||void 0===t?void 0:t.triggerOnNoScroll,null===t||void 0===t?void 0:t.id]),i=n.offset,a=n.triggerOnNoScroll,r=n.debounce,o=n.debounceOptions,l=n.id,d=Object(c.useMemo)((function(){return s(r,e,o)}),[e,r,o]),u=Object(c.useRef)(null),p=Object(c.useCallback)((function(){if(null!=u.current){var e=u.current,t=Math.round(e.scrollTop+e.clientHeight);Math.round(e.scrollHeight-i)<=t&&d()}else if(null!==l){var n=document.getElementById(l);if(n){var c=Math.round(n.scrollTop+n.clientHeight);Math.round(n.scrollHeight-i)<=c&&d()}}else{var a=document.scrollingElement||document.documentElement,s=Math.round(a.scrollTop+window.innerHeight);Math.round(a.scrollHeight-i)<=s&&d()}}),[d,i,l]);return Object(c.useEffect)((function(){var e=u.current,t=document.getElementById(l);return null!=e?e.addEventListener("scroll",p):null!==t?t.addEventListener("scroll",p):window.addEventListener("scroll",p),a&&p(),function(){null!=e?e.removeEventListener("scroll",p):null!==t?t.addEventListener("scroll",p):window.removeEventListener("scroll",p)}}),[p,a,l]),u}},548:function(e,t,n){"use strict";var c=n(16),i=n(48),a=n(148),s=n(581),r=n.n(s),o=n(2),l=["onClick","children","className","id"];t.a=function(e){var t=e.onClick,n=void 0===t?function(){}:t,s=e.children,d=e.className,u=e.id,p=Object(a.a)(e,l),b=r()({background:"black"}),j=Object(i.a)(b,2),f=j[0],m=j[1];return Object(o.jsxs)("button",Object(c.a)(Object(c.a)({id:u||"",onClick:function(e){n(e)},onMouseDown:f,className:"btn btn-link button-ripple text-dark ".concat(d)},p),{},{children:[s,m]}))}},552:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return s}));var c=n(44),i=n(142),a=function(e){return c.a.get("users/me",{params:e,headers:Object(i.a)()})},s=function(e){return c.a.patch("users",e,{headers:Object(i.a)()})}},556:function(e,t,n){"use strict";var c=n(48),i=n(1),a=n.n(i);n(618);var s=function(e){var t=e.target,n=e.onIntersect,c=e.threshold,i=void 0===c?.1:c,s=e.rootMargin,r=void 0===s?"0px":s;a.a.useEffect((function(){var e=new IntersectionObserver(n,{rootMargin:r,threshold:i}),c=t.current;return e.observe(c),function(){e.unobserve(c)}}))},r=(n(580),n(2)),o=function(e){var t=e.src,n=e.srcWebp,a=e.thumb,s=e.thumbWebp,o=e.isCached,l=Object(i.useState)(o),d=Object(c.a)(l,2),u=d[0],p=d[1];return Object(r.jsxs)("div",{children:[Object(r.jsxs)("picture",{children:[Object(r.jsx)("source",{type:"image/webp",srcSet:s}),Object(r.jsx)("source",{type:"image/jpeg",srcSet:a}),Object(r.jsx)("img",{className:"image thumb",alt:"",style:{visibility:u?"hidden":"visible"},src:a,onLoad:function(){p(!0)}})]}),Object(r.jsxs)("picture",{children:[Object(r.jsx)("source",{type:"image/webp",srcSet:n}),Object(r.jsx)("source",{type:"image/jpeg",srcSet:t}),Object(r.jsx)("img",{className:"image full",alt:"",style:{opacity:u?1:0},src:t,onLoad:function(){p(!0)}})]})]})};t.a=function(e){var t=e.image,n=Object(i.useRef)(),a=Object(i.useState)(!1),l=Object(c.a)(a,2),d=l[0],u=l[1],p=Object(i.useState)(!1),b=Object(c.a)(p,2),j=b[0],f=b[1];return s({target:n,onIntersect:function(e,i){if(Object(c.a)(e,1)[0].isIntersecting){var a=new Image;a.src=t.concat("?width=poster_webp"),f(a.complete),u(!0),n.current&&i.unobserve(n.current)}}}),Object(r.jsx)("div",{ref:n,className:"image-container embed-responsive embed-responsive-16by9  play-image",children:d&&Object(r.jsx)(o,{isCached:j,src:t.concat("?width=poster"),srcWebp:t.concat("?width=poster_webp"),thumb:t.concat("?width=preview"),thumbWebp:t.concat("?width=preview_webp")})})}},557:function(e,t,n){"use strict";var c=n(536),i=n(548),a=n(2);t.a=function(e){var t=e.handleRemove;return Object(a.jsx)(i.a,{className:"button-ripple-24 remove-holder p-0",onClick:t,children:Object(a.jsx)(c.a,{icon:"trash-alt"})})}},558:function(e,t,n){"use strict";var c=n(572),i=n.n(c),a=n(2);t.a=function(e){var t=e.isRecommendations;return Object(a.jsxs)("div",{className:"".concat(t?"col-sm-12":"col-sm-6"," mb-4 col col-12 col-md-3 col-lg-2 container-px"),children:[Object(a.jsx)("div",{className:"col-12 col-sm-12 p-0",children:Object(a.jsx)("div",{className:"embed-responsive embed-responsive-16by9 z-depth-1-half play-container",children:Object(a.jsx)("div",{className:"embed-responsive-item",children:Object(a.jsx)(i.a,{className:"w-100 h-100 line-height-unset"})})})}),Object(a.jsxs)("div",{className:"col-12 col-sm-12 mt-2 p-0",children:[Object(a.jsx)("div",{className:"col p-0",children:Object(a.jsx)(i.a,{className:"w-100 h-100 line-height-unset"})}),Object(a.jsx)("div",{className:"col p-0",children:Object(a.jsx)(i.a,{className:"".concat(t?"line-height-unset":""," col w-100")})})]})]})}},562:function(e,t,n){"use strict";var c=n(534),i=n.n(c),a=n(535),s=n(48),r=n(536),o=n(1),l=n(546),d=n(548),u=n(2);t.a=function(e){var t=e.isPublic,n=e.id,c=e.isPlaylist,p=e.dispatchPrivacyUpdate,b=e.filmDispatch,j=Object(o.useState)(!1),f=Object(s.a)(j,2),m=f[0],h=f[1];Object(o.useEffect)((function(){function e(){return(e=Object(a.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.c(n,{is_public:!t}).then((function(e){h(!1),p({type:"change-playlist-privacy-success",payload:e.data}),void 0!==b&&b({type:"field",fieldName:"reloadPlaylist",payload:!0})})).catch((function(e){console.error(e),h(!1)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}m&&function(){e.apply(this,arguments)}()}),[p,m,t,n,b]);return Object(u.jsx)(d.a,{className:"button-ripple-24 p-0 ".concat(c?"":"remove-holder"),onClick:function(e){e.preventDefault(),e.stopPropagation(),m||h(!0)},children:Object(u.jsx)(r.a,{icon:t?"globe-europe":"lock"})})}},570:function(e,t,n){"use strict";var c=n(1),i=n(536),a=n(551),s=n.n(a),r=n(556),o=n(605),l=n(557),d=n(571),u=n(86),p=(n(671),n(2));t.a=function(e){var t=e.film,n=e.index,a=e.handleRedirect,b=e.handleRemove,j=e.isProfile,f=e.isRecommendations,m=e.filmDispatch,h=e.children,O=Object(c.useContext)(u.a).user;return Object(p.jsx)("div",{className:"col-12 ".concat(f?"col-sm-12":"col-sm-6"," col-md-3 col-lg-2 mb-4 container-px"),children:Object(p.jsxs)("div",{className:"col play-outer-container remove-container p-0",children:[Object(p.jsx)("div",{className:"col-12 col-sm-12 p-0",onClick:function(){return a()},children:Object(p.jsxs)("div",{className:"play-container",children:[Object(p.jsx)(r.a,{image:t.img}),Object(p.jsx)(i.a,{className:"play-middle",icon:"play"})]})}),Object(p.jsx)("div",{className:"col-12 col-sm-12 p-0",children:Object(p.jsxs)("div",{className:"row mx-0 mb-0 mt-1",children:[Object(p.jsxs)("div",{className:"".concat(O.auth?"".concat(j?"button-ripple-div-next-width-2x":"button-ripple-div-next-width"):"col-12"," col p-0 pr-2 cursor-pointer"),onClick:function(){return a()},children:[Object(p.jsx)(s.a,{line:1,text:t.title,className:"mb-1 mt-1 title"}),h||Object(p.jsxs)("div",{className:"mb-0 author-nick",children:[Object(p.jsxs)("span",{children:[t.author_name,"\xa0"]}),Object(p.jsx)("span",{children:"\u2022\xa0"}),Object(p.jsxs)("span",{children:[t.views," views"]})]})]}),Object(p.jsxs)("div",{className:"".concat(O.auth?"".concat(j?"click-under-buttons-container-x2":"click-under-buttons-container"):"click-under-buttons-container"),children:[j?Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(l.a,{handleRemove:b}),Object(p.jsx)(d.a,{id:t.id,title:t.title,description:t.description})]}):O.auth?Object(p.jsx)(o.a,{isRecommendations:f,filmDispatch:m,index:n,filmID:t.id}):null,Object(p.jsx)("div",{className:"col col-12 m-0 p-0 click-under-buttons",onClick:function(){return a()}})]})]})})]})})}},571:function(e,t,n){"use strict";n(1);var c=n(11),i=n(536),a=n(548),s=n(2);t.a=function(e){var t=e.isPlaylist,n=e.id,r=e.title,o=e.description,l=Object(c.e)();return Object(s.jsx)(a.a,{className:"button-ripple-24 remove-holder p-0",onClick:function(e){e.stopPropagation(),t?l.push({pathname:"profile/update-playlist/".concat(n),state:{title:r}}):l.push({pathname:"profile/update-film/".concat(n),state:{title:r,description:o}})},children:Object(s.jsx)(i.a,{icon:"edit"})})}},580:function(e,t,n){},605:function(e,t,n){"use strict";var c=n(48),i=n(1),a=n(536),s=n(16),r=n(534),o=n.n(r),l=n(535),d=n(552),u=n(546),p=n(108),b=n(547),j=n(544),f=n(141),m=n(542),h={playlists:[],isLoading:!0,isAllLoaded:!1,isCreating:!1,isAdding:!1,playlistToUpgrade:null,title:"",isPublic:!1,error:""};function O(e,t){switch(t.type){case"field":return Object(s.a)(Object(s.a)({},e),{},Object(f.a)({error:""},t.fieldName,t.payload));case"load":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!0,isAllLoaded:!1});case"load-success":return Object(s.a)(Object(s.a)({},e),{},{playlists:[].concat(Object(j.a)(e.playlists),Object(j.a)(t.payload)),isLoading:!1,isAllLoaded:t.payload.length<m.d,error:""});case"create":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,isCreating:!0});case"create-success":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,isCreating:!1});case"add":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,isAdding:!0,playlistToUpgrade:t.payload});case"add-update-playlist":return Object(s.a)(Object(s.a)({},e),{},{playlists:e.playlists.map((function(t){return t.id===e.playlistToUpgrade.id?Object(s.a)(Object(s.a)({},t),{},{contains:!t.contains}):t})),playlistToUpgrade:null});case"add-success":return Object(s.a)(Object(s.a)({},e),{},{isAdding:!1});case"change-playlist-privacy-success":return Object(s.a)(Object(s.a)({},e),{},{playlists:e.playlists.map((function(e){return e.id===t.payload.id?Object(s.a)(Object(s.a)({},e),{},{is_public:t.payload.is_public}):e}))});case"error":return Object(s.a)(Object(s.a)({},e),{},{isLoading:!1,isCreating:!1,error:t.payload,title:""});default:return e}}var v=n(562),y=n(548),x=n(2);var g=function(e){var t=e.filmID,n=e.isRecommendations,r=e.filmDispatch,j=Object(i.useContext)(p.a).createToast,f=Object(i.useRef)(),g=Object(i.useReducer)(O,h),w=Object(c.a)(g,2),N=w[0],k=w[1],C=N.playlists,P=N.title,L=N.isPublic,E=N.isLoading,D=N.isAllLoaded,_=N.isCreating,M=N.isAdding,R=N.playlistToUpgrade,S=N.error,A=Object(i.useCallback)((function(){E||D||_||M||k({type:"load"})}),[E,D,_,M]),I=Object(b.a)(A);Object(i.useEffect)((function(){function e(){return(e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a({playlists:!0,skip:C.length,limit:m.d}).then((function(e){var n=e.data.playlists;n.forEach((function(e){e.contains=e.films.indexOf(t)>-1})),k({type:"load-success",payload:n})})).catch((function(e){console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}E&&function(){e.apply(this,arguments)}()}),[t,C,E]),Object(i.useEffect)((function(){var e=function(){document.getElementById("closePlaylistMenuButton".concat(t)).click()};function n(){return(n=Object(l.a)(o.a.mark((function n(){var c;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c={title:P,is_public:L,films_id:[t]},n.next=3,u.a(c).then((function(t){k({type:"create-success"}),j("Created playlist ".concat(P)),e()})).catch((function(e){console.error(e);var t=null;e.response&&e.response.data&&e.response.data.error?t=e.response.data.error:e.response&&e.response.data&&e.response.data.errors&&(t=e.response.data.errors[0]),f.current.classList.add("is-invalid"),k({type:"error",payload:"Path `title` is required."===t?"Playlist title is required":t})}));case 3:case"end":return n.stop()}}),n)})))).apply(this,arguments)}_&&function(){n.apply(this,arguments)}()}),[_,P,L,j,t]),Object(i.useEffect)((function(){function e(){return(e=Object(l.a)(o.a.mark((function e(){var c,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={films_id:[t]},c=R.contains?Object(s.a)(Object(s.a)({},c),{},{is_remove_films:!0}):Object(s.a)(Object(s.a)({},c),{},{is_remove_films:!1}),i=R.contains?"Deleted from playlist ".concat(R.title):"Added to playlist ".concat(R.title),k({type:"add-update-playlist",playlist:R}),e.next=6,u.c(R.id,c).then((function(e){k({type:"add-success"}),n&&r({type:"field",fieldName:"reloadPlaylist",payload:!0}),j(i)})).catch((function(e){return console.error(e)}));case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}M&&R&&function(){e.apply(this,arguments)}()}),[M,R,j,r,t,n]);var T=function(e,t){f.current.classList.remove("is-invalid"),k({type:"field",fieldName:e,payload:t})};return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("div",{className:"row m-0 m-button button-ripple",children:[Object(x.jsx)("div",{className:"col playlist-add-exit-text-width px-3",children:"Save to..."}),Object(x.jsx)(y.a,{id:"closePlaylistMenuButton".concat(t),className:"button-ripple-24 playlist-add-icon-holder p-0 d-flex align-items-center text-center justify-content-center",onClick:function(){},children:Object(x.jsx)(a.a,{icon:"times"})})]}),Object(x.jsx)("hr",{className:"dropdown-divider"}),Object(x.jsxs)("div",{ref:I,className:"playlist-dropdown-content",children:[C.map((function(e,t){return Object(x.jsxs)("div",{className:"row m-0 playlist-form-group form-group mb-1",children:[Object(x.jsx)("div",{className:"col-10 col-sm-10 p-0",children:Object(x.jsxs)("div",{id:e.id,className:"form-check",children:[Object(x.jsx)("input",{type:"checkbox",id:"formCheckAddToPlaylist".concat(e.id),className:"form-check-input",onChange:function(){return function(e){k({type:"add",payload:e})}(e)},checked:e.contains}),Object(x.jsx)("label",{className:"form-check-label w-100",htmlFor:"formCheckAddToPlaylist".concat(e.id),children:Object(x.jsx)("p",{className:"playlist-check-label",onClick:function(e){return e.stopPropagation()},children:e.title})})]})}),Object(x.jsx)(v.a,{id:e.id,isPublic:e.is_public,isPlaylist:!0,filmDispatch:r,dispatchPrivacyUpdate:k})]},e.id)})),!D&&Object(x.jsx)("div",{className:"fetch-spinner d-flex justify-content-center align-items-center h-100",children:E&&Object(x.jsx)("div",{className:"spinner-border"})})]}),Object(x.jsx)("hr",{className:"dropdown-divider"}),Object(x.jsx)("div",{className:"row m-0 px-3",children:Object(x.jsx)("span",{className:"m-0",children:"Create a new playlist"})}),Object(x.jsx)("div",{className:"row m-0 px-3",children:Object(x.jsxs)("form",{onSubmit:function(e){e.preventDefault(),e.stopPropagation(),k({type:"create"})},children:[Object(x.jsxs)("div",{className:"form-group mb-2 mt-2",children:[Object(x.jsx)("input",{type:"text",className:"form-control","aria-label":"playlistNameInput",placeholder:"Enter playlist title...",ref:f,onChange:function(e){return T("title",e.target.value)}}),Object(x.jsx)("div",{className:"invalid-feedback",children:S})]}),Object(x.jsx)("div",{className:"form-group mb-2 mt-2",children:Object(x.jsxs)("select",{className:"form-control",onChange:function(e){return T("isPublic","public"===e.target.value)},children:[Object(x.jsx)("option",{value:"private",children:"Private"}),Object(x.jsx)("option",{value:"public",children:"Public"})]})}),Object(x.jsxs)("div",{className:"d-flex align-items-center mt-2",children:[Object(x.jsx)("button",{type:"submit",className:"btn btn-primary",disabled:_,children:"Create"}),_&&Object(x.jsx)("div",{className:"spinner-grow ml-2"})]})]})})]})},w=n(581),N=n.n(w),k=n(47);n(670);t.a=function(e){var t=e.isRecommendations,n=e.filmDispatch,s=e.filmID,r=Object(i.useRef)(),o=N()({background:"black"}),l=Object(c.a)(o,2),d=l[0],u=l[1],p=Object(i.useState)(!1),b=Object(c.a)(p,2),j=b[0],f=b[1],m=function(){f(!0)},h=function(){f(!1)};return Object(i.useEffect)((function(){if(r.current){var e=window.$("#playlistDropdown".concat(s));return e.on("show.bs.dropdown",m),e.on("hide.bs.dropdown",h),function(){e.off("show.bs.dropdown",m),e.off("hide.bs.dropdown",h)}}}),[r,s]),Object(x.jsxs)("div",{ref:r,id:"playlistDropdown".concat(s),className:"p-0 dropdown dropdown-sizes",children:[Object(x.jsx)("button",{onMouseDown:d,id:"playlistAddButtonLabel".concat(s),type:"button","data-toggle":"dropdown","data-boundary":"window",className:"btn btn-link button-ripple dropdown-toggle p-0 text-dark",children:Object(x.jsxs)("div",{className:"col playlist-add-icon-holder p-0 button-ripple button-ripple-24",children:[Object(x.jsx)(a.a,{style:{opacity:j?1:""},className:"playlist-add-icon",icon:k.b}),u]})}),Object(x.jsx)("div",{className:"dropdown-menu playlist-dropdown-menu ".concat(t?"dropdown-menu-right":"playlist-dropdown-menu-position"),id:"playlistDropdownMenu".concat(s),"aria-labelledby":"playlistAddButtonLabel".concat(s),children:j&&Object(x.jsx)(g,{isRecommendations:t,filmDispatch:n,filmID:s})})]})}},670:function(e,t,n){},671:function(e,t,n){}}]);
//# sourceMappingURL=1.5b2f5fc5.chunk.js.map