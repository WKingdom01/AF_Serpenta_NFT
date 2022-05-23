import { useTranslation } from 'next-i18next'

const GrayFrame = () => {
  const { t } = useTranslation('common')
  return (
    <section className="grayframe component">
      <div className="grayframe__title">
        {t('about.title')}
      </div>
      <div className="grayframe__content">
        <div className="grayframe__text" dangerouslySetInnerHTML={{ __html: t('about.content') }}>

        </div>

      </div>
    </section>
  )
}

export default GrayFrame