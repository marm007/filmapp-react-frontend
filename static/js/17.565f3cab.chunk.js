(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[17],{336:function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return c}));var s=function(e){var t=new Date(Date.parse(e.createdAt));return("0"+t.getDate()).slice(-2)+"-"+("0"+(t.getMonth()+1)).slice(-2)+"-"+("0"+t.getFullYear()).slice(-2)+" o "+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)},c=function(e){var t=new Date(Date.parse(e.createdAt)),a=new Date,s=Math.abs(Math.floor((Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes())-Date.UTC(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes()))/6e4));return s/60>=1?(s/=60)/24>=1?(s/=24)/30>=1?(s/=30)/12>=1?(s/=12,s=Math.floor(s)+" years "):s=Math.floor(s)+" months ":s=Math.floor(s)+" days ":s=Math.floor(s)+" hours ":s=Math.floor(s)+" minutes ",s+="ago"}},427:function(e,t,a){},438:function(e,t,a){"use strict";a.r(t);var s=a(27),c=a(270),i=a.n(c),r=a(2),n=a(271),l=a(29),o=a(0),d=a(7),h=a(276),u=a(35),j=a(306),m=a.n(j),f=a(289),p=a.n(f),b=a(426),O=a(44),x=a(277),g={films:null,isLoading:!1,isAllFetched:!1,isInitialLoaded:!1,error:null,search:"",filter:"",sort:"",dir:1,sorts:[{id:"upload_date",title:"Upload date",dir:1},{id:"view_count",title:"View count",dir:1},{id:"rating",title:"Rating",dir:1}]},v=function(e,t){switch(t.type){case"field":return Object(r.a)(Object(r.a)({},e),{},Object(O.a)({},t.fieldName,t.payload));case"initial-success":return Object(r.a)(Object(r.a)({},e),{},{isLoading:!1,isInitialLoaded:!0,error:null,isAllFetched:t.payload.films.length<x.c,films:t.payload.films,search:t.payload.params.search,sort:t.payload.params.sort,filter:t.payload.params.filter,dir:t.payload.params.dir});case"load":return e.isLoading||e.isAllFetched||!e.isInitialLoaded||e.error?e:Object(r.a)(Object(r.a)({},e),{},{isLoading:!0});case"load-success":return Object(r.a)(Object(r.a)({},e),{},{isLoading:!1,error:null,isAllFetched:t.payload.length<x.c,films:[].concat(Object(s.a)(e.films),Object(s.a)(t.payload))});case"sorts-change":return Object(r.a)(Object(r.a)({},e),{},{sort:t.resetSort?"":e.sort,sorts:e.sorts.map((function(e){return e.id===t.payload.id?t.payload:e}))});case"error":return Object(r.a)(Object(r.a)({},e),{},{isLoading:!1,error:!0});default:return e}},y=(a(291),a(376),a(281)),N=a(336),w=a(279),k=a(283),L=(a(427),a(290)),M=a(305),D=a.n(M),A=a(1),_=function(){return Object(A.jsx)("div",{className:"col-12 col-sm-12 col-lg-8 m-0 mb-1",children:Object(A.jsxs)("div",{className:"row mb-4 m-0",children:[Object(A.jsx)("div",{className:"col-8 col-sm-4 p-0",children:Object(A.jsx)("div",{className:"ratio ratio-16x9",children:Object(A.jsx)(D.a,{className:"w-100 h-100",style:{lineHeight:"1.5"}})})}),Object(A.jsxs)("div",{className:"col-4 col-sm-8",children:[Object(A.jsx)("div",{className:"col-12 col-sm-12 p-0 pb-1 h-25",children:Object(A.jsx)(D.a,{className:"w-100 h-100",style:{lineHeight:"1.5"}})}),Object(A.jsx)("div",{className:"col-12 col-sm-12 h-75 pt-1",children:Object(A.jsx)(D.a,{className:"w-100 h-100",style:{lineHeight:"1.5"}})})]})]})})},F=a(288),S=a(304),C=[{id:"last_hour",title:"Last hour"},{id:"today",title:"Today"},{id:"this_week",title:"This week"},{id:"this_month",title:"This month"},{id:"this_year",title:"This year"}];t.default=function(){var e=Object(F.a)(576),t=Object(d.g)(),a=Object(d.h)(),c=Object(o.useReducer)(v,g),j=Object(l.a)(c,2),f=j[0],O=j[1],M=f.films,D=f.isLoading,T=f.isAllFetched,H=f.search,W=f.sort,z=f.filter,I=f.dir,R=f.sorts,U=f.error,Y=f.isInitialLoaded,E=Object(o.useState)(!1),J=Object(l.a)(E,2),B=J[0],P=J[1],V=Object(o.useCallback)((function(){D||T||U||!Y||O({type:"load"})}),[U,T,Y,D]);Object(w.a)(V),Object(o.useEffect)((function(){var e,t,s,c=m.a.parse(a.search),l={search:c.title,sort:null!==(e=c.sort)&&void 0!==e?e:"",filter:null!==(t=c.filter)&&void 0!==t?t:"",dir:null!==(s=c.dir)&&void 0!==s?s:1};function o(){return(o=Object(n.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.f(Object(r.a)(Object(r.a)({},l),{},{limit:x.c})).then((function(e){O({type:"initial-success",payload:{films:e.data,params:l}})})).catch((function(e){O({type:"error"}),console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}a.state&&a.state.films?O({type:"initial-success",payload:{films:a.state.films,params:l}}):function(){o.apply(this,arguments)}()}),[a]),Object(o.useEffect)((function(){function e(){return(e=Object(n.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.f({search:H,sort:W,filter:z,dir:I,skip:M.length,limit:x.c}).then((function(e){O({type:"load-success",payload:e.data})})).catch((function(e){O({type:"error"}),console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}D&&function(){e.apply(this,arguments)}()}),[I,M,z,D,H,W]);var q=function(e,a){var s=z,c=W,i=I;if("filter"===e)s=s===a.id?"":a.id;else{var r=a;c===a.id?(c=a.id,1===r.dir?(r.dir=-1,i=a.dir):-1===r.dir&&(r.dir=1,c=""),O({type:"sorts-change",payload:r,resetSort:""===c}),i=a.dir):(c=a.id,i=a.dir)}""!==c&&""!==s?t.push({search:"?title=".concat(H,"&sort=").concat(c,"&dir=").concat(i,"&filter=").concat(s)}):""===c&&""!==s?t.push({search:"?title=".concat(H,"&filter=").concat(s)}):""!==c&&""===s?t.push({search:"?title=".concat(H,"&sort=").concat(c,"&dir=").concat(i)}):""===c&&""===s&&t.push({search:"?title=".concat(H)})};return Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(k.a,{className:"mt-3 mx-4 search-button p-0",onClick:function(){return P(!B)},children:Object(A.jsx)("div",{"aria-controls":"filter-collapse","aria-expanded":B,"data-bs-toggle":"collapse","data-bs-target":"#searchCollapse",className:"px-4 py-2",children:Object(A.jsx)(h.a,{style:{cursor:"pointer"},icon:u.c})})}),Object(A.jsx)("div",{className:"collapse",id:"searchCollapse",children:Object(A.jsxs)("div",{id:"filter-collapse",className:"row mx-2",children:[Object(A.jsxs)("div",{className:"col-12 col-sm-4 mt-4",children:[Object(A.jsx)("p",{style:{fontWeight:500},children:"UPLOAD DATE"}),Object(A.jsx)("div",{className:"col-12 col-sm-8 mt-3 mb-3 divider"}),C.map((function(e){return Object(A.jsx)("p",{style:z===e.id?{fontWeight:700,fontSize:"80%"}:{fontWeight:400,fontSize:"80%"},onClick:function(){return q("filter",e)},className:"search-filter",children:e.title},e.id)}))]}),Object(A.jsxs)("div",{className:"col-12 col-sm-4 mt-4",children:[Object(A.jsx)("p",{style:{fontWeight:500},children:"SORT BY"}),Object(A.jsx)("div",{className:"col-12 col-sm-8 mt-3 mb-3 divider"}),R.map((function(e){return Object(A.jsxs)("div",{className:"col d-flex",children:[Object(A.jsx)("p",{style:W===e.id?{fontWeight:700,fontSize:"80%"}:{fontWeight:400,fontSize:"80%"},onClick:function(){return q("sort",e)},className:"search-filter",children:e.title}),W===e.id&&1===e.dir?Object(A.jsx)(h.a,{className:"ms-2",icon:"sort-up"}):W===e.id&&-1===e.dir?Object(A.jsx)(h.a,{className:"ms-2",icon:"sort-down"}):""]},e.id)}))]})]})}),Object(A.jsx)("div",{className:"col-12 mt-2 mb-3 divider"}),Object(A.jsx)("div",{className:"row mx-2 mt-4",children:M?M.map((function(e,a){var s=Object(N.b)(e);return e.img="".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(e.id,"/thumbnail"),Object(A.jsxs)(S.a,{isSearch:!0,film:e,index:a,handleRedirect:function(){return a=e.id,void t.push("".concat("/filmapp-react-frontend/","film/")+a);var a},children:[Object(A.jsx)("div",{className:"col",children:Object(A.jsx)(b.a,{lines:1,className:"mb-0 search-title fw-bold",children:e.title})}),Object(A.jsx)("p",{className:"d-none d-sm-inline mb-1 author-nick-search",children:Object(A.jsxs)("span",{children:[e.author_name," \xb7 ",e.views," views \xb7 ",s]})}),Object(A.jsx)("p",{className:"d-inline d-sm-none mb-0 author-nick",children:Object(A.jsxs)("span",{children:[e.author_name," \xb7 ",e.views," views"]})}),Object(A.jsx)("span",{className:"d-none d-sm-inline  author-nick-search",children:Object(A.jsx)(p.a,{className:"mb-0",line:2,text:e.description})})]},e.id)})):Object(s.a)(Array(20)).map((function(t,a){return e?Object(A.jsx)(L.a,{},a):Object(A.jsx)(_,{},a)}))}),!T&&Object(A.jsx)("div",{className:"fetch-loader d-flex justify-content-center",children:D&&Object(A.jsx)("div",{className:"spinner-border"})})]})}}}]);
//# sourceMappingURL=17.565f3cab.chunk.js.map