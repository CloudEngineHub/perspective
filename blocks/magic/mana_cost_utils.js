const t={},n={};function o(o,r){if(r in n)return n[r];function e(t,n){return t.find((t=>t.symbol===n))?.svg_uri||n}let l=r;for(let n=0;n<l.length;n++)if("{"===l[n]){let r=1,u="{";for(;"}"!==l[n+r]&&n+r<l.length;)u+=l[n+r],r+=1;const g=t[u]||e(o,u+"}");t[u]=g;const p=`<img part="manacoin" src="${g}"></img>`;s=l,a=n,c=n+u.length+1,i=p,l=s.substring(0,a)+i+s.substring(c),n+=p.length-u.length}var s,a,c,i;return n[r]=l,l}function r(t){let n=t.split(","),o="";for(const r of n)"B"===r?o+='<span part="mcolor" style="background-color:#333">B</span>':"U"===r?o+='<span part="mcolor" style="background-color:#1f78b4">U</span>':"G"===r?o+='<span part="mcolor" style="background-color:#33a02c">G</span>':"W"===r?o+='<span part="mcolor" style="background-color:white;color:#999">W</span>':"R"===r&&(o+='<span part="mcolor" style="background-color:#e31a1c">R</span>');return o.length>0?o:"-"}export function manaStyleListener(t,n){for(const e of this.querySelectorAll("td")){const l=this.getMeta(e);let s=n.hasAttribute("settings")?2:1;const a=l.column_header[l.column_header.length-s];"manaCost"===a||"text"===a?e.innerHTML=o(t,l.value):a.includes("color")&&(e.innerHTML=r(l.value)),e.classList.toggle("alt",l.y%2)}}