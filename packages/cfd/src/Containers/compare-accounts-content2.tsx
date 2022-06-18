import React from 'react';
import { Icon } from '@deriv/components';
import { Localize } from '@deriv/translations';
import classNames from 'classnames';

const ModalConent2 = () => {
    const [verification_status] = React.useState('pending');
    const [verification_status2] = React.useState('verified');
    const [verification_status3] = React.useState('not_submitted');
    const [selected_card, setSelectedCard] = React.useState(false);

    return (
        <div className='cfd-jurisdiction-card__wrapper'>
            <div
                className={classNames('cfd-jurisdiction-card', { 'cfd-jurisdiction-card--selected': selected_card })}
                onClick={() => setSelectedCard(!selected_card)}
            >
                <div className='cfd-jurisdiction-card__over-header'>
                    <p>
                        <Localize i18n_default_text='Better leverage and spreads' />
                    </p>
                </div>
                <h1>
                    <Localize i18n_default_text='British Virgin Islands' />
                </h1>
                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize
                            i18n_default_text='Regulated by the British Virgin Islands Financial Services Commission (License no.
                        SIBA/L/18/1114)'
                        />
                    </span>
                </div>

                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize i18n_default_text='Registered with the Financial Commission' />
                    </span>
                </div>

                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize
                            i18n_default_text='170+ assets: forex (standard/micro), stocks, stock indices, commodities, basket indices, and
                        cryptocurrencies'
                        />
                    </span>
                </div>

                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize i18n_default_text='Leverage up to 1:1000' />
                    </span>
                </div>
                {verification_status === 'not_submitted' && (
                    <div className='cfd-jurisdiction-card__footer'>
                        <p>
                            <Localize i18n_default_text='You will need to submit proof of identity and address' />
                        </p>
                    </div>
                )}
                {verification_status === 'pending' && (
                    <div className='cfd-jurisdiction-card__verification-status'>
                        <p className='cfd-jurisdiction-card__verification-status--pending'>
                            <Localize i18n_default_text='Pending verification' />
                        </p>
                    </div>
                )}
                {verification_status === 'verified' && (
                    <div className='cfd-jurisdiction-card__verification-status'>
                        <p className='cfd-jurisdiction-card__verification-status--verified'>
                            <Localize i18n_default_text='Verified' />
                        </p>
                    </div>
                )}
            </div>
            <div
                className={classNames('cfd-jurisdiction-card', { 'cfd-jurisdiction-card--selected': selected_card })}
                onClick={() => setSelectedCard(!selected_card)}
            >
                <div className='cfd-jurisdiction-card__over-header'>
                    <p>
                        <Localize i18n_default_text='Better leverage and spreads' />
                    </p>
                </div>
                <h1>
                    <Localize i18n_default_text='Vanuatu' />
                </h1>
                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize i18n_default_text='Regulated by the Vanuatu Financial Services Commission' />
                    </span>
                </div>

                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize i18n_default_text='Registered with the Financial Commission' />
                    </span>
                </div>

                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize i18n_default_text='30+ assets: forex and commodities' />
                    </span>
                </div>

                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize i18n_default_text='Leverage up to 1:1000' />
                    </span>
                </div>
                {verification_status2 === 'not_submitted' && (
                    <div className='cfd-jurisdiction-card__footer'>
                        <p>
                            <Localize i18n_default_text='You will need to submit proof of identity and address' />
                        </p>
                    </div>
                )}
                {verification_status2 === 'pending' && (
                    <div className='cfd-jurisdiction-card__verification-status'>
                        <p className='cfd-jurisdiction-card__verification-status--pending'>
                            <Localize i18n_default_text='Pending verification' />
                        </p>
                    </div>
                )}
                {verification_status2 === 'verified' && (
                    <div className='cfd-jurisdiction-card__verification-status'>
                        <p className='cfd-jurisdiction-card__verification-status--verified'>
                            <Localize i18n_default_text='Verified' />
                        </p>
                    </div>
                )}
            </div>
            <div
                className={classNames('cfd-jurisdiction-card', { 'cfd-jurisdiction-card--selected': selected_card })}
                onClick={() => setSelectedCard(!selected_card)}
            >
                <div className='cfd-jurisdiction-card__over-header'>
                    <p>
                        <Localize i18n_default_text='Straight through processing' />
                    </p>
                </div>
                <h1>Labuan</h1>
                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize i18n_default_text='Regulated by the Labuan Financial Services Authority (licence no. MB/18/0024)' />
                    </span>
                </div>

                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize i18n_default_text='Registered with the Financial Commission' />
                    </span>
                </div>

                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize i18n_default_text='80+ assets: forex and cryptocurrencies' />
                    </span>
                </div>

                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize i18n_default_text='Leverage up to 1:100' />
                    </span>
                </div>

                <div className='cfd-jurisdiction-card__bullet-wrapper'>
                    <span className='cfd-jurisdiction-card__bullet--checkmark'>
                        <div className='cfd-jurisdiction-card__bullet--checkmark_stem' />
                        <div className='cfd-jurisdiction-card__bullet--checkmark_kick' />
                    </span>
                    <span>
                        <Localize i18n_default_text='Straight through processing' />
                    </span>
                </div>
                {verification_status3 === 'not_submitted' && (
                    <div className='cfd-jurisdiction-card__footer'>
                        <p>
                            <Localize i18n_default_text='You will need to submit proof of identity and address' />
                        </p>
                    </div>
                )}
                {verification_status3 === 'pending' && (
                    <div className='cfd-jurisdiction-card__verification-status'>
                        <p className='cfd-jurisdiction-card__verification-status--pending'>
                            <Localize i18n_default_text='Pending verification' />
                        </p>
                    </div>
                )}
                {verification_status3 === 'verified' && (
                    <div className='cfd-jurisdiction-card__verification-status'>
                        <p className='cfd-jurisdiction-card__verification-status--verified'>
                            <Localize i18n_default_text='Verified' />
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalConent2;
