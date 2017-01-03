import React, {Component} from 'react';
import SweetAlert from 'sweetalert-react';

export default class DashBoard extends Component {

    constructor(props) {
        super(props);
        let items = [];
        for(let i = 0; i < localStorage.tasks_length; i++) {
            items.push(localStorage[`task_${i}`]);
        }
        this.state = {
            items: items,
            task: '',
            showError: false,
            errorTitle: "",
            errorMessage: undefined,
            errorType: "error",
            confirmText: undefined
        };
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onUnload = this.onUnload.bind(this);
        this.sync = this.sync.bind(this);
    };

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload)
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    onUnload(event) {
        console.log("sync");
        //event.returnValue = "random_value";
    }

    deleteTask(e) {
        let taskIndex = parseInt(e.target.value, 10);
        let currentTask = this.state.task;
        console.log(`Remove ${taskIndex} ${this.state.items[taskIndex]}`);
        this.setState(state => {
            this.state.items.splice(taskIndex, 1);
            return {items: state.items};
        });
        if(currentTask) {
            this.sync(localStorage.user,localStorage.token,'delete', currentTask);
        }
    };

    onChange(e) {
        this.setState({ task: e.target.value });
    };

    addTask(e){
        let currentTask = this.state.task;

        this.setState({
            items: this.state.items.concat([this.state.task]),
            task: ''
        });

        if(currentTask) {
            this.sync(localStorage.user,localStorage.token,'add', currentTask);
        }
        document.getElementById('task').value = "";
    };

    sync(user,token,type,data) {
        let request = new XMLHttpRequest();
        request.open('POST', '/data', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(`user=${user}&token=${token}&type=${type}&data=${data}`);

        // request.onreadystatechange = function () {
        //     if (request.readyState != 4) return;
        //     if (request.status != 200) {
        //         console.log('Print error');
        //         console.log(request.status + ': ' + request.statusText);
        //     } else {
        //         this.setState({isSuccess:true},() => {console.log('Auth complete!')});
        //         let responce = JSON.parse(request.responseText);
        //         console.log(responce);
        //         localStorage.setItem('user',responce.username);
        //         localStorage.setItem('tasks_length', responce.tasks.length);
        //         for (let i = 0; i < responce.tasks.length;i++) {
        //             localStorage.setItem(`task_${i}`,responce.tasks[i]);
        //         }
        //         localStorage.setItem('token',(localStorage.user.length+1));
        //         //window.location.reload();
        //     }
        // }.bind(this);
    }

    render(){
        return(
            <div className="container">
                <div className="collection with-header col s6 offset-s4">
                    <div className="collection-header center"><h4>Hello, {localStorage.user}</h4></div>
                    <a className="collection-item addTaskItem center">
                            Add task:
                        <span className="input-field inline">
                            <input id="task" onChange={this.onChange}/>
                        </span>
                        <span className="btn addTask" onClick={this.addTask}>+</span>
                    </a>
                    {this.state.items.map((task, taskIndex) =>
                        <a key={taskIndex} className="collection-item">
                            {task}
                            <button className="delete-btn btn-flat" onClick={this.deleteTask}
                                    value={taskIndex}> Delete </button>
                        </a>
                    )}
                </div>
                <SweetAlert
                    show={this.state.showError}
                    title={this.state.errorTitle}
                    text={this.state.errorMessage}
                    type={this.state.errorType}
                    confirmButtonText={this.state.confirmText}
                    onConfirm={() => this.setState({showError: false})}
                />
            </div>
        );
    }
};