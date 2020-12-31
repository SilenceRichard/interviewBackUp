/**
 * 组合继承
 * 原型链继承： 引用变量共享 
 * 构造函数继承： 多个实例，不同方法，相同功能
 */

 function Parent() {
   this.name = ['Richard', 'Kevin'];
 }

Parent.prototype.sayName = function () {
  console.log(this.name)
}

 function Child(age) {
   Parent.apply(this);
   this.age = age;
 }

 Child.prototype = new Parent();
 // 构造函数由Parent变为Child
 Child.prototype.constructor = Child;

 var instance = new Child(25);

instance.sayName();
console.log(instance.age);