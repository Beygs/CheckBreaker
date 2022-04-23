const K=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}};K();class I{constructor(n={}){typeof n.fillValue!="undefined"&&W(n.fillValue),this.dimensions=Z(n.dimensions||"8x8"),this.displayEl=Q(n.selector),this._data=this.getEmptyMatrix({fillValue:n.fillValue||0}),t0(this.displayEl,this._data)}getCheckboxValue(n,e){if(!(n>=0&&e>=0&&n<this.dimensions[0]&&e<this.dimensions[1]))throw new Error(`The location (x: ${n}, y: ${e}) is outside of this checkbox display`);return this._data[e][n]}setCheckboxValue(n,e,o){const r=n>=0&&e>=0&&n<this.dimensions[0]&&e<this.dimensions[1];if(W(o),!r)return;this._data[e][n]=o;const i=this.displayEl.children[e].children[n];if(o===2){if(i.indeterminate)return;i.indeterminate=!0,i.checked=!1}else{if(i.indeterminate&&(i.indeterminate=!1),i.checked===Boolean(o))return;i.checked=Boolean(o)}}getData(){return this._data.map(e=>e.slice())}setData(n,e={}){const{x:o=0,y:r=0,fillValue:i}=e,s=typeof i!="undefined",a=this.dimensions[0],d=this.dimensions[1];J(n);for(let f=0;f<d;f++)for(let h=0;h<a;h++){let c=h<o,l=f<r,g=h>=o+n[0].length,b=f>=r+n.length,y=c||l||g||b;if(y&&!s)continue;let E=y?i:n[f-r][h-o];this.setCheckboxValue(h,f,E)}}clearData(){const n=this.getEmptyMatrix();this.setData(n)}getEmptyMatrix(n={}){const{fillValue:e=0,width:o=this.dimensions[0],height:r=this.dimensions[1]}=n,i=[];for(let s=0;s<r;s++){i[s]=[];for(let a=0;a<o;a++)i[s][a]=e}return i}static extend(n={}){const{name:e,exec:o,cleanUp:r}=n;if(!e||!o)throw new Error('Your plugin must have a "name" and an "exec" function.');r&&(o.cleanUp=r),this.prototype[e]=o}}function W(t){if(!(t===0||t===1||t===2))throw new Error(`${t} is not a valid checkbox value.`)}function J(t){if(!(Array.isArray(t)&&Array.isArray(t[0])))throw new Error(`${t} is not a valid matrix.`)}function Q(t="#checkboxland"){if(t instanceof Element)return t;if(typeof t=="string")return document.querySelector(t);throw new Error("Checkboxland selector is invalid.")}function Z(t){const n="The dimensions you provided are invalid.";if(typeof t!="string")throw new Error(n);const e=t.split("x").map(r=>Number(r));if(!(e.length===2&&!isNaN(e[0])&&!isNaN(e[0])))throw new Error(n);return t.split("x").map(r=>Number(r))}function t0(t,n){t.innerHTML="",t.style.overflowX="auto",t.setAttribute("aria-hidden",!0),n.forEach(e=>{const o=document.createElement("div");o.style.lineHeight=.75,o.style.whiteSpace="nowrap",e.forEach(r=>{const i=document.createElement("input"),s=r===2,a=s?!1:Boolean(r);i.style.margin=0,i.style.verticalAlign="top",i.type="checkbox",i.tabIndex="-1",i.checked=a,i.indeterminate=s,o.appendChild(i)}),t.appendChild(o)})}const e0={"0":[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,1,1],[1,0,1,0,1],[1,1,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],"1":[[0,1,0],[1,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],"2":[[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],[0,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],"3":[[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,1,0],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],"4":[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,1]],"5":[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],"6":[[0,0,1,1,0],[0,1,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],"7":[[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,0]],"8":[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],"9":[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,1,1,0,0]],":":[[0],[1],[0],[0],[0],[1],[0]]," ":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],A:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],B:[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],C:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],D:[[1,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,1,0],[1,1,1,0,0]],E:[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],F:[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],G:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,0],[1,0,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1]],H:[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],I:[[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],J:[[0,0,1,1,1],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,1,0],[1,0,0,1,0],[0,1,1,0,0]],K:[[1,0,0,0,1],[1,0,0,1,0],[1,0,1,0,0],[1,1,0,0,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],L:[[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],M:[[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],N:[[1,0,0,0,1],[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1],[1,0,0,0,1]],O:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],P:[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],Q:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,1,0],[0,1,1,0,1]],R:[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],S:[[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],T:[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],U:[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],V:[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]],W:[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,0,1,0]],X:[[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1],[1,0,0,0,1]],Y:[[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],Z:[[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],a:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,1,1,1,1],[1,0,0,0,1],[1,1,1,1,1]],b:[[1,0,0,0,0],[1,0,0,0,0],[1,0,1,1,0],[1,1,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],c:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],d:[[0,0,0,0,1],[0,0,0,0,1],[0,1,1,0,1],[1,0,0,1,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1]],e:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,0],[0,1,1,1,0]],f:[[0,0,1,1,0],[0,1,0,0,1],[0,1,0,0,0],[1,1,1,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,0]],g:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,1,1,1,0]],h:[[1,0,0,0,0],[1,0,0,0,0],[1,0,1,1,0],[1,1,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],i:[[0,1,0],[0,0,0],[1,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],j:[[0,0,0,1],[0,0,0,0],[0,0,1,1],[0,0,0,1],[0,0,0,1],[1,0,0,1],[0,1,1,0]],k:[[1,0,0,0],[1,0,0,0],[1,0,0,1],[1,0,1,0],[1,1,0,0],[1,0,1,0],[1,0,0,1]],l:[[1,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],m:[[0,0,0,0,0],[0,0,0,0,0],[1,1,0,1,0],[1,0,1,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],n:[[0,0,0,0,0],[0,0,0,0,0],[1,0,1,1,0],[1,1,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],o:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],p:[[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0]],q:[[0,0,0,0,0],[0,0,0,0,0],[1,1,1,0,1],[1,0,0,1,1],[1,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1]],r:[[0,0,0,0,0],[0,0,0,0,0],[1,0,1,1,0],[1,1,0,0,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],s:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],t:[[0,1,0,0,0],[0,1,0,0,0],[1,1,1,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,1],[0,0,1,1,0]],u:[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,1,1],[0,1,1,0,1]],v:[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]],w:[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,0,1,0]],x:[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],y:[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,1,1,1,0]],z:[[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],"`":[[1,0,0],[0,1,0],[0,0,1],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],"~":[[0,0,0,0,0],[0,0,0,0,0],[0,1,0,0,0],[1,0,1,0,1],[0,0,0,1,0],[0,0,0,0,0],[0,0,0,0,0]],"!":[[1],[1],[1],[1],[1],[0],[1]],"@":[[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],[0,1,1,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,1,1,0]],"#":[[0,1,0,1,0],[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0]],$:[[0,0,1,0,0],[0,1,1,1,1],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0],[0,0,1,0,0]],"%":[[1,1,0,0,1],[1,1,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,1,1],[1,0,0,1,1]],"^":[[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"&":[[0,1,1,0,0],[1,0,0,1,0],[1,0,1,0,0],[0,1,0,0,0],[1,0,1,0,1],[1,0,0,1,0],[1,1,1,0,1]],"*":[[0,0,0,0,0],[0,0,1,0,0],[1,0,1,0,1],[0,1,1,1,0],[1,0,1,0,1],[0,0,1,0,0],[0,0,0,0,0]],"(":[[0,0,1],[0,1,0],[1,0,0],[1,0,0],[1,0,0],[0,1,0],[0,0,1]],")":[[1,0,0],[0,1,0],[0,0,1],[0,0,1],[0,0,1],[0,1,0],[1,0,0]],"-":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],_:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1]],"+":[[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]],"=":[[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],"[":[[1,1,1],[1,0,0],[1,0,0],[1,0,0],[1,0,0],[1,0,0],[1,1,1]],"]":[[1,1,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[1,1,1]],"{":[[0,0,1],[0,1,0],[0,1,0],[1,0,0],[0,1,0],[0,1,0],[0,0,1]],"}":[[1,0,0],[0,1,0],[0,1,0],[0,0,1],[0,1,0],[0,1,0],[1,0,0]],"|":[[1],[1],[1],[1],[1],[1],[1]],"\\":[[1,0,0],[1,0,0],[0,1,0],[0,1,0],[0,1,0],[0,0,1],[0,0,1]],"/":[[0,0,1],[0,0,1],[0,1,0],[0,1,0],[0,1,0],[1,0,0],[1,0,0]],";":[[0,0],[0,1],[0,1],[0,0],[0,0],[0,1],[1,0]],'"':[[1,0,1],[1,0,1],[1,0,1],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],"'":[[1,1],[0,1],[1,0],[0,0],[0,0],[0,0],[0,0]],",":[[0,0],[0,0],[0,0],[0,0],[1,1],[0,1],[1,0]],".":[[0],[0],[0],[0],[0],[0],[1]],"<":[[0,0,0],[0,0,1],[0,1,0],[1,0,0],[0,1,0],[0,0,1],[0,0,0]],">":[[0,0,0],[1,0,0],[0,1,0],[0,0,1],[0,1,0],[1,0,0],[0,0,0]],"?":[[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0]]};function n0(t,n={}){const{dataOnly:e=!1,font:o=e0,x:r=0,y:i=0,fillValue:s}=n,a=typeof s!="undefined",f=t.split("").reduce((h,c)=>{const l=o[c];return i0(h,l)},[]);if(f.length===0&&f.push([]),e){if(!a)return f;let h=this.getEmptyMatrix({fillValue:s});return f.forEach((c,l)=>{c.forEach((g,b)=>{h[l+i][b+r]=g})}),h}this.setData(f,{x:r,y:i,fillValue:s})}function i0(t,n){if(t.length===0)return n;const e=[];return t.forEach((o,r)=>{e.push(o.concat([0]).concat(n[r]))}),e}var r0={name:"print",exec:n0};let B;function o0(t,n={}){const{interval:e=200,repeat:o=!1,fillValue:r=0,callback:i=()=>{}}=n,s=this.dimensions[1],a=this.dimensions[0],d=a+t[0].length;let f=1;B=setInterval(()=>{const h=this.getData();for(let c=0;c<s;c++)for(let l=0;l<a;l++)if(l+1===a){const b=f-(a-l),y=t[c]?typeof t[c][b]=="undefined"?r:t[c][b]:r;this.setCheckboxValue(l,c,y)}else this.setCheckboxValue(l,c,h[c][l+1]);f===d?o?f=1:(clearInterval(B),i()):f++},e)}function a0(){clearInterval(B)}var l0={name:"marquee",exec:o0,cleanUp:a0};let T;function c0(t,n={}){const{interval:e=200,fillValue:o=0,direction:r="ltr",callback:i=()=>{}}=n,s=this.dimensions[1],a=this.dimensions[0],d=a+1;let f=1;T=setInterval(()=>{let h,c;switch(r){case"ltr":h=f-1,c=h-1;break;case"rtl":h=a-f,c=h+1;break}for(let l=0;l<s;l++)for(let g=0;g<a;g++)if(g===h)this.setCheckboxValue(g,l,1);else if(g===c){let b=t[l]?typeof t[l][g]=="undefined"?o:t[l][g]:o;this.setCheckboxValue(g,l,b)}f===d?(clearInterval(T),i()):f++},e)}function d0(){clearInterval(T)}var s0={name:"transitionWipe",exec:c0,cleanUp:d0};function f0(t,n,e){return{invert:h0,pad:u0}[t](n,e)}function h0(t){return t.map(n=>n.map(e=>e?0:1))}function u0(t,n={}){const e=Number.isInteger(n.all),o=e?n.all:n.top,r=e?n.all:n.right,i=e?n.all:n.bottom,s=e?n.all:n.left;let a=t.map(h=>{let c=h;return s&&(c=[...Array(s).fill(0),...c]),r&&(c=[...c,...Array(r).fill(0)]),c});const d=a[0].length,f=(h,c)=>{const l=[];for(let g=0;g<h;g++)l.push(Array(c).fill(0));return l};return o&&(a=[...f(o,d),...a]),i&&(a=[...a,...f(i,d)]),a}var m0={name:"dataUtils",exec:f0};let N=null,O=null;function x0(t){O=this.displayEl,N=g0.bind(this,t),O.addEventListener("click",N)}function g0(t,n){const e=y0(O,n.target);if(!e)return;const o={x:e.x,y:e.y,checkbox:n.target};if(typeof t=="function")t(o);else if("handleEvent"in t&&typeof t.handleEvent=="function")t.handleEvent(o);else throw new TypeError("Callback should be a function or an EventListener object")}function y0(t,n){for(let e=0;e<t.children.length;e+=1){const o=t.children[e];for(let r=0;r<o.children.length;r+=1)if(o.children[r]===n)return{x:r,y:e}}return null}function b0(){O.removeEventListener("click",N)}var v0={name:"onClick",exec:x0,cleanUp:b0};const _=[[60,136,253],[255,255,255]];function p0({uint8data:t,palette:n=_,step:e=1,h:o,w:r}){for(var i=new Uint8ClampedArray(t),s=3,a=new Array([1,9,3,11],[13,5,15,7],[4,12,2,10],[16,8,14,6]),d,f,h,c,l,g,b,y,E,M,C,w,v=0;v<o;v+=e)for(var p=0;p<r;p+=e)for(c=4*p+4*v*r,d=c,f=c+1,h=c+2,i[d]+=a[p%4][v%4]*s,i[f]+=a[p%4][v%4]*s,i[h]+=a[p%4][v%4]*s,l=new Array(i[d],i[f],i[h]),g=F(l,n),b=g[0],y=g[1],E=g[2],M=0;M<e;M++)for(C=0;C<e;C++)w=c+4*M+4*r*C,i[w]=b,i[w+1]=y,i[w+2]=E;return i}function w0({uint8data:t,palette:n=_,step:e=1,h:o,w:r}){for(var i=new Uint8ClampedArray(t),s=new Uint8ClampedArray(t),a=1/8,d=function(X,$){return 4*X+4*$*r},f,h,c,l,g,b,y,E,M,C,w,v,p,m=0;m<o;m+=e)for(var x=0;x<r;x+=e)for(g=4*x+4*m*r,f=g,h=g+1,c=g+2,b=new Array(i[f],i[h],i[c]),y=F(b,n),l=[],l[f]=i[f]-y[0],l[h]=i[h]-y[1],l[c]=i[c]-y[2],i[d(x+e,m)+0]+=a*l[f],i[d(x-e,m+e)+0]+=a*l[f],i[d(x,m+e)+0]+=a*l[f],i[d(x+e,m+e)+0]+=a*l[f],i[d(x+2*e,m)+0]+=a*l[f],i[d(x,m+2*e)+0]+=a*l[f],i[d(x+e,m)+1]+=a*l[h],i[d(x-e,m+e)+1]+=a*l[h],i[d(x,m+e)+1]+=a*l[h],i[d(x+e,m+e)+1]+=a*l[h],i[d(x+2*e,m)+1]+=a*l[h],i[d(x,m+2*e)+1]+=a*l[h],i[d(x+e,m)+2]+=a*l[c],i[d(x-e,m+e)+2]+=a*l[c],i[d(x,m+e)+2]+=a*l[c],i[d(x+e,m+e)+2]+=a*l[c],i[d(x+2*e,m)+2]+=a*l[c],i[d(x,m+2*e)+2]+=a*l[c],E=y[0],M=y[1],C=y[2],w=0;w<e;w++)for(v=0;v<e;v++)p=g+4*w+4*r*v,s[p]=E,s[p+1]=M,s[p+2]=C;return s}function k0({uint8data:t,palette:n=_,step:e=1,h:o,w:r}){for(var i=new Uint8ClampedArray(t),s=new Uint8ClampedArray(t),a=1/16,d=function(X,$){return 4*X+4*$*r},f,h,c,l,g,b,y,E,M,C,w,v,p,m=0;m<o;m+=e)for(var x=0;x<r;x+=e)for(g=4*x+4*m*r,f=g,h=g+1,c=g+2,b=new Array(i[f],i[h],i[c]),y=F(b,n),l=[],l[f]=i[f]-y[0],l[h]=i[h]-y[1],l[c]=i[c]-y[2],i[d(x+e,m)]=i[d(x+e,m)]+7*a*l[f],i[d(x-e,m+1)]=i[d(x-1,m+e)]+3*a*l[f],i[d(x,m+e)]=i[d(x,m+e)]+5*a*l[f],i[d(x+e,m+e)]=i[d(x+1,m+e)]+1*a*l[f],i[d(x+e,m)+1]=i[d(x+e,m)+1]+7*a*l[h],i[d(x-e,m+e)+1]=i[d(x-e,m+e)+1]+3*a*l[h],i[d(x,m+e)+1]=i[d(x,m+e)+1]+5*a*l[h],i[d(x+e,m+e)+1]=i[d(x+e,m+e)+1]+1*a*l[h],i[d(x+e,m)+2]=i[d(x+e,m)+2]+7*a*l[c],i[d(x-e,m+e)+2]=i[d(x-e,m+e)+2]+3*a*l[c],i[d(x,m+e)+2]=i[d(x,m+e)+2]+5*a*l[c],i[d(x+e,m+e)+2]=i[d(x+e,m+e)+2]+1*a*l[c],E=y[0],M=y[1],C=y[2],w=0;w<e;w++)for(v=0;v<e;v++)p=g+4*w+4*r*v,s[p]=E,s[p+1]=M,s[p+2]=C;return s}function F(t,n){function e(i,s){return Math.sqrt(Math.pow(i[0]-s[0],2)+Math.pow(i[1]-s[1],2)+Math.pow(i[2]-s[2],2))}function o(i,s,a,d){if(a.length==2)return i(s,d)<=i(s,a[1])?d:a[1];var f=a.slice(1);return i(s,d)<=i(s,a[1])?d=d:d=a[1],o(i,s,f,d)}var r=o(e,t,n,n[0]);return r}function V0(t,n){const e=(r,i,s)=>.21*r+.72*i+.07*s,o=n/100*255;for(let r=0;r<t.length;r+=4){const i=t[r],s=t[r+1],a=t[r+2],f=e(i,s,a)>o?255:0;t[r]=f,t[r+1]=f,t[r+2]=f}return t}function E0(t,n,e){const o=n.width,r=n.height,i=n.data,s=[0,-1,0,-1,5,-1,0,-1,0],a=Math.round(Math.sqrt(s.length)),d=a*.5|0,h=t.createImageData(o,r).data;for(let c=r;c>=0;c--)for(let l=o;l>=0;l--){const g=c,b=l,y=(c*o+l)*4;let E=0,M=0,C=0,w=0;for(let v=0;v<a;v++)for(let p=0;p<a;p++){const m=g+v-d,x=b+p-d;if(m>=0&&m<r&&x>=0&&x<o){const X=(m*o+x)*4,$=s[v*a+p];E+=i[X]*$,M+=i[X+1]*$,C+=i[X+2]*$,w+=i[X+3]*$}}h[y]=E*e+i[y]*(1-e),h[y+1]=M*e+i[y+1]*(1-e),h[y+2]=C*e+i[y+2]*(1-e),h[y+3]=i[y+3]}for(let c=r;c>=0;c--){const g=(c*o+0)*4;h[g]=i[g],h[g+1]=i[g+1],h[g+2]=i[g+2],h[g+3]=i[g+3]}return h}let A,P;function Y(t,n={},e){A||(A=document.createElement("canvas"),P=A.getContext("2d")),A.width=e.dimensions[0],A.height=e.dimensions[1],P.fillStyle="white",P.fillRect(0,0,A.width,A.height);const[o,r]=M0(t),[i,s]=C0(o,r,A.width,A.height);P.drawImage(t,0,0,i,s);const a=I0(P,i,s,n),d=A0(a);e.setData(d,n)}function M0(t){let n=0,e=0;switch(t.tagName){case"IMG":n=t.width,e=t.height;break;case"VIDEO":n=t.videoWidth,e=t.videoHeight;break}return[n,e]}function C0(t,n,e,o){const r=n/o,i=t/e;if(r<1&&i<1)return[t,n];const s=()=>[Math.floor(t*o/n),o],a=()=>{const d=Math.floor(n*e/t);return[e,d]};return r>i?s():a()}function I0(t,n,e,o){const{threshold:r=50,dithering:i="none"}=o;let s=t.getImageData(0,0,n,e),a;const d={ordered:p0,atkinson:w0,errorDiffusion:k0};return i==="none"?a=V0(s.data,r):(a=E0(t,s,r/100),a=d[i]({uint8data:a,w:n,h:e})),s.data.set(a),s}function A0(t){const n=[],e=t.width;for(let o=0;o<t.data.length;o+=4){const r=o/4,i=Math.floor(r/e),s=r%e;s===0&&(n[i]=[]),n[i][s]=t.data[o]===255?0:1}return n}function X0(t,n){const e=this;let o;typeof t=="string"?(o=new Image,o.crossOrigin="anonymous",o.addEventListener("load",()=>Y(o,n,e),{once:!0}),o.src=t):typeof t=="object"&&(t.complete?Y(t,n,e):t.addEventListener("load",()=>Y(t,n,e),{once:!0}))}var $0={name:"renderImage",exec:X0};let S;function P0(t,n){const e=this;let o;typeof t=="string"?(o=document.createElement("video"),o.loop=!0,o.controls=!0,o.autoplay=!0,o.muted=!0,o.crossOrigin="anonymous",o.addEventListener("loadeddata",()=>{o.play(),U(o,n,e)},{once:!0}),o.src=t):typeof t=="object"&&(t.readyState===4?U(t,n,e):t.addEventListener("loadeddata",()=>U(t,n,e),{once:!0}))}function U(t,n,e){Y(t,n,e),S=requestAnimationFrame(()=>U(t,n,e))}function D0(){cancelAnimationFrame(S)}var Y0={name:"renderVideo",exec:P0,cleanUp:D0};I.extend(r0);I.extend(l0);I.extend(s0);I.extend(m0);I.extend(v0);I.extend($0);I.extend(Y0);let R;function U0(t,n={}){const{interval:e=200,repeat:o=!1,fillValue:r=0,callback:i=()=>{}}=n,s=this.dimensions[1],a=this.dimensions[0],d=a+t[0].length;let f=1;R=setInterval(()=>{const h=this.getData();for(let c=0;c<s;c++)for(let l=0;l<a;l++)if(l+1===a){const b=f-(a-l),y=t[c]?typeof t[c][b]=="undefined"?r:t[c][b]:r;this.setCheckboxValue(l,c,y)}else this.setCheckboxValue(l,c,h[c][l+1]);f===d?o?f=1:(clearInterval(R),i()):f++},e)}function L0(){clearInterval(R)}var O0={name:"marquee",exec:U0,cleanUp:L0};const q0={"0":[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,1,1],[1,0,1,0,1],[1,1,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],"1":[[0,1,0],[1,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],"2":[[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],[0,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],"3":[[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,1,0],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],"4":[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,1]],"5":[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],"6":[[0,0,1,1,0],[0,1,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],"7":[[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,0]],"8":[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],"9":[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,1,1,0,0]],":":[[0],[1],[0],[0],[0],[1],[0]]," ":[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],A:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]],B:[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],C:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],D:[[1,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,1,0],[1,1,1,0,0]],E:[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],F:[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],G:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,0],[1,0,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1]],H:[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],I:[[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],J:[[0,0,1,1,1],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,1,0],[1,0,0,1,0],[0,1,1,0,0]],K:[[1,0,0,0,1],[1,0,0,1,0],[1,0,1,0,0],[1,1,0,0,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],L:[[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],M:[[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],N:[[1,0,0,0,1],[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1],[1,0,0,0,1]],O:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],P:[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],Q:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,1,0],[0,1,1,0,1]],R:[[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],S:[[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],T:[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],U:[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],V:[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]],W:[[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,0,1,0]],X:[[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1],[1,0,0,0,1]],Y:[[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],Z:[[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],a:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,1,1,1,1],[1,0,0,0,1],[1,1,1,1,1]],b:[[1,0,0,0,0],[1,0,0,0,0],[1,0,1,1,0],[1,1,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],c:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,1],[0,1,1,1,0]],d:[[0,0,0,0,1],[0,0,0,0,1],[0,1,1,0,1],[1,0,0,1,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1]],e:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,0],[0,1,1,1,0]],f:[[0,0,1,1,0],[0,1,0,0,1],[0,1,0,0,0],[1,1,1,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,0]],g:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,1,1,1,0]],h:[[1,0,0,0,0],[1,0,0,0,0],[1,0,1,1,0],[1,1,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],i:[[0,1,0],[0,0,0],[1,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],j:[[0,0,0,1],[0,0,0,0],[0,0,1,1],[0,0,0,1],[0,0,0,1],[1,0,0,1],[0,1,1,0]],k:[[1,0,0,0],[1,0,0,0],[1,0,0,1],[1,0,1,0],[1,1,0,0],[1,0,1,0],[1,0,0,1]],l:[[1,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],m:[[0,0,0,0,0],[0,0,0,0,0],[1,1,0,1,0],[1,0,1,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1]],n:[[0,0,0,0,0],[0,0,0,0,0],[1,0,1,1,0],[1,1,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],o:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],p:[[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0]],q:[[0,0,0,0,0],[0,0,0,0,0],[1,1,1,0,1],[1,0,0,1,1],[1,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1]],r:[[0,0,0,0,0],[0,0,0,0,0],[1,0,1,1,0],[1,1,0,0,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],s:[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],t:[[0,1,0,0,0],[0,1,0,0,0],[1,1,1,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,1],[0,0,1,1,0]],u:[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,1,1],[0,1,1,0,1]],v:[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]],w:[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,0,1,0]],x:[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],y:[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,1,1,1,0]],z:[[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],"`":[[1,0,0],[0,1,0],[0,0,1],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],"~":[[0,0,0,0,0],[0,0,0,0,0],[0,1,0,0,0],[1,0,1,0,1],[0,0,0,1,0],[0,0,0,0,0],[0,0,0,0,0]],"!":[[1],[1],[1],[1],[1],[0],[1]],"@":[[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],[0,1,1,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,1,1,0]],"#":[[0,1,0,1,0],[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0]],$:[[0,0,1,0,0],[0,1,1,1,1],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0],[0,0,1,0,0]],"%":[[1,1,0,0,1],[1,1,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,1,1],[1,0,0,1,1]],"^":[[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],"&":[[0,1,1,0,0],[1,0,0,1,0],[1,0,1,0,0],[0,1,0,0,0],[1,0,1,0,1],[1,0,0,1,0],[1,1,1,0,1]],"*":[[0,0,0,0,0],[0,0,1,0,0],[1,0,1,0,1],[0,1,1,1,0],[1,0,1,0,1],[0,0,1,0,0],[0,0,0,0,0]],"(":[[0,0,1],[0,1,0],[1,0,0],[1,0,0],[1,0,0],[0,1,0],[0,0,1]],")":[[1,0,0],[0,1,0],[0,0,1],[0,0,1],[0,0,1],[0,1,0],[1,0,0]],"-":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],_:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1]],"+":[[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]],"=":[[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]],"[":[[1,1,1],[1,0,0],[1,0,0],[1,0,0],[1,0,0],[1,0,0],[1,1,1]],"]":[[1,1,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1],[1,1,1]],"{":[[0,0,1],[0,1,0],[0,1,0],[1,0,0],[0,1,0],[0,1,0],[0,0,1]],"}":[[1,0,0],[0,1,0],[0,1,0],[0,0,1],[0,1,0],[0,1,0],[1,0,0]],"|":[[1],[1],[1],[1],[1],[1],[1]],"\\":[[1,0,0],[1,0,0],[0,1,0],[0,1,0],[0,1,0],[0,0,1],[0,0,1]],"/":[[0,0,1],[0,0,1],[0,1,0],[0,1,0],[0,1,0],[1,0,0],[1,0,0]],";":[[0,0],[0,1],[0,1],[0,0],[0,0],[0,1],[1,0]],'"':[[1,0,1],[1,0,1],[1,0,1],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],"'":[[1,1],[0,1],[1,0],[0,0],[0,0],[0,0],[0,0]],",":[[0,0],[0,0],[0,0],[0,0],[1,1],[0,1],[1,0]],".":[[0],[0],[0],[0],[0],[0],[1]],"<":[[0,0,0],[0,0,1],[0,1,0],[1,0,0],[0,1,0],[0,0,1],[0,0,0]],">":[[0,0,0],[1,0,0],[0,1,0],[0,0,1],[0,1,0],[1,0,0],[0,0,0]],"?":[[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0]]};function B0(t,n={}){const{dataOnly:e=!1,font:o=q0,x:r=0,y:i=0,fillValue:s}=n,a=typeof s!="undefined",f=t.split("").reduce((h,c)=>{const l=o[c];return T0(h,l)},[]);if(f.length===0&&f.push([]),e){if(!a)return f;let h=this.getEmptyMatrix({fillValue:s});return f.forEach((c,l)=>{c.forEach((g,b)=>{h[l+i][b+r]=g})}),h}this.setData(f,{x:r,y:i,fillValue:s})}function T0(t,n){if(t.length===0)return n;const e=[];return t.forEach((o,r)=>{e.push(o.concat([0]).concat(n[r]))}),e}var N0={name:"print",exec:B0};function R0(t,n,e){return{invert:_0,pad:F0}[t](n,e)}function _0(t){return t.map(n=>n.map(e=>e?0:1))}function F0(t,n={}){const e=Number.isInteger(n.all),o=e?n.all:n.top,r=e?n.all:n.right,i=e?n.all:n.bottom,s=e?n.all:n.left;let a=t.map(h=>{let c=h;return s&&(c=[...Array(s).fill(0),...c]),r&&(c=[...c,...Array(r).fill(0)]),c});const d=a[0].length,f=(h,c)=>{const l=[];for(let g=0;g<h;g++)l.push(Array(c).fill(0));return l};return o&&(a=[...f(o,d),...a]),i&&(a=[...a,...f(i,d)]),a}var W0={name:"dataUtils",exec:R0};const S0=Object.freeze([{top:2,left:2,width:12,height:2},{top:6,left:2,width:12,height:2},{top:10,left:2,width:12,height:2},{top:2,left:18,width:12,height:2},{top:6,left:18,width:12,height:2},{top:10,left:18,width:12,height:2},{top:2,left:34,width:12,height:2},{top:6,left:34,width:12,height:2},{top:10,left:34,width:12,height:2},{top:2,left:50,width:12,height:2},{top:6,left:50,width:12,height:2},{top:10,left:50,width:12,height:2}]);I.extend(O0);I.extend(N0);I.extend(W0);const q=document.body,G0=document.querySelector("#app"),k={width:64,height:64,interval:70,directionsMap:{ArrowLeft:"left",ArrowRight:"right"},bricks:S0},V=new I({dimensions:`${k.width}x${k.height}`,selector:G0}),u={direction:"",paddle:[],ball:[],bricks:[],ballVelocity:{dx:1,dy:1},gameMap:V.getEmptyMatrix(),intervalId:void 0,timeoutId:void 0},G=()=>{z0(),q.addEventListener("keydown",j)},j0=()=>{u.paddle=[],u.ball=[];const t=k.height-3,n=Math.floor(k.width/2)-6;for(let r=t;r>=t-1;r--)for(let i=n;i<k.width-n;i++)u.paddle.push({x:i,y:r});const e=k.height-Math.floor(Math.random()*(k.height/3+16)),o=Math.floor(Math.random()*k.width);for(let r=e;r>=e-1;r--)for(let i=o;i<=o+1;i++)u.ball.push({x:i,y:r});k.bricks.forEach((r,i)=>{const{top:s,left:a,width:d,height:f}=r,h=[];for(let c=s;c<s+f;c++)for(let l=a;l<a+d;l++)h.push({x:l,y:c});u.bricks.push({id:i,brick:h})})},z0=()=>{V.print("Bienvenue",{y:2,x:2,fillValue:2}),V.print("dans",{y:12,x:2}),V.print("CheckBreak",{y:22,x:2}),u.timeoutId=setTimeout(()=>{const t=V.print("Appuyez sur une touche pour commencer",{dataOnly:!0}),n=V.dataUtils("pad",t,{top:20});V.marquee(n,{interval:30,repeat:!0})},3e3)},H0=()=>{const t=V.print("Game Over!",{dataOnly:!0}),n=V.dataUtils("pad",t,{top:20});V.marquee(n,{interval:50,repeat:!0}),q.removeEventListener("keydown",H),clearInterval(u.intervalId),u.gameMap=V.getEmptyMatrix(),z(),G()},j=()=>{j0(),V.marquee.cleanUp(),clearTimeout(u.timeoutId),q.removeEventListener("keydown",j),q.addEventListener("keydown",H),u.intervalId=setInterval(K0,k.interval)},K0=()=>{J0(),Q0(),u.direction="",z()},J0=()=>{const t=L(u.paddle);if(u.direction==="left"){if(t.minX===0)return;u.paddle.map(n=>n.x-=2)}if(u.direction==="right"){if(t.maxX===k.width-1)return;u.paddle.map(n=>n.x+=2)}},Q0=()=>{const t=L(u.ball),n=L(u.paddle);t.minX===0&&(u.ballVelocity.dx*=-1),t.maxX===k.width-1&&(u.ballVelocity.dx*=-1),t.minY===0&&(u.ballVelocity.dy*=-1),u.ballVelocity.dx===-2&&t.minX===1&&(u.ballVelocity.dx*=-1),u.ballVelocity.dx===2&&t.maxX===k.width-2&&(u.ballVelocity.dx*=-1),t.maxY===n.minY-1&&t.minX>=n.minX-1&&t.maxX<=n.maxX+1&&(u.ballVelocity.dy*=-1,t.maxX<=n.minX+4&&(u.ballVelocity.dx=-1),t.maxX<=n.minX+2&&(u.ballVelocity.dx=-2),t.minX>=n.maxX-4&&(u.ballVelocity.dx=1),t.minX>=n.maxX-2&&(u.ballVelocity.dx=2)),u.ballVelocity.dx===1&&t.maxX===n.minX-1&&t.minY>=n.minY-1&&t.maxY<=n.maxY+1&&(u.ballVelocity.dx*=-1),u.ballVelocity.dx===-1&&t.minX===n.maxX+1&&t.minY>=n.minY-1&&t.maxY<=n.maxY+1&&(u.ballVelocity.dx*=-1);const e=[...u.bricks];for(let o of e){const r=L(o.brick);if(t.maxY===r.minY-1&&t.minX>=r.minX-1&&t.maxX<=r.maxX+1){D(o.id),u.ballVelocity.dy*=-1;break}if(t.minY===r.maxY+1&&t.minX>=r.minX-1&&t.maxX<=r.maxX+1){D(o.id),u.ballVelocity.dy*=-1;break}if(u.ballVelocity.dx>0&&t.maxX===r.minX-1&&t.minY>=r.minY-1&&t.maxY<=r.maxY+1){D(o.id),u.ballVelocity.dx*=-1;break}if(u.ballVelocity.dx<0&&t.minX===r.maxX+1&&t.minY>=r.minY-1&&t.maxY<=r.maxY+1){D(o.id),u.ballVelocity.dx*=-1;break}}if(t.maxY===k.height-1)return H0();u.ball.map(o=>{o.x+=u.ballVelocity.dx,o.y+=u.ballVelocity.dy})},z=()=>{u.gameMap=V.getEmptyMatrix(),u.paddle.forEach(t=>{u.gameMap[t.y][t.x]=1}),u.ball.forEach(t=>{u.gameMap[t.y][t.x]=1}),u.bricks.forEach(t=>t.brick.forEach(n=>{u.gameMap[n.y][n.x]=1})),V.setData(u.gameMap)},L=t=>({minX:Math.min(...t.map(n=>n.x)),maxX:Math.max(...t.map(n=>n.x)),minY:Math.min(...t.map(n=>n.y)),maxY:Math.max(...t.map(n=>n.y))}),D=t=>{const n=u.bricks.findIndex(e=>e.id===t);u.bricks=[...u.bricks.slice(0,n),...u.bricks.slice(n+1)]},H=t=>{const n=t.code,e=k.directionsMap[n];e&&(t.preventDefault(),u.direction=e)};G();
