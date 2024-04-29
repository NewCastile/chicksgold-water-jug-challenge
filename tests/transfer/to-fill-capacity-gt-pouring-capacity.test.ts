import { describe, expect, test } from "vitest"

import {
  POURING_BUCKET_TEMPLATE,
  TO_FILL_BUCKET_TEMPLATE,
} from "../../src/data"
import { transfer } from "../../src/utils/transfer"

describe("Transfer pouring bucket gallons when to-fill bucket capacity is greater than pouring bucket capacity", () => {
  test("toFillBucket.currentGallons === 0", () => {
    const pouringBucket = {
      ...POURING_BUCKET_TEMPLATE,
      currentGallons: 35,
      capacity: 35,
    }
    const toFillBucket = {
      ...TO_FILL_BUCKET_TEMPLATE,
      currentGallons: 0,
      capacity: 55,
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

  test("pouringBucket.currentGallons === toFillBucket.currentGallons", () => {
    const pouringBucket = {
      ...POURING_BUCKET_TEMPLATE,
      currentGallons: 35,
      capacity: 35,
    }
    const toFillBucket = {
      ...TO_FILL_BUCKET_TEMPLATE,
      currentGallons: 35,
      capacity: 55,
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
      currentGallons: 30,
      capacity: 35,
    }
    const toFillBucket = {
      ...TO_FILL_BUCKET_TEMPLATE,
      currentGallons: 25,
      capacity: 45,
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
      capacity: 35,
    }
    const toFillBucket = {
      ...TO_FILL_BUCKET_TEMPLATE,
      currentGallons: 30,
      capacity: 45,
    }

    expect(
      transfer({
        pouringBucket,
        toFillBucket,
      })
    ).toStrictEqual([
      { ...pouringBucket, currentGallons: 5 },
      { ...toFillBucket, currentGallons: toFillBucket.capacity },
    ])
  })

  test("Transfer all pouring bucket gallons", () => {
    const pouringBucket = {
      ...POURING_BUCKET_TEMPLATE,
      currentGallons: 35,
      capacity: 35,
    }
    const toFillBucket = {
      ...TO_FILL_BUCKET_TEMPLATE,
      currentGallons: 15,
      capacity: 55,
    }

    expect(
      transfer({
        pouringBucket,
        toFillBucket,
      })
    ).toStrictEqual([
      { ...pouringBucket, currentGallons: 0 },
      { ...toFillBucket, currentGallons: 50 },
    ])
  })
})
