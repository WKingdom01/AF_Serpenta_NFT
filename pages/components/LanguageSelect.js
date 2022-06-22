import { useState } from 'react';
import dynamic from 'next/dynamic';
import Select from 'react-select';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import {
  faGlobe,
  faCheck,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
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
        dropdown='true'
        text={selectedOption.label}
        style='blue ThreeD'
        active={open}
        className='language-select__header'
        clickHandler={() => setOpen(!open)}
      >
        {/* // TODO: @purple: I added children for a loading state inside a button can you decide if you want to have this icon in or not? */}
        {/* <FontAwesomeIcon className="icon" icon={faGlobe} />
                <div className="language-select__selected-lang">{router.locale}</div> */}
      </Button>
      <div className='language-select__options'>
        {options.map((option, index) => {
          return (
            <Link key={`option--${index}`} href='/' locale={option.value}>
              <div className='language-select__option'>
                {option.label}{' '}
                {option.value === selectedOption.value ? (
                  <FontAwesomeIcon className='icon' icon={faCheck} />
                ) : (
                  ''
                )}{' '}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSelect;
