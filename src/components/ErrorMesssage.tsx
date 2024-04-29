import { IErrorMessageProps } from "../types"

export const ErrorMessage = ({
  error,
  handleErroMessageButtonOnClick,
}: IErrorMessageProps) => {
  return (
    <>
      {error && (
        <p className={"text-red-500"} data-testid={"error-message"}>
          {error} <button onClick={handleErroMessageButtonOnClick}>x</button>
        </p>
      )}
    </>
  )
}
