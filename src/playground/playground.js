const fn = (arr) => {
  let missing = 0, duplicate = 0
  for(var i = 0; i < 32; i++) {
     let  count1 = 0, count2 = 0;
     for(var j = 1; j <= arr.length; j++) {
      let num = arr[j-1];
      if(num & (1<<i)) count1++;
      if(j & (1<<i)) count2++;
     }
     if(count1 > count2) {
      duplicate += (1<< i)
     } else if (count2 > count1) {
      missing += (1 << i)
     } else if(count2 == count1 && count1 > 0) {
      duplicate += (1<< i);
      missing += (1 << i)
     }
  }
  return [duplicate, missing]
  
}