var sum = function() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

// console.log(sum(1, 2, 3, 4));
// console.log(sum(1, 2, 3, 4, 5));

Function.prototype.myBind = function(obj) {
   var that = this;
  return function() {
    that.apply(obj, arguments)
  }
}

var cat = {
  name: "bob"
};

var dog = {
  name: "bill"
};

var printName = function(greeting) {
  console.log(greeting + this.name);
}

var printCatName = printName.myBind(cat);
var printDogName = printName.myBind(dog);
// printCatName("hello, ");
// printDogName("welcome, ");

// var curriedSum = function(length) {
//   var numReturns = length;
//   var total = 0;
//
//   function func(num) {
//     if (numReturns === 1) {
//       return total + num;
//     } else {
//       total += num;
//       numReturns--;
//       return func;
//     }
//   }
//
//   return func;
// }

var curry = function(callback, length) {
  var args = [];

  function func() {
    args.push(arguments[0]);
    if (args.length >= length) {
      return callback.apply(null, args);
    } else {
      return func;
    }
  }
  return func;
}

var curriedSum = curry(sum, 4);
// console.log(curriedSum(5)(30)(20)(1));

Function.prototype.inherits = function(obj) {
  function Surrogate() {}
  Surrogate.prototype = obj.prototype;
  this.prototype = new Surrogate();
}

function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log("nom nom nom");
}

function Cat(name) {
  Animal.call(this, name);
  this.speak = function(){
    console.log("meow");
  };
}

Cat.inherits(Animal);

var newCat = new Cat('mrcat');

console.log(newCat.name);
newCat.speak();
newCat.eat();






