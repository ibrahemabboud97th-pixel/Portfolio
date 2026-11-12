// Built-in content. The site shows this until you import it into the database from admin.html.
(function () {
  const gallery = []; let o = 0;
  const add = (section, image, caption, project) =>
    gallery.push({ id: 'g' + (++o), section, image, caption, project: project || '', order: o });

  add('clinical', 'images/gallery/clinical-1.jpg', 'Pre-operative consultation');
  add('clinical', 'images/gallery/clinical-2.jpg', 'Spinal anesthesia procedure');
  add('clinical', 'images/gallery/clinical-3.jpg', 'Monitoring in the operating room');
  add('clinical', 'images/gallery/clinical-4.jpg', 'Surgical ICU team');
  add('research', 'images/gallery/research-1.jpg', 'Hands-on lab work, fusion protein course');
  add('research', 'images/gallery/research-2.jpg', 'Oral presentation of the review');
  add('research', 'images/gallery/research-3.jpg', 'In silico protein design with colleagues');
  add('maak', 'images/gallery/maak-1.jpg', 'With children in a psychosocial session');
  add('maak', 'images/gallery/maak-2.jpg', 'Ma\'ak volunteers');
  add('maak', 'images/gallery/maak-3.jpg', 'Rehabilitating the headquarters');
  add('maak', 'images/gallery/maak-4.jpg', 'Association events');
  add('teaching', 'images/gallery/teaching-1.jpg', 'Lecture in the anesthesia department');
  add('teaching', 'images/gallery/teaching-2.jpg', 'Dialogue facilitation session');
  add('teaching', 'images/gallery/teaching-3.jpg', 'Debate training');
  add('teaching', 'images/gallery/teaching-4.jpg', 'Mediterranean Student Summit, Urbino');

  const projects = [
    { id: 'orphans-2026', title: 'Support for Cancer Patients & Orphans', categories: 'medical psy relief', period: 'Feb – Apr 2026', funding: '$10,000 · Rahma Worldwide & Syrian American Council',
      text: 'Medical treatment and diagnostics, psychological support events, and orphan support (education grants, food, holiday clothing).',
      numbers: '43|patients\n133|medical services\n144|children at events\n15|wigs\n60|orphan families\n18|education grants\n38|children clothed' },
    { id: 'hala-saeed', title: 'Dr. Hala Saeed\'s Charitable Project', categories: 'relief medical', period: 'From 8 Feb 2023', funding: 'With Latakia Governorate, Syria Trust for Development, Souria Btjmana',
      text: 'Launched after the 6 February 2023 earthquake in memory of the doctors who lost their lives: food, medicine, shelter and relief supplies for affected families, while still supporting cancer patients.',
      numbers: '~4,000|beneficiaries\n475|food baskets\n650|meals\n1,305|infant formula\n358|chronic medications\n1,257|clothing' },
    { id: 'unhcr-children', title: 'Supporting & Empowering Children with Cancer', categories: 'psy edu', period: '', funding: 'UNHCR · Syria Trust for Development',
      text: 'Psychosocial and recreational support, educational support, and awareness and support sessions for families of children with cancer.', numbers: '' },
    { id: 'room-rehab', title: 'Psychological Support Room Rehabilitation', categories: 'psy', period: '', funding: '$1,000 · Violet Organization & ActionAid',
      text: 'Turned a gloomy hospital room at Latakia University Hospital into a safe, colorful activity space for children with cancer, on a very small budget.', numbers: '' },
    { id: 'education', title: 'Educational Sessions Program', categories: 'edu', period: 'Ongoing', funding: '',
      text: 'Closing learning gaps caused by long treatment: sessions at the headquarters, in hospital or at home, and recognition of children who completed middle and high school certificates in 2024.',
      numbers: '250+|sessions\n43|children (5–15 yrs)' },
    { id: 'medical-program', title: 'Medical Program', categories: 'medical', period: 'Dec 2022 – 2026', funding: '',
      text: 'Free chemotherapy and diagnostics for children and adults: PET, MRI, CT, tumor markers, histopathology with immunohistochemistry, bone marrow and genetic testing. I built its structure and led it as Head of the Medical Program.',
      numbers: '350+|beneficiaries\n1,800|chemo doses\n220|tests' },
    { id: 'awareness-2024', title: 'Childhood Cancer Awareness Campaign', categories: 'aware', period: 'Sept 2024', funding: '',
      text: 'Campaign for Global Childhood Cancer Awareness Month covering eight schools in Latakia Governorate and several children\'s activity centers, supported by a media campaign.', numbers: '8|schools' },
    { id: 'stronger', title: '"You Are Stronger Than Cancer"', categories: 'psy aware', period: 'Ongoing', funding: '',
      text: 'Launched at the Cancer Survivor Ceremony to highlight survivor stories and give hope and determination to current patients. A long-term supportive initiative.', numbers: '' },
    { id: 'coastal-relief', title: 'Coastal Disaster Relief', categories: 'relief', period: '2024 – 2025', funding: '',
      text: 'Relief aid for people in need and victims of multiple disasters in the Syrian coastal region, including necessities for the elderly and children.',
      numbers: '415|food baskets\n650|hygiene kits\n200|families clothed' },
    { id: 'events', title: 'Celebrations & Recreational Events', categories: 'psy', period: '2023 – 2026', funding: '',
      text: 'Christmas, Eid al-Fitr, Eid al-Adha and World Cancer Day events for children with cancer and orphans, with partner organizations; yoga and sports activities.', numbers: '9|events in 2025–26' }
  ].map((p, i) => ({ ...p, order: i + 1 }));

  projects.forEach(p => {
    add('maak', 'images/gallery/projects/' + p.id + '-1.jpg', p.title, p.id);
    add('maak', 'images/gallery/projects/' + p.id + '-2.jpg', p.title, p.id);
    add('maak', 'images/gallery/projects/' + p.id + '-3.jpg', p.title, p.id);
  });

  window.SITE_DEFAULTS = {
    stats: [
      { id: 'p-clinical', group: 'pillars', label: 'Clinical', value: '900+', caption: 'Surgeries assisted in anesthesia, including 11 critical neurological cases', link: '#clinical', order: 1 },
      { id: 'p-research', group: 'pillars', label: 'Research & Learning', value: '10+', caption: 'Courses and trainings in neuroscience, critical care, biotechnology and bioinformatics', link: '#training', order: 2 },
      { id: 'p-human', group: 'pillars', label: 'Humanitarian', value: '10,000+', caption: 'Beneficiaries reached through Ma\'ak across health, psychosocial, educational and relief programs', link: '#maak', order: 3 },
      { id: 'p-teach', group: 'pillars', label: 'Teaching & Leadership', value: '40+', caption: 'Hours of debate training delivered, alongside dialogue facilitation and clinical teaching', link: '#teaching', order: 4 },
      { id: 'm-medical', group: 'maak', label: 'Medical Program', value: '350+', caption: 'Beneficiaries of free treatment and diagnostics', link: '', order: 1 },
      { id: 'm-chemo', group: 'maak', label: '', value: '1,800', caption: 'Chemotherapy doses provided', link: '', order: 2 },
      { id: 'm-tests', group: 'maak', label: '', value: '220', caption: 'Diagnostic and follow-up tests', link: '', order: 3 },
      { id: 'm-psy', group: 'maak', label: '', value: '1,000+', caption: 'Psychological support sessions for children', link: '', order: 4 },
      { id: 'm-edu', group: 'maak', label: '', value: '250+', caption: 'Educational sessions', link: '', order: 5 },
      { id: 'm-vol', group: 'maak', label: '', value: '390', caption: 'Volunteers in the association structure', link: '', order: 6 },
      { id: 'm-all', group: 'maak', label: '', value: '10,000+', caption: 'Beneficiaries across all sectors', link: '', order: 7 },
      { id: 'm-since', group: 'maak', label: '', value: '2019', caption: 'Began as a student volunteer initiative', link: '', order: 8 }
    ],
    roles: [
      { id: 'c1', group: 'clinical', date: '2023', title: 'Residency begins', text: 'Perioperative care for diverse surgical cases with a focus on neuropharmacology, and pre-operative optimization for patients with neurological or psychiatric conditions.', order: 1 },
      { id: 'c2', group: 'clinical', date: 'Ongoing', title: 'Neuro-ICU & surgical ICU', text: 'Daily neurological assessment of neurocritical patients (stroke, TBI), managing delirium and sedation-related altered consciousness; supervising first-year residents and protocol adherence.', order: 2 },
      { id: 'c3', group: 'clinical', date: 'Ongoing', title: 'Emergency on-call', text: 'Multiple-trauma cases with neurological and vital assessment in the surgical emergency department.', order: 3 },
      { id: 'c4', group: 'clinical', date: 'Hospital initiatives', title: 'Protocols & forms', text: 'Contributed to the pre-operative preparation form and hospital-specific protocols for surgical preparation.', order: 4 },
      { id: 'm1', group: 'maak', date: '2019', title: '"We Care" volunteer team', text: 'Started with fellow 4th-year medical students, covering the needs of children in the oncology building at Latakia University Hospital (1,000+ doses annually).', order: 1 },
      { id: 'm2', group: 'maak', date: '22 Nov 2022 – 20 Mar 2024', title: 'Chairman of the Board', text: 'Led the legal registration across governorates (license No. 2789) and the official launch of activities in December 2022.', order: 2 },
      { id: 'm3', group: 'maak', date: '20 Mar 2024 – 13 Mar 2025', title: 'Executive Director & Head of the Medical Program', text: 'Built the medical program structure, managed medical files and treatment services, oversaw about 20 department heads, and developed the 2024 and 2025 annual strategic plans.', order: 3 },
      { id: 'm4', group: 'maak', date: '13 Mar 2025 – 23 Apr 2026', title: 'Board Advisor & Strategic Planning Director', text: 'Authored the main developmental plan (60 worksheets), designed policies and procedures, and coordinated partners and donors.', order: 4 },
      { id: 'm5', group: 'maak', date: '23 Apr 2026 – Present', title: 'Board Treasurer & Project Manager', text: 'Managing finances and project delivery across health, psychosocial, educational and relief sectors.', order: 5 }
    ],
    projects,
    research: [
      { id: 'r1', tag: 'Review · 2026', title: 'IgG fusion proteins for neurological disease', text: 'Narrative review on IgG fusion proteins as a blood-brain barrier-crossing platform for Alzheimer\'s and Parkinson\'s disease, with prospects for stroke and TBI. Focus on CD98hc, insulin and transferrin receptors. Presented orally during the ICGEB/AEC course.', link: '', order: 1 },
      { id: 'r2', tag: 'In silico · 2026', title: 'Novel protein design for acute stroke', text: 'Collaborative design of a novel protein for acute stroke, tested in silico with computational analysis of its protein folding.', link: '', order: 2 },
      { id: 'r3', tag: 'Multi-center', title: 'Global Neurotrauma Outcomes Study: Spine', text: 'Leader of the data collection team at Tishreen University Hospital for the NIHR Global Health Research Group on Neurotrauma.', link: '', order: 3 },
      { id: 'r4', tag: 'Oncology', title: 'Pediatric oncology records', text: 'Organized and standardized the medical records of about 200 pediatric oncology patients at the Cancer Research Center to support future retrospective studies; sustained later through Ma\'ak.', link: '', order: 4 },
      { id: 'r5', tag: 'Publication · 2023', title: 'Breast cancer awareness among women on the Syrian coast', text: 'Cross-sectional study published in Annals of Medicine & Surgery.', link: '', order: 5 },
      { id: 'r6', tag: 'Next', title: 'Neuromatch-based research project', text: 'Building a computational neuroscience project following the Neuromatch Academy course.', link: '', order: 6 }
    ],
    trainings: [
      { id: 't1', year: 'Sep 2026', title: 'Fusion Protein Biotechnology: Design, Application and Innovation', org: 'Atomic Energy Commission of Syria & ICGEB · Damascus · 7.5 h theory + 20 h practical: cloning, mammalian cell culture, FPLC purification, Western blot, ELISA', category: 'bio', order: 1 },
      { id: 't2', year: 'Jul–Sep 2026', title: 'Introduction to Bioinformatics (IBT2026)', org: 'African Bioinformatics Institute & AfriGen-D · 72-hour online program', category: 'bio', order: 2 },
      { id: 't3', year: 'Jul 2026', title: 'Computational Neuroscience', org: 'Neuromatch Academy · model fitting, GLMs, dynamical systems, Bayesian decisions, reinforcement learning, network causality', category: 'neuro', order: 3 },
      { id: 't4', year: 'Jun 2026', title: 'Digital Brain Twins in Clinical Research', org: 'Charité · Online', category: 'neuro', order: 4 },
      { id: 't5', year: 'Nov 2025', title: 'Brain Stroke and Neuro ICU', org: 'SAMS Institute · On-site · ASPECTS, mRS, NIHSS, intensive care for stroke patients', category: 'clin', order: 5 },
      { id: 't6', year: 'Aug 2025', title: 'Critical Care Course (24 hours)', org: 'On-site · ICU liberation, pain and agitation, delirium, sedation, sleep promotion, mechanical ventilation, sepsis', category: 'clin', order: 6 },
      { id: 't7', year: 'Jul 2024', title: 'Psychological First Aid', org: 'Johns Hopkins University · Online', category: 'neuro', order: 7 },
      { id: 't8', year: 'Dec 2022', title: 'Fundamental Neuroscience for Neuroimaging', org: 'Johns Hopkins University · Online', category: 'neuro', order: 8 },
      { id: 't9', year: 'Feb 2021', title: 'Medical Neuroscience', org: 'Duke University · Online', category: 'neuro', order: 9 },
      { id: 't10', year: 'Dec 2020', title: 'Childhood Adversity: Impact of Maltreatment on Mental Health', org: 'University College London · Online', category: 'neuro', order: 10 }
    ],
    links: [
      { id: 'l1', group: 'contact', icon: '✉️', label: 'Personal email', sub: 'ibrahemabboud97th@gmail.com', url: 'mailto:ibrahemabboud97th@gmail.com', order: 1 },
      { id: 'l2', group: 'contact', icon: '🎓', label: 'Academic email', sub: 'ibrahem.a.abboud@latakia-univ.edu.sy', url: 'mailto:ibrahem.a.abboud@latakia-univ.edu.sy', order: 2 },
      { id: 'l3', group: 'contact', icon: '📞', label: 'Phone / WhatsApp', sub: '+963 997 891 260', url: 'tel:+963997891260', order: 3 },
      { id: 'l4', group: 'contact', icon: '💼', label: 'LinkedIn', sub: 'ibrahem-abboud', url: 'https://www.linkedin.com/in/ibrahem-abboud-80a1101bb', order: 4 },
      { id: 'l5', group: 'contact', icon: '🆔', label: 'ORCID', sub: '0000-0001-7927-5020', url: 'https://orcid.org/0000-0001-7927-5020', order: 5 },
      { id: 'l6', group: 'contact', icon: '📘', label: 'Facebook', sub: 'Ibrahem Adnan Abboud', url: 'https://www.facebook.com/ibrahem.adnan.abboud?mibextid=ZbWKwL', order: 6 },
      { id: 'k1', group: 'maak', icon: '💜', label: 'Ma\'ak on Facebook', sub: 'Maak Association for Supporting Cancer Patients', url: 'https://www.facebook.com/share/1BnfCkTg3w/', order: 1 },
      { id: 'k2', group: 'maak', icon: '📸', label: 'Ma\'ak on Instagram', sub: '@maak.association', url: 'https://www.instagram.com/maak.association', order: 2 },
      { id: 'q1', group: 'research', icon: '🆔', label: 'ORCID: all my research', sub: '0000-0001-7927-5020', url: 'https://orcid.org/0000-0001-7927-5020', order: 1 }
    ],
    gallery
  };
})();
