
import React from 'react'
import { Redirect } from 'react-router'

export default function Profile() {


    if (localStorage.getItem('userLogin')) {
        return (
            <div>
                profile
            </div>
        )
    } else {
        alert('Vui lòng đăng nhập để vào trang này')
        return <Redirect to="/login"/>
    }

}
