// class Range {
//     constructor(start, end) {
//       this.start = start;
//       this.end = end;
//     }
//     [Symbol.Iterator]() {
//        let current = this.start;
//        const end = this.end;
//       return {
//         next: () => {
//           if(current <= end) return {value: current++, done: false}
//           return {value: undefined, done: true}
//         }
//       }
//     }
//   }
//   const range = new Range(0, 5);
//   const iterator = range[Symbol.Iterator]();
//   console.log(iterator.next()); //0
//   console.log(iterator.next()) //1
//   console.log(iterator.next()) //2


// class Range {
//     constructor(start, end) {
//       this.start = start;
//       this.end = end;
//     }
//     *[Symbol.iterator]() {
//       let current = this.start;
//       while(current <= this.end) {
//         yield current++;
//       }
//     }
//   }
//   const range = new Range(0, 5);
//   const generator = range[Symbol.iterator]();
//   console.log(generator.next())
//   console.log(generator.next())
//   console.log(generator.next())
//   console.log(generator.next())

// const num = 123
// num = 456;// not allowed
// const str = "blabla";
// str.toUpperCase() // str is still blabla
// // Normal object
// const obj = {id: 1};
// obj.id = 2 // id changes to 2
// // Frozen object
// const obj = Object.freeze({id: 1});
// obj.id = 2; // id is still 1
// delete obj.id // not allowed
// obj.name = 'asovmasfg' // not allowed
// // Sealed object
// const obj = Object.seal({id: 1});
// obj.id = 2; // id changes to 2
// delete obj.id // not allowed
// obj.name = 'asovmasfg' // not allowed
// // Prevent extension
// const obj = {id : 1};
// Object.preventExtensions(obj);
// obj.id = 2 //id changes to 2
// obj.name = 'asovmasfg' // not allowed
// delete obj.id //deleted

Object.defineProperty(Object.prototype, 'myFun', {
    value: () => {
      console.log("This is a frozen function in any object you create in the history of this application")
    },
    writeable: false,
    configurable: false,
    enumerable: false
  })