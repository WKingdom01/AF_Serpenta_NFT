import { useState } from 'react'
import dynamic from 'next/dynamic'
import Select from 'react-select';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next';
import { faGlobe, faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = dynamic(() => import('./Button'))

const LanguageSelect = () => {
    const { t } = useTranslation('common')
    const [selectedOption, setOption] = useState({ value: 'en', label: 'English' })
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const options = [
        { value: 'en', label: 'English' },
        { value: 'ch', label: 'Chinese' },
    ];


    return (
        <div className={`language-select ${open ? 'language-select--open' : ''}`} >
            <Button dropdown="true" text={selectedOption.label} style="blue ThreeD" active={open} className="language-select__header" clickHandler={() => setOpen(!open)}>
                <FontAwesomeIcon className="icon" icon={faGlobe} />
                <div className="language-select__selected-lang">{router.locale}</div>
            </Button>
            <div className="language-select__options">
                {options.map((option, index) => {
                    return <Link
                        key={`option--${index}`}
                        href='/'
                        locale={option.value}>
                        <div className="language-select__option">{option.label} {option.value === selectedOption.value ? <FontAwesomeIcon className="icon" icon={faCheck} /> : ''} </div>
                    </Link>
                })}
            </div>

        </div>
    )
}

export default LanguageSelect