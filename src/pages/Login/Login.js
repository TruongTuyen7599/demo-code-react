import React, { useState } from 'react'

export default function Login(props) {

    const [userLogin, setUserLogin] = useState({ userName: '', password: '', status: false })

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newUserLogin = ({
            ...userLogin,
            [name]: value
        })
        let valid = true
        for (let key in newUserLogin) {
            if (key !== 'status') {
                if (newUserLogin[key].trim() === '') {
                    valid = false;
                }
            }
        }
        if (!valid) {
            newUserLogin.status = true;
        } else {
            newUserLogin.status = false;
        }
        setUserLogin(newUserLogin)
    }

    const handleLogin = (event) => {
        event.preventDefault();
        if (userLogin.password === 'netcompany' && userLogin.userName === 'netcompany') {
            //Thành Công chuyển về trang trước đó
            // props.history.goBack();
            // Chuyển đến trang chỉ định sau khi xử lý
            // props.history.push('/home')

            //thay đổi nội dung 
            // props.history.replace('/home')

            localStorage.setItem('userLogin', JSON.stringify(userLogin))
        } else {
            alert('Login fil')
            return
        }
    }
    return (
        <form className="container" onSubmit={handleLogin}>
            <h3 className="display-4">Login</h3>
            <div className="form-group">
                <p>User name</p>
                <input name="userName" className="form-control" onChange={handleChange} />
            </div>
            <div className="form-group">
                <p>Password</p>
                <input name="password" className="form-control" onChange={handleChange} />
            </div>
            <div className="form-group">
                <button className="btn btn-success">Login</button>
            </div>
        </form>

    )
}
