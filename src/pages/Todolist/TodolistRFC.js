import Axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function TodolistRFC(props) {
    let [state, setState] = useState({
        taskList: [],
        values: { taskName: '' },
        errors: {
            taskName: ''
        }
    })
    const handleChange = (e) => {
        let { value, name } = e.target;
        console.log(value, name)
        let newValues = { ...state.values };
        newValues = { ...newValues, [name]: value };
        let newErrors = { ...state.errors };
        let regex = /^[a-z A-Z]+$/
        if (!regex.test(value) || value.trim() === "") {
            newErrors[name] = name + 'invalid'
        } else {
            newErrors[name] = ''
        }
        // newErrors = { ...newErrors, [name]: value.trim() === "" }

        setState({
            ...state,
            values: newValues,
            errors: newErrors,
        })
    }

    const addTask = (e) => {
        e.preventDefault();
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: {
                taskName: state.values.taskName,
            }
        })
        promise.then(result => {
            console.log(result.data)
            getTaskList()
        })
        promise.catch(errors => {
            console.log(errors.response)
        })
    }
    const delTask = (param) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${param}`,
            method: 'DELETE'
        })
        promise.then(result => {
            console.log(result.data)
            getTaskList()
        })
        promise.catch(errors => {
            console.log(errors.response.data)
        })
    }
    const rejectTask = (param) => {

        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${param}`,
            method: 'PUT'
        })
        promise.then(result => {
            console.log(result.data)
            getTaskList()
        })
        promise.catch(errors => {
            console.log(errors.response.data)
        })
    }
    const checkTask = (param) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${param}`,
            method: "PUT"
        });
        promise.then(result => {
            console.log('success', result.data)
            getTaskList()
        });
        promise.catch(errors => {
            console.log('errors ', errors.response.data)
        })
    }
    const renderTaskToDo = () => {
        return state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type="button" className="remove" onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" onClick={() => {
                        checkTask(item.taskName)
                    }} className="complete">
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    const renderTaskToDoDone = () => {
        return state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button type="button" className="remove" onClick={() => {
                          delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button type="button" className="complete" onClick={() => {
                           rejectTask(item.taskName)
                    }}>
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    const getTaskList = () => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })
        promise.then((result) => {

            setState({
                ...state,
                taskList: result.data
            })
        });
        promise.catch((result) => {
            console.log('fail', result.response.data)
        }

        );
    }
    useEffect(() => {
        getTaskList()
        return () => {

        }
    }, [])
    return (
        <div>
            <form onSubmit={addTask}>
                <div className="card">
                    <div className="card__header">
                        <img src="./img/X2oObC4.png" />
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className="card__title">
                                <h2>My Tasks</h2>
                                <p>September 9,2020</p>
                            </div>
                            <div className="card__add">
                                <input id="newTask" name="taskName" onChange={handleChange} type="text" placeholder="Enter an activity..." />
                                <button id="addItem" onClick={addTask}>
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <p className="text text-danger">{state.errors.taskName}</p>
                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {renderTaskToDo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {renderTaskToDoDone()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}
