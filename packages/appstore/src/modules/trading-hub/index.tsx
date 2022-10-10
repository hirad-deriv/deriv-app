import * as React from 'react';
import Onboarding from 'Components/onboarding';
import { trading_hub_contents } from 'Constants/trading-hub-content';
import Joyride from 'react-joyride';
import ToggleAccountType from 'Components/toggle-account-type';
import { tour_step_config, tour_styles, tour_step_locale, tour_styles_dark_mode } from 'Constants/tour-steps-config';
import { observer } from 'mobx-react-lite';
import { useStores } from 'Stores';
import CFDAccounts from 'Components/CFDs';
// import CFDPasswordModal from 'Components/jurisdiction/cfd-password-modal';
// import CFDPersonalDetailsModal from 'Components/jurisdiction/cfd-personal-details-modal';
// import JurisdictionModal from 'Components/jurisdiction/jurisdiction-modal';
import JurisdictionModal from '@deriv/cfd';

const TradingHub: React.FC = () => {
    const store = useStores();
    const { ui, modules, client } = useStores();
    const { is_dark_mode_on } = ui;
    const { landing_companies, is_logged_in, is_uk } = client;
    const { toggleCFDPersonalDetailsModal, enableCFDPasswordModal, setAccountType, openPasswordModal } = modules.cfd;
    /*TODO: We need to show this component whenever user click on tour guide button*/
    const [is_tour_open, setIsTourOpen] = React.useState(false);

    type TOpenAccountTransferMeta = {
        category: string;
        type?: string;
    };
    const openRealPasswordModal = (account_type: TOpenAccountTransferMeta) => {
        setAccountType(account_type);
        openPasswordModal();
    };

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
                context={store}
                landing_companies={landing_companies}
                platform={'mt5'}
                is_logged_in={is_logged_in}
                is_uk={is_uk}
                toggleCFDPersonalDetailsModal={toggleCFDPersonalDetailsModal}
                openPasswordModal={openRealPasswordModal}
            />
            {/* <CFDPasswordModal platform={'mt5'} /> */}
            {/* <CFDPersonalDetailsModal /> */}
        </React.Fragment>
    );
};

export default observer(TradingHub);
