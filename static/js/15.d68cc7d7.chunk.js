(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[15],{520:function(e,t,n){"use strict";n.r(t);var i=n(526),r=n.n(i),c=n(527),a=n(60),s=n(1),u=n(7),o=n(539),l=n(139),d=n(137),f=n(15),p={title:"",description:"",initialFilm:{title:"",description:""},isInitialLoaded:!1,isSumbitted:!1,isSending:!1,isError:!1,error:"",isSuccess:!1},b=function(e,t){switch(t.type){case"field":return Object(f.a)(Object(f.a)({},e),{},Object(d.a)({error:"",isError:!1},t.fieldName,t.payload));case"initial-success":return Object(f.a)(Object(f.a)({},e),{},{isInitialLoaded:!0,title:t.title,description:t.description,initialFilm:{title:t.title,description:t.description}});case"submit":return Object(f.a)(Object(f.a)({},e),{},{isSumbitted:!0,isError:!1,error:""});case"send":return Object(f.a)(Object(f.a)({},e),{},{isSending:!0});case"success":return Object(f.a)(Object(f.a)({},e),{},{isSuccess:!0,isSending:!1,isSumbitted:!1,isError:!1,error:""});case"error":return Object(f.a)(Object(f.a)({},e),{},{isSuccess:!1,isSending:!1,isSumbitted:!1,isError:!0,error:t.payload?t.payload:""});default:return e}},m=n(540),j=n(2);t.default=function(){var e=Object(u.g)(),t=Object(u.i)().id,n=Object(s.useReducer)(b,p),i=Object(a.a)(n,2),d=i[0],f=i[1],h=d.title,v=d.description,O=d.initialFilm,y=d.isInitialLoaded,g=d.isSumbitted,x=d.isSending,S=d.isError,w=d.error,N=d.isSuccess;Object(s.useEffect)((function(){(function(){var e=Object(c.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.c(t).then((function(e){f({type:"initial-success",title:e.data.title,description:e.data.description})})).catch((function(e){f({type:"error"})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[t,e]),Object(s.useEffect)((function(){x&&function(){var n=Object(c.a)(r.a.mark((function n(){return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,m.g(t,{title:h,description:v}).then((function(t){f({type:"success"}),setTimeout((function(){return e.goBack()}),500)})).catch((function(e){f({type:"error"})}));case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}()()}),[v,t,e,x,h]);return Object(j.jsxs)(l.a,{id:"updatateFilmModal",title:"Update",onClose:function(){e.goBack()},children:[Object(j.jsxs)("form",{onSubmit:x?function(e){e.preventDefautl(),f({type:"submit"}),h&&v&&f({type:"send"})}:null,children:[Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{htmlFor:"title",children:"Title"}),Object(j.jsx)(o.a,{type:"text",name:"title",value:h,isInvalid:g&&!h,onChange:function(e){return f({type:"field",fieldName:"title",payload:e.target.value})}}),Object(j.jsx)("div",{className:"invalid-feedback",children:"Title cannot be empty"})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{htmlFor:"description",children:"Description"}),Object(j.jsx)(o.a,{type:"textarea",name:"description",value:v,isInvalid:g&&!v,onChange:function(e){return f({type:"field",fieldName:"description",payload:e.target.value})}}),Object(j.jsx)("div",{className:"invalid-feedback",children:"Description cannot be empty"})]}),Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)("button",{className:"btn btn-primary",disabled:!y||y&&v===O.description&&h===O.title,type:"submit",children:"Save"})})]}),S&&Object(j.jsx)("div",{className:"alert alert-danger mt-2 mb-0",children:w||"Something went wrong"}),N&&Object(j.jsx)("div",{className:"alert alert-success mt-2 mb-0",children:"Changes saved successfully!"})]})}},526:function(e,t,n){e.exports=n(240)},527:function(e,t,n){"use strict";function i(e,t,n,i,r,c,a){try{var s=e[c](a),u=s.value}catch(o){return void n(o)}s.done?t(u):Promise.resolve(u).then(i,r)}function r(e){return function(){var t=this,n=arguments;return new Promise((function(r,c){var a=e.apply(t,n);function s(e){i(a,r,c,s,u,"next",e)}function u(e){i(a,r,c,s,u,"throw",e)}s(void 0)}))}}n.d(t,"a",(function(){return r}))},539:function(e,t,n){"use strict";var i=n(1),r=n(2);t.a=function(e){var t=e.isInvalid,n=e.onChange,c=e.type,a=e.name,s=e.value,u=e.placeholder,o=void 0===u?"":u,l="textarea"===c?"textarea":"input",d=Object(i.useRef)(null);return Object(i.useEffect)((function(){d.current&&(t?d.current.classList.add("is-invalid"):d.current.classList.remove("is-invalid"))}),[t]),Object(r.jsx)(l,{ref:d,className:"form-control",placeholder:o,type:c,name:a,value:s,onChange:n})}},540:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"c",(function(){return a})),n.d(t,"f",(function(){return s})),n.d(t,"h",(function(){return u})),n.d(t,"b",(function(){return o})),n.d(t,"g",(function(){return l})),n.d(t,"d",(function(){return d})),n.d(t,"e",(function(){return f}));var i=n(42),r=n(138),c=function(e){return i.a.get("films/",{params:e})},a=function(e){return i.a.get("films/".concat(e))},s=function(e){return i.a.get("films/search",{params:e})},u=function(e){return i.a.patch("films/".concat(e,"/view"))},o=function(e){return i.a.post("films",e,{headers:Object(r.a)()})},l=function(e,t){return i.a.put("films/".concat(e),t,{headers:Object(r.a)()})},d=function(e,t){return i.a.patch("films/".concat(e,"/action"),t,{headers:Object(r.a)()})},f=function(e){return i.a.delete("films/".concat(e),{headers:Object(r.a)()})}}}]);
//# sourceMappingURL=15.d68cc7d7.chunk.js.map