import Dog from "./models/dog";
import Cat from "./models/cat";

const bello = new Dog("bitch", 45);
const yello = new Dog("hoe", 45);
const catto = new Cat("catto", 12, "grau");

console.log(bello, yello, catto);
console.log("DogObject:", Dog.ORM);
console.log("CatObject:", Cat.ORM);

Dog.ORM.syncColumDef(bello);

Dog.ORM.sync();
console.log("Type Bello:", bello instanceof Dog);
Dog.ORM.create(null, bello);

console.log("DogObject:", Dog.ORM);

Cat.ORM.syncColumDef(catto);
console.log("CatObject:", Cat.ORM);
Cat.ORM.sync();
Cat.ORM.create(null, catto);
