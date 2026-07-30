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

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordMismatch =
    submitted &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword ||
      passwordMismatch
    ) {
      return;
    }

    try {
      setLoading(true);

      await register(fullName, email, password);

    } catch (error) {
      console.error(error);
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
            onChange={(e) => setFullName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            error={
              submitted && !email.trim()
                ? "Email is required."
                : undefined
            }
          />

          <PasswordInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            error={
              submitted && !confirmPassword
                ? "Please confirm your password."
                : passwordMismatch
                  ? "Passwords do not match."
                  : undefined
            }
          />

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
        </form>
      </AuthCard>
    </AuthLayout>
  );
}