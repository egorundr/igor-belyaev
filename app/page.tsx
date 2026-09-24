import Image from "next/image"
import Link from "next/link"
import { CaptureForm } from "@/components/capture-form"

const points = [
  "как гендер влияет на жёсткость, риск и реакцию собеседника;",
  "почему одинаковое поведение мужчины и женщины может восприниматься по-разному;",
  "как стереотипы и стресс меняют ход переговоров;",
  "как удерживать позицию, границы и возвращать разговор к фактам.",
]

export default function Page() {
  return (
    <main className="min-h-dvh bg-black font-sans text-white">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-4 md:px-10">
        <span className="text-sm font-black uppercase tracking-[0.2em]">Игорь Беляев</span>
        <nav className="flex items-center gap-2">
          <span className="rounded-full bg-yellow-400 px-4 py-2 text-xs font-bold uppercase tracking-wide text-black">
            Гайд
          </span>
          <Link
            href="/master"
            className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-yellow-400 hover:text-yellow-400"
          >
            Мастер-класс
          </Link>
        </nav>
      </header>

      {/* Hero: headline (left) + photo (right on desktop) */}
      <section className="grid grid-cols-1 items-center gap-8 px-5 py-10 md:px-10 md:py-14 lg:grid-cols-[1fr_0.85fr] lg:gap-12">
        <div>
          <h1 className="text-balance text-[clamp(2rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
            Бесплатный гайд по переговорам:
            <br />
            <span className="text-yellow-400">«Пол имеет значение»</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-pretty text-lg leading-relaxed text-zinc-400">
            Короткая шпаргалка перед важным разговором: как учитывать гендерную динамику и вести переговоры на своих
            условиях.
          </p>
          <a
            href="#zayavka"
            className="mt-8 inline-flex rounded-full bg-yellow-400 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-yellow-300"
          >
            Забрать гайд
          </a>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-zinc-950">
          <Image
            src="/expert.jpg"
            alt="Игорь Беляев — эксперт по переговорам"
            width={900}
            height={1200}
            priority
            className="h-full max-h-[460px] w-full object-cover object-top grayscale"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5">
            <p className="text-base font-black uppercase tracking-wide text-white">Игорь Беляев</p>
            <p className="text-sm font-semibold text-zinc-200">Эксперт по переговорам</p>
          </div>
        </div>
      </section>

      {/* Split screen: form (left) + what's inside the guide (right) */}
      <section
        id="zayavka"
        className="grid scroll-mt-6 grid-cols-1 items-stretch gap-8 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-2 lg:gap-12"
      >
        <div className="flex h-full flex-col">
          <h2 className="text-balance text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.95] tracking-[-0.02em]">
            В гайде я <span className="text-yellow-400">рассказал</span>
          </h2>
          <ul className="mt-8 grid flex-1 grid-cols-1 content-stretch gap-3 overflow-hidden rounded-2xl">
            {points.map((p, i) => (
              <li key={i} className="flex items-center gap-4 rounded-2xl bg-zinc-950 p-6 md:p-8">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-400" aria-hidden="true" />
                <span className="text-lg leading-relaxed text-zinc-200">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-full [&>*]:h-full">
          <CaptureForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-4 px-5 py-8 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between md:px-10">
        <span className="font-black uppercase tracking-[0.2em] text-zinc-300">Игорь Беляев</span>
        <nav className="flex flex-col gap-2 md:flex-row md:gap-5" aria-label="Юридические документы">
          <a href="/legal/privacy.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-yellow-400">Политика обработки персональных данных</a>
          <a href="/legal/consent.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-yellow-400">Согласие на обработку персональных данных</a>
          <a href="/legal/offer.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-yellow-400">Публичная оферта</a>
        </nav>
        <span>© {new Date().getFullYear()} Все права защищены</span>
      </footer>
    </main>
  )
}
