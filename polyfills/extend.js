/***
 * 原型链继承
 * 缺点：引用对象共享
 */
// function Parent0(age) {
//   this.names = ['A',' B', 'C'];
//   this.age = age;
// }
// function Child() {

// }
// Child.prototype = new Parent0(24);

// var instance = new Child();
// console.log(instance.age, instance.names);

/**
 * 构造函数继承(经典继承)
 * 缺点：每个实例有独立的方法，他们的功能是相似的
 */
// function Parent(age) {
//   this.names = ['A', 'B', 'C'];
//   this.age = age;
// }

// function Child() {
//   var args = Array.prototype.slice.call(arguments);
//   Parent.apply(this, args);
// }

// var instance = new Child('Richard');
// var instance2 = new Child();

// instance.names.push('D');
// console.log(instance.names);
// console.log(instance2.names);
// console.log(instance.age);

