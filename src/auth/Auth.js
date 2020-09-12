import React, { useState, useContext } from 'react';

import './Auth.css'
import Card from '../shared/components/UIElements/Card';
import Input from '../shared/components/FormElements/Input';
import Button from '../shared/components/FormElements/Button';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
} from '../shared/utils/validators';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [backError, setBackError] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm(
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

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = async event => {
        event.preventDefault();
        setBackError();
        let responseData;
        if (isLoginMode) {
            try {
                responseData = await sendRequest({
                    query: `
                            mutation SIGNUP($email: String!, $password: String!) {
                                signup(
                                  email: $email
                                  password: $password
                                ) {
                                  email
                                }
                              }
                        `,
                    variables: {
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }
                })
                auth.login(responseData.userId, responseData.token);
            } catch (err) { }
        } else {
            try {
                responseData = await sendRequest({
                    query: `
                            mutation SIGNUP($email: String!, $password: String!) {
                                signup(
                                  email: $email
                                  password: $password
                                ) {
                                  email
                                }
                              }
                        `,
                    variables: {
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }
                })
                auth.login(responseData.userId, responseData.token);
            } catch (err) { }
        }
        if (responseData.errors) {
            setBackError(responseData.errors[0].message)
        }
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                {isLoginMode ? <h2>Login</h2> : <h2>Signup</h2>}
                <hr />
                {backError &&
                    <p className="auth-backerror">Error: {backError}</p>}
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
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                </Button>
            </Card>
        </>
    );
}

export default Auth;