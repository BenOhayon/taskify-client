import { it, expect, describe } from 'vitest'
import { add } from '../utils/utils'

describe("A sample test", () => {
    it("Test 1", () => {
        const num1 = 4
        const num2 = 10

        expect(add(num1, num2)).toEqual(14)
    })
})