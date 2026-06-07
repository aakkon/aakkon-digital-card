const projects = {
  "personal-lab": {
    title: "Personal Lab",
    status: "In development",
    description:
      "A personal DevOps laboratory used to design, test and understand cloud infrastructure, containers, automation workflows and reproducible environments without fear of breaking things.",
    link: null
  },
  "pere-vault": {
    title: "Pere Vault",
    status: "Private concept",
    description:
      "A personal cloud storage initiative focused on structure, controlled access, long-term reliability and practical use for personal documents, photos and shared household needs.",
    link: null
  },
  "autogestor": {
    title: "AutoGestor",
    status: "Private internal development",
    description:
      "An internal automation-first project focused on building maintainable systems and reducing operational overhead. The repository remains private while the application is under active development and will be evaluated for publication when ready.",
    link: null
  },
  "bench-journal": {
    title: "Bench Journal",
    status: "Public repository",
    description:
      "A Python tool that collects machine log files from SMB shares, parses relevant events, classifies them by type and generates Excel reports for test bench environments.",
    link: "https://github.com/aakkon/bench-journal"
  },
  "filepilot": {
    title: "FilePilot",
    status: "Public repository",
    description:
      "A desktop application designed to simplify file-management workflows through batch renaming, pattern-based transformations, activity tracking and reusable naming profiles.",
    link: "https://github.com/aakkon/filepilot"
  }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalStatus = document.getElementById("modalStatus");
const modalDescription = document.getElementById("modalDescription");
const modalLink = document.getElementById("modalLink");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const project = projects[card.dataset.project];

    modalTitle.textContent = project.title;
    modalStatus.textContent = project.status;
    modalDescription.textContent = project.description;

    if (project.link) {
      modalLink.href = project.link;
      modalLink.classList.remove("hidden");
    } else {
      modalLink.classList.add("hidden");
    }

    modal.classList.add("is-open");
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("is-open");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("is-open");
  }
});

const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

let width;
let height;
let lines = [];
let pulses = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  lines = Array.from({ length: 8 }, () => createLine());
  pulses = [];
}

function randomPoint() {
  return {
    x: Math.random() * width,
    y: Math.random() * height
  };
}

function createLine() {
  return {
    from: randomPoint(),
    to: randomPoint(),
    progress: 0,
    speed: 0.003 + Math.random() * 0.006,
    alpha: 0.16 + Math.random() * 0.22
  };
}

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

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
draw();