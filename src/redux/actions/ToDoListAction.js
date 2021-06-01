import Axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConstant";


//action có 2 loại
//Action thực thi ngay  làm thay đổi reducer
//Action phải thực hiện sử lý rồi mới gọi action 1 thực thi(async action)
export const getTaskListApi = async () => {
    return async dispatch => {
        try {
            let { data, status } = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            })
            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: result.data
                })
            }


        } catch (err) {
            console.log(err.response)
        }

        // promise.then((result) => {
        //     dispatch({
        //         type: GET_TASK_API,
        //         taskList: result.data
        //     })
        // });
        // promise.catch((result) => {
        //     console.log('fail', result.response.data)
        // }
        // );
    }
}
export const addTaskApi = (taskName) => {
    return async dispatch => {
        try {
            let { data, status } = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: {
                    taskName: taskName
                }
            })
            if (status === 200) {
                dispatch(getTaskListApi());
            }
        } catch (err) {
            console.log(errors.response.data)
        }

        // promise.then(result => {
        //     console.log(result.data)
        //     dispatch(getTaskListApi());
        // })
        // promise.catch(errors => {
        //     console.log(errors.response)
        // })
    }
}

export const deleteTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(result => {
            console.log(result.data)
            dispatch(getTaskListApi());
        })
        promise.catch(errors => {
            console.log(errors.response.data)
        })
    }
}

export const rejectTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            console.log(result.data)
            dispatch(getTaskListApi());
        })
        promise.catch(errors => {
            console.log(errors.response.data)
        })
    }
}

export const checkTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT"
        });
        promise.then(result => {
            console.log('success', result.data)
            dispatch(getTaskListApi());
        });
        promise.catch(errors => {
            console.log('errors ', errors.response.data)
        })
    }
}

