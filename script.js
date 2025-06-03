const inputs = document.querySelectorAll('.input-form input, .input-form textarea, .input-form select');
inputs.forEach(input => {
  input.addEventListener('input', updatePreview);
});

function updatePreview() {
  document.getElementById('prev-name').textContent = document.getElementById('name').value;
  document.getElementById('prev-designation').textContent = document.getElementById('designation').value;
  document.getElementById('prev-email').textContent = document.getElementById('email').value;
  document.getElementById('prev-phone').textContent = document.getElementById('phone').value;
  document.getElementById('prev-objective').textContent = document.getElementById('objective').value;
  document.getElementById('prev-experience').textContent = document.getElementById('experience').value;
  document.getElementById('prev-education').textContent = document.getElementById('education').value;
  document.getElementById('prev-declaration').textContent = document.getElementById('declaration').value;

  const skills = document.getElementById('skills').value.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
  document.getElementById('prev-skills').innerHTML = skills;

  const langs = document.getElementById('languages').value.split(',').map(lang => `<li>${lang.trim()}</li>`).join('');
  document.getElementById('prev-languages').innerHTML = langs;

  localStorage.setItem('cvData', JSON.stringify(getFormData()));
}

function getFormData() {
  let data = {};
  inputs.forEach(input => {
    data[input.id] = input.value;
  });
  return data;
}

function loadFormData() {
  const data = JSON.parse(localStorage.getItem('cvData'));
  if (!data) return;
  inputs.forEach(input => {
    input.value = data[input.id] || '';
  });
  updatePreview();
}

document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

document.getElementById('download-cv').addEventListener('click', () => {
  html2pdf().from(document.getElementById('cv-preview')).save('cv.pdf');
});

document.getElementById('share-app').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href);
  alert("App link copied!");
});

// Load saved data on page load
window.onload = loadFormData;
