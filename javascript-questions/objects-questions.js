// Basic Object Operations (1-20)

// Given {name: 'John', age: 30}, access and return the name property.

// function getName(obj) {
//   return obj.name;
// }

// console.log(getName({ name: "John", age: 30 }));

// Given {a: 1, b: 2, c: 3}, return an array of all keys.

// function arrayKeys(obj) {
//   return Object.keys(obj);
// }

// console.log(arrayKeys({ a: 1, b: 2, c: 3 }));

// Given {x: 10, y: 20, z: 30}, return an array of all values.

// function arrayOfValues(obj) {
//   return Object.values(obj);
// }

// console.log(arrayOfValues({ x: 10, y: 20, z: 30 }));

// Given {name: 'Alice', age: 25}, add a new property city: 'NYC'.

// function addProperty(obj) {
//   obj.city = "NYC";
//   return obj;
// }

// console.log(addProperty({ name: "Alice", age: 25 }));

// Given {a: 1, b: 2, c: 3}, delete the property b.

// function delProperty(obj) {
//   delete obj.b;
//   return obj;
// }

// console.log(delProperty({ a: 1, b: 2, c: 3 }));

// Given {firstName: 'John', lastName: 'Doe'}, check if property age exists.

// function propertyExist(obj) {
//   return "age" in obj;
// }

// console.log(propertyExist({ firstName: "John", lastName: "Doe" }));

// Given {x: 5, y: 10}, update the value of x to 15.

// function updateValue(obj) {
//   obj.x = 15;
//   return obj;
// }

// console.log(updateValue({ x: 5, y: 10 }));

// Given {name: 'John', age: 30, city: 'NYC'}, count the number of properties.



// Given {a: 1, b: 2} and {c: 3, d: 4}, merge them into one object.
// Given {name: 'John', age: 30, city: 'NYC'}, create a copy of the object.
// Given {a: 1, b: 2, c: 3}, convert to an array of [key, value] pairs.
// Given [['a', 1], ['b', 2]], convert to an object.
// Given {name: 'John', age: 30}, check if the object is empty.
// Given {a: 1, b: 2, c: 3}, return a new object with only keys a and c.
// Given {name: 'JOHN', age: 30}, convert the name to lowercase.
// Given {x: 10, y: 20}, swap the key-value pairs to get {10: 'x', 20: 'y'}.
// Given {a: 1, b: 2, c: 3}, double all values.
// Given {name: 'John', age: null, city: 'NYC'}, remove properties with null values.
// Given {user: {name: 'John', address: {city: 'NYC'}}}, access the nested city property.
// Given {a: 1, b: 2, c: 3}, check if property b has value 2.

// Object Transformations (21-40)

// Given {a: 1, b: 2, c: 3}, create a new object where all values are squared.
// Given {firstName: 'John', lastName: 'Doe'}, create a new object with a fullName property.
// Given {price: 100, tax: 0.1}, add a new property total with price + tax calculated.
// Given {name: 'john', age: 30}, capitalize the first letter of name.
// Given {a: 'hello', b: 'world'}, convert all string values to uppercase.
// Given {x: 5, y: 10, z: 15}, create a new object with only values greater than 7.
// Given {name: 'John', age: 30, salary: 50000}, convert all number values to strings.
// Given {a: 1, b: 2, c: 3}, prefix all keys with 'prop_'.
// Given {temp_name: 'John', temp_age: 30}, remove 'temp_' prefix from all keys.
// Given {a: [1, 2], b: [3, 4]}, flatten all array values into single arrays.
// Given {name: 'John Doe', age: 30}, split name into firstName and lastName properties.
// Given {x: 10, y: 20, z: 30}, create a new object with keys and values swapped.
// Given {a: 1, b: 2, c: 1}, remove duplicate values keeping first occurrence.
// Given {user: 'john', pass: '1234'}, hash or transform the pass value.
// Given {date: '2024-01-01'}, convert the date string to a Date object.
// Given {price: '100', quantity: '5'}, convert all string numbers to actual numbers.
// Given {a: 1, b: undefined, c: 3}, remove properties with undefined values.
// Given {name: 'John', tags: 'js,react,node'}, split tags into an array.
// Given {a: 1, b: 2}, add a timestamp property with current time.
// Given {value: 100}, add properties for 10% and 20% of value.

// Filtering & Validation (41-60)

// Given {a: 1, b: 2, c: 3, d: 4}, create a new object with only even values.
// Given {name: 'John', age: 30, city: 'NYC', country: 'USA'}, keep only name and age.
// Given {a: 'apple', b: 'banana', c: 'apricot'}, keep only values starting with 'a'.
// Given {x: 10, y: 20, z: 5}, remove properties where value is less than 10.
// Given {name: '', age: 0, city: 'NYC'}, remove falsy values.
// Given {a: 1, b: 2, c: 3}, keep only properties where key length is 1.
// Given {score1: 80, score2: 90, name: 'John'}, keep only number values.
// Given {data: [1, 2], info: 'test', items: [3, 4]}, keep only array values.
// Given {a: 1, b: 2, c: 3, d: 4, e: 5}, keep first 3 properties.
// Given {admin: true, user: false, guest: true}, keep only true values.
// Given {name: 'John', age: 30, salary: 50000}, check if all values are truthy.
// Given {a: 1, b: 2, c: 3}, check if any value is greater than 2.
// Given {name: 'John', age: 30}, validate that name exists and age is a number.
// Given {email: 'test@test.com', age: 25}, check if email contains '@'.
// Given {a: 1, b: 2, c: 3}, verify all values are numbers.
// Given {min: 10, max: 5}, validate that max is greater than min.
// Given {password: '123'}, check if password length is at least 8 characters.
// Given {items: []}, check if items array is not empty.
// Given {x: 10, y: 20}, check if sum of values equals 30.
// Given {name: 'John', age: 17}, check if age is 18 or older.

// Nested Objects (61-80)

// Given {user: {name: 'John', age: 30}}, flatten to {user_name: 'John', user_age: 30}.
// Given {a: {b: {c: 3}}}, safely access the deeply nested value.
// Given {user: {profile: {name: 'John'}}}, update the nested name to 'Jane'.
// Given {data: {items: [1, 2, 3]}}, add a new item to the nested array.
// Given {settings: {theme: 'dark', lang: 'en'}}, merge with {settings: {lang: 'fr', notifications: true}}.
// Given {a: {x: 1}, b: {y: 2}}, merge all nested objects into one level.
// Given {user_name: 'John', user_age: 30}, nest under user property.
// Given {a: {b: 2, c: 3}}, sum all nested values.
// Given {data: {user: {name: 'John'}}}, check if nested name exists.
// Given {a: {b: {c: {d: 4}}}}, count the depth of nesting.
// Given {config: {db: {host: 'localhost', port: 5432}}}, extract only the db object.
// Given {user: {addresses: [{city: 'NYC'}, {city: 'LA'}]}}, get all cities.
// Given {a: {x: 1, y: 2}, b: {x: 3, y: 4}}, sum all x values.
// Given {tree: {left: {value: 1}, right: {value: 2}}}, collect all values.
// Given {person: {name: 'John', pet: {name: 'Max'}}}, check if any nested object has name 'Max'.
// Given {a: {b: null}}, remove null values from nested objects.
// Given {data: {items: [{id: 1}, {id: 2}]}}, find item with id 2.
// Given {config: {api: {url: 'old-url'}}}, deep clone the object.
// Given {a: {b: 1, c: {d: 2}}}, convert to a flat object with dot notation keys.
// Given {'a.b.c': 3, 'a.b.d': 4}, convert to nested object structure.

// Array of Objects (81-90)

// Given [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}], create an object with id as key.
// Given [{type: 'a', val: 1}, {type: 'b', val: 2}, {type: 'a', val: 3}], group by type.
// Given [{name: 'John', age: 30}, {name: 'Jane', age: 25}], find the oldest person.
// Given [{score: 80}, {score: 90}, {score: 85}], calculate average score.
// Given [{id: 1, tags: ['a', 'b']}, {id: 2, tags: ['b', 'c']}], get all unique tags.
// Given [{price: 10, qty: 2}, {price: 5, qty: 4}], calculate total value.
// Given [{name: 'John'}, {name: 'Jane'}, {name: 'John'}], remove duplicate names.
// Given [{a: 1}, {b: 2}, {c: 3}], merge all objects into one.
// Given [{id: 1, active: true}, {id: 2, active: false}], count active items.
// Given [{name: 'John', score: 80}, {name: 'Jane', score: 90}], sort by score descending.

// Advanced Operations (91-100)

// Given {a: 1, b: 2} and {b: 3, c: 4}, deep merge them (b should be 3).
// Given {name: 'John', age: 30, city: 'NYC'}, create a function that freezes the object.
// Given {x: 1, y: 2, z: 3}, implement a map function for objects.
// Given two objects, check if they are deeply equal.
// Given {a: 1, b: {c: 2, d: {e: 3}}}, implement deep clone without using JSON methods.
// Given {name: 'John', getName: function(){}}, separate methods and data properties.
// Given an object, create a proxy that logs all property access.
// Given {a: 1, b: 2, c: 3}, create an immutable version where modifications throw errors.
// Given nested object with circular reference, detect the circular reference.
// Given {a: {b: 1}, c: {d: 2}}, implement a deep freeze that freezes all nested objects.
