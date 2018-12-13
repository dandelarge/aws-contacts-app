import React from 'react';

const ContactCard = ({avatar, username, phone}) => (
  <li className="contact-card">
    <img className="avatar" src={avatar}/>
    <div className="contact-info">
      <div className="username">{username}</div>
      <div className="phone">{phone}</div>
    </div>
  </li>
);

const ContactsList = ({contacts}) => {
  const listItems = contacts.map(({avatar, username, phone, id}) => (
    <ContactCard avatar={avatar} username={username} phone={phone} key={id}/>
  ));

  return (
    <ul className="contacts-list">
      {listItems}
    </ul>
  );
};

export default ContactsList;
