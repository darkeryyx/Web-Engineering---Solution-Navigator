//4.1 Funktionen
//1.Schreiben Sie eine Funktion identity(), die ein Argument als Parameter entgegen nimmt und dieses als Ergebnis zurück gibt.
function identity(x){
    return x;
} 
console.log(identity(3));

//2. Schreiben Sie eine Funktion identity_function(), die ein Argument als Parameter entgegen nimmt und eine Funktion zurück gibt, die dieses Argument zurück gibt.
function identity_function(x){
    return identity(x);
}
console.log(identity_function(4));

//3. Schreiben Sie zwei binäre Funktionen add und mul, die Summe und Produkt berechnen.
function add(x,y){
    return x+y;
}
console.log(add(3,4));

function mul(x,y){
    return x*y;
}
console.log(mul(3,4));

//4.Schreiben Sie eine Addier-Funktion addf(), so dass addf(x)(y) genau x + y zurück gibt. (Es haben also zwei Funktionsaufrufe zu erfolgen. addf(x) liefert eine Funktion, die auf y angewandt wird.)
function addf(x){
    
    return function (y){
        return x+y;
    }
}
const add3 = addf(3);
console.log(add3(10));

//5.
function applyf(f){
    return function(x){ //wie lokale methodenvariable, bekannt in der ganzen methode, closure function, x wird gemerkt
        //x=4
        return function(y){
            return f(x,y);
        }

    }
}
const addz=applyf(mul);
//console.log(addz);
console.log((addz(4))(6)); //function(y)(6)
/**applyf(mul)
 * -> anonymous(x)
 * anonymous(4)
 * -> anonymous(y)
 * anonymous(6)
 * -> mul(4,6)
 **/

//-----------

//4.2
/**Schreiben Sie die Prototypen Person und Auto in JavaScript, so dass jede Person weiß, welche Autos sie besitzt. 
 * Schreiben Sie eine Funktion conflict(), die feststellt, ob ein Auto von mehr als einer Person besessen wird. */

var Person={
        add_car: function(auto){
            this.autos.push(auto);
        }
};

var Auto={
      add_owner: function(person){
        this.besitzer.push(person);
    
      }
};

var auto1={
    __proto__:Auto,
    marke: 'BMW',
    besitzer:[],
    
};

var auto2={
    __proto__:Auto,
    marke: 'Audi',
    besitzer:[],
    
};

var person1={
    __proto__:Person,
    name: 'Anna',
    nachname: 'Meier',
    autos: [],
    

};

var person2={
    __proto__:Person,
    name: 'Max',
    nachname: 'Mustermann',
    autos: []
};


var person3={
    __proto__:Person,
    name: 'Mira',
    nachname: 'Meier',
    autos: []
};


function conflict(auto){
    return auto.besitzer.length >1;
}


auto1.add_owner(person1);
auto2.add_owner(person2);
auto2.add_owner(person3);

console.log(conflict(auto1));
console.log(conflict(auto2)); 
//------

//4.3 Fibonacci
/**Schreiben Sie im Browser die Fibonacci-Funktion in JS und geben Sie die ersten 2000 Fibonacci-Zahlen 0,1,1,2,3,5,8,13,...
 *  auf der Konsole mit console.log() aus.

Achten Sie auf Performanz: Berechnen Sie jeden Fibonacci-Wert nur einmal. 
Speichern Sie zu diesem Zweck jede berechnete Fibonacci-Zahl in einer Tabelle. */
const fibPaare = new Map();

function fibonacci(n) {
    if (n === 0) {
        return BigInt(0);
    } else if (n === 1) {
        return BigInt(1);

    } else if (fibPaare.has(n)) {
        return fibPaare.get(n);
    } else {
        let wert = fibonacci(n - 1) + fibonacci(n - 2);
        fibPaare.set(n, wert);
        return wert;
    }
}

for (let i = 0; i <= 2000; i++) {
    console.log("fibonacci(" + i + "): " + fibonacci(i));
}

