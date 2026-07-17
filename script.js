// ==========================================
// PRELOADER ANIMATION FADE-OUT
// ==========================================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.transition = "opacity 0.5s ease";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 1500);
    }
});

// ==========================================
// MOBILE MENU MECHANICS
// ==========================================
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Automatically close the mobile menu drawer when clicking a link
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

// ==========================================
// BACK TO TOP BUTTON BEHAVIOR
// ==========================================
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (topBtn) {
        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }
});

if (topBtn) {
    topBtn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}

// ==========================================
// DYNAMIC NAVBAR BACKGROUND SWAP ON SCROLL
// ==========================================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = "#23432D";
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
        } else {
            // Reverts to the elegant clear green glass style at the peak top
            navbar.style.background = "rgba(23, 43, 30, 0.75)";
            navbar.style.boxShadow = "none";
        }
    }
});

// ==========================================
// SMART SMART DATE VALIDATION
// ==========================================
const checkInInput = document.getElementById("check_in");
const checkOutInput = document.getElementById("check_out");

// Prevent picking past dates
const today = new Date().toISOString().split('T')[0];
if(checkInInput) checkInInput.min = today;

if(checkInInput && checkOutInput) {
    checkInInput.addEventListener("change", () => {
        checkOutInput.min = checkInInput.value;
    });
}

// ==========================================
// POPUP MODAL LOGIC
// ==========================================
const modal = document.getElementById("bookingModal");
const openModalBtn = document.getElementById("openPopupBtn");
const closeModalBtn = document.getElementById("closePopupBtn");
const popupCheckIn = document.getElementById("popup_check_in");
const popupCheckOut = document.getElementById("popup_check_out");

// Open Modal
if (openModalBtn && modal) {
    openModalBtn.addEventListener("click", () => {
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevents background page from scrolling
    });
}

// Close Modal functions
const closeModal = () => {
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = ""; // Re-enables background scrolling
    }
};

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
}

// Close Modal when clicking outside the container
if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Popup Date Verification Locks (Locks out past dates inside the modal)
if (popupCheckIn) popupCheckIn.min = today;

if (popupCheckIn && popupCheckOut) {
    popupCheckIn.addEventListener("change", () => {
        popupCheckOut.min = popupCheckIn.value;
    });
}

// ==========================================
// FAQ ACCORDION TOGGLE MECHANICS
// ==========================================
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const item = toggle.parentElement;
        
        // Toggle active class on the clicked item
        item.classList.toggle('active');
        
        // Switch the + and − icons dynamically
        const icon = toggle.querySelector('span');
        if (item.classList.contains('active')) {
            icon.innerText = '−';
        } else {
            icon.innerText = '+';
        }
    });
});

// ==========================================
// EMAILJS INTEGRATION (MULTI-FORM UPGRADE)
// ==========================================
(function() {
    emailjs.init({
        publicKey: "VvGplDVeP-yzN8o3b",
    });
})();

// Select both forms (the main page form and the popup modal form)
const forms = document.querySelectorAll('.booking-form');

forms.forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop page reload

        // Handle visual loading feedback on the clicked form's button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "Sending Request...";
        submitBtn.disabled = true;

        // Dispatches the active form inputs straight to your dashboard template configuration
        emailjs.sendForm('service_319q58r', 'template_zd4j4ah', this)
            .then(() => {
                alert("Booking request sent successfully! The Ghangaria Inn team will contact you shortly.");
                form.reset(); // Clear form fields
                
                // If this is the popup modal, close it
                if (form.classList.contains('popup-form')) {
                    closeModal();
                }
            }, (error) => {
                alert("Oops... Something went wrong. Please try again or reach out to us directly via WhatsApp.");
                console.error('EmailJS Error:', error);
            })
            .finally(() => {
                // Restore button back to normal
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
});
