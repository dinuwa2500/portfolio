// projects.js - Centralized project management for your portfolio

// Global variables
let currentSlide = 0;

// Project data structure
export const projects = [
  {
    id: 1,
    title: "Project 1",
    description:
      "A brief description of Project 1 and its key features. This project showcases my skills in web development and design.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    images: [
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
    ],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "Project 2",
    description:
      "A brief description of Project 2 and its key features. This project demonstrates my ability to create responsive and interactive web applications.",
    tags: ["Vue.js", "Express", "PostgreSQL", "Tailwind CSS"],
    images: [
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
    ],
    demoUrl: "#",
    codeUrl: "#",
  },
  // Add more projects here as you complete them
  {
    id: 3,
    title: "Project 3",
    description:
      "A brief description of Project 2 and its key features. This project demonstrates my ability to create responsive and interactive web applications.",
    tags: ["Vue.js", "Express", "PostgreSQL", "Tailwind CSS"],
    images: [
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
    ],
    demoUrl: "#",
    codeUrl: "#",
  },
];

// Function to add a new project
export function addProject(project) {
  // Auto-increment the ID
  const newId =
    projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;

  const newProject = {
    id: newId,
    title: project.title || `Project ${newId}`,
    description: project.description || "No description provided.",
    tags: Array.isArray(project.tags) ? project.tags : [],
    images: Array.isArray(project.images) ? project.images : [],
    demoUrl: project.demoUrl || "#",
    codeUrl: project.codeUrl || "#",
  };

  projects.push(newProject);
  return newProject;
}

// Function to update an existing project
export function updateProject(id, updates) {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  projects[index] = { ...projects[index], ...updates };
  return projects[index];
}

// Function to remove a project
export function removeProject(id) {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return false;

  projects.splice(index, 1);
  return true;
}

// Function to get a project by ID
export function getProject(id) {
  return projects.find((p) => p.id === id) || null;
}

// Function to get all projects
export function getAllProjects() {
  return [...projects];
}

// Function to render projects in the slider
export function renderProjects() {
  const sliderTrack = document.getElementById("project-slider-track");
  const sliderDots = document.getElementById("slider-dots");

  if (!sliderTrack || !sliderDots) return;

  // Clear existing content
  sliderTrack.innerHTML = "";
  sliderDots.innerHTML = "";

  // Add projects to slider
  projects.forEach((project, index) => {
    // Create project card
    const projectCard = document.createElement("div");
    projectCard.className = "project-slide w-full flex-shrink-0 px-4";
    projectCard.style.width = "100%";
    projectCard.dataset.project = project.id;

    projectCard.innerHTML = `
      <div class="card p-6 rounded-lg group cursor-pointer h-full">
        <div class="relative overflow-hidden rounded-lg mb-4 h-48">
          <img src="${
            project.images[0] ||
            "https://via.placeholder.com/800x500/1e293b/2dd4bf?text=Project+Image"
          }" 
               alt="${project.title}" 
               class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <button class="px-4 py-2 bg-primary-500 text-white rounded-md text-sm font-medium hover:bg-primary-600 transition-colors" 
                    onclick="event.stopPropagation(); window.openProjectModal(${
                      project.id
                    })">
              View Details
            </button>
          </div>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">${project.title}</h3>
        <p class="text-gray-400 text-sm mb-4 line-clamp-2">${
          project.description
        }</p>
        <div class="flex flex-wrap gap-2">
          ${project.tags
            .slice(0, 3)
            .map(
              (tag) => `
            <span class="text-xs px-2 py-1 bg-dark-700 text-gray-300 rounded">${tag}</span>
          `
            )
            .join("")}
          ${
            project.tags.length > 3
              ? `<span class="text-xs px-2 py-1 bg-dark-700 text-gray-500 rounded">+${
                  project.tags.length - 3
                } more</span>`
              : ""
          }
        </div>
      </div>
    `;

    // Add click handler to the entire card
    projectCard.addEventListener("click", (e) => {
      // Only trigger if the click wasn't on a button or link
      if (!e.target.closest("button, a")) {
        if (window.openProjectModal) {
          window.openProjectModal(project.id);
        }
      }
    });

    sliderTrack.appendChild(projectCard);

    // Create dot for this project
    const dot = document.createElement("button");
    dot.className = `w-3 h-3 rounded-full mx-1 transition-all ${
      index === 0 ? "bg-primary-500 w-6" : "bg-gray-600"
    }`;
    dot.ariaLabel = `Go to slide ${index + 1}`;
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      currentSlide = index;
      updateSlider();
    });
    sliderDots.appendChild(dot);
  });

  // Initialize or update slider after projects are rendered
  if (typeof initSlider === "function") {
    initSlider();
  }
}

// Make renderProjects globally available
window.renderProjects = renderProjects;

// Initialize the projects when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
});
