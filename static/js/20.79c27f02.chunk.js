(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[20],{315:function(e,t,c){"use strict";var n=c(29),i=c(0);t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:600,t=Object(i.useState)(!1),c=Object(n.a)(t,2),a=c[0],s=c[1],r=function(){s(window.innerWidth<e)};return Object(i.useEffect)((function(){return r(),window.addEventListener("resize",r),function(){return window.removeEventListener("resize",r)}}),[]),a}},319:function(e,t,c){"use strict";t.a=c.p+"static/media/image_not_found.c4ba1e76.png"},436:function(e,t,c){"use strict";c.r(t);var n=c(2),i=c(7),a=c(307),s=c.n(a),r=c(270),l=c.n(r),o=c(271),d=c(29),u=c(0),m=c(276),p=c(35),j=c(404),b=c(293),f=c.n(b),h=(c(421),c(44)),O={film:{img:"",video:"",film:"",title:"",views:"",likes:"",dislikes:"",description:"\r\n\n\n"},isLiked:!1,isDisliked:!1,isLikeButtonClicked:!1,likeAction:null,isDescExpanded:!1};function x(e,t){switch(t.type){case"field":return Object(n.a)(Object(n.a)({},e),{},Object(h.a)({},t.fieldName,t.payload));case"like":return Object(n.a)(Object(n.a)({},e),{},{isLikeButtonClicked:!0,likeAction:t.payload});case"success":return Object(n.a)(Object(n.a)({},e),{},{film:t.film,isLiked:t.isLiked,isDisliked:t.isDisliked,isLikeButtonClicked:!1,likeAction:null,isDescExpanded:!1});case"error":return Object(n.a)(Object(n.a)({},e),{},{isLikeButtonClicked:!1,likeAction:null});default:return e}}var v=c(281),y=c(286),g=Object(u.createContext)(),k=c(51),w=c(1),N=function(e){var t=Object(i.g)(),c=Object(i.h)(),a=Object(u.useContext)(k.a).user,s=Object(u.useContext)(g),r=Object(d.a)(s,2),b=(r[0],r[1]),h=Object(u.useCallback)((function(e){null!==e&&(b({type:"field",fieldName:"playerHeight",payload:e.getBoundingClientRect().height}),B(e))}),[b]),N=Object(u.useReducer)(x,O),C=Object(d.a)(N,2),F=C[0],L=C[1],R=F.film,E=F.isLiked,A=F.isDisliked,I=F.isLikeButtonClicked,_=F.likeAction,D=F.isDescExpanded,P=Object(u.useState)(null),S=Object(d.a)(P,2),H=S[0],B=S[1];Object(u.useEffect)((function(){if(H){var e=function(){b({type:"field",fieldName:"playerHeight",payload:H.getBoundingClientRect().height})};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}}),[H,b]),Object(u.useEffect)((function(){function t(){return(t=Object(o.a)(l.a.mark((function t(){var c,i,s,r,o,u,m,p,j,f,h;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=[v.c(e.match.params.id),v.g(e.match.params.id)],a.auth&&c.push(y.a({details:!0})),t.next=4,Promise.allSettled(c);case 4:if(i=t.sent,s=Object(d.a)(i,3),r=s[0],o=s[1],u=s[2],"rejected"!==r.status&&"rejected"!==o.status){t.next=12;break}return b({type:"field",fieldName:"error",payload:!0}),t.abrupt("return");case 12:m=r.value.data,b({type:"success",comments:m.comments,commentsCount:m.comments_count}),p=Object(n.a)(Object(n.a)({},m),{},{img:"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(m.id,"/thumbnail?width=poster"),video:"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(m.id,"/video"),views:o.value.data.views}),j=!1,f=!1,u&&"fulfilled"===u.status&&(h=u.value.data.details,j=h.liked.indexOf(e.match.params.id)>-1,f=h.disliked.indexOf(e.match.params.id)>-1),L({type:"success",film:p,isLiked:j,isDisliked:f});case 19:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e.match.params.id,b,a.auth]),Object(u.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){var n,i,a,s,r,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==_){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,v.d(R.id,{action:_});case 5:return n=e.sent,(i=n.data).img="".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(i.id,"/thumbnail?width=poster"),i.video="".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(i.id,"/video"),e.next=11,y.a({details:!0});case 11:a=e.sent,s=a.data.details,r=s.liked.indexOf(i.id)>-1,o=s.disliked.indexOf(i.id)>-1,L({type:"success",film:i,isLiked:r,isDisliked:o}),e.next=23;break;case 18:e.prev=18,e.t0=e.catch(2),console.error(e.t0),L({type:"error"}),e.t0.response&&401===e.t0.response.status&&t.push("".concat(c.pathname,"/login"));case 23:case"end":return e.stop()}}),e,null,[[2,18]])})))).apply(this,arguments)}I&&function(){e.apply(this,arguments)}()}),[R.id,I,_,t,c]);var z=function(e){e.preventDefault(),L({type:"field",fieldName:"isDescExpanded",payload:!D})},T=function(e){I||L({type:"like",payload:e})},M=function(e){return Object(w.jsx)("span",{children:Object(w.jsx)("button",{className:"btn btn-link p-0 m-0 mb-1 title fw-bold",onClick:z,children:e})})};return Object(w.jsxs)("div",{children:[Object(w.jsx)("div",{className:"col col-sm-12",children:Object(w.jsx)("div",{ref:h,children:Object(w.jsx)(j.Player,{playsInline:!0,poster:R.img,src:R.video})})}),R&&Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("div",{className:"col col-sm-12 mt-4",children:Object(w.jsxs)("div",{className:"row p-0 m-0",children:[Object(w.jsxs)("div",{className:"col col-sm-12 p-0",children:[!R.title&&Object(w.jsx)("p",{className:"fw-bold",children:Object(w.jsx)("br",{})}),Object(w.jsx)("p",{className:"fw-bold",children:R.title})]}),Object(w.jsx)("div",{className:"col-4 col-sm-4 p-0",children:Object(w.jsxs)("p",{children:[Object(w.jsx)(m.a,{icon:p.b})," \u2002",R.views]})}),Object(w.jsx)("div",{className:"col-4 col-sm-4 text-right d-flex justify-content-end",children:Object(w.jsxs)("p",{style:{cursor:"pointer"},className:E?"film-picked-thumb-color":"",onClick:function(){return T("like")},children:[Object(w.jsx)(m.a,{icon:p.k}),"\u2002",R.likes]})}),Object(w.jsx)("div",{className:"col-4 col-sm-4",children:Object(w.jsxs)("p",{style:{cursor:"pointer"},className:A?"film-picked-thumb-color":"",onClick:function(){return T("dislike")},children:[Object(w.jsx)(m.a,{icon:p.j}),"\u2002",R.dislikes]})}),Object(w.jsx)("div",{className:"col col-sm-12 mt-4 mb-4 divider"}),Object(w.jsxs)("div",{className:"col col-sm-12 p-0",style:{whiteSpace:"pre-line",textAlign:"justify"},children:[Object(w.jsx)(f.a,{line:!D&&2,truncateText:"\u2026",text:R.description,textTruncateChild:M("Show more")}),D&&M("Show less")]})]})}),Object(w.jsx)("div",{className:"col col-sm-12 mt-4 mb-2 divider"})]})]})},C=c(27),F=c(277),L={films:null,id:null,isLoading:!1,isAllFetched:!1,isInitialLoaded:!1,error:null};function R(e,t){switch(t.type){case"field":return Object(n.a)(Object(n.a)({},e),{},Object(h.a)({},t.fieldName,t.payload));case"clear":return L;case"initial-success":return Object(n.a)(Object(n.a)({},L),{},{films:t.films,id:t.id,isInitialLoaded:!0});case"load":return Object(n.a)(Object(n.a)({},e),{},{isLoading:!0,isAllFetched:!1});case"success":return Object(n.a)(Object(n.a)({},e),{},{films:[].concat(Object(C.a)(e.films),Object(C.a)(t.payload)),isLoading:!1,isAllFetched:t.payload.length<F.e});case"error":return Object(n.a)(Object(n.a)({},L),{},{error:t.payload});default:return e}}var E=c(316),A=c(278),I=function(e){var t=Object(u.useContext)(g),c=Object(d.a)(t,2),n=c[0],i=c[1],a=Object(u.useReducer)(R,L),s=Object(d.a)(a,2),r=s[0],m=s[1],p=r.films,j=r.isLoading,b=r.isAllFetched,f=r.isInitialLoaded,h=r.id,O=r.error,x=Object(u.useCallback)((function(){j||b||!f||O||!h||m({type:"load"})}),[j,b,f,O,h]);return Object(A.a)(x),Object(u.useEffect)((function(){function t(){return(t=Object(o.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.a({exclude:e.match.params.id,limit:F.e}).then((function(t){var c=t.data;c.forEach((function(e){e.img="".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(e.id,"/thumbnail")})),m({type:"initial-success",films:c,id:e.match.params.id})})).catch((function(e){return console.error(e)}));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}m({type:"clear"}),n.isPreviewLoaded&&function(){t.apply(this,arguments)}()}),[e.match.params.id,n.isPreviewLoaded]),Object(u.useEffect)((function(){n.error&&m({type:"error",payload:n.error})}),[n.error]),Object(u.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a({exclude:h,skip:p.length,limit:F.e}).then((function(e){var t=e.data;t.forEach((function(e){e.img="".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(e.id,"/thumbnail")})),m({type:"success",payload:t})})).catch((function(e){return console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}j&&p&&h&&function(){e.apply(this,arguments)}()}),[j,h,p]),Object(w.jsxs)("div",{className:"col",children:[p&&p.map((function(t,c){return Object(w.jsx)(E.a,{film:t,index:c,isRecommendations:!0,filmDispatch:i,handleRedirect:function(){return e.handleRedirect(t.id)}},t.id)})),!b&&Object(w.jsx)("div",{className:"fetch-loader d-flex justify-content-center",children:j&&!O&&Object(w.jsx)("div",{className:"spinner-border"})})]})},_={comments:null,commentsCount:null,text:"",id:null,isLoading:!1,isAllFetched:!1,isInitialLoaded:!1,isAdding:!1,isRemoving:!1,toRemove:null,isSorting:!1,sort:null,sorts:[{id:"created_at",title:"By date",dir:1},{id:"author_name",title:"By author name",dir:1}],error:null};function D(e,t){switch(t.type){case"field":return Object(n.a)(Object(n.a)({},e),{},Object(h.a)({},t.fieldName,t.payload));case"clear":return Object(n.a)(Object(n.a)({},_),{},{id:t.id});case"load":return e.isLoading||e.isAllFetched||!e.isInitialLoaded||e.isAdding||e.error||!e.id||e.isSorting?e:Object(n.a)(Object(n.a)({},e),{},{isLoading:!0});case"initial-success":return Object(n.a)(Object(n.a)({},e),{},{comments:t.comments,commentsCount:t.commentsCount,isAllFetched:t.comments.length<F.a,isInitialLoaded:!0,error:null});case"load-success":return Object(n.a)(Object(n.a)({},e),{},{comments:[].concat(Object(C.a)(e.comments),Object(C.a)(t.payload)),isLoading:!1,isAllFetched:t.payload.length<F.a});case"add":return Object(n.a)(Object(n.a)({},e),{},{isAdding:!0,error:null});case"add-success":return Object(n.a)(Object(n.a)({},e),{},{text:"",commentsCount:e.commentsCount+1,comments:[t.payload].concat(Object(C.a)(e.comments)),isAdding:!1});case"remove":return Object(n.a)(Object(n.a)({},e),{},{isRemoving:!0,toRemove:t.payload});case"remove-success":return Object(n.a)(Object(n.a)({},e),{},{isRemoving:!1,toRemove:null,commentsCount:e.commentsCount-1,comments:e.toRemove?e.comments.filter((function(t){return t.id!==e.toRemove.id})):e.data});case"sort":return Object(n.a)(Object(n.a)({},e),{},{comments:null,isAllFetched:!1,sorts:e.sorts.map((function(e){return e.id===t.sortToChange.id?t.sortToChange:e})),sort:t.sort,isSorting:!0});case"sort-success":return Object(n.a)(Object(n.a)({},e),{},{isSorting:!1,comments:t.payload});case"error":return Object(n.a)(Object(n.a)({},e),{},{isAdding:!1,isLoading:!1,isSorting:!1,error:t.payload});default:return e}}var P=c(30),S=c(84),H=function(e,t){return P.a.get("films/".concat(e,"/comments"),{params:t})},B=function(e){return P.a.delete("comments/".concat(e),{headers:Object(S.a)()})},z=function(e,t){return P.a.get("films/".concat(e,"/comments/sort"),{params:t,headers:Object(S.a)()})},T=c(288),M=c(52),J=c(280),W=function(e){var t=Object(u.useContext)(M.a),c=t.showModal,n=t.clear,i=t.removeModalData,a=Object(u.useContext)(k.a).user,s=Object(u.useContext)(g),r=Object(d.a)(s,2),p=r[0],j=r[1],b=Object(u.useReducer)(D,_),f=Object(d.a)(b,2),O=f[0],x=f[1],v=O.comments,y=O.commentsCount,N=O.text,C=O.isInitialLoaded,L=O.isLoading,R=O.isAllFetched,E=O.isAdding,I=O.id,W=O.isRemoving,Y=O.toRemove,U=O.isSorting,q=O.sort,G=O.sorts,K=O.error,Q=Object(u.useCallback)((function(){L||R||!C||E||K||!I||U||x({type:"load"})}),[L,R,C,E,K,I,U]);Object(A.a)(Q),Object(u.useEffect)((function(){x({type:"clear",id:e.match.params.id})}),[e.match.params.id]),Object(u.useEffect)((function(){p.error&&x({type:"error",payload:p.error})}),[p.error]),Object(u.useEffect)((function(){p.comments&&null!==p.commentsCount&&x({type:"initial-success",comments:p.comments,commentsCount:p.commentsCount})}),[p.comments,p.commentsCount,j]),Object(u.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H(I,{skip:v.length,limit:F.a}).then((function(e){x({type:"load-success",payload:e.data})})).catch((function(e){x({type:"error"})}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function t(){return(t=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z(I,(t={},Object(h.a)(t,q.id,q.dir),Object(h.a)(t,"skip",v.length),Object(h.a)(t,"limit",F.a),t)).then((function(e){x({type:"load-success",payload:e.data})})).catch((function(e){x({type:"error"})}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}L&&C&&!E&&v&&I&&!U&&(q?function(){t.apply(this,arguments)}():function(){e.apply(this,arguments)}())}),[L,E,I,v,C,U,q]),Object(u.useEffect)((function(){E&&!L&&I&&function(){var e=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={text:N},e.next=3,(c=I,n=t,P.a.post("films/".concat(c,"/comments"),n,{headers:Object(S.a)()})).then((function(e){x({type:"add-success",payload:e.data})})).catch((function(e){x({type:"error",payload:e.response.status})}));case 3:case"end":return e.stop()}var c,n}),e)})));return function(){return e.apply(this,arguments)}}()()}),[E,L,I,N]),Object(u.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B(Y.id).then((function(e){x({type:"remove-success"}),n()})).catch((function(e){n(),console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}W&&Y&&i.isRemoving&&i.id===Y.id&&"comment"===i.type&&i.title===Y.text.substring(0,10).concat("...")&&function(){e.apply(this,arguments)}()}),[W,Y,n,i]),Object(u.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){var t,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=q?(t={},Object(h.a)(t,q.id,q.dir),Object(h.a)(t,"limit",F.a),t):{},e.next=3,z(I,c).then((function(e){x({type:"sort-success",payload:e.data})})).catch((function(e){x({type:"error",payload:"Sort error."}),console.error(e)}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}U&&function(){e.apply(this,arguments)}()}),[U,q,I]);return Object(w.jsxs)("div",{className:"col",children:[Object(w.jsxs)("div",{className:"row p-0 mt-4 mb-4",children:[Object(w.jsx)("div",{className:"col-7 col-sm-5 col-md-4 d-flex align-items-center ",children:null!==y&&Object(w.jsxs)("span",{children:[y,1===y?" comment":" comments"," "]})}),Object(w.jsxs)("div",{className:"dropdown col-2 col-sm-2",children:[Object(w.jsx)("button",{className:"btn btn-secondary dropdown-toggle",id:"sortDropDown","data-bs-toggle":"dropdown","aria-expanded":"false",children:"Sort"}),Object(w.jsx)("ul",{className:"dropdown-menu","aria-labelledby":"#sortDropDown",children:G.map((function(e){return Object(w.jsx)("li",{onClick:function(t){return function(e,t){e.preventDefault();var c=null;switch(t){case"created_at":c=G[0];break;case"author_name":c=G[1];break;default:return}var n=null;q&&q.id===c.id?(c.dir*=-1,n=c,1===c.dir&&(n=null)):n=c,x({type:"sort",sortToChange:c,sort:n})}(t,e.id)},children:Object(w.jsxs)("a",{className:"dropdown-item".concat(q&&e.id===q.id?" active":""),href:"#",role:"button",children:[e.title,q&&q.id===e.id&&1===e.dir?Object(w.jsx)(m.a,{className:"ms-2",icon:"sort-up"}):q&&q.id===e.id&&-1===e.dir?Object(w.jsx)(m.a,{className:"ms-2",icon:"sort-down"}):""]})},e.id)}))})]})]}),Object(w.jsxs)("form",{onSubmit:N&&!E?function(){x({type:"add"})}:null,children:[Object(w.jsx)("div",{id:"fiordur",children:Object(w.jsx)("input",{type:"text",className:"form-input",placeholder:"Comment",value:N,onChange:function(e){return x({type:"field",fieldName:"text",payload:e.target.value})}})}),Object(w.jsx)("div",{className:"col d-flex justify-content-end",children:Object(w.jsx)("button",{disabled:E||!N,type:"submit",className:"btn btn-primary mt-3",children:"Submit"})})]}),E&&Object(w.jsx)("div",{style:{height:"32px"},className:"d-flex justify-content-center",children:Object(w.jsx)("div",{className:"spinner-border"})}),v&&v.map((function(e){return Object(w.jsxs)("div",{className:"col col-sm-12 p-0 mt-4 remove-container",children:[Object(w.jsxs)("div",{className:"d-flex",children:[Object(w.jsx)("p",{className:"m-0 fw-bold",children:Object(w.jsxs)("small",{className:"m-0 fw-bold",children:[e.author_name,"\xa0"]})}),Object(w.jsx)("p",{children:Object(w.jsx)("small",{className:"m-0",children:Object(T.b)(e)})}),a.id===e.author_id&&Object(w.jsx)(J.a,{className:"m-button cursor-pointer button-ripple-24 d-flex justify-content-center align-items-center remove-holder p-0 m-0 ms-auto",onClick:function(){return function(e){i.isRemoving||(x({type:"remove",payload:e}),c(e.id,"comment",e.text.substring(0,10).concat("...")))}(e)},children:Object(w.jsx)(m.a,{icon:"trash-alt"})})]}),Object(w.jsx)("p",{className:"d-block d-sm-block",children:Object(w.jsx)("small",{children:e.text})})]},e.id)})),!R&&Object(w.jsx)("div",{className:"fetch-loader d-flex justify-content-center",children:(L||U)&&!K&&Object(w.jsx)("div",{className:"spinner-border"})})]})},Y=c(422),U=c.n(Y),q=(c(425),{playlist:null,currentFilm:null,currentFilmIndex:0,isLoading:!1,isRemovingPlaylist:!1,isRemovingFilm:!1,removingFilmId:null,headerHeight:null,playerHeight:null}),G=function(e,t){switch(t.type){case"field":return Object(n.a)(Object(n.a)({},e),{},Object(h.a)({},t.fieldName,t.payload));case"success":return Object(n.a)(Object(n.a)({},e),{},{isLoading:!1,playlist:t.playlist,currentFilm:t.currentFilm,currentFilmIndex:t.currentFilmIndex});case"clear":return q;case"remove-film":return Object(n.a)(Object(n.a)({},e),{},{removingFilmId:t.payload,isRemovingFilm:!0});case"remove-film-success":if(!e.removingFilmId)return Object(n.a)(Object(n.a)({},e),{},{isRemovingFilm:!1});var c=e.playlist.films.filter((function(t){return t.id!==e.removingFilmId}));return Object(n.a)(Object(n.a)({},e),{},{currentFilm:e.removingFilmId===e.currentFilm?null:e.currentFilm,currentFilmIndex:e.removingFilmId===e.currentFilm?0:c.findIndex((function(t){return t.id===e.currentFilm}))+1,playlist:Object(n.a)(Object(n.a)({},e.playlist),{},{films:c}),isRemovingFilm:!1});case"change-playlist-privacy-success":return Object(n.a)(Object(n.a)({},e),{},{playlist:Object(n.a)(Object(n.a)({},e.playlist),{},{is_public:t.payload.is_public})});case"error":return Object(n.a)(Object(n.a)({},e),{},{isLoading:!1,error:t.payload});default:return e}},K=c(291),Q=c(282),V=c(299),X=c(287),Z=c(319),$=function(e){var t=Object(u.useContext)(M.a),c=t.showModal,n=t.clear,a=t.removeModalData,r=Object(i.h)(),p=Object(u.useContext)(k.a).user,j=Object(u.useContext)(g),b=Object(d.a)(j,2),h=b[0],O=b[1],x=Object(u.useReducer)(G,q),v=Object(d.a)(x,2),y=v[0],N=v[1],C=y.playlist,F=y.isRemovingPlaylist,L=y.isRemovingFilm,R=y.removingFilmId,E=y.currentFilm,A=y.currentFilmIndex,I=y.headerHeight,_=y.playerHeight,D=y.error,P=function(){N({type:"clear"})},S=Object(u.useCallback)((function(e){null!==e&&N({type:"field",fieldName:"headerHeight",payload:e.getBoundingClientRect().height})}),[]);Object(u.useEffect)((function(){N({type:"field",fieldName:"playerHeight",payload:h.playerHeight})}),[h.playerHeight]),Object(u.useEffect)((function(){N({type:"error",payload:h.error})}),[h.error]),Object(u.useEffect)((function(){function t(){return(t=Object(o.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Q.b(C.id).then((function(t){var c=0,n=null;return Array.prototype.forEach.call(t.data.films,(function(t,i){t&&t.id===e.match.params.id&&(c=i+1,n=t.id)})),N({type:"success",playlist:t.data,currentFilm:n,currentFilmIndex:c}),O({type:"field",fieldName:"reloadPlaylist",payload:!1}),t.data})).catch((function(e){console.error(e)}));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}h.reloadPlaylist&&C&&function(){t.apply(this,arguments)}()}),[h.reloadPlaylist,C,O,e.match.params.id]),Object(u.useEffect)((function(){var t=s.a.parse(r.search);function c(){return(c=Object(o.a)(l.a.mark((function c(){return l.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Q.b(t.list).then((function(t){var c=0,n=null;return Array.prototype.forEach.call(t.data.films,(function(t,i){t&&t.id===e.match.params.id&&(c=i+1,n=t.id)})),N({type:"success",playlist:t.data,currentFilm:n,currentFilmIndex:c}),t.data})).catch((function(e){console.error(e),P()}));case 2:case"end":return c.stop()}}),c)})))).apply(this,arguments)}t.list?!D&&h.isPreviewLoaded&&function(){c.apply(this,arguments)}():P()}),[e.match.params.id,r.search,D,h.isPreviewLoaded]),Object(u.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.d(C.id).then((function(e){P(),n()})).catch((function(e){console.error(e),n()}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}F&&a.isRemoving&&a.id===C.id&&"playlist"===a.type&&a.title===C.title&&function(){e.apply(this,arguments)}()}),[n,F,C,a]),Object(u.useEffect)((function(){function e(){return(e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Q.c(C.id,{films_id:[R],is_remove_films:!0}).then((function(e){N({type:"remove-film-success"})})).catch((function(e){console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}L&&function(){e.apply(this,arguments)}()}),[L,C,R]);return C&&_&&!D&&Object(w.jsx)("div",{className:"col mb-4",children:Object(w.jsxs)("div",{className:"col p-0 border",children:[Object(w.jsx)("div",{ref:S,style:{height:I+"px"},className:"col remove-container pt-2 pb-2 film-preview-playlist-header",sm:12,children:Object(w.jsxs)("div",{className:"row m-0 px-2",children:[Object(w.jsx)("div",{className:"button-ripple-div-next-width colbutton-ripple-div-next-width",children:Object(w.jsx)("p",{className:"mb-1 fw-bold film-preview-playlist-text-truncate",children:C.title})}),Object(w.jsx)("div",{style:{width:"24px"},className:"p-0 justify-content-end d-flex",children:p.id===C.author_id&&Object(w.jsx)(V.a,{handleRemove:function(){a.isRemoving||(N({type:"field",fieldName:"isRemovingPlaylist",payload:!0}),c(C.id,"playlist",C.title))}})}),Object(w.jsxs)("div",{className:"col-12 col-sm-12",children:[p.id===C.author_id&&Object(w.jsx)(X.a,{id:C.id,isPublic:C.is_public,isProfile:!1,dispatchPrivacyUpdate:N}),p.id===C.author_id&&Object(w.jsx)("small",{children:"\xa0"}),Object(w.jsxs)("small",{children:[C.author_name,"\xa0"]}),Object(w.jsxs)("small",{className:"film-preview-playlist-index",children:["- ",A,"/",C.films.length]})]})]})}),Object(w.jsx)("div",{style:{height:_-I+"px"},className:"col-12 col-sm-12 p-0 film-preview-playlist-container",children:Object(w.jsx)(U.a,{onYReachEnd:function(){},onScrollY:function(){},children:C.films.map((function(t,c){return Object(w.jsxs)("div",{className:"row m-0 p-0 pe-2 remove-container",children:[Object(w.jsx)("div",{className:"".concat(c===C.films.length-1?"mt-3 mb-3 ":"mt-3"," button-ripple-div-next-width col"),onClick:function(){t.isNonExisting||e.handleRedirect(t.id)},children:Object(w.jsxs)("div",{className:"row m-0 p-0 play-outer-container",children:[Object(w.jsx)("div",{className:"col-1 col-sm-1 text-center justify-content-center d-flex align-items-center p-0 ps-1",children:E===t.id?Object(w.jsx)("small",{children:Object(w.jsx)(m.a,{style:{fontWeight:300},icon:"play"})}):Object(w.jsx)("small",{children:c+1})}),Object(w.jsx)("div",{className:"col-6 col-sm-6 pe-2 ps-2",children:Object(w.jsx)("div",{className:"embed-responsive embed-responsive-16by9 z-depth-1-half w-100 play-container",children:t.isNonExisting?Object(w.jsx)("img",{alt:"",className:"embed-responsive-item play-image",src:Z.a}):Object(w.jsx)(K.a,{image:"".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(t.id,"/thumbnail")})})}),Object(w.jsx)("div",{className:"col-5 col-sm-5 p-0",children:t.isNonExisting?Object(w.jsx)(f.a,{line:2,text:"Not found",className:"mb-0 title fw-bold"}):Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(f.a,{line:1,text:t.title,className:"mb-0 title fw-bold"}),Object(w.jsx)("p",{className:"mb-1 author-nick",children:Object(w.jsx)("span",{children:t.author_name})})]})})]})}),p.id===C.author_id&&Object(w.jsx)("div",{style:{width:"24px"},className:"p-0 d-flex align-items-center justify-content-center",children:Object(w.jsx)(V.a,{handleRemove:function(){return e=t.id,void(L||N({type:"remove-film",payload:e}));var e}})})]},t.id)}))})})]})})},ee=c(315),te={isPreviewLoaded:!1,comments:null,commentsCount:null,playerHeight:null,reloadPlaylist:!1,error:null},ce=function(e,t){switch(t.type){case"field":return Object(n.a)(Object(n.a)({},e),{},Object(h.a)({},t.fieldName,t.payload));case"success":return Object(n.a)(Object(n.a)({},e),{},{isPreviewLoaded:!0,comments:t.comments,commentsCount:t.commentsCount,error:null});case"reset-comments":return Object(n.a)(Object(n.a)({},e),{},{comments:null,commentsCount:null});default:return e}},ne=function(e){var t=e.children,c=Object(u.useReducer)(ce,te),n=Object(d.a)(c,2),i=n[0],a=n[1];return Object(w.jsx)(g.Provider,{value:[i,a],children:t})};c(294),t.default=function(e){var t=Object(i.g)(),c=Object(i.h)(),a=Object(ee.a)(768),r=function(e){var i=s.a.parse(c.search),a={pathname:"".concat("/filmapp-react-frontend/","film/")+e};i.list&&(a=Object(n.a)(Object(n.a)({},a),{},{search:"?list=".concat(i.list)})),t.push(a)};return Object(w.jsx)(ne,{children:Object(w.jsxs)("div",{className:"row p-0 m-0 mt-4 mx-2",children:[Object(w.jsxs)("div",{className:"col-12 order-first col-sm-12 order-first col-md-8",children:[Object(w.jsx)(N,Object(n.a)({},e)),!a&&Object(w.jsx)(W,Object(n.a)({},e))]}),Object(w.jsxs)("div",{className:"col-12 order-2 col-sm-12 order-2 col-md-4",children:[Object(w.jsx)($,Object(n.a)({handleRedirect:r},e)),Object(w.jsx)(I,Object(n.a)({handleRedirect:r},e))]}),a&&Object(w.jsx)("div",{className:"col-12 order-last col-sm-12 order-sm-last col-md-8",children:Object(w.jsx)(W,Object(n.a)({},e))})]})})}}}]);
//# sourceMappingURL=20.79c27f02.chunk.js.map