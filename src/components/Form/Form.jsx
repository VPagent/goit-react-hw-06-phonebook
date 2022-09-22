import { useState } from 'react';
import { nanoid } from 'nanoid';
import s from 'components/Form/Form.module.css';
import PropTypes from 'prop-types'

function Form({ onSetApp, options }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
console.log(options)
  function handleSubmit(event) {
    event.preventDefault();
    const arr = [];
    const key = nanoid(3);
    const obj = { userName: name, id: key, tel: number };
    const inspect = options.some(elem => elem.userName === name);
    if (inspect) {
      return alert(`${name}is already in contacts`);
    }
    arr.push(obj);
    onSetApp(arr);
    reset();
  }
  function handleChange(event) {
    const inputName = event.target.name;
    const value = event.target.value.toLowerCase();
    switch (inputName) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        return alert('error');
    }
  }
  function reset() {
    setName('');
    setNumber('');
  }

  return (
    <form className={s.form} action="" onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={s.label}>
        Tel
        <input
          className={s.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
}
export default Form;


Form.propTypes = {
        onSetApp: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            userName: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            tel: PropTypes.string.isRequired})
        )
  
}
