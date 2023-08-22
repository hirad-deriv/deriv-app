import React from 'react';
import CFDDashboard from './Containers/cfd-dashboard';
import initStore from './init-store';
import CFDProviders from './cfd-providers';
import type { TCoreStores } from '@deriv/stores/types';

type TAppProps = {
    passthrough: {
        root_store: TCoreStores;
        WS: unknown;
    };
};

const App = ({ passthrough }: TAppProps) => {
    initStore(passthrough.root_store, passthrough.WS);

    return (
        <CFDProviders store={passthrough.root_store}>
            <CFDDashboard platform={'mt5'} />
        </CFDProviders>
    );
};

export default App;
