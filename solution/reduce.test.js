const getReduce = require('./index')
const pg = require('../src/playground')

const reduce = getReduce(Homework)
const arr = new Homework.AsyncArray([1, 2, 3, 4])
const reducerSum = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb);
const reducerSub = (acc, curr, i, src, cb) => Homework.subtract(acc, curr, cb);
const reducerMult = (acc, curr, i, src, cb) => Homework.multiply(acc, curr, cb);
const reducerDiv = (acc, curr, i, src, cb) => Homework.divide(acc, curr, cb);

test('sum of 1, 2, 3, 4 equals 10', () => {
    reduce(arr, reducerSum, 0, (res) => {
        expect(res).toBe(1 + 2 + 3 + 4)
    })
})
test('sub of 1, 2, 3, 4 equals 10', () => {
    reduce(arr, reducerSub, 0, (res) => {
        expect(res).toBe(-1 - 2 - 3 - 4)
    })
})
test('mult of 1, 2, 3, 4 equals 24', () => {
    reduce(arr, reducerMult, 1, (res) => {
        expect(res).toBe(1 * 2 * 3 * 4)
    })
})
test('div of 1, 2, 3, 4 equals ~0.416', () => {
    reduce(arr, reducerDiv, 1, (res) => {
        expect(res).toBe(1 / 2 / 3 / 4)
    })
})
