import React, { Component } from 'react';
import axios from 'axios';

class ContactForm extends Component {
  constructor() {
    super();

    this.state = {
      formActive: false,
      formImage:"https://i.redd.it/xmulu1f6urt11.jpg",
      username: '',
      fullname: '',
      avatar: '',
      phone: ''
    }

    this.toggleForm = this.toggleForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileInput = this.handleFileInput.bind(this);
    this.postUser = this.postUser.bind(this);

  }

  postUser(e) {
    e.preventDefault();
    axios.post('http://localhost:8080/contacts', {
    username: this.state.username,
    fullname: this.state.fullname,
    avatar: this.state.formImage,
    phone: this.state.phone
    })
  }

  toggleForm() {
    const formState = this.state.formActive;
    this.setState({formActive: !formState});
  }

  handleInputChange(e) {
    this.setState({

        [e.target.name]: e.target.value
    });

    console.log(this.state.form);
  }

  handleFileInput(e) {

    const fileReader = new FileReader();

    fileReader.addEventListener('load', e => {
      console.log(e.target.result);
      this.setState({
        formImage: e.target.result
      });
    });

    fileReader.readAsDataURL(e.target.files[0]);

  }

  render() {
    return this.state.formActive ? (
      <form className="contact-form" onSubmit={this.postUser}>

        <input type="file" name="avatar"
          id="avatarInput" value={this.state.avatar}
          onChange={this.handleFileInput}
        />
        <label htmlFor="avatarInput">
          <img className="avatar" src={this.state.formImage} />
          <span>Click and choose an image!</span>
        </label>
        <input type="text" name="username"
          id="usernameInput" placeholder="username"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input type="text" name="fullname"
          id="fullNameInput" placeholder="full name"
          value={this.state.fullname}
          onChange={this.handleInputChange}
        />
        <input type="text" name="phone"
          id="phoneInput" placeholder="phone"
          value={this.state.phone}
          onChange={this.handleInputChange}
        />
        <input type="submit" value="create!" className="add-contact-button"/>
      </form>) :
      (<div className="add-contact-button" onClick={this.toggleForm}>
        + Add a new contact
      </div>);
  }
}

export default ContactForm;
