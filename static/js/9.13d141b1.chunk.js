(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[9],{510:function(e,t,r){e.exports=r(236)},511:function(e,t,r){"use strict";function n(e,t,r,n,a,i,s){try{var c=e[i](s),o=c.value}catch(l){return void r(l)}c.done?t(o):Promise.resolve(o).then(n,a)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(a,i){var s=e.apply(t,r);function c(e){n(s,a,i,c,o,"next",e)}function o(e){n(s,a,i,c,o,"throw",e)}c(void 0)}))}}r.d(t,"a",(function(){return a}))},516:function(e,t,r){"use strict";r.d(t,"a",(function(){return v}));var n=r(148),a=r(72),i=r.n(a),s=r(1),c=r.n(s);function o(e){return(o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}function p(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function m(e){return t=e,(t-=0)===t?e:(e=e.replace(/[\-_\s]+(.)?/g,(function(e,t){return t?t.toUpperCase():""}))).substr(0,1).toLowerCase()+e.substr(1);var t}function b(e){return e.split(";").map((function(e){return e.trim()})).filter((function(e){return e})).reduce((function(e,t){var r,n=t.indexOf(":"),a=m(t.slice(0,n)),i=t.slice(n+1).trim();return a.startsWith("webkit")?e[(r=a,r.charAt(0).toUpperCase()+r.slice(1))]=i:e[a]=i,e}),{})}var j=!1;try{j=!0}catch(g){}function y(e){return n.c.icon?n.c.icon(e):null===e?null:"object"===o(e)&&e.prefix&&e.iconName?e:Array.isArray(e)&&2===e.length?{prefix:e[0],iconName:e[1]}:"string"===typeof e?{prefix:"fas",iconName:e}:void 0}function O(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?l({},e,t):{}}function v(e){var t=e.forwardedRef,r=d(e,["forwardedRef"]),a=r.icon,i=r.mask,s=r.symbol,c=r.className,o=r.title,u=r.titleId,m=y(a),b=O("classes",[].concat(p(function(e){var t,r=e.spin,n=e.pulse,a=e.fixedWidth,i=e.inverse,s=e.border,c=e.listItem,o=e.flip,u=e.size,f=e.rotation,d=e.pull,p=(l(t={"fa-spin":r,"fa-pulse":n,"fa-fw":a,"fa-inverse":i,"fa-border":s,"fa-li":c,"fa-flip-horizontal":"horizontal"===o||"both"===o,"fa-flip-vertical":"vertical"===o||"both"===o},"fa-".concat(u),"undefined"!==typeof u&&null!==u),l(t,"fa-rotate-".concat(f),"undefined"!==typeof f&&null!==f&&0!==f),l(t,"fa-pull-".concat(d),"undefined"!==typeof d&&null!==d),l(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(p).map((function(e){return p[e]?e:null})).filter((function(e){return e}))}(r)),p(c.split(" ")))),g=O("transform","string"===typeof r.transform?n.c.transform(r.transform):r.transform),x=O("mask",y(i)),w=Object(n.a)(m,f({},b,{},g,{},x,{symbol:s,title:o,titleId:u}));if(!w)return function(){var e;!j&&console&&"function"===typeof console.error&&(e=console).error.apply(e,arguments)}("Could not find icon",m),null;var N=w.abstract,A={ref:t};return Object.keys(r).forEach((function(e){v.defaultProps.hasOwnProperty(e)||(A[e]=r[e])})),h(N[0],A)}v.displayName="FontAwesomeIcon",v.propTypes={border:i.a.bool,className:i.a.string,mask:i.a.oneOfType([i.a.object,i.a.array,i.a.string]),fixedWidth:i.a.bool,inverse:i.a.bool,flip:i.a.oneOf(["horizontal","vertical","both"]),icon:i.a.oneOfType([i.a.object,i.a.array,i.a.string]),listItem:i.a.bool,pull:i.a.oneOf(["right","left"]),pulse:i.a.bool,rotation:i.a.oneOf([0,90,180,270]),size:i.a.oneOf(["lg","xs","sm","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:i.a.bool,symbol:i.a.oneOfType([i.a.bool,i.a.string]),title:i.a.string,transform:i.a.oneOfType([i.a.string,i.a.object]),swapOpacity:i.a.bool},v.defaultProps={border:!1,className:"",mask:null,fixedWidth:!1,inverse:!1,flip:null,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,symbol:!1,title:"",transform:null,swapOpacity:!1};var h=function e(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"===typeof r)return r;var a=(r.children||[]).map((function(r){return e(t,r)})),i=Object.keys(r.attributes||{}).reduce((function(e,t){var n=r.attributes[t];switch(t){case"class":e.attrs.className=n,delete r.attributes.class;break;case"style":e.attrs.style=b(n);break;default:0===t.indexOf("aria-")||0===t.indexOf("data-")?e.attrs[t.toLowerCase()]=n:e.attrs[m(t)]=n}return e}),{attrs:{}}),s=n.style,c=void 0===s?{}:s,o=d(n,["style"]);return i.attrs.style=f({},i.attrs.style,{},c),t.apply(void 0,[r.tag,f({},i.attrs,{},o)].concat(p(a)))}.bind(null,c.a.createElement)},520:function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"c",(function(){return s})),r.d(t,"f",(function(){return c})),r.d(t,"g",(function(){return o})),r.d(t,"b",(function(){return l})),r.d(t,"d",(function(){return u})),r.d(t,"e",(function(){return f}));var n=r(48),a=r(144),i=function(e){return n.a.get("films/",{params:e})},s=function(e){return n.a.get("films/".concat(e))},c=function(e){return n.a.get("films/search",{params:e})},o=function(e){return n.a.patch("films/".concat(e,"/view"))},l=function(e){return n.a.post("films",e,{headers:Object(a.a)()})},u=function(e,t){return n.a.patch("films/".concat(e,"/action"),t,{headers:Object(a.a)()})},f=function(e){return n.a.delete("films/".concat(e),{headers:Object(a.a)()})}},521:function(e,t,r){"use strict";var n=r(1),a=r(2);t.a=function(e){var t=e.isInvalid,r=e.onChange,i=e.type,s=e.name,c=e.value,o=e.placeholder,l=void 0===o?"":o,u="textarea"===i?"textarea":"input",f=Object(n.useRef)(null);return Object(n.useEffect)((function(){f.current&&(t?f.current.classList.add("is-invalid"):f.current.classList.remove("is-invalid"))}),[t]),Object(a.jsx)(u,{ref:f,className:"form-control",placeholder:l,type:i,name:s,value:c,onChange:r})}},666:function(e,t,r){},684:function(e,t,r){"use strict";r.r(t);var n=r(510),a=r.n(n),i=r(511),s=r(47),c=(r(666),r(1)),o=r(15),l=r(516),u=r(521),f=r(73),d=r(3),p=function(e){return{file:null,name:e?b:j,preview:null}},m={type:"",message:""},b="Choose a film ",j="Choose a thumbnail ",y={title:"",description:"",film:p(!0),thumbnail:p(!1),isSubmitted:!1,isSending:!1,isSuccess:!1,isError:!1,error:null},O=function(e,t){switch(t.type){case"field":return Object(d.a)(Object(d.a)({},e),{},Object(f.a)({isError:!1,error:null},t.fieldName,t.payload));case"file-add":return!0===t.isFilm?Object(d.a)(Object(d.a)({},e),{},{isError:!1,error:null,alert:m,film:{file:t.file,name:t.fileName,preview:t.preview}}):Object(d.a)(Object(d.a)({},e),{},{isError:!1,error:null,alert:m,thumbnail:{file:t.file,name:t.fileName,preview:t.preview}});case"file-clear":return!0===t.isFilm?Object(d.a)(Object(d.a)({},e),{},{isError:!1,error:null,film:p(!0)}):Object(d.a)(Object(d.a)({},e),{},{isError:!1,error:null,thumbnail:p(!1)});case"submit":return Object(d.a)(Object(d.a)({},e),{},{isError:!1,error:null,alert:m,isSubmitted:!0});case"send":return Object(d.a)(Object(d.a)({},e),{},{isSending:!0});case"success":return Object(d.a)(Object(d.a)({},e),{},{isSending:!1,isSuccess:!0});case"error":return Object(d.a)(Object(d.a)({},e),{},{isSending:!1,isSuccess:!1,isError:!0,error:t.payload});case"error-422":return Object(d.a)(Object(d.a)({},e),{},{isSending:!1,isSuccess:!1,isError:!0,error:t.payload,film:p(!0),thumbnail:p(!1)});default:return e}},v=r(520),h=r(88),g=r(2);t.default=function(){var e=Object(c.useContext)(h.a),t=e.user,r=e.clearUser,n=Object(o.g)(),f=Object(c.useRef)(null),d=Object(c.useRef)(null),p=Object(c.useReducer)(O,y),m=Object(s.a)(p,2),x=m[0],w=m[1],N=x.title,A=x.description,S=x.film,E=x.thumbnail,k=x.isSubmitted,C=x.isSending,P=x.isError,I=x.error;Object(c.useEffect)((function(){!t.auth&&t.isInitialLoaded&&(n.replace("".concat("/filmapp-react-frontend/")),n.push("".concat("/filmapp-react-frontend/","login")),r())}),[t,n,r]),Object(c.useEffect)((function(){function e(){return(e=Object(i.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new FormData).set("title",N),t.set("description",A),t.set("film",S.file),t.set("thumbnail",E.file),e.next=7,v.b(t).then((function(e){w({type:"success"}),n.push("".concat("/filmapp-react-frontend/","film/").concat(e.data.id))})).catch((function(e){var t=null;e.response&&e.response.data&&e.response.data.error?t=e.response.data.error:e.response&&e.response.data&&e.response.data.errors&&(e.response.data.errors.description?t=e.response.data.errors.description.message:e.response.data.errors.title&&(t=e.response.data.errors.title.message)),422===e.response.status?w({type:"error-422",payload:t}):w({type:"error",payload:t})}));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}C&&function(){e.apply(this,arguments)}()}),[A,S.file,n,C,E.file,N]);var R=function(e,t){switch(e.preventDefault(),t){case"film":w({type:"file-add",isFilm:!0,file:f.current.files[0],fileName:f.current.files[0].name,preview:URL.createObjectURL(e.target.files[0])});break;case"thumbnail":w({type:"file-add",isFilm:!1,file:d.current.files[0],fileName:d.current.files[0].name,preview:URL.createObjectURL(e.target.files[0])})}};return Object(g.jsxs)("div",{className:"row mt-4 pb-5 mx-2",children:[Object(g.jsxs)("div",{className:"col-12 col-sm-6 mb-4",children:[Object(g.jsx)("div",{className:"col-12 mb-4",children:Object(g.jsx)("div",{className:"embed-responsive embed-responsive-16by9 z-depth-1-half",children:Object(g.jsxs)("div",{className:"position-relative justify-content-center d-flex align-items-center embed-responsive-item text-center box has-advanced-upload",children:[Object(g.jsx)("div",{className:"ratio ratio-16x9",children:Object(g.jsx)("video",{muted:!0,autoPlay:!0,className:"embed-responsive-item",loop:!0,src:S.preview?S.preview:""})}),Object(g.jsx)("input",{id:"film",accept:"video/mp4, video/ogg",onChange:function(e){return R(e,"film")},type:"file",ref:f,className:"inputfile"}),Object(g.jsx)("label",{htmlFor:"film",className:"position-absolute",children:S.name===b&&Object(g.jsx)("span",{children:S.name})}),S.preview&&Object(g.jsx)("div",{className:"col card-img-overlay film-add-item-opacity"}),S.preview&&Object(g.jsx)(l.a,{className:"film-add-item-middle fa-3x",style:{color:"#ffffff"},icon:"times",onClick:function(){w({type:"file-clear",isFilm:!0})}})]})})}),Object(g.jsx)("div",{className:"col-12",children:Object(g.jsx)("div",{children:Object(g.jsxs)("div",{className:"position-relative justify-content-center d-flex align-items-center embed-responsive-item text-center box has-advanced-upload",children:[Object(g.jsx)("div",{className:"ratio ratio-16x9",children:Object(g.jsx)("img",{alt:"",src:E.preview?E.preview:"data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="})}),Object(g.jsx)("input",{id:"thumbnail",accept:"image/jpg, image/png, image/jpeg",onChange:function(e){return R(e,"thumbnail")},type:"file",ref:d,className:" inputfile position-absolute"}),Object(g.jsx)("label",{htmlFor:"thumbnail",className:"position-absolute",children:E.name===j&&Object(g.jsx)("span",{children:E.name})}),E.preview&&Object(g.jsx)("div",{className:"col card-img-overlay film-add-item-opacity"}),E.preview&&Object(g.jsx)(l.a,{className:"film-add-item-middle fa-3x",style:{color:"#ffffff"},icon:"times",onClick:function(){w({type:"file-clear",isFilm:!1})}})]})})})]}),Object(g.jsxs)("div",{className:"col-12 col-sm-6 mb-2",children:[Object(g.jsxs)("div",{className:"mb-3",children:[Object(g.jsx)(u.a,{placeholder:"Title",type:"text",isInvalid:k&&!N,name:"title",value:N,onChange:function(e){return w({type:"field",fieldName:"title",payload:e.target.value})}}),Object(g.jsx)("div",{className:"invalid-feedback",children:"Title is required"})]}),Object(g.jsxs)("div",{className:"mb-3",children:[Object(g.jsx)(u.a,{placeholder:"Description",type:"textarea",isInvalid:k&&!A,name:"description",value:A,onChange:function(e){return w({type:"field",fieldName:"description",payload:e.target.value})}}),Object(g.jsx)("div",{className:"invalid-feedback",children:"Description is required"})]}),Object(g.jsx)("div",{className:"col-12 mb-3 p-0",children:Object(g.jsxs)("div",{className:"d-flex align-items-center",children:[Object(g.jsx)("button",{className:"btn btn-primary",disabled:C||!N||!A,onClick:C?null:function(e){e.preventDefault(),console.log("lflalfa"),w({type:"submit"}),t.auth?N&&A&&w({type:"send"}):n.push("".concat("/filmapp-react-frontend/","add/login"))},children:C?"Loading\u2026":"Add"}),C&&Object(g.jsx)("div",{className:"spinner-grow ms-2"})]})}),P&&Object(g.jsx)("div",{className:"alert alert-danger",children:I||"Error while creating film."})]})]})}}}]);
//# sourceMappingURL=9.13d141b1.chunk.js.map