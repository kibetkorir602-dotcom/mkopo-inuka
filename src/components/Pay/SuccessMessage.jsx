import './Pay.scss';
import { CheckCircle, Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessMessage({ serviceFee }) {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const [mpesaText, setMpesaText] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    if (document.querySelector('.success-message').classList.contains('active')) {
      document.querySelector('.success-message').classList.remove('active');
    }
  }


  useEffect(() => {
    error && setTimeout(() => {
      setError(null);
    }, 3000);

    paid && setTimeout(() => {
      setPaid(false);
      navigate("/")
    }, 5000);
  }, [error, paid]);


  const parseMpesaMessage = (message) => {
    const regex = /Ksh\s?([\d,]+\.\d{2})\s+paid to\s+(.+?)\.\s+on\s+(\d{1,2})\/(\d{1,2})\/(\d{2})\s+at\s+(\d{1,2}):(\d{2})\s+([APMapm]{2})/;
    const match = message.match(regex);

    if (!match) return null;

    const [
      _,
      amountStr,
      receiver,
      day,
      month,
      year,
      hourRaw,
      minutes,
      meridian,
    ] = match;

    const amount = parseFloat(amountStr.replace(',', ''));
    let hour = parseInt(hourRaw, 10);
    const minute = parseInt(minutes, 10);
    const yr = parseInt(`20${year}`, 10); // convert '25' to 2025
    const mm = parseInt(month, 10) - 1; // JavaScript months are 0-based
    const dd = parseInt(day, 10);

    if (meridian.toUpperCase() === 'PM' && hour !== 12) hour += 12;
    if (meridian.toUpperCase() === 'AM' && hour === 12) hour = 0;

    const dateTime = new Date(yr, mm, dd, hour, minute);

    return {
      amount,
      receiver: receiver.trim().toUpperCase(),
      datetime: dateTime,
    };
  };



  const verifyMpesaDetails = ({ amount, receiver, datetime }) => {
    const expectedReceiver = "MOBICOM INTERNATIONAL 1";
    const expectedAmount = serviceFee;
    const now = new Date();

    const diffMinutes = Math.abs((now - datetime) / (1000 * 60));

    return (
      receiver === expectedReceiver &&
      amount === expectedAmount &&
      diffMinutes <= 30//1440  Allows up to 24 hours
    );
  };

  const handleVerify = (e) => {
    e.preventDefault()
    const parsed = parseMpesaMessage(mpesaText);

    if (!parsed) {
      setError("Invalid M-Pesa message format.");
      return;
    }

    if (!verifyMpesaDetails(parsed)) {
      setError("M-Pesa details do not match or are too old.");
      return;
    }
    setPaid(true)
  };

  return (
    <div className='success-message' id='success-message'>
      <Close className='close' onClick={handleClose} />
      {
        !paid ? <form onSubmit={handleVerify}>
          <label htmlFor='amount'>Paste Mpesa Message</label>
          <textarea name='description' id='description' required value={mpesaText}
            onChange={(e) => setMpesaText(e.target.value)}
            placeholder="Paste the full M-Pesa message here" />
          <button className="btn" type='submit' role='button' title='send'>VERIFY NOW</button>
          {
            error && <h4 className='error'>{error}</h4>
          }
        </form> : <div>
          <h1>Payment Successful <span><CheckCircle style={{ color: "green" }} /></span> </h1>
          <h4>Your request has been received and is being processed</h4>
        </div>
      }
    </div>
  )
}
