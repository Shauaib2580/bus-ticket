let seatsLeft = document.getElementById('seatsLeft');
let totalSelectSeat = document.getElementById('totalSelectSeat');
const seatNumber = document.getElementsByClassName('seatNumber');
let grandTotal = document.getElementById('grandTotal');
let couponCodeInput = document.getElementById('couponCode');
let applyButton = document.getElementById('apply-button');
let grandPrice = document.getElementById('grand-price');
const nextButton = document.getElementById('next-button');
let modal = document.getElementById('demo-modal');
let cancel = document.getElementById('modal__close');

let perSeatPrice = 550;
let count = 0;
let seats = [];
let selectedSeat = [];
let totalAmount = 0;
let discountPercentage = 0;
let couponCode = 'NEW15';
let couponCode2 = 'Couple 20';
let totalPrice = 0;
let typeValue = '';

function makeAListWithSeatNumber() {
  for (let seat of seatNumber) {
    seats.push(seat.innerText.toLowerCase());
  }
}

function setPrice(a) {
  if (selectedSeat.length < 4) {
    if (selectedSeat.includes(a)) {
      return;
    }
    selectedSeat.push({
      seatNumber: a.toUpperCase(),
      className: 'Economy',
      price: perSeatPrice,
    });

    for (let seat of seatNumber) {
      if (seat.innerText.toLowerCase() === a) {
        seat.style.backgroundColor = '#1DD100';
        seat.style.color = '#fff';

        const newAvailableSeat = parseInt(seatsLeft.innerText) - 1;
        seatsLeft.innerText = newAvailableSeat;
        totalSelectSeat.innerHTML = selectedSeat.length;

        totalPrice += perSeatPrice;
        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.innerText = totalPrice;

        updateSeatInfo(selectedSeat);
        updateGrandTotal();
      }
    }
  } else {
    console.error('maximum length 4');
  }
}

function updateSeatInfo(selectedSeat) {
  const seatInfoContainer = document.getElementById('seat-name');
  seatInfoContainer.innerHTML = '';

  for (let seat of selectedSeat) {
    const seatInfo = document.createElement('div');
    seatInfo.classList.add(
      'flex',
      'justify-around',
      'lg:justify-between',
      'w-auto',
      'lg:w-[430px]',
      'mb-4'
    );

    const seatNumber = document.createElement('p');
    seatNumber.classList.add(
      'text-[#03071280]',
      'text-[14px]',
      'lg:text-[16px]'
    );
    seatNumber.innerText = seat.seatNumber;

    const seatClass = document.createElement('p');
    seatClass.classList.add(
      'text-[#03071280]',
      'text-[14px]',
      'lg:text-[16px]'
    );
    seatClass.innerText = seat.className;

    const seatPrice = document.createElement('p');
    seatPrice.classList.add(
      'text-[#03071280]',
      'text-[14px]',
      'lg:text-[16px]'
    );
    seatPrice.innerText = seat.price;

    seatInfo.appendChild(seatNumber);
    seatInfo.appendChild(seatClass);
    seatInfo.appendChild(seatPrice);

    seatInfoContainer.appendChild(seatInfo);
  }

}

couponCodeInput.addEventListener('keyup', function (e) {
  // console.log(e.target.value);
  typeValue = e.target.value;

  (couponCode === typeValue || couponCode2 === typeValue) &&
  selectedSeat.length === 4
    ? (applyButton.disabled = false)
    : (applyButton.disabled = true);
});


function discount() {
  let discountPrice = 0;

  switch (typeValue) {
    case couponCode:
      discountPrice = totalPrice - totalPrice * 0.15;
      grandPrice.innerText = discountPrice;
      couponCodeInput.style.display = 'none';
      applyButton.style.display = 'none';
      break;
    case couponCode2:
      discountPrice = totalPrice - totalPrice * 0.2;
      grandPrice.innerText = discountPrice;
      couponCodeInput.style.display = 'none';
      applyButton.style.display = 'none';
    default:
      grandPrice.innerText = discountPrice;
      break;
  }
}

function nextButtonInput() {
  const phoneNum = document.getElementById('phone-number').value;
  if (phoneNum) {
    console.log(phoneNum);
    nextButton.disabled = false;
  } else {
    nextButton.disabled = true;
  }
}

function handleSubmit(e) {
  e.preventDefault();
  modal.style.visibility = 'visible';
  modal.style.opacity = 1;
}

cancel.addEventListener('click', function () {
  modal.style.visibility = 'hidden';
  modal.style.opacity = 0;
});

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.visibility = 'hidden';
    modal.style.opacity = 0;
  }
}

makeAListWithSeatNumber();
