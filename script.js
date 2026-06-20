// ── DOM Elements ──
const destinationSelect = document.getElementById('destination');
const daysInput = document.getElementById('days');
const generateBtn = document.getElementById('generate-btn');
const progressSection = document.getElementById('progress-section');
const checklistSection = document.getElementById('checklist-section');
const checklistEl = document.getElementById('checklist');
const checklistTitle = document.getElementById('checklist-title');
const progressBar = document.getElementById('progress-bar');
const progressLabel = document.getElementById('progress-label');
const progressSub = document.getElementById('progress-sub');
const resetBtn = document.getElementById('reset-btn');

// ── Packing Data ──
const packingData = {
  snow: {
    label: '❄️ Snow / Trek',
    base: [
      { name: 'Thermal base layer (top)', category: 'Clothing' },
      { name: 'Thermal base layer (bottom)', category: 'Clothing' },
      { name: 'Fleece jacket', category: 'Clothing' },
      { name: 'Windcheater / Shell jacket', category: 'Clothing' },
      { name: 'Waterproof trekking pants', category: 'Clothing' },
      { name: 'Wool socks (2 pairs)', category: 'Clothing' },
      { name: 'Insulated gloves', category: 'Gear' },
      { name: 'Woolen hat / Balaclava', category: 'Gear' },
      { name: 'Neck gaiter', category: 'Gear' },
      { name: 'Trekking boots (waterproof)', category: 'Gear' },
      { name: 'Trekking poles', category: 'Gear' },
      { name: 'Gaiters', category: 'Gear' },
      { name: 'Crampons / Microspikes', category: 'Gear' },
      { name: 'Headlamp + extra batteries', category: 'Gear' },
      { name: 'Sleeping bag (-10°C rated)', category: 'Gear' },
      { name: 'Sunscreen SPF 50+', category: 'Health' },
      { name: 'Lip balm with SPF', category: 'Health' },
      { name: 'Altitude sickness medicine', category: 'Health' },
      { name: 'First aid kit', category: 'Health' },
      { name: 'Water bottle (insulated)', category: 'Essentials' },
      { name: 'Energy bars / Trail mix', category: 'Essentials' },
      { name: 'Map / GPS device', category: 'Essentials' },
      { name: 'Emergency whistle', category: 'Essentials' },
      { name: 'Passport / ID copy', category: 'Documents' },
      { name: 'Trek permit', category: 'Documents' },
    ],
    extraPerDay: [
      { name: 'Extra thermal socks', category: 'Clothing' },
      { name: 'Hand warmers', category: 'Gear' },
      { name: 'Extra energy bars', category: 'Essentials' },
    ],
  },

  hill: {
    label: '⛰️ Hill / Hike',
    base: [
      { name: 'Moisture-wicking t-shirts (2)', category: 'Clothing' },
      { name: 'Lightweight trekking pants', category: 'Clothing' },
      { name: 'Fleece or light jacket', category: 'Clothing' },
      { name: 'Rain poncho / Packable raincoat', category: 'Clothing' },
      { name: 'Trekking socks (2 pairs)', category: 'Clothing' },
      { name: 'Comfortable trekking shoes', category: 'Gear' },
      { name: 'Trekking poles', category: 'Gear' },
      { name: 'Daypack (20-30L)', category: 'Gear' },
      { name: 'Headlamp', category: 'Gear' },
      { name: 'Sleeping bag (comfort rated)', category: 'Gear' },
      { name: 'Sunscreen SPF 30+', category: 'Health' },
      { name: 'Insect repellent', category: 'Health' },
      { name: 'First aid kit', category: 'Health' },
      { name: 'ORS packets', category: 'Health' },
      { name: 'Water bottle (1L)', category: 'Essentials' },
      { name: 'Water purification tablets', category: 'Essentials' },
      { name: 'Trail snacks', category: 'Essentials' },
      { name: 'Trekking map / Compass', category: 'Essentials' },
      { name: 'Lighter / Matches', category: 'Essentials' },
      { name: 'Passport / ID copy', category: 'Documents' },
      { name: 'Travel insurance document', category: 'Documents' },
    ],
    extraPerDay: [
      { name: 'Extra change of clothes', category: 'Clothing' },
      { name: 'Extra snacks', category: 'Essentials' },
      { name: 'Extra water purification tablets', category: 'Essentials' },
    ],
  },

  terai: {
    label: '🌿 Terai / Safari',
    base: [
      { name: 'Lightweight cotton shirts (2)', category: 'Clothing' },
      { name: 'Breathable trousers', category: 'Clothing' },
      { name: 'Neutral color clothing (khaki/olive)', category: 'Clothing' },
      { name: 'Wide-brim sun hat', category: 'Clothing' },
      { name: 'Comfortable walking shoes', category: 'Gear' },
      { name: 'Binoculars', category: 'Gear' },
      { name: 'Camera / Phone with good camera', category: 'Gear' },
      { name: 'Headlamp / Torch', category: 'Gear' },
      { name: 'Sunscreen SPF 50+', category: 'Health' },
      { name: 'Strong insect repellent (DEET)', category: 'Health' },
      { name: 'Anti-malaria tablets', category: 'Health' },
      { name: 'First aid kit', category: 'Health' },
      { name: 'ORS packets', category: 'Health' },
      { name: 'Water bottle (1L)', category: 'Essentials' },
      { name: 'Snacks for jungle drive', category: 'Essentials' },
      { name: 'Cash (small jungle areas)', category: 'Essentials' },
      { name: 'Passport / ID copy', category: 'Documents' },
      { name: 'National Park entry permit', category: 'Documents' },
    ],
    extraPerDay: [
      { name: 'Extra breathable shirt', category: 'Clothing' },
      { name: 'Extra insect repellent', category: 'Health' },
      { name: 'Extra water bottle', category: 'Essentials' },
    ],
  },
};

// ── State ──
let currentList = [];

// ── Generate List ──
function generateList() {
  const destination = destinationSelect.value;
  const days = parseInt(daysInput.value);

  if (!destination) {
    destinationSelect.focus();
    return;
  }

  if (!days || days < 1) {
    daysInput.focus();
    return;
  }

  const data = packingData[destination];
  const extras = [];

  // add extra items based on days
  const extraCycles = Math.min(days, 5);
  for (let i = 0; i < extraCycles; i++) {
    data.extraPerDay.forEach(item => {
      extras.push({ ...item, name: `${item.name} (Day ${i + 1})` });
    });
  }

  currentList = [
    ...data.base.map(item => ({ ...item, checked: false })),
    ...extras.map(item => ({ ...item, checked: false })),
  ];

  checklistTitle.textContent = `${data.label} — ${days} Day${days > 1 ? 's' : ''}`;

  renderList();
  progressSection.removeAttribute('hidden');
  checklistSection.removeAttribute('hidden');
  updateProgress();
}

// ── Render List ──
function renderList() {
  checklistEl.innerHTML = '';

  currentList.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('checklist-item');
    if (item.checked) li.classList.add('checked');
    li.dataset.index = index;

    li.innerHTML = `
      <div class="item-checkbox"></div>
      <span class="item-label">${item.name}</span>
      <span class="item-category">${item.category}</span>
    `;

    li.addEventListener('click', () => toggleItem(index));
    checklistEl.appendChild(li);
  });
}

// ── Toggle Item ──
function toggleItem(index) {
  currentList[index].checked = !currentList[index].checked;
  animateItem(index);
  setTimeout(() => {
    renderList();
    updateProgress();
  }, 150);
}

// ── Update Progress ──
function updateProgress() {
  const total = currentList.length;
  const checked = currentList.filter(i => i.checked).length;
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

  progressBar.style.width = `${percent}%`;
  progressLabel.textContent = `${percent}%`;
  progressSub.textContent = `${checked} of ${total} items packed`;

  const completedMsg = document.getElementById('completed-msg');

  if (percent === 100) {
    progressBar.classList.add('complete');
    completedMsg.classList.add('visible');
  } else {
    progressBar.classList.remove('complete');
    completedMsg.classList.remove('visible');
  }
}

// ── Event Listeners ──
generateBtn.addEventListener('click', generateList);

resetBtn.addEventListener('click', () => {
  currentList = [];
  checklistEl.innerHTML = '';
  progressSection.setAttribute('hidden', '');
  checklistSection.setAttribute('hidden', '');
  destinationSelect.value = '';
  daysInput.value = '';
});

// ── Smooth Item Animation ──
function animateItem(index) {
  const items = checklistEl.querySelectorAll('.checklist-item');
  const item = items[index];
  if (!item) return;

  item.style.transform = 'scale(0.97)';
  setTimeout(() => {
    item.style.transform = 'scale(1)';
  }, 150);
}