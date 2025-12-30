// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Mobile Menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const closeMobileMenu = document.getElementById('close-mobile-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenuOverlay.classList.remove('hidden');
});

closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
    mobileMenuOverlay.classList.add('hidden');
});

mobileMenuOverlay.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
    mobileMenuOverlay.classList.add('hidden');
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        mobileMenuOverlay.classList.add('hidden');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Progress Indicator
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Events Data
const eventsData = [
    {
        title: "Tech Talk: AI & Machine Learning",
        date: "January 15, 2026",
        description: "Join us for an insightful session on the latest trends in AI and ML with industry experts.",
        image: "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=AI+Tech+Talk"
    },
    {
        title: "Arduino Workshop",
        date: "January 22, 2026",
        description: "Hands-on workshop where you'll build IoT projects using Arduino and various sensors.",
        image: "https://via.placeholder.com/400x300/06B6D4/FFFFFF?text=Arduino+Workshop"
    },
    {
        title: "Coding Competition",
        date: "February 5, 2026",
        description: "Test your programming skills in our annual coding competition with exciting prizes.",
        image: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=Coding+Competition"
    },
    {
        title: "Web Development Bootcamp",
        date: "February 12, 2026",
        description: "Intensive 3-day bootcamp covering modern web development technologies and frameworks.",
        image: "https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Web+Bootcamp"
    },
    {
        title: "IEEE Day Celebration",
        date: "October 1, 2026",
        description: "Celebrate IEEE Day with networking, presentations, and fun activities.",
        image: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=IEEE+Day"
    },
    {
        title: "Robotics Showcase",
        date: "March 20, 2026",
        description: "Exhibition of innovative robotics projects created by our talented members.",
        image: "https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Robotics+Showcase"
    }
];

// Populate Events
const eventsGrid = document.getElementById('events-grid');
eventsData.forEach((event, index) => {
    const eventCard = document.createElement('div');
    eventCard.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300';
    eventCard.setAttribute('data-aos', 'fade-up');
    eventCard.setAttribute('data-aos-delay', index * 100);
    
    eventCard.innerHTML = `
        <img src="${event.image}" alt="${event.title}" class="w-full h-48 object-cover">
        <div class="p-6">
            <div class="text-ieee-blue font-semibold text-sm mb-2">${event.date}</div>
            <h3 class="text-xl font-bold mb-3">${event.title}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">${event.description}</p>
            <button class="text-ieee-blue hover:text-ieee-blue-dark font-semibold transition-colors">
                Learn More <i class="fas fa-arrow-right ml-2"></i>
            </button>
        </div>
    `;
    
    eventsGrid.appendChild(eventCard);
});

// Member Spotlight Data
const spotlightData = [
    {
        name: "Ahmed Hassan",
        achievement: "Winner of National Robotics Competition 2025",
        description: "Ahmed led his team to victory in the national robotics competition with an innovative autonomous navigation system.",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Fatima Zahra",
        achievement: "Published Research in IEEE Journal",
        description: "Fatima's research on renewable energy systems was published in a prestigious IEEE journal at the age of 22.",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Usman Khalid",
        achievement: "Internship at Microsoft",
        description: "Secured a competitive internship position at Microsoft's Azure team, working on cloud infrastructure.",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Ayesha Malik",
        achievement: "Founder of Tech Startup",
        description: "Founded a successful EdTech startup that's now serving over 10,000 students across Pakistan.",
        image: "https://via.placeholder.com/150"
    }
];

// Populate Member Spotlight
const spotlightGrid = document.getElementById('spotlight-grid');
spotlightData.forEach((member, index) => {
    const spotlightCard = document.createElement('div');
    spotlightCard.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300';
    spotlightCard.setAttribute('data-aos', 'fade-up');
    spotlightCard.setAttribute('data-aos-delay', index * 100);
    
    spotlightCard.innerHTML = `
        <div class="flex items-start space-x-4">
            <img src="${member.image}" alt="${member.name}" class="w-20 h-20 rounded-full border-2 border-ieee-blue">
            <div class="flex-1">
                <h3 class="text-xl font-bold mb-1">${member.name}</h3>
                <p class="text-ieee-blue font-semibold text-sm mb-3">${member.achievement}</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm">${member.description}</p>
            </div>
        </div>
    `;
    
    spotlightGrid.appendChild(spotlightCard);
});

// Testimonials Data
const testimonialsData = [
    {
        name: "Ali Raza",
        role: "Alumni, Software Engineer at Google",
        text: "IEEE NUCES PWR shaped my career. The workshops and networking opportunities were invaluable.",
        image: "https://via.placeholder.com/100"
    },
    {
        name: "Sara Khan",
        role: "Current Member, CS Senior",
        text: "Being part of IEEE helped me develop both technical and leadership skills. The community is amazing!",
        image: "https://via.placeholder.com/100"
    },
    {
        name: "Hassan Mahmood",
        role: "Alumni, Robotics Engineer",
        text: "The hands-on projects and competitions prepared me for real-world engineering challenges.",
        image: "https://via.placeholder.com/100"
    },
    {
        name: "Zainab Ahmed",
        role: "Current Member, EE Junior",
        text: "IEEE provided me with mentorship and resources that accelerated my learning journey significantly.",
        image: "https://via.placeholder.com/100"
    },
    {
        name: "Imran Ali",
        role: "Alumni, Data Scientist",
        text: "The professional development courses offered by IEEE were instrumental in landing my dream job.",
        image: "https://via.placeholder.com/100"
    },
    {
        name: "Maryam Noor",
        role: "Current Member, CS Sophomore",
        text: "I love being part of a community that's passionate about technology and innovation!",
        image: "https://via.placeholder.com/100"
    }
];

// Populate Testimonials
const testimonialsGrid = document.getElementById('testimonials-grid');
testimonialsData.forEach((testimonial, index) => {
    const testimonialCard = document.createElement('div');
    testimonialCard.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300';
    testimonialCard.setAttribute('data-aos', 'fade-up');
    testimonialCard.setAttribute('data-aos-delay', index * 100);
    
    testimonialCard.innerHTML = `
        <div class="flex items-center mb-4">
            <img src="${testimonial.image}" alt="${testimonial.name}" class="w-12 h-12 rounded-full mr-4">
            <div>
                <h4 class="font-bold">${testimonial.name}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">${testimonial.role}</p>
            </div>
        </div>
        <div class="relative">
            <i class="fas fa-quote-left text-3xl text-ieee-blue/20 absolute -top-2 -left-2"></i>
            <p class="text-gray-600 dark:text-gray-400 pl-6">${testimonial.text}</p>
        </div>
    `;
    
    testimonialsGrid.appendChild(testimonialCard);
});

// Course Filtering
const courseFilterButtons = document.querySelectorAll('.course-filter-btn');
const courseCards = document.querySelectorAll('.course-card');

courseFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update button styles
        courseFilterButtons.forEach(btn => {
            btn.classList.remove('bg-ieee-blue', 'text-white');
            btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
        });
        button.classList.add('bg-ieee-blue', 'text-white');
        button.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-700', 'dark:text-gray-300');
        
        // Filter courses
        courseCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Flip Cards Functionality
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
    card.addEventListener('click', () => {
        const inner = card.querySelector('.flip-card-inner');
        inner.style.transform = inner.style.transform === 'rotateY(180deg)' 
            ? 'rotateY(0deg)' 
            : 'rotateY(180deg)';
    });
});

// Add hover effect for flip cards (for desktop)
if (window.innerWidth > 768) {
    flipCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const inner = card.querySelector('.flip-card-inner');
            inner.style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const inner = card.querySelector('.flip-card-inner');
            inner.style.transform = 'rotateY(0deg)';
        });
    });
}

// Navbar background on scroll
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('shadow-xl');
    } else {
        navbar.classList.remove('shadow-xl');
    }
});

console.log('IEEE NUCES PWR Website Loaded Successfully! 🚀');
