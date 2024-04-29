import { VALIDATION_MESSAGES } from "../data"
import { IFormValidationResult, IProblemParameters } from "../types"

import { calculateGCD } from "./calculate-gcd"

export const validateForm = ({
  bucketXCapacity,
  bucketYCapacity,
  targetCapacity,
}: IProblemParameters): IFormValidationResult => {
  if (
    [bucketXCapacity, bucketYCapacity, targetCapacity].some(
      (capacity) => capacity === 0
    )
  ) {
    return {
      success: false,
      message: VALIDATION_MESSAGES.error.capacityEqualsZero,
    }
  }

  if (
    [bucketXCapacity, bucketYCapacity, targetCapacity].some(
      (capacity) => !Number.isInteger(capacity)
    )
  ) {
    return {
      success: false,
      message: VALIDATION_MESSAGES.error.capacitiesNotIntegers,
    }
  }

  const [minCapacity, maxCapacity] = [bucketXCapacity, bucketYCapacity].sort(
    (a, b) => {
      return a - b
    }
  )

  if (targetCapacity > maxCapacity && targetCapacity > minCapacity) {
    return {
      success: false,
      message: VALIDATION_MESSAGES.error.notEnoughCapacity,
    }
  }

  const capacitiesGCD = calculateGCD(maxCapacity, minCapacity)

  if (targetCapacity % capacitiesGCD !== 0) {
    return {
      success: false,
      message: VALIDATION_MESSAGES.error.targetNotDivisibleByGCD,
    }
  }

  return { success: true, message: VALIDATION_MESSAGES.succcess.hasSolution }
}
