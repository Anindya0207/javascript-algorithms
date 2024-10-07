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
- d: element selector\
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

### Cookie vs sessionStorage vs localstora

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