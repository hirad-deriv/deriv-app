import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockStore } from '@deriv/stores';
import CFDPOI from '../cfd-poi';
import CFDProviders from '../../cfd-providers';

jest.mock('@deriv/account', () => ({
    ...jest.requireActual('@deriv/account'),
    ProofOfIdentityContainerForMt5: () => <div>ProofOfIdentityContainerForMt5</div>,
}));

describe('<CFDPOI />', () => {
    const ProofOfIdentityContainerForMt5 = 'ProofOfIdentityContainerForMt5';

    const mockRootStore = {
        client: {
            account_status: {
                authentication: {
                    attempts: { count: 0, history: {}, latest: null },
                    identity: {
                        services: { idv: {}, manual: {}, onfido: {} },
                        status: 'none',
                    },
                    document: {
                        status: 'none',
                    },
                    needs_verification: [],
                    ownership: { requests: [], status: 'none' },
                },
                currency_config: {
                    USD: {
                        is_deposit_suspended: 0,
                        is_withdrawal_suspended: 0,
                    },
                },
                prompt_client_to_authenticate: 0,
                risk_classification: 'low',
                status: [
                    'allow_document_upload',
                    'crs_tin_information',
                    'deposit_attempt',
                    'financial_information_not_complete',
                    'trading_experience_not_complete',
                ],
            },
            is_switching: false,
            is_virtual: false,
            should_allow_authentication: true,
            fetchResidenceList: jest.fn(),
        },
        common: {
            routeBackInApp: jest.fn(),
            app_routing_history: [
                {
                    key: '1597840000000',
                    action: 'POP',
                    hash: '#real',
                    pathname: '/mt5',
                    search: '',
                },
                {
                    key: '1597840000001',
                    action: 'PUSH',
                    hash: '',
                    pathname: '/',
                    search: '',
                },
            ],
        },
        notifications: {
            refreshNotifications: jest.fn(),
        },
    };

    const props = {
        height: 'auto',
        index: 1,
        onSave: jest.fn(),
        onSubmit: jest.fn(),
        addNotificationMessageByKey: jest.fn(),
        removeNotificationByKey: jest.fn(),
        removeNotificationMessage: jest.fn(),
        jurisdiction_selected_shortcode: 'svg',
        value: {
            poi_state: 'unknown',
        },
    };

    it('should render ProofOfIdentityContainerForMt5', () => {
        render(<CFDPOI {...props} />, {
            wrapper: ({ children }) => <CFDProviders store={mockStore(mockRootStore)}>{children}</CFDProviders>,
        });
        expect(screen.getByText(ProofOfIdentityContainerForMt5)).toBeInTheDocument();
    });
});
