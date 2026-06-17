const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalStatus = document.getElementById("modalStatus");
const modalDescription = document.getElementById("modalDescription");
const modalLink = document.getElementById("modalLink");
const modalClose = document.getElementById("modalClose");
const projectGrid = document.getElementById("projectGrid");
const activeElementBeforeModal = { current: null };

fetch("projects.json")
  .then((res) => res.json())
  .then((projects) => {
    projects.forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.style.animationDelay = `${0.05 + index * 0.07}s`;

      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.summary}</p>
        <span>${project.status}</span>
      `;

      card.addEventListener("click", () => {
        activeElementBeforeModal.current = document.activeElement;
        modalTitle.textContent = project.title;
        modalStatus.textContent = project.status;
        modalDescription.textContent = project.description;

        if (project.link) {
          modalLink.href = project.link;
          modalLink.classList.remove("hidden");
        } else {
          modalLink.classList.add("hidden");
        }

        modal.setAttribute("aria-hidden", "false");
        modal.classList.add("is-open");
        modalClose.focus();
      });

      projectGrid.appendChild(card);
    });
  });

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (activeElementBeforeModal.current) {
    activeElementBeforeModal.current.focus();
  }
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

function draw() {
  ctx.clearRect(0, 0, width, height);

  lines.forEach((line, index) => {
    line.progress += line.speed;

    if (line.progress >= 1) {
      const icons = ["☁", "⬡", "▣", "◈", "◎", "⌁", "⚙", "↯"];

      pulses.push({
        x: line.to.x,
        y: line.to.y,
        alpha: 0.85,
        radius: 0,
        icon: icons[Math.floor(Math.random() * icons.length)]
      });

      lines[index] = createLine();
      return;
    }

    const x = line.from.x + (line.to.x - line.from.x) * line.progress;
    const y = line.from.y + (line.to.y - line.from.y) * line.progress;

    ctx.beginPath();
    ctx.moveTo(line.from.x, line.from.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = `rgba(212,175,55,${line.alpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(212,175,55,0.9)";
    ctx.fill();
  });

  pulses.forEach((pulse, index) => {
    pulse.radius += 0.5;
    pulse.alpha *= 0.94;

    ctx.save();
    ctx.globalAlpha = pulse.alpha;
    ctx.font = `${18 + pulse.radius}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(212,175,55,1)";
    ctx.shadowColor = "rgba(212,175,55,0.8)";
    ctx.shadowBlur = 18;

    ctx.fillText(pulse.icon, pulse.x, pulse.y);

    ctx.restore();

    if (pulse.alpha < 0.03) {
      pulses.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}
