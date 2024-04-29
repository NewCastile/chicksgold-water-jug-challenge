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
      message: "Specify a capacity for all the bucket",
    }
  }

  if (
    [bucketXCapacity, bucketYCapacity, targetCapacity].some(
      (capacity) => !Number.isInteger(capacity)
    )
  ) {
    return {
      success: false,
      message: "The buckets capacities must be integers >:(",
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
      message: "None of the jugs has enough capacity to solve the problem :'c",
    }
  }

  const capacitiesGCD = calculateGCD(maxCapacity, minCapacity)

  if (targetCapacity % capacitiesGCD != 0) {
    return {
      success: false,
      message: "It is mathematically imposible to solve this problem :'c",
    }
  }

  return { success: true, message: "Problem has  a solution c:" }
}
