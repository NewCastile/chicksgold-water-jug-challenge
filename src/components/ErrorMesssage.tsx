export const ErrorMessage = ({
  error,
  handleErroMessageButtonOnClick,
}: {
  error: string
  handleErroMessageButtonOnClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}) => {
  return (
    <>
      {error && (
        <p className={"text-red-500"}>
          {error} <button onClick={handleErroMessageButtonOnClick}>x</button>
        </p>
      )}
    </>
  )
}
