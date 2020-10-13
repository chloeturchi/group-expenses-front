import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import deleteSign from '../../assets/images/delete.svg';
import AddExpense from './AddExpense';
import './PersonCard.css';

const Dashboard = (props) => {

    return (
        <Card className="card-person">
            <img 
                className="delete-sign"
                src={deleteSign} 
                alt="delete-sign"
                value={props.key}
                onClick={props.onDelete}
            />
            <p>{props.name}</p>
            <hr/>
            <p>Salaries: {props.pay}</p>
            <hr/>
            <AddExpense 
                onAddExpense={props.onAddExpense}
            />
        </Card>
    );
};

export default Dashboard;