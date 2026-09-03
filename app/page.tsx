import Image from "next/image"
import Link from "next/link"
import { CaptureForm } from "@/components/capture-form"

const outcomes = [
  { n: "01", title: "Читать позицию оппонента", text: "Формулировка уточняется после согласования содержания." },
  { n: "02", title: "Держать рамку в диалоге", text: "Формулировка уточняется после согласования содержания." },
  { n: "03", title: "Закрывать сделку на своих условиях", text: "Формулировка уточняется после согласования содержания." },
]

export default function Page() {
  return (
    <main className="min-h-dvh bg-black font-sans text-white">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-4 md:px-10">
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

      {/* Hero */}
      <section className="grid grid-cols-1 items-stretch lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: headline + photo */}
        <div className="relative flex flex-col justify-between gap-8 border-b border-zinc-800 px-5 py-10 md:px-10 md:py-14 lg:border-b-0 lg:border-r">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow-400">
              Бесплатный гайд
            </p>
            <h1 className="mt-5 text-balance text-[clamp(2.25rem,7vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.03em]">
              Гендерные
              <br />
              переговоры
              <br />
              <span className="text-yellow-400">«Пол имеет значение»</span>
            </h1>
            <p className="mt-6 max-w-[44ch] text-pretty text-lg leading-relaxed text-zinc-400">
              Короткая шпаргалка перед важным разговором: как учитывать гендерную динамику и вести
              переговоры на своих условиях.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <Image
              src="/expert.jpg"
              alt="Игорь Беляев — эксперт по переговорам"
              width={900}
              height={1200}
              priority
              className="h-full max-h-[420px] w-full object-cover object-top grayscale"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-5">
              <div>
                <p className="text-sm font-black uppercase tracking-wide">Игорь Беляев</p>
                <p className="text-xs text-zinc-400">Эксперт по переговорам</p>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">2025</span>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex items-center px-5 py-10 md:px-10 md:py-14">
          <CaptureForm />
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t border-zinc-800 px-5 py-12 md:px-10 md:py-16">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow-400">
          После прочтения гайда вы получите
        </p>
        <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 md:grid-cols-3">
          {outcomes.map((o) => (
            <div key={o.n} className="flex flex-col gap-3 bg-black p-6 md:p-8">
              <span className="text-sm font-black text-yellow-400">[{o.n}]</span>
              <strong className="text-xl font-bold leading-snug">{o.title}</strong>
              <p className="text-sm leading-relaxed text-zinc-400">{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 border-t border-zinc-800 px-5 py-8 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between md:px-10">
        <span className="font-black uppercase tracking-[0.2em] text-zinc-300">Игорь Беляев</span>
        <span>© {new Date().getFullYear()} Все права защищены</span>
      </footer>
    </main>
  )
}
