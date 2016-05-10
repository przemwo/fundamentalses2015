let foo = ({x = 10} = {}, {y} = {y: 10}) => {
  console.log(x,y);
};


let bar = ({x = 10, y = 20} = {}) => {
  console.log(x, y);
};
bar({y: 200});
