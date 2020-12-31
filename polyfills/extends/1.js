/**
 * 原型链继承
 */
function Parent() {
  this.name = ['Richard', 'Kevin'];
}

function Child() {

}

Child.prototype = new Parent();

var instance = new Child();

console.log(instance.name);