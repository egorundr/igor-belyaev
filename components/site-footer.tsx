export function SiteFooter() {
  return (
    <footer className="bg-[var(--ink)] px-6 py-9 text-white sm:px-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <strong className="text-sm">ИП Игоря Беляева</strong>
          <p className="mt-2 text-xs leading-relaxed text-[#aaaaaa]">
            Реквизиты ИП уточняются и будут добавлены после подтверждения.
          </p>
        </div>
        <div className="text-xs leading-relaxed text-[#aaaaaa]">
          <a href="#" className="block transition-colors hover:text-white">
            Политика обработки персональных данных
          </a>
          <a href="#" className="block transition-colors hover:text-white">
            Согласие на обработку персональных данных
          </a>
          <span className="mt-1 block">Электронная почта для связи: уточняется</span>
        </div>
      </div>
    </footer>
  )
}
