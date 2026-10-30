document.addEventListener('DOMContentLoaded', () => {

  // 1. Detección automática de ubicación por geolocalización
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

  // 2. Envío del formulario mediante Formspree
  const towingForm = document.getElementById('towingForm');
  const formSuccess = document.getElementById('formSuccess');

  if (towingForm) {
    towingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const location = document.getElementById('location').value;
      const service = document.getElementById('service')?.value || 'Not specified';

      const submitBtn = towingForm.querySelector('.btn-submit');
      submitBtn.textContent = 'Submitting Request...';
      submitBtn.disabled = true;

      try {
        // REEMPLAZA TU_FORM_ID CON EL ID QUE TE DA FORMSPREE
        const response = await fetch('https://formspree.io/f/xqppdgaa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            phone: phone,
            location: location,
            service: service
          })
        });

        if (response.ok) {
          towingForm.reset();
          if (btnGeo) btnGeo.textContent = '📍';

          formSuccess.style.display = 'block';
          formSuccess.textContent = `Thank you ${name}! We have received your request near ${location}. One of our technicians will contact you shortly at ${phone}.`;
        } else {
          alert('There was a problem submitting your request. Please call us directly at (385) 448-4939.');
        }
      } catch (error) {
        alert('Connection error. Please call us directly at (385) 448-4939.');
      } finally {
        submitBtn.textContent = 'Send Urgent Request';
        submitBtn.disabled = false;
      }
    });
  }

});