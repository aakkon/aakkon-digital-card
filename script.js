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