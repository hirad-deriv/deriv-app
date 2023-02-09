import React from 'react';
import BinaryBot from 'Assets/svgs/trading-platform/ic-brand-binarybot.svg';
import BinaryBotBlue from 'Assets/svgs/trading-platform/ic-appstore-binarybot-blue.svg';
import DBot from 'Assets/svgs/trading-platform/ic-brand-dbot.svg';
import Demo from 'Assets/svgs/trading-platform/ic-brand-demo.svg';
import Derived from 'Assets/svgs/trading-platform/ic-appstore-derived.svg';
import DerivGo from 'Assets/svgs/trading-platform/ic-brand-derivgo.svg';
import DerivGoBlack from 'Assets/svgs/trading-platform/ic-appstore-derivgo-black.svg';
import DerivLogo from 'Assets/svgs/trading-platform/ic-appstore-deriv-logo.svg';
import DerivTradingLogo from 'Assets/svgs/trading-platform/ic-appstore-deriv-trading-logo.svg';
import DerivX from 'Assets/svgs/trading-platform/ic-appstore-derivx.svg';
import DropDown from 'Assets/svgs/trading-platform/drop-down.svg';
import DTrader from 'Assets/svgs/trading-platform/ic-brand-dtrader.svg';
import Financial from 'Assets/svgs/trading-platform/ic-appstore-financial.svg';
import Options from 'Assets/svgs/trading-platform/ic-appstore-options.svg';
import SmartTrader from 'Assets/svgs/trading-platform/ic-brand-smarttrader.svg';
import SmartTraderBlue from 'Assets/svgs/trading-platform/ic-appstore-smarttrader-blue.svg';
import CFDs from 'Assets/svgs/trading-platform/ic-appstore-cfds.svg';
import BinaryBotRebranding from 'Assets/svgs/trading-platform/ic-rebranding-binarybot.svg';
import DBotRebranding from 'Assets/svgs/trading-platform/ic-rebranding-dbot.svg';
import DerivGoRebranding from 'Assets/svgs/trading-platform/ic-rebranding-derivgo.svg';
import DerivXRebranding from 'Assets/svgs/trading-platform/ic-rebranding-derivx.svg';
import DTraderRebranding from 'Assets/svgs/trading-platform/ic-rebranding-dtrader.svg';
import MT5DerivedRebranding from 'Assets/svgs/trading-platform/ic-rebranding-mt5-derived.svg';
import MT5FinancialRebranding from 'Assets/svgs/trading-platform/ic-rebranding-mt5-financial.svg';
import MT5DerivedRebrandingModal from 'Assets/svgs/trading-platform/ic-rebranding-mt5-derived-modal.svg';
import MT5FinancialRebrandingModal from 'Assets/svgs/trading-platform/ic-rebranding-mt5-financial-modal.svg';
import SmartTraderRebranding from 'Assets/svgs/trading-platform/ic-rebranding-smart-trader.svg';
import { IconProps } from '../icon-types';

export const PlatformIcons = {
    BinaryBot,
    BinaryBotBlue,
    DBot,
    Demo,
    Derived,
    DerivGo,
    DerivGoBlack,
    DerivLogo,
    DerivTradingLogo,
    DerivX,
    DropDown,
    DTrader,
    Financial,
    Options,
    SmartTrader,
    SmartTraderBlue,
    CFDs,
    BinaryBotRebranding,
    DBotRebranding,
    DerivGoRebranding,
    DerivXRebranding,
    DTraderRebranding,
    MT5DerivedRebranding,
    MT5FinancialRebranding,
    MT5DerivedRebrandingModal,
    MT5FinancialRebrandingModal,
    SmartTraderRebranding,
};

const TradingPlatformIcon = ({ icon, className, size, onClick }: IconProps<keyof typeof PlatformIcons>) => {
    const PlatformIcon = PlatformIcons[icon] as React.ElementType;

    return PlatformIcon ? (
        <PlatformIcon className={className} style={{ width: size, height: size }} onClick={onClick} />
    ) : null;
};

export default TradingPlatformIcon;
