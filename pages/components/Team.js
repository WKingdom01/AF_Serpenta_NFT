import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useState } from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Team = () => {
    const [open, setOpen] = useState(0)
    const { t } = useTranslation('common')
    return (
        <section className="team component">
            <div className="container team__container">
                <div className="team__members">
                    {t('team.members', { returnObjects: true }).map(member => {
                        return <div className="team__member">
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
                                    <button className="team__button" onClick={() => { setOpen(1) }}>
                                        <FontAwesomeIcon className={`team__icon ${open === 1 ? 'team__icon--open' : ''}`} icon={faChevronDown}></FontAwesomeIcon>
                                        <span>{t('team.buttonText')}</span>
                                    </button>
                                    <div className={`team__description ${open === 1 ? 'team__description--open' : ''}`}>
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