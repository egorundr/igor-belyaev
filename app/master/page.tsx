import Image from "next/image"
import Link from "next/link"

const meta = [
  { label: "Дата", value: "6 октября" },
  { label: "Формат", value: "Онлайн" },
  { label: "Стоимость", value: "Уточняется" },
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
    text: "Для тех, кому приходится договариваться о деньгах, имуществе, обязательствах, условиях и ответственности в важных для себя ситуациях.",
  },
  {
    title: "Те, кто сталкивается с непростыми личными переговорами",
    text: "Для ситуаций, связанных с близкими, бывшим супругом, совместными решениями, деньгами, обязанностями и ответственностью.",
  },
]

const results = [
  "как заранее оценивать свою переговорную позицию;",
  "как усиливать свою позицию до начала разговора;",
  "как обсуждать деньги и условия без лишних уступок;",
  "как говорить «нет» и отстаивать свои интересы;",
]

const program = [
  { title: "Сильная и слабая позиция", text: "Как определить свою сильную и слабую переговорную позицию до начала разговора." },
  { title: "Деньги и условия", text: "Как обсуждать деньги, условия и ответственность." },
  { title: "Давление собеседника", text: "Как вести переговоры с человеком, который давит или пытается навязать свои правила." },
  { title: "Умение говорить «нет»", text: "Как говорить «нет» и сохранять свою позицию." },
]

const facts = [
  { title: "Эксперт МГУ им. М.В. Ломоносова", note: "Экспертная деятельность" },
  { title: "МГТУ им. Н.Э. Баумана", note: "Указано в материалах Игоря" },
  { title: "Harvard Law School и Chicago Booth School of Business", note: "Указано в материалах Игоря" },
  { title: "Northwestern University и Michigan State University", note: "Указано в материалах Игоря" },
  { title: "СПбУТУиЭ", note: "Санкт-Петербург" },
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
  "На какой площадке пройдет мастер-класс?",
  "Будет ли доступна запись?",
  "Можно ли будет задавать вопросы Игорю?",
  "Будут ли разборы ситуаций участников?",
  "На какой срок будет доступна запись?",
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
              давление и приходить к конкретным договорённостям.
            </p>
            <a
              href="#participation"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-yellow-400 px-7 font-bold text-black transition-opacity hover:opacity-90"
            >
              Оплатить участие
            </a>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label} className="bg-black p-5">
                <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">{item.label}</span>
                <strong className="mt-1.5 block text-lg font-bold">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div className="relative flex items-center px-5 py-10 md:px-10 md:py-14">
          <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <Image
              src="/expert-mk.jpg"
              alt="Игорь Беляев — эксп��рт по переговорам"
              width={1200}
              height={800}
              priority
              className="h-full max-h-[460px] w-full object-cover object-top grayscale"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-5">
              <div>
                <p className="text-sm font-black uppercase tracking-wide">Игорь Беляев</p>
                <p className="text-xs text-zinc-400">Эксперт по переговорам</p>
              </div>
            </div>
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
              <p className="text-sm leading-relaxed text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Результаты */}
      <section className="border-t border-zinc-800 px-5 py-12 md:px-10 md:py-16">
        <p className={kicker}>Что вы получите</p>
        <h2 className={`mt-3 ${sectionTitle}`}>После мастер-класса вы поймёте</h2>
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
          {results.map((item) => (
            <div key={item} className="flex items-start gap-4 bg-black p-6 md:p-8">
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
              <p className="text-lg leading-relaxed text-zinc-200">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Программа */}
      <section className="border-t border-zinc-800 px-5 py-12 md:px-10 md:py-16">
        <h2 className={sectionTitle}>Что разберём</h2>
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800 sm:grid-cols-2">
          {program.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 bg-black p-6 md:p-8">
              <strong className={cardTitle}>{item.title}</strong>
              <p className="text-sm leading-relaxed text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Об эксперте */}
      <section className="grid grid-cols-1 border-t border-zinc-800 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[380px] overflow-hidden border-b border-zinc-800 bg-zinc-950 lg:border-b-0 lg:border-r">
          <Image
            src="/expert-profile.jpg"
            alt="Портрет эксперта Игоря Беляева"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-top grayscale"
          />
        </div>
        <div className="flex flex-col justify-between gap-8 px-5 py-10 md:px-10 md:py-14">
          <div>
            <p className={kicker}>Об эксперте</p>
            <h2 className="mt-3 text-[clamp(2.25rem,5vw,4rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">
              Игорь Беляев
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-zinc-400">
              Эксперт по переговорам, влиянию и управлению сложными коммуникациями.
            </p>
          </div>
          <div>
            {facts.map((fact) => (
              <div key={fact.title} className="grid gap-1.5 border-t border-zinc-800 py-4 last:border-b">
                <strong className="text-pretty text-[17px] font-bold leading-snug">{fact.title}</strong>
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
            <p className={kicker}>Участие</p>
            <h2 className={`mt-3 ${sectionTitle}`}>Стоимость и формат</h2>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-zinc-400">
              Дата: 6 октября (согласовать). Формат: онлайн, с ответами на вопросы. Время,
              длительность, наличие записи и стоимость уточняются.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">
            <div className="text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tight text-yellow-400">
              ₽ —
            </div>
            <p className="mt-2 text-sm text-zinc-400">Точная стоимость уточняется.</p>
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
          {faq.map((question) => (
            <details key={question} className="group border-t border-zinc-800 py-5 last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                <span>{question}</span>
                <span className="text-2xl leading-none text-yellow-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-zinc-400">Уточняется.</p>
            </details>
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
