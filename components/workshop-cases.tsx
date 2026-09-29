import Image from "next/image"

const audiences = [
  {
    title: "Руководителям и собственникам",
    description: "Если нужно договариваться с партнёрами, командой и руководителями, отстаивать решения и сохранять рабочие отношения.",
    image: "/audience/decisions.jpg",
    alt: "Руководители обсуждают деловое решение",
  },
  {
    title: "Предпринимателям",
    description: "Для переговоров о сделках, долях, условиях сотрудничества и распределении ответственности.",
    image: "/audience/entrepreneurs.jpg",
    alt: "Предприниматели обсуждают условия сделки",
  },
  {
    title: "Экспертам и специалистам",
    description: "Если результат зависит от умения обсуждать стоимость, условия работы и границы ответственности.",
    image: "/audience/experts.jpg",
    alt: "Специалисты обсуждают рабочие условия",
  },
  {
    title: "Тем, кому предстоят личные переговоры",
    description: "Чтобы спокойнее обсуждать непростые вопросы, защищать свои интересы и искать взаимоприемлемые решения.",
    image: "/audience/personal.jpg",
    alt: "Люди обсуждают важный личный вопрос",
  },
]

const cases = [
  {
    title: "Коммерческие переговоры: результат выше ожидаемого",
    summary: "Доля в сделке выросла на 60% вместо запланированных 20%.",
    task: "Клиент хотел увеличить свою долю в сделке на 20%. Требовалось подготовиться к переговорам и выстроить конкретный сценарий действий на встрече.",
    work: "Провели полную подготовку: собрали и проанализировали информацию о контрагенте, подготовили материалы и документы, оценили интересы сторон и участников сделки. Построили переговорную карту, разобрали дальнейшие шаги, конкретные формулировки и действия на встрече.",
    result: "Вместо запланированного увеличения доли на 20% клиент получил увеличение на 60% — на 40% выше ожидаемого результата.",
  },
  {
    title: "Персональное наставничество для собственников и топ-менеджеров",
    summary: "Уверенная позиция в сложных переговорах и взаимодействии с жёсткими оппонентами.",
    task: "Клиент хотел увереннее управлять людьми, вступать в сложные и конфликтные переговоры и добиваться своих целей при взаимодействии с более жёсткими участниками. Из-за чрезмерно мягкого стиля общения его позицию могли использовать в чужих интересах.",
    work: "В рамках наставничества развивали навыки влияния и управления людьми, ведения сложных переговоров, защиты своей позиции и противодействия манипуляциям. Разбирали конкретные рабочие ситуации и закрепляли новые модели поведения.",
    result: "Клиент стал увереннее входить в сложные переговоры и конфликтные ситуации, управлять взаимодействием с жёсткими оппонентами и добиваться более выгодных условий.",
  },
  {
    title: "Бракоразводные переговоры с разделом компаний",
    summary: "Клиентка сохранила долю в бизнесе и получила денежную компенсацию.",
    task: "Во время бракоразводного процесса нужно было защитить интересы клиентки при разделе совместно нажитых активов. За годы брака супруги создали несколько компаний, брачного договора не было. Цель — сохранить долю клиентки в бизнесе и получить денежную компенсацию.",
    work: "Представлял интересы клиентки как одной стороны процесса, не выступая посредником между супругами. Сопровождал переговорную часть раздела совместно нажитых активов, помогал выстраивать позицию по компаниям и другим активам, определять условия раздела и добиваться решения в интересах клиентки.",
    result: "Клиентке удалось сохранить долю в компании и получить денежную компенсацию по итогам раздела совместно нажитых активов.",
  },
]

export function WorkshopCases() {
  return (
    <>
      <section className="px-5 py-12 md:px-10 md:py-16" aria-labelledby="audience-title">
        <div className="max-w-3xl">
          <h2 id="audience-title" className="text-balance text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">
            Для кого подходит
          </h2>
          <p className="mt-5 max-w-[62ch] text-pretty text-lg leading-relaxed text-zinc-400">
            Для тех, кому важно обсуждать сложные условия, сохранять свою позицию и приходить к договорённостям — в работе и личных вопросах.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {audiences.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-2xl bg-zinc-950">
              <div className="relative aspect-[16/9]">
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="flex flex-col gap-2 p-5 md:p-6">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="leading-relaxed text-zinc-400">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 md:px-10 md:py-16" aria-labelledby="cases-title">
        <div className="max-w-3xl">
          <h2 id="cases-title" className="text-balance text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">
            Примеры из практики
          </h2>
          <p className="mt-5 max-w-[62ch] text-pretty text-lg leading-relaxed text-zinc-400">
            Обезличенные ситуации, в которых подготовка и выстроенная стратегия помогли защитить интересы и договориться об условиях.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-950">
            <Image
              src="/workshop-negotiation.jpg"
              alt="Участники готовятся к деловым переговорам"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-3">
            {cases.map((item, index) => (
              <details key={item.title} className="group rounded-2xl border border-white/5 bg-zinc-950 p-5 transition-colors hover:border-yellow-400/30 md:p-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.16em] text-yellow-400">Кейс {index + 1}</span>
                    <strong className="mt-2 block text-lg font-bold leading-snug text-white md:text-xl">{item.title}</strong>
                    <span className="mt-2 block text-sm leading-relaxed text-zinc-400">{item.summary}</span>
                  </span>
                  <span className="mt-1 shrink-0 text-2xl leading-none text-yellow-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <div className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-zinc-300">
                  <p><strong className="text-white">Задача. </strong>{item.task}</p>
                  <p><strong className="text-white">Что было сделано. </strong>{item.work}</p>
                  <p><strong className="text-white">Результат. </strong>{item.result}</p>
                </div>
              </details>
            ))}
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">Все кейсы обезличены и конфиденциальны.</p>
          </div>
        </div>
      </section>
    </>
  )
}
