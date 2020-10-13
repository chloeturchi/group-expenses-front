import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_NUMBER
} from '../../shared/utils/validators';
import plusSign from '../../assets/images/plus-sign.svg'
import './AddExpense.css'

const AddExpense = (props) => {
    return (
        <div className="add-expenses-block">
            <p>Add expense</p>
            <img 
                className="plus-sign-expenses"
                src={plusSign} 
                alt="plus-sign"
                onClick={props.onAddExpense}/>
            <Input
                id="expense-name"
                element="input"
                label="Expense name"
                validators={[VALIDATOR_NUMBER()]}
                errorText="Please enter a valid expense's name"
                // onInput={inputHandler}
            />
            <Input
                id="expense-amount"
                element="input"
                label="Amount"
                validators={[VALIDATOR_NUMBER()]}
                errorText="Please enter a valid amount"
                // onInput={inputHandler}
            />
        </div>
    )
}


export default AddExpense;