import React from 'react';
import { render, screen } from '@testing-library/react';
import { CFDAccountCopy } from '../cfd-account-copy';

const props = {
    className: 'cfd-account-copy',
    text: 'text',
} as const;

describe('<CFDAccountCopy />', () => {
    it('component should be rendered', () => {
        render(<CFDAccountCopy {...props} />);
        const mainDiv = screen.getByTestId('cfd_account_copy_main_div');

        expect(mainDiv).toBeInTheDocument();
    });
});
