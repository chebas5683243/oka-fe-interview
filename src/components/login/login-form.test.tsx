import { render, screen } from "@testing-library/react";
import LoginForm from "./login-form";
import { describe, it, expect, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

describe("LoginForm Component", () => {
  it("renders the form fields and submit button", () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("shows an error if form is empty", async () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    await userEvent.click(loginButton);

    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("shows an error message for an invalid email", () => {});

  it("shows an error message for a short password", () => {});

  it("calls onSubmit with valid inputs", () => {});

  it("does not call onSubmit with invalid email or password", () => {});
});
