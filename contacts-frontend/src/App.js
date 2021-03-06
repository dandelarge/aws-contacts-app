import React, { Component } from 'react';
import axios from 'axios';
import ContactsList from './Contacts'
import ContactForm from './ContactForm';

class App extends Component {
  state = {
    contacts: [],
    formActive: false
  }

  componentDidMount() {
    axios.get('http://localhost:8080/contacts')
    .then(({data}) => {
      this.setState({contacts: data});
    })
    .catch(err => {
      console.log(err);
      this.setState({contacts: {
        id: 0,
        avatar: 'https://pbs.twimg.com/profile_images/1002272769352978433/9S4QWSR0_400x400.jpg',
        username: 'SpongyBobu',
        fullname: '',
        phone: '+31 6 3400 7732'
      }});
    });
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
            <ContactForm adding={this.state.formActive}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
