const t={start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]"),body:document.querySelector("body")};let o=null;function e(t){t.disabled=!0}function n(t){t.disabled=!1}t.start.addEventListener("click",(function(){o=setInterval((()=>{const o=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;t.body.style.backgroundColor=o}),1e3),e(t.start),n(t.stop)})),t.stop.addEventListener("click",(function(){clearInterval(o),e(t.stop),n(t.start)}));
//# sourceMappingURL=01-color-switcher.ada67ebc.js.map