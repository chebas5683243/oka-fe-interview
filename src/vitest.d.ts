import { type TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import {
  type Assertion,
  type AsymmetricMatchersContaining,
  type expect,
} from "vitest";

type CustomMatchers<R = unknown> = TestingLibraryMatchers<
  ReturnType<typeof expect.stringContaining>,
  R
>;

declare module "vitest" {
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
