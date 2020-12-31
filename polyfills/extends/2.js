/**
 * 构造函数继承
 */

function Parent () {
  this.name =  ['Richard', 'Kevin'];
}

function Child(age) {
  this.age = age;
  Parent.apply(this)
}

var instance =  new Child(24);

console.log(instance.name);
console.log(instance.age);