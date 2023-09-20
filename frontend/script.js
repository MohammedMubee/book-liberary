async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);
            window.location.href = 'book_store.html'; 
        } else {
            alert('Login failed! Please try again.');
        }
    } else {
        alert('Login failed! Please try again.');
    }
}



document.getElementById("logout-tab").addEventListener("click", function(event) {
    event.preventDefault(); 
    logout(); 
});

function logout() {
    try {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        window.location.href = 'log.html'; 
    } catch (error) {
        console.error('Error during logout:', error);
        alert('An error occurred during logout. Please try again later.');
    }
}

async function fetchBooksData() {
    try {
        const response = await fetch('http://localhost:3001/api/book/allbooks'); 
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function updateBookList() {
    try {
        const bookListContainer = document.getElementById('all-books');
        const booksData = await fetchBooksData();
        console.log(booksData)
    
        
        const bookCardsHTML = booksData.map(book => `
            <div class="col-md-4 mb-4" id="book-card-${book.id}">
                <div class="card">
                    <img src="${book.coverImage || 'default-book-image.jpg'}" class="card-img-top" alt="${book.name}">
                    <div class="card-body">
                        <h5 class="card-title">${book.name}</h5>
                        <p class="card-text">Author: ${book.author}</p>
                        <button class="addToBookListBtn" data-book-id="${book.id}">Add Book to Booklist</button>  
                    </div>
                </div>
            </div>
        `);

        bookListContainer.innerHTML = bookCardsHTML.join('');
        
        const addToBookListButtons = document.querySelectorAll('.addToBookListBtn');
        addToBookListButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const bookId = button.getAttribute('data-book-id');
                const username = localStorage.getItem('username');
                if (username) {
                    await addToBooklist(username, bookId);
                } else {
                    console.error('User not logged in');
                }
            });
        });
    } catch (error) {
        console.error('Error updating book list:', error);
    }
}

$('#books-tab').on('shown.bs.tab', updateBookList);
updateBookList()



document.getElementById('addBookForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newBook = {
        id: formData.get('bookid'),
        title: formData.get('title'),
        author: formData.get('author'),
        description: formData.get('description')
    };

    try {
        const response = await fetch('http://localhost:3001/api/book/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (response.ok) {
            event.target.reset();
            await fetchAndDisplayBooks(); 
        } else {
            console.error('Error adding book:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding book:', error);
    }
});

async function fetchAndDisplayBooks() {
    try {
        const response = await fetch('http://localhost:3001/api/book/allbooks');
        const books = await response.json();

        const bookListContainer = document.getElementById('all-books');
        bookListContainer.innerHTML = ''; 

        books.forEach(book => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');

            const cardContent = `
                <div class="card">
                    <img src="${book.coverImage || 'default-book-image.jpg'}" class="card-img-top" alt="${book.name}">
                    <div class="card-body">
                        <h5 class="card-title">${book.name}</h5>
                        <p class="card-text">Author: ${book.author}</p>
                    </div>
                </div>
            `;

            card.innerHTML = cardContent;
            bookListContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching and displaying books:', error);
    }
}

async function fetchAndDisplayUserBooks(username) {
    try {
        const response = await fetch(`http://localhost:3001/api/user/books/${username}`);

        if (!response.ok) {
            throw new Error('Failed to fetch user books');
        }

        const data = await response.json();

        if (data.success) {
            const userBooks = data.books;
            const bookListContainer = document.getElementById('book-list');

            // Clear the container first
            bookListContainer.innerHTML = '';

            userBooks.forEach((book) => {
                const card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-4');

                card.innerHTML = `
                    <div class="card">
                        <img src="${book.coverImage || './img/images.jpg'}" class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">Author: ${book.author}</p>
                            <p class="card-text">id: ${book.id}</p>
                            <p class="card-text">description: ${book.description}</p>
                        </div>
                    </div>
                `;

                bookListContainer.appendChild(card);
            });
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error fetching and displaying user books:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username'); 
    if (username) {
        fetchAndDisplayUserBooks(username);
    } else {
        console.error('User not logged in');
    }
});


async function fetchAndDisplayBooks() {
    try {
        const response = await fetch('http://localhost:3001/api/book/allbooks');

        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const books = await response.json();

        const bookListContainer = document.getElementById('all-books'); 
        bookListContainer.innerHTML = ''; 
        console.log(books)
        books.forEach(book => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');

            card.innerHTML = `
            <div class="card">
            <img src="${book.coverImage || ' ./img/images.jpg'}"class="card-img-top" alt="${book.title}">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">Author: ${book.author}</p>
                <p class="card-text">id: ${book.id}</p>
                <p class="card-text">description: ${book.description}<p>
                <button class="btn btn-primary add-to-cart-btn" data-book-id="${book.id}">Add to Cart</button>
            </div>
        </div>
       
    `;
            card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
                const bookId = book.id; 
                const username = localStorage.getItem('username');
                if (username) {
                    addToBooklist(bookId,username); 
                } else {
                    console.error('User not logged in');
                }
            });
            

            bookListContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching and displaying books:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayBooks);





document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.btn btn-primary add-to-cart-btn'); 
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            const bookId = event.target.getAttribute('data-book-id');
            const username = localStorage.getItem('username'); 

            if (!username) {
                console.error('User not logged in');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3001/api/book/:username`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: bookId }), 
                });

                const data = await response.json();

                if (data.success) {
                    console.log('Book added to user book list:', data.book);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error adding book to user book list:', error);
            }
        });
    });
});

// user can add new book to the user book list

async function addToBooklist(bookId,username) {
    
    if (!username) {
        console.error('User not logged in');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/api/book/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: bookId }), 
        });

        const data = await response.json();

        if (data.message === 'Book added to the user\'s collection') {
            console.log('Book added to the user\'s collection');
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error adding book to the user\'s collection:', error);
    }
}

document.getElementById('addBookButton').addEventListener('click', addBookToCollection);
