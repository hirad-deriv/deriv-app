import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CFDDownloadContainer from '../cfd-download-container';

jest.mock('@deriv/components', () => {
    const original_module = jest.requireActual('@deriv/components');
    return {
        ...original_module,
        Icon: jest.fn(props => <div>{props.icon}</div>),
    };
});

jest.mock('react-qrcode', () => {
    const original_module = jest.requireActual('react-qrcode');
    return {
        ...original_module,
        QRCode: jest.fn(props => <div>{props.value}</div>),
    };
});

describe('CFDDownloadContainer', () => {
    const mock_props = {
        platform: 'mt5' as const,
        active_index: 0,
        is_dark_mode_on: false,
        dxtrade_tokens: {
            demo: '',
            real: '',
        },
        derivez_tokens: {
            demo: '',
            real: '',
        },
    };

    it('should render <CFDDownloadContainer /> correctly', () => {
        render(<CFDDownloadContainer {...mock_props} />);
        expect(screen.getByTestId(/dt_cfd_dashboard_download_center_container/i)).toBeInTheDocument();
        // await waitFor(() => {
        // });
    });
    it('should render correct text according to the MT5 platform', () => {
        render(<CFDDownloadContainer {...mock_props} />);
        expect(
            screen.getByText(/run MT5 from your browser or download the MT5 app for your devices/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/the mt5 desktop app is not supported by windows XP, windows 2003, and windows vista/i)
        ).toBeInTheDocument();
    });
    it('should show the proper icons for the MT5 platform ', () => {
        render(<CFDDownloadContainer {...mock_props} />);
        expect(screen.getByText(/IcMt5DeviceDesktop/i)).toBeInTheDocument();
        expect(screen.getByText(/IcMt5DeviceLaptop/i)).toBeInTheDocument();
        expect(screen.getByText(/IcInstallationWindows/i)).toBeInTheDocument();
        expect(screen.getByText(/IcInstallationMacos/i)).toBeInTheDocument();
        expect(screen.getByText(/IcInstallationLinux/i)).toBeInTheDocument();
        expect(screen.getByText(/IcMt5DeviceTablet/i)).toBeInTheDocument();
        expect(screen.getByText(/IcMt5DevicePhone/i)).toBeInTheDocument();
        expect(screen.getByText(/IcInstallationGoogle/i)).toBeInTheDocument();
        expect(screen.queryByText(/IcInstallationApple/i)).toBeInTheDocument();
        expect(screen.getByText(/IcInstallationHuawei/i)).toBeInTheDocument();
    });

    it('should download/redirect the correct file for MT5 platform', () => {
        render(<CFDDownloadContainer {...mock_props} />);
        expect(screen.getByRole('link', { name: /IcInstallationWindows/i })).toHaveAttribute(
            'href',
            'https://download.mql5.com/cdn/web/deriv.limited/mt5/derivmt5setup.exe'
        );
        expect(screen.getByRole('link', { name: /IcInstallationMacos/i })).toHaveAttribute(
            'href',
            'https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.dmg'
        );
        expect(screen.getByRole('link', { name: /IcInstallationLinux/i })).toHaveAttribute(
            'href',
            'https://www.metatrader5.com/en/terminal/help/start_advanced/install_linux'
        );
        expect(screen.getByRole('link', { name: /IcInstallationGoogle/i })).toHaveAttribute(
            'href',
            'https://download.mql5.com/cdn/mobile/mt5/android?server=Deriv-Demo,Deriv-Server'
        );
        expect(screen.getByRole('link', { name: /IcInstallationHuawei/i })).toHaveAttribute(
            'href',
            'https://appgallery.huawei.com/#/app/C102015329'
        );
    });

    it('should render the correct icons and text for the Deriv X platform', async () => {
        render(<CFDDownloadContainer {...mock_props} platform='dxtrade' />);
        await waitFor(() => {
            expect(screen.getByText(/IcRebrandingDxtrade/i)).toBeInTheDocument();
            expect(screen.getByText(/IcInstallationGoogle/i)).toBeInTheDocument();
            expect(screen.getByText(/IcInstallationApple/i)).toBeInTheDocument();
            expect(screen.getByText(/web terminal/i)).toBeInTheDocument();
        });
    });

    it('should download/redirect the correct file for DerivX', () => {
        render(<CFDDownloadContainer {...mock_props} platform='dxtrade' active_index={0} />);
        expect(screen.getByRole('link', { name: /IcRebrandingDxtrade/i })).toHaveAttribute(
            'href',
            'https://dx.deriv.com'
        );
        expect(screen.getByRole('link', { name: /IcInstallationGoogle/i })).toHaveAttribute(
            'href',
            'https://play.google.com/store/apps/details?id=com.deriv.dx'
        );
        expect(screen.getByRole('link', { name: /IcInstallationApple/i })).toHaveAttribute(
            'href',
            'https://apps.apple.com/us/app/deriv-x/id1563337503'
        );
    });
    it('should render demo account dashboard and the demo link for derivx web terminal if active_index is 1 ', () => {
        render(<CFDDownloadContainer {...mock_props} active_index={1} platform='dxtrade' />);
        expect(screen.getByRole('link', { name: /IcRebrandingDxtrade/i })).toHaveAttribute(
            'href',
            'https://dx-demo.deriv.com'
        );
    });
});
