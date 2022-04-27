import dynamic from 'next/dynamic'
const Question  = dynamic(() =>  import('./Question'))
import { useTranslation } from 'next-i18next'

const FAQ = ({children}) => {

  const { t } = useTranslation('common')

  return (
   
      <section className="container">
        <div className="FAQ component">
          <div className="FAQ__questions">
          <Question question={t('faq.questionOne')} answer={t('faq.answerOne')}></Question>
          <Question question={t('faq.questionTwo')} answer={t('faq.answerTwo')}></Question>
          <Question question={t('faq.questionThree')} answer={t('faq.answerThree')}></Question>
          <Question question={t('faq.questionFour')} answer={t('faq.answerFour')}></Question>
          <Question question={t('faq.questionFive')} answer={t('faq.answerFive')}></Question>
          </div>
        </div>
      </section>
  )
  }

export default FAQ

