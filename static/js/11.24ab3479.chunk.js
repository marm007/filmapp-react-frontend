(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[11],{272:function(t,e,r){t.exports=r(280)},273:function(t,e,r){"use strict";function n(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,s,"next",t)}function s(t){n(a,o,i,c,s,"throw",t)}c(void 0)}))}}r.d(e,"a",(function(){return o}))},280:function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(F){s=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof y?e:y,i=Object.create(o.prototype),a=new _(n||[]);return i._invoke=function(t,e,r){var n=f;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw i;return P()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=L(a,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var s=l(t,e,r);if("normal"===s.type){if(n=r.done?d:h,s.arg===v)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=d,r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(F){return{type:"throw",arg:F}}}t.wrap=u;var f="suspendedStart",h="suspendedYield",p="executing",d="completed",v={};function y(){}function m(){}function g(){}var b={};b[i]=function(){return this};var w=Object.getPrototypeOf,j=w&&w(w(k([])));j&&j!==r&&n.call(j,i)&&(b=j);var x=g.prototype=y.prototype=Object.create(b);function O(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,i,a,c){var s=l(t[o],t,i);if("throw"!==s.type){var u=s.arg,f=u.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(f).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,c)}))}c(s.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function L(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,L(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function N(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function k(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:P}}function P(){return{value:e,done:!0}}return m.prototype=x.constructor=g,g.constructor=m,m.displayName=s(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s(t,c,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},O(E.prototype),E.prototype[a]=function(){return this},t.AsyncIterator=E,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new E(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},O(x),s(x,c,"Generator"),x[i]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=k,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(N),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var s=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),N(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;N(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:k(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},284:function(t,e,r){"use strict";var n=r(0),o=r(1);e.a=function(t){var e=t.isInvalid,r=t.onChange,i=t.type,a=t.name,c=t.value,s=t.placeholder,u=void 0===s?"":s,l="textarea"===i?"textarea":"input",f=Object(n.useRef)(null);return Object(n.useEffect)((function(){f.current&&(e?f.current.classList.add("is-invalid"):f.current.classList.remove("is-invalid"))}),[e]),Object(o.jsx)(l,{ref:f,className:"form-control",placeholder:u,type:i,name:a,value:c,onChange:r})}},290:function(t,e,r){"use strict";r.d(e,"a",(function(){return i})),r.d(e,"b",(function(){return a}));var n=r(44),o=r(2),i={email:"",nick:"",password:"",isSubmitted:!1,isSending:!1,isSuccess:!1,isError:!1,error:null},a=function(t,e){switch(e.type){case"field":return Object(o.a)(Object(o.a)({},t),{},Object(n.a)({isSubmitted:!1},e.fieldName,e.payload));case"submit":return Object(o.a)(Object(o.a)({},t),{},{isError:!1,error:null,isSubmitted:!0});case"send":return Object(o.a)(Object(o.a)({},t),{},{isSending:!0});case"success":return Object(o.a)(Object(o.a)({},t),{},{isError:!1,error:null,isSending:!1,isSuccess:!0});case"error":return Object(o.a)(Object(o.a)({},t),{},{isSending:!1,isError:!0,error:e.payload});default:return t}}},447:function(t,e,r){"use strict";r.r(e);var n=r(272),o=r.n(n),i=r(273),a=r(29),c=r(0),s=r(7),u=r(85),l=r(284),f=r(290),h=r(86),p=r(1);e.default=function(){var t=Object(s.g)(),e=Object(c.useReducer)(f.b,f.a),r=Object(a.a)(e,2),n=r[0],d=r[1],v=n.email,y=n.isSuccess,m=n.isSubmitted,g=n.isSending,b=n.isError,w=n.error;Object(c.useEffect)((function(){function t(){return(t=Object(i.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,h.a({email:v}).then((function(t){d({type:"success"})})).catch((function(t){var e=null;t.response&&t.response.data&&t.response.data.errors&&(e=t.response.data.errors),d({type:"error",payload:e}),console.error(t)}));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}g&&function(){t.apply(this,arguments)}()}),[g,v]);return Object(p.jsx)(u.a,{id:"forgotPasswordModal",title:"Forgot",onClose:function(){t.goBack()},children:Object(p.jsxs)("form",{onSubmit:function(t){t.preventDefault(),d({type:"submit"}),v&&d({type:"send"})},children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("label",{htmlFor:"email",children:"Email"}),Object(p.jsx)(l.a,{isInvalid:m&&!v,type:"email",name:"email",value:v,onChange:function(t){return d({type:"field",fieldName:"email",payload:t.target.value})}}),Object(p.jsx)("div",{className:"invalid-feedback",children:"Email is required"})]}),y&&Object(p.jsx)("div",{className:"alert alert-danger mt-2",children:"Email with link to reset password has been sent."}),b&&Object(p.jsx)("div",{className:"alert alert-danger mt-2",children:w||"Error while sending email."}),Object(p.jsxs)("div",{className:"d-flex align-items-center mt-2",children:[Object(p.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Reset password"}),g&&Object(p.jsx)("div",{className:"spinner-grow ms-2"})]})]})})}}}]);
//# sourceMappingURL=11.24ab3479.chunk.js.map