import { useState, useEffect } from 'react';
import Form from 'components/Form';
import Section from 'components/Section';
import Contacts from 'components/Contacts';

export function App() {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts'))|| []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if(!contacts){
      return
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function changeState(arr) {
    setContacts(prev => [...prev, ...arr]);
  }

  const filteredUsers = filter
    ? contacts.filter(user => user.userName.includes(filter))
    : [];

  function handleChangeFilter(event) {
    const value = event.target.value.toLowerCase();
    setFilter(value);
  }
  function handleDelete(event) {
    const withoutDel = contacts.filter(
      user => user.userName !== event.target.name
    );
    setContacts(withoutDel);
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title={'Phonebook'}>
        <Form onSetApp={changeState} options={contacts}></Form>
      </Section>
      <Section title={'Contacts'}>
        <Contacts
          options={filter ? filteredUsers : contacts}
          onChangeInput={handleChangeFilter}
          filterValue={filter}
          onHandle={handleDelete}
        />
      </Section>
    </div>
  );
}

