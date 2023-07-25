import React from 'react';
import classNames from 'classnames';
import { Text } from '@deriv/components';
import { TCompareAccountsCard } from 'Components/props.types';
import { getJuridisctionDescription, getMarketType } from '../../Helpers/compare-accounts-config';

const CFDCompareAccountsDescription = ({ trading_platforms, is_demo }: TCompareAccountsCard) => {
    const market_type = getMarketType(trading_platforms);
    const market_type_shortcode = market_type.concat('_', trading_platforms.shortcode);
    const juridisction_data = getJuridisctionDescription(market_type_shortcode);

    return (
        <div
            className={classNames('compare-cfd-account-text-container', {
                'compare-cfd-account-text-container--demo': is_demo,
            })}
        >
            <div className='compare-cfd-account-text-container__separator'>
                <Text as='h1' weight='bold' size='m' align='center'>
                    {juridisction_data.leverage}
                </Text>
                <Text as='p' size='xxxs' align='center'>
                    {juridisction_data.leverage_description}
                </Text>
            </div>
            <div className='compare-cfd-account-text-container__separator'>
                <Text as='h1' weight='bold' size='m' align='center'>
                    {juridisction_data.spread}
                </Text>
                <Text as='p' size='xxxs' align='center'>
                    {juridisction_data.spread_description}
                </Text>
            </div>
            {!is_demo && (
                <React.Fragment>
                    <div className='compare-cfd-account-text-container__separator'>
                        <Text as='h1' weight='bold' size='xxs' align='center'>
                            {juridisction_data.counterparty_company}
                        </Text>
                        <Text as='p' size='xxxs' align='center'>
                            {juridisction_data.counterparty_company_description}
                        </Text>
                    </div>
                    <div className='compare-cfd-account-text-container__separator'>
                        <Text as='h1' weight='bold' size='xxs' align='center'>
                            {juridisction_data.jurisdiction}
                        </Text>
                        <Text as='p' size='xxxs' align='center'>
                            {juridisction_data.jurisdiction_description}
                        </Text>
                    </div>
                    <div className='compare-cfd-account-text-container__separator'>
                        <Text as='h1' weight='bold' size='xxs' align='center'>
                            {juridisction_data.regulator}
                        </Text>
                        <Text as='p' size='xxxs' align='center'>
                            {juridisction_data.regulator_description.split('<br />')[0]}
                        </Text>
                        <Text as='p' size='xxxs' align='center'>
                            {juridisction_data.regulator_description.split('<br />')[1]}
                        </Text>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default CFDCompareAccountsDescription;
