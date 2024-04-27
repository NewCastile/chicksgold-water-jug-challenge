import { useEffect, useMemo, useState } from "react"

import { MAX_ITERATIONS } from "../data"
import { Bucket, OperableBucket } from "../types"
import { isEmpty } from "../utils/array-is-empty"
import { transfer } from "../utils/transfer"

export const useTrack = ({
  target,
  trackProcessDescription,
}: {
  target: Bucket
  trackProcessDescription: string
}) => {
  const [track, setTrack] = useState<OperableBucket[][]>([])
  const [trackIsFinished, setTrackIsFinished] = useState<boolean>()

  const [trackIterationIndex, setTrackIterations] = useState<number>(0)

  const trackIterations = useMemo(() => {
    return track.length
  }, [track])

  useEffect(() => {
    if (trackIterationIndex < MAX_ITERATIONS) {
      if (isEmpty(track)) return

      const { capacity: targetCapacity } = target

      const [trackALastStep] = track.slice(-1)

      if (
        trackALastStep.some(
          (bucket) => bucket.currentGallons === targetCapacity
        )
      ) {
        setTrackIsFinished(true)

        return
      }

      const [lastTrackABucketX, lastTrackABucketY] = trackALastStep

      const transferFromXtoYStep = transfer({
        fillingBucket: lastTrackABucketX,
        toFillBucket: lastTrackABucketY,
      })

      const [newTrackABucketX, newTrackABucketY] = transferFromXtoYStep

      setTrack((old) => old.concat([[newTrackABucketX, newTrackABucketY]]))
    }
  }, [target, track, trackIterationIndex])

  useEffect(() => {
    setTrackIterations((old) => old + 1)
  }, [track])

  return {
    track,
    setTrack,
    trackProcessDescription,
    trackIterations,
    trackIsFinished,
  }
}
