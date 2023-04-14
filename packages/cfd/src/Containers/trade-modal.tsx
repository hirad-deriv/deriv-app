import React from 'react';
import { Text, Icon, Money } from '@deriv/components';
import { TTradingPlatformAccounts, TCFDDashboardContainer, TCFDsPlatformType } from '../Components/props.types';
import { DetailsOfEachMT5Loginid } from '@deriv/api-types';
import { CFD_PLATFORMS, getCFDAccountKey, isMobile, capitalizeFirstLetter } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { getPlatformQRCode, mobileDownloadLink, PlatformsDesktopDownload } from '../Helpers/config';
import { platformsText, CTRADER_DOWNLOAD_LINK } from '../Helpers/constants';
import SpecBox from 'Components/specbox';
import PasswordBox from 'Components/passwordbox';

type TTradeModalProps = {
    mt5_trade_account: Required<DetailsOfEachMT5Loginid>;
    is_eu_user: boolean;
    onPasswordManager: (
        arg1: string | undefined,
        arg2: string,
        arg3: string,
        arg4: string,
        arg5: string | undefined
    ) => void;
    toggleModal: () => void;
    dxtrade_tokens: TCFDDashboardContainer['dxtrade_tokens'];
    is_demo: string;
    platform: TCFDsPlatformType;
};

const getTitle = (market_type: string, is_eu_user: boolean) => {
    if (is_eu_user) localize('MT5 CFDs');
    return market_type;
};

const PlatformIconsAndDescriptions = (platform: TCFDsPlatformType, is_demo: string) => {
    return (
        <React.Fragment>
            <Icon
                icon={platform === 'derivez' ? 'IcBrandDerivEz' : `IcBrand${capitalizeFirstLetter(platform)}`}
                size={24}
            />
            <div className='cfd-trade-modal__desc'>
                <Text size='xs' line_height='l' className='cfd-trade-modal__desc-heading'>
                    <Localize
                        i18n_default_text='Deriv {{platform}} {{is_demo}}'
                        values={{
                            platform: platformsText(platform),
                            is_demo: is_demo ? 'Demo' : '',
                        }}
                    />
                </Text>
            </div>
        </React.Fragment>
    );
};

const TradeModal = ({
    mt5_trade_account,
    is_eu_user,
    onPasswordManager,
    toggleModal,
    dxtrade_tokens,
    is_demo,
    platform,
}: TTradeModalProps) => {
    const CTraderAndDerivEZDescription = () => {
        const description = platform === 'derivez' ? 'Deriv EZ' : 'cTrader';
        return (
            <div className='cfd-trade-modal__login-specs-item'>
                <Text className='cfd-trade-modal--paragraph'>
                    <Localize
                        i18n_default_text='Use your Deriv account email and password to login into the {{ platform }} platform.'
                        values={{ platform: description }}
                    />
                </Text>
            </div>
        );
    };
    const downloadCenterAppOption = (account_type: TCFDsPlatformType) => {
        if (account_type === 'dxtrade') {
            return (
                <div className='cfd-trade-modal__download-center-app--option'>
                    <Text className='cfd-trade-modal__download-center-app--option-item' size='xs'>
                        {localize('Run Deriv X on your browser')}
                    </Text>
                    <PlatformsDesktopDownload
                        platform={account_type}
                        is_demo={is_demo}
                        dxtrade_tokens={dxtrade_tokens}
                    />
                </div>
            );
        } else if (account_type === 'ctrader') {
            return (
                <React.Fragment>
                    <div className='cfd-trade-modal__download-center-app--option'>
                        <Text className='cfd-trade-modal__download-center-app--option-item' size='xs'>
                            {localize('Run cTrader on your browser')}
                        </Text>
                        <PlatformsDesktopDownload
                            platform={account_type}
                            is_demo={is_demo}
                            dxtrade_tokens={dxtrade_tokens}
                        />
                    </div>
                    <div className='cfd-trade-modal__download-center-app--option'>
                        <Icon icon='IcWindowsLogo' size={32} />
                        <Text className='cfd-trade-modal__download-center-app--option-item' size='xs'>
                            {localize('cTrader Windows app')}
                        </Text>
                        <a
                            className='dc-btn cfd-trade-modal__download-center-app--option-link'
                            type='button'
                            href={CTRADER_DOWNLOAD_LINK}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <Text size='xxs' weight='bold'>
                                {localize('Download')}
                            </Text>
                        </a>
                    </div>
                </React.Fragment>
            );
        } else if (account_type === 'derivez') {
            return (
                <div className='cfd-trade-modal__download-center-app--option'>
                    <Text className='cfd-trade-modal__download-center-app--option-item' size='xs'>
                        {localize('Run Deriv EZ on your browser')}
                    </Text>
                    <PlatformsDesktopDownload
                        platform={account_type}
                        is_demo={is_demo}
                        dxtrade_tokens={dxtrade_tokens}
                    />
                </div>
            );
        }
        return undefined;
    };

    return (
        <div className='cfd-trade-modal-container'>
            <div className='cfd-trade-modal'>
                {PlatformIconsAndDescriptions(platform, is_demo)}
                {mt5_trade_account?.display_balance && (
                    <Text size='xs' color='profit-success' className='cfd-trade-modal__desc-balance' weight='bold'>
                        <Money
                            amount={mt5_trade_account.display_balance}
                            currency={mt5_trade_account.currency}
                            has_sign={!!mt5_trade_account.balance && mt5_trade_account.balance < 0}
                            show_currency
                        />
                    </Text>
                )}
            </div>
            <div className='cfd-trade-modal__login-specs'>
                {platform !== 'dxtrade' && <CTraderAndDerivEZDescription />}
                {platform === 'dxtrade' && (
                    <React.Fragment>
                        <div className='cfd-trade-modal__login-specs-item'>
                            <Text className='cfd-trade-modal--paragraph'>{localize('Username')}</Text>
                            <SpecBox is_bold value={(mt5_trade_account as TTradingPlatformAccounts)?.login} />
                        </div>
                        <div className='cfd-trade-modal__login-specs-item'>
                            <Text className='cfd-trade-modal--paragraph'>{localize('Password')}</Text>
                            <div className='cfd-trade-modal--paragraph'>
                                <PasswordBox
                                    platform='dxtrade'
                                    onClick={() => {
                                        const account_type = getCFDAccountKey({
                                            market_type: mt5_trade_account.market_type,
                                            sub_account_type: mt5_trade_account.sub_account_type,
                                            platform: CFD_PLATFORMS.DMT5,
                                            shortcode: mt5_trade_account.landing_company_short,
                                        });
                                        onPasswordManager(
                                            mt5_trade_account?.login,
                                            getTitle(mt5_trade_account.market_type, is_eu_user),
                                            mt5_trade_account.account_type,
                                            account_type,
                                            (mt5_trade_account as DetailsOfEachMT5Loginid)?.server
                                        );
                                        toggleModal();
                                    }}
                                />
                            </div>
                        </div>
                    </React.Fragment>
                )}

                <div className='cfd-trade-modal__maintenance'>
                    <Icon
                        icon='IcAlertWarning'
                        size={isMobile() ? 28 : 20}
                        className='cfd-trade-modal__maintenance-icon'
                    />
                    <div className='cfd-trade-modal__maintenance-text'>
                        <Localize i18n_default_text='Server maintenance starts at 06:00 GMT every Sunday and may last up to 2 hours. You may experience service disruption during this time.' />
                    </div>
                </div>
            </div>
            <div className='cfd-trade-modal__download-center-app'>{downloadCenterAppOption(platform)}</div>
            <div className='cfd-trade-modal__download-center-options'>
                <div className='cfd-trade-modal__download-center-options--mobile-links'>
                    <div className='cfd-trade-modal__download-center-options--mobile-links--apple'>
                        <a href={mobileDownloadLink(platform, 'ios')} target='_blank' rel='noopener noreferrer'>
                            <Icon icon='IcInstallationApple' width={isMobile() ? '160' : '130'} height={40} />
                        </a>
                    </div>
                    <a href={mobileDownloadLink(platform, 'android')} target='_blank' rel='noopener noreferrer'>
                        <Icon icon='IcInstallationGoogle' width={135} height={40} />
                    </a>
                    {platform !== 'ctrader' && (
                        <div className='cfd-trade-modal__download-center-options--mobile-links--huawei'>
                            <a href={mobileDownloadLink(platform, 'huawei')} target='_blank' rel='noopener noreferrer'>
                                <Icon icon='IcInstallationHuawei' width={135} height={40} />
                            </a>
                        </div>
                    )}
                </div>
                <div className='cfd-trade-modal__download-center-options--qrcode'>{getPlatformQRCode(platform)}</div>
            </div>
        </div>
    );
};

export default TradeModal;
