import React, { Component } from 'react'
import './Todolist.css'
import Axios from 'axios'
export default class Todolist extends Component {

    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    }
    getTaskList = () => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })
        promise.then((result) => {

            this.setState({
                taskList: result.data
            })
        });
        promise.catch((result) => {
            console.log('fail', result.response.data)
        }

        );
    }
    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type="button" className="remove" onClick={() => {
                        this.delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" onClick={() => {
                        this.checkTask(item.taskName)
                    }} className="complete">
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    renderTaskToDoDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type="button" className="remove" onClick={() => {
                        this.delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" className="complete" onClick={() => {
                        this.rejectTask(item.taskName)
                    }}>
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    //Hàm sẽ tự động thực thi sau khi nội dung component được thực thi
    componentDidMount() {
        this.getTaskList();
    }
    delTask = (param) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${param}`,
            method: 'DELETE'
        })
        promise.then(result => {
            console.log(result.data)
            this.getTaskList()
        })
        promise.catch(errors => {
            console.log(errors.response.data)
        })
    }
    rejectTask = (param) => {
        
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${param}`,
            method: 'PUT'
        })
        promise.then(result => {
            console.log(result.data)
            this.getTaskList()
        })
        promise.catch(errors => {
            console.log(errors.response.data)
        })
    }
    handleChange = (e) => {
        let { value, name } = e.target;
        let newValues = { ...this.state.values };
        newValues = { ...newValues, [name]: value };
        let newErrors = { ...this.state.errors };
        let regex = /^[a-z A-Z]+$/
        if (!regex.test(value) || value.trim() === "") {
            newErrors[name] = name + 'invalid'
        } else {
            newErrors[name] = ''
        }
        // newErrors = { ...newErrors, [name]: value.trim() === "" }

        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors,
        })
    }
    checkTask = (param) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${param}`,
            method: "PUT"
        });
        promise.then(result => {
            console.log('success', result.data)
            this.getTaskList()
        });
        promise.catch(errors => {
            console.log('errors ', errors.response.data)
        })
    }
    addTask = (e) => {
        e.preventDefault();
        console.log('addTask', this.state.values.taskName);
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: {
                taskName: this.state.values.taskName,
            }
        })
        promise.then(result => {
            console.log(result.data)
            this.getTaskList()
        })
        promise.catch(errors => {
            console.log(errors.response)
        })
    }
    render() {
        return (


            <div>
                {/* <button onClick={() => {
                    this.getTaskList()
                }}>Get Task list</button> */}
                <form onSubmit={this.addTask}>
                    <div className="card">
                        <div className="card__header">
                            <img src={require('./bg.png')} />
                        </div>
                        {/* <h2>hello!</h2> */}
                        <div className="card__body">
                            <div className="card__content">
                                <div className="card__title">
                                    <h2>My Tasks</h2>
                                    <p>September 9,2020</p>
                                </div>
                                <div className="card__add">
                                    <input id="newTask" name="taskName" onChange={this.handleChange} type="text" placeholder="Enter an activity..." />
                                    <button type="button" id="addItem" onClick={this.addTask}>
                                        <i className="fa fa-plus" />
                                    </button>
                                </div>
                                <p className="text text-danger">{this.state.errors.taskName}</p>
                                <div className="card__todo">
                                    {/* Uncompleted tasks */}
                                    <ul className="todo" id="completed">
                                        {this.renderTaskToDo()}
                                    </ul>
                                    {/* Completed tasks */}
                                    <ul className="todo" id="completed">
                                        {this.renderTaskToDoDone()}
                                        {/* <li>
                                        <span>Ăn sáng</span>
                                        <div className="buttons">
                                            <button className="remove">
                                                <i className="fa fa-trash-alt" />
                                            </button>
                                            <button className="complete">
                                                <i className="far fa-check-circle" />
                                                <i className="fas fa-check-circle" />
                                            </button>
                                        </div>
                                    </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
