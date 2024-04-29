/* eslint-disable no-console */
import { fireEvent, render, screen } from "@testing-library/react"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react"
import { describe, it } from "vitest"

import App from "../../src/App"
import { ErrorMessage } from "../../src/components/ErrorMesssage"
import { VALIDATION_MESSAGES } from "../../src/data"

describe("Find optimal solution", () => {
  it("should render", () => {
    render(<App />)
  })

  it("should render", () => {
    render(
      <ErrorMessage
        {...{
          error: VALIDATION_MESSAGES.error.capacitiesNotIntegers,
          handleErroMessageButtonOnClick: () => {
            //
          },
        }}
      />
    )
  })

  const { getByTestId } = render(<App />)
  const bucketXInput = screen.getByTestId("bucket-x-input")
  const bucketYInput = screen.getByTestId("bucket-y-input")
  const targetInput = screen.getByTestId("target-input")
  const submitButton = screen.getByTestId("form-submit-button")

  it("Target not divisible by GCD(X, Y)", () => {
    fireEvent.change(bucketXInput, { target: { value: 2 } })
    fireEvent.change(bucketYInput, { target: { value: 6 } })
    fireEvent.change(targetInput, { target: { value: 5 } })

    fireEvent.click(submitButton)
    getByTestId("error-message")
  })

  it("None of the buckets has enough capacity for target goal", () => {
    fireEvent.change(bucketXInput, { target: { value: 2 } })
    fireEvent.change(bucketYInput, { target: { value: 4 } })
    fireEvent.change(targetInput, { target: { value: 5 } })

    fireEvent.click(submitButton)
    getByTestId("error-message")
  })
})
