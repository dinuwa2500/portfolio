// projects.js (root) - Featured Projects slider and modal

// Data API: Edit this array to manage your projects
export const projects = [
  {
    id: 1,
    title: "Project 1",
    description:
      "A brief description of Project 1 showcasing key features and impact.",
    tags: ["React", "Node.js", "Tailwind"],
    images: [
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
    ],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "Project 2",
    description: "An elegant, responsive web app demonstrating great UX.",
    tags: ["Vue", "Express", "Postgres"],
    images: [
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
      "https://res.cloudinary.com/dinuwapvt/image/upload/v1761806358/Lucid_Origin_A_vibrant_2D_cartoon_mascot_character_in_the_styl_3_fpdkfw.jpg",
    ],
    demoUrl: "#",
    codeUrl: "#",
  },
];

// Optional CRUD helpers
export const getAllProjects = () => [...projects];
export const getProject = (id) =>
  projects.find((p) => String(p.id) === String(id)) || null;
export const addProject = (p) => {
  const id = Date.now();
  projects.push({ id, ...p });
  return id;
};
export const updateProject = (id, updates) => {
  const i = projects.findIndex((p) => String(p.id) === String(id));
  if (i > -1) {
    projects[i] = { ...projects[i], ...updates };
    return true;
  }
  return false;
};
export const removeProject = (id) => {
  const i = projects.findIndex((p) => String(p.id) === String(id));
  if (i > -1) {
    projects.splice(i, 1);
    return true;
  }
  return false;
};

// Initialize the featured slider and modal
export function initFeaturedProjects() {
  const list = getAllProjects();
  const track = document.getElementById("project-slider-track");
  const dots = document.getElementById("slider-dots");
  const prevBtn = document.getElementById("prev-project");
  const nextBtn = document.getElementById("next-project");

  if (!track || !dots) return;

  // Build slides
  track.innerHTML = "";
  dots.innerHTML = "";

  list.forEach((project, index) => {
    const slide = document.createElement("div");
    // One slide per viewport
    slide.className = "project-slide min-w-full flex-shrink-0";
    slide.dataset.project = String(project.id);
    slide.innerHTML = `
      <div class="px-4">
      <div class="card p-6 rounded-xl group cursor-pointer h-full bg-dark-800/70 border border-dark-700/40 hover:border-primary-500/40 transition-colors">
        <div class="relative overflow-hidden rounded-lg mb-4 h-64 md:h-72 lg:h-80">
          <img src="${
            project.images?.[0] ||
            "https://via.placeholder.com/800x500/1e293b/2dd4bf?text=Project+Image"
          }" alt="${
      project.title
    }" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <button class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors view-details" type="button" aria-label="View project details">View Details</button>
          </div>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">${project.title}</h3>
        <p class="text-gray-400 text-sm mb-4 line-clamp-2">${
          project.description
        }</p>
        <div class="flex flex-wrap gap-2">
          ${(project.tags || [])
            .slice(0, 3)
            .map(
              (t) =>
                `<span class='text-xs px-2 py-1 bg-dark-700 text-gray-300 rounded'>${t}</span>`
            )
            .join("")}
          ${
            project.tags && project.tags.length > 3
              ? `<span class='text-xs px-2 py-1 bg-dark-700 text-gray-500 rounded'>+${
                  project.tags.length - 3
                } more</span>`
              : ""
          }
        </div>
      </div>
      </div>
    `;

    slide.addEventListener("click", (e) => {
      if (
        e.target instanceof Element &&
        e.target.closest("button.view-details")
      ) {
        e.stopPropagation();
      }
      openProjectModal(project.id);
    });

    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = `w-3 h-3 rounded-full mx-1 transition-all ${
      index === 0 ? "bg-primary-500 w-6" : "bg-gray-600"
    }`;
    dot.ariaLabel = `Go to slide ${index + 1}`;
    dot.addEventListener("click", (e) => {
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
    const translateX = -(currentSlide * 100);
    track.style.transition = "transform 0.3s ease-in-out";
    track.style.transform = `translateX(${translateX}%)`;

    const dotEls = dots.querySelectorAll("button");
    dotEls.forEach((d, i) => {
      if (i === currentSlide) {
        d.classList.remove("bg-gray-600", "w-3");
        d.classList.add("bg-primary-500", "w-6");
      } else {
        d.classList.remove("bg-primary-500", "w-6");
        d.classList.add("bg-gray-600", "w-3");
      }
    });

    if (prevBtn) {
      prevBtn.disabled = currentSlide === 0;
      prevBtn.classList.toggle("opacity-50", currentSlide === 0);
      prevBtn.classList.toggle("cursor-not-allowed", currentSlide === 0);
    }
    if (nextBtn) {
      nextBtn.disabled = currentSlide === list.length - 1;
      nextBtn.classList.toggle("opacity-50", currentSlide === list.length - 1);
      nextBtn.classList.toggle(
        "cursor-not-allowed",
        currentSlide === list.length - 1
      );
    }
  };

  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        update();
      }
    });
  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      if (currentSlide < list.length - 1) {
        currentSlide++;
        update();
      }
    });

  update();
}

export function openProjectModal(projectId) {
  const project = getProject(projectId);
  if (!project) return;

  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("close-modal");
  const overlay = document.getElementById("modal-overlay");
  const titleEl = document.getElementById("modal-project-title");
  const descEl = document.getElementById("modal-project-description");
  const tagsEl = document.getElementById("modal-project-tags");
  const imagesEl = document.getElementById("project-images");
  const liveDemoBtn = document.getElementById("live-demo");
  const viewCodeBtn = document.getElementById("view-code");

  if (!modal || !titleEl || !descEl || !tagsEl || !imagesEl) return;

  // A11y attributes
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "modal-project-title");
  modal.setAttribute("aria-hidden", "false");

  titleEl.textContent = project.title;
  descEl.textContent = project.description;
  tagsEl.innerHTML = (project.tags || [])
    .map(
      (t) =>
        `<span class="inline-block bg-gray-800 text-gray-200 text-xs px-2 py-1 rounded mr-2 mb-2">${t}</span>`
    )
    .join("");

  if (liveDemoBtn) {
    if (project.demoUrl && project.demoUrl !== "#") {
      liveDemoBtn.href = project.demoUrl;
      liveDemoBtn.classList.remove("opacity-50", "cursor-not-allowed");
    } else {
      liveDemoBtn.href = "#";
      liveDemoBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
  }
  if (viewCodeBtn) {
    if (project.codeUrl && project.codeUrl !== "#") {
      viewCodeBtn.href = project.codeUrl;
      viewCodeBtn.classList.remove("opacity-50", "cursor-not-allowed");
    } else {
      viewCodeBtn.href = "#";
      viewCodeBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
  }

  // Images slider in modal
  imagesEl.innerHTML = "";
  const indicators = document.createElement("div");
  indicators.className = "flex justify-center mt-2 space-x-2";
  let imgIndex = 0;

  // Persistent containers to avoid removing controls on updates
  imagesEl.innerHTML = "";
  const imagesWrap = document.createElement("div");
  imagesWrap.className = "relative w-full";
  imagesEl.appendChild(imagesWrap);

  const renderImages = () => {
    imagesWrap.innerHTML = "";
    (project.images || []).forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${project.title} - Image ${i + 1}`;
      img.loading = "lazy";
      img.decoding = "async";
      img.className = `w-full h-72 md:h-80 lg:h-[26rem] object-contain rounded-lg ${
        i === imgIndex ? "block" : "hidden"
      }`;
      imagesWrap.appendChild(img);
    });
  };

  const updateIndicators = () => {
    indicators.innerHTML = "";
    (project.images || []).forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = `w-2 h-2 rounded-full ${
        i === imgIndex ? "bg-white" : "bg-gray-500"
      }`;
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        imgIndex = i;
        renderImages();
        updateIndicators();
      });
      indicators.appendChild(dot);
    });
  };

  const goPrev = () => {
    imgIndex =
      (imgIndex - 1 + (project.images?.length || 1)) %
      (project.images?.length || 1);
    renderImages();
    updateIndicators();
  };
  const goNext = () => {
    imgIndex = (imgIndex + 1) % (project.images?.length || 1);
    renderImages();
    updateIndicators();
  };

  const prevBtn = document.createElement("button");
  prevBtn.type = "button";
  prevBtn.setAttribute("aria-label", "Previous image");
  prevBtn.innerHTML = "&larr;";
  prevBtn.className =
    "absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white/60";
  prevBtn.onclick = (e) => {
    e.stopPropagation();
    goPrev();
  };
  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.setAttribute("aria-label", "Next image");
  nextBtn.innerHTML = "&rarr;";
  nextBtn.className =
    "absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white/60";
  nextBtn.onclick = (e) => {
    e.stopPropagation();
    goNext();
  };

  renderImages();
  updateIndicators();
  // Append persistent controls (not wiped by renderImages)
  imagesEl.appendChild(prevBtn);
  imagesEl.appendChild(nextBtn);
  imagesEl.appendChild(indicators);

  // Show modal + Focus Trap
  const previouslyFocused = document.activeElement;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  const getFocusable = () =>
    Array.from(
      modal.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  const keyHandler = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "Tab") {
      const f = getFocusable();
      if (f.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = f[0];
      const lastEl = f[f.length - 1];
      if (e.shiftKey) {
        if (
          document.activeElement === firstEl ||
          document.activeElement === modal
        ) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  };

  const closeBtnEl = closeBtn || modal.querySelector("#close-modal");
  setTimeout(() => {
    closeBtnEl?.focus?.();
  }, 0);

  const close = () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", keyHandler);
    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus();
    }
  };

  if (closeBtn) closeBtn.onclick = close;
  if (overlay) overlay.onclick = close;
  modal.onclick = (e) => {
    if (e.target === modal) close();
  };
  document.addEventListener("keydown", keyHandler);
}
