import React from 'react';
import { routes } from '@deriv/shared';
import { localize } from '@deriv/translations';
import { TRouteConfig } from '../../src/types/common-prop-types';
import CFD from '../Containers';
import { TCFDDashboardProps } from '../Containers/cfd-dashboard';

// Error Routes
const Page404 = React.lazy(() => import(/* webpackChunkName: "404" */ '../Modules/Page404'));

// Order matters
const initRoutesConfig = (): TRouteConfig[] => {
    return [
        {
            path: routes.dxtrade,
            // eslint-disable-next-line react/display-name
            component: (props: TCFDDashboardProps) => <CFD {...props} platform='dxtrade' />,
            getTitle: () => localize('Deriv X'),
            is_authenticated: false,
        },
        {
            path: routes.mt5,
            // eslint-disable-next-line react/display-name
            component: (props: TCFDDashboardProps) => <CFD {...props} platform='mt5' />,
            getTitle: () => localize('MT5'),
            is_authenticated: false,
        },
    ];
};

let routesConfig: TRouteConfig[];

// For default page route if page/path is not found, must be kept at the end of routes_config array
const route_default = { path: routes.error404, component: Page404, getTitle: () => localize('Error 404') };

const getRoutesConfig = () => {
    if (!routesConfig) {
        routesConfig = initRoutesConfig();
        routesConfig.push(route_default);
    }
    return routesConfig;
};

export default getRoutesConfig;
