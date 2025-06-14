import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { Helmet } from 'react-helmet-async';
import Loader from '../components/Loader/Loader';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import Pay from '../components/Pay/Pay';
import SuccessMessage from '../components/Pay/SuccessMessage';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};


export default function ApplicationForm() {
  const [error, setError] = useState(null);
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('all');
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState();
  const [amount, setAmount] = useState(5000);
  const [serviceFee, setServiceFee] = useState(amount * 0.02)

  const handleToggle = async () => {
    document.querySelector('.donate').classList.toggle('active');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id && !description && !amount && !category && !phoneNumber) {
      return setError("Enter all fields to continue");
    }

    if (!isPhoneValid(phoneNumber)) {
      setError("invalid phone number");
      return;
    }
    if (amount <= 0) {
      setError("amount can not be empty");
      return;
    }

    const numberArray = phoneNumber.split("");
    numberArray.shift();
    //addNews({title, description, category: category, image}, setError, setLoading);
    handleToggle()
  }

  useEffect(() => {
    error && setTimeout(() => {
      setError(null);
    }, 1000);
  }, [error]);

  useEffect(() => {
    !currentUser && window.history.back();
  }, [currentUser]);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setServiceFee(amount * 0.02)
  }, [amount])

  return (
    <div className='form'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>APPLICATION |  APPLY FOR A QUICK LOAN TO MPESA</title>
        <link rel="canonical" href={window.location.hostname} />
        <base href={window.location.hostname}></base>
        <meta name="description" content={"Kenya Debt Abolition Network is dedicated to advocating for the elimination of unsustainable debt burdens in Kenya. Through education, advocacy, and community engagement, we aim to create a debt-free future that fosters economic growth and social equity."} />
      </Helmet>
      <Pay serviceFee={serviceFee} email={currentUser.email} />
      <SuccessMessage serviceFee={serviceFee} />
      <h4>APPLY FOR A QUICK LOAN</h4>
      {!loading && <form onSubmit={handleSubmit}>
        <label htmlFor='id'>National ID:</label>
        <input type="number" name="id" id="id" placeholder={"12345678"} required value={id} onChange={e => setId(e.target.value)} maxLength={8} minLength={8} />
        <label htmlFor='name'>Phone number:</label>
        <PhoneInput
          defaultCountry='ke'
          value={phoneNumber}
          onChange={phone => setPhoneNumber(phone)}
          hideDropdown
          className='input'
          placeholder='722****00'
        />
        <label htmlFor='category'>Select loan type:</label>
        <select defaultValue={'personal'} placeholder="Select option" id='category' name='category' className='input'
          onChange={(e) => setCategory(e.target.value)}>
          <option value="personal" >Personal Loan</option>
          <option value="business" >Business Loan</option>
          <option value="payday" >Payday Loan</option>
          <option value="mortgage" >Mortgage</option>
          <option value="other" >Other</option>
        </select>
        <label htmlFor='amount'>Amount (KSH):  <span>{amount}</span></label>
        <input
          type="range"
          min={5000}
          max={100000}
          step={1000}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='styled-slider'
        />
        <h4>Service Fee:  <span>KSH {serviceFee}</span></h4>
        <label htmlFor="description">Loan description:</label>
        <textarea placeholder="Briefly describe why you need a loan..." name='description' id='description' required value={description} onChange={(e) => setDescription(e.target.value)} />
        {
          error && <h4 className='error'>{error}</h4>
        }
        <button type='submit' className='btn' title='SUBMIT'>SUBMIT</button>
      </form>}
      {
        loading && <Loader />
      }
    </div>
  )
}
