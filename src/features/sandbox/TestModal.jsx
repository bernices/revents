import React from 'react';
import ModalWrapper from '../../app/common/modals/ModelWrapper';

export default function TestModal({data}) {
    return(
        <ModalWrapper size='mini' header='Test Modal'>
            <div>The data is: {data}</div>
        </ModalWrapper>
    )
}