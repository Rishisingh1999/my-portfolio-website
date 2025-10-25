// Intersection Observer for scroll reveal with stagger
function revealSectionsAndCards() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.section, .about-card, .exp-card, .project-card, .skills-card, .edu-card, .fadein').forEach((el, idx) => {
        observer.observe(el);
        setTimeout(() => el.classList.add('active'), 90 * idx);
    });
}

document.addEventListener("DOMContentLoaded", revealSectionsAndCards);

// Animate floating SVG shapes (background bubbles)
setInterval(() => {
    document.querySelector('.shape1').style.transform = `translateY(${Math.sin(Date.now()/1200)*14}px) scale(1.05)`;
    document.querySelector('.shape2').style.transform = `translateX(${Math.cos(Date.now()/900)*15}px) scale(1.03)`;
    document.querySelector('.shape3').style.transform = `translateY(${Math.cos(Date.now()/700)*22}px) scale(1.07)`;
    document.querySelector('.shape4').style.transform = `translateY(${Math.sin(Date.now()/1350)*13}px) scale(1.015)`;
},70);

// Smooth scroll navigation
document.querySelectorAll(".nav-menu li a").forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Fetch + display GitHub projects automatically
document.addEventListener("DOMContentLoaded", function () {
    fetch("https://api.github.com/users/Rishisingh1999/repos")
        .then(res => res.json())
        .then(repos => {
            repos = repos.filter(repo => !repo.fork && [
                "AI-Supply-Chain-Disruption-Predictor",
                "Predictive-Maintenance-for-Manufacturing-Assets",
                "-Diabetes-Readmission-Predictor",
                "OpenCut",
                "Electric_Vehicle_Adoption_Analysis",
                "Statistically-Analysis"
            ].includes(repo.name)
            );
            const container = document.getElementById("github-projects");
            repos.forEach((repo, idx) => {
                const card = document.createElement("div");
                card.className = "project-card fadein delay" + (idx+1);
                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "No description provided."}</p>
                    <div class="project-tech">${repo.language || "Tech"}</div>
                    <div class="project-stats">★ ${repo.stargazers_count}</div>
                    <a href="${repo.html_url}" target="_blank" class="project-link">View Project</a>
                `;
                container.appendChild(card);
            });
            revealSectionsAndCards(); // Ensure the new cards animate in!
        });
});
