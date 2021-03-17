import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class Createfriend extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true });
        console.log(values);

        if(this.props.onCreatefriend)
            this.props.onCreatefriend(values)
    }

    render() {
        return (
            
            <div>
                <Link className="close-create-friend" to="/">Close</Link>
                <form onSubmit={this.handleSubmit} className="create-friend-form">
                    <ImageInput className="create-friend-avatar-input" name="avatarURL" maxHeight={64}/>
                    <div className="create-friend-details">
                        <input type="text" name="name" placeholder="Name"/>
                        <input type="email" name="email" placeholder="Email"/>
                        <button>Add friend</button>
                    </div>
                </form>

           </div>    
        );
    }
}

export default Createfriend