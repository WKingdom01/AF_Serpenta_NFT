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
                <h2 className="team__title title">{t('team.title')}</h2>
                <div className="team__members">
                    <div className="team__member">
                        <div className="team__image">
                            <Image
                                alt="dragon"
                                src={t('team.memberOne.image')}
                                layout="fixed"
                                width="120"
                                height="120"
                                quality={100}
                                loading="lazy"
                            />
                        </div>
                        <div className="team__text">
                            <div className="team__name"> {t('team.memberOne.name')}</div>
                            <div className="team__title">// {t('team.memberOne.title')}</div>{/* eslint-disable-line*/}
                            <div className="team__footer">
                                <button className="team__button" onClick={() => { setOpen(1) }}>
                                    <FontAwesomeIcon className={`team__icon ${open === 1 ? 'team__icon--open' : ''}`} icon={faChevronDown}></FontAwesomeIcon>
                                    <span>More</span>
                                </button>
                                <div className={`team__description ${open === 1 ? 'team__description--open' : ''}`}>
                                    <p> {t('team.memberOne.description')}</p>
                                    <a className="team__twitter" href={t('team.memberOne.twitter')} target="_blank" rel="noreferrer">
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
                    <div className="team__member">
                        <div className="team__image">
                            <Image
                                alt="dragon"
                                src={t('team.memberTwo.image')}
                                layout="fixed"
                                width="120"
                                height="120"
                                quality={100}
                                loading="lazy"
                            />
                        </div>
                        <div className="team__text">
                            <div className="team__name"> {t('team.memberTwo.name')}</div>
                            <div className="team__title">// {t('team.memberTwo.title')}</div> {/* eslint-disable-line*/}
                            <div className="team__footer">
                                <button className="team__button" onClick={() => { setOpen(2) }}>
                                    <FontAwesomeIcon className={`team__icon ${open === 2 ? 'team__icon--open' : ''}`} icon={faChevronDown}></FontAwesomeIcon>
                                    <span>More</span>
                                </button>
                                <div className={`team__description ${open === 2 ? 'team__description--open' : ''}`}>
                                    <p> {t('team.memberOne.description')}</p>
                                    <a className="team__twitter" href={t('team.memberTwo.twitter')} target="_blank" rel="noreferrer">
                                        <Image
                                            alt="twitter"
                                            src="/twitter.svg"
                                            layout="intrinsic"
                                            width="121"
                                            height="120"
                                            quality={100}
                                            loading="lazy"
                                        />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="team__member">
                        <div className="team__image">
                            <Image
                                alt="dragon"
                                src={t('team.memberThree.image')}
                                layout="fixed"
                                width="120"
                                height="120"
                                quality={100}
                                loading="lazy"
                            />
                        </div>
                        <div className="team__text">
                            <div className="team__name"> {t('team.memberThree.name')}</div>
                            <div className="team__title">// {t('team.memberThree.title')}</div> {/* eslint-disable-line*/}
                            <div className="team__footer">
                                <button className="team__button" onClick={() => { setOpen(3) }}>
                                    <FontAwesomeIcon className={`team__icon ${open === 3 ? 'team__icon--open' : ''}`} icon={faChevronDown}></FontAwesomeIcon>
                                    <span>More</span>
                                </button>
                                <div className={`team__description ${open === 3 ? 'team__description--open' : ''}`}>
                                    <p> {t('team.memberOne.description')}</p>
                                    <a className="team__twitter" href={t('team.memberThree.twitter')} target="_blank" rel="noreferrer">
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
                    <div className="team__member">
                        <div className="team__image">
                            <Image
                                alt="dragon"
                                src={t('team.memberFour.image')}
                                layout="fixed"
                                width="120"
                                height="120"
                                quality={100}
                                loading="lazy"
                            />
                        </div>
                        <div className="team__text">
                            <div className="team__name"> {t('team.memberFour.name')}</div>
                            <div className="team__title">// {t('team.memberFour.title')}</div> {/* eslint-disable-line*/}
                            <div className="team__footer">
                                <button className="team__button" onClick={() => { setOpen(4) }}>
                                    <FontAwesomeIcon className={`team__icon ${open === 4 ? 'team__icon--open' : ''}`} icon={faChevronDown}></FontAwesomeIcon>
                                    <span>More</span>
                                </button>
                                <div className={`team__description ${open === 4 ? 'team__description--open' : ''}`}>
                                    <p> {t('team.memberOne.description')}</p>
                                    <a className="team__twitter" href={t('team.memberFour.twitter')} target="_blank" rel="noreferrer">
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
                    <div className="team__member">
                        <div className="team__image">
                            <Image
                                alt="dragon"
                                src={t('team.memberFive.image')}
                                layout="fixed"
                                width="120"
                                height="120"
                                quality={100}
                                loading="lazy"
                            />
                        </div>
                        <div className="team__text">
                            <div className="team__name"> {t('team.memberFive.name')}</div>
                            <div className="team__title">// {t('team.memberFive.title')}</div> {/* eslint-disable-line*/}
                            <div className="team__footer">
                                <button className="team__button" onClick={() => { setOpen(4) }}>
                                    <FontAwesomeIcon className={`team__icon ${open === 4 ? 'team__icon--open' : ''}`} icon={faChevronDown}></FontAwesomeIcon>
                                    <span>More</span>
                                </button>
                                <div className={`team__description ${open === 4 ? 'team__description--open' : ''}`}>
                                    <p> {t('team.memberOne.description')}</p>
                                    <a className="team__twitter" href={t('team.memberFive.twitter')} target="_blank" rel="noreferrer">
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
                    <div className="team__member">
                        <div className="team__image">
                            <Image
                                alt="dragon"
                                src={t('team.memberSix.image')}
                                layout="fixed"
                                width="120"
                                height="120"
                                quality={100}
                                loading="lazy"
                            />
                        </div>
                        <div className="team__text">
                            <div className="team__name"> {t('team.memberSix.name')}</div>
                            <div className="team__title">// {t('team.memberSix.title')}</div> {/* eslint-disable-line*/}
                            <div className="team__footer">
                                <button className="team__button" onClick={() => { setOpen(4) }}>
                                    <FontAwesomeIcon className={`team__icon ${open === 4 ? 'team__icon--open' : ''}`} icon={faChevronDown}></FontAwesomeIcon>
                                    <span>More</span>
                                </button>
                                <div className={`team__description ${open === 4 ? 'team__description--open' : ''}`}>
                                    <p> {t('team.memberOne.description')}</p>
                                    <a className="team__twitter" href={t('team.memberSix.twitter')} target="_blank" rel="noreferrer">
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
                </div>
            </div>
        </section>
    )
}

export default Team