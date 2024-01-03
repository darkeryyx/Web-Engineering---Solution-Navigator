//7.1
//1
/**Schreiben Sie eine Funktion curry (von Currying), die eine binäre Funktion und ein Argument nimmt, um daraus eine Funktion zu erzeugen, die ein zweites Argument entgegennimmt. Beispiele: add3 = curry(add, 3); add3(4) ergibt 7 und curry(mul, 5)(6) ergibt 30.*/
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
/**Erzeugen Sie die inc-Funktion mithilfe von addf oder applyf (aus Aufgabe 4.1) und curry, ohne die Funktion inc selbst zu implementieren. inc(x) soll immer x + 1 zurückgeben und lässt sich natürlich auch direkt implementieren. Das ist aber hier nicht die Aufgabe. Vielleicht schaffen Sie es, drei Varianten der inc-Implementierung zu schreiben? */
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
/**Schreiben Sie eine Funktion methodize, die eine binäre Funktion (z.B. add oder mul) in eine unäre Methode verwandelt. Nach Number.prototype.add = methodize(add) soll (3).add(4) genau 7 ergeben. */
function methodize(binaerF){
    return function(y){
            return binaerF(this,y);
    };
}
Number.prototype.add=methodize(add);
console.log((3).add(4));
console.log("-");

//4
/** Schreiben Sie eine Funktion demethodize, die eine unäre Methode (z.B. add oder mul) in eine binäre Funktion umwandelt. demethodize(Number.prototype.add)(5, 6) soll 11 ergeben.*/ 
function demethodize(binaerF){
    return function(x,y){
        return binaerF.call(x,y);
    }
}
Number.prototype.add=function(x){return this+x;}
console.log(demethodize(Number.prototype.add)(5,6));
console.log("-");

//5
/**Schreiben Sie eine Funktion twice, die eine binäre Funktion in eine unäre Funktion umwandelt, die den einen Parameter zweimal weiter reicht. Also z.B. var double = twice(add); double(11) soll 22 ergeben und var square = twice(mul); square(11) soll mul(11,11) === 121 ergeben. */
function twice(binaerF){
    return function(x){
            return binaerF(x,x);
    }
}
var double =twice(add);
console.log(double(11));
console.log("-");

//6
/**Schreiben Sie eine Funktion composeu, die zwei unäre Funktionen in eine einzelne unäre Funktion transformiert, die beide nacheinander aufruft. Also z.B. soll composeu(double, square)(3) genau 36 ergeben. */
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
/**Schreiben Sie eine Funktion composeb, die zwei binäre Funktionen in eine einzelne Funktion transformiert, die beide nacheinander aufruft. Also z.B. composeb(add, mul)(2, 3, 5) soll 25 ergeben. */
function composeb(binaer1,binaer2){
    return function(x,y,z){
        return binaer2(binaer1(x,y),z);
    }
  }
    console.log(composeb(add,mul)(2,3,5));
    console.log("-");

//8
/**Schreiben Sie eine Funktion once, die einer anderen Funktion nur einmal erlaubt, aufgerufen zu werden. Also z.B. add_once = once(add); add_once(3, 4) soll beim ersten Mal 7 ergeben, beim zweiten Mal soll jedoch add_once(3, 4) einen Fehlerabbruch bewirken. */
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
/**Schreiben Sie eine Fabrik-Funktion counterf, die zwei Funktionen inc und dec berechnet, die einen Zähler hoch- und herunterzählen. Also z.B. counter = counterf(10). Dann soll counter.inc() genau 11 und counter.dec() wieder 10 ergeben. */
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
/**Schreiben Sie eine rücknehmbare Funktion revocable, die als Parameter eine Funktion nimmt und diese bei Aufruf ausführt. Sobald die Funktion aber mit revoke() zurückgenommen wurde, führt ein erneuter Aufruf zu einem Fehler. Also z.B.:
temp = revocable(alert);
temp.invoke(7); // führt zu alert(7);
temp.revoke();
temp.invoke(8); // Fehlerabbruch! */
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
/** Schreiben Sie ein "Array Wrapper"-Objekt mit den Methoden get, store und append, sodass ein Angreifer keinen Zugriff auf das innere, private Array hat. Also z.B.:
my_vector = vector();
my_vector.append(7);
my_vector.store(1, 8);
my_vector.get(0); // 7
my_vector.get(1); // 8*/
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