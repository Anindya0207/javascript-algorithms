async function* fetchData() {
  let page = 0;
  while (true) {
    let res = await fetch('http://api.com' + page);
    let data = await res.json();
    if (data.length == 0) break;
    page++;
    yield data;
  }
}
const iterator = fetchData();
for await (const res of iterator) {
  console.log(res);
}
