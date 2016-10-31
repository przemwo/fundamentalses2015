const arr = [1, 2, 4, 5];
arr.filter(item => {
  console.log(this === arr);
  return item * 2;
});

console.log(arr);
