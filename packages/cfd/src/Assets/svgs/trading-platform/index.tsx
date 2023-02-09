import React from 'react';
import Derived from './ic-appstore-derived-rebranding.svg';
import Financial from './ic-appstore-financial-rebranding.svg';
import CFDs from './ic-appstore-cfds-rebranding.svg';

export interface IconProps<T> {
    icon: T;
    className?: string;
    size?: number;
    onClick?: () => void;
}

export const PlatformIcons = {
    Derived,
    Financial,
    CFDs,
};

const TradingPlatformIcon = ({ icon, className, size, onClick }: IconProps<keyof typeof PlatformIcons>) => {
    const PlatformIcon = PlatformIcons[icon] as React.ElementType;

    return PlatformIcon ? (
        <PlatformIcon className={className} style={{ width: size, height: size }} onClick={onClick} />
    ) : null;
};

export default TradingPlatformIcon;
