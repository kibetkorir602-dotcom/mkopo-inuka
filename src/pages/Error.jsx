import React from 'react';
import AppHelmet from './AppHelmet';

export default function Error() {
  return (
    <div className='not-found'>
      <AppHelmet title={"MKOPO INUKA"} />
      <h1>404 ERROR!</h1>
      <h2>Page not found</h2>
      <div className="btn" onClick={() => {
        window.history.back();
      }}>Go back</div>
    </div>
  )
}
