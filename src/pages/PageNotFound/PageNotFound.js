import React from 'react'

export default function PageNotFound(props) {
    return (
        <div>
            Not Found {props.match.url}
        </div>
    )
}
