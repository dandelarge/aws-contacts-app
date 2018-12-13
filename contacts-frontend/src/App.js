import React, { Component } from 'react';
import axios from 'axios';
import ContactsList from './Contacts'
import ContactForm from './ContactForm';


const contactsArray = [
  {
    id: 0,
    avatar: 'https://pbs.twimg.com/profile_images/1002272769352978433/9S4QWSR0_400x400.jpg',
    username: 'SpongyBobu',
    fullname: '',
    phone: '+31 6 3400 7732'
  },
  {
    id: 1,
    avatar: 'https://i.ytimg.com/vi/krz7RZHnGnE/hqdefault.jpg',
    username: 'elHijoDelPapa',
    fullname: '',
    phone: '+31 6 3400 7732'
  },
  {
    id: 2,
    avatar: 'https://i.ytimg.com/vi/mRf3-JkwqfU/hqdefault.jpg',
    username: 'Puppy',
    fullname: '',
    phone: '+31 6 3400 7732'
  },
  {
    id: 3,
    avatar: 'https://yt3.ggpht.com/a-/AN66SAy6GVR9FKfi5C_qKDZkFSCyDIoxrhCeeWf-bQ=s900-mo-c-c0xffffffff-rj-k-no',
    username: 'bob',
    fullname: '',
    phone: '+31 6 3400 7732'
  },
];

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    axios.get('http://localhost:8080/contacts', {headers: {"Access-Control-Allow-Origin": "*"}})
    .then(contacts => this.setState({ contacts }));
  }

  render() {
    return (
      <div className="approot container-fluid">
        <div className="row header">
          <div className="col">
            <h1>Contacts App!</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>Find a sweet list of contacts below</h3>
            <ContactsList contacts={this.state.contacts}/>
            <div className="add-contact-button">
              + Add a new contact
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
