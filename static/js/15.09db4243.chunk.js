(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[15],{514:function(t,e,a){"use strict";a.r(e);var i=a(528),c=a.n(i),n=a(536),s=a(15),l=a(529),o=a(60),r=a(1),u=a(7),d=a(137),m=a(535),p={data:null,isLoading:!1,isAllFetched:!1,isRemoving:!1,toRemove:null,error:null,filmsCount:0,playlistsCount:0};function f(t,e){switch(e.type){case"field":return Object(s.a)(Object(s.a)({},t),{},Object(d.a)({},e.fieldName,e.payload));case"initial-success":return Object(s.a)(Object(s.a)({},t),{},{isLoading:!1,isInitialLoaded:!0,isAllFetched:e.filmsCount<m.c&&e.playlistsCount<m.c,filmsCount:t.filmsCount+e.filmsCount,playlistsCount:t.playlistsCount+e.playlistsCount,data:Object(n.a)(new Set(e.data))});case"load":return t.isLoading||t.isAllFetched||!t.isInitialLoaded||t.error?t:Object(s.a)(Object(s.a)({},t),{},{isLoading:!0,isAllFetched:!1});case"success":return Object(s.a)(Object(s.a)({},t),{},{isLoading:!1,isAllFetched:e.filmsCount<m.c&&e.playlistsCount<m.c,filmsCount:t.filmsCount+e.filmsCount,playlistsCount:t.playlistsCount+e.playlistsCount,data:Object(n.a)(new Set([].concat(Object(n.a)(t.data),Object(n.a)(e.data))))});case"remove":return Object(s.a)(Object(s.a)({},t),{},{toRemove:e.payload,isRemoving:!0});case"remove-success":return Object(s.a)(Object(s.a)({},t),{},{isRemoving:!1,toRemove:null,data:t.toRemove?t.data.filter((function(e){return e.id!==t.toRemove.id})):t.data});case"change-playlist-privacy-success":return Object(s.a)(Object(s.a)({},t),{},{data:t.data.map((function(t){return t.isPlaylist&&t.id===e.payload.id?Object(s.a)(Object(s.a)({},t),{},{is_public:e.payload.is_public}):t}))});case"clear":return p;default:return t}}var j=a(566),b=a(574),O=a(552),h=a(543),v=a(539),y=a(80),x=a(81),g=a(537),C=a(575),k=a(548),P=(a(576),a(2));e.default=function(){var t=Object(r.useContext)(y.a),e=t.user,a=t.clearUser,i=Object(r.useContext)(x.a),d=i.showModal,R=i.clear,w=i.removeModalData,N=Object(u.g)(),_=Object(r.useReducer)(f,p),L=Object(o.a)(_,2),F=L[0],A=L[1],S=F.data,E=F.isLoading,I=F.isAllFetched,U=F.isInitialLoaded,J=F.error,M=F.isRemoving,D=F.toRemove,q=F.filmsCount,z=F.playlistsCount,B=Object(r.useCallback)((function(){E||I||!U||J||A({type:"load"})}),[E,I,U,J]);Object(g.a)(B,{triggerOnNoScroll:!0}),Object(r.useEffect)((function(){!e.auth&&e.isInitialLoaded&&(N.replace("".concat("/filmapp-react-frontend/")),N.push("".concat("/filmapp-react-frontend/","login")),a())}),[e,N,a]),Object(r.useEffect)((function(){function t(){return(t=Object(l.a)(c.a.mark((function t(){var e,a,i,l,r,u;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.allSettled([O.a({skipFilms:0,skipPlaylists:0,limit:m.b})]);case 2:e=t.sent,a=Object(o.a)(e,1),i=a[0],l=[],r=[],u=[],"fulfilled"===i.status&&(r=i.value.data.films.map((function(t){return Object(s.a)(Object(s.a)({},t),{},{img:"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(t.id,"/thumbnail")})})),u=i.value.data.playlists.map((function(t){var e=t.film_id?"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(t.film_id,"/thumbnail"):C.a;return Object(s.a)(Object(s.a)({},t),{},{img:e,isPlaylist:!0})})),l=[].concat(Object(n.a)(l),Object(n.a)(r),Object(n.a)(u))),A({type:"initial-success",data:l,filmsCount:r.length,playlistsCount:u.length});case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}A({type:"clear"}),function(){t.apply(this,arguments)}()}),[]),Object(r.useEffect)((function(){function t(){return(t=Object(l.a)(c.a.mark((function t(){var e,a,i,l,r,u;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.allSettled([O.a({skipFilms:q,skipPlaylists:z,limit:m.c})]);case 2:e=t.sent,a=Object(o.a)(e,1),i=a[0],l=[],r=[],u=[],"fulfilled"===i.status&&(r=i.value.data.films.map((function(t){return Object(s.a)(Object(s.a)({},t),{},{img:"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(t.id,"/thumbnail")})})),u=i.value.data.playlists.map((function(t){var e=t.film_id?"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(t.film_id,"/thumbnail"):C.a;return Object(s.a)(Object(s.a)({},t),{},{img:e,isPlaylist:!0})})),l=[].concat(Object(n.a)(l),Object(n.a)(r),Object(n.a)(u))),A({type:"success",data:l,filmsCount:r.length,playlistsCount:u.length});case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}E&&U&&function(){t.apply(this,arguments)}()}),[q,E,z,U]),Object(r.useEffect)((function(){function t(){return(t=Object(l.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!D.isPlaylist){t.next=8;break}return t.next=4,h.d(D.id);case 4:204===t.sent.status&&(A({type:"remove-success"}),R()),t.next=12;break;case 8:return t.next=10,v.e(D.id);case 10:204===t.sent.status&&(A({type:"remove-success"}),R());case 12:t.next=17;break;case 14:t.prev=14,t.t0=t.catch(0),console.error(t.t0);case 17:case"end":return t.stop()}}),t,null,[[0,14]])})))).apply(this,arguments)}M&&w.isRemoving&&D&&w.id===D.id&&w.title===D.title&&w.type===(D.isPlaylist?"playlist":"film")&&function(){t.apply(this,arguments)}()}),[M,w,D,R]);var G=function(t,e){t.stopPropagation(),w.isRemoving||(A({type:"remove",payload:e}),d(e.id,e.isPlaylist?"playlist":"film",e.title))};return Object(P.jsxs)("div",{className:"row mt-5 mx-2",children:[S?S.map((function(t,e){return t.isPlaylist?Object(P.jsx)(b.a,{playlist:t,index:e,isProfile:!0,dispatchPrivacyUpdate:A,handleRedirect:function(){return function(t){t.film_id&&N.push({pathname:"".concat("/filmapp-react-frontend/","film/")+t.film_id,search:"?list=".concat(t.id)})}(t)},handleRemove:function(e){return G(e,t)}},t.id):Object(P.jsx)(j.a,{isProfile:!0,film:t,index:e,handleRedirect:function(){return e=t.id,void N.push({pathname:"".concat("/filmapp-react-frontend/","film/")+e});var e},handleRemove:function(e){return G(e,t)}},t.id)})):Object(n.a)(Array(20)).map((function(t,e){return Object(P.jsx)(k.a,{},e)})),!I&&Object(P.jsx)("div",{className:"fetch-loader d-flex justify-content-center",children:E&&Object(P.jsx)("div",{className:"spinner-border"})})]})}},574:function(t,e,a){"use strict";var i=a(60),c=a(1),n=a(534),s=a(547),l=a.n(s),o=a(557),r=a(554),u=a(553),d=a(2);e.a=function(t){var e=t.playlist,a=t.handleRedirect,s=t.handleRemove,m=t.isProfile,p=t.dispatchPrivacyUpdate,f=m?8:10,j=Object(c.useState)("mb-4 play-outer-container remove-container"),b=Object(i.a)(j,2),O=b[0],h=b[1];return Object(c.useEffect)((function(){e.film_id||h("mb-4 play-cursor-default remove-container")}),[e.film_id]),Object(d.jsx)("div",{className:"col-12 col-sm-6 col-md-3 col-lg-2 container-px",children:Object(d.jsxs)("div",{className:"col ".concat(O," p-0"),onClick:function(){return a(e.id,e.film_id)},children:[Object(d.jsxs)("div",{className:"play-container p-0",children:[Object(d.jsx)(o.a,{image:e.img}),Object(d.jsxs)("div",{className:"row play-middle w-100 m-0",children:[Object(d.jsx)("div",{className:"col-5 col-sm-5 pr-1 d-flex justify-content-end align-items-center",children:Object(d.jsx)(n.a,{icon:"play"})}),Object(d.jsx)("div",{className:"col-7 col-sm-7 pl-1 d-flex justify-content-start align-items-center",children:Object(d.jsx)("small",{className:"font-weight-bold",children:"Play all"})})]})]}),Object(d.jsxs)("div",{className:"row m-0 mt-1",children:[Object(d.jsx)("div",{className:"p-0 col-".concat(f," col-sm-").concat(f),children:Object(d.jsx)(l.a,{line:1,text:e.title,className:"mb-1 mt-1 title "})}),m&&Object(d.jsxs)("div",{className:"col-4 col-sm-4 p-0 d-flex justify-content-end",children:[Object(d.jsx)(u.a,{id:e.id,isPublic:e.is_public,isProfile:!0,dispatchPrivacyUpdate:p}),Object(d.jsx)(r.a,{handleRemove:s})]})]}),Object(d.jsx)("p",{className:"mb-0 author-nick",children:Object(d.jsx)("span",{children:e.author_name})})]})},e.id)}},575:function(t,e,a){"use strict";e.a=a.p+"static/media/image_not_found.c4ba1e76.png"},576:function(t,e,a){a(577)},577:function(t,e,a){"use strict";var i=a(0),c=a(8),n=a(141),s=a(241),l=a(9);i({target:"Promise",stat:!0},{allSettled:function(t){var e=this,a=n.f(e),i=a.resolve,o=a.reject,r=s((function(){var a=c(e.resolve),n=[],s=0,o=1;l(t,(function(t){var c=s++,l=!1;n.push(void 0),o++,a.call(e,t).then((function(t){l||(l=!0,n[c]={status:"fulfilled",value:t},--o||i(n))}),(function(t){l||(l=!0,n[c]={status:"rejected",reason:t},--o||i(n))}))})),--o||i(n)}));return r.error&&o(r.value),a.promise}})}}]);
//# sourceMappingURL=15.09db4243.chunk.js.map