import React from 'react'

export default function Details(props) {
    return (
        <div>
            Giá trị tham số: {props.match.params.id}
        </div>
    )
}
