import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockStore } from '@deriv/stores';
import { CFDRealAccountDisplay } from '../cfd-real-account-display';
import CFDProviders from '../../cfd-providers';

describe('<CFDRealAccountDisplay />', () => {
    const TESTED_CASES = {
        EU: 'eu',
        NON_EU_DMT5: 'non_eu_dmt5',
        NON_EU_DXTRADE: 'non_eu_dxtrade',
    } as const;

    let props: React.ComponentProps<typeof CFDRealAccountDisplay>;

    beforeEach(() => {
        props = {
            current_list: {},
            has_cfd_account_error: false,
            has_real_account: true,
            is_accounts_switcher_on: false,
            is_eu: false,
            is_eu_country: false, // depends on client IP address
            is_logged_in: true,
            is_virtual: false,
            isAccountOfTypeDisabled: jest.fn(() => false),
            isDxtradeAllCardVisible: jest.fn(() => true),
            isSyntheticCardVisible: jest.fn(() => true),
            isFinancialCardVisible: jest.fn(() => true),
            onSelectAccount: jest.fn(),
            openDerivRealAccountNeededModal: jest.fn(),
            openAccountTransfer: jest.fn(),
            openPasswordManager: jest.fn(),
            platform: 'mt5',
            realSyntheticAccountsExistingData: jest.fn(),
            realFinancialAccountsExistingData: jest.fn(),
            real_account_creation_unlock_date: '',
            setShouldShowCooldownModal: jest.fn(),
            residence: 'id',
            should_enable_add_button: false,
            standpoint: {
                financial_company: 'svg',
                gaming_company: 'svg',
                iom: false,
                malta: false,
                maltainvest: false,
                svg: true,
            },
            toggleAccountsDialog: jest.fn(),
            toggleShouldShowRealAccountsList: jest.fn(),
            show_eu_related_content: false,
        };
    });

    type TTESTED_CASES = typeof TESTED_CASES[keyof typeof TESTED_CASES];

    const checkAccountCardsRendering = (tested_case: TTESTED_CASES) => {
        const first_account_card = 'Derived';
        const second_account_card = {
            eu: 'CFDs',
            non_eu: 'Financial',
        };

        expect(screen.getByTestId('dt_cfd_real_accounts_display')).toBeInTheDocument();

        if (tested_case === TESTED_CASES.NON_EU_DMT5 || tested_case === TESTED_CASES.NON_EU_DXTRADE) {
            expect(screen.getByText(second_account_card.non_eu)).toBeInTheDocument();
        } else if (tested_case === TESTED_CASES.EU) {
            expect(screen.queryByText(first_account_card)).not.toBeInTheDocument();
            expect(screen.getByText(second_account_card.eu)).toBeInTheDocument();
            expect(screen.queryByText(second_account_card.non_eu)).not.toBeInTheDocument();
        }
    };

    it('should render Derived & Financial cards with enabled buttons on Deriv MT5 when is_logged_in=true & is_eu=false', () => {
        render(<CFDRealAccountDisplay {...props} />, {
            wrapper: ({ children }) => <CFDProviders store={mockStore({})}>{children}</CFDProviders>,
        });

        checkAccountCardsRendering(TESTED_CASES.NON_EU_DMT5);
        const add_real_account_buttons = screen.getAllByRole('button', { name: /add real account/i });
        expect(add_real_account_buttons).toHaveLength(2);

        fireEvent.click(add_real_account_buttons[0]);
        expect(props.onSelectAccount).toHaveBeenCalledWith({ type: 'synthetic', category: 'real', platform: 'mt5' });

        fireEvent.click(add_real_account_buttons[1]);
        expect(props.onSelectAccount).toHaveBeenCalledWith({ type: 'financial', category: 'real', platform: 'mt5' });
    });

    it('should render Derived & Financial cards without "Add real account" buttons on Deriv MT5 when is_logged_in=false & is_eu_country=false', () => {
        render(<CFDRealAccountDisplay {...props} is_logged_in={false} />, {
            wrapper: ({ children }) => <CFDProviders store={mockStore({})}>{children}</CFDProviders>,
        });

        checkAccountCardsRendering(TESTED_CASES.NON_EU_DMT5);
        expect(screen.queryByRole('button', { name: /add real account/i })).not.toBeInTheDocument();
    });

    it('should render a CFDs card only with enabled "Add real account" button on Deriv MT5 when is_logged_in=true, should_enable_add_button=true & show_eu_related_content=true', () => {
        props.isSyntheticCardVisible = jest.fn(() => false);
        render(<CFDRealAccountDisplay {...props} show_eu_related_content should_enable_add_button />, {
            wrapper: ({ children }) => <CFDProviders store={mockStore({})}>{children}</CFDProviders>,
        });

        checkAccountCardsRendering(TESTED_CASES.EU);
        const add_real_account_button = screen.getByRole('button', { name: /add real account/i });
        expect(add_real_account_button).toBeEnabled();

        fireEvent.click(add_real_account_button);
        expect(props.openDerivRealAccountNeededModal).toHaveBeenCalledTimes(1);
    });

    it('should render a CFDs card only without "Add real account" button on Deriv MT5 when is_logged_in=false & is_eu_country=true (also when redirected from Deriv X platform)', () => {
        props.isSyntheticCardVisible = jest.fn(() => false);
        render(<CFDRealAccountDisplay {...props} is_logged_in={false} show_eu_related_content />, {
            wrapper: ({ children }) => <CFDProviders store={mockStore({})}>{children}</CFDProviders>,
        });

        checkAccountCardsRendering(TESTED_CASES.EU);
        expect(screen.queryByRole('button', { name: /add real account/i })).not.toBeInTheDocument();
    });

    it('should render Derived & Financial cards with enabled buttons on Deriv X when is_logged_in=true & is_eu=false', () => {
        render(<CFDRealAccountDisplay {...props} platform='dxtrade' />, {
            wrapper: ({ children }) => <CFDProviders store={mockStore({})}>{children}</CFDProviders>,
        });

        checkAccountCardsRendering(TESTED_CASES.NON_EU_DXTRADE);
        const add_real_account_buttons = screen.getAllByRole('button', { name: /add real account/i });
        expect(add_real_account_buttons).toHaveLength(3);

        fireEvent.click(add_real_account_buttons[0]);
        expect(props.onSelectAccount).toHaveBeenCalledWith({
            type: 'synthetic',
            category: 'real',
            platform: 'dxtrade',
        });

        fireEvent.click(add_real_account_buttons[1]);
        expect(props.onSelectAccount).toHaveBeenCalledWith({
            type: 'financial',
            category: 'real',
            platform: 'dxtrade',
        });
    });

    it('should render Derived & Financial cards without "Add real account" buttons on Deriv X when is_logged_in=false & is_eu_country=false', () => {
        render(<CFDRealAccountDisplay {...props} is_logged_in={false} platform='dxtrade' />, {
            wrapper: ({ children }) => <CFDProviders store={mockStore({})}>{children}</CFDProviders>,
        });

        checkAccountCardsRendering(TESTED_CASES.NON_EU_DXTRADE);
        expect(screen.queryByRole('button', { name: /add real account/i })).not.toBeInTheDocument();
    });

    it('should show "Switch to your real account", which opens Account Switcher, on Deriv X cards when has_real_account=true & is_virtual=true', () => {
        render(<CFDRealAccountDisplay {...props} is_virtual platform='dxtrade' />, {
            wrapper: ({ children }) => <CFDProviders store={mockStore({})}>{children}</CFDProviders>,
        });

        checkAccountCardsRendering(TESTED_CASES.NON_EU_DMT5);
        expect(screen.queryByRole('button', { name: /add real account/i })).not.toBeInTheDocument();
        const switch_to_real_account_links = screen.getAllByText('Switch to your real account');
        expect(switch_to_real_account_links).toHaveLength(3);

        fireEvent.click(switch_to_real_account_links[0]);
        expect(props.toggleShouldShowRealAccountsList).toHaveBeenCalledWith(true);
        expect(props.toggleAccountsDialog).toHaveBeenCalledWith(true);
    });

    it('should disable all "Add real account" buttons when has_cfd_account_error=true', () => {
        render(<CFDRealAccountDisplay {...props} has_cfd_account_error />, {
            wrapper: ({ children }) => <CFDProviders store={mockStore({})}>{children}</CFDProviders>,
        });

        checkAccountCardsRendering(TESTED_CASES.NON_EU_DMT5);
        const add_real_account_buttons = screen.getAllByRole('button', { name: /add real account/i });
        expect(add_real_account_buttons[0]).toBeDisabled();
        expect(add_real_account_buttons[1]).toBeDisabled();
    });
});
