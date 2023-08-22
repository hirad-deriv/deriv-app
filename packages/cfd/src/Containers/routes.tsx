import React from 'react';
import { withRouter } from 'react-router';
import BinaryRoutes from '../Components/Routes';
import ErrorComponent from '../Components/Errors/error-component';
import { observer, useStore } from '@deriv/stores';

type TPassThrough = {
    passthrough?: {
        WS: Record<string, any>;
    };
};

const Routes = observer(({ passthrough }: TPassThrough) => {
    alert(`passthrough: ${passthrough}`);
    const { client, common } = useStore();
    const { is_logged_in, is_logging_in } = client;
    const { error, has_error } = common;

    if (has_error) {
        return <ErrorComponent {...error} />;
    }

    return <BinaryRoutes is_logged_in={is_logged_in} is_logging_in={is_logging_in} passthrough={passthrough} />;
});

export default withRouter(Routes);
