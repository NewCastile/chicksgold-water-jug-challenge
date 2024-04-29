import { ISolutionTrackProps } from "../types"

export const SolutionTrack = ({ track }: ISolutionTrackProps) => {
  return (
    <pre className={"flex w-full flex-col items-center justify-center gap-8"}>
      <pre>{track.trackProcessDescription}</pre>
      {track.trackStepsTaken > 0 && (
        <pre>Steps taken: {track.trackStepsTaken}</pre>
      )}
      {track.trackSteps.map((step, stepIdx) => {
        const [a, b] = step
        const {
          tag: aTag,
          currentGallons: aCurrentGallons,
          capacity: aCapacity,
        } = a
        const {
          tag: bTag,
          currentGallons: bCurrentGallons,
          capacity: bCapacity,
        } = b

        return (
          <div
            key={stepIdx}
            className={"flex flex-row items-center justify-center gap-8"}
          >
            <div className={"flex flex-col items-center justify-center gap-2"}>
              <div>{aTag}</div>
              <div
                className={"flex flex-row items-center justify-center gap-2"}
              >
                <div>{aCurrentGallons}</div>
                <div>/</div>
                <div>{aCapacity}</div>
              </div>
            </div>
            <div className={"flex flex-col items-center justify-center gap-4"}>
              <div>{bTag}</div>
              <div
                className={"flex flex-row items-center justify-center gap-2"}
              >
                <div>{bCurrentGallons}</div>
                <div>/</div>
                <div>{bCapacity}</div>
              </div>
            </div>
          </div>
        )
      })}
    </pre>
  )
}
