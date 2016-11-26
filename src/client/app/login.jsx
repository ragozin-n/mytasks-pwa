import React, {Component} from 'react';

class Login extends Component {
  render () {
    return <div className="row panel-info">
        <div className="col m4"></div>
        <div className="col m4">
          <div className="card blue-grey darken-1">
          <form action="/" method="POST" name="auth">
            <div className="card-content white-text">
              <span className="card-title">Авторизация:</span>
                <div className="input-field">
                  <input placeholder="Логин" name="login" type="text"/>
                </div>
                <div className="input-field">
                  <input placeholder="Пароль" name="password" type="text"/>
                </div>
              </div>
              <div className="card-action">
                <a className="btn enter waves-effect waves-light">
                  Войти
                </a>
                <a className="btn-flat reg waves-effect waves-light" href="/register" >
                    Регистрация
                </a>
              </div>
          </form>
          </div>
        </div>
      <div className="col m4"></div>
      </div>
  }
}
export default Login;