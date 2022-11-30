// function greets(name: string){
//     return 'hello ' + name;
// }

// let greets2 = function(name: string){
//     return 'hello ' + name;
// };

// let greets3 = (name: string) => {
//     return 'hello ' + name;
// };

// let greets4 = (name: string) => 'hello ' + name;

// let greets5 = new Function('name', 'return "hello " + name'); // PROHIBIDO

// function log(message: string, userId?: string){
//     let time = new Date().toLocaleTimeString();
//     console.log(time, message, userId || 'not signed in');
// }

// log('page loaded');
// log('User signed in ', '1232132');


// function sum(numbers: number[]): number {
//     return numbers.reduce((total, n) => total + n, 0);
// }

// sum([1,2,3]);
// console.log(sum([1,2,3]));

// function sumVariadic(){
//     return Array
//     .from(arguments)
//     .reduce((total,n) => total + n, 0);
// }

//sumVariadic(1,2,3);


// function sumVariadicSafe(...numbers: number[]): number{
//     return numbers.reduce((total, n) => total + n, 0);
// }

// console.log(sumVariadicSafe(1,2,3,4),1,2,56,3);



// function add(a: number, b: number): number{
//     return a + b;
// }

// add(10,20);
// add.apply(null, [10,20]);
// add.call(null, 10, 20);
// add.bind(null, 10,20)();

// console.log(add(2,3));
// console.log(add.apply(null, [10,20]), ' apply');
// console.log(add.call(null, 10, 20), ' call');
// console.log(add.bind(null, 10,20)(), ' bind');


// let x = {
//     a(){
//         return this;
//     }
// };
// x.a();
// console.log(x.a());

// let a = x.a;
// a();

// console.log(a());



function* fibonacciGenerator() : IterableIterator<number>{
    let a : number = 0;
    let b : number = 1;
    let c : number = 0;

    while(true){
        // FORMA 2
        yield a;
        [a,b] = [b,a+b];

        // FORMA 1
        // yield c;
        // a = b;
        // b = c;
        // c = a + b;

    }
}


const resultado = fibonacciGenerator();

console.log(resultado.next().value);
console.log(resultado.next().value);
console.log(resultado.next().value);
console.log(resultado.next().value);
console.log(resultado.next().value);
console.log(resultado.next().value);
console.log(resultado.next().value);
console.log(resultado.next().value);
console.log(resultado.next().value);