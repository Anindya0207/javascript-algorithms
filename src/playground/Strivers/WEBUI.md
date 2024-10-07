# HTML 

### Facts for noobs

- HTML is hypertext because it connects multiple web pages to one another and markup because of the sermantic markups.
- attribute without a value is "required". its value is not needed

--------------------------------------------------------------------------------------------------------------------------------

### Why is Doctype why is it required

- doctype is a way to tell the browser to make best effort to follow the latest web standards while rendering the webpage
- In past, we had something called "quirks mode" which was added to support the layout in Navigator 4 and IE5
- In early 91/92 when HTML was yound, doctype used to be for setting rules.
- doctype is to tell browser to make best effort not to go in quirk mode bnut to follow the latest web standards.

--------------------------------------------------------------------------------------------------------------------------------

### < colgroup > and < col > what is this?

- In HTML tables, colgroup and col is used to group columns
- So basically within a colgroup we can specify a list of cols with their spans
- Now in body, `<tr>` can be specified with `<th scope="row"> or  <td scope="col">` 

```html
<table>
    <caption>
        Superheros and sidekicks
    </caption>
    <colgroup>
        <col />
        <col span="2" class="batman" />
        <col span="2" class="flash" />
    </colgroup>
    <tr>
        <td></td>
        <th scope="col">Batman</th>
        <th scope="col">Robin</th>
        <th scope="col">The Flash</th>
        <th scope="col">Kid Flash</th>
    </tr>
    <tr>
        <th scope="row">Skill</th>
        <td>Smarts, strong</td>
        <td>Dex, acrobat</td>
        <td>Super speed</td>
        <td>Super speed</td>
    </tr>
</table> 
```
--------------------------------------------------------------------------------------------------------------------------------

### HTML forms

- onSubmit all the form elements which have `name` attributes are sent.
- Checkbox/ radio etc clickable widget values are not submitted if they are not changed
- `fieldset` is a tag which is mainly used to wrap multipleform elements for better accessbility. we can disable these individually
- `checked` attribute does not need a value. if this attribute is passed, the checkbox will be checked
- we can group multiple checkboxes with same `name` but they need to have different id
- `label` `for` should always be linked with `id` of an input element for accessbility. and label should not contain the input element enclosed. they should be siblings. the form wont break but acessbilitiy might.
- Similar to checkboxes if we give the same `name` to radios they are grouped together and they behave 
- So all these clickable widgets are having these props - `id , type, name, checked, value`
- `form` element can be usedto have HTML forms
    - there can be a button of type `button` or `reset` or `submit`
    - form submit event can be handled by inline event handler or external.. 
    - For inline event handlers, make sure to have `onsubmit = "customSubmmitHandler(event)` 
    - we can get form elements by `new FormData(e.target)`
- input type files should be specified a `accept` like `accept=image/*,capture=camera`
    - Files can not go text encoded as they are raw binary data

```html
<form onsubmit="obsubmit(event)">
    <fieldset>
        <legend>Choose all the vegetables you like to eat</legend>
        <ul>
        <li>
            <label for="carrots">Carrots</label>
            <input type="checkbox" checked id="carrots" name="vegetable" value="carrots">
        </li>
        <li>
            <label for="peas">Peas</label>
            <input type="checkbox" id="peas" name="vegetable" value="peas">
        </li>
        <li>
            <label for="cabbage">Cabbage</label>
            <input type="checkbox" id="cabbage" name="vegetable" value="cabbage">
        </li>
        </ul>
    </fieldset>
    <fieldset>
        <legend>What is your favorite meal?</legend>
        <ul>
        <li>
            <label for="soup">Soup</label>
            <input type="radio" checked id="soup" name="meal" value="soup">
        </li>
        <li>
            <label for="curry">Curry</label>
            <input type="radio" id="curry" name="meal" value="curry">
        </li>
        </ul>
    </fieldset>
    <button type="submit">Submit</button>
</form>
```

- There are two ways for data submission of a HTML form
- By default they are encoded as `Content-type: application/x-www-url-formencoded`. This converts space to `+` and speical character to `&`
- But for files we need to send it in parts, the text content is a different part and the binary spearately, then we use `Content-type: multipart/form-data`

```javascript
async function sendData(data) {
  const formData = new FormData();
  formData.append("name", "Pomegranate");
  const selection = await window.showOpenFilePicker();
  if (selection.length > 0) {
    const file = await selection[0].getFile();
    formData.append("file", file);
  }
  try {
    const response = await fetch("https://example.org/post", {
      method: "POST",
      body: formData,
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}
const send = document.querySelector("#send");
send.addEventListener("click", sendData);

```

--------------------------------------------------------------------------------------------------------------------------------

### Web security

1. XSS (Cross site scripting)

When an attacker injects some malicious script though a web input immidiately or persistently to attack a certain user or multiple users on platform
There may be two type of XSS attacks - 

- Reflected XSS: 
    - When teh attacker injects a script through a text input or in the search box which gets sent to the server and gets returned to the browser as is (unmodified) then the script starts getting executed in the users session. It can send the users data to another site as per the scripts logic
    - Now this is not persistent for multiple users acorss sessions or across tabs. This is most often phishing attacks which happens when user clicks on some malicious links.
- Persistent Xss:
    - When the attacker injects a script from a text input for a form in a website and that gets stored in a persistent sotrage like database etc
    - Now, for across users accessing that web page that script will be applicable.
    - This is more dangerous as it targets multiple users or an entire forum.

Remedies for these attacks can be -

- We can have `sanitised html inputs for special characters`
- We shoudl always store userInput in `textContent rather than innerHTML`
- We can implement any content security policy(CSP) 
    - `Content-Security-Policy: script-src 'self' https://trusted-source.com;` this type of CSP only allows resources from some trusted sites.
    - `<script nonce="random-value"></script>` - this type of CSP allows only nonce enabled script minimising the chance of attacks
- Use some std library like `DOMPurify` to sanitise userInput
- use security headers while emitting user data to server like
    - `X-Content-Type-Options: nosniff`: Prevents MIME-type sniffing, which could allow attackers to bypass security mechanisms by interpreting files as different types.
    - `X-XSS-Protection`: Enables the browser's built-in XSS filter.
    - `X-Frame-Options`: Prevents clickjacking attacks by disallowing your website to be loaded in iframes.
- use serverside protection like `app.use(helmet())`

2. SQL injection

Attacker injects SQl query in the request to execute them in databse to get sentsitive information

3. CSRF (Cross site request forgery)

Here Attacker generates a UI form resembling the actual ui and sends to the actual user, this form will have hidden field as a form of input fields, When user hits the server usingthat form, the request makes payment to the attacker. 
To prevent this, we should use a token which will be supplied by the server and will be user specific. It will be set in the meta tag of the html page. Once the user submits the page, the server validates the token sent to the html vs the token saved at server and then validate the request.
This way, the form attacker will create will not match the token at server and the request will fail

4. Clickjacking

In this attack, a malicious user hijacks clicks meant for a visible top-level site and routes them to a hidden page beneath. This technique might be used, for example, to display a legitimate bank site but capture the login credentials into an invisible `<iframe>` controlled by the attacker. 
To prevent this, sites should use `X_Frame_Options: deny` so that to prevent it to be rendered in an iframe

5. Dos (Denial of Service)

In this attack, the attacker floods the site with huge number of fake requests such that the service is denied to access for legitimate users for too many resource utilisation by the fake requests.
To prevent this we can implement ratelimiting or WAF (web application firewall)

--------------------------------------------------------------------------------------------------------------------------------

### iframe : everything you need to know

- iframe or inline frame is an html element to embed another page within a html page so that the inner content doesn't get disrupted by the parent content's DOM styling etc.

- In a iframe we need to specify either an URL as `src` or an HTML as `srcdoc`

- How to communicate between iframe and host window?

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

- Security concerns with iframe
    - Clickjacking: Attacker can simulate the click in the host page to a click in a embedded site such that the senstive information can be hijacked.
    - XSS: iframe can be an easy bait if not properly sandboxed, to run malicious scripts.
    - Cross origin requests: CORS vulnerabilities like manipulating data from unrusted origin. 

- Mitigation strategies
    - Use X_Frame_Option as deny or same origin
    - Use sandbox to properly define the permissions and restrict ifram usage `<iframe sandbox="allow-popup">`
        - `allow-popup`: allow iframe to open popups
        - `allow-same-origin`; this will allow iframe to behave as the same origin as the host site, it can access DOM, localstorage, cookie etc
        - `allow-scripts`: this will allow iframe to execute scripts inside the frame
        - `allow-forms`: this will allow iframe to open forms 

--------------------------------------------------------------------------------------------------------------------------------

### Canvas

- Canvas is the HTML elements by which in a programmatic way to draw using javascript. It doesn't have any element or attribute to render. You need to use JS to draw

- We need to first get the canvas by Id `canvas = document.getElementById('myCanvas');`
- Then we can get the ctx `const ctx = canvas.getContext('2d')`
- Now we can draw a rectangle by
    - `ctx.beginPath()`
    - `ctx.fillStyle = 'red'`
    - `ctx.fillRect(posX, posY, heightX, heightY)`
    - `ctx.closePath()`
    - `ctx.fill()`
- To clear we use `ctx.clearReact(0,0,canvas.height, canvas.widht)`
- To draw circle
    - `ctx.beginPath()`
    - `ctx.lineWidth = 'red'`
    - `ctx.strokeStyle = 'red'`
    - `ctx.arc(posX, posY, radius, startDegree, endDegree)`
    - `ctx.closePath()`
    - `ctx.stroke()`
- To draw line from x1, y1 to x2, y2 
    - `ctx.moveTo(x1,y1)`
    - `ctx.lineTo(x2, y2)`

```javascript
//Exmaple of a simple clock
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const animate = () =>  {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
        renderClock(ctx);
        renderHands(ctx);
    }
    const renderClock = (ctx) => {
        ctx.beginPath();
        ctx.fillStyle ='yellow';
        ctx.strokeStyle ='green';
        ctx.lineWidth = 4;
        ctx.arc(400, 400, 300, 0, 2 * Math.PI);
        ctx.closePath()
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle ='red';
        ctx.beginPath();
        ctx.arc(400, 400, 3, 0, 2 * Math.PI);
        ctx.closePath()
        ctx.fill();
    }
    const renderHands = (ctx) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderClock(ctx);
        ctx.beginPath();
        
        angleSec = xSec * Math.PI / 180;
        angleMin = xMin * Math.PI / 180;
        let x1 = 400, y1 = 400;
        let x2 = x1 + 280 * Math.cos(angleSec);
        let y2 = y1 + 280 * Math.sin(angleSec);
        let x3 = x1 + 180 * Math.cos(angleMin);
        let y3 = y1 + 180 * Math.sin(angleMin);
        let x4 = x1 + 100 * Math.cos(angleMin);
        let y4 = y1 + 100 * Math.sin(angleMin);
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'black';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'blue';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x3, y3);
        ctx.stroke();
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'green';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x4, y4);
        ctx.stroke();
        xSec += 6; 
        xMin += 0.1;
        xHr += 6 / 3600;
        setTimeout(() => {
            requestAnimationFrame(() => renderHands(ctx));
        }, 1000 );
    }
    var xSec = -90;
    var xMin = -90;
    var xHr = -90;
    animate()
})
```
--------------------------------------------------------------------------------------------------------------------------------

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