import { describe, expect, test } from "vitest"

import {
  POURING_BUCKET_TEMPLATE,
  TO_FILL_BUCKET_TEMPLATE,
} from "../../src/data"
import { transfer } from "../../src/utils/transfer"

describe("Transfer pouring bucket gallons when pouring bucket capacity is greater than to-fill-bucket capacity", () => {
  test("toFillBucket.currentGallons === 0.", () => {
    const pouringBucket = {
      ...POURING_BUCKET_TEMPLATE,
      currentGallons: 55,
      capacity: 55,
    }
    const toFillBucket = {
      ...TO_FILL_BUCKET_TEMPLATE,
      currentGallons: 0,
      capacity: 35,
    }

    expect(
      transfer({
        pouringBucket,
        toFillBucket,
      })
    ).toStrictEqual([
      { ...pouringBucket, currentGallons: 20 },
      { ...toFillBucket, currentGallons: toFillBucket.capacity },
    ])
  })

  test("pouringBucket.currentGallons === toFillBucket.currentGallons.", () => {
    const pouringBucket = {
      ...POURING_BUCKET_TEMPLATE,
      currentGallons: 25,
      capacity: 55,
    }
    const toFillBucket = {
      ...TO_FILL_BUCKET_TEMPLATE,
      currentGallons: 25,
      capacity: 35,
    }

    expect(
      transfer({
        pouringBucket,
        toFillBucket,
      })
    ).toStrictEqual([
      { ...pouringBucket, currentGallons: 15 },
      { ...toFillBucket, currentGallons: toFillBucket.capacity },
    ])
  })

  test("pouringBucket.currentGallons > toFillBucket.currentGallons", () => {
    const pouringBucket = {
      ...POURING_BUCKET_TEMPLATE,
      currentGallons: 25,
      capacity: 55,
    }
    const toFillBucket = {
      ...TO_FILL_BUCKET_TEMPLATE,
      currentGallons: 20,
      capacity: 35,
    }

    expect(
      transfer({
        pouringBucket,
        toFillBucket,
      })
    ).toStrictEqual([
      { ...pouringBucket, currentGallons: 10 },
      { ...toFillBucket, currentGallons: toFillBucket.capacity },
    ])
  })

  test("pouringBucket.currentGallons < toFillBucket.currentGallons", () => {
    const pouringBucket = {
      ...POURING_BUCKET_TEMPLATE,
      currentGallons: 20,
      capacity: 55,
    }
    const toFillBucket = {
      ...TO_FILL_BUCKET_TEMPLATE,
      currentGallons: 25,
      capacity: 35,
    }

    expect(
      transfer({
        pouringBucket,
        toFillBucket,
      })
    ).toStrictEqual([
      { ...pouringBucket, currentGallons: 10 },
      { ...toFillBucket, currentGallons: toFillBucket.capacity },
    ])
  })

  test("Transfer all pouring bucket gallons", () => {
    const pouringBucket = {
      ...POURING_BUCKET_TEMPLATE,
      currentGallons: 25,
      capacity: 55,
    }
    const toFillBucket = {
      ...TO_FILL_BUCKET_TEMPLATE,
      currentGallons: 0,
      capacity: 35,
    }

    expect(
      transfer({
        pouringBucket,
        toFillBucket,
      })
    ).toStrictEqual([
      { ...pouringBucket, currentGallons: 0 },
      { ...toFillBucket, currentGallons: pouringBucket.currentGallons },
    ])
  })
})
