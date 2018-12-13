import React from 'react';

const ContactForm = () => (
  <form className="contact-form">
    <img className="avatar" src="https://i.redd.it/xmulu1f6urt11.jpg" />
    <input type="file" name="avatar" id="avatarInput"/>
    <label htmlFor="avatarInput">Choose an image!</label>
    <input type="text" name="username" id="usernameInput" placeholder="username"/>
    <input type="text" name="fullname" id="fullNameInput" placeholder="full name"/>
    <input type="text" name="phone" id="phoneInput" placeholder="phone"/>
    <input type="submit" value="create!" className="add-contact-button"/>
  </form>
);

export default ContactForm;
