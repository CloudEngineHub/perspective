(()=>{var e=Object.defineProperty,t=(t,r,n)=>(((t,r,n)=>{r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n})(t,"symbol"!=typeof r?r+"":r,n),n),r=class{constructor(e){t(this,"clients"),t(this,"id_gen"),t(this,"server"),t(this,"module"),this.clients=new Map,this.id_gen=0,this.module=e,this.server=e._psp_new_server()}make_session(e){let t=this.module._psp_new_session(this.server);return this.clients.set(t,e),new n(this.module,this.server,t,this.clients)}delete(){this.module._psp_delete_server(this.server)}},n=class{constructor(e,t,r,n){this.mod=e,this.server=t,this.client_id=r,this.client_map=n}async handle_request(e){let t=await async function(e,t,r){let n=e._psp_alloc(t.byteLength);e.HEAPU8.set(t,n);let a=await r(n);return e._psp_free(n),a}(this.mod,e,(async t=>this.mod._psp_handle_request(this.server,this.client_id,t,e.byteLength)));await a(this.mod,t,(async e=>{await this.client_map.get(e.client_id)(e.data)}))}poll(){let e=this.mod._psp_poll(this.server);a(this.mod,e,(async e=>{await this.client_map.get(e.client_id)(e.data)}))}close(){this.mod._psp_close_session(this.server,this.client_id)}};async function a(e,t,r){let n=function(e,t){let r=e.HEAPU32[t>>>2],n=e.HEAPU32[1+(t>>>2)];return new Uint32Array(e.HEAPU8.buffer,n,3*r)}(e,t);try{for(let t=0;t<n.length/3;t++){let a=n[3*t],s=n[3*t+1],i=n[3*t+2],o=new Uint8Array(e.HEAPU8.buffer,a,s);await r({client_id:i,data:o})}}finally{for(let t=0;t<n.length/3;t++){let r=n[3*t];e._psp_free(r)}e._psp_free(n.byteOffset),e._psp_free(t)}}var s,i,o,c={},l=(s=c.url,function(e){void 0===e&&(e={});var t,r,n=Object.assign({},e),a=new Promise(((e,n)=>{t=e,r=n}));globalThis.window={};var i=Object.assign({},n),o="";typeof document<"u"&&document.currentScript&&(o=document.currentScript.src),s&&(o=s),o=o.startsWith("blob:")?"":o.substr(0,o.replace(/[?#].*/,"").lastIndexOf("/")+1);var l=console.log.bind(console),_=console.error.bind(console);Object.assign(n,i),i=null;var p,u,f,d,h,m,g,y=!1;function v(){var e=p.buffer;n.HEAP8=u=new Int8Array(e),n.HEAP16=new Int16Array(e),n.HEAPU8=f=new Uint8Array(e),n.HEAPU16=new Uint16Array(e),n.HEAP32=d=new Int32Array(e),n.HEAPU32=h=new Uint32Array(e),n.HEAPF32=new Float32Array(e),n.HEAPF64=g=new Float64Array(e),n.HEAP64=m=new BigInt64Array(e),n.HEAPU64=new BigUint64Array(e)}var w=[],b=[],A=[],E=[],M=!1,H=0,P=null,U=null;function k(e){throw _(e="Aborted("+e+")"),y=!0,e+=". Build with -sASSERTIONS for more info.",M&&ne(),e=new WebAssembly.RuntimeError(e),r(e),e}var D,I=e=>e.startsWith("data:application/octet-stream;base64,");if(n.locateFile){if(!I(D="perspective-server.wasm")){var x=D;D=n.locateFile?n.locateFile(x,o):o+x}}else D=new URL("perspective-server.wasm",c.url).href;function S(){throw"both async and sync fetching of the wasm failed"}function W(e,t,r){return function(e){return"function"==typeof fetch?fetch(e,{credentials:"same-origin"}).then((t=>{if(!t.ok)throw`failed to load wasm binary file at '${e}'`;return t.arrayBuffer()})).catch((()=>S())):Promise.resolve().then((()=>S()))}(e).then((e=>WebAssembly.instantiate(e,t))).then(r,(e=>{_(`failed to asynchronously prepare wasm: ${e}`),k(e)}))}var F={884784:()=>typeof wasmOffsetConverter<"u"};function O(e){this.name="ExitStatus",this.message=`Program terminated with exit(${e})`,this.status=e}var C,j=e=>{for(;0<e.length;)e.shift()(n)},z=new TextDecoder("utf8"),L=e=>{if(!(e>>>=0))return"";for(var t=e+NaN,r=e;!(r>=t)&&f[r>>>0];)++r;return z.decode(f.subarray(e>>>0,r>>>0))},N=e=>{e=e.getArg(Q.__cpp_exception,0);var t=oe(e);e=ie();var r=se(4),n=se(4);if(ce(t,r,n),t=h[r>>>2>>>0],n=h[n>>>2>>>0],r=L(t),ee(t),n){var a=L(n);ee(n)}return ae(e),[r,a]};n.getExceptionMessage=N,C=()=>performance.now();var T,$=[],Y={},R=()=>{if(!T){var e,t={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(e in Y)void 0===Y[e]?delete t[e]:t[e]=Y[e];var r=[];for(e in t)r.push(`${e}=${t[e]}`);T=r}return T},q=[null,[],[]],B=e=>{throw y=!0,new O(e)},J=e=>e%4==0&&(e%100!=0||e%400==0),G=(e,t)=>{for(var r=0,n=0;n<=t;r+=e[n++]);return r},Z=[31,29,31,30,31,30,31,31,30,31,30,31],K=[31,28,31,30,31,30,31,31,30,31,30,31],V=(e,t)=>{for(e=new Date(e.getTime());0<t;){var r=e.getMonth(),n=(J(e.getFullYear())?Z:K)[r];if(!(t>n-e.getDate())){e.setDate(e.getDate()+t);break}t-=n-e.getDate()+1,e.setDate(1),11>r?e.setMonth(r+1):(e.setMonth(0),e.setFullYear(e.getFullYear()+1))}return e},X={HaveOffsetConverter:function(){return typeof wasmOffsetConverter<"u"},__syscall_ftruncate64:function(){},__syscall_getdents64:function(){},__throw_exception_with_stack_trace:e=>{throw(e=new WebAssembly.Exception(Q.__cpp_exception,[e],{traceStack:!0})).message=N(e),e},clock_time_get:function(e,t,r){return r>>>=0,0!=e&&1!=e&&2!=e&&3!=e?28:(n=0===e?Date.now():C(),e=Math.round(1e6*n),d[r>>>2>>>0]=e>>>0,d[r+4>>>2>>>0]=e/Math.pow(2,32)>>>0,0);var n},emscripten_asm_const_int:function(e,t,r){e>>>=0,t>>>=0,r>>>=0,$.length=0;for(var n;n=f[t++>>>0];){var a=105!=n;r+=(a&=112!=n)&&r%8?4:0,$.push(112==n?h[r>>>2>>>0]:106==n?m[r>>>3]:105==n?d[r>>>2>>>0]:g[r>>>3>>>0]),r+=a?8:4}return F[e](...$)},emscripten_notify_memory_growth:function(){v()},environ_get:function(e,t){e>>>=0,t>>>=0;var r=0;return R().forEach(((n,a)=>{var s=t+r;for(a=h[e+4*a>>>2>>>0]=s,s=0;s<n.length;++s)u[a++>>>0]=n.charCodeAt(s);u[a>>>0]=0,r+=n.length+1})),0},environ_sizes_get:function(e,t){e>>>=0,t>>>=0;var r=R();h[e>>>2>>>0]=r.length;var n=0;return r.forEach((e=>n+=e.length+1)),h[t>>>2>>>0]=n,0},fd_close:()=>52,fd_read:function(){return 52},fd_seek:function(){return 70},fd_write:function(e,t,r,n){t>>>=0,r>>>=0,n>>>=0;for(var a=0,s=0;s<r;s++){var i=h[t>>>2>>>0],o=h[t+4>>>2>>>0];t+=8;for(var c=0;c<o;c++){var p=f[i+c>>>0],u=q[e];if(0===p||10===p){p=0;for(var d=(p>>>=0)+NaN,m=p;u[m]&&!(m>=d);)++m;p=z.decode(u.buffer?u.subarray(p,m):new Uint8Array(u.slice(p,m))),(1===e?l:_)(p),u.length=0}else u.push(p)}a+=o}return h[n>>>2>>>0]=a,0},proc_exit:B,psp_heap_size:function(){k("missing function: psp_heap_size")},strptime:function(e,t,r){e>>>=0,r>>>=0,t=L(t>>>0);for(var n=0;25>n;++n)t=t.replace(new RegExp("\\"+"\\!@#$^&*()+=-[]/{}|:<>?,."[n],"g"),"\\"+"\\!@#$^&*()+=-[]/{}|:<>?,."[n]);var a={A:"%a",B:"%b",c:"%a %b %d %H:%M:%S %Y",D:"%m\\/%d\\/%y",e:"%d",F:"%Y-%m-%d",h:"%b",R:"%H\\:%M",r:"%I\\:%M\\:%S\\s%p",T:"%H\\:%M\\:%S",x:"%m\\/%d\\/(?:%y|%Y)",X:"%H\\:%M\\:%S"},s={a:"(?:Sun(?:day)?)|(?:Mon(?:day)?)|(?:Tue(?:sday)?)|(?:Wed(?:nesday)?)|(?:Thu(?:rsday)?)|(?:Fri(?:day)?)|(?:Sat(?:urday)?)",b:"(?:Jan(?:uary)?)|(?:Feb(?:ruary)?)|(?:Mar(?:ch)?)|(?:Apr(?:il)?)|May|(?:Jun(?:e)?)|(?:Jul(?:y)?)|(?:Aug(?:ust)?)|(?:Sep(?:tember)?)|(?:Oct(?:ober)?)|(?:Nov(?:ember)?)|(?:Dec(?:ember)?)",C:"\\d\\d",d:"0[1-9]|[1-9](?!\\d)|1\\d|2\\d|30|31",H:"\\d(?!\\d)|[0,1]\\d|20|21|22|23",I:"\\d(?!\\d)|0\\d|10|11|12",j:"00[1-9]|0?[1-9](?!\\d)|0?[1-9]\\d(?!\\d)|[1,2]\\d\\d|3[0-6]\\d",m:"0[1-9]|[1-9](?!\\d)|10|11|12",M:"0\\d|\\d(?!\\d)|[1-5]\\d",n:" ",p:"AM|am|PM|pm|A\\.M\\.|a\\.m\\.|P\\.M\\.|p\\.m\\.",S:"0\\d|\\d(?!\\d)|[1-5]\\d|60",U:"0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",W:"0\\d|\\d(?!\\d)|[1-4]\\d|50|51|52|53",w:"[0-6]",y:"\\d\\d",Y:"\\d\\d\\d\\d",t:" ",z:"Z|(?:[\\+\\-]\\d\\d:?(?:\\d\\d)?)"},i={P:0,O:1,$:2,K:3,aa:4,Z:5,V:6,L:7,da:8,ca:9,ba:10,N:11},o={u:0,o:1,G:2,J:3,v:4,l:5,s:6},c={o:0,G:1,J:2,v:3,l:4,s:5,u:6},l=[];t=t.replace(/%(.)/g,((e,t)=>a[t]||e)).replace(/%(.)/g,((e,t)=>(e=s[t])?(l.push(t),`(${e})`):t)).replace(/\s+/g,"\\s*");var _=new RegExp("^"+t,"i").exec(L(e));if(_){var p;if(t=function(){function e(e,t,r){return"number"!=typeof e||isNaN(e)?t:e>=t?e<=r?e:r:t}return{year:e(d[r+20>>>2>>>0]+1900,1970,9999),month:e(d[r+16>>>2>>>0],0,11),day:e(d[r+12>>>2>>>0],1,31),hour:e(d[r+8>>>2>>>0],0,23),min:e(d[r+4>>>2>>>0],0,59),i:e(d[r>>>2>>>0],0,59),g:0}}(),(p=(n=e=>{if(0<=(e=l.indexOf(e)))return _[e+1]})("S"))&&(t.i=parseInt(p)),(p=n("M"))&&(t.min=parseInt(p)),p=n("H"))t.hour=parseInt(p);else if(p=n("I")){var u=parseInt(p);(p=n("p"))&&(u+="P"===p.toUpperCase()[0]?12:0),t.hour=u}if((p=n("Y"))?t.year=parseInt(p):(p=n("y"))&&(u=parseInt(p),u=(p=n("C"))?u+100*parseInt(p):u+(69>u?2e3:1900),t.year=u),(p=n("m"))?t.month=parseInt(p)-1:(p=n("b"))&&(t.month=i[p.substring(0,3).toUpperCase()]||0),p=n("d"))t.day=parseInt(p);else if(p=n("j"))for(o=parseInt(p),c=J(t.year),i=0;12>i;++i)o<=(p=G(c?Z:K,i-1))+(c?Z:K)[i]&&(t.day=o-p);else(p=n("a"))&&(i=p.substring(0,3).toUpperCase(),(p=n("U"))?(o=o[i],c=parseInt(p),o=0===(i=new Date(t.year,0,1)).getDay()?V(i,o+7*(c-1)):V(i,7-i.getDay()+o+7*(c-1)),t.day=o.getDate(),t.month=o.getMonth()):(p=n("W"))&&(o=c[i],c=parseInt(p),o=1===(i=new Date(t.year,0,1)).getDay()?V(i,o+7*(c-1)):V(i,7-i.getDay()+1+o+7*(c-1)),t.day=o.getDate(),t.month=o.getMonth()));return(p=n("z"))&&("z"===p.toLowerCase()?t.g=0:(n=p.match(/^((?:\-|\+)\d\d):?(\d\d)?/),t.g=3600*n[1],n[2]&&(t.g+=0<t.g?60*n[2]:60*-n[2]))),n=new Date(t.year,t.month,t.day,t.hour,t.min,t.i,0),d[r>>>2>>>0]=n.getSeconds(),d[r+4>>>2>>>0]=n.getMinutes(),d[r+8>>>2>>>0]=n.getHours(),d[r+12>>>2>>>0]=n.getDate(),d[r+16>>>2>>>0]=n.getMonth(),d[r+20>>>2>>>0]=n.getFullYear()-1900,d[r+24>>>2>>>0]=n.getDay(),d[r+28>>>2>>>0]=G(J(n.getFullYear())?Z:K,n.getMonth()-1)+n.getDate()-1,d[r+32>>>2>>>0]=0,d[r+36>>>2>>>0]=t.g,e+function(e){for(var t=0,r=0;r<e.length;++r){var n=e.charCodeAt(r);127>=n?t++:2047>=n?t+=2:55296<=n&&57343>=n?(t+=4,++r):t+=3}if(r=0,0<(n=(t=Array(t+1)).length)){n=r+n-1;for(var a=0;a<e.length;++a){var s=e.charCodeAt(a);if(55296<=s&&57343>=s&&(s=65536+((1023&s)<<10)|1023&e.charCodeAt(++a)),127>=s){if(r>=n)break;t[r++>>>0]=s}else{if(2047>=s){if(r+1>=n)break;t[r++>>>0]=192|s>>6}else{if(65535>=s){if(r+2>=n)break;t[r++>>>0]=224|s>>12}else{if(r+3>=n)break;t[r++>>>0]=240|s>>18,t[r++>>>0]=128|s>>12&63}t[r++>>>0]=128|s>>6&63}t[r++>>>0]=128|63&s}}t[r>>>0]=0}return t}(_[0]).length-1}return 0}},Q=function(){function e(e){return Q=e.exports,Q=function(){var e=Q;return(e=Object.assign({},e))._emscripten_stack_alloc=(e=>t=>e(t)>>>0)(e._emscripten_stack_alloc),e.emscripten_stack_get_current=(e=>()=>e()>>>0)(e.emscripten_stack_get_current),e}(),p=Q.memory,v(),0==--H&&(null!==P&&(clearInterval(P),P=null),U&&(e=U,U=null,e())),Q}var t={env:X,wasi_snapshot_preview1:X};if(H++,n.instantiateWasm)try{return n.instantiateWasm(t,e)}catch(a){_(`Module.instantiateWasm callback failed with error: ${a}`),r(a)}return function(e,t){var r=D;return"function"!=typeof WebAssembly.instantiateStreaming||I(r)||"function"!=typeof fetch?W(r,e,t):fetch(r,{credentials:"same-origin"}).then((n=>WebAssembly.instantiateStreaming(n,e).then(t,(function(n){return _(`wasm streaming compile failed: ${n}`),_("falling back to ArrayBuffer instantiation"),W(r,e,t)}))))}(t,(function(t){e(t.instance)})).catch(r),{}}();n._psp_new_server=()=>(n._psp_new_server=Q.psp_new_server)(),n._psp_handle_request=(e,t,r,a)=>(n._psp_handle_request=Q.psp_handle_request)(e,t,r,a),n._psp_poll=e=>(n._psp_poll=Q.psp_poll)(e),n._psp_new_session=e=>(n._psp_new_session=Q.psp_new_session)(e),n._psp_close_session=(e,t)=>(n._psp_close_session=Q.psp_close_session)(e,t),n._psp_alloc=e=>(n._psp_alloc=Q.psp_alloc)(e),n._psp_free=e=>(n._psp_free=Q.psp_free)(e);var ee=e=>(ee=Q.free)(e);n._psp_delete_server=e=>(n._psp_delete_server=Q.psp_delete_server)(e);var te,re=n.__initialize=()=>(re=n.__initialize=Q._initialize)(),ne=()=>(ne=Q.__trap)(),ae=e=>(ae=Q._emscripten_stack_restore)(e),se=e=>(se=Q._emscripten_stack_alloc)(e),ie=()=>(ie=Q.emscripten_stack_get_current)(),oe=e=>(oe=Q.__thrown_object_from_unwind_exception)(e),ce=(e,t,r)=>(ce=Q.__get_exception_message)(e,t,r);function le(){if(!(0<H||(j(w),0<H||te||(te=!0,n.calledRun=!0,y)))){if(M=!0,j(b),j(A),t(n),_e){var e=re;try{e(),B(0)}catch(r){if(!(r instanceof O||"unwind"==r))throw r}}j(E)}}n.___start_em_js=884841,n.___stop_em_js=884902,U=function e(){te||le(),te||(U=e)};var _e=!0;return le(),a});if(typeof WebAssembly>"u")throw new Error("WebAssembly not supported.");async function _(e){let t=(await async function(e){return e instanceof Function&&(e=await e()),e instanceof Response?await WebAssembly.instantiateStreaming(e):await WebAssembly.instantiate(e)}(e)).instance.exports,r=t.size(),n=t.offset();return new Uint8Array(t.memory.buffer).slice(n,n+r)}self.addEventListener("message",(async e=>{if("init"===e.data.cmd){let t=e.data.id,n=await async function(e){let t=await l({locateFile:e=>e,instantiateWasm:async(r,n)=>{let a=await _(e);r.env={...r.env,psp_stack_trace(){let e=Error().stack||"",r=(new TextEncoder).encode(e),n=t._psp_js_alloc(r.byteLength+1);return t.HEAPU8.set(r,n),t.HEAPU8[n+r.byteLength]=0,n},psp_heap_size:()=>t.HEAP8.buffer.byteLength};let s=await WebAssembly.instantiate(a,r);return n(s.instance),s.instance.exports}});return t}(e.data.args[0]);i=new r(n),o=i.make_session((async e=>{let t=e.slice().buffer;self.postMessage(t,{transfer:[t]})})),self.postMessage({id:t})}else o.handle_request(new Uint8Array(e.data)),setTimeout((()=>o.poll()))}))})();