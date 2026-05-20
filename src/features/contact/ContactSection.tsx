import { useI18n } from '../../hooks/useI18n'
import { Section } from '../../components/Section'

const contactItems = [
  { label: 'contact.email', value: 'mtsarac03@gmail.com', href: 'mailto:mtsarac03@gmail.com' },
  { label: 'contact.phone', value: '(541) 614-8690', href: 'tel:+905416148690' },
  { label: 'GitHub', value: 'github.com/mtsarac', href: 'https://github.com/mtsarac' },
  { label: 'LinkedIn', value: 'linkedin.com/in/mtsarac', href: 'https://linkedin.com/in/mtsarac' },
]

export function ContactSection() {
  const { t } = useI18n()

  return (
    <Section id="contact" title={t('contact.title')}>
      <div className="max-w-md mx-auto space-y-4">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group"
          >
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {item.label.startsWith('contact.') ? t(item.label) : item.label}
            </span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.value}
            </span>
          </a>
        ))}

        <p className="text-center text-sm text-neutral-500 dark:text-neutral-500 mt-6">
          Merkezefendi / Denizli
        </p>
      </div>
    </Section>
  )
}
