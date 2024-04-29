/* eslint-disable no-console */
import { fireEvent, render, screen } from "@testing-library/react"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react"
import { describe, it } from "vitest"

import App from "../../src/App"

describe("Find optimal solution", () => {
  it("should render", () => {
    render(<App />)
  })

  render(<App />)
  const bucketXInput = screen.getByTestId("bucket-x-input")
  const bucketYInput = screen.getByTestId("bucket-y-input")
  const targetInput = screen.getByTestId("target-input")
  const submitButton = screen.getByTestId("form-submit-button")

  it("input has float number", () => {
    fireEvent.change(bucketXInput, { target: { value: 2.2 } })
    fireEvent.change(bucketYInput, { target: { value: 10 } })
    fireEvent.change(targetInput, { target: { value: 4 } })
    fireEvent.click(submitButton)
  })

  it("input has value zero", () => {
    fireEvent.change(bucketXInput, { target: { value: 0 } })
    fireEvent.change(bucketYInput, { target: { value: 10 } })
    fireEvent.change(targetInput, { target: { value: 4 } })
    fireEvent.submit(submitButton)
  })

  it("missing field", () => {
    fireEvent.change(bucketYInput, { target: { value: 10 } })
    fireEvent.change(targetInput, { target: { value: 4 } })
    fireEvent.click(submitButton)
  })

  it("should trigger solution", () => {
    fireEvent.change(bucketXInput, { target: { value: 2 } })
    fireEvent.change(bucketYInput, { target: { value: 10 } })
    fireEvent.change(targetInput, { target: { value: 4 } })

    fireEvent.click(submitButton)
  })
})
