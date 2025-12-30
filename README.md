# IEEE NUCES PWR Student Branch Website

A modern, professional, and fully responsive website for the IEEE NUCES PWR Student Branch. Built with cutting-edge web technologies and featuring stunning animations, dark mode support, and an intuitive user experience.

## 🌟 Features

### Design & UX
- **Modern & Clean Design**: Contemporary, minimalist aesthetic using Tailwind CSS
- **Dark Mode Support**: Toggle between light and dark themes with persistent preference
- **Fully Responsive**: Perfect display across all devices (mobile, tablet, desktop)
- **Smooth Animations**: Scroll-triggered animations using AOS library
- **Interactive Particles**: Animated particle.js background in hero section
- **Glassmorphism Effects**: Modern transparent blur effects in navigation

### Sections

1. **Navigation Bar**
   - Fixed position with blur effect
   - Scroll progress indicator
   - Dark mode toggle
   - Mobile-responsive hamburger menu
   - Smooth scroll navigation

2. **Hero Section**
   - Full-width animated particle background
   - Compelling headline and tagline
   - Call-to-action buttons
   - Scroll indicator

3. **About Section**
   - Faculty Head profile with gradient card
   - Executive Body 2025-26 with 3D flip cards
   - Eight specialized team categories
   - General body members grid

4. **Events Section**
   - Dynamic event cards
   - Circuit pattern background
   - Responsive grid layout

5. **Member Spotlight**
   - Highlighting member achievements
   - 2-column responsive layout

6. **Testimonials**
   - Quote-style cards
   - Member feedback and experiences

7. **Professional Courses**
   - Feature badges (Expert Instructors, Hands-on Projects, etc.)
   - Course filtering system (All, Programming, Hardware, Soft Skills, Certification)
   - 6 featured courses with detailed information
   - Pricing with discounts
   - Difficulty levels and ratings

8. **Footer**
   - Quick links navigation
   - Resources and external links
   - Contact information
   - Social media icons
   - Copyright notice

### Interactive Features
- **3D Flip Cards**: Executive body cards flip on hover (desktop) or click (mobile)
- **Course Filtering**: Filter courses by category with smooth transitions
- **Smooth Scrolling**: Animated scroll to sections
- **Mobile Menu**: Slide-in menu with overlay
- **Hover Effects**: All buttons and cards have engaging hover states
- **Scroll Progress**: Visual indicator of page scroll position

## 🚀 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom animations and transitions
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Modern JavaScript features
- **Particles.js**: Particle animation library
- **AOS**: Animate On Scroll library
- **Font Awesome**: Icon library
- **Google Fonts**: Poppins font family

## 📁 File Structure

```
ieee-website-structured/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── website-needed.md   # Original requirements document
└── README.md          # This file
```

## 🎨 Color Scheme

- **Primary**: IEEE Blue (#00629B)
- **Primary Dark**: #004A7C
- **Secondary**: Indigo, Purple gradients
- **Accent**: Various colors for team categories
- **Neutral**: Grays for text and backgrounds
- **Success**: Green tones
- **Warning**: Orange/Yellow tones

## ⚙️ Setup & Installation

1. **Clone or download** this repository to your local machine

2. **Open the website**:
   - Simply open `index.html` in a modern web browser
   - Or use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

3. **View the website**:
   - Navigate to `http://localhost:8000` (or the appropriate URL)

## 🎯 Usage

### Customizing Content

#### Update Team Members
Edit the HTML in `index.html` to update team member information:
```html
<div class="flex flex-col items-center">
    <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-500 mb-3 shadow-lg">
        <img src="YOUR_IMAGE_URL" alt="Member Name">
    </div>
    <p class="font-semibold text-center">Member Name</p>
    <p class="text-sm text-pink-500">Role</p>
</div>
```

#### Add Events
Modify the `eventsData` array in `script.js`:
```javascript
const eventsData = [
    {
        title: "Your Event Title",
        date: "Event Date",
        description: "Event description here",
        image: "event-image-url"
    },
    // Add more events...
];
```

#### Add Courses
Add new course cards in the `#courses-grid` section of `index.html`

#### Change Theme Colors
Update the Tailwind configuration in `index.html` or customize colors in `styles.css`

### Dark Mode
- Click the moon/sun icon in the navigation bar
- Preference is saved to localStorage

### Mobile Navigation
- Click the hamburger menu icon
- Menu slides in from the right
- Click outside or the X button to close

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus visible states
- Reduced motion support for users with motion sensitivity
- High contrast mode support
- Proper heading hierarchy

## 🎓 IEEE Student Branch Information

**Branch**: IEEE NUCES PWR Student Branch
**Institution**: NUCES FAST, Peshawar Campus
**Focus**: Technology, Innovation, and Professional Development

### Contact
- **Email**: ieee@nu.edu.pk
- **Phone**: +92 321 1234567

### Social Media
- Facebook
- Twitter
- Instagram
- LinkedIn
- YouTube

## 📝 License

This project is created for the IEEE NUCES PWR Student Branch. All rights reserved.

## 🤝 Contributing

This website is maintained by the IEEE NUCES PWR Web Development Team. For contributions or issues:

1. Contact the Web Development Team Lead
2. Submit suggestions via email
3. Report bugs to the technical team

## 🙏 Acknowledgments

- IEEE Global Organization
- NUCES FAST University
- All IEEE NUCES PWR Student Branch members
- Faculty Advisor: Dr. Suleman Mir
- Executive Body 2025-26
- Web Development Team

## 📊 Performance

The website is optimized for:
- Fast loading times
- Minimal HTTP requests
- Efficient animations
- Optimized images
- Clean, maintainable code

## 🔧 Maintenance

### Regular Updates
- Update event information
- Add new member achievements
- Update course offerings
- Refresh testimonials
- Update team member information

### Technical Maintenance
- Keep CDN links updated
- Test on new browser versions
- Optimize images
- Monitor performance
- Update dependencies

## 📞 Support

For technical support or questions:
- Contact: Web Development Team
- Email: ieee@nu.edu.pk

---

**Built with ❤️ by the IEEE NUCES PWR Web Development Team**

*Last Updated: December 2025*
