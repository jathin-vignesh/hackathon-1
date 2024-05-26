document.addEventListener('DOMContentLoaded', function () {
    // Show login page initially
    document.getElementById('loginPage').classList.add('active');
});

function login() {
    // Add basic login functionality
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username && password) {
        document.getElementById('loginPage').classList.remove('active');
        document.getElementById('mainPage').classList.add('active');
    } else {
        alert('Please enter username and password');
    }
}

function logout() {
    document.getElementById('mainPage').classList.remove('active');
    document.getElementById('loginPage').classList.add('active');
}

function validateContact() {
    var contactField = document.getElementById('contact');
    var contactValue = contactField.value;
    // Remove any non-digit characters and ensure it starts with +91
    contactValue = contactValue.replace(/[^\d]/g, '');
    if (!contactValue.startsWith('91')) {
        contactValue = '91' + contactValue;
    }
    // Limit to 12 characters (10 digits + 91)
    contactField.value = '+' + contactValue.substring(0, 12);
}

function buyBook(bookDetails) {
    var detailsDiv = document.createElement('div');
    detailsDiv.className = 'details';
    detailsDiv.innerHTML = `
        <p>Contact: ${bookDetails.contact}</p>
        <p>Email: ${bookDetails.email}</p>
    `;

    var bookDiv = bookDetails.element;
    bookDiv.appendChild(detailsDiv);

    setTimeout(function() {
        detailsDiv.style.display = 'block';
    }, 10);
}

function addBook() {
    var bookTitle = document.getElementById('bookTitle').value;
    var author = document.getElementById('author').value;
    var contact = document.getElementById('contact').value;
    var email = document.getElementById('email').value;
    var price = document.getElementById('price').value;
    var imageFile = document.getElementById('imageFile').files[0];

    if (bookTitle && author && contact && email && price && imageFile) {
        var bookList = document.getElementById('bookList');

        var bookDiv = document.createElement('div');
        bookDiv.className = 'book';

        var bookImage = document.createElement('img');
        var reader = new FileReader();
        reader.onload = function (e) {
            bookImage.src = e.target.result;
        }
        reader.readAsDataURL(imageFile);

        var bookTitleElement = document.createElement('h3');
        bookTitleElement.innerText = bookTitle;

        var bookAuthor = document.createElement('p');
        bookAuthor.innerText = 'Author: ' + author;

        var bookPrice = document.createElement('p');
        bookPrice.innerText = 'Price: ₹' + price;

        var buyButton = document.createElement('button');
        buyButton.innerText = 'Buy';
        buyButton.onclick = function () {
            buyBook({ contact, email, element: bookDiv });
        };

        bookDiv.appendChild(bookImage);
        bookDiv.appendChild(bookTitleElement);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPrice);
        bookDiv.appendChild(buyButton);

        bookList.appendChild(bookDiv);

        document.getElementById('bookTitle').value = '';
        document.getElementById('author').value = '';
        document.getElementById('contact').value = '';
        document.getElementById('email').value = '';
        document.getElementById('price').value = '';
        document.getElementById('imageFile').value = '';
    } else {
        alert('Please fill out all fields');
    }
}
