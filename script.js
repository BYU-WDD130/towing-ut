document.addEventListener('DOMContentLoaded', () => {

  // 1. Automatic location detection via browser geolocation
  const btnGeo = document.getElementById('btnGeo');
  const locationInput = document.getElementById('location');

  if (btnGeo) {
    btnGeo.addEventListener('click', () => {
      if (navigator.geolocation) {
        btnGeo.textContent = '⏳';
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            locationInput.value = `GPS Location: ${lat.toFixed(4)}, ${lng.toFixed(4)} (Near Spanish Fork)`;
            btnGeo.textContent = '✅';
          },
          (error) => {
            alert('Unable to retrieve location automatically. Please enter your address or landmark manually.');
            btnGeo.textContent = '📍';
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    });
  }

  // 2. Quick Request Form Submission
  const towingForm = document.getElementById('towingForm');
  const formSuccess = document.getElementById('formSuccess');

  if (towingForm) {
    towingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const location = document.getElementById('location').value;

      const submitBtn = towingForm.querySelector('.btn-submit');
      submitBtn.textContent = 'Submitting Request...';
      submitBtn.disabled = true;

      // Simulated webhook/backend call delay
      setTimeout(() => {
        towingForm.reset();
        submitBtn.textContent = 'Send Urgent Request';
        submitBtn.disabled = false;
        
        if (btnGeo) btnGeo.textContent = '📍';

        formSuccess.style.display = 'block';
        formSuccess.textContent = `Thank you ${name}! We received your request near ${location}. We will call you at ${phone} in under 60 seconds.`;
      }, 1200);
    });
  }

});