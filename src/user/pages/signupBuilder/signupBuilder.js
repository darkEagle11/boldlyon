import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './stylesheets/signupBuilder.css';
import Modal from '../../../UI/Modal/Modal';
import * as userActions from '../../store/actions';
import Input from '../../../UI/Input/Input';
import Spinner from '../../../UI/Spinner/Spinner'
import { createInputConfig, checkValidity } from '../../../shared/redux/utility';

class SignupBuilder extends Component {
    state = {
        signupForm: {
            email: createInputConfig({
                placeholder: 'Email',
                rules: {
                    required: true,
                    isEmail: true,
                }
            }),
            password: createInputConfig({
                placeholder: 'Password',
                type: "password",
                rules: {
                    required: true,
                    strongPassword: true,
                }
            }),
            confirmPassword: createInputConfig({
                placeholder: 'Confirm Password',
                type: "password",
                rules: {
                    required: true,
                    match: 'password',
                }
            })
        },
        formIsValid: false,
    }

    componentWillUnmount() {
        this.props.history.push('/todos');
    }

    runInputChangedHandler = (inputIdentifier) => {
        return this.inputChangedHandler(this.state.signupForm[inputIdentifier].value, inputIdentifier)
    }
    submitFormHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            true,
            this.state.signupForm.email.value,
            this.state.signupForm.password.value,
            this.state.signupForm.confirmPassword.value,
        )
    }
    async inputChangedHandler(value, inputIdentifier) {
        const checkValueValidity = checkValidity(value,
            this.state.signupForm[inputIdentifier].validation,
            this.state.signupForm,
        )

        await this.setState({
            signupForm: {
                ...this.state.signupForm,
                [inputIdentifier]: {
                    ...this.state.signupForm[inputIdentifier],
                    value: value,
                    touched: true,
                    errorMsg: checkValueValidity.validErrorMsgs[0],
                    valid: checkValueValidity.isValid,
                }
            }
        })
        let formIsValid = true;
        for (let identifier in this.state.signupForm) {
            formIsValid = this.state.signupForm[identifier].valid && formIsValid;
        }
        this.setState({ formIsValid: formIsValid })
        if (inputIdentifier === 'password' && this.state.signupForm.confirmPassword.touched) {
            this.runInputChangedHandler('confirmPassword')
        }
    }
    render() {
        const signupForm = { ...this.state.signupForm };
        const formElementsArray = [];

        for (let key in signupForm) {
            formElementsArray.push({
                id: key,
                config: signupForm[key],
            })
        }
        let form = (
            <form onSubmit={this.submitFormHandler}>
                {formElementsArray.map(formElement => {
                    return <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event.target.value, formElement.id)}
                        errorMsg={formElement.config.errorMsg} />
                })}
                <button className={classes.SignupButton} disabled={!this.state.formIsValid}>Submit</button>
                <p className={classes.SwitchAuth} onClick={() => this.props.onShowAuthModal('login')}>Switch to login</p>
            </form>
        )

        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <Modal
                show
                title="signup"
                click={this.props.onCloseAuthModal}
                onlyModalClick
                modalStyles={classes.Modal}>
                {this.props.error && this.props.error.message ?
                    <p className={classes.ErrorMsg}>{this.props.error.message}</p> : null}
                {form}
            </Modal>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCloseAuthModal: () => dispatch(userActions.closeAuthModal()),
        onShowAuthModal: (authType) => dispatch(userActions.showAuthModal(authType)),
        onAuth: (isSignup, email, password, confirmPassword) => dispatch(userActions.auth(isSignup, email, password, confirmPassword))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignupBuilder));