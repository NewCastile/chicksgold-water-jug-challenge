import { IOperableBucket } from "../types"

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

export const MAX_ITERATIONS = 56
