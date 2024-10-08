import React, { ComponentProps, FC } from 'react';
import { Localize } from '@deriv-com/translations';
import { ModalStepWrapper, ModalWrapper, WalletButton } from '../../../../components';
import useDevice from '../../../../hooks/useDevice';
import { PlatformDetails } from '../../constants';
import { CreatePassword } from '../../screens';

const CreatePasswordModal: FC<ComponentProps<typeof CreatePassword>> = ({
    isLoading,
    onPasswordChange,
    onPrimaryClick,
    password,
    platform,
}) => {
    const { isMobile } = useDevice();
    if (isMobile) {
        return (
            <ModalStepWrapper
                renderFooter={() => {
                    return (
                        <WalletButton
                            disabled={!password || isLoading}
                            isFullWidth
                            isLoading={isLoading}
                            onClick={onPrimaryClick}
                            size={isMobile ? 'lg' : 'md'}
                        >
                            <Localize
                                i18n_default_text='Create {{platformTitle}} password'
                                values={{ platformTitle: PlatformDetails[platform].title }}
                            />
                        </WalletButton>
                    );
                }}
                title={''}
            >
                <CreatePassword
                    isLoading={isLoading}
                    onPasswordChange={onPasswordChange}
                    onPrimaryClick={onPrimaryClick}
                    password={password}
                    platform={platform}
                />
            </ModalStepWrapper>
        );
    }

    return (
        <ModalWrapper>
            <CreatePassword
                isLoading={isLoading}
                onPasswordChange={onPasswordChange}
                onPrimaryClick={onPrimaryClick}
                password={password}
                platform={platform}
            />
        </ModalWrapper>
    );
};

export default CreatePasswordModal;
