import React from 'react'

// @ts-ignore
function ProfileUpdateFooter({currentForm, Back, Next, submitHandler}) {
  return (
    <footer className='profile_update_form_footer'>
      {currentForm > 0 && (
        <button onClick={Back} type="button" className="action_btn">
          back
        </button>
      )}
      {currentForm < 2 && (
        <button onClick={Next} type="button" className="action_btn">
          next
        </button>
      )}
      {currentForm === 2 && (
        <button onClick={submitHandler} className="action_btn" type="submit">
          submit
        </button>
      )}
    </footer>
  );
}

export default ProfileUpdateFooter