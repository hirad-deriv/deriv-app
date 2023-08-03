import { Redirect } from 'react-router-dom';

export type TRoute = {
    exact?: boolean;
    path: string;
    default?: boolean;
    to?: string;
    component?: ((props?: any) => JSX.Element) | typeof Redirect | React.LazyExoticComponent<() => JSX.Element>;
    getTitle?: () => string;
    subroutes?: TRoute[];
};

export type TRouteConfig = TRoute & {
    is_authenticated?: boolean;
    routes?: TRoute[];
};

export type TBinaryRoutes = {
    is_logged_in: boolean;
    is_logging_in: boolean;
};
