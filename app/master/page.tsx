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

const cases = [
  {
    title: "Кейс 1",
    text: "Подготовка к сложным переговорам с высокой ставкой и разбор стратегии поведения.",
  },
  {
    title: "Кейс 2",
    text: "Работа с возражениями и удержание позиции без давления и конфликта.",
  },
  {
    title: "Кейс 3",
    text: "Выстраивание долгосрочных договоренностей и партнерских отношений.",
  },
]

export default function MasterPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1180px] border-x border-line/60 bg-ivory md:my-7 md:border md:shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
        <SiteNav />

        {/* Hero */}
        <section className="grid grid-cols-1 items-stretch border-b border-line lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex flex-col justify-between gap-14 px-6 py-12 sm:px-10 lg:py-14">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.14em]">
                Платный онлайн мастер-класс
              </p>
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
                href="#"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-charcoal bg-charcoal px-7 font-bold text-white transition-opacity hover:opacity-90"
              >
                Оплатить участие
              </a>
            </div>

            <div className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
              {meta.map((item, index) => (
                <div
                  key={item.label}
                  className="border-b border-line py-4 sm:border-b-0 sm:border-r sm:py-5 sm:pr-4 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-4 sm:first:pr-4"
                  data-index={index}
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
          <p className="mt-2 text-[11px] font-black uppercase tracking-[0.14em]">
            Для кого подходит мастер-класс
          </p>
          <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[0.98] tracking-tight">
            Для кого
          </h2>
          <div className="mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {audience.map((item) => (
              <div
                key={item.title}
                className="flex min-h-[200px] flex-col rounded-[22px] border border-line bg-white p-6"
              >
                <h3 className="text-[clamp(1.35rem,2vw,1.6rem)] font-bold leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-subtle">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Результаты (dark) */}
        <section className="relative overflow-hidden border-b border-line bg-[#0b0b0b] px-6 py-16 text-white sm:px-10">
          <span
            aria-hidden="true"
            className="pointer-events-none block select-none overflow-hidden whitespace-nowrap text-[clamp(3.5rem,10vw,7.5rem)] font-black leading-[0.82] tracking-tight text-[#191919]"
          >
            РЕЗУЛЬТАТ
          </span>
          <p className="mt-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#aaaaaa]">
            Что вы получите
          </p>
          <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[0.98] tracking-tight">
            Результаты
          </h2>
          <div className="mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <div
                key={item.title}
                className="flex min-h-[200px] flex-col rounded-[22px] border border-[#2e2e2e] bg-[#161616] p-6"
              >
                <h3 className="text-[clamp(1.35rem,2vw,1.6rem)] font-bold leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[#aaaaaa]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Практика / Кейсы */}
        <section className="border-b border-line px-6 py-16 sm:px-10">
          <p className="text-[11px] font-black uppercase tracking-[0.14em]">Кейсы</p>
          <h2 className="mt-3 text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[0.98] tracking-tight">
            Практика
          </h2>
          <div className="mt-10 grid grid-cols-1 border-t border-line lg:grid-cols-3">
            {cases.map((item, index) => (
              <div
                key={item.title}
                className="flex min-h-[240px] flex-col justify-end border-b border-line p-8 lg:border-b-0 lg:border-r lg:last:border-r-0"
                data-index={index}
              >
                <h3 className="text-[clamp(1.4rem,2vw,1.65rem)] font-bold leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3.5 max-w-[95%] leading-relaxed text-subtle">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
