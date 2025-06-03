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
  currentTemplate = (currentTemplate % 3) + 1; // Cycle through 3 templates
  preview.className = `a4-page template${currentTemplate}`;
}

// Share the App
function shareApp() {
  const appUrl = window.location.href;
  if (navigator.share) {
    navigator.share({
      title: 'Advanced CV Maker',
      text: 'Create your professional CV with Advanced CV Maker!',
      url: appUrl,
    }).catch((error) => console.error('Error sharing:', error));
  } else {
    navigator.clipboard.writeText(appUrl).then(() => {
      alert('App link copied to clipboard!');
    });
  }
}

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
