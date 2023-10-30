declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
  }
}
declare namespace jest {
  interface Matchers<R> {
    toHaveStyle(css: string): R;
  }
}
