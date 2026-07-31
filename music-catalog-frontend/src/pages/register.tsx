import { useState, type FormEvent } from "react";
import { Mail, User } from "lucide-react";

import {
  AuthCard,
  AuthFooter,
  AuthLayout,
  PasswordInput,
  TextInput,
} from "../components/auth/AuthComponents";
import { Button } from "../components/ui/button";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const [successDialog, setSuccessDialog] = useState(false);

  const emailRegex = /\S+@\S+\.\S+/;

  const passwordMismatch =
    submitted &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setSubmitted(true);
    setAuthError("");

    if (
      !fullName.trim() ||
      !email.trim() ||
      !emailRegex.test(email) ||
      !password ||
      !confirmPassword ||
      passwordMismatch
    ) {
      return;
    }

    try {
      setLoading(true);

      await register(fullName.trim(), email.trim(), password);

      // Clear form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSubmitted(false);

      // Open success dialog
      setSuccessDialog(true);

    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        title="Create your account"

      >
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>

          <TextInput
            label="Full Name"
            icon={User}
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setAuthError("");
            }}
            autoComplete="name"
            error={
              submitted && !fullName.trim()
                ? "Full name is required."
                : undefined
            }
          />

          <TextInput
            label="Email"
            icon={Mail}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setAuthError("");
            }}
            autoComplete="email"
            error={
              submitted
                ? !email.trim()
                  ? "Email is required."
                  : !emailRegex.test(email)
                    ? "Please enter a valid email address."
                    : undefined
                : undefined
            }
          />

          <PasswordInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setAuthError("");
            }}
            autoComplete="new-password"
            error={
              submitted && !password
                ? "Password is required."
                : undefined
            }
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setAuthError("");
            }}
            autoComplete="new-password"
            error={
              submitted && !confirmPassword
                ? "Please confirm your password."
                : passwordMismatch
                  ? "Passwords do not match."
                  : undefined
            }
          />

          {authError && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {authError}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          <AuthFooter
            prompt="Already registered?"
            action="Login"
            href="/"
          />
          <ConfirmDialog
            open={successDialog}
            title="Account Created"
            description="Your account has been created successfully. You can now login."
            confirmText="Go to Login"
            cancelText=""
            loading={false}
            onConfirm={() => navigate("/")}
            onCancel={() => {
              setSuccessDialog(false);
              navigate("/");
            }}
          />
        </form>
      </AuthCard>
    </AuthLayout>
  );
}