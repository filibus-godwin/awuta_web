"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  Trash2,
  Mail,
  CheckCircle,
  Loader2,
  KeyRound,
} from "lucide-react";

const API_BASE =
  "https://cautious-winner-996579932548.europe-west1.run.app/api/auth";

type Step = "form" | "verify" | "submitted";

export default function DeleteAccountPage() {
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reasons = [
    "I no longer use the app",
    "I have privacy concerns",
    "I found a better alternative",
    "I have multiple accounts",
    "Other",
  ];

  async function handleRequestDeletion() {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!reason) {
      setError("Please select a reason for deletion.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/request-account-deletion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), reason }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.detail || "Something went wrong. Please try again.",
        );
      }

      setStep("verify");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmDeletion() {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/confirm-account-deletion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.detail || "Something went wrong. Please try again.",
        );
      }

      setStep("submitted");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (step === "submitted") {
    return (
      <main className="min-h-screen bg-background py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>

          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
              Account Deleted
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
              Your account and all associated data for{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {email}
              </span>{" "}
              has been permanently deleted.
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 tracking-widest uppercase">
              <div className="w-1 h-1 rounded-full bg-red-500" />
              Account Deletion
              <div className="w-1 h-1 rounded-full bg-red-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-2">
              Delete Your <span className="font-medium">Account</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Request permanent deletion of your Awuta account and data.
            </p>
          </div>

          {/* Warning Banner */}
          <div className="border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">
                  This action is permanent
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-400/80">
                  Once your account is deleted, all your data will be permanently
                  removed, including your profile, listings, messages, and
                  transaction history. This cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* What Gets Deleted */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">
              What will be deleted
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              {[
                "Your profile and account information",
                "All your product listings",
                "Messages and conversations",
                "Transaction and payment history",
                "Saved items and preferences",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Trash2 className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {step === "form" && (
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                >
                  Email address associated with your account
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Why are you deleting your account?
                </label>
                <div className="space-y-2">
                  {reasons.map((r) => (
                    <label
                      key={r}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        reason === r
                          ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={r}
                        checked={reason === r}
                        onChange={() => setReason(r)}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {r}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleRequestDeletion}
                disabled={loading}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending code...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </div>
          )}

          {step === "verify" && (
            <div className="space-y-6">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Check your email
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  We sent a 6-digit verification code to:
                </p>
                <p className="font-medium text-gray-900 dark:text-white mb-4">
                  {email}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  The code expires in 15 minutes.
                </p>
              </div>

              {/* OTP Input */}
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                >
                  Verification code
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="000000"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-center text-2xl tracking-[0.5em] font-mono"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep("form");
                    setOtp("");
                    setError("");
                  }}
                  className="flex-1 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
                >
                  Go Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeletion}
                  disabled={loading || otp.length !== 6}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete My Account"
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleRequestDeletion}
                disabled={loading}
                className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Didn&apos;t receive a code? Send again
              </button>
            </div>
          )}

          {/* Contact Box */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 mt-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Need Help Instead?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  If you&apos;re having issues with your account, we&apos;d love
                  to help before you go. Reach out to our support team.
                </p>
              </div>
              <a
                href="mailto:awuta.app@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
