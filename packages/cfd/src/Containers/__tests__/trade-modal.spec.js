import React from 'react';
import { WS, validPassword } from '@deriv/shared';
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

    it('server maintenance text should be visible in the modal', async () => {});
});
