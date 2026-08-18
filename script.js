/**
 * Golam Rabbani — World-Class Interactive Portfolio Engine
 * Features:
 * - Dynamic 60fps Particle Canvas Network
 * - Interactive ML Health Triage Simulator with Expandable Verified Doctors
 * - Full Verified Doctor & Specialist Directory Modal (Search & Multi-Category Filter)
 * - Developer CLI Terminal with Real-time Command Interpreter
 * - Project Filter System
 * - Typing Headline Animation
 * - Smooth Scroll & IntersectionObserver Reveal
 * - Toast Notification System
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initAmbientCanvas();
  initCursorGlow();
  initScrollReveal();
  initNavbar();
  initMLTriageSimulator();
  initDoctorDirectoryModal();
  initResearchArtifactTabs();
  initTerminalCLI();
  initProjectFilters();
  initContactAndToasts();
  initBackToTop();
});

/* ==========================================================================
   DOCTOR & SPECIALIST DATABASE (AIUB Thesis Referral Knowledge Base)
   ========================================================================== */
const DOCTOR_DATABASE = [
  // Cardiology
  {
    name: "Prof. Dr. M. A. Rashid",
    degrees: "MBBS, MD, D.CARD, FACC (USA), FRCP (Glasgow)",
    specialty: "Cardiology",
    specialtyKey: "Cardiology",
    designation: "Professor & Senior Consultant",
    hospital: "Ibrahim Cardiac Hospital & Research Institute",
    expertise: ["Non-Invasive Cardiology", "General Cardiology", "Echocardiography", "Heart Failure"],
    experience: "25+ Years Experience",
    availability: "Sun, Tue, Thu (5:00 PM - 9:00 PM)"
  },
  {
    name: "Prof. Dr. Mir Jamal Uddin",
    degrees: "MD (Cardiology), FACC (USA), FRCP (Edin)",
    specialty: "Cardiology",
    specialtyKey: "Cardiology",
    designation: "Director-cum-Professor",
    hospital: "National Institute of Cardiovascular Diseases (NICVD)",
    expertise: ["Clinical & Interventional Cardiology", "Angiogram", "Coronary Stenting", "Pacemaker"],
    experience: "22+ Years Experience",
    availability: "Mon, Wed, Sat (6:00 PM - 9:30 PM)"
  },
  {
    name: "Dr. Shamsun Nahar",
    degrees: "MBBS, FCPS (Cardiology), FACC (USA)",
    specialty: "Cardiology",
    specialtyKey: "Cardiology",
    designation: "Senior Consultant & Head of Clinical Cardiology",
    hospital: "National Heart Foundation & Research Institute",
    expertise: ["Preventive Cardiology", "Cardiovascular Disease in Women", "Valvular Heart Disease"],
    experience: "18+ Years Experience",
    availability: "Daily (4:00 PM - 8:00 PM)"
  },

  // Pulmonology
  {
    name: "Prof. Dr. Md. Rashidul Hassan",
    degrees: "MBBS, FCPS (Medicine), MD (Chest), FCCP (USA)",
    specialty: "Pulmonology",
    specialtyKey: "Pulmonology",
    designation: "Professor of Respiratory Medicine & Former Director",
    hospital: "National Institute of Diseases of the Chest and Hospital (NIDCH)",
    expertise: ["Asthma & COPD Management", "Bronchopneumonia", "Tuberculosis", "Sleep Apnea"],
    experience: "24+ Years Experience",
    availability: "Sat to Wed (5:30 PM - 9:00 PM)"
  },
  {
    name: "Dr. Asif Mujtaba Mahmud",
    degrees: "MBBS, DTCD, MD (Chest Diseases), FCCP",
    specialty: "Pulmonology",
    specialtyKey: "Pulmonology",
    designation: "Senior Consultant & Associate Professor",
    hospital: "Asgar Ali Hospital / Square Hospital",
    expertise: ["Interventional Pulmonology", "Bronchoscopy", "Interstitial Lung Disease (ILD)"],
    experience: "19+ Years Experience",
    availability: "Sun, Tue, Thu (6:00 PM - 9:00 PM)"
  },

  // Neurology
  {
    name: "Prof. Dr. Mansur Habib",
    degrees: "MBBS, FCPS (Med), MD (Neuro), FRCP (UK), PhD",
    specialty: "Neurology",
    specialtyKey: "Neurology",
    designation: "Professor & Head of Department of Neurology",
    hospital: "Dhaka Medical College & Hospital (DMCH)",
    expertise: ["Stroke Rehabilitation", "Epilepsy Management", "Movement Disorders & Parkinson's"],
    experience: "26+ Years Experience",
    availability: "Mon, Wed, Fri (4:30 PM - 8:30 PM)"
  },
  {
    name: "Dr. Kazi Mohibur Rahman",
    degrees: "MBBS, MD (Neurology), MACP (USA)",
    specialty: "Neurology",
    specialtyKey: "Neurology",
    designation: "Associate Professor of Clinical Neurology",
    hospital: "National Institute of Neurosciences & Hospital (NINS)",
    expertise: ["Migraine & Headache Disorders", "Vertigo & Dizziness", "Peripheral Neuropathy"],
    experience: "16+ Years Experience",
    availability: "Sat, Mon, Wed (5:00 PM - 8:30 PM)"
  },

  // Orthopedics
  {
    name: "Prof. Dr. M. Amjad Hossain",
    degrees: "MBBS, MS (Orthopedics), FACS (USA), FICS",
    specialty: "Orthopedics",
    specialtyKey: "Orthopedics",
    designation: "Senior Consultant & Joint Replacement Surgeon",
    hospital: "Labaid Specialized Hospital / NITOR",
    expertise: ["Total Knee & Hip Replacement", "Arthritis Management", "Trauma & Fracture Surgery"],
    experience: "30+ Years Experience",
    availability: "Sat, Sun, Tue, Thu (6:00 PM - 9:00 PM)"
  },
  {
    name: "Dr. Shahid Durre Ahmed",
    degrees: "MBBS, MS (Ortho), Fellowship in Arthroscopy (Singapore)",
    specialty: "Orthopedics",
    specialtyKey: "Orthopedics",
    designation: "Senior Consultant Orthopedic Surgeon",
    hospital: "Evercare Hospital Dhaka",
    expertise: ["Sports Injury & Ligament Reconstruction", "Arthroscopic Surgery", "Joint Pain"],
    experience: "17+ Years Experience",
    availability: "Sun to Wed (5:00 PM - 8:00 PM)"
  },

  // Gastroenterology
  {
    name: "Prof. Dr. Mahmud Hasan",
    degrees: "MBBS, PhD (UK), FRCP (Edin), FCPS (Pak)",
    specialty: "Gastroenterology",
    specialtyKey: "Gastroenterology",
    designation: "Professor Emeritus of Gastroenterology",
    hospital: "Bangabandhu Sheikh Mujib Medical University (BSMMU)",
    expertise: ["Liver Diseases & Hepatitis", "Peptic Ulcer", "Inflammatory Bowel Disease (IBD)", "Endoscopy"],
    experience: "32+ Years Experience",
    availability: "Mon, Wed, Thu (5:00 PM - 8:30 PM)"
  },
  {
    name: "Dr. Dewan Saifuddin Ahmed",
    degrees: "MBBS, MD (Gastroenterology), FACG (USA)",
    specialty: "Gastroenterology",
    specialtyKey: "Gastroenterology",
    designation: "Professor of Gastroenterology",
    hospital: "DMCH / Popular Diagnostic Centre",
    expertise: ["Gastric Reflux & GERD", "Therapeutic Endoscopy", "Colonoscopy & Polypectomy"],
    experience: "20+ Years Experience",
    availability: "Sat to Thu (6:00 PM - 9:30 PM)"
  },

  // Dermatology
  {
    name: "Prof. Dr. M. U. Kabir Chowdhury",
    degrees: "MBBS, DDV (Vienna), FAMS (Austria), Fellow (WHO)",
    specialty: "Dermatology",
    specialtyKey: "Dermatology",
    designation: "Senior Consultant Dermatologist & Venereologist",
    hospital: "Square Hospitals Ltd. / Samorita Hospital",
    expertise: ["Allergic Skin Disorders", "Eczema & Psoriasis", "Laser & Aesthetic Dermatology"],
    experience: "35+ Years Experience",
    availability: "Sun, Tue, Thu (5:00 PM - 9:00 PM)"
  },
  {
    name: "Dr. Lubna Khondker",
    degrees: "MBBS, DDV, MCPS, FCPS (Dermatology & Venereology)",
    specialty: "Dermatology",
    specialtyKey: "Dermatology",
    designation: "Associate Professor of Dermatology",
    hospital: "BSMMU (PG Hospital) / Ibn Sina Medical",
    expertise: ["Pediatric Dermatology", "Urticaria & Skin Allergy", "Hair & Nail Disorders"],
    experience: "15+ Years Experience",
    availability: "Mon, Wed, Sat (4:30 PM - 8:00 PM)"
  },

  // General Medicine
  {
    name: "Prof. Dr. H. A. M. Nazmul Ahasan",
    degrees: "MBBS, FCPS (Medicine), FRCP (Glasgow, Edin), MACP (USA)",
    specialty: "General Medicine",
    specialtyKey: "General Medicine",
    designation: "Former Professor & Head of Department of Medicine",
    hospital: "Dhaka Medical College & Hospital / Popular Diagnostic",
    expertise: ["Infectious Diseases", "Complex Diagnostic Cases", "Fever of Unknown Origin"],
    experience: "28+ Years Experience",
    availability: "Sat to Wed (6:00 PM - 9:30 PM)"
  }
];

/* ==========================================================================
   1. TYPING HEADLINE ANIMATION
   ========================================================================== */
function initTypingEffect() {
  const typedTextSpan = document.getElementById('typed-text');
  if (!typedTextSpan) return;

  const textArray = [
    "B.Sc in CSE Graduate from AIUB",
    "AI & Machine Learning Engineer",
    "Data Science & Data Analyst",
    "Full-Stack Web Architect (Django/React)",
    "Mobile Systems Specialist (Flutter)",
    "Graphic designer "
  ];
  
  let textArrayIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 90;
  const erasingDelay = 45;
  const newTextDelay = 1800;

  function type() {
    const currentText = textArray[textArrayIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
  }

  setTimeout(type, 600);
}

/* ==========================================================================
   2. AMBIENT PARTICLE CANVAS (60 FPS Interactive Neural Graph)
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('particle-canvas') || document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
  const particles = [];
  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(16, 185, 129, ' : 'rgba(6, 182, 212, ';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion/attraction interaction
      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const lineAlpha = (1 - dist / 120) * 0.18;
          ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. CURSOR GLOW
   ========================================================================= */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4. SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.style.background = 'rgba(7, 10, 15, 0.94)';
      navbar.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.6)';
    } else {
      navbar.style.background = 'rgba(7, 10, 15, 0.82)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
    }
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ==========================================================================
   6. INTERACTIVE ML HEALTH TRIAGE SIMULATOR (With Expandable Doctor List)
   ========================================================================== */
function initMLTriageSimulator() {
  const chips = document.querySelectorAll('.symptom-chip');
  const clearBtn = document.getElementById('clear-symptoms-btn');
  const selectedCountEl = document.getElementById('selected-count');
  const selectedTagsContainer = document.getElementById('selected-tags');
  const emptyState = document.getElementById('triage-empty-state');
  const resultsWrapper = document.getElementById('triage-results');
  const presetBtns = document.querySelectorAll('.preset-btn');

  // Guard for pages without in-line simulator (now hosted on simulator.html)
  if (!selectedCountEl || !resultsWrapper) return;

  // Result Elements
  const topDiseaseName = document.getElementById('top-disease-name');
  const topConfidenceVal = document.getElementById('top-confidence-value');
  const riskLevelTag = document.getElementById('risk-level-tag');
  const riskProgressBar = document.getElementById('risk-progress-bar');
  const specialistName = document.getElementById('specialist-name');
  const specialistCount = document.getElementById('specialist-count');

  // Interactive Accordion Elements
  const specialistToggleHeader = document.getElementById('specialist-toggle-header');
  const btnToggleSpecialists = document.getElementById('btn-toggle-specialists');
  const specialistDoctorsDrawer = document.getElementById('specialist-doctors-drawer');
  const specialistChevron = document.getElementById('specialist-chevron');
  const specialistDoctorsList = document.getElementById('specialist-doctors-list');

  const alt1Name = document.getElementById('alt-1-name');
  const alt1Bar = document.getElementById('alt-1-bar');
  const alt1Pct = document.getElementById('alt-1-pct');

  const alt2Name = document.getElementById('alt-2-name');
  const alt2Bar = document.getElementById('alt-2-bar');
  const alt2Pct = document.getElementById('alt-2-pct');

  let selectedSymptoms = new Set();
  let currentSpecialtyKey = "Cardiology";

  // Symptom Profiles Knowledge Graph
  const conditionMatrix = [
    {
      symptoms: ["Chest Pain", "Chest Tightness", "Irregular Heartbeat", "Shortness of Breath", "Fatigue on Exertion"],
      condition: "Coronary Atherosclerosis / Ischemic Heart Disease",
      confidence: 91,
      risk: "HIGH RISK",
      riskClass: "risk-level-high",
      specialist: "Cardiologist (Heart & Vascular Specialist)",
      specialtyKey: "Cardiology",
      specialistCount: 65,
      alt1: { name: "Hypertensive Crisis", pct: 52 },
      alt2: { name: "Cardiac Arrhythmia", pct: 34 }
    },
    {
      symptoms: ["Shortness of Breath", "Persistent Cough", "High Fever", "Fatigue on Exertion"],
      condition: "Acute Bronchopneumonia / Lower Respiratory Infection",
      confidence: 86,
      risk: "MEDIUM-HIGH RISK",
      riskClass: "risk-level-high",
      specialist: "Pulmonologist (Chest & Respiratory Specialist)",
      specialtyKey: "Pulmonology",
      specialistCount: 42,
      alt1: { name: "Chronic Bronchitis", pct: 48 },
      alt2: { name: "Asthma Exacerbation", pct: 29 }
    },
    {
      symptoms: ["Severe Headache", "Dizziness & Vertigo", "Fatigue on Exertion"],
      condition: "Migraine / Vestibular Neurological Disorder",
      confidence: 84,
      risk: "MODERATE RISK",
      riskClass: "risk-level-med",
      specialist: "Neurologist (Brain & Nerve Specialist)",
      specialtyKey: "Neurology",
      specialistCount: 38,
      alt1: { name: "Tension-type Headache", pct: 44 },
      alt2: { name: "Cervical Spondylosis", pct: 28 }
    },
    {
      symptoms: ["Joint Pain & Swelling", "Fatigue on Exertion"],
      condition: "Rheumatoid Arthritis / Osteoarthritis",
      confidence: 82,
      risk: "LOW-MODERATE RISK",
      riskClass: "risk-level-low",
      specialist: "Orthopedic & Rheumatology Specialist",
      specialtyKey: "Orthopedics",
      specialistCount: 51,
      alt1: { name: "Gouty Arthritis", pct: 39 },
      alt2: { name: "Soft Tissue Tendonitis", pct: 22 }
    },
    {
      symptoms: ["Abdominal Pain", "High Fever"],
      condition: "Acute Gastroenteritis / Peptic Ulcer Syndrome",
      confidence: 85,
      risk: "MODERATE RISK",
      riskClass: "risk-level-med",
      specialist: "Gastroenterologist (Digestive Health Specialist)",
      specialtyKey: "Gastroenterology",
      specialistCount: 34,
      alt1: { name: "Appendicitis (Early Evaluation)", pct: 46 },
      alt2: { name: "Irritable Bowel Syndrome", pct: 27 }
    },
    {
      symptoms: ["Skin Rash & Itching"],
      condition: "Allergic Contact Dermatitis / Urticaria",
      confidence: 89,
      risk: "LOW RISK",
      riskClass: "risk-level-low",
      specialist: "Dermatologist (Skin & Allergy Specialist)",
      specialtyKey: "Dermatology",
      specialistCount: 31,
      alt1: { name: "Eczema / Atopic Dermatitis", pct: 41 },
      alt2: { name: "Psoriasis Plaque", pct: 18 }
    }
  ];

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const symptom = chip.getAttribute('data-symptom');
      if (selectedSymptoms.has(symptom)) {
        selectedSymptoms.delete(symptom);
        chip.classList.remove('active');
      } else {
        selectedSymptoms.add(symptom);
        chip.classList.add('active');
      }
      updateInference();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      selectedSymptoms.clear();
      chips.forEach(c => c.classList.remove('active'));
      if (specialistDoctorsDrawer) specialistDoctorsDrawer.classList.remove('open');
      if (specialistChevron) specialistChevron.classList.remove('rotated');
      updateInference();
      showToast('Symptom inputs cleared.');
    });
  }

  // Presets
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      selectedSymptoms.clear();
      chips.forEach(c => c.classList.remove('active'));

      let targetSymptoms = [];
      if (preset === 'cardiac') {
        targetSymptoms = ["Chest Pain", "Chest Tightness", "Shortness of Breath", "Irregular Heartbeat"];
      } else if (preset === 'respiratory') {
        targetSymptoms = ["Shortness of Breath", "Persistent Cough", "High Fever"];
      } else if (preset === 'neuro') {
        targetSymptoms = ["Severe Headache", "Dizziness & Vertigo"];
      }

      targetSymptoms.forEach(sym => {
        selectedSymptoms.add(sym);
        chips.forEach(c => {
          if (c.getAttribute('data-symptom') === sym) c.classList.add('active');
        });
      });

      updateInference();
      showToast(`Loaded ${btn.textContent.trim()} preset.`);
    });
  });

  // Toggle Doctor Drawer Accordion
  function toggleDoctorDrawer() {
    if (!specialistDoctorsDrawer) return;
    const isOpen = specialistDoctorsDrawer.classList.toggle('open');
    if (specialistChevron) {
      specialistChevron.classList.toggle('rotated', isOpen);
    }
    const toggleText = btnToggleSpecialists ? btnToggleSpecialists.querySelector('.toggle-text') : null;
    if (toggleText) {
      toggleText.textContent = isOpen ? 'Hide Doctors' : 'View Doctors';
    }
  }

  if (specialistToggleHeader) {
    specialistToggleHeader.addEventListener('click', toggleDoctorDrawer);
  }

  if (btnToggleSpecialists) {
    btnToggleSpecialists.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDoctorDrawer();
    });
  }

  function renderInlineDoctors(specialtyKey) {
    if (!specialistDoctorsList) return;
    specialistDoctorsList.innerHTML = '';

    const matchedDocs = DOCTOR_DATABASE.filter(d => d.specialtyKey === specialtyKey);
    const displayDocs = matchedDocs.length > 0 ? matchedDocs : DOCTOR_DATABASE.slice(0, 2);

    displayDocs.forEach(doc => {
      const card = document.createElement('div');
      card.className = 'doctor-mini-card';
      
      const tagsHTML = doc.expertise.slice(0, 3).map(tag => `<span class="doc-mini-tag">${tag}</span>`).join('');

      card.innerHTML = `
        <div class="doc-mini-avatar">
          <i class="fa-solid fa-user-doctor"></i>
        </div>
        <div class="doc-mini-info">
          <h5 class="doc-mini-name">${doc.name}</h5>
          <div class="doc-mini-deg">${doc.degrees}</div>
          <div class="doc-mini-inst"><i class="fa-solid fa-hospital"></i> ${doc.hospital}</div>
          <div class="doc-mini-tags">${tagsHTML}</div>
        </div>
      `;
      specialistDoctorsList.appendChild(card);
    });
  }

  function updateInference() {
    selectedCountEl.textContent = selectedSymptoms.size;

    // Render tags
    if (selectedSymptoms.size === 0) {
      selectedTagsContainer.innerHTML = '<span class="no-selection-hint">No symptoms selected yet. Pick from above.</span>';
      emptyState.style.display = 'block';
      resultsWrapper.style.display = 'none';
      return;
    }

    selectedTagsContainer.innerHTML = '';
    selectedSymptoms.forEach(sym => {
      const tag = document.createElement('span');
      tag.className = 'active-tag';
      tag.textContent = sym;
      selectedTagsContainer.appendChild(tag);
    });

    emptyState.style.display = 'none';
    resultsWrapper.style.display = 'block';

    // Calculate Best Condition Match
    let bestMatch = null;
    let maxOverlap = -1;

    conditionMatrix.forEach(item => {
      let overlap = 0;
      item.symptoms.forEach(s => {
        if (selectedSymptoms.has(s)) overlap++;
      });
      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        bestMatch = item;
      }
    });

    if (!bestMatch || maxOverlap === 0) {
      bestMatch = conditionMatrix[0]; // fallback
    }

    currentSpecialtyKey = bestMatch.specialtyKey;

    // Dynamic confidence adjustment
    const calculatedConf = Math.min(Math.max(65 + (maxOverlap * 7), 74), 96);

    topDiseaseName.textContent = bestMatch.condition;
    topConfidenceVal.textContent = `${calculatedConf}%`;
    riskLevelTag.textContent = bestMatch.risk;
    riskLevelTag.className = bestMatch.riskClass;
    riskProgressBar.style.width = `${calculatedConf}%`;

    specialistName.textContent = bestMatch.specialist;
    specialistCount.innerHTML = `<i class="fa-solid fa-hospital-user"></i> ${bestMatch.specialistCount} Verified Specialists Mapped`;

    alt1Name.textContent = bestMatch.alt1.name;
    alt1Bar.style.width = `${bestMatch.alt1.pct}%`;
    alt1Pct.textContent = `${bestMatch.alt1.pct}%`;

    alt2Name.textContent = bestMatch.alt2.name;
    alt2Bar.style.width = `${bestMatch.alt2.pct}%`;
    alt2Pct.textContent = `${bestMatch.alt2.pct}%`;

    // Render corresponding verified specialists
    renderInlineDoctors(bestMatch.specialtyKey);
  }
}

/* ==========================================================================
   7. FULL DOCTOR DIRECTORY MODAL
   ========================================================================== */
function initDoctorDirectoryModal() {
  const modalBackdrop = document.getElementById('doctor-modal-backdrop');
  const openModalBtn = document.getElementById('open-full-directory-btn');
  const closeModalBtn = document.getElementById('close-doctor-modal');
  const searchInput = document.getElementById('doctor-search-input');
  const specTabs = document.querySelectorAll('.spec-tab');
  const doctorGrid = document.getElementById('modal-doctor-grid');

  if (!modalBackdrop || !doctorGrid) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function openModal() {
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderDoctors();
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderDoctors();
    });
  }

  // Specialty tabs
  specTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      specTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-spec');
      renderDoctors();
    });
  });

  function renderDoctors() {
    doctorGrid.innerHTML = '';

    const filtered = DOCTOR_DATABASE.filter(doc => {
      const matchCategory = (currentCategory === 'all') || (doc.specialtyKey === currentCategory);
      const matchSearch = !searchQuery || 
        doc.name.toLowerCase().includes(searchQuery) ||
        doc.degrees.toLowerCase().includes(searchQuery) ||
        doc.hospital.toLowerCase().includes(searchQuery) ||
        doc.specialty.toLowerCase().includes(searchQuery) ||
        doc.expertise.some(exp => exp.toLowerCase().includes(searchQuery));
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      doctorGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; color: var(--text-dim);">
          <i class="fa-solid fa-user-doctor" style="font-size: 2.5rem; opacity: 0.3; margin-bottom: 0.8rem; display: block;"></i>
          <h4>No specialists found matching your search.</h4>
          <p style="font-size: 0.85rem;">Try adjusting the filter or search keyword.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(doc => {
      const card = document.createElement('div');
      card.className = 'doctor-full-card';

      const tagsHTML = doc.expertise.map(t => `<span class="doc-card-tag">${t}</span>`).join('');

      card.innerHTML = `
        <div class="doc-card-top">
          <div class="doc-card-avatar">
            <i class="fa-solid fa-user-doctor"></i>
          </div>
          <div class="doc-card-info">
            <h4 class="doc-card-name">${doc.name}</h4>
            <div class="doc-card-deg">${doc.degrees}</div>
            <span class="doc-card-spec-badge">${doc.specialty}</span>
          </div>
        </div>
        <div class="doc-card-hosp">
          <strong><i class="fa-solid fa-hospital"></i> ${doc.hospital}</strong>
          <div style="font-size: 0.76rem; color: var(--text-dim); margin-top: 2px;">
            <i class="fa-solid fa-clock"></i> ${doc.availability} • <span class="text-accent">${doc.experience}</span>
          </div>
        </div>
        <div class="doc-card-tags">${tagsHTML}</div>
        <div class="doc-card-footer">
          <span style="font-size: 0.78rem; color: var(--accent-emerald);"><i class="fa-solid fa-circle-check"></i> Verified Referral</span>
          <button class="btn-slot-book" onclick="bookAppointment('${doc.name.replace(/'/g, "\\'")}')">
            <i class="fa-solid fa-calendar-check"></i> Request Consultation
          </button>
        </div>
      `;
      doctorGrid.appendChild(card);
    });
  }
}

// Global booking toast simulation
window.bookAppointment = function(doctorName) {
  showToast(`Consultation referral requested for ${doctorName}!`);
};

/* ==========================================================================
   8. DEVELOPER CLI TERMINAL
   ========================================================================== */
function initTerminalCLI() {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const sendBtn = document.getElementById('terminal-send-btn');
  const quickChips = document.querySelectorAll('.term-chip');

  if (!terminalBody || !terminalInput) return;

  const commands = {
    help: `
      Available Commands:
      --------------------------------------------------
      <span class="text-accent">about</span>       - Summary of Golam Rabbani's engineering profile
      <span class="text-accent">skills</span>      - Full technical skill stack breakdown
      <span class="text-accent">projects</span>    - List of key repositories and systems
      <span class="text-accent">thesis</span>      - Details on B.Sc Thesis (Smart Health Assistant)
      <span class="text-accent">grade</span>       - View official B.Sc Grade Report PDF
      <span class="text-accent">cv</span>          - View full curriculum vitae (ATS formatted)
      <span class="text-accent">doctors</span>     - Open verified specialist directory
      <span class="text-accent">contact</span>     - Direct contact info and email
      <span class="text-accent">hire</span>        - Why Golam Rabbani is an asset to your engineering team
      <span class="text-accent">github</span>      - Link to GitHub profile (@GolamRabbani09)
      <span class="text-accent">clear</span>       - Clear terminal window
    `,
    cv: `
      <strong class="text-accent">Golam Rabbani — Curriculum Vitae (CV)</strong>
      --------------------------------------------------
      • Specialization: AI & Full-Stack Software Engineer (Major: Info Systems, Minor: Comp Eng)
      • Education: B.Sc in CSE, AIUB (142 Credits Completed)
      • View Online & Printable PDF: <a href="cv.html" class="link-highlight">Open Golam Rabbani CV Page (A4 Print Ready) ↗</a>
    `,
    resume: `
      <strong class="text-accent">Golam Rabbani — Curriculum Vitae (CV)</strong>
      --------------------------------------------------
      • Specialization: AI & Full-Stack Software Engineer (Major: Info Systems, Minor: Comp Eng)
      • Education: B.Sc in CSE, AIUB (142 Credits Completed)
      • View Online & Printable PDF: <a href="cv.html" class="link-highlight">Open Golam Rabbani CV Page (A4 Print Ready) ↗</a>
    `,
    about: `
      <strong class="text-accent">Golam Rabbani</strong> — AI & Full-Stack Software Engineer
      --------------------------------------------------
      • B.Sc in CSE graduate from American International University-Bangladesh (AIUB).
      • Major in Information Systems | Minor in Computer Engineering.
      • Combines machine learning research (TabNet, XGBoost, MLP) with production full-stack engineering (Django, React, FastAPI, Flutter).
      • Proven builder of enterprise ERPs, clinical AI triage systems, 3D graphics engines, and cybersecurity scanners.
    `,
    skills: `
      <strong class="text-accent">Technical Skill Matrix:</strong>
      --------------------------------------------------
      [AI & ML]        : PyTorch, TabNet, XGBoost, LightGBM, Keras MLP, Scikit-Learn, OpenCV
      [Backend/APIs]   : FastAPI, Django & DRF, Python, Pydantic, PostgreSQL, SQLite, REST
      [Mobile/Frontend]: Flutter, Dart, React.js, JavaScript (ES6+), HTML5, CSS3/Grid
      [Graphics/Tools] : C++, OpenGL 3D, Git, GitHub, Linux/Bash, Render Cloud, Colab GPU
    `,
    projects: `
      <strong class="text-accent">Authentic Repositories (@GolamRabbani09):</strong>
      --------------------------------------------------
      1. <a href="https://github.com/GolamRabbani09/Theses" target="_blank" class="link-highlight">Theses</a> — Smart Health Assistant (FastAPI + Flutter + 6 ML Models)
      2. <a href="https://github.com/GolamRabbani09/DATA-WAREHOUSING-AND-DATA-MINING-" target="_blank" class="link-highlight">DATA-WAREHOUSING-AND-DATA-MINING-</a> — Data Warehousing, ETL, OLAP & Data Mining (Scikit-Learn)
      3. <a href="https://github.com/GolamRabbani09/SmartERP" target="_blank" class="link-highlight">SmartERP</a> — Enterprise Multi-tenant ERP (Django + React)
      4. <a href="https://github.com/GolamRabbani09/Village-Scenario" target="_blank" class="link-highlight">Village-Scenario</a> — 3D Day/Night Engine (C++ / OpenGL)
      5. <a href="https://github.com/GolamRabbani09/Network_Scan" target="_blank" class="link-highlight">Network_Scan</a> — Python Network & Port Vulnerability Auditor
      6. <a href="https://github.com/GolamRabbani09/CVPR" target="_blank" class="link-highlight">CVPR</a> — Computer Vision & Pattern Recognition Pipelines
      7. <a href="https://github.com/GolamRabbani09/MilManement" target="_blank" class="link-highlight">MilManement</a> — Hostel & Meal Accounting Automation
    `,
    thesis: `
      <strong class="text-accent">B.Sc Thesis: Smart Health Assistant</strong>
      --------------------------------------------------
      • Dataset: 200,000+ symptom-disease records consolidated across 4 datasets.
      • Evaluation: 5-Fold Stratified Cross-Validation on 512 disease classes.
      • Top Performance: Dense MLP (94.81% Top-3), TabNet (93.99%), XGBoost (93.58%).
      • Deployment: Serialized Logistic Regression on FastAPI with Flutter client for <20ms latency.
      • Specialist Routing: 296+ Verified physicians categorized across 7 medical domains.
      • Supervisor: Syeda Anika Tasnim (AIUB).
    `,
    grade: `
      <strong class="text-accent">B.Sc Grade Report (AIUB - CSE):</strong>
      --------------------------------------------------
      • Student Name: <strong>RABBANI, GOLAM</strong> (Student ID: 22-46560-1)
      • Degree: Bachelor of Science in Computer Science & Engineering
      • Specialization: Major in Information Systems | Minor in Computer Engineering
      • Completed: 142 Credits | 54 Completed Courses
      • Official PDF: <a href="assets/docs/bsc_grade_report.pdf" target="_blank" class="link-highlight">Open Official B.Sc Grade Report PDF ↗</a>
    `,
    bsc: `
      <strong class="text-accent">B.Sc Grade Report (AIUB - CSE):</strong>
      --------------------------------------------------
      • Student Name: <strong>RABBANI, GOLAM</strong> (Student ID: 22-46560-1)
      • Degree: Bachelor of Science in Computer Science & Engineering
      • Specialization: Major in Information Systems | Minor in Computer Engineering
      • Completed: 142 Credits | 54 Completed Courses
      • Official PDF: <a href="assets/docs/bsc_grade_report.pdf" target="_blank" class="link-highlight">Open Official B.Sc Grade Report PDF ↗</a>
    `,
    doctors: `
      Opening verified medical specialists directory... (296 doctors mapped across Cardiology, Pulmonology, Neurology, Orthopedics, Gastroenterology, Dermatology)
    `,
    contact: `
      <strong class="text-accent">Connect with Golam Rabbani:</strong>
      --------------------------------------------------
      • Email  : <span class="text-accent">golamrabbani.dev0@gmail.com</span>
      • GitHub : <a href="https://github.com/GolamRabbani09" target="_blank" class="link-highlight">github.com/GolamRabbani09</a>
      • Status : Available for full-time roles & project collaborations
    `,
    hire: `
      <strong class="text-accent">Why Hire Golam Rabbani?</strong>
      --------------------------------------------------
      ✓ End-to-End Product Execution: From research papers to live deployed mobile/web apps.
      ✓ Deep Technical Versatility: Comfortable from low-level C++ to neural network training to modern React frontends.
      ✓ Proven Reliability: Handles messy real-world datasets and architects practical, fast solutions.
    `,
    github: `
      Opening GitHub profile... <a href="https://github.com/GolamRabbani09" target="_blank" class="link-highlight">https://github.com/GolamRabbani09</a>
    `
  };

  function executeCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    
    // Add user line
    const userLine = document.createElement('div');
    userLine.className = 'term-line user-line';
    userLine.innerHTML = `<span class="term-prompt"><span class="user">visitor@rabbani</span>:<span class="path">~</span>$</span> ${escapeHTML(cmd)}`;
    terminalBody.appendChild(userLine);

    if (cleanCmd === 'clear') {
      terminalBody.innerHTML = '';
    } else if (commands[cleanCmd]) {
      const outputLine = document.createElement('div');
      outputLine.className = 'term-line output-line';
      outputLine.innerHTML = commands[cleanCmd];
      terminalBody.appendChild(outputLine);
      if (cleanCmd === 'github') {
        window.open('https://github.com/GolamRabbani09', '_blank');
      } else if (cleanCmd === 'doctors') {
        window.location.href = 'simulator.html';
      }
    } else if (cleanCmd === '') {
      // do nothing
    } else {
      const errorLine = document.createElement('div');
      errorLine.className = 'term-line output-line';
      errorLine.innerHTML = `<span style="color: #f43f5e;">command not found: ${escapeHTML(cmd)}</span>. Type <span class="text-yellow">help</span> for a list of valid commands.`;
      terminalBody.appendChild(errorLine);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
    terminalInput.value = '';
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    }
  });

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      executeCommand(terminalInput.value);
    });
  }

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

/* ==========================================================================
   9. PROJECT CATEGORY FILTER
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   10. CONTACT FORM & TOAST SYSTEM
   ========================================================================== */
function initContactAndToasts() {
  const copyBtn = document.getElementById('copy-email-btn');
  const heroEmailBtn = document.getElementById('hero-email-btn');
  const emailText = document.getElementById('email-text');
  const contactForm = document.getElementById('portfolio-contact-form');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      copyEmail(emailText.textContent.trim());
    });
  }

  if (heroEmailBtn) {
    heroEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmail('golamrabbani.dev0@gmail.com');
    });
  }

  function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Email copied: ${email}`);
    }).catch(() => {
      showToast(`Email: ${email}`);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('form-submit-btn');
      const originalBtnContent = submitBtn ? submitBtn.innerHTML : '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';

      const nameVal = contactForm.querySelector('[name="name"]')?.value.trim() || '';
      const emailVal = contactForm.querySelector('[name="email"]')?.value.trim() || '';
      const subjectVal = contactForm.querySelector('[name="subject"]')?.value.trim() || 'New Portfolio Inquiry';
      const messageVal = contactForm.querySelector('[name="message"]')?.value.trim() || '';

      if (!nameVal || !emailVal || !messageVal) {
        showToast('⚠️ Please fill in all required fields.');
        return;
      }

      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Email...';
        submitBtn.disabled = true;
      }

      // Format clean message body
      const fullSubject = `[Portfolio Contact] ${subjectVal} - from ${nameVal}`;
      const fullBody = `Hi Golam,

My Name: ${nameVal}
My Email: ${emailVal}
Subject: ${subjectVal}

Message:
${messageVal}

--------------------------------------------------
Sent from Golam Rabbani Portfolio (golamrabbani.dev0@gmail.com)`;

      // Construct direct Gmail web link and mailto link
      const encodedSubject = encodeURIComponent(fullSubject);
      const encodedBody = encodeURIComponent(fullBody);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=golamrabbani.dev0@gmail.com&su=${encodedSubject}&body=${encodedBody}`;
      const mailtoUrl = `mailto:golamrabbani.dev0@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

      // Open Gmail composer directly
      const win = window.open(gmailUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = mailtoUrl;
      }

      // Background dual delivery attempt via FormSubmit
      fetch('https://formsubmit.co/ajax/golamrabbani.dev0@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          subject: fullSubject,
          message: fullBody,
          _template: 'table',
          _captcha: 'false'
        })
      }).catch(() => {});

      showToast('🚀 Opening Gmail directly to send to golamrabbani.dev0@gmail.com!');

      if (submitBtn) {
        submitBtn.innerHTML = '<span>Opening Gmail...</span> <i class="fa-solid fa-check"></i>';
        setTimeout(() => {
          submitBtn.innerHTML = originalBtnContent;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
}

function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-accent"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   11. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   12. RESEARCH ARTIFACT TABS SWITCHER
   ========================================================================== */
function initResearchArtifactTabs() {
  const tabs = document.querySelectorAll('.art-tab');
  const panels = document.querySelectorAll('.artifact-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

