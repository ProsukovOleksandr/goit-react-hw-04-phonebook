import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { useState } from 'react';
export const ContactForm = ({onAddContact}) => {
  ContactForm.propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };
const [name, setNaming] = useState('');
const [numbers,setNumbers] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const id = nanoid(5);
    onAddContact({ id, name, numbers });
    setNaming('');
    setNumbers('');
  };

 const handleChange = event => {
    if(event.target.name === "name"){
      setNaming(event.target.value);
    }else if(event.target.name === "number"){
      setNumbers(event.target.value);
    }
  };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={numbers}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
}
