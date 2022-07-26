import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const replace = (node) => {
  if (node.name === 'a') {
    return (
      <a {...node.attribs} rel="noreferrer">
        {domToReact(node.children)}
      </a>
    );
  }
};

const HelpCenter = ({ modalOpen, setModalOpen }) => {
  const [questionOpen, setQuestionOpen] = useState(0);

  const { t, i18n, ready } = useTranslation('common', { useSuspense: false });

  const toggleQuestionOpen = (index) => {
    const i = index + 1;
    if (i === questionOpen) {
      setQuestionOpen(0);
    } else {
      setQuestionOpen(i);
    }
  };

  return (
    <Modal centered show={modalOpen}>
      <div className="help-center">
        <div className="help-center__top">
          <div className="help-center__title">Help Center</div>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            {' '}
            <Image
              alt="help"
              src="/close.svg"
              layout="intrinsic"
              width="50"
              height="50"
              quality={100}
              priority
              className="help-center__close"
            />
          </button>
        </div>
        <div className="help-center__questions">
          {ready &&
            t('mint.helpCenter.questions', { returnObjects: true }).map(
              (question, index) => {
                return (
                  <div
                    className={`help-center__question ${
                      questionOpen === index + 1
                        ? 'help-center__question--open'
                        : ''
                    }`}
                    key={`question-hc-${index}`}
                  >
                    <button
                      className="help-center__prompt"
                      onClick={() => {
                        toggleQuestionOpen(index);
                      }}
                    >
                      <span className="help-center__chevron">{'> '}</span>
                      {question.prompt}
                    </button>
                    <div className="help-center__answer">
                      {parse(question.answer, { replace })}
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </div>
    </Modal>
  );
};

export default HelpCenter;
