(function(o,r,f){"use strict";const t=[],i=/\[(\#[0-9a-fA-F]{6})\s*,\s*(\#[0-9a-fA-F]{6})\]/,u=new RegExp(i,"g"),l=r.findByStoreName("UserProfileStore"),s=r.findByStoreName("UserStore"),p=findByProps("getStatusSize");function d(){t.push(f.after("getUserProfile",l,function(n,e){if(e)try{const c="[#292b2f,#292b2f]";e.banner=null,e.accentColor=parseInt("0x292b2f"),e.profileEffectID=null,e.popoutAnimationParticleType=null;const a=c.match(i);if(!a)return;a.shift(),e.themeColors=a.map(function(h){return parseInt("0x"+h.slice(1))}),e.premiumType=2,e.bio=c.replaceAll(u,"")}catch{}})),t.push(before("type",p.default,function(n){let[e]=n;e.animate=!1})),t.push(f.after("getUser",s,function(n,e){e&&(e.avatarDecoration=null,e.avatarDecorationData=e.avatarDecoration)}))}const m=function(){return t.forEach(function(n){return n()})};return o.onLoad=d,o.onUnload=m,o})({},vendetta.metro,vendetta.patcher);
