require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({27:[function(require,module,exports) {
module.exports="e30402be781669b6951b8866c7fdcddc.png";
},{}],13:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=new function(){return this.map={},this.load=function(e,t){this.map=e,this.image=new Image,this.image.onload=t,this.image.src=require("../images/sprites.png")},this.draw=function(e,t,i,s,a){var r=this.map[t];a||(a=0),e.drawImage(this.image,r.sx+a*r.w,r.sy,r.w,r.h,Math.floor(i),Math.floor(s),r.w,r.h)},this};exports.default=e;
},{"../images/sprites.png":27}],16:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./SpriteSheet"),e=r(t);function r(t){return t&&t.__esModule?t:{default:t}}var i=function(){};i.prototype.setup=function(t,r){this.sprite=t,this.merge(r),this.frame=this.frame||0,this.w=e.default.map[t].w,this.h=e.default.map[t].h},i.prototype.merge=function(t){if(t)for(var e in t)this[e]=t[e]},i.prototype.draw=function(t){e.default.draw(t,this.sprite,this.x,this.y,this.frame)},i.prototype.hit=function(t){this.board.remove(this)},exports.default=i;
},{"./SpriteSheet":13}],14:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){var t=this;this.objects=[],this.cnt={},this.add=function(t){return t.board=this,this.objects.push(t),this.cnt[t.type]=(this.cnt[t.type]||0)+1,t},this.remove=function(t){return-1==this.removed.indexOf(t)&&(this.removed.push(t),!0)},this.resetRemoved=function(){this.removed=[]},this.finalizeRemoved=function(){for(var t=0,e=this.removed.length;t<e;t++){var i=this.objects.indexOf(this.removed[t]);-1!=i&&(this.cnt[this.removed[t].type]--,this.objects.splice(i,1))}},this.iterate=function(t){for(var e=Array.prototype.slice.call(arguments,1),i=0,s=this.objects.length;i<s;i++){var r=this.objects[i];r[t].apply(r,e)}},this.detect=function(t){for(var e=0,i=this.objects.length;e<i;e++)if(t.call(this.objects[e]))return this.objects[e];return!1},this.step=function(t){this.resetRemoved(),this.iterate("step",t),this.finalizeRemoved()},this.draw=function(t){this.iterate("draw",t)},this.overlap=function(t,e){return!(t.y+t.h-1<e.y||t.y>e.y+e.h-1||t.x+t.w-1<e.x||t.x>e.x+e.w-1)},this.collide=function(e,i){return this.detect(function(){if(e!=this)return!!((!i||this.type&i)&&t.overlap(e,this))&&this})}};exports.default=t;
},{}],23:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={OBJECT_PLAYER:1,OBJECT_PLAYER_PROJECTILE:2,OBJECT_ENEMY:4,OBJECT_ENEMY_PROJECTILE:8,OBJECT_POWERUP:16};
},{}],26:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../consts"),e=r(t),i=require("./Sprite"),s=r(i);function r(t){return t&&t.__esModule?t:{default:t}}var o=function(t,e){this.setup("missile",{vy:-700,damage:10}),this.x=t-this.w/2,this.y=e-this.h};o.prototype=new s.default,o.prototype.type=e.default.OBJECT_PLAYER_PROJECTILE,o.prototype.step=function(t){this.y+=this.vy*t;var i=this.board.collide(this,e.default.OBJECT_ENEMY);i?(i.hit(this.damage),this.board.remove(this)):this.y<-this.h&&this.board.remove(this)},exports.default=o;
},{"../consts":23,"./Sprite":16}],28:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Game"),t=a(e),i=require("./Sprite"),r=a(i),s=require("../consts"),o=a(s);function a(e){return e&&e.__esModule?e:{default:e}}var h=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"enemy_missile";this.setup(i,{frame:0,vy:200,damage:10}),this.x=e-this.w/2,this.y=t-this.h/2};h.prototype=new r.default,h.prototype.type=o.default.OBJECT_ENEMY_PROJECTILE,h.prototype.step=function(e){this.y+=this.vy*e;var i=this.board.collide(this,o.default.OBJECT_PLAYER);i?(i.hit(this.damage),this.board.remove(this)):this.y>t.default.height&&this.board.remove(this)},exports.default=h;
},{"./Game":21,"./Sprite":16,"../consts":23}],29:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Sprite"),t=r(e);function r(e){return e&&e.__esModule?e:{default:e}}var s=function(e,t){this.setup("explosion",{frame:0}),this.x=e-this.w/2,this.y=t-this.h/2};s.prototype=new t.default,s.prototype.step=function(e){this.frame++,this.frame>=12&&this.board.remove(this)},exports.default=s;
},{"./Sprite":16}],25:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Game"),s=u(t),i=require("./Sprite"),e=u(i),h=require("./EnemyMissile"),a=u(h),r=require("./Explosion"),d=u(r),o=require("../consts"),l=u(o);function u(t){return t&&t.__esModule?t:{default:t}}var n=function(t,s){this.merge(this.baseParameters),this.setup(t.sprite,t),this.merge(s)};n.prototype=new e.default,n.prototype.type=l.default.OBJECT_ENEMY,n.prototype.baseParameters={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,t:0,boss:!1,reloadTime:.75,reload:0},n.prototype.step=function(t){this.t+=t,this.vx=this.A+this.B*Math.sin(this.C*this.t+this.D),this.vy=this.E+this.F*Math.sin(this.G*this.t+this.H),this.x+=this.vx*t,this.y+=this.vy*t;var i=this.board.collide(this,l.default.OBJECT_PLAYER);i&&(i.hit(this.damage),this.board.remove(this));var e="enemy_missile";(this.boss||this.package)&&(e="enemy_package"),this.boss?(this.board.add(new a.default(this.x+this.w+20,this.y+this.h,e)),this.board.add(new a.default(this.x-20,this.y+this.h,e))):Math.random()<.01&&this.reload<=0&&(this.reload=this.reloadTime,2===this.missiles?(this.board.add(new a.default(this.x+this.w-2,this.y+this.h,e)),this.board.add(new a.default(this.x+2,this.y+this.h,e))):this.board.add(new a.default(this.x+this.w/2,this.y+this.h,e))),this.reload-=t,(this.y>s.default.height||this.x<-this.w||this.x>s.default.width)&&this.board.remove(this)},n.prototype.hit=function(t){this.health-=t,this.health<=0&&this.board.remove(this)&&(s.default.points+=this.points||100,this.board.add(new d.default(this.x+this.w/2,this.y+this.h/2)))},exports.default=n;
},{"./Game":21,"./Sprite":16,"./EnemyMissile":28,"./Explosion":29,"../consts":23}],24:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={boss:{x:0,y:-50,sprite:"enemy_boss",health:200,A:0,B:-100,C:2,E:20,F:100,G:2,H:Math.PI/2,missiles:2,boss:!0},sap:{x:0,y:-50,sprite:"enemy_sap",health:10,E:100},mackeyStraight:{x:0,y:-50,sprite:"enemy_mackey",health:10,E:100},mharStraight:{x:0,y:-50,sprite:"enemy_mhar",health:10,E:100},peteStraight:{x:0,y:-50,sprite:"enemy_pete",health:10,E:100},richMed:{x:-50,y:0,sprite:"enemy_rich",health:20,A:70,E:0,package:!0},richFast:{x:-50,y:0,sprite:"enemy_rich",health:20,A:90,E:0,package:!0},rich:{x:-50,package:!0,y:50,sprite:"enemy_rich",health:20,A:40,E:0},ltr:{x:0,y:-50,sprite:"enemy_dan",health:10,B:75,C:1,E:90},circle:{x:210,y:-50,sprite:"enemy_gomez",health:10,A:0,B:-100,C:1,E:25,F:100,G:1,H:Math.PI/2},wiggle:{x:100,y:-50,sprite:"enemy_mcmaster",health:10,B:50,C:4,E:100,missiles:1},step:{x:0,y:-50,sprite:"enemy_gomez",health:10,B:150,C:1.2,E:55,missiles:2}};
},{}],19:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Enemy"),t=l(e),a=require("../consts"),r=l(a),i=require("../enemies"),s=l(i);function l(e){return e&&e.__esModule?e:{default:e}}var h=[[0,2e3,500,"peteStraight",{x:190}],[4006,6e3,500,"mackeyStraight",{x:20}],[8e3,1e4,500,"mharStraight",{x:180}],[13500,17e3,400,"step"],[21e3,23500,500,"ltr"],[24800,25800,300,"sap",{x:50}],[25e3,26e3,300,"sap",{x:90}],[25e3,26e3,300,"sap",{x:10}],[29800,30800,300,"sap",{x:160}],[3e4,31e3,300,"sap",{x:200}],[3e4,31e3,300,"sap",{x:120}],[34e3,36500,400,"wiggle",{x:120}],[34e3,36500,400,"wiggle",{x:70}],[42e3,5e4,400,"circle"],[6e4,60100,400,"rich",{x:-50,y:120}],[6e4,60100,400,"richMed",{x:-50,y:20}],[6e4,60100,400,"richFast",{x:-50,y:70}],[66e3,66100,400,"mackeyStraight",{x:190}],[66e3,66100,400,"rich"],[68e3,68100,400,"mharStraight"],[75e3,75100,100,"boss",{x:90}]];function c(e){var t=h;this.levelData=[];for(var a=0;a<t.length;a++)this.levelData.push(Object.create(t[a]));this.t=0,this.callback=e}c.prototype.step=function(e){var a=0,i=[],l=null;for(this.t+=1e3*e;(l=this.levelData[a])&&l[0]<this.t+2e3;){if(this.t>l[1])i.push(l);else if(l[0]<this.t){var h=s.default[l[3]],c=l[4];this.board.add(new t.default(h,c)),l[0]+=l[2]}a++}for(var n=0,o=i.length;n<o;n++){var u=this.levelData.indexOf(i[n]);-1!=u&&this.levelData.splice(u,1)}0===this.levelData.length&&0===this.board.cnt[r.default.OBJECT_ENEMY]&&this.callback&&this.callback()},c.prototype.draw=function(e){},exports.default=c;
},{"./Enemy":25,"../consts":23,"../enemies":24}],17:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Game"),t=r(e);function r(e){return e&&e.__esModule?e:{default:e}}var l=function(){t.default.points=0;this.draw=function(e){e.save(),e.font="bold 18px arial",e.fillStyle="#FFFFFF";for(var r=""+t.default.points,l=6-r.length,o="";l-- >0;)o+="0";e.fillText(o+r,35,20),e.restore()},this.step=function(e){}};exports.default=l;
},{"./Game":21}],22:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Game"),t=l(e);function l(e){return e&&e.__esModule?e:{default:e}}function i(e,l){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:15,f=arguments[3],r=!1;this.step=function(e){t.default.keys.fire||(r=!0),r&&t.default.keys.fire&&f&&f()};this.draw=function(f){f.fillStyle="#FFFFFF",f.textAlign="center",f.font="bold "+i+"px Arial",function(e,t,l,i,f,r){for(var u=t.split(" "),d="",a=0;a<u.length;a++){var n=d+u[a]+" ";e.measureText(n).width>f&&a>0?(e.fillText(d,l,i),d=u[a]+" ",i+=r):d=n}e.fillText(d,l,i)}(f,e,t.default.width/2,t.default.height/2-50,t.default.width-40,25),f.font="bold 12px Arial",f.fillText(l,t.default.width/2,t.default.height/2+30)}}exports.default=i;
},{"./Game":21}],18:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Game"),e=a(t);function a(t){return t&&t.__esModule?t:{default:t}}var h=function(t,a,h,i){var r=document.createElement("canvas");r.width=e.default.width,r.height=e.default.height;var l=r.getContext("2d"),d=0;i&&(l.fillStyle="#000",l.fillRect(0,0,r.width,r.height)),l.fillStyle="#FFF",l.globalAlpha=a;for(var o=0;o<h;o++)l.fillRect(Math.floor(Math.random()*r.width),Math.floor(Math.random()*r.height),2,2);this.draw=function(t){var e=Math.floor(d),a=r.height-e;e>0&&t.drawImage(r,0,a,r.width,e,0,0,r.width,e),a>0&&t.drawImage(r,0,0,r.width,a,0,e,r.width,a)},this.step=function(e){d+=e*t,d%=r.height}};exports.default=h;
},{"./Game":21}],20:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Game"),t=i(e);function i(e){return e&&e.__esModule?e:{default:e}}function u(e){this.step=function(t){!0===window.play&&e()},this.draw=function(e){var i=document.getElementById("image");e.drawImage(i,t.default.width/2-i.width/2,t.default.height/2-i.height-40)}}exports.default=u;
},{"./Game":21}],21:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Sprite"),t=g(e),i=require("./SpriteSheet"),a=g(i),n=require("./GameBoard"),s=g(n),r=require("./PlayerShip"),h=g(r),o=require("./Level"),l=g(o),c=require("./GamePoints"),u=g(c),d=require("./TitleScreen"),f=g(d),v=require("./Starfield"),p=g(v),y=require("./LogoScreen"),w=g(y);function g(e){return e&&e.__esModule?e:{default:e}}var k=new function(){var e=[];this.initialize=function(e,t,i){if(this.canvas=document.getElementById(e),this.playerOffset=10,this.canvasMultiplier=1,this.setupMobile(),this.width=this.canvas.width,this.height=this.canvas.height,this.ctx=this.canvas.getContext&&this.canvas.getContext("2d"),!this.ctx)return alert("Please upgrade your browser to play");this.setupInput(),this.loop(),this.mobile&&this.setBoard(4,new x),a.default.load(t,i)};var t={37:"left",39:"right",32:"fire"};this.keys={},this.setupInput=function(){window.addEventListener("keydown",function(e){t[e.keyCode]&&(k.keys[t[e.keyCode]]=!0,e.preventDefault())},!1),window.addEventListener("keyup",function(e){t[e.keyCode]&&(k.keys[t[e.keyCode]]=!1,e.preventDefault())},!1)};var i=(new Date).getTime();this.loop=function(){var t=(new Date).getTime();requestAnimationFrame(k.loop);var a=(t-i)/1e3;a>1/30&&(a=1/30);for(var n=0,s=e.length;n<s;n++)e[n]&&(e[n].step(a),e[n].draw(k.ctx));i=t},this.setBoard=function(t,i){e[t]=i},this.setupMobile=function(){var e=document.getElementById("container"),t=!!("ontouchstart"in window),i=window.innerWidth,a=window.innerHeight;if(t&&(this.mobile=!0),screen.width>=1280||!t)return!1;i>a&&(alert("Please rotate the device and then click OK"),i=window.innerWidth,a=window.innerHeight),e.style.height=2*a+"px",window.scrollTo(0,1),a=window.innerHeight+2,e.style.height=a+"px",e.style.width=i+"px",e.style.padding=0,this.canvasMultiplier=1.5,this.canvas.width=i/1.5,this.canvas.height=a/1.5,this.canvas.style.width=i+"px",this.canvas.style.height=a+"px",this.canvas.style.position="absolute",this.canvas.style.left="0px",this.canvas.style.top="0px"}},x=function(){var e=k.width/5,t=e-10;this.drawSquare=function(i,a,n,s,r){var h=arguments.length>5&&void 0!==arguments[5]&&arguments[5];i.globalAlpha=r?.9:.6,i.fillStyle="#444444",i.fillRect(a,n,t,t),i.textAlign="left",i.fillStyle="#ffffff",i.globalAlpha=.8,i.font="bold "+3*e/4+"px arial";var o=i.measureText(s),l=h?n+3*t/4+1:n+3*t/4+5;i.fillText(s,a+t/2-o.width/2,l)},this.draw=function(t){t.save();var i=k.height-e;this.drawSquare(t,10,i,"◀",k.keys.left),this.drawSquare(t,e+10,i,"▶",k.keys.right),this.drawSquare(t,4*e,i,"●",k.keys.fire,!0),t.restore()},this.step=function(e){},this.trackTouch=function(t){var i;t.preventDefault(),k.keys.left=!1,k.keys.right=!1;for(var a=0;a<t.targetTouches.length;a++)(i=t.targetTouches[a].pageX/k.canvasMultiplier-k.canvas.offsetLeft)<e&&(k.keys.left=!0),i>e&&i<2*e&&(k.keys.right=!0);if("touchstart"==t.type||"touchend"==t.type)for(a=0;a<t.changedTouches.length;a++)(i=t.changedTouches[a].pageX/k.canvasMultiplier-k.canvas.offsetLeft)>4*e&&(k.keys.fire="touchstart"==t.type)},k.canvas.addEventListener("touchstart",this.trackTouch,!0),k.canvas.addEventListener("touchmove",this.trackTouch,!0),k.canvas.addEventListener("touchend",this.trackTouch,!0),k.canvas.addEventListener("dblclick",function(e){e.preventDefault()},!0),k.canvas.addEventListener("click",function(e){e.preventDefault()},!0),k.playerOffset=e+20};exports.default=k;
},{"./Sprite":16,"./SpriteSheet":13,"./GameBoard":14,"./PlayerShip":15,"./Level":19,"./GamePoints":17,"./TitleScreen":22,"./Starfield":18,"./LogoScreen":20}],15:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Sprite"),e=l(t),i=require("./PlayerMissile"),s=l(i),h=require("./Game"),a=l(h),r=require("../consts"),d=l(r);function l(t){return t&&t.__esModule?t:{default:t}}var o=function(t){this.setup("ship",{vx:0,reloadTime:.25,maxVel:200}),this.loseGame=t,this.reload=this.reloadTime,this.x=a.default.width/2-this.w/2,this.y=a.default.height-a.default.playerOffset-this.h,this.step=function(t){a.default.keys.left?this.vx=-this.maxVel:a.default.keys.right?this.vx=this.maxVel:this.vx=0,this.x+=this.vx*t,this.x<0?this.x=0:this.x>a.default.width-this.w&&(this.x=a.default.width-this.w),this.reload-=t,a.default.keys.fire&&this.reload<0&&(a.default.keys.fire=!1,this.reload=this.reloadTime,this.board.add(new s.default(this.x,this.y+this.h/2)),this.board.add(new s.default(this.x+this.w,this.y+this.h/2)))}};o.prototype=new e.default,o.prototype.type=d.default.OBJECT_PLAYER,o.prototype.hit=function(t){this.board.remove(this)&&this.loseGame()},exports.default=o;
},{"./Sprite":16,"./PlayerMissile":26,"./Game":21,"../consts":23}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={ship:{sx:0,sy:0,w:37,h:41,frames:1},missile:{sx:0,sy:30,w:2,h:10,frames:1},enemy_missile:{sx:9,sy:42,w:3,h:26,frames:1},enemy_package:{sx:0,sy:126,w:25,h:40,frames:2},explosion:{sx:0,sy:64,w:64,h:64,frames:12},enemy_boss:{sx:225,sy:0,w:179,h:70,frames:1},enemy_pete:{sx:37,sy:0,w:39,h:50,frames:1},enemy_mcmaster:{sx:79,sy:0,w:35,h:43,frames:1},enemy_sap:{sx:116,sy:0,w:42,h:30,frames:1},enemy_gomez:{sx:158,sy:0,w:32,h:50,frames:1},enemy_dan:{sx:89,sy:154,w:42,h:61,frames:1},enemy_mhar:{sx:140,sy:157,w:53,h:58,frames:1},enemy_mackey:{sx:196,sy:157,w:51,h:59,frames:1},enemy_rich:{sx:255,sy:150,w:50,h:69,frames:1}};
},{}],11:[function(require,module,exports) {
"use strict";var e=require("./components/Sprite"),t=g(e),n=require("./components/SpriteSheet"),a=g(n),o=require("./components/GameBoard"),r=g(o),i=require("./components/PlayerShip"),u=g(i),d=require("./components/Level"),s=g(d),f=require("./components/GamePoints"),l=g(f),c=require("./components/TitleScreen"),p=g(c),w=require("./components/Starfield"),m=g(w),q=require("./components/LogoScreen"),B=g(q),v=require("./components/Game"),S=g(v),h=require("./sprites"),b=g(h);function g(e){return e&&e.__esModule?e:{default:e}}var P=function(){S.default.setBoard(0,new m.default(50,.2,100,!0)),S.default.setBoard(1,new m.default(20,.1,100)),S.default.setBoard(2,new m.default(70,.4,100)),S.default.setBoard(3,new B.default(y))},y=function(){S.default.setBoard(3,new p.default("Shoot all the ships to win!","Press fire to start",24,G))},G=function(){var e=new r.default;e.add(new u.default(Y)),e.add(new s.default(L)),S.default.setBoard(3,e),S.default.setBoard(5,new l.default(0))},L=function(){S.default.setBoard(3,new p.default("You win!","Press fire to play again",30,G)),_({winner:!0})},Y=function(){S.default.setBoard(3,new p.default("You lose!","Press fire to play again",30,G)),_({winner:!1})},_=function(e){var t={},n="/points/"+window.name;firebase.database().ref(n).once("value").then(function(a){var o=a.val(),r=0;o&&(r=o.points),window.name&&S.default.points>r&&(t[n]=Object.assign(e,{points:S.default.points}),firebase.database().ref().update(t))})};window.addEventListener("load",function(){S.default.initialize("game",b.default,P)});
},{"./components/Sprite":16,"./components/SpriteSheet":13,"./components/GameBoard":14,"./components/PlayerShip":15,"./components/Level":19,"./components/GamePoints":17,"./components/TitleScreen":22,"./components/Starfield":18,"./components/LogoScreen":20,"./components/Game":21,"./sprites":12}],8:[function(require,module,exports) {
"use strict";require("./src");
},{"./src":11}]},{},[8])