import Link from "next/link"
import { Banknote, Ban, Gauge, Users } from "lucide-react"
import { CaptureForm } from "@/components/capture-form"
import { WorkshopCases } from "@/components/workshop-cases"

const meta = [
  { label: "Дата", value: "6 октября" },
  { label: "Формат", value: "Онлайн, Zoom с практикой" },
  { label: "Длительность", value: "2 часа" },
  { label: "Стоимость", value: "9 990 ₽" },
]

const program = [
  {
    icon: Banknote,
    text: "Как обсуждать деньги, условия и возможные уступки, сохраняя собственные интересы.",
  },
  {
    icon: Users,
    text: "Как заранее определить свою сильную или слабую переговорную позицию и понять, что можно изменить ещё до начала разговора.",
  },
  {
    icon: Gauge,
    text: "Как действовать, если собеседник давит, занимает жёсткую позицию или пытается навязать свои правила.",
  },
  {
    icon: Ban,
    text: "Как говорить «нет» и отстаивать свою позицию без лишней конфронтации.",
  },
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

const faq = [
  { q: "На какой площадке пройдёт мастер-класс?", a: "Мастер-класс пройдёт онлайн в Zoom." },
  {
    q: "Будет ли доступна запись?",
    a: "Да, запись мастер-класса мы вышлем всем участникам после его проведения.",
  },
  {
    q: "Можно ли будет задавать вопросы Игорю?",
    a: "Да. В конце мастер-класса будет отдельный блок ответов на вопросы участников продолжительностью до 30 минут.",
  },
]

const sectionTitle = "text-balance text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]"

export default function MasterPage() {
  return (
    <main className="min-h-dvh bg-black font-sans text-white">
      <header className="flex items-center justify-between px-5 py-4 md:px-10">
        <span className="text-sm font-black uppercase tracking-[0.2em]">Игорь Беляев</span>
        <nav className="flex items-center gap-2" aria-label="Разделы сайта">
          <Link href="/" className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:text-yellow-400">
            Гайд
          </Link>
          <span className="rounded-full bg-yellow-400 px-4 py-2 text-xs font-bold uppercase tracking-wide text-black">
            Мастер-класс
          </span>
        </nav>
      </header>

      <section className="grid grid-cols-1 items-stretch lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-between gap-10 px-5 py-10 md:px-10 md:py-14">
          <div>
            <h1 className="text-balance text-[clamp(2rem,6vw,4.5rem)] font-black uppercase leading-[0.92] tracking-[-0.03em]">
              Уступить нельзя <span className="text-yellow-400">договориться</span>
            </h1>
            <p className="mt-5 text-2xl font-bold text-zinc-300">Куда вы поставите запятую?</p>
            <p className="mt-6 max-w-[46ch] text-pretty text-lg leading-relaxed text-zinc-400">
              Как сохранять сильную позицию в переговорах, обсуждать деньги и условия, выдерживать давление и приходить к конкретным договорённостям.
            </p>
            <a href="#participation" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-yellow-400 px-7 font-bold text-black transition-opacity hover:opacity-90">
              Оставить заявку
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col items-center justify-start rounded-2xl bg-zinc-950 p-4 text-center md:p-6">
                <span className="text-xs uppercase tracking-[0.16em] text-zinc-500">{item.label}</span>
                <strong className="mt-2 block text-balance text-lg font-black leading-tight">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center px-5 pb-10 md:px-10 md:py-14 lg:p-0">
          <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-2xl bg-white lg:rounded-none">
            <img
              src="/expert-mk-hero.jpg"
              alt="Игорь Беляев — эксперт по переговорам"
              className="absolute inset-0 h-full w-full object-cover object-top"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <WorkshopCases />

      <section className="px-5 py-12 md:px-10 md:py-16">
        <h2 className={sectionTitle}>На мастер-классе мы разберём</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {program.map((item) => (
            <div key={item.text} className="flex items-start gap-4 rounded-2xl bg-zinc-950 p-6 md:p-8">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black">
                <item.icon className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <p className="text-lg leading-relaxed text-zinc-200">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="relative min-h-[320px] overflow-hidden bg-zinc-950 lg:min-h-full">
          <img
            src="/expert-profile.jpg"
            alt="Портрет эксперта Игоря Беляева"
            className="absolute inset-0 h-full w-full object-cover object-top grayscale"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-6 px-5 py-10 md:px-10 md:py-12">
          <div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">Игорь Беляев</h2>
            <p className="mt-3 max-w-[46ch] text-lg font-bold leading-snug text-white">
              Ведущий эксперт по сложным управленческим переговорам
            </p>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-zinc-400">
              Более 20 лет работает с первыми лицами, топ-командами и управленческими структурами крупных корпораций, финансовых институтов и государственных организаций. Специализируется на сложных переговорах, переговорах под давлением, управленческом влиянии и работе с конфликтами интересов. Проводил стратегические сессии и программы для команд ВТБ, Яндекса, Билайна, Северстали, Правительства Москвы и других организаций.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 [&>div:last-child]:sm:col-span-2">
            {facts.map((fact) => (
              <div key={fact.title} className="flex flex-col gap-1 rounded-xl bg-zinc-950 p-4">
                <strong className="text-pretty text-sm font-bold leading-snug">{fact.title}</strong>
                <span className="text-xs text-zinc-500">{fact.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="participation" className="scroll-mt-6 px-5 py-12 md:px-10 md:py-16">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <h2 className={sectionTitle}>Стоимость и формат</h2>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-zinc-400">
              6 октября, онлайн в Zoom с практикой. Длительность — 2 часа. Стоимость участия — 9 990 ₽.
            </p>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-zinc-400">
              Мастер-класс проходит в формате бизнес-игры с отдельными комнатами для участников: каждый сможет включиться в практику и получить личное взаимодействие.
            </p>
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-zinc-500">
              Оплата через ЮKassa появится после подключения платёжного сервиса. Сейчас можно оставить заявку — это не является оплатой участия.
            </p>
          </div>
          <CaptureForm mode="masterclass" />
        </div>
      </section>

      <section className="px-5 py-12 md:px-10 md:py-16">
        <h2 className={`mb-6 ${sectionTitle}`}>Вопросы</h2>
        <div>
          {faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="text-2xl leading-none text-yellow-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-zinc-400">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="px-5 py-8 text-xs text-zinc-500 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-black uppercase tracking-[0.2em] text-zinc-300">Контактное лицо</span>
            <span>Чалунин Максим Александрович</span>
            <span>ИНН 668601656614</span>
          </div>
          <nav className="flex flex-col gap-2 md:items-end" aria-label="Юридические документы">
            <a href="/legal/privacy.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-yellow-400">Политика обработки персональных данных</a>
            <a href="/legal/consent.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-yellow-400">Согласие на обработку персональных данных</a>
            <a href="/legal/offer.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-yellow-400">Публичная оферта</a>
          </nav>
        </div>
        <div className="mt-6 text-zinc-600">© {new Date().getFullYear()} Все права защищены</div>
      </footer>
    </main>
  )
}
