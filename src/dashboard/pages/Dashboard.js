import React from 'react';

import RefundCard from '../components/RefundCard';
import AddPerson from '../components/AddPerson';

import './Dashboard.css';

const Dashboard = () => {
    return (
        <>
            <AddPerson />
            <RefundCard />
        </>
    );
};

export default Dashboard;