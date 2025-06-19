let cropper;
const fields = ["fullName","desiredPosition","email","phone","website","location","address","fatherName","nationality","dob","gender","maritalStatus","about","summary","experience","education","skills","motherTongue","otherLanguages","commSkills","orgSkills","jobSkills","digitalSkills","certifications","publications","projects","conferences","references","decDate","decPlace"];

document.addEventListener("DOMContentLoaded",()=>{
  // Elements
  const photoInput = document.getElementById("photoInput"),
        uploadBtn = document.getElementById("uploadBtn"),
        profileImage = document.getElementById("profileImage"),
        cropModal = document.getElementById("cropModal"),
        cropperImage = document.getElementById("cropperImage"),
        cropApply = document.getElementById("cropApply"),
        cropCancel = document.getElementById("cropCancel"),
        themeToggle = document.getElementById("themeToggle"),
        cvStyle = document.getElementById("cvStyle"),
        generate = document.getElementById("generatePreview"),
        previewWrapper = document.querySelector(".preview-section-wrapper"),
        preview = document.getElementById("cvPreview"),
        downloadPDF = document.getElementById("downloadPDF"),
        downloadJPG = document.getElementById("downloadJPG"),
        shareBtn = document.getElementById("shareBtn"),
        resetBtn = document.getElementById("resetBtn"),
        closeBtn = document.getElementById("closePreview");

  // Load saved photo
  const savedPhoto=localStorage.getItem("cv_photo");
  if(savedPhoto) profileImage.src=savedPhoto;

  // Load saved fields
  fields.forEach(id=>{
    const el=document.getElementById(id), val=localStorage.getItem(id);
    if(val) el.value=val;
    el.addEventListener("input",()=>localStorage.setItem(id,el.value));
  });

  // Theme
  if(localStorage.getItem("theme")==="dark"){document.body.classList.add("dark"); document.querySelector("#themeToggle i").classList.replace("fa-moon","fa-sun");}
  themeToggle.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    const icon=document.querySelector("#themeToggle i");
    icon.classList.toggle("fa-moon"); icon.classList.toggle("fa-sun");
    localStorage.setItem("theme",document.body.classList.contains("dark")?"dark":"light");
  });

  // Image upload & crop
  uploadBtn.addEventListener("click",()=>photoInput.click());
  photoInput.addEventListener("change",e=>{
    const file=e.target.files[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=()=>{cropperImage.src=reader.result; cropModal.style.display="flex"; if(cropper)cropper.destroy(); cropper=new Cropper(cropperImage,{aspectRatio:1,viewMode:1});};
    reader.readAsDataURL(file);
  });
  cropApply.addEventListener("click",()=>{
    const dataURL=cropper.getCroppedCanvas({width:300,height:300}).toDataURL();
    profileImage.src=dataURL; localStorage.setItem("cv_photo",dataURL); showToast("Photo cropped!"); cropModal.style.display="none";
  });
  cropCancel.addEventListener("click",()=>cropModal.style.display="none");

  // Generate Preview
  generate.addEventListener("click",()=>{
    preview.innerHTML = cvStyle.value==="euro"?renderEuroPass():renderIndian();
    previewWrapper.style.display="block"; window.scrollTo({top:0,behavior:"smooth"});
  });

  // Download PDF
  downloadPDF.addEventListener("click",()=>{
    const opt={margin:0.5,filename:(document.getElementById("fullName").value||"CV")+"-"+cvStyle.value+".pdf",html2canvas:{scale:2},jsPDF:{unit:'in',format:'a4',orientation:'portrait'}};
    html2pdf().set(opt).from(preview).save().then(()=>showToast("PDF downloaded!")).catch(err=>console.error(err));
  });

  // Download JPG
  downloadJPG.addEventListener("click",()=>{
    html2canvas(preview,{scale:2}).then(canvas=>{
      const link=document.createElement("a"); link.download=(document.getElementById("fullName").value||"CV")+"-"+cvStyle.value+".jpg";
      link.href=canvas.toDataURL("image/jpeg",1.0); link.click(); showToast("JPG downloaded!");
    });
  });

  // Share
  shareBtn.addEventListener("click",()=>{
    if(navigator.share){navigator.share({title:document.getElementById("fullName").value+" CV",url:window.location.href});}
    else{navigator.clipboard.writeText(window.location.href).then(()=>showToast("URL copied"));}
  });

  // Reset
  resetBtn.addEventListener("click",()=>{if(confirm("Clear all data?")){localStorage.clear(); location.reload();}});

  // Close Preview
  closeBtn.addEventListener("click",()=>{previewWrapper.style.display="none"; window.scrollTo({top:0,behavior:"smooth"});});
});

// Toast
function showToast(msg){
  const t=document.createElement("div");t.className="toast";t.innerText=msg;document.getElementById("toastContainer").appendChild(t);
  setTimeout(()=>t.remove(),3000);
}

// Render functions
function renderEuroPass(){
  const get=(id)=>document.getElementById(id).value;
  return `<h1>${get("fullName")}</h1><img src="${get("cv_photo")}" style="width:100px;float:right;border-radius:50%;"/>
    <hr/><h2>Personal Information</h2>
    <p>${get("email")} | ${get("phone")} | ${get("address")}</p>
    <p>Nationality: ${get("nationality")} | DOB: ${get("dob")} | Gender: ${get("gender")}</p>
    <h2>Job Applied For</h2><p>${get("desiredPosition")}</p>
    <h2>About Me</h2><p>${get("about")}</p>
    <h2>Experience</h2><p>${get("experience").replace(/\n/g,"<br>")}</p>
    <h2>Education</h2><p>${get("education").replace(/\n/g,"<br>")}</p>
    <h2>Skills</h2><p>${get("skills")}</p>`;
}
function renderIndian(){
  const get=(id)=>document.getElementById(id).value;
  return `<h1 style="text-align:center;">${get("fullName")}</h1>
    <p style="text-align:center;">${get("phone")} | ${get("email")} | ${get("location")}</p>
    <h2>Career Objective</h2><p>${get("about")}</p>
    ${get("summary")?`<h2>Professional Summary</h2><p>${get("summary")}</p>`:""}
    <h2>Work Experience</h2><p>${get("experience").replace(/\n/g,"<br>")}</p>
    <h2>Education</h2><p>${get("education").replace(/\n/g,"<br>")}</p>
    <h2>Skills</h2><p>${get("skills")}</p>
    <h2>Personal Details</h2><p>Father's Name: ${get("fatherName")}</p>
    <p>DOB: ${get("dob")} | Gender: ${get("gender")} | Marital: ${get("maritalStatus")} | Nationality: ${get("nationality")}</p>
    <h2>Declaration</h2><p>I hereby declare that the above information is true.</p>
    <p>Date: ${get("decDate")} | Place: ${get("decPlace")}</p>`;
}
