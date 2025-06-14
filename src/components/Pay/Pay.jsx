import { useRef } from 'react';
import './Pay.scss';
import { Close } from '@mui/icons-material';

export default function Pay({ serviceFee }) {
    //const navigate = useNavigate();
    const handleClose = () => {
        if (document.querySelector('.donate').classList.contains('active')) {
            document.querySelector('.donate').classList.remove('active');
        }
    }

    const tillRef = useRef();

    const copyToBoard = (e) => {
        e.preventDefault();
        const tillText = tillRef.current?.innerText;
        if (tillText) {
            navigator.clipboard.writeText(tillText)
                .then(() => alert('Till number copied!'))
                .catch((err) => console.error('Copy failed:', err));
        }
    };

    return (
        <div className='donate' id='donate'>
            <Close className='close' onClick={handleClose} />
            <h1>Almost Done!</h1>
            <h4>A Service Fee of  <span>KSH {serviceFee}</span> is Required To Process Your Loan.</h4>
            <h4>HOW TO MAKE PAYMENT:</h4>
            <ul>
                <li>&raquo; Go To <span>M-pesa</span></li>
                <li>&raquo; Lipa Na M-pesa: <span>Buy Goods And Services</span></li>
                <li>&raquo; Enter Till Number: <span ref={tillRef}>5881981</span> </li>

                <h3 className="copy" onClick={copyToBoard}>CLICK TO COPY TILL</h3>

                <li>&raquo; Enter Amount: <span>KSH {serviceFee}</span></li>
                <li>&raquo; Complete Payment: <span>Enter M-pesa Pin</span></li>
            </ul>
            <button className="btn" type='button' role='button' title='verify' onClick={() => {
                handleClose()
                document.querySelector('.success-message').classList.toggle('active');
            }}>verify Payment</button>
        </div>
    )
}