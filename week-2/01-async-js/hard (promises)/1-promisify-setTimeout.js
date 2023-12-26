/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            // console.log('promise has been resolved');
            resolve();
        }, n*1000);
    })
}

// let a = wait(2)
// a.then((s) => {
    // console.log("hi from then", s)
// });
// console.log("called wait");



module.exports = wait;
