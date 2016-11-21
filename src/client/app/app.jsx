import React, {Component} from 'react';

class App extends Component {
  render () {
    return <div className="row">
    <div className="col-xs-4"></div>
    <div className="col-xs-4 nopadding panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">Авторизация</h3>
            </div>
            <div className="panel-body">
              <form action="/" method="post" name="auth" autocomplete="off">
                <div className="user-login">
                 <label for="login">Логин:</label>
                 <br/>
                  <input type="text" name="login" id="login"/>
                </div>
                 <div className="user-password">
                  <label for="login">Пароль:</label>
                  <br/>
                  <input type="password" name="password" id="password"/>
                </div>
                  <button type="submit" className="btn btn-primary">
                      Войти
                  </button>
              </form>
            </div>
          </div>
    <div className="col-xs-4"></div>
</div>
  }
}

export default App;