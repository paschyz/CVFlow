import { SITE } from '@/content/site'
import { BrandLogo } from '@/components/common/brand-logo'

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface-base/60">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <BrandLogo />
            <p className="mt-3 text-sm text-subtle max-w-xs">{SITE.footer.blurb}</p>
          </div>

          {SITE.footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">{col.title}</h4>
              <ul className="space-y-2.5 mt-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="block text-sm text-subtle hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-7 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-subtle">
          <span>{SITE.footer.legal}</span>
          <span>Propulsé par l&apos;IA</span>
        </div>
      </div>
    </footer>
  )
}
