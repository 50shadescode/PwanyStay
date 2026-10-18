"use client";

import { useId, useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal, { authFeedback, authInputClass, authSubmitClass } from "./AuthModal";

interface RegisterModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ onClose, onSwitchToLogin }: RegisterModalProps) {
  const { register, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"GUEST" | "HOST">("GUEST");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const id = useId();
  const busy = isLoading || submitting;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    if (!name.trim() || !phone.trim()) {
      setError("Please enter your full name and phone number.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await register({ name: name.trim(), email: email.trim(), phone_number: phone.trim(), role, password });
      onClose();
    } catch (error: unknown) {
      setError(authFeedback(error, "Unable to create your account. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthModal title="Create your account" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4" aria-busy={busy} aria-describedby={error ? `${id}-error` : undefined}>
        {error && <p id={`${id}-error`} role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-semibold">Full Name</label>
          <input id={`${id}-name`} name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} className={authInputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-semibold">Email</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className={authInputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="text-sm font-semibold">Phone Number</label>
          <input id={`${id}-phone`} name="phone_number" type="tel" autoComplete="tel" placeholder="e.g. 0712345678" required value={phone} onChange={(event) => setPhone(event.target.value)} className={authInputClass} />
        </div>
        <div>
          <label htmlFor={`${id}-role`} className="text-sm font-semibold">Role</label>
          <select id={`${id}-role`} name="role" value={role} onChange={(event) => setRole(event.target.value === "HOST" ? "HOST" : "GUEST")} className={authInputClass}>
            <option value="GUEST">Guest — book a stay</option>
            <option value="HOST">Host — list a property</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-password`} className="text-sm font-semibold">Password</label>
          <input id={`${id}-password`} name="password" type="password" autoComplete="new-password" required value={password} onChange={(event) => setPassword(event.target.value)} className={authInputClass} />
        </div>
        <button type="submit" disabled={busy} className={authSubmitClass}>{busy ? "Creating account…" : "Sign Up"}</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <button type="button" disabled={busy} onClick={onSwitchToLogin} className="font-bold text-blue-600 underline-offset-4 hover:underline disabled:opacity-60">Log in</button>
      </p>
    </AuthModal>
  );
}
