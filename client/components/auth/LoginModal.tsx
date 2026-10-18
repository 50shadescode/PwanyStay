"use client";

import { useId, useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal, { authFeedback, authInputClass, authSubmitClass } from "./AuthModal";

interface LoginModalProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({ onClose, onSwitchToRegister }: LoginModalProps) {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const id = useId();
  const busy = isLoading || submitting;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    setError(null);
    setSubmitting(true);
    try {
      await login({ username: email.trim(), password });
      onClose();
    } catch (error: unknown) {
      setError(authFeedback(error, "Unable to log in. Please check your email and password."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthModal title="Log in to PwanyStay" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4" aria-busy={busy} aria-describedby={error ? `${id}-error` : undefined}>
        {error && <p id={`${id}-error`} role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-semibold">Email</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} className={authInputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-password`} className="text-sm font-semibold">Password</label>
          <input id={`${id}-password`} name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className={authInputClass} />
        </div>
        <button type="submit" disabled={busy} className={authSubmitClass}>{busy ? "Logging in…" : "Log In"}</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">
        New to PwanyStay?{" "}
        <button type="button" disabled={busy} onClick={onSwitchToRegister} className="font-bold text-blue-600 underline-offset-4 hover:underline disabled:opacity-60">Sign up</button>
      </p>
    </AuthModal>
  );
}
