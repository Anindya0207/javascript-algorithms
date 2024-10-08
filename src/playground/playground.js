let arr = [{id:1}, {id: 2}, {id: 3}]

for(let a of arr) {
  console.log(a)
}
for(let key in arr) {
  console.log(key)
  console.log(arr[key])
}