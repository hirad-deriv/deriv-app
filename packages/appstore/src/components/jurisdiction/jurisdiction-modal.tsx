import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, DesktopWrapper, MobileDialog, MobileWrapper, UILoader } from '@deriv/components';
import { localize, Localize } from '@deriv/translations';
import { GetAccountSettingsResponse, GetSettings, LandingCompany, DetailsOfEachMT5Loginid } from '@deriv/api-types';
import JurisdictionModalContent from './jurisdiction-modal-content';
import { WS, getIdentityStatusInfo } from '@deriv/shared';
import { useStores } from 'Stores/index';
import { TRootStore } from 'Types';

type TTradingPlatformAvailableAccount = {
    market_type: 'financial' | 'gaming';
    name: string;
    requirements: {
        after_first_deposit: {
            financial_assessment: string[];
        };
        compliance: {
            mt5: string[];
            tax_information: string[];
        };
        signup: string[];
    };
    shortcode: 'bvi' | 'labuan' | 'svg' | 'vanuatu';
    sub_account_type: string;
};

type TCompareAccountsReusedProps = {
    landing_companies: LandingCompany;
    platform: string;
    is_logged_in: boolean;
    is_uk: boolean;
};

type TOpenAccountTransferMeta = {
    category: string;
    type?: string;
};

type TJurisdictionModalProps = TCompareAccountsReusedProps & {
    toggleCFDPersonalDetailsModal: () => void;
    openPasswordModal: (account_type: TOpenAccountTransferMeta) => void;
};

const JurisdictionModal = ({ toggleCFDPersonalDetailsModal, openPasswordModal }: TJurisdictionModalProps) => {
    const { client, modules, ui }: TRootStore = useStores();

    const { disableApp, enableApp } = ui;
    const {
        account_type,
        is_jurisdiction_modal_visible,
        jurisdiction_selected_shortcode,
        toggleJurisdictionModal,
        toggleCFDVerificationModal,
        setJurisdictionSelectedShortcode,
    } = modules.cfd;
    const {
        account_settings,
        authentication_status,
        trading_platform_available_accounts,
        is_eu,
        is_fully_authenticated,
        setAccountSettings,
        account_status,
        mt5_login_list,
        updateAccountStatus,
    } = client;

    const [checked, setChecked] = React.useState(false);
    const [has_submitted_personal_details, setHasSubmittedPersonalDetails] = React.useState(false);

    const {
        onfido_status,
        manual_status,
        poa_status,
        poi_status,
        need_poi_for_vanuatu,
        need_poi_for_bvi_labuan,
        need_poa_submission,
        poi_verified_for_vanuatu,
        poi_verified_for_labuan_bvi,
        poa_verified,
        poi_acknowledged_for_bvi_labuan,
        poi_acknowledged_for_vanuatu,
    } = getIdentityStatusInfo(account_status);

    const poi_poa_pending = poi_status === 'pending' && poa_status === 'pending';
    const poi_poa_verified = poi_status === 'verified' && poa_status === 'verified';
    const poi_failed = poi_status === 'suspected' || poi_status === 'rejected' || poi_status === 'expired';
    const poa_failed = poa_status === 'suspected' || poa_status === 'rejected' || poa_status === 'expired';
    const poi_poa_not_submitted = poi_status === 'none' || poa_status === 'none';

    const selectSVGJurisdiction = () => {
        if (account_type.type && !is_eu) {
            const created_svg_accounts = mt5_login_list.filter(
                (data: DetailsOfEachMT5Loginid) =>
                    data.market_type === account_type.type &&
                    data.landing_company_short === 'svg' &&
                    data.account_type === 'real'
            );
            if (!created_svg_accounts.length && (poa_status === 'pending' || poi_status === 'pending')) {
                setJurisdictionSelectedShortcode('svg');
            } else {
                setJurisdictionSelectedShortcode('');
            }
        } else {
            setJurisdictionSelectedShortcode('');
        }
    };

    React.useEffect(() => {
        if (is_jurisdiction_modal_visible) {
            updateAccountStatus();
            selectSVGJurisdiction();
            if (!has_submitted_personal_details) {
                let get_settings_response: GetSettings = {};
                if (!account_settings) {
                    WS.authorized.storage.getSettings().then((response: GetAccountSettingsResponse) => {
                        get_settings_response = response.get_settings as GetSettings;
                        setAccountSettings(response.get_settings as GetSettings);
                    });
                } else {
                    get_settings_response = account_settings;
                }
                const { citizen, place_of_birth, tax_residence, tax_identification_number, account_opening_reason } =
                    get_settings_response as GetSettings;
                if (citizen && place_of_birth && tax_residence && tax_identification_number && account_opening_reason) {
                    setHasSubmittedPersonalDetails(true);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [is_jurisdiction_modal_visible]);

    React.useEffect(() => {
        if (jurisdiction_selected_shortcode) {
            setChecked(false);
        }
    }, [jurisdiction_selected_shortcode, is_jurisdiction_modal_visible]);

    const financial_available_accounts = trading_platform_available_accounts.filter(
        (available_account: TTradingPlatformAvailableAccount) => available_account.market_type === 'financial'
    );

    const synthetic_available_accounts = trading_platform_available_accounts.filter(
        (available_account: TTradingPlatformAvailableAccount) => available_account.market_type === 'gaming'
    );

    const modal_title = is_eu
        ? localize('Jurisdiction for your Deriv MT5 CFDs account')
        : localize('Choose a jurisdiction for your Deriv MT5 {{account_type}} account', {
              account_type: account_type.type === 'synthetic' ? 'Derived' : 'Financial',
          });

    const isNextButtonEnabled = () => {
        if (jurisdiction_selected_shortcode) {
            if (jurisdiction_selected_shortcode === 'svg') {
                return true;
            } else if (jurisdiction_selected_shortcode === 'vanuatu') {
                return (
                    (poi_poa_not_submitted ||
                        need_poi_for_vanuatu ||
                        need_poa_submission ||
                        (poi_poa_verified && checked)) &&
                    !poi_poa_pending
                );
            }
            return (
                (poi_poa_not_submitted ||
                    need_poi_for_bvi_labuan ||
                    need_poa_submission ||
                    (poi_poa_verified && checked)) &&
                !poi_poa_pending
            );
        }
        return false;
    };

    const onSelectRealAccount = () => {
        const type_of_account = {
            category: account_type.category,
            type: account_type.type,
        };

        if (is_eu && jurisdiction_selected_shortcode === 'maltainvest') {
            if (poi_poa_verified) {
                openPasswordModal(type_of_account);
            } else {
                toggleCFDVerificationModal();
            }
        } else if (jurisdiction_selected_shortcode === 'svg') {
            openPasswordModal(type_of_account);
        } else if (jurisdiction_selected_shortcode === 'vanuatu') {
            if (need_poi_for_vanuatu) {
                toggleCFDVerificationModal();
            } else if (poi_poa_verified) {
                // for bvi, labuan & vanuatu:
                if (!has_submitted_personal_details) {
                    toggleCFDPersonalDetailsModal();
                } else {
                    openPasswordModal(type_of_account);
                }
            } else {
                toggleCFDVerificationModal();
            }
        } else if (need_poi_for_bvi_labuan) {
            toggleCFDVerificationModal();
        } else if (poi_poa_verified) {
            if (!has_submitted_personal_details) {
                toggleCFDPersonalDetailsModal();
            } else {
                openPasswordModal(type_of_account);
            }
        } else {
            toggleCFDVerificationModal();
        }
    };

    const buttonText = () => {
        const is_non_svg_selected = jurisdiction_selected_shortcode !== 'svg' && jurisdiction_selected_shortcode;
        if (poa_failed && is_non_svg_selected && !poi_poa_not_submitted) {
            return <Localize i18n_default_text='Resubmit proof of address' />;
        } else if (
            jurisdiction_selected_shortcode === 'vanuatu' &&
            (onfido_status === 'none' || manual_status === 'none')
        ) {
            return <Localize i18n_default_text='Next' />;
        } else if (poi_failed && is_non_svg_selected && !poi_poa_not_submitted) {
            return <Localize i18n_default_text='Resubmit proof of identity' />;
        } else if (poa_failed && poi_failed && is_non_svg_selected) {
            return <Localize i18n_default_text='Resubmit' />;
        }
        return <Localize i18n_default_text='Next' />;
    };

    return (
        <>
            <div>
                <React.Suspense fallback={<UILoader />}>
                    <DesktopWrapper>
                        <Modal
                            disableApp={disableApp}
                            enableApp={enableApp}
                            is_open={is_jurisdiction_modal_visible}
                            title={modal_title}
                            toggleModal={toggleJurisdictionModal}
                            type='button'
                            height='664px'
                            width={account_type.type === 'synthetic' ? '1040px' : '1200px'}
                            exit_classname='cfd-modal--custom-exit'
                        >
                            <JurisdictionModalContent
                                financial_available_accounts={financial_available_accounts}
                                jurisdiction_selected_shortcode={jurisdiction_selected_shortcode}
                                setJurisdictionSelectedShortcode={setJurisdictionSelectedShortcode}
                                synthetic_available_accounts={synthetic_available_accounts}
                                account_type={account_type.type}
                                authentication_status={authentication_status}
                                poa_status={poa_status}
                                poi_status={poi_status}
                                is_eu={is_eu}
                                is_fully_authenticated={is_fully_authenticated}
                                poi_poa_pending={poi_poa_pending}
                                checked={checked}
                                setChecked={setChecked}
                                poi_failed={poi_failed}
                                poa_failed={poa_failed}
                                poi_verified_for_vanuatu={poi_verified_for_vanuatu}
                                poi_verified_for_labuan_bvi={poi_verified_for_labuan_bvi}
                                poa_verified={poa_verified}
                                poi_acknowledged_for_bvi_labuan={poi_acknowledged_for_bvi_labuan}
                                poi_acknowledged_for_vanuatu={poi_acknowledged_for_vanuatu}
                                need_poi_for_vanuatu={need_poi_for_vanuatu}
                                need_poi_for_bvi_labuan={need_poi_for_bvi_labuan}
                            />
                            <Modal.Footer has_separator>
                                <Button
                                    disabled={!isNextButtonEnabled()}
                                    primary
                                    onClick={() => {
                                        toggleJurisdictionModal();
                                        onSelectRealAccount();
                                    }}
                                >
                                    {buttonText()}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </DesktopWrapper>
                    <MobileWrapper>
                        <MobileDialog
                            portal_element_id='deriv_app'
                            title={modal_title}
                            visible={is_jurisdiction_modal_visible}
                            onClose={toggleJurisdictionModal}
                        >
                            <JurisdictionModalContent
                                financial_available_accounts={financial_available_accounts}
                                jurisdiction_selected_shortcode={jurisdiction_selected_shortcode}
                                setJurisdictionSelectedShortcode={setJurisdictionSelectedShortcode}
                                synthetic_available_accounts={synthetic_available_accounts}
                                account_type={account_type.type}
                                authentication_status={authentication_status}
                                poa_status={poa_status}
                                poi_status={poi_status}
                                is_eu={is_eu}
                                is_fully_authenticated={is_fully_authenticated}
                                poi_poa_pending={poi_poa_pending}
                                checked={checked}
                                setChecked={setChecked}
                                poi_failed={poi_failed}
                                poa_failed={poa_failed}
                                poi_verified_for_vanuatu={poi_verified_for_vanuatu}
                                poi_verified_for_labuan_bvi={poi_verified_for_labuan_bvi}
                                poa_verified={poa_verified}
                                poi_acknowledged_for_bvi_labuan={poi_acknowledged_for_bvi_labuan}
                                poi_acknowledged_for_vanuatu={poi_acknowledged_for_vanuatu}
                                need_poi_for_vanuatu={need_poi_for_vanuatu}
                                need_poi_for_bvi_labuan={need_poi_for_bvi_labuan}
                            />
                            <Modal.Footer has_separator>
                                <Button
                                    style={{ width: '100%' }}
                                    disabled={!isNextButtonEnabled()}
                                    primary
                                    onClick={() => {
                                        toggleJurisdictionModal();
                                        onSelectRealAccount();
                                    }}
                                >
                                    {buttonText()}
                                </Button>
                            </Modal.Footer>
                        </MobileDialog>
                    </MobileWrapper>
                </React.Suspense>
            </div>
        </>
    );
};

export default observer(JurisdictionModal);
