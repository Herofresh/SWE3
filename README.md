# Javascript ORM

This is a Object Relationship Mapping Framework for Javascript.

### Prerequisites

What things you need to install the software and how to install them:

This Package is specifically for a Node.js + Babel Setup

Add the following devDependencies in the package.json:

```
"devDependencies": {
    "@babel/cli": "^7.7.0",
    "@babel/core": "^7.7.2",
    "@babel/node": "^7.8.0",
    "@babel/plugin-proposal-decorators": "^7.8.0",
    "@babel/preset-env": "^7.7.1",
    "nodemon": "^2.0.2"
  }
```

jsconfig.json should look like this

```
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "module": "commonjs",
    "target": "esnext"
  },
  "exclude": ["node_modules"]
}
```

.babelrc should look like this

```
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}
```

To Adjust the DB Configuration you have to go into the Package in the node_modules and change the dbConfig.js

### Installing

```
npm install js-orm-rivera

or

yarn add js-orm-rivera
```

### Usage

Example Class

```
import { dbEntity } from "../config/orm";   // import the dbEntity Decorator

@dbEntity("DogHeaven")                      //Optional Table Name
class Dog {
  constructor(obj) {
    obj && Object.assign(this, obj);
  }
}

export default Dog;
```

Example Usage

```
import Dog from "./models/dog";

const bello = new Dog({
  name: "Doggo",
  age: 4,
  crazy: false,
  favoriteToy: { color: "red" }
});

Dog.ORM.syncColumDef(bello);                        //define the Table
Dog.ORM.sync();                                     //generate the Table in the Database
Dog.ORM.create(null, bello);                        //create new Dog in Table

let dogs = Dog.ORM.allObjects().then(data => {      //get all Dogs
  -Code here
});

Dog.ORM.destroy(1);                                 //destroy Dog with Id 1

```

## License

This project is licensed under the MIT License - see the [LICENSE.](LICENSE) file for details
