//7.1
//1
function add(x,y){
    return x+y;
}
function mul(x,y){
    return x*y;
}

function curry(binaerF, x){
    return function(y){
        return binaerF(x,y);
    };
}
const add3=curry(add,3);
    console.log(add3(4));
const mul5 = curry(mul, 5);
    console.log(mul5(6));
console.log("-");

//2 FUNKTIONIERT NO NET
function addf(x){
    return function (y){
        return x+y;
    }
}
function applyf(f){
    return function(x){ //wie lokale methodenvariable, bekannt in der ganzen methode, closure function, x wird gemerkt
        //x=4
        return function(y){
            return f(x,y);
        }
    }
}

var inc = curry(applyf(addf), 1);
var inc = curry(addf, 1);
    console.log(inc(3));
console.log("-");

//3 
function methodize(binaerF){
    return function(y){
            return binaerF(this,y);
    };
}
Number.prototype.add=methodize(add);
console.log((3).add(4));
console.log("-");
//4
function demethodize(binaerF){
    return function(x,y){
        return binaerF.call(x,y);
    }
}
Number.prototype.add=function(x){return this+x;}
console.log(demethodize(Number.prototype.add)(5,6));
console.log("-");
//5
function twice(binaerF){
    return function(x){
            return binaerF(x,x);
    }
}
var double =twice(add);
console.log(double(11));
console.log("-");

//6
function composeu(unaer1,unaer2){
    return function(x){
        return unaer2(unaer1(x))
    }
}
var double = function (x) {
    return x * 2;
  };
  
var square = function (x) {
    return x * x;
  };

  console.log(composeu(double,square)(3));
  console.log("-");

//7
function composeb(binaer1,binaer2){
    return function(x,y,z){
        return binaer2(binaer1(x,y),z);
    }
  }
    console.log(composeb(add,mul)(2,3,5));
    console.log("-");

//8
function once(f){
    let alreadyCalled=false;
    return function(x,y){
        if(alreadyCalled){
            throw new Error("Funktion wurde bereits aufgerufen!");
        }else{
            alreadyCalled=true;
            return f(x,y);
        }
    }
}
add_once= once(add);
    console.log(add_once(3,4));
    try {
        console.log(add_once(3,4)); 
      } catch (error) {
        console.error(error.message);
      }
 

//9
function counterf(x){

    const counter={
    inc: function(){
        return ++x;
    },

    dec: function(){
        return --x;
    },
};
    return counter;
}
counter = counterf(10);
console.log(counter.inc());
console.log(counter.dec());
console.log("-");

//10
function revocable(func) {
    let isRevoked = false;
  
    const invoke = function (...args) {
      if (!isRevoked) {
        return func(...args);
      } else {
        throw new Error("Die Funktion wurde zurückgenommen.");
      }
    };
  
    const revoke = function () {
      isRevoked = true;
    };
  
    return {
      invoke: invoke,
      revoke: revoke
    };
  }
  
  const temp = revocable(console.log);
    console.log(temp.invoke(7)); // führt zu alert(7);
    temp.revoke();
  try {
    console.log(temp.invoke(8)); 
  } catch (error) {
    console.error(error.message);
  }
  console.log("-");

//11 noch nicht ganz fehlerfrei
function vector() {
    const array = []
 
     return {
        get() {
            return array
        },
         append(x) {
            array.push(x)
         },
         store(...args) {
            args.forEach(el => {
                this.append(el)
            })
         }
     }
 }
my_vector = vector();
my_vector.append(7);
my_vector.store(1, 8);
console.log(my_vector.get(0)); // 7
console.log(my_vector.get(1)); // 8