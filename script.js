 // Menu Data
 const menuItems = [
    {
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with herbs and lemon",
        price: "$28",
        image: "https://www.wholesomeyum.com/wp-content/uploads/2023/05/wholesomeyum-Grilled-Salmon-10.jpg"
    },
    {
        name: "Beef Tenderloin",
        description: "Premium cut with red wine reduction",
        price: "$34",
        image: "https://www.bhg.com/thmb/X4qTQF6NbyxfJlsr-_X573Kln10=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/BHG-Oven-Roasted-Beef-Tenderloin-Hero-01-Cls-oAkXakl89T3Rlj4WpA-07053697c4044996a3b2e73c380f6062.jpg"
    },
    {
        name: "Mushroom Risotto",
        description: "Creamy Arborio rice with wild mushrooms",
        price: "$24",
        image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/mushroom-risotto.jpg"
    }
];

// Gallery Data
const galleryImages = [
    "https://cdn.sortiraparis.com/images/61/100789/834067-too-restaurant-too-hotel-paris-photos-menu.jpg",
    "https://media.istockphoto.com/id/1081422898/photo/pan-fried-duck.jpg?s=612x612&w=0&k=20&c=kzlrX7KJivvufQx9mLd-gMiMHR6lC2cgX009k9XO6VA=",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    "https://cavendishhotelbaslow.co.uk/wp-content/uploads/2024/07/Afternoon-Tea-The-Gallery-Restaurant-The-Cavendish-Hotel-Baslow-AB-2024-Feb-42-683x1024.jpg",
    "https://thefreshcollective.com.au/web/assets/img/003_AGNSW_Cafe_credit_Anna_Kucera-1_2021-11-17-221219_jnqm.jpg",
    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600"
];

// Populate Menu
const menuGrid = document.querySelector('.menu-grid');
menuItems.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-item-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">${item.price}</span>
        </div>
    `;
    menuGrid.appendChild(menuItem);
});

// Populate Gallery
const galleryGrid = document.querySelector('.gallery-grid');
galleryImages.forEach(image => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `<img src="${image}" alt="Gallery image">`;
    galleryGrid.appendChild(galleryItem);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

const modal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const closeModal = document.querySelector('.close-modal');
const bookButton = document.querySelector('.cta-button');
const timeSlots = document.getElementById('timeSlots');

// Available time slots
const availableTimeSlots = [
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];

// Populate time slots
function populateTimeSlots() {
    timeSlots.innerHTML = '';
    availableTimeSlots.forEach(time => {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.textContent = time;
        slot.addEventListener('click', () => {
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
        });
        timeSlots.appendChild(slot);
    });
}

// Set minimum date to today
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').min = today;
}

// Open booking modal
bookButton.addEventListener('click', () => {
    modal.classList.add('active');
    setMinDate();
    populateTimeSlots();
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Handle form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get selected time
    const selectedTime = document.querySelector('.time-slot.selected');
    if (!selectedTime) {
        alert('Please select a time slot');
        return;
    }

    // Get form data
    const formData = {
        name: document.getElementById('bookingName').value,
        email: document.getElementById('bookingEmail').value,
        phone: document.getElementById('bookingPhone').value,
        date: document.getElementById('bookingDate').value,
        time: selectedTime.textContent,
        guests: document.getElementById('bookingGuests').value,
        notes: document.getElementById('bookingNotes').value
    };

    // In a real application, you would send this data to your server
    console.log('Booking Details:', formData);

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your booking! We will confirm your reservation shortly.';
    
    bookingForm.innerHTML = '';
    bookingForm.appendChild(successMessage);

    // Close modal after 3 seconds
    setTimeout(() => {
        modal.classList.remove('active');
        // Reset form
        bookingForm.reset();
        // Restore form content
        setTimeout(() => {
            bookingForm.innerHTML = bookingForm.defaultHTML;
            populateTimeSlots();
        }, 500);
    }, 3000);
});

// Store the original form HTML for reset
bookingForm.defaultHTML = bookingForm.innerHTML;