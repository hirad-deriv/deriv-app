import * as React from 'react';
import Onboarding from 'Components/onboarding';
import { trading_hub_contents } from 'Constants/trading-hub-content';
import Joyride from 'react-joyride';
import ToggleAccountType from 'Components/toggle-account-type';
import { tour_step_config, tour_styles, tour_step_locale, tour_styles_dark_mode } from 'Constants/tour-steps-config';
import { observer } from 'mobx-react-lite';
import { useStores } from 'Stores';
import CFDAccounts from 'Components/CFDs';
import JurisdictionModal from 'Components/jurisdiction/jurisdiction-modal';

const TradingHub: React.FC = () => {
    const { ui, modules, client } = useStores();
    const { is_dark_mode_on } = ui;
    const { landing_companies, is_logged_in, is_uk } = client;
    const { toggleCFDPersonalDetailsModal, enableCFDPasswordModal } = modules.cfd;
    /*TODO: We need to show this component whenever user click on tour guide button*/
    const [is_tour_open, setIsTourOpen] = React.useState(false);

    return (
        <React.Fragment>
            <div className='trading-hub'>
                Trading Hub
                <CFDAccounts account_type='real' />
            </div>
            <ToggleAccountType accountTypeChange value={''} />
            <Joyride
                run={is_tour_open}
                continuous
                disableScrolling
                hideCloseButton
                disableCloseOnEsc
                steps={tour_step_config}
                styles={is_dark_mode_on ? tour_styles_dark_mode : tour_styles}
                locale={tour_step_locale}
                floaterProps={{
                    disableAnimation: true,
                }}
            />
            {/* <Onboarding contents={trading_hub_contents} setIsTourOpen={setIsTourOpen} /> */}
            <JurisdictionModal
                landing_companies={landing_companies}
                platform={'mt5'}
                is_logged_in={is_logged_in}
                is_uk={is_uk}
                toggleCFDPersonalDetailsModal={toggleCFDPersonalDetailsModal}
                openPasswordModal={enableCFDPasswordModal}
            />
        </React.Fragment>
    );
};

export default observer(TradingHub);
