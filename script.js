document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const loginType = document.getElementById('loginType').value;
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    if (loginType === 'admin') {
        if (userId === 'admin' && password === 'admin123') {
            window.location.href = 'admin.html';
        } else {
            alert('Invalid Admin credentials');
        }
    } else if (loginType === 'underwriter') {
        if (checkUnderwriterCredentials(userId, password)) {
            window.location.href = 'underwriter.html';
        } else {
            alert('Invalid Underwriter credentials');
        }
    }
});

// Admin functionalities
function showUnderwriterRegistration() {
    document.getElementById('adminContent').innerHTML = `
        <h2>Underwriter Registration</h2>
        <form id="registerUnderwriterForm">
            <div class="input-group">
                <label for="underwriterId">Underwriter ID</label>
                <input type="text" id="underwriterId" name="underwriterId" value="${generateUnderwriterId()}" readonly>
            </div>
            <div class="input-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" maxlength="50" required>
            </div>
            <div class="input-group">
                <label for="dob">DOB</label>
                <input type="date" id="dob" name="dob" required>
            </div>
            <div class="input-group">
                <label for="joiningDate">Joining Date</label>
                <input type="date" id="joiningDate" name="joiningDate" required>
            </div>
            <div class="input-group">
                <label for="defaultPassword">Default Password</label>
                <input type="password" id="defaultPassword" name="defaultPassword" required>
            </div>
            <button type="submit" class="login-btn">Register</button>
        </form>
    `;
    document.getElementById('registerUnderwriterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        registerUnderwriter();
    });
}

function showSearchUnderwriter() {
    document.getElementById('adminContent').innerHTML = `
        <h2>Search Underwriter by ID</h2>
        <div class="input-group">
            <label for="searchUnderwriterId">Underwriter ID</label>
            <input type="text" id="searchUnderwriterId" name="searchUnderwriterId" required>
        </div>
        <button class="login-btn" onclick="searchUnderwriter()">Search</button>
        <div id="searchResult"></div>
    `;
}

function showUpdatePassword() {
    document.getElementById('adminContent').innerHTML = `
        <h2>Update Underwriter Password</h2>
        <div class="input-group">
            <label for="updateUnderwriterId">Underwriter ID</label>
            <input type="text" id="updateUnderwriterId" name="updateUnderwriterId" required>
        </div>
        <div class="input-group">
            <label for="newPassword">New Password</label>
            <input type="password" id="newPassword" name="newPassword" required>
        </div>
        <button class="login-btn" onclick="updateUnderwriterPassword()">Update</button>
    `;
}

function showDeleteUnderwriter() {
    document.getElementById('adminContent').innerHTML = `
        <h2>Delete Underwriter by ID</h2>
        <div class="input-group">
            <label for="deleteUnderwriterId">Underwriter ID</label>
            <input type="text" id="deleteUnderwriterId" name="deleteUnderwriterId" required>
        </div>
        <button class="login-btn" onclick="deleteUnderwriter()">Delete</button>
    `;
}

function viewAllUnderwriters() {
    let underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
    let content = `
        <h2>All Underwriters</h2>
        <table>
            <tr>
                <th>Underwriter ID</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Joining Date</th>
            </tr>
    `;
    underwriters.forEach(u => {
        content += `
            <tr>
                <td>${u.underwriterId}</td>
                <td>${u.name}</td>
                <td>${u.dob}</td>
                <td>${u.joiningDate}</td>
            </tr>
        `;
    });
    content += '</table>';
    document.getElementById('adminContent').innerHTML = content;
}

// Underwriter functionalities
function showCreateInsurance() {
    document.getElementById('underwriterContent').innerHTML = `
        <h2>Create New Vehicle Insurance</h2>
        <form id="createInsuranceForm">
            <div class="input-group">
                <label for="vehicleNo">Vehicle No</label>
                <input type="text" id="vehicleNo" name="vehicleNo" maxlength="10" required>
            </div>
            <div class="input-group">
                <label for="vehicleType">Vehicle Type</label>
                <select id="vehicleType" name="vehicleType" required>
                    <option value="2-wheeler">2-wheeler</option>
                    <option value="4-wheeler">4-wheeler</option>
                </select>
            </div>
            <div class="input-group">
                <label for="customerName">Customer Name</label>
                <input type="text" id="customerName" name="customerName" maxlength="50" required>
            </div>
            <div class="input-group">
                <label for="engineNo">Engine No</label>
                <input type="number" id="engineNo" name="engineNo" required>
            </div>
            <div class="input-group">
                <label for="chasisNo">Chasis No</label>
                <input type="number" id="chasisNo" name="chasisNo" required>
            </div>
            <div class="input-group">
                <label for="phoneNo">Phone No</label>
                <input type="number" id="phoneNo" name="phoneNo" required>
            </div>
            <div class="input-group">
                <label for="premiumAmnt">Premium Amount</label>
                <input type="number" id="premiumAmnt" name="premiumAmnt" required>
            </div>
            <div class="input-group">
                <label for="insuranceType">Type</label>
                <select id="insuranceType" name="insuranceType" required>
                    <option value="Full Insurance">Full Insurance</option>
                    <option value="ThirdParty">ThirdParty</option>
                </select>
            </div>
            <div class="input-group">
                <label for="fromDate">From Date</label>
                <input type="date" id="fromDate" name="fromDate" required>
            </div>
            <div class="input-group">
                <label for="toDate">To Date</label>
                <input type="date" id="toDate" name="toDate" required>
            </div>
            <div class="input-group">
                <label for="underwriterId">Underwriter ID</label>
                <input type="text" id="underwriterId" name="underwriterId" required>
            </div>
            <button type="submit" class="login-btn">Create</button>
        </form>
    `;
    document.getElementById('createInsuranceForm').addEventListener('submit', function(event) {
        event.preventDefault();
        createInsurance();
    });
}

function createInsurance() {
    const insurance = {
        vehicleNo: document.getElementById('vehicleNo').value,
        vehicleType: document.getElementById('vehicleType').value,
        customerName: document.getElementById('customerName').value,
        engineNo: document.getElementById('engineNo').value,
        chasisNo: document.getElementById('chasisNo').value,
        phoneNo: document.getElementById('phoneNo').value,
        premiumAmnt: document.getElementById('premiumAmnt').value,
        insuranceType: document.getElementById('insuranceType').value,
        fromDate: document.getElementById('fromDate').value,
        toDate: document.getElementById('toDate').value,
        underwriterId: document.getElementById('underwriterId').value
    };
    
    // Get existing insurance data from localStorage
    let insurances = JSON.parse(localStorage.getItem('insurances')) || [];
    
    // Add new insurance
    insurances.push(insurance);
    
    // Save updated insurance data back to localStorage
    localStorage.setItem('insurances', JSON.stringify(insurances));
    
    alert('Vehicle insurance created successfully');
    
    // Clear the form or redirect as needed
    document.getElementById('underwriterContent').innerHTML = '';
}

// Utility functions
function checkUnderwriterCredentials(userId, password) {
    let underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
    return underwriters.some(u => u.underwriterId === userId && u.defaultPassword === password);
}

function generateUnderwriterId() {
    let underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
    return 'UW' + (underwriters.length + 1).toString().padStart(3, '0');
}

function registerUnderwriter() {
    let underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
    const underwriter = {
        underwriterId: document.getElementById('underwriterId').value,
        name: document.getElementById('name').value,
        dob: document.getElementById('dob').value,
        joiningDate: document.getElementById('joiningDate').value,
        defaultPassword: document.getElementById('defaultPassword').value
    };
    underwriters.push(underwriter);
    localStorage.setItem('underwriters', JSON.stringify(underwriters));
    alert('Underwriter registered successfully');
    document.getElementById('adminContent').innerHTML = '';
}

function searchUnderwriter() {
    const searchId = document.getElementById('searchUnderwriterId').value;
    let underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
    const underwriter = underwriters.find(u => u.underwriterId === searchId);
    if (underwriter) {
        document.getElementById('searchResult').innerHTML = `
            <p><strong>ID:</strong> ${underwriter.underwriterId}</p>
            <p><strong>Name:</strong> ${underwriter.name}</p>
            <p><strong>DOB:</strong> ${underwriter.dob}</p>
            <p><strong>Joining Date:</strong> ${underwriter.joiningDate}</p>
        `;
    } else {
        document.getElementById('searchResult').innerHTML = '<p>No underwriter found with this ID.</p>';
    }
}

function updateUnderwriterPassword() {
    const id = document.getElementById('updateUnderwriterId').value;
    const newPassword = document.getElementById('newPassword').value;
    let underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
    const underwriter = underwriters.find(u => u.underwriterId === id);
    if (underwriter) {
        underwriter.defaultPassword = newPassword;
        localStorage.setItem('underwriters', JSON.stringify(underwriters));
        alert('Password updated successfully');
    } else {
        alert('Underwriter ID not found');
    }
}

function deleteUnderwriter() {
    const id = document.getElementById('deleteUnderwriterId').value;
    let underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
    underwriters = underwriters.filter(u => u.underwriterId !== id);
    localStorage.setItem('underwriters', JSON.stringify(underwriters));
    alert('Underwriter deleted successfully');
}

function showCreateInsurance() {
    document.getElementById('underwriterContent').innerHTML = `
        <h2>Create New Vehicle Insurance</h2>
        <form id="createInsuranceForm">
            <div class="input-group">
                <label for="vehicleNo">Vehicle No</label>
                <input type="text" id="vehicleNo" name="vehicleNo" maxlength="10" required>
            </div>
            <div class="input-group">
                <label for="vehicleType">Vehicle Type</label>
                <select id="vehicleType" name="vehicleType" required>
                    <option value="2-wheeler">2-wheeler</option>
                    <option value="4-wheeler">4-wheeler</option>
                </select>
            </div>
            <div class="input-group">
                <label for="customerName">Customer Name</label>
                <input type="text" id="customerName" name="customerName" maxlength="50" required>
            </div>
            <div class="input-group">
                <label for="engineNo">Engine No</label>
                <input type="number" id="engineNo" name="engineNo" required>
            </div>
            <div class="input-group">
                <label for="chasisNo">Chasis No</label>
                <input type="number" id="chasisNo" name="chasisNo" required>
            </div>
            <div class="input-group">
                <label for="phoneNo">Phone No</label>
                <input type="number" id="phoneNo" name="phoneNo" required>
            </div>
            <div class="input-group">
                <label for="premiumAmnt">Premium Amount</label>
                <input type="number" id="premiumAmnt" name="premiumAmnt" required>
            </div>
            <div class="input-group">
                <label for="insuranceType">Type</label>
                <select id="insuranceType" name="insuranceType" required>
                    <option value="Full Insurance">Full Insurance</option>
                    <option value="ThirdParty">ThirdParty</option>
                </select>
            </div>
            <div class="input-group">
                <label for="fromDate">From Date</label>
                <input type="date" id="fromDate" name="fromDate" required>
            </div>
            <div class="input-group">
                <label for="toDate">To Date</label>
                <input type="date" id="toDate" name="toDate" required>
            </div>
            <button type="submit" class="login-btn">Create</button>
        </form>
    `;
    document.getElementById('createInsuranceForm').addEventListener('submit', function(event) {
        event.preventDefault();
        createInsurance();
    });
}

function showViewInsurance() {
    document.getElementById('underwriterContent').innerHTML = `
        <h2>View All Insurance Records</h2>
        <div id="insuranceList"></div>
    `;
    viewInsuranceRecords();
}

// Utility functions
function checkUnderwriterCredentials(userId, password) {
    let underwriters = JSON.parse(localStorage.getItem('underwriters')) || [];
    return underwriters.some(u => u.underwriterId === userId && u.defaultPassword === password);
}

function createInsurance() {
    let insuranceRecords = JSON.parse(localStorage.getItem('insuranceRecords')) || [];
    const insurance = {
        vehicleNo: document.getElementById('vehicleNo').value,
        vehicleType: document.getElementById('vehicleType').value,
        customerName: document.getElementById('customerName').value,
        engineNo: document.getElementById('engineNo').value,
        chasisNo: document.getElementById('chasisNo').value,
        phoneNo: document.getElementById('phoneNo').value,
        premiumAmnt: document.getElementById('premiumAmnt').value,
        insuranceType: document.getElementById('insuranceType').value,
        fromDate: document.getElementById('fromDate').value,
        toDate: document.getElementById('toDate').value,
        underwriterId: localStorage.getItem('currentUnderwriter') // Associate insurance with the current underwriter
    };
    insuranceRecords.push(insurance);
    localStorage.setItem('insuranceRecords', JSON.stringify(insuranceRecords));
    alert('Insurance record created successfully');
    document.getElementById('underwriterContent').innerHTML = '';
}

function viewInsuranceRecords() {
    const underwriterId = localStorage.getItem('currentUnderwriter');
    let insuranceRecords = JSON.parse(localStorage.getItem('insuranceRecords')) || [];
    insuranceRecords = insuranceRecords.filter(record => record.underwriterId === underwriterId);
    
    let content = `
        <table>
            <tr>
                <th>Vehicle No</th>
                <th>Vehicle Type</th>
                <th>Customer Name</th>
                <th>Engine No</th>
                <th>Chasis No</th>
                <th>Phone No</th>
                <th>Premium Amount</th>
                <th>Insurance Type</th>
                <th>From Date</th>
                <th>To Date</th>
            </tr>
    `;
    insuranceRecords.forEach(record => {
        content += `
            <tr>
                <td>${record.vehicleNo}</td>
                <td>${record.vehicleType}</td>
                <td>${record.customerName}</td>
                <td>${record.engineNo}</td>
                <td>${record.chasisNo}</td>
                <td>${record.phoneNo}</td>
                <td>${record.premiumAmnt}</td>
                <td>${record.insuranceType}</td>
                <td>${record.fromDate}</td>
                <td>${record.toDate}</td>
            </tr>
        `;
    });
    content += '</table>';
    document.getElementById('insuranceList').innerHTML = content;
}

function logout() {
    window.location.href = 'index.html';
}