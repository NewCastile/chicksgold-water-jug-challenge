import { act, renderHook } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import {
  POURING_BUCKET_TEMPLATE,
  TO_FILL_BUCKET_TEMPLATE,
} from "../../src/data"
import { useSolve } from "../../src/hooks/useSolve"

describe("Find optimal solution", () => {
  test("Optimal solution should be track A", async () => {
    const { result } = renderHook(() =>
      useSolve({ target: { capacity: 4, tag: "target" } })
    )

    expect(result.current.trackA.trackStepsTaken).toBe(0)
    expect(result.current.trackA.trackIsFinished).toBe(false)

    expect(result.current.trackB.trackStepsTaken).toBe(0)
    expect(result.current.trackB.trackIsFinished).toBe(false)

    expect(result.current.isEvaluating).toBe(false)

    expect(result.current.solutionTrack.trackStepsTaken).toBe(0)

    act(() => {
      result.current.trackA.setTrackSteps((old) =>
        old.concat([
          [
            { ...POURING_BUCKET_TEMPLATE, capacity: 2 },
            { ...TO_FILL_BUCKET_TEMPLATE, capacity: 10 },
          ],
        ])
      )

      result.current.trackB.setTrackSteps((old) =>
        old.concat([
          [
            { ...POURING_BUCKET_TEMPLATE, capacity: 10 },
            { ...TO_FILL_BUCKET_TEMPLATE, capacity: 2 },
          ],
        ])
      )
    })

    act(() => {
      expect(result.current.solutionTrack.trackStepsTaken).toBeGreaterThan(0)
      expect(result.current.solutionTrack.trackSteps).toStrictEqual(
        result.current.trackA.trackSteps
      )
      expect(result.current.solutionTrack.trackStepsTaken).lessThan(
        result.current.trackB.trackStepsTaken
      )
    })
  })
})
