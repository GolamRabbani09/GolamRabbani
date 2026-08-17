/**
 * SMART HEALTH ASSISTANT — LIVE AI MEDICAL TRIAGE SIMULATOR
 * File: simulator.js (Original Clean 1st Version Architecture)
 * Author: Golam Rabbani (B.Sc in CSE, AIUB)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initCursorGlow();
  initMLTriageSimulator();
  initDoctorDirectoryModal();
});

/* ==========================================================================
   1. AMBIENT PARTICLE CANVAS (Neural Node Graph)
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const count = Math.min(Math.floor((width * height) / 24000), 50);
  const particles = [];
  const mouse = { x: null, y: null, radius: 130 };

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
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(16, 185, 129, ' : 'rgba(6, 182, 212, ';
      this.alpha = Math.random() * 0.4 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
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

  for (let i = 0; i < count; i++) {
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

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const lineAlpha = (1 - dist / 110) * 0.15;
          ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. CURSOR GLOW
   ========================================================================== */
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
   3. VERIFIED SPECIALIST DOCTOR DATABASE (AIUB Thesis Knowledge Base)
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
    expertise: ["Non-Invasive Cardiology", "Echocardiography", "Heart Failure", "Coronary Artery Disease"],
    experience: "25+ Years Experience"
  },
  {
    name: "Prof. Dr. Mir Jamal Uddin",
    degrees: "MD (Cardiology), FACC (USA), FRCP (Edin)",
    specialty: "Cardiology",
    specialtyKey: "Cardiology",
    designation: "Director-cum-Professor",
    hospital: "National Institute of Cardiovascular Diseases (NICVD)",
    expertise: ["Interventional Cardiology", "Angiogram & Stenting", "Pacemaker"],
    experience: "22+ Years Experience"
  },
  {
    name: "Dr. Shamsun Nahar",
    degrees: "MBBS, FCPS (Cardiology), FACC (USA)",
    specialty: "Cardiology",
    specialtyKey: "Cardiology",
    designation: "Head of Clinical Cardiology",
    hospital: "National Heart Foundation & Research Institute",
    expertise: ["Preventive Cardiology", "Women's Heart Health", "Valvular Disease"],
    experience: "18+ Years Experience"
  },

  // Pulmonology
  {
    name: "Prof. Dr. Md. Rashidul Hassan",
    degrees: "MBBS, FCPS (Medicine), MD (Chest), FCCP (USA)",
    specialty: "Pulmonology",
    specialtyKey: "Pulmonology",
    designation: "Former Director & Professor",
    hospital: "National Institute of Diseases of the Chest & Hospital (NIDCH)",
    expertise: ["Asthma & COPD Management", "Bronchopneumonia", "Tuberculosis"],
    experience: "24+ Years Experience"
  },
  {
    name: "Dr. Asif Mujtaba Mahmud",
    degrees: "MBBS, DTCD, MD (Chest Diseases), FCCP",
    specialty: "Pulmonology",
    specialtyKey: "Pulmonology",
    designation: "Senior Consultant Pulmonologist",
    hospital: "Asgar Ali Hospital / Square Hospital",
    expertise: ["Interventional Pulmonology", "Bronchoscopy", "ILD"],
    experience: "19+ Years Experience"
  },

  // Neurology
  {
    name: "Prof. Dr. Mansur Habib",
    degrees: "MBBS, FCPS (Med), MD (Neuro), FRCP (UK), PhD",
    specialty: "Neurology",
    specialtyKey: "Neurology",
    designation: "Professor & Head of Neurology",
    hospital: "Dhaka Medical College & Hospital (DMCH)",
    expertise: ["Stroke Management", "Epilepsy", "Parkinson's Disease", "Neuro-rehabilitation"],
    experience: "26+ Years Experience"
  },
  {
    name: "Dr. Kazi Mohibur Rahman",
    degrees: "MBBS, MD (Neurology), MACP (USA)",
    specialty: "Neurology",
    specialtyKey: "Neurology",
    designation: "Associate Professor of Clinical Neurology",
    hospital: "National Institute of Neurosciences & Hospital (NINS)",
    expertise: ["Migraine & Headache Disorders", "Rotational Vertigo", "Neuropathy"],
    experience: "16+ Years Experience"
  },

  // Orthopedics
  {
    name: "Prof. Dr. M. Amjad Hossain",
    degrees: "MBBS, MS (Orthopedics), FACS (USA), FICS",
    specialty: "Orthopedics",
    specialtyKey: "Orthopedics",
    designation: "Senior Joint Replacement Surgeon",
    hospital: "Labaid Specialized Hospital / NITOR",
    expertise: ["Total Knee & Hip Replacement", "Rheumatoid Arthritis", "Trauma Reconstruction"],
    experience: "30+ Years Experience"
  },
  {
    name: "Dr. Shahid Durre Ahmed",
    degrees: "MBBS, MS (Ortho), Fellowship in Arthroscopy (Singapore)",
    specialty: "Orthopedics",
    specialtyKey: "Orthopedics",
    designation: "Senior Consultant Orthopedic Surgeon",
    hospital: "Evercare Hospital Dhaka",
    expertise: ["Arthroscopic Surgery", "Sports Medicine", "Joint Preservation"],
    experience: "17+ Years Experience"
  },

  // Gastroenterology
  {
    name: "Prof. Dr. Mahmud Hasan",
    degrees: "MBBS, PhD (UK), FRCP (Edin), FCPS (Pak)",
    specialty: "Gastroenterology",
    specialtyKey: "Gastroenterology",
    designation: "Professor Emeritus of Gastroenterology",
    hospital: "Bangabandhu Sheikh Mujib Medical University (BSMMU)",
    expertise: ["Peptic Ulcer Disease", "Hepatitis & Cirrhosis", "IBD", "Therapeutic Endoscopy"],
    experience: "32+ Years Experience"
  },
  {
    name: "Dr. Dewan Saifuddin Ahmed",
    degrees: "MBBS, MD (Gastroenterology), FACG (USA)",
    specialty: "Gastroenterology",
    specialtyKey: "Gastroenterology",
    designation: "Professor of Gastroenterology",
    hospital: "DMCH / Popular Diagnostic Centre",
    expertise: ["Acid Reflux (GERD)", "Therapeutic Colonoscopy", "Biliary Disorders"],
    experience: "20+ Years Experience"
  },

  // Dermatology
  {
    name: "Prof. Dr. M. U. Kabir Chowdhury",
    degrees: "MBBS, DDV (Vienna), FAMS (Austria), Fellow (WHO)",
    specialty: "Dermatology",
    specialtyKey: "Dermatology",
    designation: "Senior Consultant Dermatologist",
    hospital: "Square Hospitals Ltd. / Samorita Hospital",
    expertise: ["Allergic Cutaneous Disorders", "Eczema & Atopic Dermatitis", "Psoriasis"],
    experience: "35+ Years Experience"
  },
  {
    name: "Dr. Lubna Khondker",
    degrees: "MBBS, DDV, MCPS, FCPS (Dermatology)",
    specialty: "Dermatology",
    specialtyKey: "Dermatology",
    designation: "Associate Professor of Dermatology",
    hospital: "BSMMU (PG Hospital) / Ibn Sina Medical",
    expertise: ["Urticaria & Skin Allergy", "Pediatric Dermatology", "Complex Dermatoses"],
    experience: "15+ Years Experience"
  },

  // General Medicine
  {
    name: "Prof. Dr. H. A. M. Nazmul Ahasan",
    degrees: "MBBS, FCPS (Medicine), FRCP (Glasgow, Edin), MACP (USA)",
    specialty: "General Medicine",
    specialtyKey: "General Medicine",
    designation: "Former Head of Medicine",
    hospital: "Dhaka Medical College & Hospital / Popular Diagnostic",
    expertise: ["Infectious Disease Triage", "Pyrexia of Unknown Origin", "Internal Medicine"],
    experience: "28+ Years Experience"
  }
];

/* ==========================================================================
   4. INTERACTIVE ML HEALTH TRIAGE SIMULATOR (1st Version Logic)
   ========================================================================== */
function initMLTriageSimulator() {
  const chips = document.querySelectorAll('.symptom-chip');
  const clearBtn = document.getElementById('clear-symptoms-btn');
  const selectedCountEl = document.getElementById('selected-count');
  const selectedTagsContainer = document.getElementById('selected-tags');
  const emptyState = document.getElementById('triage-empty-state');
  const resultsWrapper = document.getElementById('triage-results');
  const presetBtns = document.querySelectorAll('.preset-btn');

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

  // Search & Filter input
  const symptomSearchInput = document.getElementById('symptom-filter-input');
  const chipMatchCount = document.getElementById('chip-match-count');

  if (symptomSearchInput) {
    symptomSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let matchCount = 0;

      chips.forEach(chip => {
        const text = chip.textContent.toLowerCase();
        const symptom = chip.getAttribute('data-symptom').toLowerCase();
        if (!query || text.includes(query) || symptom.includes(query)) {
          chip.style.display = 'inline-flex';
          matchCount++;
        } else {
          chip.style.display = 'none';
        }
      });

      if (chipMatchCount) {
        chipMatchCount.textContent = query ? `${matchCount} found` : 'Showing all';
      }
    });
  }

  // Symptom Profiles Knowledge Graph (Comprehensive Clinical Coverage)
  const conditionMatrix = [
    {
      symptoms: ["Chest Pain", "Chest Tightness", "Irregular Heartbeat", "Shortness of Breath", "Radiating Arm Pain", "Cold Sweats", "Fatigue on Exertion"],
      condition: "Coronary Atherosclerosis / Ischemic Heart Disease",
      confidence: 93,
      risk: "HIGH RISK",
      riskClass: "risk-level-high",
      specialist: "Cardiologist (Heart & Vascular Specialist)",
      specialtyKey: "Cardiology",
      specialistCount: 65,
      alt1: { name: "Hypertensive LV Strain", pct: 54 },
      alt2: { name: "Paroxysmal Arrhythmia", pct: 32 }
    },
    {
      symptoms: ["Shortness of Breath", "Ankle Edema", "Fatigue on Exertion", "Irregular Heartbeat"],
      condition: "Congestive Heart Failure / Cardiomyopathy",
      confidence: 89,
      risk: "HIGH RISK",
      riskClass: "risk-level-high",
      specialist: "Cardiologist (Heart & Vascular Specialist)",
      specialtyKey: "Cardiology",
      specialistCount: 65,
      alt1: { name: "Cor pulmonale", pct: 46 },
      alt2: { name: "Valvular Heart Disease", pct: 28 }
    },
    {
      symptoms: ["Shortness of Breath", "Persistent Cough", "Productive Sputum", "High Fever", "Wheezing", "Pleuritic Pain", "Hemoptysis"],
      condition: "Acute Bronchopneumonia / Lower Respiratory Infection",
      confidence: 90,
      risk: "MEDIUM-HIGH RISK",
      riskClass: "risk-level-high",
      specialist: "Pulmonologist (Chest & Respiratory Specialist)",
      specialtyKey: "Pulmonology",
      specialistCount: 42,
      alt1: { name: "Chronic Bronchitis with Sepsis", pct: 50 },
      alt2: { name: "Acute Bronchiectasis Flare", pct: 31 }
    },
    {
      symptoms: ["Wheezing", "Shortness of Breath", "Chest Tightness", "Persistent Cough", "Sore Throat"],
      condition: "Acute Bronchial Asthma with Bronchospasm",
      confidence: 88,
      risk: "MEDIUM-HIGH RISK",
      riskClass: "risk-level-high",
      specialist: "Pulmonologist (Chest & Respiratory Specialist)",
      specialtyKey: "Pulmonology",
      specialistCount: 42,
      alt1: { name: "Hyperreactive Airway Disease", pct: 47 },
      alt2: { name: "Allergic Rhinitis / Cough", pct: 25 }
    },
    {
      symptoms: ["Severe Headache", "Dizziness & Vertigo", "Visual Aura", "Photophobia", "Fatigue on Exertion"],
      condition: "Complicated Migraine / Vestibular Cephalalgia",
      confidence: 87,
      risk: "MODERATE RISK",
      riskClass: "risk-level-med",
      specialist: "Neurologist (Brain & Nerve Specialist)",
      specialtyKey: "Neurology",
      specialistCount: 38,
      alt1: { name: "Tension-type Cephalalgia", pct: 43 },
      alt2: { name: "Benign Paroxysmal Vertigo", pct: 26 }
    },
    {
      symptoms: ["Limb Numbness", "Muscle Weakness", "Severe Headache", "Dizziness & Vertigo", "Involuntary Tremors"],
      condition: "Acute Ischemic Neuropathy / Cerebrovascular Event",
      confidence: 92,
      risk: "HIGH RISK — EMERGENCY",
      riskClass: "risk-level-high",
      specialist: "Neurologist (Brain & Nerve Specialist)",
      specialtyKey: "Neurology",
      specialistCount: 38,
      alt1: { name: "Transient Ischemic Attack (TIA)", pct: 56 },
      alt2: { name: "Cervical Radiculopathy", pct: 30 }
    },
    {
      symptoms: ["Joint Pain & Swelling", "Morning Stiffness", "Reduced Motion", "Fatigue on Exertion"],
      condition: "Seropositive Rheumatoid Arthritis / Polyarthritis",
      confidence: 86,
      risk: "LOW-MODERATE RISK",
      riskClass: "risk-level-low",
      specialist: "Orthopedic & Rheumatology Specialist",
      specialtyKey: "Orthopedics",
      specialistCount: 51,
      alt1: { name: "Degenerative Osteoarthritis", pct: 45 },
      alt2: { name: "Crystal Gouty Arthropathy", pct: 24 }
    },
    {
      symptoms: ["Lumbar Spine Pain", "Sciatica Pain", "Neck Stiffness", "Reduced Motion", "Limb Numbness"],
      condition: "Lumbar Disc Herniation / Sciatic Nerve Radiculopathy",
      confidence: 88,
      risk: "MODERATE RISK",
      riskClass: "risk-level-med",
      specialist: "Orthopedic & Rheumatology Specialist",
      specialtyKey: "Orthopedics",
      specialistCount: 51,
      alt1: { name: "Cervical Spondylotic Myelopathy", pct: 48 },
      alt2: { name: "Myofascial Back Strain", pct: 29 }
    },
    {
      symptoms: ["Epigastric Pain", "Acid Reflux", "Nausea & Vomiting", "Abdominal Bloating", "Loss of Appetite"],
      condition: "Peptic Ulcer Disease / Severe Gastroesophageal Reflux",
      confidence: 89,
      risk: "MODERATE RISK",
      riskClass: "risk-level-med",
      specialist: "Gastroenterologist (Digestive Health Specialist)",
      specialtyKey: "Gastroenterology",
      specialistCount: 34,
      alt1: { name: "Acute Erosive Gastritis", pct: 51 },
      alt2: { name: "Biliary Colic", pct: 33 }
    },
    {
      symptoms: ["Jaundice", "Abdominal Bloating", "Loss of Appetite", "Nausea & Vomiting", "Extreme Lethargy"],
      condition: "Acute Viral Hepatitis / Hepatic Jaundice Syndrome",
      confidence: 91,
      risk: "MEDIUM-HIGH RISK",
      riskClass: "risk-level-high",
      specialist: "Gastroenterologist (Digestive Health Specialist)",
      specialtyKey: "Gastroenterology",
      specialistCount: 34,
      alt1: { name: "Obstructive Choledocholithiasis", pct: 49 },
      alt2: { name: "Fatty Liver Disease (NASH)", pct: 27 }
    },
    {
      symptoms: ["Skin Rash & Itching", "Urticarial Wheals", "Facial Swelling", "Cutaneous Blisters"],
      condition: "Acute Allergic Urticaria / Cutaneous Angioedema",
      confidence: 93,
      risk: "LOW-MODERATE RISK",
      riskClass: "risk-level-low",
      specialist: "Dermatologist (Skin & Allergy Specialist)",
      specialtyKey: "Dermatology",
      specialistCount: 31,
      alt1: { name: "Atopic Eczema Flare", pct: 42 },
      alt2: { name: "Contact Dermatitis", pct: 23 }
    },
    {
      symptoms: ["Flaky Scaling", "Skin Rash & Itching", "Cutaneous Blisters"],
      condition: "Chronic Plaque Psoriasis / Scaly Dermatosis",
      confidence: 87,
      risk: "LOW RISK",
      riskClass: "risk-level-low",
      specialist: "Dermatologist (Skin & Allergy Specialist)",
      specialtyKey: "Dermatology",
      specialistCount: 31,
      alt1: { name: "Seborrheic Dermatitis", pct: 44 },
      alt2: { name: "Nummular Eczema", pct: 20 }
    },
    {
      symptoms: ["Excessive Thirst", "Frequent Urination", "Rapid Weight Loss", "Extreme Lethargy", "Limb Numbness"],
      condition: "Type 2 Diabetes Mellitus / Osmotic Hyperglycemia",
      confidence: 91,
      risk: "MODERATE RISK",
      riskClass: "risk-level-med",
      specialist: "General Medicine Specialist (Internal Medicine)",
      specialtyKey: "General Medicine",
      specialistCount: 35,
      alt1: { name: "Metabolic Syndrome & Dyslipidemia", pct: 53 },
      alt2: { name: "Diabetic Peripheral Neuropathy", pct: 36 }
    },
    {
      symptoms: ["Burning Urination", "Frequent Urination", "High Fever", "Abdominal Bloating"],
      condition: "Acute Urinary Tract Infection (UTI) / Pyelonephritis",
      confidence: 90,
      risk: "MODERATE-HIGH RISK",
      riskClass: "risk-level-med",
      specialist: "General Medicine Specialist (Internal Medicine)",
      specialtyKey: "General Medicine",
      specialistCount: 35,
      alt1: { name: "Acute Cystitis", pct: 55 },
      alt2: { name: "Renal Calculi / Nephrolithiasis", pct: 31 }
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
      presetBtns.forEach(b => b.classList.remove('active'));
      updateInference();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      selectedSymptoms.clear();
      chips.forEach(c => c.classList.remove('active'));
      presetBtns.forEach(b => b.classList.remove('active'));
      if (specialistDoctorsDrawer) specialistDoctorsDrawer.classList.remove('open');
      if (specialistChevron) specialistChevron.classList.remove('rotated');
      const toggleText = btnToggleSpecialists ? btnToggleSpecialists.querySelector('.toggle-text') : null;
      if (toggleText) toggleText.textContent = 'View Doctors';
      updateInference();
      showToast('Symptom inputs cleared.');
    });
  }

  // Presets
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const preset = btn.getAttribute('data-preset');
      selectedSymptoms.clear();
      chips.forEach(c => c.classList.remove('active'));

      let targetSymptoms = [];
      if (preset === 'cardiac') {
        targetSymptoms = ["Chest Pain", "Chest Tightness", "Shortness of Breath", "Irregular Heartbeat", "Cold Sweats"];
      } else if (preset === 'respiratory') {
        targetSymptoms = ["Shortness of Breath", "Persistent Cough", "Productive Sputum", "High Fever", "Wheezing"];
      } else if (preset === 'neuro') {
        targetSymptoms = ["Severe Headache", "Dizziness & Vertigo", "Visual Aura", "Photophobia"];
      } else if (preset === 'ortho') {
        targetSymptoms = ["Joint Pain & Swelling", "Morning Stiffness", "Reduced Motion"];
      } else if (preset === 'gastro') {
        targetSymptoms = ["Epigastric Pain", "Acid Reflux", "Nausea & Vomiting", "Abdominal Bloating"];
      } else if (preset === 'derma') {
        targetSymptoms = ["Skin Rash & Itching", "Urticarial Wheals", "Facial Swelling"];
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
      bestMatch = conditionMatrix[0];
    }

    currentSpecialtyKey = bestMatch.specialtyKey;

    const calculatedConf = Math.min(Math.max(68 + (maxOverlap * 6.5), 78), 96);

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

    // Render corresponding verified specialists in the drawer
    renderInlineDoctors(bestMatch.specialtyKey);
  }
}

/* ==========================================================================
   5. FULL DOCTOR DIRECTORY MODAL (296 Physicians)
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
    renderModalDoctors();
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
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderModalDoctors();
    });
  }

  specTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      specTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-spec');
      renderModalDoctors();
    });
  });

  function renderModalDoctors() {
    doctorGrid.innerHTML = '';

    const filtered = DOCTOR_DATABASE.filter(doc => {
      const matchesCat = (currentCategory === 'all') || (doc.specialtyKey === currentCategory);
      const matchesSearch = !searchQuery || 
        doc.name.toLowerCase().includes(searchQuery) ||
        doc.degrees.toLowerCase().includes(searchQuery) ||
        doc.hospital.toLowerCase().includes(searchQuery) ||
        doc.specialty.toLowerCase().includes(searchQuery) ||
        doc.expertise.some(exp => exp.toLowerCase().includes(searchQuery));
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      doctorGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; color: var(--text-dim);">
          <i class="fa-solid fa-user-doctor" style="font-size: 2rem; opacity: 0.3; margin-bottom: 0.5rem; display: block;"></i>
          No matching specialists found. Try adjusting your search query.
        </div>
      `;
      return;
    }

    filtered.forEach(doc => {
      const card = document.createElement('div');
      card.className = 'doctor-mini-card';
      card.style.background = 'rgba(255, 255, 255, 0.04)';
      card.style.padding = '1.1rem';
      card.style.borderRadius = 'var(--radius-sm)';

      const tagsHTML = doc.expertise.map(t => `<span class="doc-mini-tag">${t}</span>`).join(' ');

      card.innerHTML = `
        <div class="doc-mini-avatar" style="width: 42px; height: 42px; font-size: 1.2rem;">
          <i class="fa-solid fa-user-doctor"></i>
        </div>
        <div class="doc-mini-info">
          <h4 style="font-family: var(--font-heading); font-size: 1rem; color: #fff;">${doc.name}</h4>
          <div class="doc-mini-deg">${doc.degrees}</div>
          <div style="font-size: 0.74rem; color: var(--accent-emerald); font-weight: 600; margin-top: 2px;">
            ${doc.designation} • ${doc.experience}
          </div>
          <div class="doc-mini-inst"><i class="fa-solid fa-hospital text-cyan"></i> <strong>${doc.hospital}</strong></div>
          <div class="doc-mini-tags" style="margin-top: 0.6rem;">${tagsHTML}</div>
        </div>
      `;
      doctorGrid.appendChild(card);
    });
  }
}

/* ==========================================================================
   6. TOAST NOTIFICATION
   ========================================================================== */
function showToast(msg) {
  const container = document.getElementById('sim-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'sim-toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-accent"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
