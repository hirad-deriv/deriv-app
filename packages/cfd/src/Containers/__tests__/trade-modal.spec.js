import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TradeModal from '../trade-modal';

jest.mock('Stores/connect.js', () => ({
    __esModule: true,
    default: 'mockedDefaultExport',
    connect: () => Component => Component,
}));

jest.mock('@deriv/components', () => ({
    ...jest.requireActual('@deriv/components'),
    Icon: jest.fn(({ icon }) => <div>{icon}</div>),
}));

jest.mock('@deriv/shared', () => ({
    ...jest.requireActual('@deriv/shared'),
    isMobile: jest.fn().mockReturnValue(true),
}));

describe('<TradeModal />', () => {
    const history = createBrowserHistory();
    const mock_props = {
        is_eu_user: false,
        onPasswordManager: jest.fn(),
        toggleModal: jest.fn(),
        dxtrade_tokens: '',
        is_demo: false,
        platform: 'dxtrade',
    };

    beforeAll(() => {
        modal_root_el = document.createElement('div');
        modal_root_el.setAttribute('id', 'modal_root');
        document.body.appendChild(modal_root_el);
    });

    afterAll(() => {
        document.body.removeChild(modal_root_el);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the modal', async () => {
        render(<TradeModal {...mock_props} />);
        await waitFor(() => {
            expect(screen.getByText(/Deriv X/i)).toBeInTheDocument();
        });
    });

    it('server maintenance text should be visible in the modal', async () => {
        render(<TradeModal {...mock_props} />);
        expect(
            await screen.findByText(
                /Server maintenance starts at 06:00 GMT every Sunday and may last up to 2 hours. You may experience service disruption during this time./i
            )
        ).toBeInTheDocument();
    });

    it('should show transfer message on successful DerivX account creation', async () => {
        const props = {
            is_cfd_success_dialog_enabled: true,
            is_password_modal_exited: true,
            account_type: { category: 'real', type: 'financial' },
            is_eu: false,
            is_fully_authenticated: false,
            platform: 'dxtrade',
        };

        render(
            <Router history={history}>
                <CFDPasswordModal {...mock_props} {...props} />
            </Router>
        );

        expect(
            await screen.findByText(/to start trading, transfer funds from your Deriv account into this account./i)
        ).toBeInTheDocument();
    });

    it('should show transfer message on successful cTrader account creation', async () => {
        const props = {
            is_cfd_success_dialog_enabled: true,
            is_password_modal_exited: true,
            account_type: { category: 'real', type: 'all' },
            is_eu: false,
            is_fully_authenticated: false,
            platform: 'ctrader',
        };

        render(
            <Router history={history}>
                <CFDPasswordModal {...mock_props} {...props} />
            </Router>
        );

        expect(
            await screen.findByText(/to start trading, transfer funds from your Deriv account into this account./i)
        ).toBeInTheDocument();
    });

    it('should display Deriv X icon in Trade modal', async () => {
        const props = {
            platform: 'dxtrade',
        };
        render(
            <Router history={history}>
                <CFDPasswordModal {...mock_props} {...props} />
            </Router>
        );

        expect(await screen.findByText('IcBrandDerivx')).toBeInTheDocument();
    });

    it('should display Deriv EZ icon in Trade modal', async () => {
        const props = {
            platform: 'derivez',
        };
        render(
            <Router history={history}>
                <CFDPasswordModal {...mock_props} {...props} />
            </Router>
        );

        expect(await screen.findByText('IcBrandDerivEz')).toBeInTheDocument();
    });

    it('should display cTrader icon in Trade modal', async () => {
        const props = {
            platform: 'ctrader',
        };
        render(
            <Router history={history}>
                <CFDPasswordModal {...mock_props} {...props} />
            </Router>
        );

        expect(await screen.findByText('IcBrandCtrader')).toBeInTheDocument();
    });
});
