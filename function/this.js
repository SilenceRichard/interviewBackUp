// 总结，函数中的this，与执行上下文有关，通过查看()左边所属的对象去确定

/**
 * this in function
 */
var boat = {
  size: "normal",
  boatInfo: function () {
    console.log(this === boat);
    console.log(this.size);
  },
};

boat.boatInfo(); // this === boat

console.log("--object this----------------------");
/**
 * -----------------------------
 */
var bigBoat = {
  size: "big",
};

bigBoat.boatInfo = boat.boatInfo;
bigBoat.boatInfo(); // this === bigBoat

console.log("-global this------------------------");
/**
 * -----------------------------
 */
var module = {
  x: 24,
  getX: function () {
    console.log(this.x);
  },
};
module.getX(); // this === module
const newGetX = module.getX;
newGetX(); // this === window/globalThis

/**
 * -----------------------------
 */
console.log("-new this------------------------");
var SaveThis;
function Constr() {
  SaveThis = this;
}
// 构造函数中的this指向新的inst对象
var inst = new Constr();
console.log(SaveThis === inst); // true
// 用new 关键字去执行构造函数， 构造函数中的this指向新建的实例对象

/**
 * -----------------------------
 */
console.log("-this in setTimeout------------------------");

var obj = {
  func: function () {
    console.log(this); // object
    setTimeout(function () {
      console.log(this); // global
    }, 0);
  },
};
obj.func();
// obj,此时的this是obj对象
// window

/**
 * -----------------------------
 */
console.log("-this in arrow notation------------------------");
// 箭头函数中的this,谁创建的箭头函数，指向谁（不改变）
var obj2 = {
  say: function () {
    var f1 = function () {
      console.log(this === globalThis); // obj2
      setTimeout(() => {
        console.log(this); // obj2
      });
    };
    f1();
  },
};
obj2.say();
/**
 * 箭头函数没有this的绑定，必须通过查找作用链来决定其值。如果箭头函数被非箭头函数包含，则this绑定的是
 * 最近一层的非箭头函数的this；否则。this的值会被设置为undefined。
  
 * 箭头函数在定义的时候它所处的环境相当于是window, 所以在箭头函数内部的this函数指向window
 */
var obj3 = {
  say: function () {
    var f1 = function () {
      console.log(this === globalThis); // true
      setTimeout(() => {
        console.log(this === globalThis); // trues
      });
    };
    f1();
  },
};
obj3.say();
