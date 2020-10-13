import React, { useState } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';
import plusSign from '../../assets/images/plus-sign.svg';
import PersonCard from '../components/PersonCard';
    import {
        VALIDATOR_REQUIRE,
        VALIDATOR_NUMBER
    } from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';

import './AddPerson.css';

const AddPerson = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [formState, inputHandler] = useForm(
        {
          name: {
            value: '',
            isValid: false
          },
          pay: {
            value: '',
            isValid: false
          }
        },
        false
    );
    const [personCard, setPersonCard] = useState(false);
    const [persons, setPersons] = useState([]);

    const openAddPersonHandler = () => setShowAddModal(true);

    const closeAddPersonHandler = () => setShowAddModal(false);

    const deletePersonHandler = (e) => {
        let id = e.target.value;
        setPersons(persons.filter((e) => (e !== id)))
    };

    const addExpenseHandler = () => {
        console.log("CA MARCHE");
        // AFFICHER INPUT
    }

    const personSubmitHandler = async event => {
        event.preventDefault();
        setPersonCard(true);
        setPersons(persons => [
            ...persons, 
            <PersonCard 
                key={formState.inputs.name.value}
                name={formState.inputs.name.value} 
                pay={formState.inputs.pay.value}
                onDelete={deletePersonHandler}
                onAddExpense={addExpenseHandler}
                />
        ])
        closeAddPersonHandler();
    }

    return (
        <>
            <img 
                className="plus-sign"
                onClick={openAddPersonHandler}
                src={plusSign}
                alt="plus sign"
            />
            <p>Add a person</p>
            <Modal
                show={showAddModal}
                onCancel={closeAddPersonHandler}
                header={"Add a person"}
                contentClass="add-person__modal-content"
                footerClass="add-person__modal-actions"
                footer={<Button onClick={closeAddPersonHandler}>CLOSE</Button>}
            >
            <form className="add-person" onSubmit={personSubmitHandler}>
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid name."
                    onInput={inputHandler}
                />
                <Input
                    id="pay"
                    element="input"
                    label="Pay"
                    validators={[VALIDATOR_NUMBER()]}
                    errorText="Please enter a valid pay."
                    onInput={inputHandler}
                />
                <Button 
                    type="submit" 
                    disabled={!formState.isValid}
                >
                ADD A PERSON
                </Button>
            </form>
            </Modal>
            <div className="cards-person">
            {personCard && persons.map(person => 
                { return person })
            }
            </div>
        </>
    );
};

export default AddPerson;