import React, {Component} from 'react';
import SweetAlert from 'sweetalert-react';

// export default class DashBoard extends Component {
//
//     DeleteTask(item) {
//         console.log(item.target);
//         console.log('deleting task');
//     }
//
//     render() {
//         let tasks = [];
//         for (let i = 0; i < localStorage.tasks_length; i++) {
//             tasks.push(<a href="#" className='collection-item' key={i}><span onClick={this.DeleteTask} className="badge new red" data-badge-caption="Delete"></span>{localStorage['task_'+i]}</a>);
//         }
//         return (
//             <div className="container">
//                 <div className="collection with-header col s6 offset-s4">
//                     <div className="collection-header"><h4>Hello, {localStorage.user}</h4></div>
//                     {tasks}
//                 </div>
//             </div>
//         );
//     }
// }

class TaskList extends Component {
    render() {
        return (
            <div className="collection with-header col s6 offset-s4">
                <div className="collection-header center"><h4>Hello, {localStorage.user}</h4></div>
                <div className="collection-item">
                    <div className="input-field inline">
                        <input onChange={this.onChange} type="text" value={this.state.task}/>
                        <a className="btn addTask" onClick={this.addTask}>+</a>
                    </div>
                </div>
                    {this.props.items.map((task, taskIndex) =>
                        <a key={taskIndex} className="collection-item">
                            {task}
                            <button className="delete-btn btn-flat" onClick={this.props.deleteTask}
                                  value={taskIndex}> Delete </button>
                        </a>
                    )}
            </div>);
    }
}

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
    };

    componentDidMount() {
        window.addEventListener("beforeunload", this.onUnload)
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    onUnload(event) {
        console.log("");
        event.returnValue = "random_value";
    }

    deleteTask(e) {
        let taskIndex = parseInt(e.target.value, 10);
        console.log(`Remove ${taskIndex} ${this.state.items[taskIndex]}`);
        this.setState(state => {
            this.state.items.splice(taskIndex, 1);
            return {items: state.items};
        });
    };

    onChange(e) {
        this.setState({ task: e.target.value });
    };

    addTask(e){
        this.setState({
            items: this.state.items.concat([this.state.task]),
            task: ''
        });

        document.getElementById('task').value = "";
    };

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