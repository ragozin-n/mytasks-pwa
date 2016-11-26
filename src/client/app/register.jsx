import React, {Component} from 'react';

class Register extends Component {
  render () {
  	return <div className="row panel-info">
        <div className="col m4"></div>
        <div className="col m4">
          <div className="card blue-grey darken-1">
          <form action="/" method="POST" name="reg">
            <div className="card-content white-text">
              <span className="card-title">Регистрация:</span>
                <div class="input-field col s6">
                  <input placeholder="Логин" name="login" type="text"/>
                </div>
                <div class="input-field col s6">
                  <input placeholder="Ваше имя" name="fullname" type="text"/>
                </div>
                <div class="input-field col s6">
                  <input placeholder="Пароль" name="password_1" type="text"/>
                </div>
                <div class="input-field col s6">
                  <input placeholder="Повторите пароль" name="password_2" type="text"/>
                </div>
              </div>
              <div className="card-action">
                <a className="btn reg-user waves-effect waves-light" >
                  Зарегистрироваться
                </a>
              </div>
          </form>
          </div>
        </div>
      <div className="col m4"></div>
      </div>
  }
}
export default Register;