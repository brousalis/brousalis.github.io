// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({4:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
  missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
  enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
  enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
  enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
  enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 },
  explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
  enemy_missile: { sx: 9, sy: 42, w: 3, h: 20, frame: 1 }
};
},{}],14:[function(require,module,exports) {
module.exports="/dist/aa6de8e0daf24f2ec2fdcee12cebac33.png";
},{}],9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SpriteSheet = new function () {
  this.map = {};

  this.load = function (spriteData, callback) {
    this.map = spriteData;
    this.image = new Image();
    this.image.onload = callback;
    this.image.src = require('../sprites.png');
    document.body.appendChild(this.image);
  };

  this.draw = function (ctx, sprite, x, y, frame) {
    var s = this.map[sprite];
    if (!frame) frame = 0;
    ctx.drawImage(this.image, s.sx + frame * s.w, s.sy, s.w, s.h, Math.floor(x), Math.floor(y), s.w, s.h);
  };

  return this;
}();

exports.default = SpriteSheet;
},{"../sprites.png":14}],8:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SpriteSheet = require("./SpriteSheet");

var _SpriteSheet2 = _interopRequireDefault(_SpriteSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sprite = function Sprite() {};

Sprite.prototype.setup = function (sprite, props) {
  this.sprite = sprite;
  this.merge(props);
  this.frame = this.frame || 0;
  this.w = _SpriteSheet2.default.map[sprite].w;
  this.h = _SpriteSheet2.default.map[sprite].h;
};

Sprite.prototype.merge = function (props) {
  if (props) {
    for (var prop in props) {
      this[prop] = props[prop];
    }
  }
};

Sprite.prototype.draw = function (ctx) {
  _SpriteSheet2.default.draw(ctx, this.sprite, this.x, this.y, this.frame);
};

Sprite.prototype.hit = function (damage) {
  this.board.remove(this);
};

exports.default = Sprite;
},{"./SpriteSheet":9}],6:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GameBoard = function GameBoard() {
  var board = this;

  // The current list of objects
  this.objects = [];
  this.cnt = {};

  // Add a new object to the object list
  this.add = function (obj) {
    obj.board = this;
    this.objects.push(obj);
    this.cnt[obj.type] = (this.cnt[obj.type] || 0) + 1;
    return obj;
  };

  // Mark an object for removal
  this.remove = function (obj) {
    var idx = this.removed.indexOf(obj);
    if (idx == -1) {
      this.removed.push(obj);
      return true;
    } else {
      return false;
    }
  };

  // Reset the list of removed objects
  this.resetRemoved = function () {
    this.removed = [];
  };

  // Removed an objects marked for removal from the list
  this.finalizeRemoved = function () {
    for (var i = 0, len = this.removed.length; i < len; i++) {
      var idx = this.objects.indexOf(this.removed[i]);
      if (idx != -1) {
        this.cnt[this.removed[i].type]--;
        this.objects.splice(idx, 1);
      }
    }
  };

  // Call the same method on all current objects
  this.iterate = function (funcName) {
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, len = this.objects.length; i < len; i++) {
      var obj = this.objects[i];
      obj[funcName].apply(obj, args);
    }
  };

  // Find the first object for which func is true
  this.detect = function (func) {
    for (var i = 0, val = null, len = this.objects.length; i < len; i++) {
      if (func.call(this.objects[i])) return this.objects[i];
    }
    return false;
  };

  // Call step on all objects and them delete
  // any object that have been marked for removal
  this.step = function (dt) {
    this.resetRemoved();
    this.iterate('step', dt);
    this.finalizeRemoved();
  };

  // Draw all the objects
  this.draw = function (ctx) {
    this.iterate('draw', ctx);
  };

  // Check for a collision between the
  // bounding rects of two objects
  this.overlap = function (o1, o2) {
    return !(o1.y + o1.h - 1 < o2.y || o1.y > o2.y + o2.h - 1 || o1.x + o1.w - 1 < o2.x || o1.x > o2.x + o2.w - 1);
  };

  // Find the first object that collides with obj
  // match against an optional type
  this.collide = function (obj, type) {
    return this.detect(function () {
      if (obj != this) {
        var col = (!type || this.type & type) && board.overlap(obj, this);
        return col ? this : false;
      }
    });
  };
};

exports.default = GameBoard;
},{}],16:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  OBJECT_PLAYER: 1,
  OBJECT_PLAYER_PROJECTILE: 2,
  OBJECT_ENEMY: 4,
  OBJECT_ENEMY_PROJECTILE: 8,
  OBJECT_POWERUP: 16
};
},{}],15:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _consts = require("../consts");

var _consts2 = _interopRequireDefault(_consts);

var _Sprite = require("./Sprite");

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerMissile = function PlayerMissile(x, y) {
  this.setup('missile', { vy: -700, damage: 10 });
  this.x = x - this.w / 2;
  this.y = y - this.h;
};

PlayerMissile.prototype = new _Sprite2.default();
PlayerMissile.prototype.type = _consts2.default.OBJECT_PLAYER_PROJECTILE;

PlayerMissile.prototype.step = function (dt) {
  this.y += this.vy * dt;
  var collision = this.board.collide(this, _consts2.default.OBJECT_ENEMY);
  if (collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if (this.y < -this.h) {
    this.board.remove(this);
  }
};

exports.default = PlayerMissile;
},{"../consts":16,"./Sprite":8}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sprite = require("./Sprite");

var _Sprite2 = _interopRequireDefault(_Sprite);

var _PlayerMissile = require("./PlayerMissile");

var _PlayerMissile2 = _interopRequireDefault(_PlayerMissile);

var _Game = require("./Game");

var _Game2 = _interopRequireDefault(_Game);

var _consts = require("../consts");

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayerShip = function PlayerShip() {
  this.setup('ship', { vx: 0, reloadTime: 0.25, maxVel: 200 });

  this.reload = this.reloadTime;
  this.x = _Game2.default.width / 2 - this.w / 2;
  this.y = _Game2.default.height - _Game2.default.playerOffset - this.h;

  this.step = function (dt) {
    if (_Game2.default.keys['left']) {
      this.vx = -this.maxVel;
    } else if (_Game2.default.keys['right']) {
      this.vx = this.maxVel;
    } else {
      this.vx = 0;
    }

    this.x += this.vx * dt;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > _Game2.default.width - this.w) {
      this.x = _Game2.default.width - this.w;
    }

    this.reload -= dt;
    if (_Game2.default.keys['fire'] && this.reload < 0) {
      _Game2.default.keys['fire'] = false;
      this.reload = this.reloadTime;

      this.board.add(new _PlayerMissile2.default(this.x, this.y + this.h / 2));
      this.board.add(new _PlayerMissile2.default(this.x + this.w, this.y + this.h / 2));
    }
  };
};

PlayerShip.prototype = new _Sprite2.default();
PlayerShip.prototype.type = _consts2.default.OBJECT_PLAYER;

PlayerShip.prototype.hit = function (damage) {
  if (this.board.remove(this)) {
    _Game2.default.loseGame();
  }
};

exports.default = PlayerShip;
},{"./Sprite":8,"./PlayerMissile":15,"./Game":5,"../consts":16}],19:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Game = require("./Game");

var _Game2 = _interopRequireDefault(_Game);

var _Sprite = require("./Sprite");

var _Sprite2 = _interopRequireDefault(_Sprite);

var _consts = require("../consts");

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnemyMissile = function EnemyMissile(x, y) {
  this.setup('enemy_missile', { vy: 200, damage: 10 });
  this.x = x - this.w / 2;
  this.y = y;
};

EnemyMissile.prototype = new _Sprite2.default();
EnemyMissile.prototype.type = _consts2.default.OBJECT_ENEMY_PROJECTILE;

EnemyMissile.prototype.step = function (dt) {
  this.y += this.vy * dt;
  var collision = this.board.collide(this, _consts2.default.OBJECT_PLAYER);
  if (collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if (this.y > _Game2.default.height) {
    this.board.remove(this);
  }
};

exports.default = EnemyMissile;
},{"./Game":5,"./Sprite":8,"../consts":16}],20:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sprite = require("./Sprite");

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Explosion = function Explosion(centerX, centerY) {
  this.setup('explosion', { frame: 0 });
  this.x = centerX - this.w / 2;
  this.y = centerY - this.h / 2;
};

Explosion.prototype = new _Sprite2.default();

Explosion.prototype.step = function (dt) {
  this.frame++;
  if (this.frame >= 12) {
    this.board.remove(this);
  }
};

exports.default = Explosion;
},{"./Sprite":8}],18:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Game = require("./Game");

var _Game2 = _interopRequireDefault(_Game);

var _Sprite = require("./Sprite");

var _Sprite2 = _interopRequireDefault(_Sprite);

var _EnemyMissile = require("./EnemyMissile");

var _EnemyMissile2 = _interopRequireDefault(_EnemyMissile);

var _Explosion = require("./Explosion");

var _Explosion2 = _interopRequireDefault(_Explosion);

var _consts = require("../consts");

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Enemy = function Enemy(blueprint, override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite, blueprint);
  this.merge(override);
};

Enemy.prototype = new _Sprite2.default();
Enemy.prototype.type = _consts2.default.OBJECT_ENEMY;

Enemy.prototype.baseParameters = {
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
  G: 0,
  H: 0,
  t: 0,
  reloadTime: 0.75,
  reload: 0
};

Enemy.prototype.step = function (dt) {
  this.t += dt;

  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

  this.x += this.vx * dt;
  this.y += this.vy * dt;

  var collision = this.board.collide(this, _consts2.default.OBJECT_PLAYER);
  if (collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  }

  if (Math.random() < 0.01 && this.reload <= 0) {
    this.reload = this.reloadTime;
    if (this.missiles == 2) {
      this.board.add(new _EnemyMissile2.default(this.x + this.w - 2, this.y + this.h));
      this.board.add(new _EnemyMissile2.default(this.x + 2, this.y + this.h));
    } else {
      this.board.add(new _EnemyMissile2.default(this.x + this.w / 2, this.y + this.h));
    }
  }
  this.reload -= dt;

  if (this.y > _Game2.default.height || this.x < -this.w || this.x > _Game2.default.width) {
    this.board.remove(this);
  }
};

Enemy.prototype.hit = function (damage) {
  this.health -= damage;
  if (this.health <= 0) {
    if (this.board.remove(this)) {
      _Game2.default.points += this.points || 100;
      this.board.add(new _Explosion2.default(this.x + this.w / 2, this.y + this.h / 2));
    }
  }
};

exports.default = Enemy;
},{"./Game":5,"./Sprite":8,"./EnemyMissile":19,"./Explosion":20,"../consts":16}],17:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  straight: {
    x: 0,
    y: -50,
    sprite: 'enemy_ship',
    health: 10,
    E: 100
  },
  ltr: {
    x: 0,
    y: -100,
    sprite: 'enemy_purple',
    health: 10,
    B: 75,
    C: 1,
    E: 100,
    missiles: 2
  },
  circle: {
    x: 250,
    y: -50,
    sprite: 'enemy_circle',
    health: 10,
    A: 0,
    B: -100,
    C: 1,
    E: 20,
    F: 100,
    G: 1,
    H: Math.PI / 2
  },
  wiggle: {
    x: 100,
    y: -50,
    sprite: 'enemy_bee',
    health: 20,
    B: 50,
    C: 4,
    E: 100,
    firePercentage: 0.001,
    missiles: 2
  },
  step: {
    x: 0,
    y: -50,
    sprite: 'enemy_circle',
    health: 10,
    B: 150,
    C: 1.2,
    E: 75
  }
};
},{}],7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Enemy = require("./Enemy");

var _Enemy2 = _interopRequireDefault(_Enemy);

var _consts = require("../consts");

var _consts2 = _interopRequireDefault(_consts);

var _enemies = require("../enemies");

var _enemies2 = _interopRequireDefault(_enemies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Level = function Level(levelData, callback) {
  this.levelData = [];
  for (var i = 0; i < levelData.length; i++) {
    this.levelData.push(Object.create(levelData[i]));
  }
  this.t = 0;
  this.callback = callback;
};

Level.prototype.step = function (dt) {
  var idx = 0,
      remove = [],
      curShip = null;

  // Update the current time offset
  this.t += dt * 1000;

  //   Start, End,  Gap, Type,   Override
  // [ 0,     4000, 500, 'step', { x: 100 } ]
  while ((curShip = this.levelData[idx]) && curShip[0] < this.t + 2000) {
    // Check if we've passed the end time
    if (this.t > curShip[1]) {
      remove.push(curShip);
    } else if (curShip[0] < this.t) {
      // Get the enemy definition blueprint
      var enemy = _enemies2.default[curShip[3]],
          override = curShip[4];

      // Add a new enemy with the blueprint and override
      this.board.add(new _Enemy2.default(enemy, override));

      // Increment the start time by the gap
      curShip[0] += curShip[2];
    }
    idx++;
  }

  // Remove any objects from the levelData that have passed
  for (var i = 0, len = remove.length; i < len; i++) {
    var remIdx = this.levelData.indexOf(remove[i]);
    if (remIdx != -1) this.levelData.splice(remIdx, 1);
  }

  // If there are no more enemies on the board or in
  // levelData, this level is done
  if (this.levelData.length === 0 && this.board.cnt[OBJECT_ENEMY] === 0) {
    if (this.callback) this.callback();
  }
};

Level.prototype.draw = function (ctx) {};

exports.default = Level;
},{"./Enemy":18,"../consts":16,"../enemies":17}],13:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Game = require("./Game");

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GamePoints = function GamePoints() {
  _Game2.default.points = 0;

  var pointsLength = 8;

  this.draw = function (ctx) {
    ctx.save();
    ctx.font = 'bold 18px arial';
    ctx.fillStyle = '#FFFFFF';

    var txt = '' + _Game2.default.points;
    var i = pointsLength - txt.length,
        zeros = '';
    while (i-- > 0) {
      zeros += '0';
    }

    ctx.fillText(zeros + txt, 10, 20);
    ctx.restore();
  };

  this.step = function (dt) {};
};

exports.default = GamePoints;
},{"./Game":5}],10:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Game = require("./Game");

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TitleScreen = function TitleScreen(title, subtitle, callback) {
  var up = false;

  this.step = function (dt) {
    if (!_Game2.default.keys['fire']) up = true;
    if (up && _Game2.default.keys['fire'] && callback) callback();
  };

  this.draw = function (ctx) {
    ctx.fillStyle = '#FFFFFF';

    ctx.font = 'bold 40px';
    var measure = ctx.measureText(title);
    ctx.fillText(title, _Game2.default.width / 2 - measure.width / 2, _Game2.default.height / 2);

    ctx.font = 'bold 20px';
    var measure2 = ctx.measureText(subtitle);
    ctx.fillText(subtitle, _Game2.default.width / 2 - measure2.width / 2, _Game2.default.height / 2 + 40);
  };
};

exports.default = TitleScreen;
},{"./Game":5}],11:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Game = require("./Game");

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Starfield = function Starfield(speed, opacity, numStars, clear) {
  // Set up the offscreen canvas
  var stars = document.createElement('canvas');
  stars.width = _Game2.default.width;
  stars.height = _Game2.default.height;
  var starCtx = stars.getContext('2d');

  var offset = 0;

  // If the clear option is set,
  // make the background black instead of transparent
  if (clear) {
    starCtx.fillStyle = '#000';
    starCtx.fillRect(0, 0, stars.width, stars.height);
  }

  // Now draw a bunch of random 2 pixel
  // rectangles onto the offscreen canvas
  starCtx.fillStyle = '#FFF';
  starCtx.globalAlpha = opacity;
  for (var i = 0; i < numStars; i++) {
    starCtx.fillRect(Math.floor(Math.random() * stars.width), Math.floor(Math.random() * stars.height), 2, 2);
  }

  // This method is called every frame
  // to draw the starfield onto the canvas
  this.draw = function (ctx) {
    var intOffset = Math.floor(offset);
    var remaining = stars.height - intOffset;

    // Draw the top half of the starfield
    if (intOffset > 0) {
      ctx.drawImage(stars, 0, remaining, stars.width, intOffset, 0, 0, stars.width, intOffset);
    }

    // Draw the bottom half of the starfield
    if (remaining > 0) {
      ctx.drawImage(stars, 0, 0, stars.width, remaining, 0, intOffset, stars.width, remaining);
    }
  };

  // This method is called to update
  // the starfield
  this.step = function (dt) {
    offset += dt * speed;
    offset = offset % stars.height;
  };
};

exports.default = Starfield;
},{"./Game":5}],5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sprite = require("./Sprite");

var _Sprite2 = _interopRequireDefault(_Sprite);

var _SpriteSheet = require("./SpriteSheet");

var _SpriteSheet2 = _interopRequireDefault(_SpriteSheet);

var _GameBoard = require("./GameBoard");

var _GameBoard2 = _interopRequireDefault(_GameBoard);

var _PlayerShip = require("./PlayerShip");

var _PlayerShip2 = _interopRequireDefault(_PlayerShip);

var _Level = require("./Level");

var _Level2 = _interopRequireDefault(_Level);

var _GamePoints = require("./GamePoints");

var _GamePoints2 = _interopRequireDefault(_GamePoints);

var _TitleScreen = require("./TitleScreen");

var _TitleScreen2 = _interopRequireDefault(_TitleScreen);

var _Starfield = require("./Starfield");

var _Starfield2 = _interopRequireDefault(_Starfield);

var _sprites = require("../sprites");

var _sprites2 = _interopRequireDefault(_sprites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY_CODES = { 37: 'left', 39: 'right', 32: 'fire' };

var lastTime = new Date().getTime();
var maxTime = 1 / 30;

var levelOne = [
// Start,   End, Gap,  Type,   Override
[0, 4000, 500, 'step'], [6000, 13000, 800, 'ltr'], [10000, 16000, 400, 'circle'], [17800, 20000, 500, 'straight', { x: 50 }], [18200, 20000, 500, 'straight', { x: 90 }], [18200, 20000, 500, 'straight', { x: 10 }], [22000, 25000, 400, 'wiggle', { x: 150 }], [22000, 25000, 400, 'wiggle', { x: 100 }]];

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.boards = [];
    this.keys = {};
    this.canvas = document.getElementById('game');

    this.playerOffset = 10;
    this.canvasMultiplier = 1;
    this.setupMobile();

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');

    if (!this.ctx) {
      return alert('Please upgrade your browser to play');
    }

    this.setupInput();

    if (this.mobile) {
      this.setBoard(4, new TouchControls());
    }

    this.loop = this.loop.bind(this);
    this.setBoard = this.setBoard.bind(this);
    this.setupInput = this.setupInput.bind(this);
    this.startGame = this.startGame.bind(this);
    this.playGame = this.playGame.bind(this);
    this.loseGame = this.loseGame.bind(this);

    this.loop();

    _SpriteSheet2.default.load(_sprites2.default, this.startGame);
  }

  // Change an active game board


  _createClass(Game, [{
    key: "setBoard",
    value: function setBoard(num, board) {
      this.boards[num] = board;
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.setBoard(0, new _Starfield2.default(50, 0.6, 100, true));
      this.setBoard(3, new _TitleScreen2.default('Gamut', 'Press fire to start', this.playGame));
    }
  }, {
    key: "playGame",
    value: function playGame() {
      var board = new _GameBoard2.default();
      board.add(new _PlayerShip2.default());
      board.add(new _Level2.default(levelOne, this.winGame));

      this.setBoard(3, board);
      this.setBoard(5, new _GamePoints2.default(0));
    }
  }, {
    key: "winGame",
    value: function winGame() {
      this.setBoard(3, new _TitleScreen2.default('You win!', 'Press fire to play again', this.playGame));
    }
  }, {
    key: "loseGame",
    value: function loseGame() {
      this.setBoard(3, new _TitleScreen2.default('You lose!', 'Press fire to play again', this.playGame));
    }
  }, {
    key: "setupInput",
    value: function setupInput() {
      var _this = this;

      var game = this;
      window.addEventListener('keydown', function (e) {
        if (KEY_CODES[e.keyCode]) {
          _this.keys[KEY_CODES[e.keyCode]] = true;
          e.preventDefault();
        }
      }, false);

      window.addEventListener('keyup', function (e) {
        if (KEY_CODES[e.keyCode]) {
          _this.keys[KEY_CODES[e.keyCode]] = false;
          e.preventDefault();
        }
      }, false);
    }

    // Game Loop

  }, {
    key: "loop",
    value: function loop() {
      var curTime = new Date().getTime();
      requestAnimationFrame(this.loop);
      var dt = (curTime - lastTime) / 1000;
      if (dt > maxTime) {
        dt = maxTime;
      }

      for (var i = 0, len = this.boards.length; i < len; i++) {
        if (this.boards[i]) {
          this.boards[i].step(dt);
          this.boards[i].draw(this.ctx);
        }
      }
      lastTime = curTime;
    }
  }, {
    key: "setupMobile",
    value: function setupMobile() {
      var container = document.getElementById('container'),
          hasTouch = !!('ontouchstart' in window),
          w = window.innerWidth,
          h = window.innerHeight;

      if (hasTouch) {
        this.mobile = true;
      }

      if (screen.width >= 1280 || !hasTouch) {
        return false;
      }

      if (w > h) {
        alert('Please rotate the device and then click OK');
        w = window.innerWidth;
        h = window.innerHeight;
      }

      container.style.height = h * 2 + 'px';
      window.scrollTo(0, 1);

      h = window.innerHeight + 2;
      container.style.height = h + 'px';
      container.style.width = w + 'px';
      container.style.padding = 0;

      if (h >= this.canvas.height * 1.75 || w >= this.canvas.height * 1.75) {
        this.canvasMultiplier = 2;
        this.canvas.width = w / 2;
        this.canvas.height = h / 2;
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
      } else {
        this.canvas.width = w;
        this.canvas.height = h;
      }

      this.canvas.style.position = 'absolute';
      this.canvas.style.left = '0px';
      this.canvas.style.top = '0px';
    }
  }]);

  return Game;
}();

exports.default = new Game();
},{"./Sprite":8,"./SpriteSheet":9,"./GameBoard":6,"./PlayerShip":12,"./Level":7,"./GamePoints":13,"./TitleScreen":10,"./Starfield":11,"../sprites":4}],3:[function(require,module,exports) {
"use strict";

var _sprites = require("./sprites");

var _sprites2 = _interopRequireDefault(_sprites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  require('./components/Game');
});
},{"./sprites":4,"./components/Game":5}],2:[function(require,module,exports) {
"use strict";

require('./src');
},{"./src":3}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://' + window.location.hostname + ':56547/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,2])