console.log("The directory name of the current module : "+__dirname); //This variable may appear to be global but is not
console.log("The file name o  the current module. This is the resolved absolute path of the current module file : "+__filename);

// console.log(console); // console is also a global object
console.log("-------------------------------------------------------------------------------"); //line break in console

//function declaration expression Type 1
function logging(){
  console.log("Logging function called");
};
logging();

//function declaration expression Type 2
const logging1 = function(){
  console.log("Logging1 function called");
};
logging1();

//function declaration expression Type 3
const logging2 = () =>{
  console.log("Logging2 function called");
};
logging2();

console.log("-------------------------------------------------------------------------------"); //line break in console

var interval = setInterval(logging1,1000);
var clear = () => {
    clearInterval(interval);
};

setTimeout(clear,3000);

console.log("-------------------------------------------------------------------------------"); //line break in console

console.log(module);
