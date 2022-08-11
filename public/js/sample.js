function fileValidation() {
    var fileInput = 
        document.getElementById('file');
      
    var filePath = fileInput.value;
  
    // Allowing file type
    var allowedExtensions = 
/(\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd)$/i;
      
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
    } 
}

async function uploadFile() {
var fileInput = 
        document.getElementById('file');
let formData = new FormData(); 
formData.append("file", fileInput.files[0]);
//alert(fileInput.files[0]);
if (fileInput.files[0] === undefined){
    alert("uploaded failed");
}

alert("uploaded successfully");

}