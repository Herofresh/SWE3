import Dog from "./models/dog";
import Cat from "./models/cat";

const bello = new Dog({
  name: "bitch",
  age: 45,
  crazy: false,
  fuck: { gay: "yap" }
});
const catto = new Cat("catto", 12, "grau");

console.log(bello, catto);
console.log("CatObject:", Cat.ORM);

Dog.ORM.syncColumDef(bello);
Dog.ORM.sync();
console.log("DogObject:", Dog.ORM);
Dog.ORM.create(null, bello);

let dogs = Dog.ORM.allObjects().then(data => {
  console.log("DATA", data);
});
