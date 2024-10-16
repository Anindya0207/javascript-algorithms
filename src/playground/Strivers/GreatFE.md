### Block scoped elements

- Block scoped elements are defined by padding, height, width, border
- They `will take the height of the content + padding` if no height is specified unless `it's floated`
- They `will take the width of the parent container - padding` if no width is specified, unless `max-width is specified or it'sa floated element`
- table, input etc have inherent width and they dont take the parent container width
- span is not a block scoped element hence it will not expand width basis the parent width

--------------------------------------------------------------------------------------------------------------------------------

### box-sizing: border-box vs box-sixing: content-box

- content-box means the size of any box scoped element is determined only by it's content height and width
- border-box means the height also takes the vertical padding and border height and width also considers the horizontal padding and border width
- Advantage: it resonates better with how designers imagine the content on grids. 

--------------------------------------------------------------------------------------------------------------------------------

### CSS Specificity

How Browser compiler give weigthage to different CSS selectors . These are often represented as a,b,c,d

- a: inline style
- b: ID selector
- c: class selector
- d: element selector
- To override eveything we can use !important. The resulting specificity is not a single numerical score
- It is a array of values where left most values are having most precendence or highest specificity 
- So 0 , 1, 0, 1 is having more specificity than 0, 0, 10, 10 (means 10 class selector and 10 element selector)

--------------------------------------------------------------------------------------------------------------------------------

### display

- none: doesn't display anything, doesn't take any width or height in the DOM
- block: renders a block scoped element with width and height
- inline: renderes a inline element which does npt take the whole width and can be clubbedwith another inline/inline-block element
- inlin-block: same as inline but allowes to set width and height
- flex: display a flexible box layout
- grid: like a grid layout
- table: like < table > element
- table-row: like < tr > element
- table-cell: liek < td > element
- list-item: like < li > element

--------------------------------------------------------------------------------------------------------------------------------

### positioning

- static - default positioning for an element. top,left, right, left, zIndex doesn't appluy
- relative - positions itself relative to self leaving a space for the element if it was not positioned
- absolute - breaks the flow of the page  and positions relative to the nearest relatively positioned ancestor or the container block / body
- fixed- breaks the flow of the page and positions relative to the view port
- sticky - behaves like relative until a threshold and then behaves like fixed.

--------------------------------------------------------------------------------------------------------------------------------

### difference between display block, inline-block  and inline

- block `takes the whole width` doesn't tolerate any more element in the same row, inline-block and inline allows
- block allows `height and width`. inline-block also allows. inline does not
- block take the parent `container width`, inline-block and inline depends on content
- block doesn't allow `veritical-align`, others allow
- `padding and margin is allowed by block`, inline-block also allows but inline only allows horizontal padding, vertical depends on line-height

--------------------------------------------------------------------------------------------------------------------------------

### Hoisting

It's a term to explain how Javascript engine compiles the variable, class and method declarations and definition. 

- JS engine in compile time, moves the declarations to the top of the execution block and keeps the initilisation in the original place. 
- variables and methods declared with `var` are created when the `containing environment record` is created but inilised as undefined
- but variables and methods declared with `let` and `const` are created when the `containing environemtn record` is created but they are not inilisated until their `lexical binding` are done. so under the hood they are assigned a value `value unavailable`. Hence if accessed before initilisation, they give a `Reference error`
- `function() {}` are hoisted and can be used before initilisation
- `foo.blabl() ... import foo from './fooo'` is also allowed

--------------------------------------------------------------------------------------------------------------------------------

### var vs let vs const

Behavior	                var	                    let	                const
Scope	                    Function or Global	    Block	            Block
Initialization	            Optional	            Optional	        Required
Redeclaration	            Yes	                    No	                No
Reassignment	            Yes	                    Yes	                No
Accessing before declaration undefined	            ReferenceError	    ReferenceError

--------------------------------------------------------------------------------------------------------------------------------

### Event loop

the indefinite Javascript engine to run synchronous and asynchornous tasks given JS is single threaded is event loop. The orderof execution
of event loop is 

- JS first ads all the sync operations in te call stack
- JS then executes all the async operations
- The callbacks of priomises like `then` `catch` `finally`, `MutationObserver`, `enqueueMicroTask()` etc are all micro tasks. JS adds then in micro task queue. 
- JS engine dequeues from this one by one and put in call stack until micro task queue is completely empty.
- post this, JS checks for Web apis liek `setTimeout` `user scroll / click events` and add them in macro task queue
- dequeues and add a macrotask and execute it.
- POst that, it again checks for new microtasks in microtask queue
- this continues indefinitely.
- `MutationObserver` api uses microtask to notify changes on DOM

--------------------------------------------------------------------------------------------------------------------------------

### Event delegation

Its a phenomenon in Javascript to combine multiple events from different child elements by delegating to the one event attached to the parent element.

- So the parent element will have a event listener bind to it. 
- Multiple child events can be dynamically added or removed, but the event delegated to the parent will still work
- When an event gets triggered in the chlld element that gets bubbled up to the parent container where it's handled or there is a listerner for it.
- But it's important from which child element that event is getting triggered. `event.target` will give us that.
- `focus, blur, mouseenter, mouseleave, scroll`etc events don't bubble

--------------------------------------------------------------------------------------------------------------------------------

### this

this keyword is a dynamic reference of the contexrt where a function is executed

Rule 1:
- for a function in which `new` is called like a constructor function, this represents the newly created object instance 
- for a class constructor function also,  this represents the newly created object instance 

Rule 2:
- for `apply` `bind` `call` functions where we are creating a function, this means `arguments`

Rule 3:
- in a member function like `obj.customMethod()` this means the obj whose member function is getting called

Rule 4:
- for a free function scope, this represents the `window` object, in `use strict` mode its `undefined`

- If its a ES6 => function, this will ignore all these and will represent the surrounding scope when the function was created
- If there are multiple rule applies, it takes the order and top order rule takes precedence

```javascript
var obj = {
    value: 'hi',
    printThis: function() {
        console.log(this);
    }
};
var obj2 = {value: 17}
var print = obj.printThis;
obj.printThis(); // this was executed with the object scope, hence it will print obj
print(); // since this was executed in a free function scope it will print window

obj.printThis.call(obj2) // here we have two rules, one .call and another object.method. obvly the call method will take effect so this will print the argument => obj2

new obj.printThis() // here also we have two rules, we are using the function as a function constructor, and we also have obj.method obvly the function constructor takes precedence, and it returns the newly created object instance which is {} since this function printthis does not have any member var.
```

--------------------------------------------------------------------------------------------------------------------------------

### Cookie vs sessionStorage vs localstorage

- Cookie is short lived, specific to domain, same origin, and session. sent in every request. 4KB
- Session storage is for a particular origin and session, persistent across tabs but gone if window is reopened - 5MB. not sent in requests
- localStorage, persistent even after browser is reopened. accessible across all tabs, windows of same origin, iframes if they use the same origin. (5MB)

--------------------------------------------------------------------------------------------------------------------------------

### < script > < script async > < script defer >

- with < script > tag `html parsing gets blocked`, until the script is downloaded and executed. then only the html parsing resumes
- with < script async > the scripts are `downloaded in any order` `parallel to the HTML parsing`. `executed as soon as downlaoded blocking HTML parsing` It should only nbe used with those scripts which are not critical for the initial rendering of the DOM.
- with < script defer> the scripts are `downloaded in order` `parallel to HTML parsing` but it `will execute only after the HTML parsing is completed`. This script is executed after DOM parsing is done and before `DOMContentLoaded` event is triggered.
- Even though these are downloaded with HTML parsing, the execution happens in the main thread. so if the script are computation heavy the UI becomes laggy. this problem can be solved with `web worker` and offloading the scripts to a different thread.

--------------------------------------------------------------------------------------------------------------------------------

### .bind using call or apply

- bind allows to set a `this` context to a function with some initial arguments and allows to let it execute later with more arguments
- It allows method borrowing, which means `var obj1 = {name : "Anindya", getName: function() {return this.name}}` if we call `obj1.getName.bind({name: "Sanchita"})` then the this gets changed inside the borrowed method. It will return Sanchita instead of Anindya.

```javascript
Function.prototype.mybind = function(...args) {
   let _this = this;
   const context = args[0]; 
   let params = args.splice(1);
   return function(...moreArgs) {
     _this.call(context, ...params, ...moreArgs)
     // OR
     // _this.apply(context, [...params, ...moreArgs])
   }
}

function blabla(...args) {
    console.log(args)// [1,2,3,5,6,7]
}

const a = blabla.mybind(null, 1,2,3)
a(5,6,7);
```

```javascript
Function.prototype.myCall = function(...args) {
    let _this = this;
    cb = _this.bind(this, ...args)
    cb();
 }
```

--------------------------------------------------------------------------------------------------------------------------------

### where to add < link > tags and < script >

- < link > should be added in < head > tag to do progressive rendering
- this way, HTML and css will be parsed together and give the users the optimal page experience, otherwise users will see unstyled page 
- if we put stylesheet in bottom of the html, some browser blocks rendering to acvoid repainting if the style changes
- This causes blank screen.
- < script > tag should be placed on top of body, such that it blcoks the HTML parsing till completely executed. If we dont' do this, HTML might be shown to users before sript is loaded and if there is some conditional rendering in the script it won't work.
- if we want to use < script defer > we can use it inside head since it will only be parsed after the entire DOM is loaded.

--------------------------------------------------------------------------------------------------------------------------------

### How browser applies selector

- It aplies from right to left. So for "p span" it searches for all span tags and then traverseup until it finds a p tag.
- the distance between the chiuld to parent determines how fast browser will take time to paint and style the DOM

--------------------------------------------------------------------------------------------------------------------------------

### translate vs position: absolute

- translate does not alter the original position fo rthe element `position: relateive` it just triggers compositions.
- position absolute breaks the flow of the page and and impacts the other elements position also.
- translate causes browser to assign a GPU but position absolute repaints the DOm and bnrowser has to allocate a CPU 
- Hence translate is always optimal

--------------------------------------------------------------------------------------------------------------------------------

### Prototypal inheritance

- All javascript object has a attribute called `[[Prototype]]` or `__proto__` which is inherited from the parent object, if not then implicitly from `Object` object
- In JS if we have a function we can add a prototype member. like 

```javascript
function Human(name) {
  this.name = name;
}

Human.prototype.sayHello = function() {
  console.log("Human can say hello " + this.name);
}
```
- Now if we create an object using this constructor function Human `new Human('Anindya')` then the object will have `sayHello` method and all the other implicit methocs like `toString` which is inherited from Object
- Now, lets say we do 

```javascript
function Person(name, gender) {
  Human.call(this, name);
  this.gender = gender;
}
```
- This means, we are calling the constructor of Human from Person constructor, hence the Person constructor will have the `name` and `gender` both attributes
- Now let's say we do either of these

```javascript
Person.prototype = Object.create(Human.prototype);
// OR
Object.setPrototypeOf(Person, Human);
//OR
Object.setPrototypeOf(Person.prototype, Human.prototype);
```

- This way the Person object will have the `sayHello` member function also as its there in it's prototype chain
- But let's say we do 
```javascript
const blabla = Object.create(Human.prototype);
```
- Here blabla will definitely have `sayHello` function but for it, `name` and `gender` will be undefined. because it was not created using new keyword
- But if I do `anindya = new Human('Anindya', 'male')` then I will have everything

Read: https://www.greatfrontend.com/questions/quiz/explain-how-prototypal-inheritance-works

- Now in ES6 we generally write constructor 

```javascript
class Human {
  constructor(name) {
    this.name = name;
  }
  sayHello = function() {
    console.log("Hello from " + +this.name)
  }
}

class Person extends Human{
  constructor(name, gender) {
    super(name)
    this.gender = gender;
  }
  sayGoodBye = function() {
    console.log("Bye from " + +this.name + this.gender)
  }
}

const anindya = new Person('Anindya', 'male')
```
- Notice here Person extended Human but it's important to call super. this is equivalent to `Human.call(this, name)` which we did earlier in ES5 syntax
- Now we call the parent constructor by `super(name)` and pass name to set it in it's constructor
- but we can't access this before calling this as it extends a class. we will get an error like `// This will throw an error because 'this' cannot be passed before calling 'super()'`

--------------------------------------------------------------------------------------------------------------------------------

### Different ways to create Object

- {} -> object literal
- a = new Object() a.name = "asfasf"
- Object.create() -> using a prototype
- constructor functions new Class('Aninfya') 

--------------------------------------------------------------------------------------------------------------------------------

### Closures

- Closure is a phenomenon `where a function can access it's lexical scope even it's executed outside of it's lexical scope`
- JS closure works in this way that it remembers the variables that was accessible when the function was initialised. It has the access of those scope vairables even if it's executed after and outside of that scope

```javascript
function createCounter() {
    let counter = 0;
    return function() {
        counter++;
        return counter;
    }
}
const counter = createCounter();
counter() ; // 1;
counter(); //2
```

- This is used to `encapisulate `private variables such that those are not accessible outside the functiomn scope
- in `Function programming` and `modules pattern` its useful

--------------------------------------------------------------------------------------------------------------------------------

### Event bubbling

- When the event bubles up from target node all the way to the root of the DOM that is called event bubbling
- Bubbling phase happens evemn `after the capture` phase where the root slement captures the element and then it drills down to the chiuld elements
- We can stop bubbling at any DOM hierarchy by oing `e.stopPropagation`
- To delegate event, we can have only one parent handling all the child events which will anyway bubble up to the parent based on the `event.target.id ` but it might lead to unintended behaviour if the event propagation is not handleds properly.

--------------------------------------------------------------------------------------------------------------------------------

### Event capture

- the Event phase are three- 
    - Capture phase : the event gets captured by the ancestor node
    - Target phase: the event reached the target DOM element
    - bubble phase: the event bubbled from the target element all the way to the top / ancestor node
- So even before bubbling happens capture event listereners are triggered

```javascript
const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.addEvenetListener('click' , () => {
    console.log("parent captured the event")
}, true); // this true is the important part  which enables evnet capture
```
- example: when we are designing a dropdown menu and we need to close it on click of the DOM (anywhere) but we don't want that to propagate down to the target modes anywhere within the DOM, we can capture the click event in the body and then do `event.stopPropagation()`

--------------------------------------------------------------------------------------------------------------------------------

### Sync vs Async functions 

- Sync functions are the ones which are executed sequentially and each line is a non blocking call. Hence it executes them in the main thread one by one before releasing the thread
- Async functions are the ones which are executed asynchronously. They often have a callback or resolver which gets called after the execution of the async job is done.
- Async functions though asyn in nature, are also run in the main thread as we have observed in event loop
- To offload them in different thread we can use `web workers`
- `Web worker is executed in different thread and they can talk between each other by passing messages. `
- `But they do not have any access to the DOM or WEB APIs`

```javascript
//main.js

const worker = new Worker('worker.js');

worker.onMessage = () => {
    console.log('Result from worker:', event.data);
}

worker.postMessage('Start Execution');

// worker.js

self.onMessage = () =>{
    const result = computeHeavy();
    return result
}
computeHeavy= () => {...}
```
--------------------------------------------------------------------------------------------------------------------------------

### All kind of Promise pollyfills

```javascript
class MyPromise {
  constructor(executor) {
    this.callbacks = [];
    this.state = 'pending';
    this.value = val;
    const resolve = (val) => {
      if(this.state != 'pending') return;
      this.state = 'fulfilled';
      this.value = val;
      this.callbacks.forEach(cb => cb.onFullfilled(this.value))
    }
    const reject = (val) => {
      if(this.state != 'pending') return;
      this.state = 'rejected';
      this.value = val;
      this.callbacks.forEach(cb => cb.onRejected(this.value))
    }
    try {
      executor(resolve, reject);
    } catch(err) {
      reject(err);
    }
  }

  then = (onFullfilled, onRejected) => {
    return new Promise((resolve, reject) => {
      const handleCallback = (callback, resolveFunc, rejectFunc) => {
         try {
          const result = callback(this.value);
          resolveFunc(result)
         } catch(error) {
          rejectFunc(error)
         }
      }
      if(this.state == 'fulfilled') {
        onFullfilled && handleCallback(onFullfilled, resolve, reject);
      } else  if(this.state == 'rejected') {
        onRejected && handleCallback(onRejected, resolve, reject)
      } else {
        this.callbacks.push({
          onFullfilled: (value) => {
            onFullfilled && handleCallback(onFullfilled, resolve, reject)
          },
          onRejected: (val) => {
            onRejected && handleCallback(onRejected, resolve, reject);
          }
        })
      }
    })
  }

  catch = (onRejected)  => {
    return this.then(null, onRejected)
  }
}

Promise.prototype.myResolve = (value) => {
  if(value && typeof value === 'object' && typeof value.then === 'function') {
    return new Promise((resolve, reject) => {
      value.then(resolve, reject)
    })
  }
  return new Promise(resolve => {
    resolve(value);
  })
} 

Promise.prototype.myReject = (value) => {
  if(value && typeof value === 'object' && typeof value.then === 'function') {
    return new Promise((resolve, reject) => {
      value.then(resolve, reject)
    })
  }
  return new Promise((_, reject) => {
    reject(value);
  })
} 

Promise.prototype.myAll = (promises) => {
  return new Promise((resolve, reject) => {
    let responses = [];
    let completed = 0;
    if(promises.length == 0) {
      resolve([])
    }
    promises.forEach((promise,index) => {
      Promise.resolve(promise).then(res => {
        responses[index] = res;
        completed++;
        if(completed == promises.length) {
          resolve(responses);
        }
      }).catch((err) => {
        reject(err);
      })
    })
  });
}
Promise.prototype.myRace = (promises) => {
  return new Promise((resolve, reject) => {
    if(promises.length == 0) {
      resolve([])
    }
    promises.forEach((promise) => {
      Promise.resolve(promise).then(res => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    })
  });
}
Promise.prototype.myAllSettled = (promises) => {
  return new Promise((resolve) => {
    responses = [];
    settled = 0;
    if(promises.length == 0) {
      resolve([])
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(res => {
        responses[index] = {status: 'fulfilled', value: res}
      }).catch((err) => {
        responses[index] =  {status: 'rejected', value: err}
      }).finally(() => {
        settled++;
        if(settled == promises.length) {
          resolve(responses)
        }
      })
    })
  });
}
```
--------------------------------------------------------------------------------------------------------------------------------

### for..of vs for..in

- for..of iterates over `iterables like array, map, string, obj` while for..in does over `objects and arrays`
- for..of `iterates over the values` while for..in `iterates over indices/keys`
--------------------------------------------------------------------------------------------------------------------------------

### Map vs object

- Map can store `any data type`, it has `size` method, it is `iterable` through it's built in functions. It's ideal for faster operation when the data set is bigger
- object literals can store string or number key value pair, it does not have a built in size method, it's iterable through for..in or for ..of. Ideal for faster access when the data set is smaller

--------------------------------------------------------------------------------------------------------------------------------

### Map vs weakmap

- Map stores key value pair where key are strings and they are persistent till the time the map exists
- Weakmap stores object as keys and they can get garbage collected even if the the weak map is still existing
- It depends on the object is being referenced any where. Based on that, the garbage collector might garbage collect it

--------------------------------------------------------------------------------------------------------------------------------

### Symbol in JS

- Symbols are keywords in javascript which is used to create private properties which then can be used as a property in an object 
- It is guranteed that two symbols will never collide even if the key passed to create the symbols are same like - `const symbol = Symbol('key')` and `const symbol1  = Symbol('key')` then we can say for sure `symbol != symbol1`
- Symbol are` not enumerable`
- Symbol can give a means to create secret immuatable properties which is beneficial for large scale application
- Symbols should be used `with out new keyword` becuase it doesn't have a constructor

--------------------------------------------------------------------------------------------------------------------------------

### Worker

- Workers are background threads in JS which runs out of the main thread minifying the workload in the main thead
- while UI is rednering int he main thread, a worker theread can take care of the computation heavy operations in a paralelle thread 
- Workers are of three types
    - Web workers : this is to run computation heavy operation parallel to the JS main thread. These workers have access to the web apis but they can't access the DOM. They communicate with each other or with the main thread using `postmessage` or`onMessage`

    ```javascript
    // main.js
    const worker = new Worker('worker.js');
    worker.postMessage("Some mesage");
    worker.onMessage((event) => {
        console.log(event.data);
    })

    // worker.js
    self.onMessage = () => {
        console.log(event.data);
        const res = computeHeavy();
        postMessage(res);
    }
    ```

    - Service worker: these are used as proxy between web and server. They can be used as push notification or caching etc.

    ```javascript
    //main.js
    if('serviceWorker' in navigator) {
        navigatior.serviceWorker.register("./some-sw.js")
        .then((registration) => {
            console.log(registration);
        }).catch(err => {
            console.log(err)
        })
    }
    // some-sw.js
    //cache implementation
    self.addEventListener('install', (event) => {
      event.waitUntil(
        caches.open('v1').then((cache) => {
          return cache.addAll(['/index.html', '/styles.css', '/app.js']);
        }),
      );
    });
    self.addEventLister('fetch', (event) => {
        event.respondwith(
            caches.match(event.request).then((response) => {
                if(response) return response;
                return fetch(event.request)
            })
        )
    })
    ```

    - Shared worker

    These workers are shared across multiple js files or frames given that they are all in same origin. 

--------------------------------------------------------------------------------------------------------------------------------

### BFC 

- Block formatting context is part of CSS rendering where `floats, absolutely positioned elements, inline-blocks, table-cells` establish a BFC
- BFC happens when  
    - float :none
    - position: relative / static
    - display: table-cell, table-capture, inline-block
    - overflow is visible
- In BFC, left outer margin touches the parent's left outer margin if it layout left to right else right outer margin.

--------------------------------------------------------------------------------------------------------------------------------

### float

- float is CSS property to position some element irrespective of it's flow on the page to right, left, bottom or top
- It impacts the positioning of the other elements. Other elements flow around the floated elements but unlike position: absiolute, it does not break the flow of the page. 
- For floated elements the parent container (if it only has floated elements) fail to wrap them in a particular height. 
- To solve this, we used to use `clear: both` hack

```html
<div class="container">
    <div class="box"></div>
    <div class="box"></div>
</div>
<head>
.box {
    float: left;
    width: 100px;
    height: 100px;
    background-color: #3498db;
    margin-right: 10px;
  }
  .clearfix::after {
    content: " ",
    clear: both;
    visibility: hidden;
    heihgt: 0
  }
</head>
```

- Here `clear both` artribute helps to define the css flow. But today   `display: flow-root` is used.

--------------------------------------------------------------------------------------------------------------------------------

### pseudo element and pseeudo class

- Pseudo eleement are key word which are applied on selector to style/decorate them.
- they are applied to create separation of concern as they should not be in the actual DOM like the traiangle in the tooltip
- they are often denoted as `::` double colons appended after the actual class
- for ex: `::first-line` or `::first-letter` is used to decorate texts
- also `::after` and `::before` is used to decoreate an element and insert certain things before and after that element without modifying the actual DOM.
- psedudo classes are denoted by `:` single colons and they are styles to be applied on certain events like `:hover` or `:focus`

--------------------------------------------------------------------------------------------------------------------------------

### zIndex

- zindex property in css controls the vertical stacking of the elements `which are not static postioned`
- zindex creates a stacking context for every element which will be higher than it's children
- Automatically all the elements in the DOM will be stacked int he order they appear on the DOM
- The non statically positioned elements will be always stacked ontop irrespective of the HTML hierarchy.
- The stacking context will be impacgted by setting css properties like `opacity` , `transform` etc.

--------------------------------------------------------------------------------------------------------------------------------

### How to make website ready for multilingual use with SEO

- we can use `lang` attribute on the `html` tag
- we can set an alternate locale `<link rel="alternate" hreflang="other_locale" href="url_for_other_locale">`
- and a default `<link rel="alternate" hreflang="x-default"  href="url_for_fallback"/>`

--------------------------------------------------------------------------------------------------------------------------------

### sprite in css

- To optimise image loading we can use sprite which generates a big background iamge consisting of all the images
- Now it uses `background-image` `background-position` and `background-size` to display certain images
- Gmail uses sprite to display all their images
- It will give definite advantage in http1.x but in http2.x image loading is not much of an issue
- It will remvoe the flicker effect for pseudo classes lkike `:hover`

--------------------------------------------------------------------------------------------------------------------------------

### Grid in CSS

- Before `flex` we had `grid` system in CSS using `float` as part of bootstrap 4
- Now we also have `display:grid` or `inline-grid`
- We have two properties to specify `grid-template-columns` and `grid-template-rows` where the unit is `fr` (fraction)
- We also have `grid-column-start` `grid-column-end` `grid-row-start` and `grid-row-end` to specify where the box would be placed in the grtid

--------------------------------------------------------------------------------------------------------------------------------

### how to serve pages in feature controlled browser 

- Graceful degradation - there should be features for advanced browser features with fallback for older browsers
- use of `caniuse.com` to know browser support
- use `modernizr` to detect feature
- use `@support` css tag
- use `browserify` to add browser restriction in application

--------------------------------------------------------------------------------------------------------------------------------

### RWD vs adaptive web design

- RWD uses responsive flexbox grid, responsive images and fluid design to make a website look good in all devices
- Adaptive web design detects the features supported for the device in partidular and then render the web page in the most supprotive way possible.
- RWD has issues like what would the the breakpoints for different device resolutions. what if those layout changes
- Adaptive design uses user agent sniffing and DPI detection which is not reliable.

--------------------------------------------------------------------------------------------------------------------------------

### HOw to fix browser specific CSS problems

- use a different custom style sheet only for the offending browser
- use `autoprefixer` to add vendor prefixes automatically for us.
- use react css or normalise css
- use libraries like bootstrap

--------------------------------------------------------------------------------------------------------------------------------

### data- attributes

- In early dys of javascript data- attributes was used to store extra information on the DOM itself. 
- Many libraries still use this to perform certaimn operation like opennign modal or linking to a modal. 
- But in modermn days, data- attributes are not encouraged to be used because users an easily modify these using inspect element and if there is feature behind it, it will stop working
- Butone perfect usage might be `data-testid` used by several testing frameworks like playwright, jest, selenium etc to identify an element using a unique id without affecting the semantics of that element in runtime

-------------------------------------------------------------------------------------------------------------------------------- 

### Hide an eleement and make it available only for screen readers

- These ways are with accessibility. 
- `width: 1px; height: 1px` is one way
- `position absolute; left: -9999px` is another way
- `text-indent: -9999` can be also done
- But we should never use `width: 0px; height: 0px` `display: none` or `visibility:hidden` these properties and 

--------------------------------------------------------------------------------------------------------------------------------

### Progressive rendering

- Optimised way of rendering HTML
- Can be donw in these wayhs - 
  - Image lazy load `<img loading="lazy>` so that the images which are mnot in view port will not load
  - above the fold rendering: Include the minimum CSS requirex to render the part of the webpaage user has rendered. We can use `DFomContentLoaded` events
  - Async HTML templates - Flushing part of HTMl to the browser from server

--------------------------------------------------------------------------------------------------------------------------------

### UA string

- UA string is a browser encoded string by which browser understads the application type, OS, software vendor or network provider. 
- this is available in `navigation.useAgent`

--------------------------------------------------------------------------------------------------------------------------------

### Resetting vs normalising

- Resetting means to unstyle all browser default styles for all elements and strip them down to no style at all. It's very aggresive way.
- It means we need to redeclare all styles for all common elements. 
- Normalising is a bit less aggressive when it doesn't entirely unstyle all the elements but preserve common browser styling for elemetns while trying to fix the issues for the elements wherever required.

```css
// Resetting
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

//Normlising
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}
```
--------------------------------------------------------------------------------------------------------------------------------

### srcset

- `srcset` is a html tag which is used to display dynamic size of images to the web page basis the cilent's display resolution
- it does make sense to render a high dimension image is the display resoltuion is good (retina display)
- but for a lower resolution display or for a smaller device it will cause data wastage if we try to render a higher dimension image
- if we do  `<img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w">` then it means that 500ps width image is small.jpg etc..
- Now if the client display resolution is 320px then it calculates, 500/320 is close to 1 then it will render the small.jpg
- But for a retina display the width will be much higher, lets say 3000px, then that is closest to large.jpg

```html
<div responsive-background-image>
  <img
    src="/images/test-1600.jpg"
    sizes="
      (min-width: 768px) 50vw,
      (min-width: 1024px) 66vw,
      100vw"
    srcset="
      /images/test-400.jpg   400w,
      /images/test-800.jpg   800w,
      /images/test-1200.jpg 1200w
    " />
</div>
```

--------------------------------------------------------------------------------------------------------------------------------

### Fucntion constructor vs class constructor

| Function Constructor    | Class constructor |
| ----------------------- | ----------------- |
| uses functions and prototypes  | uses ES6 classes    |
| to inherit the parent we need to call this on the parent function constructor | super within constructor   |
| to extend we use setPrototypeOf or do Child.prototype = Parent.prototype    | extends    |

--------------------------------------------------------------------------------------------------------------------------------

### Higher ordeer function

- Fucntions that take another function as an argument and return abstract out some operation before finally retirning a single value or another fiunction is called Higher order function
- `Array.prototype.reduce`, `Array.prototype.filter`, `Array.prototype.map` or `Object.prototype.bind` are all higher order functions

--------------------------------------------------------------------------------------------------------------------------------

### use strict

- It enforces `no global variable`
- this is `undefined` in global scope
- `unintentional deletion of non deletable property `throws exception
- `re assignment of constants` will throw exception
- `duplicate function parameter names` will throw exception
- there is global level strict mode and function level. if we do it on function level, global scope will be in non-strict mode only

--------------------------------------------------------------------------------------------------------------------------------

### Ajax

- Ajax (Async javascript and xml) is the process of async data transfer between client and server using network transfer protocol (now http and https)
- Traditionally we used submit entire the form (client) to submit data to server which would require the entire page to reload
- But with Ajax, we can transfer certain client data to server without disturbing the presentation layer
- Traditionally xml used to be transfered as part of a XHR request (xml http request) but in modern web applications we use `fetch` api where JSON(javascript object notation) is transfered as it's native to javascript
- Traditional xhr calls used to look like this -

```javascript
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          console.error('Request failed: ' + xhr.status);
        }
      }
}
xhr.open('POST', 'http://api.com', true);
xhr.setRequestHeaders('Content-type', 'application/json')
xhr.send(JSON.stringify({id: 1, name: 'blabla'}))
// abort
xhr.onabort = function() {..do something}
xhr.abort();
// Upload support
xhr.upload.onprogress = (event) => {
  console.log(Math.round((event.loaded / event.total) * 100) + '%');
};
// error handling
xhr.onerror = function() {..do something}
```

```javascript
  const controller = new AbortController();
  const signal = controller.signal
  fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'John Doe',
      age: 30,
    }),
    signal
  })
  .then(response => response.json())
  .then(response => {..do something})
  .catch(err => {..do something});

  // abort
  controller.abort()
```

--------------------------------------------------------------------------------------------------------------------------------

### Polyfills

- Extending existign prototypes can be dangerous as in there can be `namespace collisions` like two or more libraries are trying to update the native prototype. This is only ok iof we are trying to write a polyfill ie the browser has no native support for some features and we are adding it in the builtin native prototype
- Pollyfills are those libraries which give modern functionilities to the older browser who lack native support.
- `core-js` is a library which helps with teh missing features / polyfills `import 'core-js/actual/array/flat-map';`

--------------------------------------------------------------------------------------------------------------------------------

### Global namespace pollution problems

- As a best practice it is advisable not to polluyte the global namespace which otherwise the script ahas access to 
- `Naming conflicts`, `cluttered namespace`, `security leak`, `scope leak`,`compatibility and portability` and `modularity` are common pitfalls 

--------------------------------------------------------------------------------------------------------------------------------

### Difference between commonJS modules and ESM modules

| Common JS   | ESM |
| ----------------------- | ----------------- |
| used to be used in old node.js environment. This is not browser compatible. It's `require` based module strategy  | uses import/ export statement   |
| Not browser compatible | Browser compatible  |
| Dynamic in nature, can conditionally import  | static    |
| Can't optimise due to dynamic nature         | tree shaking etc library can optimise |
| Sync in nature                               | Async in nature |

--------------------------------------------------------------------------------------------------------------------------------

### Tree shaking

- Tree shaking is a phenomnon generally used by web bundlers like webpack to reduce `dead code reduction` to reduce the bundled file size
- But there are different challenges to tree shaking - 
  - If we have dyamic imports like `require('/blabla/{component}.js)` bundler will eventually take the entire module
  - If we have sideEffect in a file in global namespace like `console.log('sfadfgs'); function module() {}` in this, bundler will import the whole file instead of the function as there is sideeffect in the global scope
  - If we are using any library which does not support modular imports or we are not importing modules. Like insead of `import debounce from ' lodash/debounce` we are using `import _ from 'lodash'`
- So what are the rememdies of these
  - Use ESM `import /export`
  - Use libraries with modules like use `import debounce from 'lodash/debounce'` or use smaller libraries like `date-fn` and `lodash-es` etc
  - mark modules are sideEffectFree in package.json -  
  ```json
  {
  "name": "your-package",
  "version": "1.0.0",
  "sideEffects": false
  }
  ```
  - dont use dynamic import like `require('/blabla/{component}.js)`
  - enable optimisation in webpack config -
  ```javascript
  module.exports = {
    optimization: {
      usedExports: true, // Mark unused exports
      minimize: true,    // Minify and remove dead code
    },
  };
  ```
--------------------------------------------------------------------------------------------------------------------------------

### Iterators and Generators

Iterator :

- Iterators are objects that are used to define an range or act on a pre existing range. 
- Iterators must implement a `next` function qwhich will return a `value and done` 
- A custom iterator may look like this - 

```javascript
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next: () => {
        if(current <= end) return {value: current++, done: false}
        return {value: undefined, done: true}
      }
    }
  }
}
const range = new Range(0, 5);
const iterator = range[Symbol.iterator]();
console.log(iterator.next()); //0
console.log(iterator.next()) //1
console.log(iterator.next()) //2
```
- We can also latch on to an existing range with iterator

```javascript
const arr = [1,2,3,4];
const iterator = arr[Symbol.iterator]();
console.log(iterator.next());//1
console.log(iterator.next())// 2
// we can do this with a string also
```

Generator:

- Generators are special functions that can pause and resume their execution
- It can generate sequence of values on the fly. 
- Genrators has some advantages over normal iterators- 
  - `It can pause and resume `
  - `Lazy evaluation` which is mempry efficient
  - `Async iteration` - it can be used to manage async data flows with async/await
- Generator needs to implement a function which should `yield` something whenever called

```javascript
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
```
- Or we can also do 

```javascript
for(const el of range) {
  console.log(el)
}
```

- We can also do async operation with generators like `data batching` or `pagination`

```javascript
async function* fetchData() {
  let page = 0;
  while(true) {
    let res = await fetch("http://api.com" + page);
    let data = await res.json();
    if(data.length == 0) break;
    page++;
    yield data;
  }
}
const iterator = fetchData();
for await(const res of iterator) {
  console.log(res);
}
```

--------------------------------------------------------------------------------------------------------------------------------

### Mutable vs immutable

- When an object is frozen to any change of states (be it alteration of any existing property or addition or deletion of an existing property) then that object is called immutable object
- There are 4 properties
  - `configurable`: the object state can be extended or deleted later
  - `writable`: the object properties can be changed
  - `value`: value of the actual property
  - `enumerable`: this property will be coming in the for..in loop
- By default primtiive data types like `boolean` `number` `string` `null` and `undefined` are immutable. means their values once assigned can not be chnaged.
- This might feel like powered by `const` but no,  `const` just prevents the reinitialisation of a variable
- since primitive data types are immutable in nature, they can't be changed once declared as const
- Now for objects, if you declare them as const, you can change its properties anytime. 
- To make objects immutable, we need to use `Object.freeze()` This will make the object frozen to change in state, addition or deletion of new properties etc
- To just seal obnjects, we camn use `Object.seal()` this will not accept new properties to bne added/deleted from the object. But existing properties can be changed
- To prevent extensions on an object we can use `Object.preventExtensions(myObject);` So. `seal()` and `freeze()` implicitly calls `preventExtension`

```javascript
// Primitive data types
const num = 123
num = 456;// not allowed
const str = "blabla";
str.toUpperCase() // str is still blabla
// Normal object
const obj = {id: 1};
obj.id = 2 // id changes to 2
// Frozen object
const obj = Object.freeze({id: 1});
obj.id = 2; // id is still 1
delete obj.id // not allowed
obj.name = 'asovmasfg' // not allowed
// Sealed object
const obj = Object.seal({id: 1});
obj.id = 2; // id changes to 2
delete obj.id // not allowed
obj.name = 'asovmasfg' // not allowed
// Prevent extension
const obj = {id : 1};
Object.preventExtensions(obj);
obj.id = 2 //id changes to 2
obj.name = 'asovmasfg' // not allowed
delete obj.id //deleted
```

- Now if you are geek enough, you can play with the immutable properties that is mentioned above while creating an object itself

```javascript
Object.defineProperty(Object.prototype, 'myFun', {
  value: () => {
    console.log("This is a frozen function in any object you create in the history of this application")
  },
  writeable: false,
  configurable: false,
  enumerable: false
})
// Now lets'create a object
const obj = {};
obj.myFun() // This is a frozen function in any object you create in the history of this application
```

- We can also pass these while doing Object.create
```javascript
obj = Object.create({}, {
  myFun: {
    value: () => {
      console.log("This is a frozen function in any object you create in the history of this application")
    },
    writeable: false,
    configurable: false,
    enumerable: false
  }
})
```
- We can do `Object.getOwnPropertyDescriptor(obj, 'myFun')` to check the  configuration of the object property

--------------------------------------------------------------------------------------------------------------------------------

### SSE

- SSE is a way to sending data to browser from server in a unidirectional way. In browser these events are listened by a `EventSource`
- Unlike `websocket` which is bidirectional and talks to server over `ws://` protocol, SSE works unidirectional and talks over `http://`
- Websocket also allows text and binary data, while SSE only allows text
- To register a SSE in client side

```javascript
const eventSource = new EventSource("/sse");
eventSource.addEventListener('open', () => {
  console.log("registered:")
})
eventSource.addEventListener('message', (event) => {
  console.log("message:" event.data)
})
eventSource.addEventListener('update', (event) => {
  console.log("update:", event.data)
})
eventSource.addEventListener('error', (err) => {
  console.log("error:", err)
})
eventSource.addEventListener('close', () => {
  console.log("close:")
})
```
- And in server side
```javascript
const http  = require('http');
http.createServer((req, res) => {
  if(req.url == '/sse') {
    rea.writeHead(200, {
      'Content-type': 'text/event-stream',
      'Cache-control': 'no-cache',
      'Connection': 'keep-alive'
    });
    const sendMessage = (message) => {
      res.write(`data: ${message}\n\n`); // Messages are delimited with double line breaks.
    };
    sendMessage(`Current time: ${new Date().toLocaleTimeString()}`);
    req.on('close', () => {
      res.end();
    })
  }
}).listen(8080, () => {
    console.log('SSE server running on port 8080');
  });
```

--------------------------------------------------------------------------------------------------------------------------------

### Object getter / setter

- When we define an `obj = {name: 'balbla'}` and we change it to `obj.name = 'hhhh'` then implicitly the JS compiler runs object getter and setter to set the property.
- But we can override that also to run `side effect` or to do `additional validation`

```javascript
const obj = {
  _name: 'blabla',
  get name() {
    return name;
  }
  set name(__name){
    // we can run any sideeffect or validation here
    _name = __name;
  }
}
```
--------------------------------------------------------------------------------------------------------------------------------

### Garbage collection

- Let's just know that JS garbage collection happens in a `mark - sweep` algorithm
  - It first marks all objects from global variable to down to currently executing methods etc
  - Then it sweeps the unmrked objects to free up space
  - There are two generations it maintains, initially all objecgts are kept in `younger generatiomn`
  - Once few objects are mnot removed ebven after few GC, they are moved to `old generation`

--------------------------------------------------------------------------------------------------------------------------------

### JSONP vs Ajax

- JSONP (JSON with padding) is just another way to transfer data in `same-origin` domains
- It is limited to `GET` requests only and it's powered by `dynamic <script> tag injection` by server. 
- This does not have robust error handling compared to XHR.

```html
<!doctype html>
<html>
  <head>
    <title>JSONP Example</title>
    <script>
      function handleResponse(data) {
        console.log(data);
      }

      function fetchData() {
        var script = document.createElement('script');
        script.src = 'https://example.com/data?callback=handleResponse';
        document.body.appendChild(script);
      }
    </script>
  </head>
  <body>
    <button onclick="fetchData()">Fetch Data</button>
  </body>
</html>
```
--------------------------------------------------------------------------------------------------------------------------------

### SEO in SPA

- once its a SPA where for any user interaction the entire page doesn't change but the same html is dynamically changed with new contents after user interaction, SEO engine fails to index the context
- To fix that, we can use SSR (Server side rendering) or SSG( static site generation) powered by `Next` for `React` and `Nuxt` for `Vue`
- Once the page is fully rendered from server and sent back to client Search engine can index the fully rendered content

```javascript
import React from 'react';
import { GetServerSideProps,GetStaticProps } from 'next';

const Page = ({ data }) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
// OR
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default Page;
```
--------------------------------------------------------------------------------------------------------------------------------

### styling svg

- SVG can be styled using tags like `fill` to fill the box, `stroke` to draw border
- Any internal css like `svg {fill : blue}` can change svg

```html
<rect
  x="10"
  y="10"
  width="100"
  height="100"
  stroke="blue"
  fill="purple"
  fill-opacity="0.5"
  stroke-opacity="0.8" />
```
--------------------------------------------------------------------------------------------------------------------------------

### Mobile first app vs Responsive

- Responsive design and mobile first design are not mutually excludive. 
- RWD makes sure that the webpage is renders properly in any dimension using `media` query

```css
@media (min-width: 768px){
  .myclass {
    font-size: 22px;
  }
}
@media (max-width: 767px){
  .myclass {
    font-size: 12px;
  }
}
```

- but in mobile first approach, it is guranteed to apply the css first for mobile devices and then it will aply for other devices.

```css
.myclass {
  font-size: 12px;
}
@media (min-width: 768px){
  .myclass {
    font-size: 22px;
  }
}
```
--------------------------------------------------------------------------------------------------------------------------------

### Media usage

- `media` query can be applied in the following media types
- `all` all media type
- `print` for printer
- `screen` for screens (desktop, mobile, tablet etc)
- `speech` screen readers that read the page out loud

```css
@media print {
  body {
    color: black;
  }
}
```
--------------------------------------------------------------------------------------------------------------------------------

### BEM

- `BEM (Block element modifier)` concept tells that since browser perceive the selector for a DOM element from right to left, every node should have a single class.
- when we need hierarchy, this gets baked into the name of the class as well which gets efficient for the selector as well.

--------------------------------------------------------------------------------------------------------------------------------

### Doctype

- Doctype (document type) is always associated with `DTD (document type definiition)`
- Doctype for webpage specifies `how the document should be struictured` ie a `button` should not contain `div` but it can contain `span`
- Doctype html tells the browser (user agent) to support which version of HTML document respects.
- If the useragent support that doctype, it will render the document in `no quirks mode` otherwise it will go to `quirks mode`

--------------------------------------------------------------------------------------------------------------------------------

### load vs DomContentLoad

- `load` event gerts triggered after the DOM is laoded completely with all the resources
- `DOMContentLoaded` event gets triggered when the DOM model is constructed but all the resources might not be loaed already. It is preffered in cases where we want a faster loading for the webpage while other resources can lazy load.
- we should use `DomContentLoaded` if we want to attach some event listener or execute some script as soon as the DOM is constructed and before the stylesheets or images are loaded.
- we shoud use `load` if our script is dependent on the image layout computations etc.

--------------------------------------------------------------------------------------------------------------------------------

### mouseenter vs mouseover

- mouseenter does not bubble.it gets triggered on enter of the element itself, not it's descendents
- if there is mouseenter event listener attached to an element, and it has multiple children. The `event gets triggered only for the parent once`, not for the children.
- if the event is attached for parent and child both,`it will get only trigger for the child` once the pointer moves from parent to child
- mouseover bubbles all the way up the DOM hierarchy. it is triggered when mouse enters an element or it's descendents.
- if there is a mouseover event attached to an element, and it has multiple children, `it will trigger again for the parent once the mouse enters the child`
- if mouseover event attached for parent and child both, it will trigger for the parent twice. first the parent one, then again when the pointer moves to child, it will bubble

--------------------------------------------------------------------------------------------------------------------------------

### Primitive vs non promitive datatypes

- Primitive data types : number, string, boolean, null, undefined, Symbol, BigInt
- Non primitive: object, array, function, date, regexp, map, set 

--------------------------------------------------------------------------------------------------------------------------------

### Static members of class

- When properties/methods are declared with `static` keyword in a ES6 class, its not accessbile on the instances of that class, but those are accessible on the class directly. like `Number.Infinity` or `Math.PI` or `Math.max()` etc
- Advantages?
  - singleton pattern: enforcing static means that those will be constants acorss, and there will be only once isntance for that class which has that property/method
  - They are useful to define `constants` or `helper` functions.

--------------------------------------------------------------------------------------------------------------------------------

### Proxy

- Proxies are intermediary between the code and the actual object. It is an interceptor between the object and the target object once it's properties are accessed or altered

```javascript
const proxy = {
  get: function(target, prop, recevier) {
    console.log(`Someone accessed property "${prop}"`);
    return target[prop];
  },
  set: function(target, prop, value) {
    console.log(`Someone set property "${prop}"`);
    target[property] = value;
    return target[prop];
  }
}
const obj = {id: 1}
const proxyObj = new Proxy(obj, proxy);
console.log(obj.id); // someone accessed property id
obj.id = 2;// someone get property id
```
--------------------------------------------------------------------------------------------------------------------------------

### MutationObserver

- MutationObserver is used to notify changes on any DOM node on it's atributes or children list or subtree
- It attaches a callback in microtask queue for execution later 
- It taskes a config on what to watch. we can observe changes on `attributes` or `subTree` or `childList`
```javascript
const el = document.getElementById('test');
const observer = new MutationObserver(el, {
  childList: true,
  attributes: true,
  subTree: true
})
const callback = (mutationList, observer) => {
  mutationList.forEach(mutation => console.log(mutation))
}
observer.observe(callback)

// usage
targetNode.setAttribute('data-test', '123'); // Mutation detected
targetNode.innerHTML = "<p>New content</p>"; // Another mutation
```
--------------------------------------------------------------------------------------------------------------------------------

### IntersectionObserver

- Unlike `MutationObserver` IntersectionObserver is used to detect any DOM element is intersecting or not. Basic usecase is initinite scroll
- `IntersectionObserver` can observe an element with some configurations like `threshold` and `rootMargin`

```javascript
const elem = document.getElementById('sentinel');
const observer = new IntersectionObserver(elem, {
  rootMargin: 0,
  threshold: 1.0
});
observer.observe((entries) => {
  const sentinel = entries[0];
  if(sentil.isIntersecting) {
     fetchMoreData()
  }
})
```
- to stop observing we can call `observer.unobserve()`

--------------------------------------------------------------------------------------------------------------------------------

### CSP

- `Content security policy` is a security feature which helps prevent XSS or SQl injection attacks
- It allows to accept image, content, script and other resources only from trusted sources
- It is set in the header or http meta tags so that whenever browser loads the page, it gets applied.
- There are different directives for different resource types
  - `script-src`: for scripts
  - `style-src` : for css
  - `content-src`: for contents 
  - `connect-src`: for Ajax requests, eventsource conneections or Websockets
  - `object-src`: for objects likeflash
  - `default-src`: fallback if nothing is explicitly defined
- THis is applued like `Content-Security-Policy default-src 'self'; script-src 'self'; http://trustedsrc.com`
- Or using meta tag `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trusted.cdn.com" />`
- `http-equiv` tag is used to set http like headers for all the requests originating from browser

--------------------------------------------------------------------------------------------------------------------------------

### CSRF

- CSRF (cross site request forgery) is an attack when-
  - user logs in site 1 using his valid authentication hedaers and get a auth code
  - attacker sends a form or siome othjer link which takes the user to another malicious site while he is still logged in the first site
  - Once the attacker got the auth code, it sends a unintended yuet authenticated request from site 1 mimicking the user getting access to his PII information
- To mitigate this, we generally use a `csrf token` which is sent from server to client and it won't be available if the request is not sent from the particular broweser which has the csrf token
- We can sepcify the csrf token in a hidden input like `input type= 'hidden' value='csrf_token_value'/>` 
- but the most common practice is to set in `meta` like `<meta name="csrf-token" content="csrf_token_value" />`
- This way all the requests coming to the server will have this and in server we can easily get is by `document.querySelectorAll('meta[name='csrf-token']).getAttribute('content')`
- Another way to mitigate CSRF is applying CORS in server. so that no request can be triggered from any other domain to the server `Access-Control-Allow-Origin: https://trustedwebsite.com`

--------------------------------------------------------------------------------------------------------------------------------

### debounce and throttle

- `debounce` ensures that irrespective of how many ever times the action in triggered the function is called after a certain amount of time. It creates a timeout and keep on updating it every time the functio  is called with in the supplied delay. Only after the supplied delay it executes the function

```javascript
const debounce = (fn, delay) => {
  let timeoutId = null
  return (...args) => {
    timeoutId && clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  }
}
```

- `throttle` makes sure that the function is called at least once within a certain time. 

```javascript
const throttle = (fn, delay) => {
  let isThrottle = false;
  return (...args) => {
    if(isThrottle) return;
    fn(...args);
    isThrottle  = true;
    setTimeout(() => (isThrottle = false), delay);
  }
}
```
Use cases
- `Infinite scroll` :we need to fetch more data asynchronously while user scrolls. We cant wait for the scroll evenet to complete. we need to periodically fetch more data. here throttle makes more sense
- `Autocomplete` here if we periodically fetch results there might be too many uncesssary request. Rather, once user types the search string we should call the fetch api. hence debounce makes more sense

--------------------------------------------------------------------------------------------------------------------------------

### tagged templates

- Not that we use it every day but JS tagged template works like we can use a function like - 

```javascript
const test = (str, ...values) => {
    // str = ['some string sdfksdngnngfsndfnsdfsf ', 'avnnfsdmfsmdfm', 'sdgsgsdgsgd'] // splitby values
    // values = ['some value', 'some other value']
    console.log(str, values);
}

test`some string sdfksdngnngfsndfnsdfsf ${'some value'} avnnfsdmfsmdfm ${'some other value'} sdgsgsdgsgd`
```
--------------------------------------------------------------------------------------------------------------------------------

### TDD

- Test driven development is used to write a faiing test case for reliability, better debuggability and maintainability.
- Benefits include `better code quality`, `faster debugging`, `documentation`
- Challenges are `initial learning curve`, `overhead` and `time consuming`

--------------------------------------------------------------------------------------------------------------------------------

### Strategy Pattern

- When we have multiple algorithms to do similar operation, we can make use of `Strategies` to avoid changing in the client code
- So to implement this, we need to create a class `Context` which several ContextStrategy classes can inherit

```javascript
class Context {
  constructor(_strategy) {
    this.strategy = _strategy;
  }
  executeStrategy(data) {
    this.strategy.doAlgorithm(data);
  }
}
class ContextStrategyA extends Context {
   doAlgorithm(data) {
    return data.sort((a, b) => a-b)
   }
}
class ContextStrategyB extends Context {
   doAlgorithm(data) {
    return data.sort((a, b) => b-a)
   }
}
```
- Now we can use this in client code

```javascript
const data = [3, 1, 4, 1, 5, 9];
const context = new Context(new ContextStrategyA());
console.log(context.executeStrategy(data));
```

--------------------------------------------------------------------------------------------------------------------------------

### Websocket

- `Websocket` connection provides a secure two way connection between client and server
- Unlike http where the communication is one way (server to client) with ws client and server can seamlessly talk to each other
- unlike http websocket connect uses `ws://` or `wss://` protocol to communicate
- `Duplex connection` , `real time updates` are some advantages for this

```javascript
//Client side
const socket = new WebSocket('ws://api.com/socket');

socket.addEventListener('open', () => {
  socket.send('Hello server');
})
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Data', data);
})
socket.addEventListener('close', () => {
  console.log('socket closed');
})
socket.addEventListener('error', (err) => {
  console.log('Error', err);
})

//Server side
const ws = require('ws');

const wss = new ws.Server({port: 8000});
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('Received:', message);
    const response = JSON.stringify({ message: 'Hello from server', received: message });
    ws.send(response);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
  ws.on('error', (error) => {
    console.log('WebSocket error:', error);
  });
  ws.send(JSON.stringify({ message: 'Welcome to WebSocket server!' }));
});
```
--------------------------------------------------------------------------------------------------------------------------------

### shallow copy and deep copy

- In shallow copy we either `spread` or do `object.assign`. Both ways the refernce of the object is also copied, meaning if the shallowObj property is changed the actual object is also altered.

```javascript
let obj1 = {a:1, b:{c:2}};
let obj2 = {...obj1};
// in obj2 the property b points to the same memory location as obj1 so..
obj2.b.c = 3;
console.log(obj1.b.c) // 3
```
- In deep copy we do `JSON.parse(JSON.stringify())` or `lodash.deepCopy()` here the refernce is not copied 
- We can also use `window.structuredClone(obj1)` to make a deep copy

--------------------------------------------------------------------------------------------------------------------------------

### Same-Origin policy

- By default browser does not allow cross origin resource sharing. To access a resource hosted in a server the client needs to be in the same Origin
- But there are some exceptions like `CORS headers` or `JSONP` or `Websocket`

--------------------------------------------------------------------------------------------------------------------------------

### Why function foo(){}() doesn't work?

- In Javascript function declaration and function expression are diffently parsed
- `function foo(){}` is function declaration which is hoisted hence it's not immidiately invocable
- `(function foo(){})()` on the contrary is a function expression and can be immidiately invoked
- this is like this because function foo(){} is a statement in JS which is not invocable
- but (function foo(){}) is a expression which is executable

--------------------------------------------------------------------------------------------------------------------------------

### Optimise DOM manipulations

- minimise DOM access repeatedly. reading and accessing DOM elements are expensive. we can get it once and store it in a variable to use later
```javascript
const element = document.getElementById('myElement');
element.style.color = 'red';
element.style.backgroundColor = 'blue';
```
- batch DOM updates `element.style.cssText='color:red; font-size: 12px'`
- Use `documentFragement` 
```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const newElement = document.createElement('div');
  newElement.textContent = `Item ${i}`;
  fragment.appendChild(newElement);
}
document.getElementById('container').appendChild(fragment);
```
- leverage on virutal dom libraries like `react-dom`
- use `requestAnimationFrame` for animation
- avoid `layout thrashing` where we try to read write DOM attribuites repeatedly causing browser to repeatedly recalculate the styles and reflow and repaint DOM
```javascript
const element = document.getElementById('myElement');
const height = element.clientHeight; // Read
element.style.height = `${height + 10}px`; // Write
```
--------------------------------------------------------------------------------------------------------------------------------

### Optimise network requests

- `Gzip/brotli`
- `image lazy loading` 
- try `image sprites`
- `http cache`
- use `Service worker`
- use `http2` or `cdn`
- use `graphQl` and `api optimisation`

--------------------------------------------------------------------------------------------------------------------------------

### Clickjacking

- When an iframe embedded in a page an attacker can use a hidden element in an iframe in the page to simulate the click in the frame to get critical information
- Hence it's important to consciously allow iframe to be embedded in webpage
- we can use `X-Frame-Options: SAMEORIGIN` or `X-Frame-Options: deny` altogether
- Or we can use CSP  `Content-Security-Policy: frame-ancestors 'self'`

--------------------------------------------------------------------------------------------------------------------------------

### ways to mitigate SQL injection

- Use prepared statements with `mysql` library
- Use `ORM libraries` 
- Use sanitised inputs
- Use stored procedure
- Use `express validators`

--------------------------------------------------------------------------------------------------------------------------------

### Creatiung a dynamic currying function

```javascript
const add = (...args) => {
    let sum = args.reduce((acc, curr) => acc + curr, 0);
    const nextFn = (...nextArgs) => {
        if(nextArgs.length == 0) return sum;
        sum += nextArgs.reduce((acc, curr) => acc + curr, 0);
        return nextFn;
    }
    return nextFn;
}
// Usage
add(1)() // 1
add(1)(2)() // 3
add(1,2)() // 3
add(1,2)(4,5) // 12
```
--------------------------------------------------------------------------------------------------------------------------------

### iframe communication

- iframe can talk to the parent window with `window.parent` 
- parent widnow can talk to ifram by `iframe.contentWindow`
```javascript
// From host to iframe
const iframe= document.getElementById('iframeId')
iframe.contentWindow.postMessage('hello','URL');

// from iframe to host
window.parent.postMessage('hello', 'URL')

// to accept the data 
window.addEventListener('message', function(event) {
  if (event.origin !== 'URL') return;
  console.log(event.data);
});
```
--------------------------------------------------------------------------------------------------------------------------------

### Array splice vs slice

- `splice` is used to replace / delete certain elements from the array and insert new ones. 
- Syntax for splice is `Array.splice(targetIndex, numberOfElemToRemove, ...newElements)`

```javascript
const arr = [1,2,3];
arr.splice(1,1, 4,5) ;// [1,4,5,3]
```

- `slice` is used to extract certain subarray from the original array
- It does not change the original array
- The syntax for slice is `Array.slice(start, end)` it will slice start to end-1

```javascript
const arr = [1,2,3,4];
arr.slice(1,4); // [2,3,4]
```
--------------------------------------------------------------------------------------------------------------------------------

### in vs hasOwnProperty

- `in` checks for both own and inherited properties
- `hasOwnProperty` only checks for own property

--------------------------------------------------------------------------------------------------------------------------------

### How to check if javascript is enabled inthe page

- we can use `noscript` tag and write certain certain things inside it. It will be presented if JS is disabled

```javascript
<noscript>
  <p>
    JavaScript is disabled in your browser.
  </p>
</noscript>
```
--------------------------------------------------------------------------------------------------------------------------------

### Different ways of navigation

- `window.location.href='/new-location'` will redirect the user to a new page. The page will reload. It will also create a new history.
- `window.location.replace('/new-location')` will redirect the user to a new page, the page will reload but it will not create a new history.
- `window.location.assign('new-location')` same as href
- `window.location.reload()` just reloads the page
- `window.history.pushState({page : 1}, 'page 1', '/new-location')` will behave like SPA, the user will go to the new location but the page will not reload, it will add a new entry in the history.
- `window.history.replaceState({page: 2}, 'page 2', '/page2')` will replace the route but won't add a new entry in the history
- `window.go()` jumpto history states
- `window.history.forward()` go next in history stack
- `window.history.back()` go back in history stack

--------------------------------------------------------------------------------------------------------------------------------

### Constraint validation API

- when we write `input type = 'text' required` HTML5 automatically validate the inout before it allows the form to be submitted (orcourse if the input box is enclosed in a form and the form is getting submitted)
- But we can programmatically check the validatity also by `input.checkValidity()`
- We can set validity like `input.setValidity()` and `input.reportValidity()`

--------------------------------------------------------------------------------------------------------------------------------

### Singleton in JS

- `Singleton` means instances of object which is only one through out the lifecycle of the application
- We can create a Singleton class like this - 

```javascript
class SigleTon {
  constructor() {
    if(SingleTon.instance) return SingleTon.instance;
    SingleTon.instance = this;
  }
  someMethod() {
    console.log("I am a singleton")
  }
}
```
- We can also use IIFE to create a simngleTon scope . this is `encapusalution` and called module pattern.
```javascript
const SingleTon = (() => {
  let scope = null
  return {
    setScope: (_scope) => (scope = _scope),
    getScope: () => scope
  }
})();
```

--------------------------------------------------------------------------------------------------------------------------------

### ways to handle sensitive data in web

- Using sessionstorage or localstorage is riskyu to store these as they will be available acorss multiple tabs of the same session for the user.
- We can use secure cookie `res.cookie('token', token, {httpOnly: true, secure: true})`
- We can use `jwt` to sign and encrypt them We can use `express-validator` to sanitise the input in server
- We can also use `secrets` and inject them in runtime to the container and access them as `process.env.secret`

--------------------------------------------------------------------------------------------------------------------------------

### Different security headers

- For XSS we have seen `Content-Security-Policy default-src 'self'; script-src 'self'; trusted.com`
- For XSS we can also use `X-XSS-Protection: 1; mode=block`
- For MIME sniffing we can use `X-Content-Type-Options: nosniff`
- For clickjacking we can use `X-Frame-Options: sameorigin/deny`
- We can also use `Referrer-Policy: no-referer/no-referrer-when-downgrade/strict-origin-when-cross-origin` this cntrols how much information of the referrer is shared.
- We can also use `Strict-Transport-Security: max-age=12344; includeSubDomains preload` this enforces the connection is always https for max-age amount of time for the domain and it's sub domains as well. and it will also add the site to the preload of HSTS (Http strict transport security)

--------------------------------------------------------------------------------------------------------------------------------

### Tools to detect security vulnerability

- `ESLint`
- `OWASP Zed attack Proxy` can be used to detect security issues in web apps dynamically
- `npm audit` or `synk test` to constantly check dependencies

--------------------------------------------------------------------------------------------------------------------------------

### Tools for JS performance testing

- `Chrome devtools`
- `Lighthouse`
- `Webpagetest`
- `JsPerf`

--------------------------------------------------------------------------------------------------------------------------------

### license in package.json

- License indicates under which license this package can be used. `MIT` `apache 2.0` or `GPL3.0` are common licenses

--------------------------------------------------------------------------------------------------------------------------------

### Deorator pattern

- Pattern of inheriting parent class and calling some function from the child using `super`

```javascript
class Car {
  drive() {
    return 'Driving';
  }
}
class GPSCar extends Car {
  constructor(car) {
    super();
    this.car = car;
  }
  drive() {
    return `${super.drive()} with GPS`
  }
}
const gpsCar = new GPSCar(new Car());
gpsCar.drive() // Driving with GPS
```
--------------------------------------------------------------------------------------------------------------------------------

### Difference between setTimeout, setImmediate, process.nextTick

- `setTimeout` is a callback which is scheduled to be executed after the given delay. it's generatlly added in the macro task queue
- `setImmediate` is a callback in nodejs which is set to be executed after the current event loop cycle finishes
- `process.nextTick` is also a callback in nodejs which is set to be executed before the next event loop execution begins.

```javascript
setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));
```
In this example, `process.nextTick` will execute then `setTimeout` then `setImmediate`

--------------------------------------------------------------------------------------------------------------------------------

### What is Intl

- `Intl` is a ecmascript api for accessing internalisation resources
- ex: `Intl.DateTimeFormat('en-us')` is used to set date time format for US zone
--------------------------------------------------------------------------------------------------------------------------------

### ARIA

- `Accessible Rich internet application` are set of attribites which is to specify how an input is accesible to the user and should be implemented specially to improve user interactions, intuitiveness and ease of acess for people with speical abilities.
- There are multiple attributes listed under aria 
  - `role` role of an input whether it is `button`, `modal` `navigation` or `alert`
  - `aria-hidden` if the input is hidden
  - `aria-label` lanbel for the input
  - `aria-live` if updates to this content shoudl be read by screen readers
  - `aria-expanded` if this is collapsed/expanded
  - `aria-controls` if this is impacted by the an action 
  
```html
<button id="menuButton" aria-controls="menu" aria-expanded="false">Menu</button>
<div id="menu" class="hidden" aria-hidden="true">
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>
```
--------------------------------------------------------------------------------------------------------------------------------

### Binary data types

- In JS there are four types of binary data structutes
- `ArrayBuffer` it is a buffer array of binary data. It's immutable. means once created it can not be changed or modified

```javascript
const bufer = new ArrayBuffer(16);
console.log(buffer.byteLength); // 16
```

- `TypedArray` this is derived from Arraybuffer with certain type of the binary data but it is contiguous meaning all the memory location is filled with same type of data
- several types can be `Int8Array` `Int16Array` `Int32Array` `Float8Array` `Float32Array`

```javascript
const buffer = new ArrayBuffer(16);
const intArray = new Int8Array(buffer);
intArray[0] = 42;
```

- `DataView` is derived from ArrayBuffer only but it can have different type of datatypes ie it doesn't have to be contiguous

```javascript
const buffer = new ArrayBuffer(16);
const dataV = new DataView(buffer);
data.setInt8(0, 127);
console.log(data.getInt8(0));
```

- `Blob` is another way to represent binary data which is again immutable and can be derived from  Arraybuffer an Typed Array

```javascript
const blob = new Blob(['Hello'], {type: 'text/plain'});
//we can convert a blob to arraybuffer
const buffer = await blob.arrayBuffer();
```
--------------------------------------------------------------------------------------------------------------------------------

### Creating a carousal

- Trick for the smooth scrolling is `scroll-snap-type: x mandatory` or `scroll-snap-type: y mandatory`
- With this, we should make sure the children slide is having same width and height of parent
- parent container should be `display: flex` and `overflow-x: auto`
- children should also be `display : flex` and `flex: 0 0 600px` meaning they will not grow or shrink and take max width as 600px
- To have a smooth carousal effect,` prepend last slide ` and `append the first child` in the container
- Now whenever `offset >= scrollWidth - itemWidth` reset `scrollleft = itemWidth; offset = itemWidth` ie take it to the first actual slide
- Whenever `offset <= 0` reset `scrollLeft= scrollwidth - 2 *itemwidth; offset = scrollwidth - 2 *itemwidth;` ie take it to the last actual slide.

--------------------------------------------------------------------------------------------------------------------------------

### How to check a directory in nodejs

`fs.existsSync(path) && fs.statSync(path).isDirectory()`

--------------------------------------------------------------------------------------------------------------------------------

### typeof

- `typeof [1, 2];` is `object`
- `typeof null` is `object`
- `typeof NaN` is `number` 
- `typeof undeclaredVar` is undefined

--------------------------------------------------------------------------------------------------------------------------------

### Concatenate number and string

- trick is `n1 + n2 + s1 + s2 + n3 + n4 + s3 + s4 + n5 + n6` in this expression, only n1 and n2 are numerically added rest are all concetenated as strings 
- `1 + 2 + "3" + "4" + 5 + 6 -> '33456'`
- But `1 + 2 + "3" + "4" + (5 + 6); -> 33411` as parenthesis gets upper hand and compute first
- `"1" + "2" + (3 + 4) + 5 + "6"; -> 12756`

--------------------------------------------------------------------------------------------------------------------------------

### ?? operator

- If the left operand is `null or undefined` it takes the right operand else left
- `undefined ?? 10; -> 10`
- `false ?? num1; -> false`
- `0 ?? num2; -> 0`

--------------------------------------------------------------------------------------------------------------------------------

### NaN

- Did you know `NaN` is produced by illegal numeric operation
- `isNaN(NaN) -> true`
- `isNaN("text" - 10) -> true`
- `isNaN("text") -> false` this is not a illegal numeric operation hence it's not NaN

--------------------------------------------------------------------------------------------------------------------------------  

### Number operations

- parseInt will always convert the given input to number. like `parseInt("123abc") -> 123` 
- parseFloat will always convert the given input to float. like `parseFloat("-12.5ffg") -> -12.5`
- toFixed will round off after the decimal point `(52.128).toFixed(2) -> 52.13` toFixed(n) will always make sure n decimal points `(10).toFixed(3) -> 10.000`
- toPrecision(n) will make sure total n digits of the entire number. `(98.1).toPrecision(2) -> 98` but `(98.1).toPrecision(1) -> 1+e2`

--------------------------------------------------------------------------------------------------------------------------------

### Number.isNaN pollyfill

```javascript
Number.myisNaN = function(input) {
    return typeof input == 'number' && input !== input
}
```
--------------------------------------------------------------------------------------------------------------------------------

### 0.1 + 0.2 != 0.3 how to solve

- decimal addition does not equal the actual decimal exactly
- we can do `0.1 + 0.2 - 0.3 <= Number.EPSILON` Number.EPSILON is 1 >> 32 is very small number

--------------------------------------------------------------------------------------------------------------------------------

### How to check if a function is called with the parameters equal to the number of arguments it is expecting

```javascript
const func1 = () => {
  if(func1.length != arguments.lenght) {
    console.log("Arguments not match");
  }
}
```
--------------------------------------------------------------------------------------------------------------------------------

### Write a pollyfill for Object.create

Object.create is used to create an object out of an prototype. In JS there is no other way to create an object without a prototype. And there is no way to create an object from a prototype in JS apart from Object.create. hence we are creating a constructor function such that we can set the prototype and create an object using `new` keyword

```javascript
Object.create = Object.create || function(proto) {
  if(typeof proto != object || proto === null) {
    throw new Error('wrong prototype format. it must be an object');
  }
  function F() {}
  F.prototype = proto
  return new F();
}
```

--------------------------------------------------------------------------------------------------------------------------------

### Fucntion to return random value in an range

```javascript
const getRandom = (start, end) => {
    return Math.round(Math.random() * (end - start))
}
```
--------------------------------------------------------------------------------------------------------------------------------

### Get random hex color code

```javascript
function getGetHEXColorCode() {
  const r = Math.round(0xff * Math.random()).toString(16).padStart(2, '0');
  const g = Math.round(0xff * Math.random()).toString(16).padStart(2, '0');
  const b = Math.round(0xff * Math.random()).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`
}
```
--------------------------------------------------------------------------------------------------------------------------------

### Softbinding

- In hardbinding we generally call the actual function with the context which we receoved at the time of bind call

```javascript
Function.prototype.hardBind = function(...args) {
    const [context, ...params] = args;
    const _this = this;
    return function(...moreParams) {
        _this.call(context, ...params, ...moreParams);
    }
}
// Notice that we are calling _this with the context which we called hardBind with. so..
function myFun(...args) {
  console.log("this", this);
  console.log("arg", ...args);
}
const bounded = myFun.hardBind({name: "Anindya"}, 1,2,3);
bounded.call({name: "Sanchita"}, 4,5,6); // this will out put =  Anindya 1,2,3,4,5,6 instead of sanchita
// because of _this.call(context. to override the context - 
Function.prototype.softBind = function(...args) {
    const [context, ...params] = args;
    const _this = this;
    return function(...moreParams) {
       const overrideContext = this == undefined || this == globalThis ? context: this;
        _this.call(overrideContext, ...params, ...moreParams);
    }
}

const bounded2 = myFun.hardBind({name: "Anindya"}, 1,2,3);
bounded2.call({name: "Sanchita"}, 4,5,6); // Sanchita 1,2,3,4,5,6
```

--------------------------------------------------------------------------------------------------------------------------------

### Create an object with obj.func1().func2().func3() functionality

```javascript
var obj = {
  id: 1,
  func1: function() {
    console.log("Hi, I am func1");
    return this
  },
  func2: function() {
    console.log("Hi, I am func2");
    return this
  },
  func3: function() {
    console.log("Hi, I am func3");
    return this
  }
}
```
--------------------------------------------------------------------------------------------------------------------------------

