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
