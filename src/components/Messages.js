import React from 'react';


const Messages = ({url}) => {

    const handleMessage = (e) => {
        e.preventDefault()
    }

    return (
        
        <form onClick={handleMessage}>
            <button
            className="inputBtn"
            >Send Message</button>
        </form>
        
    )
}

export default Messages