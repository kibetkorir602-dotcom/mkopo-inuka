import React, { useEffect, useState } from 'react';
import './Contact.scss';
import Logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import Dialog from '../Dialog/Dialog';
import { addContact } from '../../firebase';


const Contact = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addContact({ name, email, message }, setSuccess, setError);
  };

  useEffect(() => {
    error && setTimeout(() => {
      setError(null);
    }, 1000);

    success && setTimeout(() => {
      setSuccess(null);
      setEmail('');
      setName('');
      setMessage('');
    }, 1000);
  }, [error, success]);
  return (
    <div className="contact">
      <h1>Get Connected</h1>
      {success && <Dialog text={success} title={"Your details was submitted!"} isError={false} />}
      {error && <Dialog text={error} title={"An Error Occurred!"} isError={true} />}
      <div className="wrapper">
        <div className="contacts">
          <NavLink to="/" title='mkopo_ikuka'>
            <img src={Logo} alt='mkopo_inuka_logo' />
            <h1>MKOPO<span>inuka</span></h1>
          </NavLink>
          <p>
            431 University Way, 1st Floor<br />
            Nairobi NI 10013<br />
            Kenya
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="NAME" required value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="EMAIL" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <textarea placeholder="MESSAGE" required value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className='btn' title='send' type='submit'>SEND</button>
        </form>
      </div>

    </div>
  );
}
export default Contact;