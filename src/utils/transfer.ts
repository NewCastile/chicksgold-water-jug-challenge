import { OperableBucket } from "../types"

export const transfer = ({
  fillingBucket,
  toFillBucket,
}: {
  fillingBucket: OperableBucket
  toFillBucket: OperableBucket
}) => {
  // filling bucket is empty, fill it first
  if (fillingBucket.currentGallons === 0) {
    const fillBucketStep = {
      ...fillingBucket,
      currentGallons: fillingBucket.capacity,
    }

    return [fillBucketStep, toFillBucket]
  }

  if (toFillBucket.currentGallons === toFillBucket.capacity) {
    const toFillBucketStep = { ...toFillBucket, currentGallons: 0 }

    return [fillingBucket, toFillBucketStep]
  } else {
    // fillingBucket can transfer
    // toFillBucket is full, empty it first
    if (toFillBucket.currentGallons === 0) {
      if (fillingBucket.currentGallons < toFillBucket.capacity) {
        const newFillingBucket = {
          ...fillingBucket,
          currentGallons: 0,
        }
        const newToFillBucket = {
          ...toFillBucket,
          currentGallons: fillingBucket.currentGallons,
        }

        return [newFillingBucket, newToFillBucket]
      }
      // fill the other bucket completely
      if (fillingBucket.currentGallons > toFillBucket.capacity) {
        const fillinBucketRemainingGalons = Math.abs(
          fillingBucket.currentGallons - toFillBucket.capacity
        )
        const newFillingBucket = {
          ...fillingBucket,
          currentGallons: fillinBucketRemainingGalons,
        }
        const newToFillBucket = {
          ...toFillBucket,
          currentGallons: toFillBucket.capacity,
        }

        return [newFillingBucket, newToFillBucket]
      }
    }

    if (
      fillingBucket.currentGallons + toFillBucket.currentGallons >=
      toFillBucket.capacity
    ) {
      const amountToPour = Math.abs(
        toFillBucket.currentGallons - toFillBucket.capacity
      )
      const newFillingBucket = {
        ...fillingBucket,
        currentGallons: Math.abs(amountToPour - fillingBucket.currentGallons),
      }
      const newtoFillBucket = {
        ...toFillBucket,
        currentGallons: amountToPour + toFillBucket.currentGallons,
      }

      return [newFillingBucket, newtoFillBucket]
    }

    const newFillingBucket = { ...fillingBucket, currentGallons: 0 }
    const newToFillBucket = {
      ...toFillBucket,
      currentGallons:
        fillingBucket.currentGallons + toFillBucket.currentGallons,
    }

    return [newFillingBucket, newToFillBucket]
  }
}
