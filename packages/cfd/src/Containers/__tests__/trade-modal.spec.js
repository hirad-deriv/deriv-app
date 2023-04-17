import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
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
        let modal_root_el = document.createElement('div');
        modal_root_el.setAttribute('id', 'modal_root');
        document.body.appendChild(modal_root_el);
    });

    afterAll(() => {
        document.body.removeChild(modal_root_el);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the Deriv X modal', async () => {
        render(<TradeModal {...mock_props} />);
        await waitFor(() => {
            expect(screen.getByText(/Deriv X/i)).toBeInTheDocument();
        });
    });

    it('should show the the Deriv X run on browser text', async () => {
        render(<TradeModal {...mock_props} />);
        await waitFor(() => {
            expect(screen.getByText(/Run Deriv X on your browser/i)).toBeInTheDocument();
        });
    });

    it('should render the Deriv EZ modal', async () => {
        const props = {
            platform: 'derivez',
        };
        render(<TradeModal {...mock_props} {...props} />);
        await waitFor(() => {
            expect(screen.getByText(/Deriv EZ/i)).toBeInTheDocument();
        });
    });

    it('should show the the Deriv EZ run on browser text', async () => {
        const props = {
            platform: 'derivez',
        };
        render(<TradeModal {...mock_props} {...props} />);
        await waitFor(() => {
            expect(screen.getByText(/Run Deriv EZ on your browser/i)).toBeInTheDocument();
        });
    });

    it('should render the cTrader modal', async () => {
        const props = {
            platform: 'ctrader',
        };
        render(<TradeModal {...mock_props} {...props} />);
        await waitFor(() => {
            expect(screen.getByText(/cTrader/i)).toBeInTheDocument();
        });
    });

    it('should show the the cTrader run on browser text', async () => {
        const props = {
            platform: 'ctrader',
        };
        render(<TradeModal {...mock_props} {...props} />);
        await waitFor(() => {
            expect(screen.getByText(/Run cTrader on your browser/i)).toBeInTheDocument();
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
                <TradeModal {...mock_props} {...props} />
            </Router>
        );

        expect(
            await screen.findByText(/to start trading, transfer funds from your Deriv account into this account./i)
        ).toBeInTheDocument();
    });

    it('should display Deriv EZ icon in Trade modal', async () => {
        const props = {
            platform: 'derivez',
        };
        render(
            <Router history={history}>
                <TradeModal {...mock_props} {...props} />
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
                <TradeModal {...mock_props} {...props} />
            </Router>
        );

        expect(await screen.findByText('IcBrandCtrader')).toBeInTheDocument();
    });

    it('should render ChangePasswordConfirmationModal if change password button is clicked', async () => {
        const props = {
            platform: 'dxtrader',
        };
        render(<TradeModal {...mock_props} {...props} />);
        fireEvent.click(screen.getByRole('button', { name: /change password/i }));
        expect(await screen.findByText(/Manage Deriv X password/));
    });

    it('should render ChangePasswordConfirmationModal if change password button is clicked', async () => {
        const props = {
            platform: 'dxtrader',
        };
        render(<TradeModal {...mock_props} {...props} />);
        fireEvent.click(screen.getByRole('button', { name: /copy/i }));
        expect(await screen.findByText(/copy/i));
    });
});
