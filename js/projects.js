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


// Featured projects slider and modal
export function renderFeaturedProjects() {
  const list = getAllProjects();
  const track = document.getElementById('project-slider-track');
  const dots = document.getElementById('slider-dots');
  const prevBtn = document.getElementById('prev-project');
  const nextBtn = document.getElementById('next-project');

  if (!track || !dots) return;

  // Clear
  track.innerHTML = '';
  dots.innerHTML = '';

  // Build slides
  list.forEach((project, index) => {
    const slide = document.createElement('div');
    slide.className = 'project-slide w-full flex-shrink-0 px-4';
    slide.dataset.project = String(project.id);
    slide.innerHTML = `
      <div class="card p-6 rounded-lg group cursor-pointer h-full">
        <div class="relative overflow-hidden rounded-lg mb-4 h-48">
          <img src="${project.images?.[0] || 'https://via.placeholder.com/800x500/1e293b/2dd4bf?text=Project+Image'}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <button class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors view-details">View Details</button>
          </div>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">${project.title}</h3>
        <p class="text-gray-400 text-sm mb-4 line-clamp-2">${project.description}</p>
        <div class="flex flex-wrap gap-2">
          ${(project.tags || []).slice(0,3).map(t=>`<span class='text-xs px-2 py-1 bg-dark-700 text-gray-300 rounded'>${t}</span>`).join('')}
          ${project.tags && project.tags.length>3 ? `<span class='text-xs px-2 py-1 bg-dark-700 text-gray-500 rounded'>+${project.tags.length-3} more</span>` : ''}
        </div>
      </div>
    `;

    slide.addEventListener('click', (e) => {
      if ((e.target instanceof Element) && e.target.closest('button.view-details')) {
        e.stopPropagation();
      }
      openProjectModal(project.id);
    });

    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full mx-1 transition-all ${index === 0 ? 'bg-primary-500 w-6' : 'bg-gray-600'}`;
    dot.ariaLabel = `Go to slide ${index + 1}`;
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlide = index;
      update();
    });
    dots.appendChild(dot);
  });

  let currentSlide = 0;
  const update = () => {
    const total = list.length;
    if (total === 0) return;
    const translateX = -(currentSlide * (100 / total));
    track.style.transition = 'transform 0.3s ease-in-out';
    track.style.transform = `translateX(${translateX}%)`;

    const dotEls = dots.querySelectorAll('button');
    dotEls.forEach((d, i) => {
      if (i === currentSlide) {
        d.classList.remove('bg-gray-600', 'w-3');
        d.classList.add('bg-primary-500', 'w-6');
      } else {
        d.classList.remove('bg-primary-500', 'w-6');
        d.classList.add('bg-gray-600', 'w-3');
      }
    });

    if (prevBtn) {
      prevBtn.disabled = currentSlide === 0;
      prevBtn.classList.toggle('opacity-50', currentSlide === 0);
      prevBtn.classList.toggle('cursor-not-allowed', currentSlide === 0);
    }
    if (nextBtn) {
      nextBtn.disabled = currentSlide === list.length - 1;
      nextBtn.classList.toggle('opacity-50', currentSlide === list.length - 1);
      nextBtn.classList.toggle('cursor-not-allowed', currentSlide === list.length - 1);
    }
  };

  if (prevBtn) prevBtn.addEventListener('click', () => { if (currentSlide>0){ currentSlide--; update(); } });
  if (nextBtn) nextBtn.addEventListener('click', () => { if (currentSlide<list.length-1){ currentSlide++; update(); } });

  update();
}

export function openProjectModal(projectId) {
  const project = getProject(projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('close-modal');
  const titleEl = document.getElementById('modal-project-title');
  const descEl = document.getElementById('modal-project-description');
  const tagsEl = document.getElementById('modal-project-tags');
  const imagesEl = document.getElementById('project-images');
  const liveDemoBtn = document.getElementById('live-demo');
  const viewCodeBtn = document.getElementById('view-code');

  if (!modal || !titleEl || !descEl || !tagsEl || !imagesEl) return;

  titleEl.textContent = project.title;
  descEl.textContent = project.description;
  tagsEl.innerHTML = (project.tags||[]).map(t=>`<span class="inline-block bg-gray-800 text-gray-200 text-xs px-2 py-1 rounded mr-2 mb-2">${t}</span>`).join('');

  if (liveDemoBtn) {
    if (project.demoUrl && project.demoUrl !== '#') { liveDemoBtn.href = project.demoUrl; liveDemoBtn.classList.remove('opacity-50','cursor-not-allowed'); } else { liveDemoBtn.href = '#'; liveDemoBtn.classList.add('opacity-50','cursor-not-allowed'); }
  }
  if (viewCodeBtn) {
    if (project.codeUrl && project.codeUrl !== '#') { viewCodeBtn.href = project.codeUrl; viewCodeBtn.classList.remove('opacity-50','cursor-not-allowed'); } else { viewCodeBtn.href = '#'; viewCodeBtn.classList.add('opacity-50','cursor-not-allowed'); }
  }

  // Images slider in modal
  imagesEl.innerHTML = '';
  const indicators = document.createElement('div');
  indicators.className = 'flex justify-center mt-2 space-x-2';
  let imgIndex = 0;

  const renderImages = () => {
    imagesEl.innerHTML = '';
    project.images?.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${project.title} - Image ${i+1}`;
      img.className = `w-full h-64 md:h-80 object-contain rounded-lg ${i === imgIndex ? 'block' : 'hidden'}`;
      imagesEl.appendChild(img);
    });
  };

  const updateIndicators = () => {
    indicators.innerHTML = '';
    (project.images||[]).forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `w-2 h-2 rounded-full ${i === imgIndex ? 'bg-white' : 'bg-gray-500'}`;
      dot.addEventListener('click', (e) => { e.stopPropagation(); imgIndex = i; renderImages(); updateIndicators(); });
      indicators.appendChild(dot);
    });
  };

  renderImages();
  updateIndicators();

  // Prev/Next buttons
  const prevBtn = document.createElement('button');
  prevBtn.innerHTML = '&larr;';
  prevBtn.className = 'absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75';
  prevBtn.onclick = (e) => { e.stopPropagation(); imgIndex = (imgIndex - 1 + (project.images?.length||1)) % (project.images?.length||1); renderImages(); updateIndicators(); };
  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '&rarr;';
  nextBtn.className = 'absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75';
  nextBtn.onclick = (e) => { e.stopPropagation(); imgIndex = (imgIndex + 1) % (project.images?.length||1); renderImages(); updateIndicators(); };

  imagesEl.appendChild(prevBtn);
  imagesEl.appendChild(nextBtn);
  imagesEl.appendChild(indicators);

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  const close = () => { modal.classList.add('hidden'); document.body.style.overflow = ''; };
  if (closeBtn) closeBtn.onclick = close;
  modal.onclick = (e) => { if (e.target === modal) close(); };
  document.addEventListener('keydown', function esc(e){ if (e.key==='Escape'){ close(); document.removeEventListener('keydown', esc);} });
}
