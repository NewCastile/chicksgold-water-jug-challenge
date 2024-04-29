import { describe, expect, test } from "vitest"

import { VALIDATION_MESSAGES } from "../../src/data"
import { validateForm } from "../../src/utils/form-validation"

describe("Validate form", () => {
  test("One of the capacities is not an integer", () => {
    expect(
      validateForm({
        bucketXCapacity: 2.2,
        bucketYCapacity: 2,
        targetCapacity: 4,
      })
    ).toStrictEqual({
      success: false,
      message: VALIDATION_MESSAGES.error.capacitiesNotIntegers,
    })
  })

  test("One of the capacities is equal to zero", () => {
    expect(
      validateForm({
        bucketXCapacity: 0,
        bucketYCapacity: 2,
        targetCapacity: 4,
      })
    ).toStrictEqual({
      success: false,
      message: VALIDATION_MESSAGES.error.capacityEqualsZero,
    })
  })

  test("None of the buckets has enough capacity for target", () => {
    expect(
      validateForm({
        bucketXCapacity: 10,
        bucketYCapacity: 4,
        targetCapacity: 100,
      })
    ).toStrictEqual({
      success: false,
      message: VALIDATION_MESSAGES.error.notEnoughCapacity,
    })
  })

  test("GCD of X and Y is not divisible by target capacity", () => {
    expect(
      validateForm({
        bucketXCapacity: 2,
        bucketYCapacity: 10,
        targetCapacity: 7,
      })
    ).toStrictEqual({
      success: false,
      message: VALIDATION_MESSAGES.error.targetNotDivisibleByGCD,
    })
  })

  test("Has solution", () => {
    expect(
      validateForm({
        bucketXCapacity: 2,
        bucketYCapacity: 10,
        targetCapacity: 4,
      })
    ).toStrictEqual({
      success: true,
      message: VALIDATION_MESSAGES.succcess.hasSolution,
    })
  })
})
