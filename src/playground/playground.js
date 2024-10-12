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

// Object.defineProperty(Object.prototype, 'myFun', {
//     value: () => {
//       console.log("This is a frozen function in any object you create in the history of this application")
//     },
//     writeable: false,
//     configurable: false,
//     enumerable: false
//   })


// const debounce = (func, delay) => {
//     let timeoutId = null
//     return (...args) => {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => {
//             func(...args);
//         }, delay)
//     }
// }

// const throttle = (func, delay) => {
//     let isThrottled = false;
//     return (...args) => {
//         if(isThrottled) return;
//         isThrottled = true;
//         func(...args);
//         setTimeout(() => (isThrottled = false), delay)
//     }
// }


// const el = document.getElementById('stest');
// const observer = new MutationObserver(el, {
//     childList: true,
//     attributes: true,
//     subTree: true
// })

// const callback = (mutatioList, _) => {
//     mutatioList.forEach(mutation => console.log(mutation))
// }
// observer.observe(callback)

// const sentinel = document.getElementById('sentinel');
// const intersectionObserver = new IntersectionObserver(el, {
//     rootMargin: 0,
//     threshold: 1.0
// })
// const intersectionCallback = (mutationList) => {
//     const sentinel = mutationList[0]
//     if(sentinel.isIntersecting) {
//         //fetchMoreItems();
//     }
// }
// intersectionObserver.obnserver(intersectionCallback);

// const tag = (str, ...values) => {
//     console.log(str, values);
// }

// tag`Hello ${2354645}  welcome ${2323535} my channel`



const functionAnyName = (str, ...values) => {
    // str = ['some string sdfksdngnngfsndfnsdfsf ', 'avnnfsdmfsmdfm', 'sdgsgsdgsgd'] // splitby values
    // values = ['some value', 'some other value']
    console.log(str, values);
}

functionAnyName`some string sdfksdngnngfsndfnsdfsf ${'some value'} avnnfsdmfsmdfm ${'some other value'} sdgsgsdgsgd`
