Function.prototype.mybind = function(...args) {
   let _this = this;
   const context = args[0]; 
   let params = args.splice(1);
   return function(...moreArgs) {
     _this.apply(context, [...params, ...moreArgs])
   }
}

Function.prototype.myCall = function(...args) {
    let _this = this;
    cb = _this.bind(this, ...args)
    cb();
 }

function blabla(...args) {
    console.log(args)
}

const a = blabla.mybind(null, 1,2,3)
a(5,6,7);
blabla.myCall(1,2,3,4,5,6)