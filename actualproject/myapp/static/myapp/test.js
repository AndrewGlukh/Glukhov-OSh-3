function postData() {
    const form2 = new FormData(document.getElementById("form2"));
    alert("Данные:");
    for (var pair of form2.entries()) {
        alert(pair[0]+ ', ' + pair[1]); 
    }
    fetch('/myapp/api/users/', {
        method: 'POST',
        body: form2
    })
    .then(response => response.json())
    .then(data => {
        alert('Item saved successfully!');
        window.location.href = "thirdpage";
    })
    .catch(error => {
        if (response.status === 400) {
            for (const field in data.errors) {
                const errorField = document.getElementById(`${field}Error`);
                errorField.textContent = data.errors[field];
            }
        }
        console.error('Error:', error);
    });
}


