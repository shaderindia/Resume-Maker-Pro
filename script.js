// Real-Time Preview
document.querySelectorAll('#cvForm input, #cvForm textarea, #cvForm select').forEach((input) => {
  input.addEventListener('input', () => {
    const id = input.id.replace(/([A-Z])/g, '-$1').toLowerCase();
    const target = document.querySelector(`#cv${id.charAt(0).toUpperCase() + id.slice(1)}`);
    if (target) target.textContent = input.value;
  });
});

// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Template Switching
let currentTemplate = 1;

function switchTemplate() {
  const preview = document.getElementById('cvPreview');
  currentTemplate = (currentTemplate % 3) + 1;
  preview.className = `a4-page template${currentTemplate}`;
}

// Cropping Image
const photoInput = document.getElementById('photoInput');
const cropperContainer = document.getElementById('cropperContainer');
let cropper;

photoInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const cropperImage = document.getElementById('cropperImage');
      cropperImage.src = reader.result;
      cropperContainer.style.display = 'block';
      cropper = new Cropper(cropperImage, { aspectRatio: 1 });
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('cropImageBtn').addEventListener('click', () => {
  const croppedImage = cropper.getCroppedCanvas().toDataURL();
  document.getElementById('cvPhoto').src = croppedImage;
  cropperContainer.style.display = 'none';
});

// Download PDF
function downloadPDF() {
  const element = document.getElementById('cvPreview');
  const options = {
    margin: [10, 10, 10, 10],
    filename: 'MyCV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 3 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };
  html2pdf().set(options).from(element).save();
}
