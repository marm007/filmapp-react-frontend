(this.webpackJsonpfilmapp_frontened=this.webpackJsonpfilmapp_frontened||[]).push([[5],{599:function(e,a,t){},618:function(e,a,t){"use strict";t.r(a);var i=t(23),r=t.n(i),s=t(35),n=t(12),l=(t(599),t(0)),c=t(25),o=t(212),d=t(45),m=t(486),p=t(509),f=t(294),u=t(295),b=t(505),j=t(507),h=t(48),O=t(18),v=t(2),x=function(e){return{file:null,name:e?y:A,preview:null}},g={type:"",message:""},y="Choose a film ",A="Choose a thumbnail ",N={title:"",description:"",film:x(!0),thumbnail:x(!1),isSubmitted:!1,isSending:!1,isSuccess:!1,isError:!1,error:null},w=function(e,a){switch(a.type){case"field":return Object(v.a)(Object(v.a)({},e),{},Object(O.a)({isError:!1,error:null},a.fieldName,a.payload));case"file-add":return!0===a.isFilm?Object(v.a)(Object(v.a)({},e),{},{isError:!1,error:null,alert:g,film:{file:a.file,name:a.fileName,preview:a.preview}}):Object(v.a)(Object(v.a)({},e),{},{isError:!1,error:null,alert:g,thumbnail:{file:a.file,name:a.fileName,preview:a.preview}});case"file-clear":return!0===a.isFilm?Object(v.a)(Object(v.a)({},e),{},{isError:!1,error:null,film:x(!0)}):Object(v.a)(Object(v.a)({},e),{},{isError:!1,error:null,thumbnail:x(!1)});case"submit":return Object(v.a)(Object(v.a)({},e),{},{isError:!1,error:null,alert:g,isSubmitted:!0});case"send":return Object(v.a)(Object(v.a)({},e),{},{isSending:!0});case"success":return Object(v.a)(Object(v.a)({},e),{},{isSending:!1,isSuccess:!0});case"error":return Object(v.a)(Object(v.a)({},e),{},{isSending:!1,isSuccess:!1,isError:!0,error:a.payload});case"error-422":return Object(v.a)(Object(v.a)({},e),{},{isError:!0,error:a.payload,film:x(!0),thumbnail:x(!1)});default:return e}},E=t(119),C=t(69),F=t(1);a.default=function(){var e=Object(l.useContext)(C.a),a=e.user,t=e.clearUser,i=Object(c.g)(),O=Object(l.useRef)(null),v=Object(l.useRef)(null),x=Object(l.useReducer)(w,N),g=Object(n.a)(x,2),R=g[0],S=g[1],k=R.title,L=R.description,D=R.film,U=R.thumbnail,G=R.isSubmitted,I=R.isSending,B=R.isError,P=R.error;Object(l.useEffect)((function(){!a.auth&&a.isInitialLoaded&&(i.replace("".concat("/filmapp-react-frontend/")),i.push("".concat("/filmapp-react-frontend/","login")),t())}),[a,i,t]),Object(l.useEffect)((function(){function e(){return(e=Object(s.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new FormData).set("title",k),a.set("description",L),a.set("film",D.file),a.set("thumbnail",U.file),e.next=7,E.b(a).then((function(e){S({type:"success"}),i.push("".concat("/filmapp-react-frontend/","film/").concat(e.data.id))})).catch((function(e){var a=null;e.response&&e.response.data&&e.response.data.error?a=e.response.data.error:e.response&&e.response.data&&e.response.data.errors&&(e.response.data.errors.description?a=e.response.data.errors.description.message:e.response.data.errors.title&&(a=e.response.data.errors.title.message)),422===e.response.status?S({type:"error-422",payload:a}):S({type:"error",payload:a})}));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}I&&function(){e.apply(this,arguments)}()}),[L,D.file,i,I,U.file,k]);var T=function(e,a){switch(e.preventDefault(),a){case"film":S({type:"file-add",isFilm:!0,file:O.current.files[0],fileName:O.current.files[0].name,preview:URL.createObjectURL(e.target.files[0])});break;case"thumbnail":S({type:"file-add",isFilm:!1,file:v.current.files[0],fileName:v.current.files[0].name,preview:URL.createObjectURL(e.target.files[0])})}};return Object(F.jsxs)(o.a,{className:"mt-4 mx-2",sm:12,children:[Object(F.jsxs)(d.a,{className:"mb-4",sm:6,lg:5,children:[Object(F.jsx)(d.a,{className:"mb-4",xs:12,sm:12,lg:10,children:Object(F.jsx)("div",{className:"embed-responsive embed-responsive-16by9 z-depth-1-half",children:Object(F.jsxs)("div",{className:"position-relative justify-content-center d-flex align-items-center embed-responsive-item text-center box has-advanced-upload",children:[Object(F.jsx)(m.a,{aspectRatio:"16x9",children:Object(F.jsx)("video",{muted:!0,autoPlay:!0,className:"embed-responsive-item",loop:!0,src:D.preview?D.preview:""})}),Object(F.jsx)("input",{id:"film",accept:"video/mp4, video/ogg",onChange:function(e){return T(e,"film")},type:"file",ref:O,className:"inputfile"}),Object(F.jsx)("label",{htmlFor:"film",className:"position-absolute",children:D.name===y&&Object(F.jsx)("span",{children:D.name})}),D.preview&&Object(F.jsx)(d.a,{className:"card-img-overlay film-add-item-opacity"}),D.preview&&Object(F.jsx)(h.a,{className:"film-add-item-middle fa-3x",style:{color:"#ffffff"},icon:"times",onClick:function(){S({type:"file-clear",isFilm:!0})}})]})})}),Object(F.jsx)(d.a,{xs:12,sm:12,lg:10,children:Object(F.jsx)("div",{className:"embed-responsive embed-responsive-16by9 z-depth-1-half",children:Object(F.jsxs)("div",{className:"position-relative justify-content-center d-flex align-items-center embed-responsive-item text-center box has-advanced-upload",children:[Object(F.jsx)(m.a,{aspectRatio:"16x9",children:Object(F.jsx)("img",{alt:"",src:U.preview?U.preview:"data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="})}),Object(F.jsx)("input",{id:"thumbnail",accept:"image/jpg, image/png, image/jpeg",onChange:function(e){return T(e,"thumbnail")},type:"file",ref:v,className:" inputfile position-absolute"}),Object(F.jsx)("label",{htmlFor:"thumbnail",className:"position-absolute",children:U.name===A&&Object(F.jsx)("span",{children:U.name})}),U.preview&&Object(F.jsx)(d.a,{className:"card-img-overlay film-add-item-opacity"}),U.preview&&Object(F.jsx)(h.a,{className:"film-add-item-middle fa-3x",style:{color:"#ffffff"},icon:"times",onClick:function(){S({type:"file-clear",isFilm:!1})}})]})})})]}),Object(F.jsxs)(d.a,{className:"mb-2",sm:6,lg:5,children:[Object(F.jsxs)(p.a.Group,{className:"mb-3",sm:12,children:[Object(F.jsx)(f.a,{placeholder:"Title","aria-label":"Title","aria-describedby":"basic-addon1",isInvalid:G&&!k,name:"title",value:k,onChange:function(e){return S({type:"field",fieldName:"title",payload:e.target.value})}}),Object(F.jsx)(p.a.Control.Feedback,{type:"invalid",children:"Title is required"})]}),Object(F.jsxs)(p.a.Group,{className:"mb-3",sm:12,children:[Object(F.jsx)(f.a,{placeholder:"Description",as:"textarea","aria-label":"With textarea",isInvalid:G&&!L,name:"description",value:L,onChange:function(e){return S({type:"field",fieldName:"description",payload:e.target.value})}}),Object(F.jsx)(p.a.Control.Feedback,{type:"invalid",children:"Description is required"})]}),Object(F.jsx)(d.a,{className:"mb-3 p-0 ",sm:12,children:Object(F.jsxs)(p.a.Group,{className:"d-flex align-items-center",children:[Object(F.jsx)(u.a,{variant:"primary",disabled:I||!k||!L,onClick:I?null:function(e){e.preventDefault(),S({type:"submit"}),a.auth?k&&L&&S({type:"send"}):i.push("".concat("/filmapp-react-frontend/","add/login"))},children:I?"Loading\u2026":"Add"}),I&&Object(F.jsx)(b.a,{className:"ms-2",animation:"grow"})]})}),B&&Object(F.jsx)(j.a,{variant:"danger",children:P||"Error while creating film."})]})]})}}}]);
//# sourceMappingURL=5.8ccdd2ef.chunk.js.map