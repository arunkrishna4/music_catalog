import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    AuthCard,
    AuthFooter,
    AuthLayout,
    ForgotPasswordLink,
    PasswordInput,
    TextInput,
} from "../components/auth/AuthComponents";
import { Button } from "../components/ui/button";
import { login } from "../services/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");
    const navigate = useNavigate();

    const emailRegex = /\S+@\S+\.\S+/;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        setAuthError("");

        if (
            !email.trim() ||
            !emailRegex.test(email) ||
            !password
        ) {
            return;
        }

        try {
            setLoading(true);

            await login(email.trim(), password);
            setEmail("");
            setPassword("");
            setSubmitted(false);
            setAuthError("");

            navigate("/search");
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
                title="Welcome back"

            >
                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    <TextInput
                        label="Email"
                        icon={Mail}
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        disabled={loading}
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
                        placeholder="Enter your password"
                        value={password}
                        disabled={loading}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setAuthError("");
                        }}
                        autoComplete="current-password"
                        error={
                            submitted && !password
                                ? "Password is required."
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
                        {loading ? "Signing in..." : "Login"}
                    </Button>

                    <AuthFooter
                        prompt="New here?"
                        action="Create account"
                        href="/register"
                    />
                </form>
            </AuthCard>
        </AuthLayout>
    );
}
