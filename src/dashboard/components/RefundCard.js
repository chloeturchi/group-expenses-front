import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './RefundCard.css';

const RefundCard = () => {

    return (
        <Card className="card-refund">
            <p>NAME1 must pay X to NAME2</p>
            <p>NAME1 must pay X to NAME3</p>
        </Card>
    );
};

export default RefundCard;