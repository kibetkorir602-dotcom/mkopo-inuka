import React from 'react';
import Contact from '../components/Contact/Contact';
import Faq from '../components/Faq/Faq';
import Image from '../assets/f4.png';
import Newsletter from '../components/Newsletter/Newsletter';
import AppHelmet from './AppHelmet';

export default function About() {
  return (
    <div className='about'>
      <AppHelmet title={'ABOUT US'} />
      <div className="quote">
        <img src={Image} alt="about_us_flyer_thumbnail" />
        <div className='content'>
          <p>
            We are a trusted online lending platform dedicated to providing <span>fast, secure, and flexible loans</span> to Kenyans. Whether you need emergency cash, a business boost, or a personal loan, we ensure <span>hassle-free applications and instant M-Pesa disbursements</span>.
          </p>
        </div>
      </div>

      <div className="quote">
        <div className='content'>
          <p>
            Our mission is to make <span>borrowing easier and more accessible</span> by eliminating the traditional complexities of loan applications. With <span>no paperwork, no guarantors, and flexible repayment plans </span>, we empower individuals and businesses to achieve their financial goals.
            <br /><br />
            Our platform is designed for speed and convenience, ensuring that you receive funds <span>within minutes of approval </span>. Whether it’s an emergency, business investment, or personal need, we’ve got you covered with <span>low-interest rates and transparent terms </span>.
            <br /><br />
            <h2>Why Choose Us?</h2>
            <ul>
              <li>✅ Instant loan approvals</li>
              <li>✅ Direct M-Pesa disbursement</li>
              <li>✅ No paperwork, no guarantors required</li>
              <li>✅ Flexible repayment options</li>
              <li>✅ Secure and reliable financial services</li>
            </ul>
            Join thousands of satisfied customers who trust us for their financial needs. Apply today and experience <span>fast, stress-free lending</span> at your fingertips.
          </p>
        </div>
      </div>

      <Faq />
      <Contact />
      <Newsletter />
    </div>
  );
}
