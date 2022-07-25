import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = dynamic(() => import('./Button'));

const LanguageSelect = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const options = [
    { value: 'en', label: t('languageLabels.en') },
    { value: 'cn', label: t('languageLabels.cn') },
    { value: 'jp', label: t('languageLabels.jp') },
  ];

  const [selectedOption, setOption] = useState(
    options.find((element) => element.value === router.locale)
  );
  const [open, setOpen] = useState(false);

  return (
    <div className={`language-select ${open ? 'language-select--open' : ''}`}>
      <Button
        dropdown="true"
        text={selectedOption.label}
        style="blue ThreeD"
        active={open}
        className="language-select__header"
        clickHandler={() => setOpen(!open)}
      ></Button>
      <div className="language-select__options">
        {options.map((option, index) => {
          return (
            <Link
              key={`option--${index}`}
              href="/"
              locale={option.value}
              passHref
            >
              <div className="language-select__option">
                {option.label}{' '}
                {option.value === selectedOption.value ? (
                  <FontAwesomeIcon className="icon" icon={faCheck} />
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSelect;
