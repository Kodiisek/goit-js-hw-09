const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.body;let n=null;t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,n=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16)}`;d.style.backgroundColor=t}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.016080a2.js.map
