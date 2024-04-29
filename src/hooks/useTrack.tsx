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
  const [trackIsFinished, setTrackIsFinished] = useState<boolean>()

  const [iterationIndex, setIterationsIndex] = useState<number>(0)

  const trackStepsTaken = useMemo(() => {
    return trackSteps.length
  }, [trackSteps])

  const [stringifiedTrackSteps, setStringifiedtrackSteps] = useState<string[]>(
    []
  )

  useEffect(() => {
    if (trackSteps.length > 0) {
      const lastTrackStep = trackSteps.slice(-1)
      const stringifedLastTrackStep = JSON.stringify(lastTrackStep)

      setStringifiedtrackSteps((old) => old.concat(stringifedLastTrackStep))
    }
  }, [trackSteps])

  useEffect(() => {
    if (stopCondition) {
      return
    }
    if (trackIsFinished) return
    if (iterationIndex < MAX_ITERATIONS) {
      if (isEmpty(trackSteps)) return

      const { capacity: targetCapacity } = target

      const [trackLastStep] = trackSteps.slice(-1)

      if (
        trackLastStep.some((bucket) => bucket.currentGallons === targetCapacity)
      ) {
        setTrackIsFinished(true)
      }

      const [lastTrackABucketX, lastTrackABucketY] = trackLastStep

      const nextTrackStep = transfer({
        pouringBucket: lastTrackABucketX,
        toFillBucket: lastTrackABucketY,
      })

      const stringifiedNextTrackStep = JSON.stringify(nextTrackStep)

      // End the loop in case the next step has been taken
      if (
        stringifiedTrackSteps.some(
          (trackStepTaken) => trackStepTaken === stringifiedNextTrackStep
        )
      ) {
        return
      }

      const [newTrackBucketX, newTrackBucketY] = nextTrackStep

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
  }
}
