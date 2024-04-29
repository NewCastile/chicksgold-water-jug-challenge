import { ISolutionTrackProps } from "../types"

export const SolutionTrack = ({ track }: ISolutionTrackProps) => {
  return (
    <pre className={"flex w-full flex-col items-center justify-center gap-8"}>
      <pre>{track.trackProcessDescription}</pre>
      {track.trackStepsTaken > 0 && (
        <pre>Steps taken: {track.trackStepsTaken}</pre>
      )}
      <div className={"grid w-full grid-flow-row grid-cols-3 gap-4"}>
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
              className={
                "relative flex flex-row items-center justify-center gap-8"
              }
            >
              <div
                className={
                  "absolute left-0 top-0 inline-flex size-6 items-center justify-center rounded-full border-2 border-white align-middle"
                }
              >
                {stepIdx}
              </div>
              <div
                className={"flex flex-col items-center justify-center gap-2"}
              >
                <div>{aTag}</div>
                <div
                  className={"flex flex-row items-center justify-center gap-2"}
                >
                  <div>{aCurrentGallons}</div>
                  <div>/</div>
                  <div>{aCapacity}</div>
                </div>
              </div>
              <div
                className={"flex flex-col items-center justify-center gap-4"}
              >
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
      </div>
    </pre>
  )
}
