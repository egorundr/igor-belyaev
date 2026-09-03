"use client"

import type React from "react"
import { useState } from "react"

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwOImieOGqvqJlxXvwuKGiGaGiU1GOqa2LKcsKC1Hsjxj1qxc120Tmj0SrDSusgWBQ8fQ/exec"

const fields = [
  { id: "name", label: "Имя", placeholder: "Иван Иванов", type: "text", autoComplete: "name", required: true },
  { id: "phone", label: "Телефон", placeholder: "+7 999 000-00-00", type: "tel", autoComplete: "tel", required: true },
  { id: "telegram", label: "Ник в Telegram", placeholder: "@username", type: "text", autoComplete: "off", required: true },
] as const

export function CaptureForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      date: new Date().toISOString(),
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      telegram: String(data.get("telegram") ?? ""),
    }

    setSubmitting(true)
    setError(null)

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      })
      setSubmitted(true)
    } catch {
      setError("Не удалось отправить данные. Попробуйте ещё раз.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-start justify-center rounded-2xl border border-zinc-800 bg-zinc-950 p-8 md:p-10">
        <span
          className="flex size-12 items-center justify-center rounded-full bg-yellow-400 text-black"
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="mt-6 font-sans text-3xl font-black uppercase leading-none tracking-tight text-white md:text-4xl">
          Спасибо!
        </h2>
        <p className="mt-3 text-pretty leading-relaxed text-zinc-400">
          Данные успешно отправлены. Перейдите в Telegram-бота, чтобы забрать гайд.
        </p>
        <a
          href="https://t.me/belyaev_negotiyations_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-14 w-full items-center justify-center rounded-xl bg-yellow-400 text-base font-black uppercase tracking-wide text-black transition-colors hover:bg-yellow-300"
        >
          Перейти в Telegram-бота
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8"
    >
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-yellow-400">
          Остался один шаг
        </p>
        <h2 className="mt-3 font-sans text-3xl font-black uppercase leading-none tracking-tight text-white md:text-4xl">
          Заберите гайд
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-zinc-400"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              placeholder={field.placeholder}
              className="h-12 w-full rounded-xl border border-zinc-800 bg-black px-4 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>
        ))}
      </div>

      <div className="mt-1 flex items-start gap-3 text-xs text-zinc-400">
        <input
          type="checkbox"
          id="privacy"
          required
          defaultChecked
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-zinc-700 bg-zinc-900 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-zinc-900"
        />
        <label htmlFor="privacy" className="cursor-pointer select-none leading-snug">
          Я даю{" "}
          <a
            href="https://docs.google.com/document/d/1Az6vBCjpC2lnrKxvCkRIk8vtGkqKZv9C/edit?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 underline transition-colors hover:text-yellow-400"
          >
            согласие на обработку персональных данных
          </a>{" "}
          в соответствии с{" "}
          <a
            href="https://docs.google.com/document/d/18mjLhJ1Pk6L_Lg8o-heN4RLQOUA5L9-c/edit?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 underline transition-colors hover:text-yellow-400"
          >
            политикой конфиденциальности
          </a>
          .
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 h-14 w-full rounded-xl bg-yellow-400 text-base font-black uppercase tracking-wide text-black transition-colors hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Отправка..." : "Забрать гайд в Telegram"}
      </button>
    </form>
  )
}
