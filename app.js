function validateForm() {
    var fileUpload = document.getElementById("fileUpload");
    var filePath = fileUpload.value;
    // Check if file input is empty
    if (filePath == "") {
        alert("Please select a file to upload.");
        return false;
    }
    return true;
  }