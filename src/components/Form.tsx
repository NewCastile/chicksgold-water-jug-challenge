import { IFormProps } from "../types"

export const Form = ({
  disabled,
  handleFormSubmit,
  handleFormReset,
}: IFormProps) => {
  return (
    <form
      className={"flex flex-row items-center justify-center gap-8"}
      data-testid={"form"}
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <div className={"flex flex-col items-center justify-center gap-2"}>
        <label htmlFor={"bucket-x"}>Bucket X</label>
        <input
          required
          data-testid={"bucket-x-input"}
          disabled={disabled}
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
          data-testid={"bucket-y-input"}
          disabled={disabled}
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
          data-testid={"target-input"}
          disabled={disabled}
          id={"target"}
          min={1}
          name={"target"}
          step={1}
          type={"number"}
        />
      </div>
      <button
        data-testid={"form-submit-button"}
        disabled={disabled}
        type={"submit"}
      >
        evaluate
      </button>
      <button data-testid={"form-reset-button"} type={"reset"}>
        reset
      </button>
    </form>
  )
}
