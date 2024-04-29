import { expect, test } from "vitest"

import {
  POURING_BUCKET_TEMPLATE,
  TO_FILL_BUCKET_TEMPLATE,
} from "../../src/data"
import { transfer } from "../../src/utils/transfer"

test("Fill pouring bucket when empty", () => {
  const pouringBucket = { ...POURING_BUCKET_TEMPLATE, capacity: 12 }

  expect(
    transfer({
      pouringBucket,
      toFillBucket: TO_FILL_BUCKET_TEMPLATE,
    })
  ).toStrictEqual([
    { ...pouringBucket, currentGallons: pouringBucket.capacity },
    TO_FILL_BUCKET_TEMPLATE,
  ])
})
