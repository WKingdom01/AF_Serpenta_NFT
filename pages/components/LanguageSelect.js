import { useState } from 'react'
import Select from 'react-select';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const LanguageSelect = () => {
    const {t} = useTranslation('common')
    const [option, setOption] = useState({value:'en', label: 'En'}) 
    const [open, setOpen] = useState(false) 
    const router = useRouter()

    const options = [
        { value: 'en', label: 'en' },
        { value: 'ch', label: 'ch' },
    ];


    return (
        <div className={`language-select ${open ? 'language-select--open' : ''}`} >
            <button className="language-select__header" onClick={()=>setOpen(!open)}>
                <FontAwesomeIcon className="icon" icon={faGlobe} />
                <div className="language-select__selected-lang">{router.locale}</div>
            </button>
            <div className="language-select__options">
                {options.map((option, index) => {
                    return <Link
                        key={`option--${index}`}
                        href='/'
                        locale={option.value}>
                        <div className="language-select__option">{option.label}</div>
                    </Link>
                })}
            </div>
           
        </div>
    )
}

export default LanguageSelect