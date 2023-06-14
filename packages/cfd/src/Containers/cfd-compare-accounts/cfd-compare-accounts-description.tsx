import React from 'react';
import { Text } from '@deriv/components';
import { TModifiedTradingPlatformAvailableAccount } from 'Components/props.types';
import { getJuridisctionDescription, getMarketType } from '../../Helpers/compare-accounts-config';

type TCFDCompareAccountsDescriptionProps = {
    trading_platforms: TModifiedTradingPlatformAvailableAccount;
};

const CFDCompareAccountsDescription: React.FC<TCFDCompareAccountsDescriptionProps> = ({ trading_platforms }) => {
    const market_type = getMarketType(trading_platforms);
    const jurisdiction_shortcode = market_type.concat('_', trading_platforms.shortcode);
    const juridisction_data = getJuridisctionDescription(jurisdiction_shortcode);
    return (
        <div className={'compare-cfd-account-text-container'}>
            <div className='compare-cfd-account-text-container__separator'>
                <Text as='h1' weight='bold' size='m' align='center'>
                    {juridisction_data.leverage}
                </Text>
                <Text as='p' size='xxxs' align='center'>
                    {juridisction_data.leverageDescription}
                </Text>
            </div>
            <div className='compare-cfd-account-text-container__separator'>
                <Text as='h1' weight='bold' size='m' align='center'>
                    {juridisction_data.spread}
                </Text>
                <Text as='p' size='xxxs' align='center'>
                    {juridisction_data.spreadDescription}
                </Text>
            </div>
            <div className='compare-cfd-account-text-container__separator'>
                <Text as='h1' weight='bold' size='xxs' align='center'>
                    {juridisction_data.counterpartyCompany}
                </Text>
                <Text as='p' size='xxxs' align='center'>
                    {juridisction_data.counterpartyCompanyDescription}
                </Text>
            </div>
            <div className='compare-cfd-account-text-container__separator'>
                <Text as='h1' weight='bold' size='xxs' align='center'>
                    {juridisction_data.jurisdiction}
                </Text>
                <Text as='p' size='xxxs' align='center'>
                    {juridisction_data.jurisdictionDescription}
                </Text>
            </div>
            <div className='compare-cfd-account-text-container__separator'>
                <Text as='h1' weight='bold' size='xxs' align='center'>
                    {juridisction_data.regulator}
                </Text>
                <Text as='p' size='xxxs' align='center'>
                    {juridisction_data.regulatorDescription}
                </Text>
            </div>
        </div>
    );
};

export default CFDCompareAccountsDescription;
