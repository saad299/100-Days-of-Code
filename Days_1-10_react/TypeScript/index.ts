// number
let age: number = 30
console.log(age)

// boolean
let abc = false
console.log(abc);

// union type
let name: string | number = 123
console.log(name);

// arrays
let scores: number[] = [80, 90, 100];
console.log(scores[0]);
let fruits: string[] = ["Apple", "Banana", "Mango"];
console.log(`${fruits[2]} + ${fruits[1]}`);

// generics
let id: Array<number|string> = [1, 2, 3, "Saad"]
console.log(id);

// typing objects
let user: {name: string, age: number} = {
    name: "Saad",
    age: 20
};
console.log(user.name);
console.log(user.age);

function greet(name: string): number | string {
    return `Hello, ${name}`
}
console.log(greet("Saad"));