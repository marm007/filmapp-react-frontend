(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[8],{611:function(e,a,t){"use strict";t.r(a);var n=t(23),r=t.n(n),s=t(35),i=t(12),c=t(0),o=t(25),l=t(508),d=t(509),u=t(507),j=t(295),p=t(505),b=t(105),m=t(107),h=t(69),f=t(1);a.default=function(e){var a=Object(o.g)(),t=Object(c.useContext)(h.a).login,n=Object(c.useReducer)(m.b,m.a),O=Object(i.a)(n,2),x=O[0],g=O[1],y=x.email,v=x.nick,k=x.password,w=x.isSubmitted,C=x.isSuccess,N=x.isSending,F=x.isError,E=x.error,S=Object(c.useState)(!0),B=Object(i.a)(S,2),G=B[0],L=B[1];Object(c.useEffect)((function(){function e(){return(e=Object(s.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.d({email:y,password:k,name:v}).then((function(e){g({type:"success"}),setTimeout((function(){t(e.data.user.name,e.data.user.id,e.data.token,e.data.refreshToken),a.goBack()}),1500)})).catch((function(e){var a=null;e.response&&e.response.data&&e.response.data.errors?a=e.response.data.errors:e.response&&e.response.data&&e.response.data.error&&(a=e.response.data.error),g({type:"error",payload:a}),console.error(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}N&&function(){e.apply(this,arguments)}()}),[N,y,v,k,a,t]);var q=function(){L(!1),a.goBack()};return Object(f.jsxs)(l.a,{onHide:q,show:G,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:[Object(f.jsx)(l.a.Header,{closeButton:!0,children:Object(f.jsx)(l.a.Title,{id:"contained-modal-title-vcenter",children:"Register"})}),Object(f.jsx)(l.a.Body,{children:Object(f.jsxs)(d.a,{onSubmit:function(e){e.preventDefault(),g({type:"submit"}),y&&v&&k&&k.length>=6&&g({type:"send"})},children:[Object(f.jsxs)(d.a.Group,{children:[Object(f.jsx)(d.a.Label,{htmlFor:"nick",children:"Nick"}),Object(f.jsx)(d.a.Control,{isInvalid:w&&!v,type:"text",name:"nick",value:v,onChange:function(e){return g({type:"field",fieldName:"nick",payload:e.target.value})}}),Object(f.jsx)(d.a.Control.Feedback,{type:"invalid",children:"Nick is required"})]}),Object(f.jsxs)(d.a.Group,{className:"mt-2",children:[Object(f.jsx)(d.a.Label,{htmlFor:"email",children:"Email"}),Object(f.jsx)(d.a.Control,{isInvalid:w&&!y,type:"email",name:"email",value:y,onChange:function(e){return g({type:"field",fieldName:"email",payload:e.target.value})}}),Object(f.jsx)(d.a.Control.Feedback,{type:"invalid",children:"Email is required"})]}),Object(f.jsxs)(d.a.Group,{className:"mt-2",children:[Object(f.jsx)(d.a.Label,{htmlFor:"password",children:"Password"}),Object(f.jsx)(d.a.Control,{isInvalid:w&&k.length<6,type:"password",name:"password",value:k,maxLength:"11",onChange:function(e){return g({type:"field",fieldName:"password",payload:e.target.value})}}),Object(f.jsx)(d.a.Control.Feedback,{type:"invalid",children:0===k.length?"Password is required":"Password too short (min 6 chars)"})]}),C&&Object(f.jsx)(u.a,{variant:"success",className:"mt-2",children:"You have successfully registered and logged in."}),F&&Object(f.jsx)(u.a,{variant:"danger",className:"mt-2",children:E||"Error while registtering."}),Object(f.jsxs)(d.a.Group,{className:"d-flex align-items-center mt-2",children:[Object(f.jsx)(j.a,{type:"submit",className:"btn-primary",children:"Register"}),N&&Object(f.jsx)(p.a,{className:"ms-2",animation:"grow"})]})]})}),Object(f.jsx)(l.a.Footer,{children:Object(f.jsx)(j.a,{onClick:q,children:"Close"})})]})}}}]);
//# sourceMappingURL=8.5bcb2b40.chunk.js.map