
let cropper;
let templateIndex = 0;
const templates = ["template1", "template2"];

document.getElementById('photoInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const image = document.getElementById('cropperImage');
    image.src = event.target.result;
    document.getElementById('cropperContainer').style.display = 'block';

    if (cropper) cropper.destroy();
    cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      responsive: true,
      zoomable: true,
      scalable: true,
    });
  };
  reader.readAsDataURL(file);
});

document.getElementById('cropImageBtn').addEventListener('click', function () {
  if (cropper) {
    const croppedCanvas = cropper.getCroppedCanvas({ width: 300, height: 300 });
    const croppedImage = croppedCanvas.toDataURL('image/png');
    document.getElementById('cvPhoto').src = croppedImage;
    localStorage.setItem('cvPhoto', croppedImage);
    document.getElementById('cropperContainer').style.display = 'none';
  }
});

document.getElementById('cvForm').addEventListener('submit', function (e) {
  e.preventDefault();
  updateCV();
  saveToLocalStorage();
  window.scrollTo({ top: document.getElementById('cvPreview').offsetTop, behavior: 'smooth' });
});

function updateCV() {
  const get = id => document.getElementById(id).value;
  document.getElementById('cvName').textContent = get('name');
  document.getElementById('cvDesignation').textContent = get('designation');
  document.getElementById('cvEmail').textContent = '📧 ' + get('email');
  document.getElementById('cvPhone').textContent = '📞 ' + get('phone');
  document.getElementById('cvAddress').textContent = '📍 ' + get('address');
  document.getElementById('cvNationality').textContent = '🌐 ' + get('nationality');
  document.getElementById('cvDOB').textContent = '🎂 ' + get('dob');
  document.getElementById('cvGender').textContent = '👤 ' + get('gender');
  document.getElementById('cvTypeTitle').textContent = get('summaryType');
  document.getElementById('cvSummaryText').textContent = get('summaryText');
  document.getElementById('cvExperience').textContent = get('experience');
  document.getElementById('cvEducation').textContent = get('education');
  document.getElementById('cvDeclaration').textContent = get('declaration');

  const skills = get('skills').split(',').map(s => s.trim()).filter(s => s);
  const ul = document.getElementById('cvSkills');
  ul.innerHTML = '';
  skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    ul.appendChild(li);
  });
}

function downloadPDF() {
  const element = document.getElementById('cvPreview');
  html2pdf().from(element).set({
    margin: 0,
    filename: 'My_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).save();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function switchTemplate() {
  const preview = document.getElementById('cvPreview');
  preview.classList.remove(templates[templateIndex]);
  templateIndex = (templateIndex + 1) % templates.length;
  preview.classList.add(templates[templateIndex]);
}

function shareCV() {
  alert("Copy this link to continue your CV later: " + window.location.href);
}

function saveToLocalStorage() {
  const fields = ['name', 'designation', 'email', 'phone', 'address', 'nationality', 'dob', 'gender', 'summaryType', 'summaryText', 'skills', 'experience', 'education', 'declaration'];
  fields.forEach(id => {
    localStorage.setItem(id, document.getElementById(id).value);
  });
}

function loadFromLocalStorage() {
  const fields = ['name', 'designation', 'email', 'phone', 'address', 'nationality', 'dob', 'gender', 'summaryType', 'summaryText', 'skills', 'experience', 'education', 'declaration'];
  fields.forEach(id => {
    if (localStorage.getItem(id)) {
      document.getElementById(id).value = localStorage.getItem(id);
    }
  });
  const photo = localStorage.getItem('cvPhoto');
  if (photo) {
    document.getElementById('cvPhoto').src = photo;
  }
}

window.onload = loadFromLocalStorage;
