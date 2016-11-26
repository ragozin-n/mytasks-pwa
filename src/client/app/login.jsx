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
                <div class="input-field col s6">
                  <input placeholder="Логин" id="login" type="text"/>
                </div>
                <div class="input-field col s6">
                  <input placeholder="Пароль" id="password" type="text"/>
                </div>
              </div>
              <div className="card-action">
                <button className="btn waves-effect waves-light" type="submit" name="action" >
                  Войти
                </button>
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