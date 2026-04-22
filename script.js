// Smooth Scrolling & Navbar Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // Trigger on load

// Mobile Menu Toggle (Simplified)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        // This is a placeholder for actual mobile menu logic
        alert("모바일 메뉴는 추후 업데이트 예정입니다.");
    });
}

// Robot Hand Mouse Follow Effect
const robotHand = document.getElementById('robot-hand');
const homeSection = document.getElementById('home');

if (robotHand && homeSection) {
    homeSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { width, height } = homeSection.getBoundingClientRect();
        
        // Calculate normalized position (-1 to 1)
        const xPos = (clientX / width - 0.5) * 2;
        const yPos = (clientY / height - 0.5) * 2;
        
        // Apply 3D rotation and translation
        // rotateX uses Y mouse position, rotateY uses X mouse position
        const rotateY = xPos * 8; // Max 8 degrees
        const rotateX = -yPos * 5; // Max 5 degrees
        const translateX = xPos * -15; // Subtle movement
        const translateY = yPos * -10;
        
        robotHand.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${translateX}px, ${translateY}px)`;
    });
    
    // Reset position when mouse leaves the hero section
    homeSection.addEventListener('mouseleave', () => {
        robotHand.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)`;
    });
}
