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
    - `<script nonce="random-value"></script>   ` - this type of CSP allows only nonce enabled script minimising the chance of attacks
- Use some std library like `DOMPurify` to sanitise userInput
- use security headers while emitting user data to server like
    - `X-Content-Type-Options: nosniff`: Prevents MIME-type sniffing, which could allow attackers to bypass security mechanisms by interpreting files as different types.
    - `X-XSS-Protection`: Enables the browser's built-in XSS filter.
    - `X-Frame-Options`: Prevents clickjacking attacks by disallowing your website to be loaded in iframes.
- use serverside protection like `app.use(helmet())`


--------------------------------------------------------------------------------------------------------------------------------