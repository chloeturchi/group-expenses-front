import React from 'react';

import './Auth.css'
import Card from '../shared/components/UIElements/Card';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';
// import ErrorModal from '../shared/components/UIElements/ErrorModal';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
} from '../shared/utils/validators';
import { useForm } from '../shared/hooks/form-hook';

const Auth = () => {
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const authSubmitHandler = event => {
        event.preventDefault();
        const test = {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
        }
        console.log(test);
    }

    return (
        <>
            {/* <ErrorModal error={error} onClear={clearError} /> */}
            <Card className="authentication">
                <h2>Signup required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="E-Mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address."
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a valid password, at least 6 characters."
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        SIGNUP
                    </Button>
                </form>
            </Card>
        </>
    );
}

export default Auth;