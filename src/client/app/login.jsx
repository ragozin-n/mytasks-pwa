import React, {Component} from 'react';
import { Link } from 'react-router';
import SweetAlert from 'sweetalert-react';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            errorTitle: "",
            errorMessage: undefined,
            errorType: "error",
            confirmText: undefined
        };
        this.verifyForm = this.verifyForm.bind(this);
    }

    verifyForm() {
        if(!this._login.value.toString() || !this._password.value.toString()){
            this.state.errorTitle = "Хей!";
            this.state.errorMessage = "Забыл заполнить поля!";
            this.state.errorType = "warning";
            this.state.confirmText = "Упс! Сейчас заполню!";
            this.setState({showError: true});
        } else {
            let request = new XMLHttpRequest();
            request.open('POST', '/', true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.send(`login=${this._login.value.toString()}&password=${this._password.value.toString()}`);
            this._login.value = this._password.value = '';
            //Get user info and render the main window
        }
    }

    render() {
        return <div className="row panel-info">
            <div className="col m4"></div>
            <div className="col m4">
                <div className="card blue-grey darken-1">
                    <form action="/" method="POST" name="auth">
                        <div className="card-content white-text">
                            <span className="card-title">Авторизация:</span>
                            <div className="input-field">
                                <input ref={el => this._login = el} placeholder="Логин" name="login" type="text"/>
                            </div>
                            <div className="input-field">
                                <input ref={el => this._password = el} placeholder="Пароль" name="password" type="text"/>
                            </div>
                        </div>
                        <div className="card-action">
                            <a className="btn enter waves-effect waves-light" onClick={this.verifyForm}>
                                Войти
                            </a>
                            <Link className="btn-flat reg waves-effect waves-light" to="/register">Регистрация</Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col m4"></div>
            <SweetAlert
                show={this.state.showError}
                title={this.state.errorTitle}
                text={this.state.errorMessage}
                type={this.state.errorType}
                confirmButtonText={this.state.confirmText}
                onConfirm={() => this.setState({showError: false})}
            />
        </div>
    }
}