// Global variables
let currentCategory = '';
let currentData = [];
let formModal;
let detailModal;

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap modals
    formModal = new bootstrap.Modal(document.getElementById('formModal'));
    detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
    
    // Set up form submission handler
    document.getElementById('itemForm').addEventListener('submit', handleFormSubmit);
});

// Load data from the API based on the selected category
async function loadData(category) {
    currentCategory = category;
    let endpoint = '';
    let title = '';
    
    // Set the appropriate API endpoint and title based on the category
    switch(category) {
        case 'toys':
            endpoint = '/api/v1/toys';
            title = 'Toys Collection';
            break;
        case 'players':
            endpoint = '/api/v1/players';
            title = 'Players Roster';
            break;
        case 'people':
            endpoint = '/api/v1/people';
            title = 'People Database';
            break;
        default:
            console.error('Invalid category');
            return;
    }
    
    // Update the title
    document.getElementById('data-title').textContent = title;
    
    try {
        // Fetch data from the API
        const response = await fetch(endpoint);
        const result = await response.json();
        
        if (result.status === 'success') {
            currentData = result.data;
            displayData(category, result.data);
        } else {
            showError('Failed to load data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        showError('Error connecting to the server');
    }
}

// Display the data in the UI
function displayData(category, data) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    
    if (!data || data.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><p>No data available</p></div>';
        return;
    }
    
    // Create a card for each item based on the category
    data.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-lg-3 mb-4';
        
        let cardContent = '';
        
        switch(category) {
            case 'toys':
                cardContent = createToyCard(item);
                break;
            case 'players':
                cardContent = createPlayerCard(item);
                break;
            case 'people':
                cardContent = createPersonCard(item);
                break;
        }
        
        col.innerHTML = cardContent;
        container.appendChild(col);
        
        // Add click event to show details
        col.querySelector('.data-item').addEventListener('click', () => {
            showItemDetails(category, item);
        });
    });
}

// Create HTML for a toy card
function createToyCard(toy) {
    return `
        <div class="card data-item toy-card">
            <div class="card-body">
                <h5 class="card-title">${toy.name || 'Unnamed Toy'}</h5>
                <p class="card-text">${toy.description || 'No description'}</p>
                <p class="toy-price">$${toy.price?.toFixed(2) || '0.00'}</p>
            </div>
        </div>
    `;
}

// Create HTML for a player card
function createPlayerCard(player) {
    return `
        <div class="card data-item player-card">
            <div class="card-body">
                <h5 class="player-name">${player.firstname || ''} ${player.lastname || ''}</h5>
                <p class="card-text">Age: ${player.age || 'N/A'}</p>
                <p class="player-team">${player.Team || player.team || 'No Team'}</p>
            </div>
        </div>
    `;
}

// Create HTML for a person card
function createPersonCard(person) {
    // Format dates
    const birthDate = person.birth ? new Date(person.birth).toLocaleDateString() : 'Unknown';
    const deathDate = person.death ? new Date(person.death).toLocaleDateString() : 'Unknown';
    
    // Format contributions
    const contribs = person.contribs && person.contribs.length > 0
        ? person.contribs.map(c => `<span class="badge bg-secondary">${c}</span>`).join(' ')
        : '<span class="badge bg-light text-dark">No contributions</span>';
    
    return `
        <div class="card data-item person-card">
            <div class="card-body">
                <h5 class="person-name">${person.name?.first || ''} ${person.name?.last || ''}</h5>
                <p class="person-dates">${birthDate} - ${deathDate}</p>
                <p class="card-text">Views: ${person.views || 0}</p>
                <div class="person-contribs">${contribs}</div>
            </div>
        </div>
    `;
}

// Show details of a specific item
function showItemDetails(category, item) {
    const modalTitle = document.getElementById('detailModalTitle');
    const modalBody = document.getElementById('detailModalBody');
    const editBtn = document.getElementById('editItemBtn');
    
    // Set the title based on the category
    switch(category) {
        case 'toys':
            modalTitle.textContent = `Toy: ${item.name || 'Unnamed'}`;
            break;
        case 'players':
            modalTitle.textContent = `Player: ${item.firstname || ''} ${item.lastname || ''}`;
            break;
        case 'people':
            modalTitle.textContent = `Person: ${item.name?.first || ''} ${item.name?.last || ''}`;
            break;
    }
    
    // Create the detail content based on the category
    let detailContent = '<div class="container-fluid">';
    
    switch(category) {
        case 'toys':
            detailContent += `
                <div class="row mb-3">
                    <div class="col-4 fw-bold">ID:</div>
                    <div class="col-8">${item.id || 'N/A'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Name:</div>
                    <div class="col-8">${item.name || 'N/A'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Description:</div>
                    <div class="col-8">${item.description || 'N/A'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Price:</div>
                    <div class="col-8">$${item.price?.toFixed(2) || '0.00'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Picture:</div>
                    <div class="col-8">${item.picture || 'N/A'}</div>
                </div>
            `;
            break;
        case 'players':
            detailContent += `
                <div class="row mb-3">
                    <div class="col-4 fw-bold">ID:</div>
                    <div class="col-8">${item.id || 'N/A'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">First Name:</div>
                    <div class="col-8">${item.firstname || 'N/A'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Last Name:</div>
                    <div class="col-8">${item.lastname || 'N/A'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Age:</div>
                    <div class="col-8">${item.age || 'N/A'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Team:</div>
                    <div class="col-8">${item.Team || item.team || 'N/A'}</div>
                </div>
            `;
            break;
        case 'people':
            // Format dates
            const birthDate = item.birth ? new Date(item.birth).toLocaleDateString() : 'Unknown';
            const deathDate = item.death ? new Date(item.death).toLocaleDateString() : 'Unknown';
            
            // Format contributions
            const contribs = item.contribs && item.contribs.length > 0
                ? item.contribs.map(c => `<span class="badge bg-secondary">${c}</span>`).join(' ')
                : '<span class="badge bg-light text-dark">No contributions</span>';
            
            detailContent += `
                <div class="row mb-3">
                    <div class="col-4 fw-bold">ID:</div>
                    <div class="col-8">${item._id || 'N/A'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">First Name:</div>
                    <div class="col-8">${item.name?.first || 'N/A'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Last Name:</div>
                    <div class="col-8">${item.name?.last || 'N/A'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Birth Date:</div>
                    <div class="col-8">${birthDate}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Death Date:</div>
                    <div class="col-8">${deathDate}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Views:</div>
                    <div class="col-8">${item.views || '0'}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-4 fw-bold">Contributions:</div>
                    <div class="col-8">${contribs}</div>
                </div>
            `;
            break;
    }
    
    detailContent += '</div>';
    modalBody.innerHTML = detailContent;
    
    // Set up the edit button
    editBtn.onclick = () => {
        detailModal.hide();
        showEditForm(item);
    };
    
    // Show the modal
    detailModal.show();
}

// Show the form to add a new item
function showAddForm() {
    if (!currentCategory) {
        alert('Please select a category first');
        return;
    }
    
    document.getElementById('formModalTitle').textContent = `Add New ${currentCategory.slice(0, -1)}`;
    
    // Clear the form
    const formFields = document.getElementById('formFields');
    formFields.innerHTML = '';
    
    // Create form fields based on the category
    switch(currentCategory) {
        case 'toys':
            formFields.innerHTML = `
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name="name" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" name="description" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="number" class="form-control" id="price" name="price" step="0.01" min="0" required>
                </div>
                <div class="mb-3">
                    <label for="picture" class="form-label">Picture</label>
                    <input type="text" class="form-control" id="picture" name="picture">
                </div>
            `;
            break;
        case 'players':
            formFields.innerHTML = `
                <div class="mb-3">
                    <label for="firstname" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="firstname" name="firstname" required>
                </div>
                <div class="mb-3">
                    <label for="lastname" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lastname" name="lastname" required>
                </div>
                <div class="mb-3">
                    <label for="age" class="form-label">Age</label>
                    <input type="number" class="form-control" id="age" name="age" min="0">
                </div>
                <div class="mb-3">
                    <label for="team" class="form-label">Team</label>
                    <input type="text" class="form-control" id="team" name="team">
                </div>
            `;
            break;
        case 'people':
            formFields.innerHTML = `
                <div class="mb-3">
                    <label for="firstName" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="firstName" name="firstName" required>
                </div>
                <div class="mb-3">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lastName" name="lastName" required>
                </div>
                <div class="mb-3">
                    <label for="birth" class="form-label">Birth Date</label>
                    <input type="date" class="form-control" id="birth" name="birth" required>
                </div>
                <div class="mb-3">
                    <label for="death" class="form-label">Death Date</label>
                    <input type="date" class="form-control" id="death" name="death" required>
                </div>
                <div class="mb-3">
                    <label for="contribs" class="form-label">Contributions (comma separated)</label>
                    <input type="text" class="form-control" id="contribs" name="contribs">
                </div>
                <div class="mb-3">
                    <label for="views" class="form-label">Views</label>
                    <input type="number" class="form-control" id="views" name="views" min="0" required>
                </div>
            `;
            break;
    }
    
    // Set the form to add mode
    document.getElementById('itemForm').dataset.mode = 'add';
    document.getElementById('itemForm').dataset.id = '';
    
    // Show the modal
    formModal.show();
}

// Show the form to edit an existing item
function showEditForm(item) {
    document.getElementById('formModalTitle').textContent = `Edit ${currentCategory.slice(0, -1)}`;
    
    // Clear the form
    const formFields = document.getElementById('formFields');
    formFields.innerHTML = '';
    
    // Create form fields based on the category and fill with item data
    switch(currentCategory) {
        case 'toys':
            formFields.innerHTML = `
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name="name" value="${item.name || ''}" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" name="description" rows="3">${item.description || ''}</textarea>
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input type="number" class="form-control" id="price" name="price" step="0.01" min="0" value="${item.price || 0}" required>
                </div>
                <div class="mb-3">
                    <label for="picture" class="form-label">Picture</label>
                    <input type="text" class="form-control" id="picture" name="picture" value="${item.picture || ''}">
                </div>
            `;
            break;
        case 'players':
            formFields.innerHTML = `
                <div class="mb-3">
                    <label for="firstname" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="firstname" name="firstname" value="${item.firstname || ''}" required>
                </div>
                <div class="mb-3">
                    <label for="lastname" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lastname" name="lastname" value="${item.lastname || ''}" required>
                </div>
                <div class="mb-3">
                    <label for="age" class="form-label">Age</label>
                    <input type="number" class="form-control" id="age" name="age" min="0" value="${item.age || ''}">
                </div>
                <div class="mb-3">
                    <label for="team" class="form-label">Team</label>
                    <input type="text" class="form-control" id="team" name="team" value="${item.Team || item.team || ''}">
                </div>
            `;
            break;
        case 'people':
            // Format dates for input fields
            const birthDate = item.birth ? new Date(item.birth).toISOString().split('T')[0] : '';
            const deathDate = item.death ? new Date(item.death).toISOString().split('T')[0] : '';
            
            // Format contributions
            const contribs = item.contribs && item.contribs.length > 0 ? item.contribs.join(', ') : '';
            
            formFields.innerHTML = `
                <div class="mb-3">
                    <label for="firstName" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="firstName" name="firstName" value="${item.name?.first || ''}" required>
                </div>
                <div class="mb-3">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lastName" name="lastName" value="${item.name?.last || ''}" required>
                </div>
                <div class="mb-3">
                    <label for="birth" class="form-label">Birth Date</label>
                    <input type="date" class="form-control" id="birth" name="birth" value="${birthDate}" required>
                </div>
                <div class="mb-3">
                    <label for="death" class="form-label">Death Date</label>
                    <input type="date" class="form-control" id="death" name="death" value="${deathDate}" required>
                </div>
                <div class="mb-3">
                    <label for="contribs" class="form-label">Contributions (comma separated)</label>
                    <input type="text" class="form-control" id="contribs" name="contribs" value="${contribs}">
                </div>
                <div class="mb-3">
                    <label for="views" class="form-label">Views</label>
                    <input type="number" class="form-control" id="views" name="views" min="0" value="${item.views || 0}" required>
                </div>
            `;
            break;
    }
    
    // Set the form to edit mode
    document.getElementById('itemForm').dataset.mode = 'edit';
    document.getElementById('itemForm').dataset.id = item.id || item._id;
    
    // Show the modal
    formModal.show();
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const mode = form.dataset.mode;
    const id = form.dataset.id;
    
    // Prepare the data based on the category
    let data = {};
    let endpoint = '';
    
    switch(currentCategory) {
        case 'toys':
            data = {
                name: formData.get('name'),
                description: formData.get('description'),
                price: parseFloat(formData.get('price')),
                picture: formData.get('picture')
            };
            endpoint = `/api/v1/toys${mode === 'edit' ? `/${id}` : ''}`;
            break;
        case 'players':
            data = {
                firstname: formData.get('firstname'),
                lastname: formData.get('lastname'),
                age: formData.get('age') ? parseInt(formData.get('age')) : undefined,
                team: formData.get('team')
            };
            endpoint = `/api/v1/players${mode === 'edit' ? `/${id}` : ''}`;
            break;
        case 'people':
            // Parse contributions
            const contribsStr = formData.get('contribs');
            const contribs = contribsStr ? contribsStr.split(',').map(c => c.trim()).filter(c => c) : [];
            
            data = {
                name: {
                    first: formData.get('firstName'),
                    last: formData.get('lastName')
                },
                birth: formData.get('birth'),
                death: formData.get('death'),
                contribs: contribs,
                views: parseInt(formData.get('views'))
            };
            endpoint = `/api/v1/people${mode === 'edit' ? `/${id}` : ''}`;
            break;
    }
    
    try {
        // Send the request to the API
        const response = await fetch(endpoint, {
            method: mode === 'edit' ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            // Reload the data
            loadData(currentCategory);
            // Hide the modal
            formModal.hide();
        } else {
            showError('Failed to save data');
        }
    } catch (error) {
        console.error('Error saving data:', error);
        showError('Error connecting to the server');
    }
}

// Show an error message
function showError(message) {
    const container = document.getElementById('data-container');
    container.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger" role="alert">
                ${message}
            </div>
        </div>
    `;
}
