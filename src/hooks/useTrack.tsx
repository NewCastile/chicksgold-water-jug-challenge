import { useEffect, useMemo, useState } from "react"

import { MAX_ITERATIONS } from "../data"
import { IOperableBucket, IUseTrackArguments } from "../types"
import { isEmpty } from "../utils/array-is-empty"
import { transfer } from "../utils/transfer"

export const useTrack = ({
  target,
  stopCondition,
  trackProcessDescription,
}: IUseTrackArguments) => {
  const [trackSteps, setTrackSteps] = useState<IOperableBucket[][]>([])
  const [trackIsFinished, setTrackIsFinished] = useState<boolean>(false)

  const [iterationIndex, setIterationsIndex] = useState<number>(0)

  const trackStepsTaken = useMemo(() => {
    // steps are counted after filling the pouring bucket
    if (trackSteps.length > 0) return trackSteps.length - 1

    return trackSteps.length
  }, [trackSteps])

  // Keeps an strinfied version of the steps taken to make the comparison easier
  const [stringifiedTrackSteps, setStringifiedtrackSteps] = useState<string[]>(
    []
  )

  const reset = () => {
    setTrackSteps([])
    setTrackIsFinished(false)
    setIterationsIndex(0)
  }

  // Adds the stringified version of last step taken to the stringified steps array
  useEffect(() => {
    if (trackSteps.length > 0) {
      const [lastTrackStep] = trackSteps.slice(-1)
      const stringifedLastTrackStep = JSON.stringify(lastTrackStep)

      setStringifiedtrackSteps((old) => old.concat(stringifedLastTrackStep))
    }
  }, [trackSteps])

  // Computes the next track step to complete the goal and stops the loop from continuing after achieving the goal
  useEffect(() => {
    // Prevents the loop from continuing after it completes the goal
    if (stopCondition || trackIsFinished) {
      return
    }

    if (iterationIndex < MAX_ITERATIONS) {
      if (isEmpty(trackSteps)) return

      const { capacity: targetCapacity } = target

      const [trackLastStep] = trackSteps.slice(-1)

      // Ends the loop in case one of the buckets has the targeted gallons
      if (
        trackLastStep.some((bucket) => bucket.currentGallons === targetCapacity)
      ) {
        setTrackIsFinished(true)

        return
      }

      const [lastTrackBucketX, lastTrackBucketY] = trackLastStep

      const nextTrackStep = transfer({
        pouringBucket: lastTrackBucketX,
        toFillBucket: lastTrackBucketY,
      })

      const stringifiedNextTrackStep = JSON.stringify(nextTrackStep)

      // Ends the loop in case the next step has been taken
      if (
        stringifiedTrackSteps.some(
          (trackStepTaken) => trackStepTaken === stringifiedNextTrackStep
        )
      ) {
        return
      }

      const [newTrackBucketX, newTrackBucketY] = nextTrackStep

      // Adds the new step to the array of steps and continues the loop
      setTrackSteps((old) => old.concat([[newTrackBucketX, newTrackBucketY]]))
    }
  }, [
    iterationIndex,
    stopCondition,
    stringifiedTrackSteps,
    target,
    trackIsFinished,
    trackSteps,
  ])

  // updates the loop index when the track's steps changes
  useEffect(() => {
    setIterationsIndex((old) => old + 1)
  }, [trackSteps])

  return {
    trackSteps,
    setTrackSteps,
    stringifiedTrackSteps,
    trackProcessDescription,
    trackStepsTaken,
    trackIsFinished,
    reset,
  }
}
