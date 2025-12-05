import{a as k,b as x,c as _,d as y}from"./chunk-LXFFS6F3.js";import"./chunk-JAWSXXNZ.js";import"./chunk-4UUTDEUB.js";import"./chunk-65PWGCZ2.js";import"./chunk-CU4O7CPC.js";import"./chunk-FCSSBIWH.js";import"./chunk-5RDTUFFA.js";import"./chunk-VHGWASOJ.js";import"./chunk-FPCIQCQR.js";import"./chunk-VHQ5YDZB.js";import"./chunk-DYUC7V3Q.js";import"./chunk-TIYZTGBM.js";import{Aa as d,La as c,Vb as M,Wb as C,cb as l,eb as f,jb as o,kb as u,lb as w,mb as i,ub as a,xa as s}from"./chunk-Q6FETACP.js";var T=`

# Markdown example

An Angular component is defined by a TypeScript **Class** and the \`Component\` **Decorator**.

\`\`\`ts
// app.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
\`\`\`

A component's template is written in HTML.

\`\`\`html
<!-- app.html -->
<p>Hello world!</p>
\`\`\`

`;function v(e,n){if(e&1&&i(0,"z-markdown",2),e&2){let t=a();o("content",t.content)}}function D(e,n){if(e&1&&(i(0,"div",3),M(1,"zMarkdown")),e&2){let t=a();o("innerHTML",C(1,1,t.content),s)}}var r=class e{demoState={use:y(["Component","Pipe"])};content=T;static \u0275fac=function(t){return new(t||e)};static \u0275cmp=c({type:e,selectors:[["app-markdown"]],decls:4,vars:2,consts:[[3,"state"],[2,"border-radius","0.5rem","border","2px dashed var(--mat-sys-outline-variant)","padding","1rem 1.5rem"],[3,"content"],[1,"z-sys-pretty",3,"innerHTML"]],template:function(t,p){if(t&1&&(u(0,"z-demo-container",0)(1,"div",1),l(2,v,1,1,"z-markdown",2)(3,D,2,3,"div",3),w()()),t&2){let m;o("state",p.demoState),d(2),f((m=p.demoState.use())==="Component"?2:m==="Pipe"?3:-1)}},dependencies:[_,x,k],encapsulation:2})};export{r as default};
