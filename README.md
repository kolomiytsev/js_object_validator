#Library for object validation

Javascript library for object validation that allows to add custom validation schemes or use default scheme values.
Currently available - uuid, string, date and number validation. 

Methods: 

 - registerModel(modelName: String,model: Object)
   *register model which will be used to validate entity object*
 - validate(modelName: String, entity: Object)  
   *validate entity using modelName (that was declared earlier)*
 - dispose()
   *unregister all models*

Example: 
```javascript
myLibrary.registerModel("user", {
  id: { type: "uuid", required: true }, 
// property "id" must be uuid and always must be present in given entity
  name: { type: "string", min: 1, max: 64 }, 
// property “name” must be String and contain 1-64 characters, optional
  createdAt: { type: "date" }, 
// property "createdAt" must be a date, optional
  counter: { type: "number", min: 0, max: 64 } 
// property "counter" must be a Number and greater or equal to Zero, optional
});

myLibrary.validate("user", {
  id: "3d9d8262-2956-4078-ade9-a2f687eb5f60",
  name: "John Doe",
  createdAt: new Date(),
  counter: 0
}); // true

myLibrary.dispose()
```