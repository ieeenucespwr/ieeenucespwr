// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
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

// Particles.js Configuration - Wait for library to load
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
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
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.3,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.5,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'bounce',
                    bounce: true,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
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
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 0.8,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
        console.log('Particles initialized successfully');
    } else {
        console.log('Waiting for particles.js to load...');
        setTimeout(initParticles, 100);
    }
}

// Initialize particles when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
} else {
    initParticles();
}

// Events "See More" Functionality
const seeMoreBtn = document.getElementById('see-more-events-btn');
const extraEventCards = document.querySelectorAll('.event-card-extra');
const event2023Section = document.querySelector('.event-section-2023');
let eventsExpanded = false;

if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', () => {
        eventsExpanded = !eventsExpanded;
        
        if (eventsExpanded) {
            // Show hidden events
            extraEventCards.forEach(card => {
                card.classList.remove('hidden');
            });
            if (event2023Section) {
                event2023Section.classList.remove('hidden');
            }
            
            // Update button text and icon
            seeMoreBtn.querySelector('span').textContent = 'Show Less';
            seeMoreBtn.querySelector('i').classList.add('rotate-180');
        } else {
            // Hide extra events
            extraEventCards.forEach(card => {
                card.classList.add('hidden');
            });
            if (event2023Section) {
                event2023Section.classList.add('hidden');
            }
            
            // Update button text and icon
            seeMoreBtn.querySelector('span').textContent = 'See More Events';
            seeMoreBtn.querySelector('i').classList.remove('rotate-180');
            
            // Scroll back to events section
            document.getElementById('events').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Events are now hardcoded in HTML with actual event data

// Member Spotlight Data
// Data structure for distinguished IEEE FAST Peshawar members
// Add members with their achievements and social media links
const spotlightData = [
    // Example structure:
    // {
    //     name: "Member Name",
    //     achievement: "Distinguished Achievement",
    //     description: "Brief description of their contribution",
    //     image: "assets/members/member-name.jpg",
    //     social: {
    //         linkedin: "https://linkedin.com/in/profile",
    //         instagram: "https://instagram.com/profile",
    //         facebook: "https://facebook.com/profile"
    //     }
    // }
];

// Populate Member Spotlight
const spotlightGrid = document.getElementById('spotlight-grid');
if (spotlightData.length === 0) {
    // Show message when no spotlight members are added yet
    spotlightGrid.innerHTML = `
        <div class="col-span-2 text-center py-12">
            <div class="text-6xl mb-4">🌟</div>
            <p class="text-xl text-gray-600 dark:text-gray-400">Distinguished members will be featured here soon!</p>
            <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">Stay tuned for spotlights on our exceptional IEEE FAST Peshawar members.</p>
        </div>
    `;
} else {
    spotlightData.forEach((member, index) => {
        const spotlightCard = document.createElement('div');
        spotlightCard.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300';
        spotlightCard.setAttribute('data-aos', 'fade-up');
        spotlightCard.setAttribute('data-aos-delay', index * 100);
        
        const socialLinks = member.social ? `
            <div class="flex space-x-3 mt-4">
                ${member.social.linkedin ? `<a href="${member.social.linkedin}" target="_blank" class="text-blue-600 hover:text-blue-700 transition-colors"><i class="fab fa-linkedin text-xl"></i></a>` : ''}
                ${member.social.instagram ? `<a href="${member.social.instagram}" target="_blank" class="text-pink-600 hover:text-pink-700 transition-colors"><i class="fab fa-instagram text-xl"></i></a>` : ''}
                ${member.social.facebook ? `<a href="${member.social.facebook}" target="_blank" class="text-blue-500 hover:text-blue-600 transition-colors"><i class="fab fa-facebook text-xl"></i></a>` : ''}
            </div>
        ` : '';
        
        spotlightCard.innerHTML = `
            <div class="flex items-start space-x-4">
                <img src="${member.image}" alt="${member.name}" class="w-20 h-20 rounded-full border-2 border-ieee-blue object-cover">
                <div class="flex-1">
                    <h3 class="text-xl font-bold mb-1">${member.name}</h3>
                    <p class="text-ieee-blue font-semibold text-sm mb-3">${member.achievement}</p>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">${member.description}</p>
                    ${socialLinks}
                </div>
            </div>
        `;
        
        spotlightGrid.appendChild(spotlightCard);
    });
}

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
        
        // Filter courses - COMMENTED OUT FOR FUTURE USE
        /*
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
        */
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

// View More Teams functionality (Mobile only)
const viewMoreTeamsBtn = document.getElementById('view-more-teams-btn');
const teamsGrid = document.getElementById('teams-grid');
const viewMoreText = document.getElementById('view-more-text');
const viewMoreIcon = document.getElementById('view-more-icon');

if (viewMoreTeamsBtn) {
    viewMoreTeamsBtn.addEventListener('click', () => {
        teamsGrid.classList.toggle('expanded');
        
        // Update button text and icon
        if (teamsGrid.classList.contains('expanded')) {
            viewMoreText.textContent = 'View Less Teams';
            viewMoreIcon.classList.remove('fa-chevron-down');
            viewMoreIcon.classList.add('fa-chevron-up');
        } else {
            viewMoreText.textContent = 'View More Teams';
            viewMoreIcon.classList.remove('fa-chevron-up');
            viewMoreIcon.classList.add('fa-chevron-down');
            
            // Scroll to teams section when collapsing
            document.getElementById('teams-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Performance Optimizations

// 1. Defer heavy operations until page is fully loaded
window.addEventListener('load', function() {
    // Re-initialize AOS for smoother animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// 2. Monitor and log performance metrics
if ('performance' in window && 'PerformanceObserver' in window) {
    // Log Largest Contentful Paint
    try {
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        // Observer not supported
    }
}

console.log('IEEE NUCES PWR Website Loaded Successfully! 🚀');
