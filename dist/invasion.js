require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({6:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={ship:{sx:0,sy:0,w:37,h:42,frames:1},missile:{sx:0,sy:30,w:2,h:10,frames:1},enemy_purple:{sx:37,sy:0,w:42,h:43,frames:1},enemy_bee:{sx:79,sy:0,w:37,h:43,frames:1},enemy_ship:{sx:116,sy:0,w:42,h:43,frames:1},enemy_circle:{sx:158,sy:0,w:32,h:33,frames:1},explosion:{sx:0,sy:64,w:64,h:64,frames:12},enemy_missile:{sx:9,sy:42,w:3,h:20,frame:1}};
},{}],17:[function(require,module,exports) {
module.exports="/dist/db1febe461f997499081e5c5bd7cb0f9.png";
},{}],11:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t=new function(){return this.map={},this.load=function(t,e){this.map=t,this.image=new Image,this.image.onload=e,this.image.src=require("../sprites.png"),document.body.appendChild(this.image)},this.draw=function(t,e,i,s,a){const o=this.map[e];a||(a=0),t.drawImage(this.image,o.sx+a*o.w,o.sy,o.w,o.h,Math.floor(i),Math.floor(s),o.w,o.h)},this};exports.default=t;
},{"../sprites.png":17}],10:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./SpriteSheet"),e=i(t);function i(t){return t&&t.__esModule?t:{default:t}}const r=function(){};r.prototype.setup=function(t,i){this.sprite=t,this.merge(i),this.frame=this.frame||0,this.w=e.default.map[t].w,this.h=e.default.map[t].h},r.prototype.merge=function(t){if(t)for(let e in t)this[e]=t[e]},r.prototype.draw=function(t){e.default.draw(t,this.sprite,this.x,this.y,this.frame)},r.prototype.hit=function(t){this.board.remove(this)},exports.default=r;
},{"./SpriteSheet":11}],9:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t=function(){const t=this;this.objects=[],this.cnt={},this.add=function(t){return t.board=this,this.objects.push(t),this.cnt[t.type]=(this.cnt[t.type]||0)+1,t},this.remove=function(t){return-1==this.removed.indexOf(t)&&(this.removed.push(t),!0)},this.resetRemoved=function(){this.removed=[]},this.finalizeRemoved=function(){for(let t=0,e=this.removed.length;t<e;t++){const e=this.objects.indexOf(this.removed[t]);-1!=e&&(this.cnt[this.removed[t].type]--,this.objects.splice(e,1))}},this.iterate=function(t){const e=Array.prototype.slice.call(arguments,1);for(let i=0,s=this.objects.length;i<s;i++){const s=this.objects[i];s[t].apply(s,e)}},this.detect=function(t){for(let e=0,i=this.objects.length;e<i;e++)if(t.call(this.objects[e]))return this.objects[e];return!1},this.step=function(t){this.resetRemoved(),this.iterate("step",t),this.finalizeRemoved()},this.draw=function(t){this.iterate("draw",t)},this.overlap=function(t,e){return!(t.y+t.h-1<e.y||t.y>e.y+e.h-1||t.x+t.w-1<e.x||t.x>e.x+e.w-1)},this.collide=function(e,i){return this.detect(function(){if(e!=this)return!!((!i||this.type&i)&&t.overlap(e,this))&&this})}};exports.default=t;
},{}],16:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={OBJECT_PLAYER:1,OBJECT_PLAYER_PROJECTILE:2,OBJECT_ENEMY:4,OBJECT_ENEMY_PROJECTILE:8,OBJECT_POWERUP:16};
},{}],18:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../consts"),e=o(t),s=require("./Sprite"),i=o(s);function o(t){return t&&t.__esModule?t:{default:t}}const r=function(t,e){this.setup("missile",{vy:-700,damage:10}),this.x=t-this.w/2,this.y=e-this.h};(r.prototype=new i.default).type=e.default.OBJECT_PLAYER_PROJECTILE,r.prototype.step=function(t){this.y+=this.vy*t;const s=this.board.collide(this,e.default.OBJECT_ENEMY);s?(s.hit(this.damage),this.board.remove(this)):this.y<-this.h&&this.board.remove(this)},exports.default=r;
},{"../consts":16,"./Sprite":10}],8:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Sprite"),e=l(t),i=require("./PlayerMissile"),s=l(i),h=require("./Game"),a=l(h),d=require("../consts"),r=l(d);function l(t){return t&&t.__esModule?t:{default:t}}const u=function(){this.setup("ship",{vx:0,reloadTime:.25,maxVel:200}),this.reload=this.reloadTime,this.x=a.default.width/2-this.w/2,this.y=a.default.height-a.default.playerOffset-this.h,this.step=function(t){a.default.keys.left?this.vx=-this.maxVel:a.default.keys.right?this.vx=this.maxVel:this.vx=0,this.x+=this.vx*t,this.x<0?this.x=0:this.x>a.default.width-this.w&&(this.x=a.default.width-this.w),this.reload-=t,a.default.keys.fire&&this.reload<0&&(a.default.keys.fire=!1,this.reload=this.reloadTime,this.board.add(new s.default(this.x,this.y+this.h/2)),this.board.add(new s.default(this.x+this.w,this.y+this.h/2)))}};(u.prototype=new e.default).type=r.default.OBJECT_PLAYER,u.prototype.hit=function(t){this.board.remove(this)&&a.default.loseGame()},exports.default=u;
},{"./Sprite":10,"./PlayerMissile":18,"./Game":7,"../consts":16}],21:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Game"),t=u(e),i=require("./Sprite"),s=u(i),r=require("../consts"),o=u(r);function u(e){return e&&e.__esModule?e:{default:e}}const h=function(e,t){this.setup("enemy_missile",{vy:200,damage:10}),this.x=e-this.w/2,this.y=t};(h.prototype=new s.default).type=o.default.OBJECT_ENEMY_PROJECTILE,h.prototype.step=function(e){this.y+=this.vy*e;const i=this.board.collide(this,o.default.OBJECT_PLAYER);i?(i.hit(this.damage),this.board.remove(this)):this.y>t.default.height&&this.board.remove(this)},exports.default=h;
},{"./Game":7,"./Sprite":10,"../consts":16}],22:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Sprite"),t=s(e);function s(e){return e&&e.__esModule?e:{default:e}}const i=function(e,t){this.setup("explosion",{frame:0}),this.x=e-this.w/2,this.y=t-this.h/2};(i.prototype=new t.default).step=function(e){this.frame++,this.frame>=12&&this.board.remove(this)},exports.default=i;
},{"./Sprite":10}],20:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Game"),i=u(t),s=require("./Sprite"),e=u(s),h=require("./EnemyMissile"),r=u(h),a=require("./Explosion"),o=u(a),d=require("../consts"),l=u(d);function u(t){return t&&t.__esModule?t:{default:t}}const n=function(t,i){this.merge(this.baseParameters),this.setup(t.sprite,t),this.merge(i)};(n.prototype=new e.default).type=l.default.OBJECT_ENEMY,n.prototype.baseParameters={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,t:0,reloadTime:.75,reload:0},n.prototype.step=function(t){this.t+=t,this.vx=this.A+this.B*Math.sin(this.C*this.t+this.D),this.vy=this.E+this.F*Math.sin(this.G*this.t+this.H),this.x+=this.vx*t,this.y+=this.vy*t;const s=this.board.collide(this,l.default.OBJECT_PLAYER);s&&(s.hit(this.damage),this.board.remove(this)),Math.random()<.01&&this.reload<=0&&(this.reload=this.reloadTime,2==this.missiles?(this.board.add(new r.default(this.x+this.w-2,this.y+this.h)),this.board.add(new r.default(this.x+2,this.y+this.h))):this.board.add(new r.default(this.x+this.w/2,this.y+this.h))),this.reload-=t,(this.y>i.default.height||this.x<-this.w||this.x>i.default.width)&&this.board.remove(this)},n.prototype.hit=function(t){this.health-=t,this.health<=0&&this.board.remove(this)&&(i.default.points+=this.points||100,this.board.add(new o.default(this.x+this.w/2,this.y+this.h/2)))},exports.default=n;
},{"./Game":7,"./Sprite":10,"./EnemyMissile":21,"./Explosion":22,"../consts":16}],19:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={straight:{x:0,y:-50,sprite:"enemy_ship",health:10,E:100},ltr:{x:0,y:-100,sprite:"enemy_purple",health:10,B:75,C:1,E:100,missiles:2},circle:{x:250,y:-50,sprite:"enemy_circle",health:10,A:0,B:-100,C:1,E:20,F:100,G:1,H:Math.PI/2},wiggle:{x:100,y:-50,sprite:"enemy_bee",health:20,B:50,C:4,E:100,firePercentage:.001,missiles:2},step:{x:0,y:-50,sprite:"enemy_circle",health:10,B:150,C:1.2,E:75}};
},{}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Enemy"),e=n(t),l=require("../consts"),s=n(l),i=require("../enemies"),a=n(i);function n(t){return t&&t.__esModule?t:{default:t}}const r=function(t,e){this.levelData=[];for(let e=0;e<t.length;e++)this.levelData.push(Object.create(t[e]));this.t=0,this.callback=e};r.prototype.step=function(t){let l=0,s=[],i=null;for(this.t+=1e3*t;(i=this.levelData[l])&&i[0]<this.t+2e3;){if(this.t>i[1])s.push(i);else if(i[0]<this.t){const t=a.default[i[3]],l=i[4];this.board.add(new e.default(t,l)),i[0]+=i[2]}l++}for(let t=0,e=s.length;t<e;t++){const e=this.levelData.indexOf(s[t]);-1!=e&&this.levelData.splice(e,1)}0===this.levelData.length&&0===this.board.cnt[OBJECT_ENEMY]&&this.callback&&this.callback()},r.prototype.draw=function(t){},exports.default=r;
},{"./Enemy":20,"../consts":16,"../enemies":19}],14:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Game"),t=l(e);function l(e){return e&&e.__esModule?e:{default:e}}const o=function(){t.default.points=0;this.draw=(e=>{e.save(),e.font="bold 18px arial",e.fillStyle="#FFFFFF";const l=""+t.default.points;let o=8-l.length,r="";for(;o-- >0;)r+="0";e.fillText(r+l,10,20),e.restore()}),this.step=(e=>{})};exports.default=o;
},{"./Game":7}],13:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Game"),t=l(e);function l(e){return e&&e.__esModule?e:{default:e}}const f=function(e,l,f){let i=!1;this.step=function(e){t.default.keys.fire||(i=!0),i&&t.default.keys.fire&&f&&f()},this.draw=function(f){f.fillStyle="#FFFFFF",f.font="bold 40px";const i=f.measureText(e);f.fillText(e,t.default.width/2-i.width/2,t.default.height/2),f.font="bold 20px";const u=f.measureText(l);f.fillText(l,t.default.width/2-u.width/2,t.default.height/2+40)}};exports.default=f;
},{"./Game":7}],15:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Game"),e=h(t);function h(t){return t&&t.__esModule?t:{default:t}}const i=function(t,h,i,l){const a=document.createElement("canvas");a.width=e.default.width,a.height=e.default.height;const o=a.getContext("2d");let d=0;l&&(o.fillStyle="#000",o.fillRect(0,0,a.width,a.height)),o.fillStyle="#FFF",o.globalAlpha=h;for(let t=0;t<i;t++)o.fillRect(Math.floor(Math.random()*a.width),Math.floor(Math.random()*a.height),2,2);this.draw=function(t){const e=Math.floor(d),h=a.height-e;e>0&&t.drawImage(a,0,h,a.width,e,0,0,a.width,e),h>0&&t.drawImage(a,0,0,a.width,h,0,e,a.width,h)},this.step=(e=>{d+=e*t,d%=a.height})};exports.default=i;
},{"./Game":7}],7:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Sprite"),t=f(e),s=require("./SpriteSheet"),i=f(s),a=require("./GameBoard"),h=f(a),n=require("./PlayerShip"),r=f(n),o=require("./Level"),d=f(o),l=require("./GamePoints"),u=f(l),p=require("./TitleScreen"),c=f(p),w=require("./Starfield"),y=f(w),g=require("../sprites"),m=f(g);function f(e){return e&&e.__esModule?e:{default:e}}const v={37:"left",39:"right",32:"fire"};let b=(new Date).getTime(),x=1/30;const G=[[0,4e3,500,"step"],[6e3,13e3,800,"ltr"],[1e4,16e3,400,"circle"],[17800,2e4,500,"straight",{x:50}],[18200,2e4,500,"straight",{x:90}],[18200,2e4,500,"straight",{x:10}],[22e3,25e3,400,"wiggle",{x:150}],[22e3,25e3,400,"wiggle",{x:100}]];class B{constructor(){if(this.boards=[],this.keys={},this.canvas=document.getElementById("game"),this.playerOffset=10,this.canvasMultiplier=1,this.setupMobile(),this.width=this.canvas.width,this.height=this.canvas.height,this.ctx=this.canvas.getContext&&this.canvas.getContext("2d"),!this.ctx)return alert("Please upgrade your browser to play");this.setupInput(),this.mobile&&this.setBoard(4,new TouchControls),this.loop=this.loop.bind(this),this.setBoard=this.setBoard.bind(this),this.setupInput=this.setupInput.bind(this),this.startGame=this.startGame.bind(this),this.playGame=this.playGame.bind(this),this.loseGame=this.loseGame.bind(this),this.loop(),i.default.load(m.default,this.startGame)}setBoard(e,t){this.boards[e]=t}startGame(){this.setBoard(0,new y.default(50,.6,100,!0)),this.setBoard(3,new c.default("Gamut","Press fire to start",this.playGame))}playGame(){const e=new h.default;e.add(new r.default),e.add(new d.default(G,this.winGame)),this.setBoard(3,e),this.setBoard(5,new u.default(0))}winGame(){this.setBoard(3,new c.default("You win!","Press fire to play again",this.playGame))}loseGame(){this.setBoard(3,new c.default("You lose!","Press fire to play again",this.playGame))}setupInput(){window.addEventListener("keydown",e=>{v[e.keyCode]&&(this.keys[v[e.keyCode]]=!0,e.preventDefault())},!1),window.addEventListener("keyup",e=>{v[e.keyCode]&&(this.keys[v[e.keyCode]]=!1,e.preventDefault())},!1)}loop(){const e=(new Date).getTime();requestAnimationFrame(this.loop);let t=(e-b)/1e3;t>x&&(t=x);for(let e=0,s=this.boards.length;e<s;e++)this.boards[e]&&(this.boards[e].step(t),this.boards[e].draw(this.ctx));b=e}setupMobile(){const e=document.getElementById("container"),t=!!("ontouchstart"in window),s=window.innerWidth,i=window.innerHeight;if(t&&(this.mobile=!0),screen.width>=1280||!t)return!1;s>i&&(alert("Please rotate the device and then click OK"),s=window.innerWidth,i=window.innerHeight),e.style.height=2*i+"px",window.scrollTo(0,1),i=window.innerHeight+2,e.style.height=i+"px",e.style.width=s+"px",e.style.padding=0,i>=1.75*this.canvas.height||s>=1.75*this.canvas.height?(this.canvasMultiplier=2,this.canvas.width=s/2,this.canvas.height=i/2,this.canvas.style.width=s+"px",this.canvas.style.height=i+"px"):(this.canvas.width=s,this.canvas.height=i),this.canvas.style.position="absolute",this.canvas.style.left="0px",this.canvas.style.top="0px"}}exports.default=new B;
},{"./Sprite":10,"./SpriteSheet":11,"./GameBoard":9,"./PlayerShip":8,"./Level":12,"./GamePoints":14,"./TitleScreen":13,"./Starfield":15,"../sprites":6}],5:[function(require,module,exports) {
"use strict";var e=require("./sprites"),r=t(e);function t(e){return e&&e.__esModule?e:{default:e}}window.addEventListener("load",()=>{require("./components/Game")});
},{"./sprites":6,"./components/Game":7}],4:[function(require,module,exports) {
require("./game");
},{"./game":5}]},{},[4])