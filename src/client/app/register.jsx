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
                  <input placeholder="Логин" id="login" type="text"/>
                </div>
                <div class="input-field col s6">
                  <input placeholder="Ваше имя" id="fullname" type="text"/>
                </div>
                <div class="input-field col s6">
                  <input placeholder="Пароль" id="password_1" type="text"/>
                </div>
                <div class="input-field col s6">
                  <input placeholder="Повторите пароль" id="password_2" type="text"/>
                </div>
              </div>
              <div className="card-action">
                <button className="btn waves-effect waves-light" type="submit" name="action" >
                  Зарегистрироваться
                </button>
              </div>
          </form>
          </div>
        </div>
      <div className="col m4"></div>
      </div>
  }
}
export default Register;