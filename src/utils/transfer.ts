import { IOperableBucket } from "../types"

export const transfer = ({
  pouringBucket,
  toFillBucket,
}: {
  pouringBucket: IOperableBucket
  toFillBucket: IOperableBucket
}) => {
  // filling bucket is empty, fill it first
  if (pouringBucket.currentGallons === 0) {
    const fillBucketStep = {
      ...pouringBucket,
      currentGallons: pouringBucket.capacity,
    }

    return [fillBucketStep, toFillBucket]
  }

  // toFillBucket is full, empty it first
  if (toFillBucket.currentGallons === toFillBucket.capacity) {
    const toFillBucketStep = { ...toFillBucket, currentGallons: 0 }

    return [pouringBucket, toFillBucketStep]
  }

  // pouringBucket can transfer
  if (toFillBucket.currentGallons === 0) {
    // fill the other bucket completely
    if (pouringBucket.currentGallons <= toFillBucket.capacity) {
      const newPouringBucket = {
        ...pouringBucket,
        currentGallons: 0,
      }
      const newToFillBucket = {
        ...toFillBucket,
        currentGallons: pouringBucket.currentGallons,
      }

      return [newPouringBucket, newToFillBucket]
    } else {
      const pouringBucketRemainingGalons = Math.abs(
        pouringBucket.currentGallons - toFillBucket.capacity
      )
      const newPouringBucket = {
        ...pouringBucket,
        currentGallons: pouringBucketRemainingGalons,
      }
      const newToFillBucket = {
        ...toFillBucket,
        currentGallons: toFillBucket.capacity,
      }

      return [newPouringBucket, newToFillBucket]
    }
  }

  if (
    pouringBucket.currentGallons + toFillBucket.currentGallons >=
    toFillBucket.capacity
  ) {
    const amountToPour = Math.abs(
      toFillBucket.currentGallons - toFillBucket.capacity
    )

    const pouringBucketRemainingGalons = Math.abs(
      amountToPour - pouringBucket.currentGallons
    )
    const newPouringBucket = {
      ...pouringBucket,
      currentGallons: pouringBucketRemainingGalons,
    }
    const newtoFillBucket = {
      ...toFillBucket,
      currentGallons: amountToPour + toFillBucket.currentGallons,
    }

    return [newPouringBucket, newtoFillBucket]
  } else {
    const newPouringBucket = { ...pouringBucket, currentGallons: 0 }
    const newToFillBucket = {
      ...toFillBucket,
      currentGallons:
        pouringBucket.currentGallons + toFillBucket.currentGallons,
    }

    return [newPouringBucket, newToFillBucket]
  }
}
