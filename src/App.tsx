import { useEffect, useState } from "react"

import { SolutionTrack } from "./components/SolutionTrack"
import { POURING_BUCKET_TEMPLATE, TO_FILL_BUCKET_TEMPLATE } from "./data"
import { useTrack } from "./hooks/useTrack"
import { OperableBucket, ProblemParameters } from "./types"
import { validateForm } from "./utils/form-validation"
import "./App.css"

function App() {
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false)

  const [error, setError] = useState<string>("")

  const [target, setTarget] = useState<{ tag: string; capacity: number }>({
    tag: "target",
    capacity: 0,
  })

  const {
    track: trackA,
    setTrack: setTrackA,
    trackIsFinished: trackAIsFinished,
    trackIterations: trackAIterations,
    trackProcessDescription: trackAProcessDescription,
  } = useTrack({
    target: target,
    trackProcessDescription: "Fill X and transfer to Y",
  })

  const {
    track: trackB,
    setTrack: setTrackB,
    trackIsFinished: trackBIsFinished,
    trackIterations: trackBIterations,
    trackProcessDescription: trackBProcessDescription,
  } = useTrack({
    target: target,
    trackProcessDescription: "Fill Y and transfer to X",
  })

  const [solutionTrack, setSolutionTrack] = useState<OperableBucket[][]>([])
  const [solutionTrackProcessDescription, setSolutionTrackProcessDescription] =
    useState<string>("")

  useEffect(() => {
    if (trackA.length && trackB.length) {
      const optimalSolution = trackA.length > trackB.length ? trackB : trackA
      const optimalSolutionProcessDescription =
        trackA.length > trackB.length
          ? trackBProcessDescription
          : trackAProcessDescription

      setSolutionTrack(optimalSolution)
      setSolutionTrackProcessDescription(optimalSolutionProcessDescription)
    }
  }, [
    trackA,
    trackB,
    trackAIsFinished,
    trackBIsFinished,
    trackAProcessDescription,
    trackBProcessDescription,
  ])

  const startSolution = ({
    bucketXCapacity,
    bucketYCapacity,
    targetCapacity,
  }: ProblemParameters) => {
    setIsEvaluating(true)
    setTrackA((old) =>
      old.concat([
        [
          { ...POURING_BUCKET_TEMPLATE, capacity: bucketXCapacity },
          { ...TO_FILL_BUCKET_TEMPLATE, capacity: bucketYCapacity },
        ],
      ])
    )
    setTrackB((old) =>
      old.concat([
        [
          { ...POURING_BUCKET_TEMPLATE, capacity: bucketYCapacity },
          { ...TO_FILL_BUCKET_TEMPLATE, capacity: bucketXCapacity },
        ],
      ])
    )
    setTarget((old) => ({ ...old, capacity: targetCapacity }))
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const [bucketXCapacity, bucketYCapacity, targetCapacity] = Array.from(
      formData.values()
    ).map((value) => Number(value))

    const { success, message } = validateForm({
      bucketXCapacity,
      bucketYCapacity,
      targetCapacity,
    })

    if (!success) {
      setError(message)
      setIsEvaluating(false)
    }

    startSolution({ bucketXCapacity, bucketYCapacity, targetCapacity })
  }

  return (
    <main className={"w-full flex-col items-center justify-start space-y-4"}>
      <form
        className={"flex flex-row items-center justify-center gap-8"}
        onSubmit={handleFormSubmit}
      >
        <div className={"flex flex-col items-center justify-center gap-2"}>
          <label htmlFor={"bucket-x"}>Bucket X</label>
          <input
            required
            disabled={isEvaluating}
            id={"bucket-x"}
            min={1}
            name={"bucket-x"}
            placeholder={""}
            step={1}
            type={"number"}
          />
        </div>
        <div className={"flex flex-col items-center justify-center gap-2"}>
          <label htmlFor={"bucket-y"}>Bucket Y</label>
          <input
            required
            disabled={isEvaluating}
            id={"bucket-y"}
            min={1}
            name={"bucket-y"}
            placeholder={""}
            step={1}
            type={"number"}
          />
        </div>
        <div>
          <span
            className={"inline-flex items-center justify-center align-middle"}
          >
            =
          </span>
        </div>
        <div className={"flex flex-col items-center justify-center gap-2"}>
          <label htmlFor={"target"}>Target</label>
          <input
            required
            disabled={isEvaluating}
            id={"target"}
            min={1}
            name={"target"}
            placeholder={""}
            step={1}
            type={"number"}
          />
        </div>
        <button type={"submit"}>evaluate</button>
      </form>
      {error && <p>{error}</p>}
      <div className={"grid grid-cols-3"}>
        <div
          className={"flex h-full flex-col items-center justify-start gap-4"}
        >
          <pre>{trackAProcessDescription}</pre>
          <pre>Iterations: {trackAIterations}</pre>
          <SolutionTrack {...{ solutionTrack: trackA }} />
        </div>
        <div
          className={"flex h-full flex-col items-center justify-start gap-4"}
        >
          <pre>{trackBProcessDescription}</pre>
          <pre>Iterations: {trackBIterations}</pre>
          <SolutionTrack {...{ solutionTrack: trackB }} />
        </div>
        <div
          className={"flex h-full flex-col items-center justify-start gap-4"}
        >
          <pre>Optimal Solution</pre>
          <pre className={"underline decoration-red-500 decoration-4"}>
            {solutionTrackProcessDescription}
          </pre>
          <SolutionTrack {...{ solutionTrack: solutionTrack }} />
        </div>
      </div>
    </main>
  )
}

export default App
