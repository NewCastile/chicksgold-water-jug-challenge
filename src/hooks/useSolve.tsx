import { useEffect, useMemo, useState } from "react"

import { IBucket, TSolutionTrack } from "../types"

import { useTrack } from "./useTrack"

export const useSolve = ({ target }: { target: IBucket }) => {
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false)

  const [solutionTrack, setSolutionTrack] = useState<TSolutionTrack>({
    trackProcessDescription: "",
    trackSteps: [],
    trackStepsTaken: 0,
  })

  const stopCondition = useMemo(() => {
    return solutionTrack.trackSteps.length > 0
  }, [solutionTrack])

  const trackA = useTrack({
    target: target,
    stopCondition,
    trackProcessDescription: "Fill X and transfer to Y",
  })

  const trackB = useTrack({
    target: target,
    stopCondition,
    trackProcessDescription: "Fill Y and transfer to X",
  })

  const reset = () => {
    setIsEvaluating(false)
    setSolutionTrack({
      trackProcessDescription: "",
      trackSteps: [],
      trackStepsTaken: 0,
    })
    trackA.reset()
    trackB.reset()
  }

  // Sets the solution track and enables the form elements again
  useEffect(() => {
    if (stopCondition) {
      setIsEvaluating(false)

      return
    }
    if (trackA.trackIsFinished) {
      setSolutionTrack({
        trackSteps: trackA.trackSteps,
        trackProcessDescription: trackA.trackProcessDescription,
        trackStepsTaken: trackA.trackStepsTaken,
      })

      return
    }
    if (trackB.trackIsFinished) {
      setSolutionTrack({
        trackSteps: trackB.trackSteps,
        trackProcessDescription: trackB.trackProcessDescription,
        trackStepsTaken: trackB.trackStepsTaken,
      })

      return
    }
  }, [stopCondition, trackA, trackB])

  return { trackA, trackB, solutionTrack, isEvaluating, setIsEvaluating, reset }
}
