export interface Bucket {
  tag: string
  capacity: number
}

export interface OperableBucket extends Bucket {
  currentGallons: number
}

export interface ProblemParameters {
  bucketXCapacity: number
  bucketYCapacity: number
  targetCapacity: number
}

export interface FormValidationResult {
  success: boolean
  message: string
}
