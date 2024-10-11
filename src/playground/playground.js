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


class Range {
    constructor(start, end) {
      this.start = start;
      this.end = end;
    }
    *[Symbol.iterator]() {
      let current = this.start;
      while(current <= this.end) {
        yield current++;
      }
    }
  }
  const range = new Range(0, 5);
  const generator = range[Symbol.iterator]();
  console.log(generator.next())
  console.log(generator.next())
  console.log(generator.next())
  console.log(generator.next())