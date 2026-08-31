"use client"

import type React from "react"
import { useState } from "react"
import { Check, Send } from "lucide-react"

const TELEGRAM_URL = "https://t.me/"
const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwOImieOGqvqJlxXvwuKGiGaGiU1GOqa2LKcsKC1Hsjxj1qxc120Tmj0SrDSusgWBQ8fQ/exec"

const fields = [
  { id: "name", label: "Имя и фамилия", placeholder: "Иван Иванов", type: "text", autoComplete: "name" },
  { id: "phone", label: "Номер телефона", placeholder: "+7 999 000-00-00", type: "tel", autoComplete: "tel" },
  { id: "telegram", label: "Ник в Telegram", placeholder: "@username", type: "text", autoComplete: "off" },
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

  return (
    <div className="w-full rounded-3xl border border-[#333333] bg-[var(--ink-soft)] p-7 text-white sm:p-8">
      {submitted ? (
        <div className="flex flex-col items-start">
          <span
            className="flex size-12 items-center justify-center rounded-full bg-white text-[var(--ink)]"
            aria-hidden="true"
          >
            <Check className="size-6" strokeWidth={2.5} />
          </span>
          <h2 className="mt-6 text-[clamp(1.75rem,3vw,2.375rem)] font-bold leading-[1.05] tracking-tight text-balance">
            Данные отправлены
          </h2>
          <p className="mt-3 leading-relaxed text-[#aaaaaa]">
            Ваш гайд уже готов. Перейдите в Telegram, чтобы забрать материал.
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 font-bold text-[var(--ink)] transition-opacity hover:opacity-90"
          >
            Перейти в Telegram
          </a>
        </div>
      ) : (
        <>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#aaaaaa]">
            Остался всего один шаг
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.375rem)] font-bold leading-[1.05] tracking-tight text-balance">
            Заберите гайд в Telegram
          </h2>
          <p className="mt-3 leading-relaxed text-[#aaaaaa]">
            Оставьте контактные данные, и материал станет доступен сразу после отправки формы.
          </p>

          <form onSubmit={handleSubmit} className="mt-7">
            {fields.map((field) => (
              <div key={field.id} className="mb-4">
                <label
                  htmlFor={field.id}
                  className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em]"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required
                  placeholder={field.placeholder}
                  className="h-12 w-full rounded-xl border border-[#444444] bg-[#1b1b1b] px-4 text-white outline-none transition-colors placeholder:text-[#777777] focus:border-white"
                />
              </div>
            ))}

            <label className="my-5 flex items-start gap-3 text-xs leading-relaxed text-[#aaaaaa]">
              <input
                type="checkbox"
                required
                className="mt-0.5 size-4 shrink-0 accent-white"
              />
              <span>
                Я даю согласие на обработку персональных данных и подтверждаю, что ознакомлен(а) с
                Политикой обработки персональных данных.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 font-bold text-[var(--ink)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                "Отправка..."
              ) : (
                <>
                  <Send className="size-4" />
                  Получить доступ
                </>
              )}
            </button>

            {error ? (
              <p role="alert" className="mt-4 text-sm text-red-400">
                {error}
              </p>
            ) : null}
          </form>
        </>
      )}
    </div>
  )
}
