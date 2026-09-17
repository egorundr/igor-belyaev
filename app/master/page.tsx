import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"

const meta = [
  { label: "Дата", value: "6 октября" },
  { label: "Формат", value: "Онлайн, Zoom с практикой" },
  { label: "Длительность", value: "2 часа" },
  { label: "Стоимость", value: "2 990 ₽" },
]

const audience = [
  {
    title: "Предприниматели и руководители",
    text: "Для тех, кто регулярно обсуждает деньги, ответственность, условия сотрудничества и принимает решения в ситуациях, где интересы сторон не совпадают.",
  },
  {
    title: "Эксперты и специалисты",
    text: "Для тех, кому важно уверенно говорить о цене, условиях работы, своих интересах и границах.",
  },
  {
    title: "Люди, принимающие значимые финансовые и личные решения",
    text: "Для тех, кому приходится договариваться о деньгах, имуществе, обязательствах, условиях\nи ответственности в важных для себя ситуациях.",
  },
  {
    title: "Те, кто сталкивается с непростыми личными переговорами",
    text: "Для ситуаций, связанных с близкими, бывшим супругом, совместными решениями, деньгами, обязанностями и ответственностью.",
  },
]

const program = [
  "Как заранее определить свою сильную или слабую переговорную позицию и понять, что можно изменить ещё до начала разговора.",
  "Как действовать, если собеседник давит, занимает жёсткую позицию или пытается навязать свои правила.",
  "Как обсуждать деньги, условия и возможные уступки, сохраняя собственные интересы.",
  "Как говорить «нет» и отстаивать свою позицию без лишней конфронтации.",
]

const facts = [
  { title: "Harvard Business School — Negotiation Mastery Certificate", note: "2024" },
  { title: "Harvard Law School — Harvard Contract Law Certification", note: "2017" },
  { title: "MIT School of Engineering — Entrepreneurial Negotiations Certification", note: "2018" },
  { title: "Michigan State University — Successful Negotiation Certification", note: "2019" },
  { title: "Northwestern University — High Performance Collaboration Certification", note: "2018" },
  { title: "The University of Chicago Booth School of Business — Sales Strategies Certification", note: "2017" },
  { title: "МГТУ им. Н. Э. Баумана — специалист-инженер приборов навигации и стабилизации", note: "2003–2010" },
]

const cases = [
  {
    title: "Кейс 1",
    text: "Точка А → работа с Игорем → точка Б. Данные будут добавлены после заполнения таблицы клиентских кейсов.",
  },
  {
    title: "Кейс 2",
    text: "Точка А → работа с Игорем → точка Б. Данные будут добавлены после заполнения таблицы клиентских кейсов.",
  },
  {
    title: "Кейс 3",
    text: "Точка А → работа с Игорем → точка Б. Данные будут добавлены после заполнения таблицы клиентских кейсов.",
  },
]

const faq = [
  { q: "На какой площадке пройдёт мастер-класс?", a: "Zoom." },
  {
    q: "Будет ли доступна запись?",
    a: "Да, запись мастер-класса мы вышлем всем участникам после его проведения.",
  },
  { q: "Можно ли будет задавать вопросы Игорю?", a: "Уточняется." },
  { q: "Будут ли разборы ситуаций участников?", a: "Уточняется." },
]

const sectionTitle =
  "text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]"
const kicker = "text-[11px] font-black uppercase tracking-[0.2em] text-yellow-400"
const cardTitle = "text-xl font-bold leading-snug"

export default function MasterPage() {
  return (
    <main className="min-h-dvh bg-black font-sans text-white">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-4 md:px-10">
        <span className="text-sm font-black uppercase tracking-[0.2em]">Игорь Беляев</span>
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-yellow-400 hover:text-yellow-400"
          >
            Гайд
          </Link>
          <span className="rounded-full bg-yellow-400 px-4 py-2 text-xs font-bold uppercase tracking-wide text-black">
            Мастер-класс
          </span>
        </nav>
      </header>

      {/* Hero */}
      <section className="grid grid-cols-1 items-stretch lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: headline + meta */}
        <div className="flex flex-col justify-between gap-10 border-b border-zinc-800 px-5 py-10 md:px-10 md:py-14 lg:border-b-0 lg:border-r">
          <div>
            <h1 className="text-balance text-[clamp(2rem,6vw,4.5rem)] font-black uppercase leading-[0.92] tracking-[-0.03em]">
              Уступить нельзя <span className="text-yellow-400">договориться</span>
            </h1>
            <p className="mt-5 text-2xl font-bold text-zinc-300">Куда вы поставите запятую?</p>
            <p className="mt-6 max-w-[46ch] text-pretty text-lg leading-relaxed text-zinc-400">
              Как сохранять сильную позицию в переговорах, обсуждать деньги и условия, выдерживать
              давление{" "}
              <br />и приходить к конкретным договорённостям.
            </p>
            <a
              href="#participation"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-yellow-400 px-7 font-bold text-black transition-opacity hover:opacity-90"
            >
              Оплатить участие
            </a>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col items-center justify-start bg-black p-6 text-center">
                <span className="text-xs uppercase tracking-[0.16em] text-zinc-500">{item.label}</span>
                <strong className="mt-2 block text-balance text-lg font-black leading-tight">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div className="relative flex items-center px-5 pb-10 md:px-10 md:py-14 lg:p-0">
          <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-white lg:rounded-none lg:border-0 lg:border-l">
            <Image
              src="/expert-mk-hero.jpg"
              alt="Игорь Беляев — эксперт по переговорам"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Для кого */}
      <section className="border-t border-zinc-800 px-5 py-12 md:px-10 md:py-16">
        <h2 className={sectionTitle}>Для кого</h2>
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
          {audience.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 bg-black p-6 md:p-8">
              <strong className={cardTitle}>{item.title}</strong>
              <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Программа */}
      <section className="border-t border-zinc-800 px-5 py-12 md:px-10 md:py-16">
        <h2 className={sectionTitle}>На мастер-классе мы разберём</h2>
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
          {program.map((item) => (
            <div key={item} className="flex items-start gap-4 bg-black p-6 md:p-8">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <p className="text-lg leading-relaxed text-zinc-200">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Об эксперте */}
      <section className="grid grid-cols-1 border-t border-zinc-800 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="relative min-h-[320px] overflow-hidden border-b border-zinc-800 bg-zinc-950 lg:min-h-full lg:border-b-0 lg:border-r">
          <Image
            src="/expert-profile.jpg"
            alt="Портрет эксперта Игоря Беляева"
            fill
            sizes="(max-width: 1024px) 100vw, 36vw"
            className="object-cover object-top grayscale"
          />
        </div>
        <div className="flex flex-col gap-6 px-5 py-10 md:px-10 md:py-12">
          <div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">
              Игорь Беляев
            </h2>
            <p className="mt-3 max-w-[46ch] text-lg font-bold leading-snug text-white">
              Ведущий эксперт по сложным управленческим переговорам
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-zinc-400">
              Более 20 лет работает с первыми лицами, топ-командами и управленческими структурами
              крупных корпораций, финансовых институтов и государственных организаций.
              Специализируется на сложных переговорах, переговорах под давлением, управленческом
              влиянии и работе с конфликтами интересов. Проводил стратегические сессии и программы
              для команд ВТБ, Яндекса, Билайна, Северстали, Правительства Москвы и других
              организаций.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.title} className="flex flex-col gap-1 bg-black p-4">
                <strong className="text-pretty text-sm font-bold leading-snug">{fact.title}</strong>
                <span className="text-xs text-zinc-500">{fact.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Кейсы */}
      <section className="border-t border-zinc-800 px-5 py-12 md:px-10 md:py-16">
        <h2 className={sectionTitle}>Кейсы</h2>
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 lg:grid-cols-3">
          {cases.map((item, i) => (
            <div key={item.title} className="flex flex-col justify-end gap-3 bg-black p-6 md:p-8">
              <span className="text-sm font-black text-yellow-400">[{String(i + 1).padStart(2, "0")}]</span>
              <strong className={cardTitle}>{item.title}</strong>
              <p className="text-sm leading-relaxed text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Участие / Стоимость */}
      <section id="participation" className="border-t border-zinc-800 px-5 py-12 md:px-10 md:py-16">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className={sectionTitle}>
              Стоимость <br />и формат
            </h2>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-zinc-400">
              Дата: 6 октября. Формат: онлайн в Zoom с практикой, длительность — 2 часа.
              Стоимость: 2 990 ₽.
            </p>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-zinc-400">
              Мастер-класс проходит в формате бизнес-игры с отдельными комнатами для участников:
              каждый сможет включиться в практику и получить личное взаимодействие.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">
            <div className="text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tight text-yellow-400">
              2 990 ₽
            </div>
            <button
              type="button"
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-yellow-400 px-5 font-bold text-black transition-opacity hover:opacity-90"
            >
              Оплатить участие
            </button>
          </div>
        </div>
      </section>

      {/* Вопросы */}
      <section className="border-t border-zinc-800 px-5 py-12 md:px-10 md:py-16">
        <h2 className={`mb-6 ${sectionTitle}`}>Вопросы</h2>
        <div>
          {faq.map((item) => (
            <details key={item.q} className="group border-t border-zinc-800 py-5 last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="text-2xl leading-none text-yellow-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-zinc-400">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-5 py-8 text-xs text-zinc-500 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-black uppercase tracking-[0.2em] text-zinc-300">Игорь Беляев</span>
            <span>Чалунин Максим Александрович</span>
            <span>ИНН 668601656614</span>
          </div>
          <nav className="flex flex-col gap-2 md:items-end">
            <Link href="/privacy" className="transition-colors hover:text-yellow-400">
              Политика конфиденциальности
            </Link>
            <Link href="/consent" className="transition-colors hover:text-yellow-400">
              Согласие на обработку персональных данных
            </Link>
            <Link href="/offer" className="transition-colors hover:text-yellow-400">
              Оферта
            </Link>
          </nav>
        </div>
        <div className="mt-6 border-t border-zinc-800 pt-6">
          © {new Date().getFullYear()} Все права защищены
        </div>
      </footer>
    </main>
  )
}
