// Function to post data
function postData() {
    const form1 = new FormData(document.getElementById("form1"));
    fetch('/myapp/api/users/', {
        method: 'POST',
        body: form1
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        alert('Item saved successfully!');
        document.getElementById("form1").reset();
        window.location.href = "secondpage";
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
// Fetch and display items
/* function fetchItems() {
    fetch('/myapp/api/things/')
    .then(response => response.json())
    .then(data => {
        const itemsList = document.getElementById("itemsList");
        itemsList.innerHTML = '';
        data.forEach(item => {
            const row = itemsList.insertRow();
            const nameCell = row.insertCell(0);
            const descriptionCell = row.insertCell(1);
            const priceCell = row.insertCell(2);
            const activeCell = row.insertCell(3);
            nameCell.textContent = item.name;
            descriptionCell.textContent = item.description;
            priceCell.textContent = item.price;
            activeCell.textContent = item.is_active ? 'Yes' : 'No';
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// Fetch items when the page loads
window.onload = fetchItems; */
