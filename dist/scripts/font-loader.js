!function(a){var o={};function n(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return a[t].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=a,n.c=o,n.d=function(a,o,t){n.o(a,o)||Object.defineProperty(a,o,{enumerable:!0,get:t})},n.r=function(a){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},n.t=function(a,o){if(1&o&&(a=n(a)),8&o)return a;if(4&o&&"object"==typeof a&&a&&a.__esModule)return a;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:a}),2&o&&"string"!=typeof a)for(var e in a)n.d(t,e,function(o){return a[o]}.bind(null,e));return t},n.n=function(a){var o=a&&a.__esModule?function(){return a.default}:function(){return a};return n.d(o,"a",o),o},n.o=function(a,o){return Object.prototype.hasOwnProperty.call(a,o)},n.p="",n(n.s=204)}({204:function(a,o){if(sessionStorage.getItem("customFontLoaded"))document.documentElement.classList.add("fonts-loaded");else if("fonts"in document){const a=new FontFace("Tabac-Sans","url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Regular-9531409e5f6d548c2ccc3429d9d5db69.woff2') format('woff2'),\n             url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Regular-9531409e5f6d548c2ccc3429d9d5db69.woff') format('woff')",{weight:"normal",style:"normal",display:"swap"}),o=new FontFace("Tabac-Sans","url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Italic-939c7bc3092f331c10e75335f85f45a5.woff2') format('woff2'),\n             url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Italic-939c7bc3092f331c10e75335f85f45a5.woff') format('woff')",{weight:"normal",style:"italic",display:"swap"}),n=new FontFace("Tabac-Sans","url('../fonts/Tabac-Sans/fonts/Tabac-Sans-SemiBold-c1c5cd189c25eb46746c1d6648f58103.woff2') format('woff2'),\n             url('../fonts/Tabac-Sans/fonts/Tabac-Sans-SemiBold-c1c5cd189c25eb46746c1d6648f58103.woff') format('woff')",{weight:"600",style:"normal",display:"swap"}),t=new FontFace("Tabac-Sans","url('../fonts/Tabac-Sans/fonts/Tabac-Sans-SemiBold-Italic-995d174f745ccf34d9668fc3949054e0.woff2') format('woff2'),\n             url('../fonts/Tabac-Sans/fonts/Tabac-Sans-SemiBold-Italic-995d174f745ccf34d9668fc3949054e0.woff') format('woff')",{weight:"600",style:"italic",display:"swap"}),e=new FontFace("Tabac-Sans","url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Bold-0434c8d811e4abf9f73aab8061622b1a.woff2') format('woff2'),\n             url('../fonts/Tabac-Sans/fonts/Tabac-Sans-Bold-0434c8d811e4abf9f73aab8061622b1a.woff') format('woff')",{weight:"700",style:"normal",display:"swap"});Promise.all([a.load(),o.load(),n.load(),t.load(),e.load()]).then(a=>{a.forEach(a=>{document.fonts.add(a)}),document.documentElement.classList.add("fonts-loaded"),sessionStorage.setItem("customFontLoaded","true")})}}});
//# sourceMappingURL=font-loader.js.map