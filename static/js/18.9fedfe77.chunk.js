(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[18],{316:function(e,t,a){"use strict";var i=a(29),c=a(0),s=a(276),n=a(289),l=a.n(n),o=a(291),r=a(297),u=a(296),d=a(1);t.a=function(e){var t=e.playlist,a=e.handleRedirect,n=e.handleRemove,m=e.isProfile,p=e.dispatchPrivacyUpdate,f=m?8:10,b=Object(c.useState)("mb-5 play-outer-container remove-container"),j=Object(i.a)(b,2),O=j[0],h=j[1];return Object(c.useEffect)((function(){t.film_id||h("mb-5 play-cursor-default remove-container")}),[t.film_id]),Object(d.jsx)("div",{className:"col-12 col-sm-6 col-md-3 col-lg-2",children:Object(d.jsxs)("div",{className:"col ".concat(O),onClick:function(){return a(t.id,t.film_id)},children:[Object(d.jsxs)("div",{className:"embed-responsive embed-responsive-16by9 z-depth-1-half play-container",children:[Object(d.jsx)(o.a,{image:t.img}),Object(d.jsxs)("div",{style:{width:"100%",margin:0},className:"row play-middle",children:[Object(d.jsx)("div",{className:"col-5 col-sm-5",style:{display:"flex",justifyContent:"flex-end",alignItems:"center"},children:Object(d.jsx)(s.a,{icon:"play"})}),Object(d.jsx)("div",{className:"col-7 col-sm-7",style:{display:"flex",justifyContent:"flex-start",alignItems:"center"},children:Object(d.jsx)("small",{className:"fw-bold",children:"Play all"})})]})]}),Object(d.jsxs)("div",{className:"row m-0 mt-1",children:[Object(d.jsx)("div",{className:"p-0 col-".concat(f," col-sm-").concat(f),children:Object(d.jsx)(l.a,{line:1,text:t.title,className:"mb-1 mt-1 title "})}),m&&Object(d.jsxs)("div",{className:"col-4 col-sm-4 p-0 d-flex justify-content-end",children:[Object(d.jsx)(u.a,{id:t.id,isPublic:t.is_public,isProfile:!0,dispatchPrivacyUpdate:p}),Object(d.jsx)(r.a,{handleRemove:n})]})]}),Object(d.jsx)("p",{className:"mb-0 author-nick",children:Object(d.jsx)("span",{children:t.author_name})})]})},t.id)}},317:function(e,t,a){"use strict";t.a=a.p+"static/media/image_not_found.c4ba1e76.png"},439:function(e,t,a){"use strict";a.r(t);var i=a(270),c=a.n(i),s=a(27),n=a(2),l=a(271),o=a(29),r=a(0),u=a(7),d=a(44),m=a(277),p={data:null,isLoading:!1,isAllFetched:!1,isRemoving:!1,toRemove:null,error:null,filmsCount:0,playlistsCount:0};function f(e,t){switch(t.type){case"field":return Object(n.a)(Object(n.a)({},e),{},Object(d.a)({},t.fieldName,t.payload));case"initial-success":return Object(n.a)(Object(n.a)({},e),{},{isLoading:!1,isInitialLoaded:!0,isAllFetched:t.filmsCount<m.c&&t.playlistsCount<m.c,filmsCount:e.filmsCount+t.filmsCount,playlistsCount:e.playlistsCount+t.playlistsCount,data:Object(s.a)(new Set(t.data))});case"load":return e.isLoading||e.isAllFetched||!e.isInitialLoaded||e.error?e:Object(n.a)(Object(n.a)({},e),{},{isLoading:!0,isAllFetched:!1});case"success":return Object(n.a)(Object(n.a)({},e),{},{isLoading:!1,isAllFetched:t.filmsCount<m.c&&t.playlistsCount<m.c,filmsCount:e.filmsCount+t.filmsCount,playlistsCount:e.playlistsCount+t.playlistsCount,data:Object(s.a)(new Set([].concat(Object(s.a)(e.data),Object(s.a)(t.data))))});case"remove":return Object(n.a)(Object(n.a)({},e),{},{toRemove:t.payload,isRemoving:!0});case"remove-success":return Object(n.a)(Object(n.a)({},e),{},{isRemoving:!1,toRemove:null,data:e.toRemove?e.data.filter((function(t){return t.id!==e.toRemove.id})):e.data});case"change-playlist-privacy-success":return Object(n.a)(Object(n.a)({},e),{},{data:e.data.map((function(e){return e.isPlaylist&&e.id===t.payload.id?Object(n.a)(Object(n.a)({},e),{},{is_public:t.payload.is_public}):e}))});case"clear":return p;default:return e}}var b=a(304),j=a(316),O=a(295),h=a(285),y=a(281),v=a(51),x=a(52),g=a(279),C=a(317),k=a(290),P=a(1);t.default=function(){var e=Object(r.useContext)(v.a),t=e.user,a=e.clearUser,i=Object(r.useContext)(x.a),d=i.showModal,R=i.clear,w=i.removeModalData,N=Object(u.g)(),_=Object(r.useReducer)(f,p),L=Object(o.a)(_,2),F=L[0],A=L[1],I=F.data,S=F.isLoading,E=F.isAllFetched,U=F.isInitialLoaded,J=F.error,M=F.isRemoving,z=F.toRemove,D=F.filmsCount,q=F.playlistsCount,B=Object(r.useCallback)((function(){S||E||!U||J||A({type:"load"})}),[S,E,U,J]);Object(g.a)(B,{triggerOnNoScroll:!0}),Object(r.useEffect)((function(){!t.auth&&t.isInitialLoaded&&(N.replace("".concat("/filmapp-react-frontend/")),N.push("".concat("/filmapp-react-frontend/","login")),a())}),[t,N,a]),Object(r.useEffect)((function(){function e(){return(e=Object(l.a)(c.a.mark((function e(){var t,a,i,l,r,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.allSettled([O.a({skipFilms:0,skipPlaylists:0,limit:m.b})]);case 2:t=e.sent,a=Object(o.a)(t,1),i=a[0],l=[],r=[],u=[],"fulfilled"===i.status&&(r=i.value.data.films.map((function(e){return Object(n.a)(Object(n.a)({},e),{},{img:"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(e.id,"/thumbnail")})})),u=i.value.data.playlists.map((function(e){var t=e.film_id?"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(e.film_id,"/thumbnail"):C.a;return Object(n.a)(Object(n.a)({},e),{},{img:t,isPlaylist:!0})})),l=[].concat(Object(s.a)(l),Object(s.a)(r),Object(s.a)(u))),A({type:"initial-success",data:l,filmsCount:r.length,playlistsCount:u.length});case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}A({type:"clear"}),function(){e.apply(this,arguments)}()}),[]),Object(r.useEffect)((function(){function e(){return(e=Object(l.a)(c.a.mark((function e(){var t,a,i,l,r,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.allSettled([O.a({skipFilms:D,skipPlaylists:q,limit:m.c})]);case 2:t=e.sent,a=Object(o.a)(t,1),i=a[0],l=[],r=[],u=[],"fulfilled"===i.status&&(r=i.value.data.films.map((function(e){return Object(n.a)(Object(n.a)({},e),{},{img:"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(e.id,"/thumbnail")})})),u=i.value.data.playlists.map((function(e){var t=e.film_id?"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(e.film_id,"/thumbnail"):C.a;return Object(n.a)(Object(n.a)({},e),{},{img:t,isPlaylist:!0})})),l=[].concat(Object(s.a)(l),Object(s.a)(r),Object(s.a)(u))),A({type:"success",data:l,filmsCount:r.length,playlistsCount:u.length});case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}S&&U&&function(){e.apply(this,arguments)}()}),[D,S,q,U]),Object(r.useEffect)((function(){function e(){return(e=Object(l.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!z.isPlaylist){e.next=8;break}return e.next=4,h.d(z.id);case 4:204===e.sent.status&&(A({type:"remove-success"}),R()),e.next=12;break;case 8:return e.next=10,y.e(z.id);case 10:204===e.sent.status&&(A({type:"remove-success"}),R());case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.error(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})))).apply(this,arguments)}M&&w.isRemoving&&z&&w.id===z.id&&w.title===z.title&&w.type===(z.isPlaylist?"playlist":"film")&&function(){e.apply(this,arguments)}()}),[M,w,z,R]);var G=function(e,t){e.stopPropagation(),w.isRemoving||(A({type:"remove",payload:t}),d(t.id,t.isPlaylist?"playlist":"film",t.title))};return Object(P.jsxs)("div",{className:"row mt-5 mx-2",children:[I?I.map((function(e,t){return e.isPlaylist?Object(P.jsx)(j.a,{playlist:e,index:t,isProfile:!0,dispatchPrivacyUpdate:A,handleRedirect:function(){return function(e){e.film_id&&N.push({pathname:"".concat("/filmapp-react-frontend/","film/")+e.film_id,search:"?list=".concat(e.id)})}(e)},handleRemove:function(t){return G(t,e)}},e.id):Object(P.jsx)(b.a,{isProfile:!0,film:e,index:t,handleRedirect:function(){return t=e.id,void N.push({pathname:"".concat("/filmapp-react-frontend/","film/")+t});var t},handleRemove:function(t){return G(t,e)}},e.id)})):Object(s.a)(Array(20)).map((function(e,t){return Object(P.jsx)(k.a,{},t)})),!E&&Object(P.jsx)("div",{className:"fetch-loader d-flex justify-content-center",children:S&&Object(P.jsx)("div",{className:"spinner-border"})})]})}}}]);
//# sourceMappingURL=18.9fedfe77.chunk.js.map