(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[7],{510:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return U}));var n=r(1),a=r(7),i=r(561),c=r.n(i),o=r(542),s=r(532),l=r.n(s),u=r(15),d=r(533),f=r(46),p=r(534),m=r(45),h=r(549),b=r.n(h),j=r(137),y=r(540),v={films:null,isLoading:!1,isAllLoaded:!1,isInitialLoaded:!1,error:null,search:"",filter:"",sort:"",dir:1,sorts:[{id:"upload_date",title:"Upload date",dir:1},{id:"view_count",title:"View count",dir:1},{id:"rating",title:"Rating",dir:1}]},O=function(e,t){switch(t.type){case"field":return Object(u.a)(Object(u.a)({},e),{},Object(j.a)({},t.fieldName,t.payload));case"initial-success":return Object(u.a)(Object(u.a)({},e),{},{isLoading:!1,isInitialLoaded:!0,error:null,isAllLoaded:t.payload.films.length<y.f,films:t.payload.films,search:t.payload.params.search,sort:t.payload.params.sort,filter:t.payload.params.filter,dir:t.payload.params.dir});case"load":return e.isLoading||e.isAllLoaded||!e.isInitialLoaded||e.error?e:Object(u.a)(Object(u.a)({},e),{},{isLoading:!0});case"load-success":return Object(u.a)(Object(u.a)({},e),{},{isLoading:!1,error:null,isAllLoaded:t.payload.length<y.f,films:[].concat(Object(o.a)(e.films),Object(o.a)(t.payload))});case"sorts-change":return Object(u.a)(Object(u.a)({},e),{},{sort:t.resetSort?"":e.sort,sorts:e.sorts.map((function(e){return e.id===t.payload.id?t.payload:e}))});case"error":return Object(u.a)(Object(u.a)({},e),{},{isLoading:!1,error:!0});default:return e}},g=r(543),x=r(537),w=r(545),N=r(546),k=r(556),S=r(570),A=r.n(S),F=r(2),I=function(){return Object(F.jsx)("div",{className:"col-12 col-sm-12 col-lg-8 m-0 mb-1 container-px",children:Object(F.jsxs)("div",{className:"row mb-4 m-0",children:[Object(F.jsx)("div",{className:"col-8 col-sm-4 p-0",children:Object(F.jsx)("div",{className:"embed-responsive embed-responsive-16by9 ",children:Object(F.jsx)(A.a,{className:"embed-responsive-item  w-100 h-100"})})}),Object(F.jsxs)("div",{className:"col-4 col-sm-8",children:[Object(F.jsx)("div",{className:"col-12 col-sm-12 p-0 pb-1 h-25",children:Object(F.jsx)(A.a,{className:"w-100 h-100 line-height-unset"})}),Object(F.jsx)("div",{className:"col-12 col-sm-12 h-75 p-0 pt-1",children:Object(F.jsx)(A.a,{className:"w-100 h-100 line-height-unset"})})]})]})})},C=r(548),E=r(604),L=(r(694),[{id:"last_hour",title:"Last hour"},{id:"today",title:"Today"},{id:"this_week",title:"This week"},{id:"this_month",title:"This month"},{id:"this_year",title:"This year"}]),R=function(){var e=Object(C.a)(576),t=Object(a.g)(),r=Object(a.h)(),i=Object(n.useReducer)(O,v),s=Object(f.a)(i,2),h=s[0],j=s[1],S=h.films,A=h.isLoading,R=h.isAllLoaded,U=h.search,D=h.sort,M=h.filter,T=h.dir,_=h.sorts,W=h.error,$=h.isInitialLoaded,z=Object(n.useCallback)((function(){A||R||W||!$||j({type:"load"})}),[W,R,$,A]);Object(w.a)(z),Object(n.useEffect)((function(){var e,t,n,a=c.a.parse(r.search),i={search:a.title,sort:null!==(e=a.sort)&&void 0!==e?e:"",filter:null!==(t=a.filter)&&void 0!==t?t:"",dir:null!==(n=a.dir)&&void 0!==n?n:1};function o(){return(o=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(g.h)(Object(u.a)(Object(u.a)({},i),{},{limit:y.f,searchPage:!0})).then((function(e){j({type:"initial-success",payload:{films:e.data,params:i}})})).catch((function(e){j({type:"error"}),console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}r.state&&r.state.films?j({type:"initial-success",payload:{films:r.state.films,params:i}}):function(){o.apply(this,arguments)}()}),[r]),Object(n.useEffect)((function(){function e(){return(e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(g.h)({search:U,sort:D,filter:M,dir:T,skip:S.length,limit:y.f,searchPage:!0}).then((function(e){j({type:"load-success",payload:e.data})})).catch((function(e){j({type:"error"}),console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}A&&function(){e.apply(this,arguments)}()}),[T,S,M,A,U,D]);var q=function(e,r){var n=M,a=D,i=T;if("filter"===e)n=n===r.id?"":r.id;else{var c=r;a===r.id?(a=r.id,1===c.dir?(c.dir=-1,i=r.dir):-1===c.dir&&(c.dir=1,a=""),j({type:"sorts-change",payload:c,resetSort:""===a}),i=r.dir):(a=r.id,i=r.dir)}""!==a&&""!==n?t.push({search:"?title=".concat(U,"&sort=").concat(a,"&dir=").concat(i,"&filter=").concat(n)}):""===a&&""!==n?t.push({search:"?title=".concat(U,"&filter=").concat(n)}):""!==a&&""===n?t.push({search:"?title=".concat(U,"&sort=").concat(a,"&dir=").concat(i)}):""===a&&""===n&&t.push({search:"?title=".concat(U)})};return Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(N.a,{className:"mt-3 mx-4 search-button  px-4 py-2",role:"button","aria-controls":"searchCollapse","aria-expanded":"false","data-toggle":"collapse","data-target":"#searchCollapse",children:Object(F.jsx)(p.a,{className:"cursor-pointer",icon:m.d})}),Object(F.jsx)("div",{className:"collapse",id:"searchCollapse",children:Object(F.jsxs)("div",{id:"filter-collapse",className:"row mx-2",children:[Object(F.jsxs)("div",{className:"col-12 col-sm-4 mt-4",children:[Object(F.jsx)("p",{style:{fontWeight:500},children:"UPLOAD DATE"}),Object(F.jsx)("div",{className:"col-12 col-sm-8 mt-3 mb-3 divider"}),L.map((function(e){return Object(F.jsx)("p",{style:M===e.id?{fontWeight:700,fontSize:"80%"}:{fontWeight:400,fontSize:"80%"},onClick:function(){return q("filter",e)},className:"search-filter",children:e.title},e.id)}))]}),Object(F.jsxs)("div",{className:"col-12 col-sm-4 mt-4",children:[Object(F.jsx)("p",{style:{fontWeight:500},children:"SORT BY"}),Object(F.jsx)("div",{className:"col-12 col-sm-8 mt-3 mb-3 divider"}),_.map((function(e){return Object(F.jsxs)("div",{className:"col d-flex",children:[Object(F.jsx)("p",{style:D===e.id?{fontWeight:700,fontSize:"80%"}:{fontWeight:400,fontSize:"80%"},onClick:function(){return q("sort",e)},className:"search-filter",children:e.title}),D===e.id&&1===e.dir?Object(F.jsx)(p.a,{className:"ml-2",icon:"sort-up"}):D===e.id&&-1===e.dir?Object(F.jsx)(p.a,{className:"ml-2",icon:"sort-down"}):""]},e.id)}))]})]})}),Object(F.jsx)("div",{className:"col-12 mt-2 mb-3 divider"}),Object(F.jsx)("div",{className:"row mx-2 mt-4",children:S?S.map((function(e,r){var n=Object(x.c)(e);return e.img="".concat("https://marm007-filmapp-backend-node.herokuapp.com/api/","films/").concat(e.id,"/thumbnail"),Object(F.jsx)(E.a,{isSearch:!0,film:e,index:r,handleRedirect:function(){return function(e){t.push({pathname:"".concat("/filmapp-react-frontend/","film/")+e.id,state:{film:e}})}(e)},children:Object(F.jsxs)("div",{children:[Object(F.jsx)("p",{className:"mb-1 author-nick-search",children:Object(F.jsxs)("span",{children:[e.author_name," \xb7 ",e.views," views \xb7 ",n]})}),Object(F.jsx)("span",{className:"d-none d-sm-inline author-nick-search",children:Object(F.jsx)(b.a,{className:"mb-0",line:2,text:e.description})})]})},e.id)})):Object(o.a)(Array(24)).map((function(t,r){return e?Object(F.jsx)(k.a,{},r):Object(F.jsx)(I,{},r)}))}),!R&&Object(F.jsx)("div",{className:"fetch-loader d-flex justify-content-center",children:A&&Object(F.jsx)("div",{className:"spinner-border"})})]})};function U(){var e=Object(a.h)();return Object(n.useEffect)((function(){var t=c.a.parse(e.search);document.title=t.title?"".concat(t.title," - FilmApp"):"FilmApp"}),[e]),Object(F.jsx)(R,{})}},537:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"c",(function(){return a})),r.d(t,"b",(function(){return i}));var n=function(e){var t=new Date(Date.parse(e.createdAt));return("0"+t.getDate()).slice(-2)+"-"+("0"+(t.getMonth()+1)).slice(-2)+"-"+("0"+t.getFullYear()).slice(-2)+" o "+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)},a=function(e){var t=new Date(Date.parse(e.createdAt)),r=new Date,n=Math.abs(Math.floor((Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes())-Date.UTC(r.getFullYear(),r.getMonth(),r.getDate(),r.getHours(),r.getMinutes()))/6e4));return n/60>=1?(n/=60)/24>=1?(n/=24)/30>=1?(n/=30)/12>=1?(n/=12,n=Math.floor(n)+" years "):n=Math.floor(n)+" months ":n=Math.floor(n)+" days ":n=Math.floor(n)+" hours ":n=Math.floor(n)+" minutes ",n+="ago"},i=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=e.location.pathname.split(t)[0],a={pathname:""===n?"/filmapp-react-frontend/":n,search:e.location.search,state:e.location.state};r?e.replace(a):e.push(a)}},548:function(e,t,r){"use strict";var n=r(46),a=r(1);t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:600,t=Object(a.useState)(window.innerWidth<e),r=Object(n.a)(t,2),i=r[0],c=r[1],o=function(){c(window.innerWidth<e)};return Object(a.useEffect)((function(){return o(),window.addEventListener("resize",o),function(){return window.removeEventListener("resize",o)}}),[]),i}},552:function(e,t,r){var n=r(562);e.exports=function(e,t){if(e){if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}},561:function(e,t,r){"use strict";var n=r(584),a=r(585),i=r(589),c=r(590),o=r(594),s=r(595),l=r(596),u=r(597),d=Symbol("encodeFragmentIdentifier");function f(e){if("string"!==typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function p(e,t){return t.encode?t.strict?o(e):encodeURIComponent(e):e}function m(e,t){return t.decode?s(e):e}function h(e){return Array.isArray(e)?e.sort():"object"===typeof e?h(Object.keys(e)).sort((function(e,t){return Number(e)-Number(t)})).map((function(t){return e[t]})):e}function b(e){var t=e.indexOf("#");return-1!==t&&(e=e.slice(0,t)),e}function j(e){var t=(e=b(e)).indexOf("?");return-1===t?"":e.slice(t+1)}function y(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"===typeof e&&""!==e.trim()?e=Number(e):!t.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function v(e,t){f((t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t)).arrayFormatSeparator);var r=function(e){var t;switch(e.arrayFormat){case"index":return function(e,r,n){t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===n[e]&&(n[e]={}),n[e][t[1]]=r):n[e]=r};case"bracket":return function(e,r,n){t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==n[e]?n[e]=[].concat(n[e],r):n[e]=[r]:n[e]=r};case"comma":case"separator":return function(t,r,n){var a="string"===typeof r&&r.includes(e.arrayFormatSeparator),i="string"===typeof r&&!a&&m(r,e).includes(e.arrayFormatSeparator);r=i?m(r,e):r;var c=a||i?r.split(e.arrayFormatSeparator).map((function(t){return m(t,e)})):null===r?r:m(r,e);n[t]=c};case"bracket-separator":return function(t,r,n){var a=/(\[\])$/.test(t);if(t=t.replace(/\[\]$/,""),a){var i=null===r?[]:r.split(e.arrayFormatSeparator).map((function(t){return m(t,e)}));void 0!==n[t]?n[t]=[].concat(n[t],i):n[t]=i}else n[t]=r?m(r,e):r};default:return function(e,t,r){void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=t}}}(t),n=Object.create(null);if("string"!==typeof e)return n;if(!(e=e.trim().replace(/^[?#&]/,"")))return n;var c,o=i(e.split("&"));try{for(o.s();!(c=o.n()).done;){var s=c.value;if(""!==s){var u=l(t.decode?s.replace(/\+/g," "):s,"="),d=a(u,2),p=d[0],b=d[1];b=void 0===b?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?b:m(b,t),r(m(p,t),b,n)}}}catch(k){o.e(k)}finally{o.f()}for(var j=0,v=Object.keys(n);j<v.length;j++){var O=v[j],g=n[O];if("object"===typeof g&&null!==g)for(var x=0,w=Object.keys(g);x<w.length;x++){var N=w[x];g[N]=y(g[N],t)}else n[O]=y(g,t)}return!1===t.sort?n:(!0===t.sort?Object.keys(n).sort():Object.keys(n).sort(t.sort)).reduce((function(e,t){var r=n[t];return Boolean(r)&&"object"===typeof r&&!Array.isArray(r)?e[t]=h(r):e[t]=r,e}),Object.create(null))}t.extract=j,t.parse=v,t.stringify=function(e,t){if(!e)return"";f((t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t)).arrayFormatSeparator);for(var r=function(r){return t.skipNull&&(null===(n=e[r])||void 0===n)||t.skipEmptyString&&""===e[r];var n},n=function(e){switch(e.arrayFormat){case"index":return function(t){return function(r,n){var a=r.length;return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:[].concat(c(r),null===n?[[p(t,e),"[",a,"]"].join("")]:[[p(t,e),"[",p(a,e),"]=",p(n,e)].join("")])}};case"bracket":return function(t){return function(r,n){return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:[].concat(c(r),null===n?[[p(t,e),"[]"].join("")]:[[p(t,e),"[]=",p(n,e)].join("")])}};case"comma":case"separator":case"bracket-separator":var t="bracket-separator"===e.arrayFormat?"[]=":"=";return function(r){return function(n,a){return void 0===a||e.skipNull&&null===a||e.skipEmptyString&&""===a?n:(a=null===a?"":a,0===n.length?[[p(r,e),t,p(a,e)].join("")]:[[n,p(a,e)].join(e.arrayFormatSeparator)])}};default:return function(t){return function(r,n){return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:[].concat(c(r),null===n?[p(t,e)]:[[p(t,e),"=",p(n,e)].join("")])}}}}(t),a={},i=0,o=Object.keys(e);i<o.length;i++){var s=o[i];r(s)||(a[s]=e[s])}var l=Object.keys(a);return!1!==t.sort&&l.sort(t.sort),l.map((function(r){var a=e[r];return void 0===a?"":null===a?p(r,t):Array.isArray(a)?0===a.length&&"bracket-separator"===t.arrayFormat?p(r,t)+"[]":a.reduce(n(r),[]).join("&"):p(r,t)+"="+p(a,t)})).filter((function(e){return e.length>0})).join("&")},t.parseUrl=function(e,t){t=Object.assign({decode:!0},t);var r=l(e,"#"),n=a(r,2),i=n[0],c=n[1];return Object.assign({url:i.split("?")[0]||"",query:v(j(e),t)},t&&t.parseFragmentIdentifier&&c?{fragmentIdentifier:m(c,t)}:{})},t.stringifyUrl=function(e,r){r=Object.assign(n({encode:!0,strict:!0},d,!0),r);var a=b(e.url).split("?")[0]||"",i=t.extract(e.url),c=t.parse(i,{sort:!1}),o=Object.assign(c,e.query),s=t.stringify(o,r);s&&(s="?".concat(s));var l=function(e){var t="",r=e.indexOf("#");return-1!==r&&(t=e.slice(r)),t}(e.url);return e.fragmentIdentifier&&(l="#".concat(r[d]?p(e.fragmentIdentifier,r):e.fragmentIdentifier)),"".concat(a).concat(s).concat(l)},t.pick=function(e,r,a){a=Object.assign(n({parseFragmentIdentifier:!0},d,!1),a);var i=t.parseUrl(e,a),c=i.url,o=i.query,s=i.fragmentIdentifier;return t.stringifyUrl({url:c,query:u(o,r),fragmentIdentifier:s},a)},t.exclude=function(e,r,n){var a=Array.isArray(r)?function(e){return!r.includes(e)}:function(e,t){return!r(e,t)};return t.pick(e,a,n)}},562:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}},584:function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},585:function(e,t,r){var n=r(586),a=r(587),i=r(552),c=r(588);e.exports=function(e,t){return n(e)||a(e,t)||i(e,t)||c()}},586:function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},587:function(e,t){e.exports=function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,i=void 0;try{for(var c,o=e[Symbol.iterator]();!(n=(c=o.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(s){a=!0,i=s}finally{try{n||null==o.return||o.return()}finally{if(a)throw i}}return r}}},588:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},589:function(e,t,r){var n=r(552);e.exports=function(e,t){var r;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=n(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var a=0,i=function(){};return{s:i,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,o=!0,s=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return o=e.done,e},e:function(e){s=!0,c=e},f:function(){try{o||null==r.return||r.return()}finally{if(s)throw c}}}}},590:function(e,t,r){var n=r(591),a=r(592),i=r(552),c=r(593);e.exports=function(e){return n(e)||a(e)||i(e)||c()}},591:function(e,t,r){var n=r(562);e.exports=function(e){if(Array.isArray(e))return n(e)}},592:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},593:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},594:function(e,t,r){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,(function(e){return"%".concat(e.charCodeAt(0).toString(16).toUpperCase())}))}},595:function(e,t,r){"use strict";var n="%[a-f0-9]{2}",a=new RegExp(n,"gi"),i=new RegExp("("+n+")+","gi");function c(e,t){try{return decodeURIComponent(e.join(""))}catch(a){}if(1===e.length)return e;t=t||1;var r=e.slice(0,t),n=e.slice(t);return Array.prototype.concat.call([],c(r),c(n))}function o(e){try{return decodeURIComponent(e)}catch(n){for(var t=e.match(a),r=1;r<t.length;r++)t=(e=c(t,r).join("")).match(a);return e}}e.exports=function(e){if("string"!==typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var r={"%FE%FF":"\ufffd\ufffd","%FF%FE":"\ufffd\ufffd"},n=i.exec(e);n;){try{r[n[0]]=decodeURIComponent(n[0])}catch(t){var a=o(n[0]);a!==n[0]&&(r[n[0]]=a)}n=i.exec(e)}r["%C2"]="\ufffd";for(var c=Object.keys(r),s=0;s<c.length;s++){var l=c[s];e=e.replace(new RegExp(l,"g"),r[l])}return e}(e)}}},596:function(e,t,r){"use strict";e.exports=function(e,t){if("string"!==typeof e||"string"!==typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[e];var r=e.indexOf(t);return-1===r?[e]:[e.slice(0,r),e.slice(r+t.length)]}},597:function(e,t,r){"use strict";e.exports=function(e,t){for(var r={},n=Object.keys(e),a=Array.isArray(t),i=0;i<n.length;i++){var c=n[i],o=e[c];(a?-1!==t.indexOf(c):t(c,o,e))&&(r[c]=o)}return r}},602:function(e,t,r){},604:function(e,t,r){"use strict";var n=r(15),a=r(548),i=r(568),c=r(1),o=r(534),s=r(549),l=r.n(s),u=r(554),d=r(603),f=r(81),p=(r(602),r(2)),m=function(e){var t=e.film,r=e.index,n=e.handleRedirect,a=e.isRecommendations,i=e.isSearch,s=e.filmDispatch,m=e.children,h=Object(c.useContext)(f.a).user;return Object(p.jsx)("div",{className:"col-12  ".concat(i?"col-lg-8":""," mb-4 container-px"),children:Object(p.jsxs)("div",{className:"row p-0 m-0 play-outer-container remove-container p-0",children:[Object(p.jsx)("div",{className:"col-6 ".concat(i?"col-sm-4":""," m-0 p-0"),onClick:function(){return n()},children:Object(p.jsxs)("div",{className:"play-container",children:[Object(p.jsx)(u.a,{image:t.img}),Object(p.jsx)(o.a,{className:"play-middle",icon:"play"})]})}),Object(p.jsx)("div",{className:"col-6 ".concat(i?"col-sm-8":"col-sm-6"," pr-0"),children:Object(p.jsxs)("div",{className:"row mx-0 mb-0 h-100",children:[Object(p.jsxs)("div",{className:"".concat(h.auth?"button-ripple-div-next-width":"col-12"," col p-0 pr-2 cursor-pointer"),onClick:function(){return n()},children:[Object(p.jsx)(l.a,{line:1,text:t.title,className:"mb-1 title"}),m||Object(p.jsxs)("div",{className:"mb-0 author-nick",children:[Object(p.jsxs)("span",{children:[t.author_name,"\xa0"]}),Object(p.jsx)("span",{children:"\u2022\xa0"}),Object(p.jsxs)("span",{children:[t.views," views"]})]})]}),Object(p.jsxs)("div",{className:"".concat((h.auth,"click-under-buttons-container")),children:[h.auth?Object(p.jsx)(d.a,{isRecommendations:a,filmDispatch:s,index:r,filmID:t.id}):null,Object(p.jsx)("div",{className:"col col-12 m-0 p-0 click-under-buttons",onClick:function(){return n()}})]})]})})]})})};t.a=function(e){return Object(a.a)(e.isRecommendations?768:576)?Object(p.jsx)(i.a,Object(n.a)({},e)):Object(p.jsx)(m,Object(n.a)({},e))}},694:function(e,t,r){}}]);
//# sourceMappingURL=7.4e9c75f0.chunk.js.map