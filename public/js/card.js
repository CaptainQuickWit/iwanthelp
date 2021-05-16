
// COLLECTING DATA FOR THE MESHCARD
const newFormHandler = async (event) => {
  event.preventDefault();

  const call_category = document.querySelector('#call-category').value.trim();
  const call_keywords = document.querySelector('#call-keywords').value.trim();
  const call_description = document.querySelector('#call-description').value.trim();

  const offer_category = document.querySelector('#offer-category').value.trim();
  const offer_keywords = document.querySelector('#offer-keywords').value.trim();
  const offer_description = document.querySelector('#offer-description').value.trim();

  if (call_category && call_keywords && call_description && offer_category && offer_keywords && offer_description ) {
    const response = await fetch(`/api/cards`, {
      method: 'POST',
      body: JSON.stringify({ call_category, call_keywords, call_description, offer_category, offer_keywords, offer_description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/meshboard');
    } else {
      alert('Failed to create your meshcard');
    }
  }
};

// REMOVING THE MESHCARD - ASK TA!!!!!!!!! about data-id? We need to assign a data (as data-id="1") attribute to the element holding the card.
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/cards/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/member');
    } else {
      alert('Failed to delete meshcard');
    }
  }
};

// these classes need to be added to the member.handlebar wherever the forms are.
document
  .querySelector('.new-meshcard')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.card-list')
//   .addEventListener('click', delButtonHandler);
