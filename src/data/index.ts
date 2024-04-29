import { IOperableBucket, TTrackProps } from "../types"

export const POURING_BUCKET_TEMPLATE: IOperableBucket = {
  tag: "pouring-bucket",
  capacity: 0,
  currentGallons: 0,
}

export const TO_FILL_BUCKET_TEMPLATE: IOperableBucket = {
  tag: "to-fill-bucket",
  capacity: 0,
  currentGallons: 0,
}

export const SOLUTION_TRACK_MOCK_DATA: TTrackProps = {
  trackProcessDescription: "Fill X then transfer to Y",
  trackSteps: [],
  trackStepsTaken: 0,
}

export const MAX_ITERATIONS = 56

export const VALIDATION_MESSAGES = {
  error: {
    capacityEqualsZero: "Specify a capacity for all the bucket",
    capacitiesNotIntegers: "The buckets capacities must be integers >:(",
    notEnoughCapacity:
      "None of the jugs has enough capacity to solve the problem :'c",
    targetNotDivisibleByGCD:
      "It is mathematically imposible to solve this problem :'c",
  },
  succcess: {
    hasSolution: "Problem has  a solution c:",
  },
}
