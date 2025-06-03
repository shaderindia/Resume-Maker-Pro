document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
document.getElementById('switch-template').addEventListener('click', () => {
  alert('Template switched!');
});
document.getElementById('download-cv').addEventListener('click', () => {
  const element = document.getElementById('cv-preview');
  const opt = {
    margin: 0,
    filename: 'cv.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
});
document.getElementById('share-app').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('App link copied!');
  });
});
