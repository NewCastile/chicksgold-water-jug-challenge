import { useEffect, useMemo, useState } from "react"

import { ErrorMessage } from "./components/ErrorMesssage"
import { Form } from "./components/Form"
import { SolutionTrack } from "./components/SolutionTrack"
import { POURING_BUCKET_TEMPLATE, TO_FILL_BUCKET_TEMPLATE } from "./data"
import { useTrack } from "./hooks/useTrack"
import { IProblemParameters, TSolutionTrack } from "./types"
import { validateForm } from "./utils/form-validation"

import "./App.css"

function App() {
  // Boolean used to disable the form elements after the operation starts
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false)

  const [error, setError] = useState<string>("")

  const [target, setTarget] = useState<{ tag: string; capacity: number }>({
    tag: "target",
    capacity: 0,
  })

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

  const startSolution = ({
    bucketXCapacity,
    bucketYCapacity,
    targetCapacity,
  }: IProblemParameters) => {
    setIsEvaluating(true)
    setTarget((old) => ({ ...old, capacity: targetCapacity }))
    trackA.setTrackSteps((old) =>
      old.concat([
        [
          { ...POURING_BUCKET_TEMPLATE, capacity: bucketXCapacity },
          { ...TO_FILL_BUCKET_TEMPLATE, capacity: bucketYCapacity },
        ],
      ])
    )
    trackB.setTrackSteps((old) =>
      old.concat([
        [
          { ...POURING_BUCKET_TEMPLATE, capacity: bucketYCapacity },
          { ...TO_FILL_BUCKET_TEMPLATE, capacity: bucketXCapacity },
        ],
      ])
    )
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (error) {
      setError("")
    }

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

      return
    }

    startSolution({ bucketXCapacity, bucketYCapacity, targetCapacity })
  }

  const handleErroMessageButtonOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setError("")
  }

  return (
    <main className={"w-full flex-col items-center justify-start space-y-4"}>
      <Form {...{ disabled: isEvaluating, handleFormSubmit }} />
      <ErrorMessage {...{ error, handleErroMessageButtonOnClick }} />
      <div className={"flex h-full flex-col items-center justify-start gap-4"}>
        <pre>Optimal Solution</pre>
        <SolutionTrack {...{ track: solutionTrack }} />
      </div>
    </main>
  )
}

export default App
