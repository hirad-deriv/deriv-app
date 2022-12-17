import React from 'react';
import CFDsListing from 'Components/cfds-listing';
import ModalManager from 'Components/modals/modal-manager';
import MainTitleBar from 'Components/main-title-bar';
import OptionsAndMultipliersListing from 'Components/options-multipliers-listing';
import './traders-hub.scss';
import { DesktopWrapper, MobileWrapper, ButtonToggle, Div100vhContainer } from '@deriv/components';
import { useStores } from 'Stores/index';
import { observer } from 'mobx-react-lite';
import { isDesktop, routes } from '@deriv/shared';

const TradersHub = () => {
    const { tradershub, client } = useStores();

    const platform_toggle_options = [
        { text: `${client.is_eu ? 'Multipliers' : 'Options & Multipliers'}`, value: 'options' },
        { text: 'CFDs', value: 'cfd' },
    ];

    const platformTypeChange = (event: {
        target: {
            value: string;
            name: string;
        };
    }) => {
        tradershub.setTogglePlatformType(event.target.value);
    };

    const traders_hub = window.location.pathname === routes.traders_hub;

    return (
        <>
            <Div100vhContainer className='traders-hub--mobile' height_offset='50px' is_disabled={isDesktop()}>
                <div id='traders-hub' className='traders-hub'>
                    <MainTitleBar />
                    <DesktopWrapper>
                        <div className='traders-hub__main-container'>
                            <OptionsAndMultipliersListing />
                            <CFDsListing />
                        </div>
                    </DesktopWrapper>
                    <MobileWrapper>
                        <ButtonToggle
                            buttons_arr={platform_toggle_options}
                            className='traders-hub__button-toggle'
                            has_rounded_button
                            is_traders_hub={traders_hub}
                            name='platforn_type'
                            onChange={platformTypeChange}
                            value={tradershub.selected_platform_type}
                        />
                        {tradershub.selected_platform_type === 'options' && <OptionsAndMultipliersListing />}
                        {tradershub.selected_platform_type === 'cfd' && <CFDsListing />}
                    </MobileWrapper>
                    <ModalManager />
                </div>
            </Div100vhContainer>
        </>
    );
};

export default observer(TradersHub);
