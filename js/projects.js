// projects.js - Centralized project management for your portfolio

// Project data structure
export const projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'A brief description of Project 1 and its key features. This project showcases my skills in web development and design.',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    images: [
      'https://via.placeholder.com/1200x800/1e293b/2dd4bf?text=Project+1+Screen+1',
      'https://via.placeholder.com/1200x800/1e293b/2dd4bf?text=Project+1+Screen+2',
      'https://via.placeholder.com/1200x800/1e293b/2dd4bf?text=Project+1+Screen+3'
    ],
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'A brief description of Project 2 and its key features. This project demonstrates my ability to create responsive and interactive web applications.',
    tags: ['Vue.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    images: [
      'https://via.placeholder.com/1200x800/1e293b/2dd4bf?text=Project+2+Screen+1',
      'https://via.placeholder.com/1200x800/1e293b/2dd4bf?text=Project+2+Screen+2',
      'https://via.placeholder.com/1200x800/1e293b/2dd4bf?text=Project+2+Screen+3'
    ],
    demoUrl: '#',
    codeUrl: '#'
  }
  // Add more projects here as you complete them
];

// Function to add a new project
export function addProject(project) {
  // Auto-increment the ID
  const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
  
  const newProject = {
    id: newId,
    title: project.title || `Project ${newId}`,
    description: project.description || 'No description provided.',
    tags: Array.isArray(project.tags) ? project.tags : [],
    images: Array.isArray(project.images) ? project.images : [],
    demoUrl: project.demoUrl || '#',
    codeUrl: project.codeUrl || '#'
  };
  
  projects.push(newProject);
  return newProject;
}

// Function to update an existing project
export function updateProject(id, updates) {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  projects[index] = { ...projects[index], ...updates };
  return projects[index];
}

// Function to remove a project
export function removeProject(id) {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  projects.splice(index, 1);
  return true;
}

// Function to get a project by ID
export function getProject(id) {
  return projects.find(p => p.id === id) || null;
}

// Function to get all projects
export function getAllProjects() {
  return [...projects];
}

// Function to render projects in the slider
export function renderProjects() {
  const sliderTrack = document.getElementById('project-slider-track');
  const sliderDots = document.getElementById('slider-dots');
  
  if (!sliderTrack || !sliderDots) return;
  
  // Clear existing content
  sliderTrack.innerHTML = '';
  sliderDots.innerHTML = '';
  
  // Add projects to slider
  projects.forEach((project, index) => {
    // Create project card
    const projectCard = document.createElement('div');
    projectCard.className = 'w-full flex-shrink-0 px-4';
    projectCard.dataset.project = project.id;
    
    projectCard.innerHTML = `
      <div class="card p-6 rounded-lg group">
        <div class="relative rounded-xl overflow-hidden mb-6">
          <img src="${project.images[0] || 'https://via.placeholder.com/800x500/1e293b/2dd4bf?text=Project+Image'}" 
               alt="${project.title}" 
               class="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity" 
               onclick="openProjectModal(${project.id})">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <button class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors" 
                    onclick="event.stopPropagation(); openProjectModal(${project.id})">
              View Project
            </button>
          </div>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">${project.title}</h3>
        <p class="text-gray-400 mb-4">${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
        <div class="flex flex-wrap gap-2">
          ${project.tags.slice(0, 3).map(tag => 
            `<span class="skill-tag text-xs px-3 py-1 rounded-full">${tag}</span>`
          ).join('')}
          ${project.tags.length > 3 ? 
            `<span class="skill-tag text-xs px-3 py-1 rounded-full">+${project.tags.length - 3} more</span>` : ''
          }
        </div>
      </div>
    `;
    
    sliderTrack.appendChild(projectCard);
    
    // Create slider dot
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full ${index === 0 ? 'bg-primary-500' : 'bg-gray-600'}`;
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
  });
  
  // Update slider state
  currentSlide = 0;
  updateSlider();
}

// Initialize the projects when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
});
