(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[14],{510:function(e,t,r){e.exports=r(236)},511:function(e,t,r){"use strict";function n(e,t,r,n,s,a,c){try{var i=e[a](c),o=i.value}catch(u){return void r(u)}i.done?t(o):Promise.resolve(o).then(n,s)}function s(e){return function(){var t=this,r=arguments;return new Promise((function(s,a){var c=e.apply(t,r);function i(e){n(c,s,a,i,o,"next",e)}function o(e){n(c,s,a,i,o,"throw",e)}i(void 0)}))}}r.d(t,"a",(function(){return s}))},521:function(e,t,r){"use strict";var n=r(1),s=r(2);t.a=function(e){var t=e.isInvalid,r=e.onChange,a=e.type,c=e.name,i=e.value,o=e.placeholder,u=void 0===o?"":o,l="textarea"===a?"textarea":"input",d=Object(n.useRef)(null);return Object(n.useEffect)((function(){d.current&&(t?d.current.classList.add("is-invalid"):d.current.classList.remove("is-invalid"))}),[t]),Object(s.jsx)(l,{ref:d,className:"form-control",placeholder:u,type:a,name:c,value:i,onChange:r})}},526:function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return c}));var n=r(73),s=r(3),a={email:"",nick:"",password:"",isSubmitted:!1,isSending:!1,isSuccess:!1,isError:!1,error:null},c=function(e,t){switch(t.type){case"field":return Object(s.a)(Object(s.a)({},e),{},Object(n.a)({isSubmitted:!1},t.fieldName,t.payload));case"submit":return Object(s.a)(Object(s.a)({},e),{},{isError:!1,error:null,isSubmitted:!0});case"send":return Object(s.a)(Object(s.a)({},e),{},{isSending:!0});case"success":return Object(s.a)(Object(s.a)({},e),{},{isError:!1,error:null,isSending:!1,isSuccess:!0});case"error":return Object(s.a)(Object(s.a)({},e),{},{isSending:!1,isError:!0,error:t.payload});default:return e}}},673:function(e,t,r){"use strict";r.r(t);var n=r(510),s=r.n(n),a=r(511),c=r(47),i=r(1),o=r(15),u=r(145),l=r(521),d=r(526),p=r(146),f=r(2);t.default=function(e){var t=Object(o.g)(),r=Object(i.useReducer)(d.b,d.a),n=Object(c.a)(r,2),m=n[0],b=n[1],j=m.password,h=m.isSubmitted,v=m.isSending,O=m.isSuccess,w=m.isError,g=m.error;Object(i.useEffect)((function(){function r(){return(r=Object(a.a)(s.a.mark((function r(){return s.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,p.e(e.match.params.token,{password:j}).then((function(e){b({type:"success"}),setTimeout((function(){t.push("".concat("/filmapp-react-frontend/")),setTimeout((function(){t.push("".concat("/filmapp-react-frontend/","login"))}),500)}),1500)})).catch((function(e){var t=null;e.response&&e.response.data&&e.response.data.errors&&(t=e.response.data.errors),b({type:"error",payload:t})}));case 2:case"end":return r.stop()}}),r)})))).apply(this,arguments)}v&&function(){r.apply(this,arguments)}()}),[v,t,j,e.match.params.token]);return Object(f.jsx)(u.a,{id:"resetPasswordModal",title:"Reset",onClose:function(){t.push("".concat("/filmapp-react-frontend/"))},children:Object(f.jsxs)("form",{onSubmit:function(t){t.preventDefault(),b({type:"submit"}),e.match.params.token&&j&&j.length>=6&&b({type:"send"})},children:[Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{className:"form-label",htmlFor:"password",children:"Password"}),Object(f.jsx)(l.a,{isInvalid:h&&j.length<6,type:"password",name:"password",value:j,onChange:function(e){return b({type:"field",fieldName:"password",payload:e.target.value})}}),Object(f.jsx)("div",{className:"invalid-feedback",children:0===j.length?"Password is required":"Password too short (min 6 chars)"})]}),O&&Object(f.jsx)("div",{className:"alert alert-success mt-2",children:"Password has been reseated! Redirecting to login page."}),w&&Object(f.jsx)("div",{className:"alert alert-danger mt-2",children:g||"Error while resetting password."}),Object(f.jsxs)("div",{className:"d-flex align-items-center mt-2",children:[Object(f.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Reset password"}),v&&Object(f.jsx)("div",{className:"spinner-grow ms-2"})]})]})})}}}]);
//# sourceMappingURL=14.4ebf4235.chunk.js.map