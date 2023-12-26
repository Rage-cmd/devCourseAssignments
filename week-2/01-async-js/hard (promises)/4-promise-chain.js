/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();   
        }, t*1000)
    })
}

function wait2(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();   
        }, t*1000)
    })
}

function wait3(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();   
        }, t*1000)
    })
}

function calculateTime(t1, t2, t3) {
    const start = Date.now();
    console.log(start);
    return wait1(t1)
    .then(() => wait2(t2))
    .then(() => wait3(t3))
    .then(() => {
        const end = Date.now();
        return end - start;
    })

    // not the right way, once whatever in then has been completed, it goes to the next then
    
//     In this code, the promises are also chained, but the structure is nested. Each then handler is wrapped inside another then handler. This creates a pyramid-shaped structure, often referred to as "callback hell" or the "pyramid of doom." While this structure can make the code harder to read and maintain, it achieves the same result as the first code snippet.

// Choosing Between the Two:
// The first code snippet is generally preferred for its cleaner and more readable structure. It follows the principle of "promises chaining," where each then handler returns a promise, allowing for a linear sequence of asynchronous operations.

// The second code snippet, with its nested structure, may lead to less readable and more error-prone code. It's often recommended to avoid excessive nesting of then handlers and instead favor a flatter structure to enhance code clarity and maintainability.

// In summary, prefer the first approach for its clarity, and readability. If you have multiple asynchronous operations that need to be executed sequentially, chaining promises in a flat structure is a cleaner and more maintainable option.
    
    // return wait1(t1)
    // .then(() => { 
    //     wait2(t2)
    //     .then(() => {
    //         wait3(t3)
    //         .then(() => {
    //             const end = Date.now();
    //             // console.log(end - start);
    //             return end - start;
    //         })
    //     })
    // })
    
}

module.exports = calculateTime;
