const { calculateTotal } = require("../for_test")

describe('test of calculateTotal',()=>{
    test('sum of [1,2,3]',()=>{
        const result = calculateTotal([1,2,3])
        expect(result).toBe(6)
    })

    test('sum of [1] ',()=>{
        expect(calculateTotal([1])).toBe(1)
    })

    test('sum of [] ',()=>{
        expect(calculateTotal([])).toBe(0)
    })
})
