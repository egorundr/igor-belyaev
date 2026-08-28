import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

const meta = [
  { label: "Дата", value: "Уточняется" },
  { label: "Время", value: "Уточняется" },
  { label: "Стоимость", value: "Уточняется" },
]

const audience = [
  { title: "Предприниматели", text: "Для тех, кто регулярно договаривается с партнерами, клиентами и командой." },
  { title: "Руководители", text: "Для тех, кому важно уверенно вести сложные рабочие разговоры." },
  { title: "Эксперты", text: "Для тех, кто продает свою экспертизу и выстраивает партнерства." },
  { title: "Менеджеры", text: "Для специалистов, которые ведут переговоры с клиентами и внутри команды." },
  { title: "Топ-менеджеры", text: "Для тех, кто участвует в управленческих и стратегических договоренностях." },
  {
    title: "Продажи и развитие бизнеса",
    text: "Для специалистов, чьи результаты напрямую зависят от качества переговоров.",
  },
]

const results = Array.from({ length: 6 }, (_, i) => ({
  title: `Результат ${i + 1}`,
  text: "Формулировка уточняется после согласования содержания мастер-класса.",
}))

const program = [
  { title: "Тема 1", text: "Уточняется" },
  { title: "Тема 2", text: "Уточняется" },
  { title: "Тема 3", text: "Уточняется" },
  { title: "Практические упражнения", text: "Формат уточняется" },
  { title: "Разборы участников", text: "Формат уточняется" },
  { title: "Вопросы и ответы", text: "Формат уточняется" },
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
  "text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[0.98] tracking-tight"
const kicker = "text-[11px] font-black uppercase tracking-[0.14em]"
const cardTitle = "text-[clamp(1.35rem,2vw,1.6rem)] font-bold leading-tight tracking-tight"

export default function MasterPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1180px] border-x border-line/60 bg-ivory md:my-7 md:border md:shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
        <SiteNav />

        {/* Hero */}
        <section className="grid grid-cols-1 items-stretch border-b border-line lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex flex-col justify-between gap-14 px-6 py-12 sm:px-10 lg:py-14">
            <div>
              <p className={kicker}>Платный онлайн мастер-класс</p>
              <h1 className="mt-5 text-pretty text-[clamp(2.5rem,7vw,5.25rem)] font-black uppercase leading-[0.92] tracking-tight">
                Название
                <br />
                <span className="text-transparent [-webkit-text-stroke:1.5px_var(--charcoal)]">
                  уточняется
                </span>
              </h1>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-charcoal sm:text-xl">
                Практический мастер-класс по переговорам: подготовка к сложному диалогу, анализ
                поведения собеседника и инструменты, которые можно применять во время разговора.
              </p>
              <a
                href="#participation"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-charcoal bg-charcoal px-7 font-bold text-white transition-opacity hover:opacity-90"
              >
                Оплатить участие
              </a>
            </div>

            <div className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-line py-4 sm:border-b-0 sm:border-r sm:py-5 sm:pr-4 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-4 sm:first:pr-4"
                >
                  <span className="text-[10px] uppercase tracking-[0.08em] text-subtle">
                    {item.label}
                  </span>
                  <strong className="mt-1.5 block text-lg font-bold">{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex min-h-[420px] items-end overflow-hidden bg-[#0b0b0b] p-8 text-white sm:p-10 lg:min-h-[600px]">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)",
                backgroundSize: "68px 68px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute right-8 top-8 grid size-20 place-items-center rounded-full border border-[#777777]"
            >
              <ArrowUpRight className="size-9" strokeWidth={1.25} />
            </div>
            <p className="relative z-[2] text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight">
              Сильные
              <br />
              <span className="text-transparent [-webkit-text-stroke:1px_#ffffff]">переговоры</span>
            </p>
          </div>
        </section>

        {/* Для кого */}
        <section className="relative overflow-hidden border-b border-line px-6 py-16 sm:px-10">
          <span
            aria-hidden="true"
            className="pointer-events-none block select-none overflow-hidden whitespace-nowrap text-[clamp(3.5rem,10vw,7.5rem)] font-black leading-[0.82] tracking-tight text-[#edede9]"
          >
            ПЕРЕГОВОРЫ
          </span>
          <p className={`mt-2 ${kicker}`}>Для кого подходит мастер-класс</p>
          <h2 className={`mt-3 ${sectionTitle}`}>Для кого</h2>
          <div className="mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {audience.map((item) => (
              <div
                key={item.title}
                className="flex min-h-[200px] flex-col rounded-[22px] border border-line bg-white p-6"
              >
                <h3 className={cardTitle}>{item.title}</h3>
                <p className="mt-3 leading-relaxed text-subtle">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Результаты (dark) */}
        <section
          className="relative overflow-hidden border-b border-line bg-[#0b0b0b] px-6 py-16 text-white sm:px-10"
          style={{
            backgroundImage:
              "linear-gradient(#222 1px,transparent 1px),linear-gradient(90deg,#222 1px,transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none block select-none overflow-hidden whitespace-nowrap text-[clamp(3.5rem,10vw,7.5rem)] font-black leading-[0.82] tracking-tight text-[#191919]"
          >
            РЕЗУЛЬТАТ
          </span>
          <p className={`mt-2 ${kicker} text-[#aaaaaa]`}>Что вы получите</p>
          <h2 className={`mt-3 ${sectionTitle}`}>Результаты</h2>
          <div className="mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <div
                key={item.title}
                className="flex min-h-[200px] flex-col rounded-[22px] border border-[#2e2e2e] bg-[#161616] p-6"
              >
                <h3 className={cardTitle}>{item.title}</h3>
                <p className="mt-3 leading-relaxed text-[#aaaaaa]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Программа */}
        <section className="border-b border-line px-6 py-16 sm:px-10">
          <p className={kicker}>Программа</p>
          <h2 className={`mt-3 ${sectionTitle}`}>Что разберем</h2>
          <div className="mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {program.map((item) => (
              <div
                key={item.title}
                className="flex min-h-[200px] flex-col rounded-[22px] border border-line bg-white p-6"
              >
                <h3 className={cardTitle}>{item.title}</h3>
                <p className="mt-3 leading-relaxed text-subtle">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Об эксперте */}
        <section className="grid grid-cols-1 border-b border-line lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[380px] overflow-hidden bg-[#e1e1dd] lg:min-h-[600px]">
            <Image
              src="/igor-belyaev.png"
              alt="Портрет эксперта Игоря Беляева"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-[50%_18%] grayscale contrast-[1.05]"
              priority
            />
          </div>
          <div className="flex flex-col justify-between gap-8 px-6 py-12 sm:px-10 lg:py-14">
            <div>
              <p className={kicker}>Об эксперте</p>
              <h2 className="mt-4 text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.98] tracking-tight">
                Игорь Беляев
              </h2>
              <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-charcoal sm:text-xl">
                Эксперт по переговорам, влиянию и управлению сложными коммуникациями.
              </p>
            </div>
            <div className="mt-4">
              {facts.map((fact) => (
                <div
                  key={fact.title}
                  className="grid gap-1.5 border-t border-line py-4 last:border-b last:border-line"
                >
                  <strong className="text-pretty text-[17px] font-bold leading-snug">
                    {fact.title}
                  </strong>
                  <span className="text-xs text-subtle">{fact.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Кейсы */}
        <section className="border-b border-line px-6 py-16 sm:px-10">
          <p className={kicker}>Кейсы клиентов</p>
          <h2 className={`mt-3 ${sectionTitle}`}>Кейсы</h2>
          <div className="mt-10 grid grid-cols-1 border-t border-line lg:grid-cols-3">
            {cases.map((item) => (
              <div
                key={item.title}
                className="flex min-h-[240px] flex-col justify-end border-b border-line p-8 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <h3 className="text-[clamp(1.4rem,2vw,1.65rem)] font-bold leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3.5 max-w-[95%] leading-relaxed text-subtle">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Участие / Стоимость (dark) */}
        <section
          id="participation"
          className="border-b border-line bg-[#0b0b0b] px-6 py-16 text-white sm:px-10"
        >
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className={kicker}>Участие</p>
              <h2 className={`mt-3 ${sectionTitle}`}>Стоимость и формат</h2>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-[#aaaaaa]">
                Дата, время, длительность, наличие записи и срок доступа уточняются.
              </p>
            </div>
            <div>
              <div className="text-[clamp(3.5rem,9vw,7rem)] font-black leading-[0.9] tracking-tight">
                ₽ —
              </div>
              <p className="mt-2 text-[#aaaaaa]">Точная стоимость уточняется.</p>
              <button
                type="button"
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-5 font-bold text-[#0b0b0b] transition-opacity hover:opacity-90"
              >
                Оплатить участие
              </button>
            </div>
          </div>
        </section>

        {/* Вопросы */}
        <section className="border-b border-line px-6 py-16 sm:px-10">
          <p className={kicker}>Частые вопросы</p>
          <h2 className={`mt-3 mb-6 ${sectionTitle}`}>Вопросы</h2>
          <div>
            {faq.map((question) => (
              <details
                key={question}
                className="group border-t border-line py-5 last:border-b last:border-line"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                  <span>{question}</span>
                  <span className="text-2xl leading-none text-subtle transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-subtle">Уточняется.</p>
              </details>
            ))}
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
