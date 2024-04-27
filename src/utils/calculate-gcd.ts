export const calculateGCD = (a: number, b: number) => {
  // Check if both x and y are of type number, if not, return false.
  // Take the absolute values of x and y to ensure positivity.
  let abs_a = Math.abs(a)
  let abs_b = Math.abs(b)

  while (abs_b) {
    // Store the value of y in a temporary variable t.
    // eslint-disable-next-line prefer-const
    let t = abs_b

    // Calculate the remainder of x divided by y and assign it to y.
    abs_b = abs_a % abs_b
    // Assign the value of t (previous value of y) to x.
    abs_a = t
  }

  // Return the GCD, which is stored in x after the loop.
  return abs_a
}
