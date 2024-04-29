export interface IBucket {
  tag: string
  capacity: number
}

export interface IOperableBucket extends IBucket {
  currentGallons: number
}

export interface IProblemParameters {
  bucketXCapacity: number
  bucketYCapacity: number
  targetCapacity: number
}

export interface IFormValidationResult {
  success: boolean
  message: string
}

export interface ITrack {
  trackSteps: IOperableBucket[][]
  setTrackSteps: React.Dispatch<React.SetStateAction<IOperableBucket[][]>>
  trackProcessDescription: string
  trackStepsTaken: number
  trackIsFinished?: boolean
}

export interface IErrorMessageProps {
  error: string
  handleErroMessageButtonOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}

export interface IUseTrackArguments {
  target: IBucket
  stopCondition: boolean
  trackProcessDescription: string
}

export interface IFormProps {
  disabled: boolean
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export interface ISolutionTrackProps {
  track: TTrackProps
}

export type TSolutionTrack = Omit<ITrack, "setTrackSteps" | "trackIsFinished">

export type TTrackProps = Omit<ITrack, "setTrackSteps">
