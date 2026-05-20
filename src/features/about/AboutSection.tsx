import { useI18n } from '../../hooks/useI18n'
import { Section } from '../../components/Section'

export function AboutSection() {
  const { t } = useI18n()

  return (
    <Section id="about" title={t('about.title')}>
      <div className="space-y-8">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            {t('about.description')}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
            {t('about.education')}
          </h3>
          <div className="space-y-6">
            <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {t('about.university')}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {t('about.department')} — {t('about.gpa')}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">2022 – 2026</p>
            </div>
            <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {t('about.erasmus')}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {t('about.erasmusDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
