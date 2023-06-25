
const calculateTotal =(numbers) =>{
    return numbers.reduce((acc,n)=>acc+n,0)
}

// console.log(calculateTotal([1,2,3]))

module.exports = {calculateTotal}