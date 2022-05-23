import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useState } from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Team = () => {
    const [open, setOpen] = useState(0)

    const { t, i18n, ready } = useTranslation('common', { useSuspense: false });

    const toggleOpen = (index) => {
        const i = index + 1
        if (i === open) {
            setOpen(0)
        } else {
            setOpen(i)
        }

    }
    return (
        <section className="team component">
            <div className="container team__container">
                <div className="team__members">
                    {ready && t('team.members', { returnObjects: true }).map((member, index) => {
                        return <div className="team__member" key={`member-${index}`}>
                            <div className="team__image">
                                <Image
                                    alt="dragon"
                                    src={member.image}
                                    layout="fixed"
                                    width="120"
                                    height="120"
                                    quality={100}
                                    loading="lazy"
                                />
                            </div>
                            <div className="team__text">
                                <div className="team__name"> {member.name}</div>
                                <div className="team__title">// {member.title}</div>{/* eslint-disable-line*/}
                                <div className="team__footer">
                                    <button className="team__button" onClick={() => { toggleOpen(index) }}>
                                        <FontAwesomeIcon className={`team__icon ${open === index + 1 ? 'team__icon--open' : ''}`} icon={faChevronDown}></FontAwesomeIcon>
                                        <span>{t('team.buttonText')}</span>
                                    </button>
                                    <div className={`team__description ${open === index + 1 ? 'team__description--open' : ''}`}>
                                        <p> {member.description}</p>
                                        <a className="team__twitter" href={member.twitter} target="_blank" rel="noreferrer">
                                            <Image
                                                alt="twitter"
                                                src="/twitter.svg"
                                                layout="intrinsic"
                                                width="121"
                                                height="100"
                                                quality={100}
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>

                    })}

                </div>
            </div>
        </section>
    )
}

export default Team