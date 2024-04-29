import { act, render, renderHook } from "@testing-library/react"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react"
import { describe, expect, it, test } from "vitest"

import App from "../../src/App"
import { SolutionTrack } from "../../src/components/SolutionTrack"
import {
  POURING_BUCKET_TEMPLATE,
  SOLUTION_TRACK_MOCK_DATA,
  TO_FILL_BUCKET_TEMPLATE,
} from "../../src/data"
import { useSolve } from "../../src/hooks/useSolve"

describe("Find optimal solution", () => {
  it("should render", () => {
    render(<App />)
  })

  it("should render", () => {
    render(
      <SolutionTrack
        {...{
          track: SOLUTION_TRACK_MOCK_DATA,
        }}
      />
    )
  })

  const { getByTestId, queryAllByTestId } = render(<App />)

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
    render(<SolutionTrack {...{ track: result.current.solutionTrack }} />)
    getByTestId("solution-steps-taken")
    queryAllByTestId("solution-step")
  })
})
