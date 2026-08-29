import { CaptureForm } from "@/components/capture-form"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"

const outcomes = [
  "Формулировка уточняется",
  "Формулировка уточняется",
  "Формулировка уточняется",
]

export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1180px] border-x border-line/60 bg-ivory md:my-7 md:border md:shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
        <SiteNav />

        <section className="grid grid-cols-1 items-stretch border-b border-line lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="flex min-w-0 flex-col gap-10 px-6 py-12 sm:px-10 lg:py-14 lg:pr-12">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.14em]">Бесплатный материал</p>
              <h1 className="mt-5 text-pretty text-[clamp(2rem,6.5vw,4.25rem)] font-black uppercase leading-[0.94] tracking-[-0.035em]">
                Гайд
                <br />
                <span className="inline-block text-transparent [-webkit-text-stroke:1px_var(--charcoal)]">
                  по переговорам
                </span>
              </h1>
              <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-charcoal sm:text-xl">
                Заберите бесплатный гайд «Название уточняется» и используйте его как короткую
                шпаргалку перед важным разговором.
              </p>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-black uppercase tracking-[0.14em] text-subtle">
                После прочтения гайда вы получите
              </p>
              <div className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
                {outcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className="border-b border-line py-4 sm:border-b-0 sm:border-r sm:py-5 sm:pr-4 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-4 sm:first:pr-4"
                  >
                    <strong className="block text-lg font-bold leading-snug">{outcome}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex min-w-0 items-center bg-[var(--ink)] px-6 py-10 sm:px-10">
            <CaptureForm />
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
