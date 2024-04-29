import { expect, test } from "vitest"

import {
  POURING_BUCKET_TEMPLATE,
  TO_FILL_BUCKET_TEMPLATE,
} from "../../src/data"
import { transfer } from "../../src/utils/transfer"

test("Empty to-fill bucket when full", () => {
  const pouringBucket = {
    ...POURING_BUCKET_TEMPLATE,
    currentGallons: 12,
    capacity: 24,
  }

  const toFillBucket = {
    ...TO_FILL_BUCKET_TEMPLATE,
    currentGallons: 12,
    capacity: 12,
  }

  expect(
    transfer({
      pouringBucket,
      toFillBucket,
    })
  ).toStrictEqual([pouringBucket, { ...toFillBucket, currentGallons: 0 }])
})
