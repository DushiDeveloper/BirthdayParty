// Initialize Lucide Icons
lucide.createIcons();

// Celebration Date
const PARTY_DATE = new Date('2026-03-06T16:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = PARTY_DATE - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = "PARTY TIME!";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP Logic
const rsvpBtn = document.getElementById('rsvp-button');
const successMsg = document.getElementById('rsvp-success');

rsvpBtn.addEventListener('click', () => {
    rsvpBtn.classList.add('hidden');
    successMsg.classList.remove('hidden');
    createConfetti();
});

// Simple Confetti Cannon
function createConfetti() {
    const colors = ['#ff85a2', '#c77dff', '#a2d2ff', '#ff4d6d'];
    const container = document.getElementById('confetti-container');

    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const duration = Math.random() * 3 + 2;
        particle.style.animation = `fall ${duration}s linear forwards`;
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), duration * 1000);
    }
}

// Add falling animation to JS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            top: 110vh;
            transform: rotate(720deg) translateX(50px);
        }
    }
`;
document.head.appendChild(style);