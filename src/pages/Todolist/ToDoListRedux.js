import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import ToDoListReducer from '../../redux/reducer/ToDoReducer'
import { addTaskApi, checkTaskApi, deleteTaskApi, getTaskListApi, rejectTaskApi } from '../../redux/actions/ToDoListAction';
export default function ToDoListRedux(props) {
    // lấy tasklist từ redux về
    const { taskList } = useSelector(state => state.ToDoListReducer);
    const dispatch = useDispatch();
    let [state, setState] = useState({
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
        dispatch(addTaskApi(state.values.taskName));
    }
    const delTask = (param) => {
        dispatch(deleteTaskApi(param))
    }
    const rejectTask = (param) => {
        dispatch(rejectTaskApi(param));
    }
    const checkTask = (param) => {
      dispatch(checkTaskApi(param));
    }
    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
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
        return taskList.filter(item => item.status).map((item, index) => {
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
        dispatch(getTaskListApi());
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
