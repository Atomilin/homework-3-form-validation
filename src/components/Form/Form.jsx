import React, { Component } from 'react';
import Image from './assets/bond_approve.jpg';
import './Form.css';

const data = {
    firstName: 'james',
    lastName: 'bond',
    password: '007',
    errors: {
        firstNameError: 'Имя указано не верно',
        lastNameError: 'Фамилия указана не верно',
        passwordError: 'Пароль указан не верно',
        firstNameEmpty: 'Нужно указать имя',
        lastNameEmpty: 'Нужно указать фамилию',
        passwordEmpty: 'Нужно указать пароль'
    }
};

class Form extends Component {
    state = { 
        firstName: '',
        lastName: '',
        password: '',
        firstNameErr: '', 
        lastNameErr: '', 
        passwordErr: '',
        isValid : false };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState(prevState => ({ firstNameErr: !prevState.firstName ? 
            
            data.errors.firstNameEmpty
            :
            (prevState.firstName.toLowerCase() !== data.firstName ? data.errors.firstNameError : ''), 
            
            lastNameErr: !prevState.lastName ?

            data.errors.lastNameEmpty
            :
            (prevState.lastName.toLowerCase() !== data.lastName ? data.errors.lastNameError : ''),

            passwordErr: !prevState.password ?
                data.errors.passwordEmpty
                :
                (prevState.password.toLowerCase() !== data.password ? data.errors.passwordError : ''),

            isValid: (prevState.firstName.toLowerCase() === data.firstName &&
            prevState.lastName.toLowerCase() === data.lastName &&
            prevState.password.toLowerCase() === data.password)
            }));
    }; 

    firstNameChanged = (event) => {
        this.setState({ firstName: event.target.value });    
        this.emptyErrors();     
    };

    lastNameChanged = (event) => {
        this.setState({ lastName: event.target.value });
        this.emptyErrors();    
    };

    passwordChanged = (event) => {
        this.setState({ password: event.target.value });
        this.emptyErrors();    
    };

    emptyErrors = () => {
        this.setState({ firstNameErr: '', lastNameErr: '', passwordErr: '' });
    }

    render() {
        const { firstName, lastName, password, firstNameErr, lastNameErr, passwordErr, isValid } = this.state;

        return (                        
            isValid ?
                <div className="app-container"><img className="t-bond-image" alt="Bond" src={Image} /></div>
                :
                <div className="app-container">
                    <form className="form" onSubmit={this.handleSubmit} >
                        <h1>Введите данные</h1>
                        <p className="field">
                            <label className="field__label" htmlFor="firstname">
                                <span className="field-label">Имя</span>
                            </label>
                            <input className="field__input field-input t-input-firstname" type="text" name="firstname" value={firstName} onChange={this.firstNameChanged} />
                            <span className="field__error field-error t-error-firstname">{firstNameErr}</span>
                        </p>
                        <p className="field">
                            <label className="field__label" htmlFor="lastname">
                                <span className="field-label">Фамилия</span>
                            </label>
                            <input className="field__input field-input t-input-lastname" type="text" name="lastname" value={lastName} onChange={this.lastNameChanged} />
                            <span className="field__error field-error t-error-lastname">{lastNameErr}</span>
                        </p>
                        <p className="field">
                            <label className="field__label" htmlFor="password">
                                <span className="field-label">Пароль</span>
                            </label>
                            <input className="field__input field-input t-input-password" type="password" name="password" value={password} onChange={this.passwordChanged} />
                            <span className="field__error field-error t-error-password">{passwordErr}</span>
                        </p>
                        <div className="form__buttons">
                            <input type="submit" className="button t-submit" value="Проверить"/>
                        </div>
                    </form>                
                </div>
        );
    }
}

export default Form;