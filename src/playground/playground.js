Function.prototype.myBind = function(...args) {
    const [context, ...params] = args;
    const _this = this;
    return function(...moreParams) {
        const overrideContext = this == undefined || this == globalThis ? context : this;
        _this.call(overrideContext, ...params, ...moreParams);
    }
}

function myFun(...args) {
    console.log("this", this);
    console.log("args", ...args)
}

const bounded1 = myFun.myBind({name: "Anindya"}, 1,2,3,4);

bounded1.call({name: "Sanchita"}, 5,6,7,8)