/* ========================================
   ADMIN PANEL - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    renderAll();
    initProjetForm();
    initParcoursForm();
    initCompetenceForm();
    initGlobalActions();
});

/* ========================================
   TABS
   ======================================== */
function initTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.admin-panel').forEach(p => p.style.display = 'none');
            document.getElementById('panel-' + tab.dataset.tab).style.display = 'block';
        });
    });
}

/* ========================================
   RENDER ALL
   ======================================== */
function renderAll() {
    const data = getData();
    renderProjets(data.projets);
    renderParcours(data.parcours);
    renderCompetences(data.competences);
}

/* ========================================
   PROJETS
   ======================================== */
function renderProjets(projets) {
    const list = document.getElementById('listProjets');
    if (!projets.length) {
        list.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:40px;">Aucun projet. Cliquez sur "Ajouter un projet" pour commencer.</p>';
        return;
    }
    list.innerHTML = projets.map((p, i) => `
        <div class="admin-item">
            <div class="admin-item-icon"><i class="fas ${p.icone}"></i></div>
            <div class="admin-item-info">
                <h4>${p.nom}</h4>
                <p>${p.description}</p>
            </div>
            <div class="admin-item-meta">
                <span class="badge">${p.semestre}</span>
                <span class="badge">${getCatLabel(p.categorie)}</span>
            </div>
            <div class="admin-item-actions">
                <button onclick="editProjet(${i})" title="Modifier"><i class="fas fa-pen"></i></button>
                <button class="btn-delete" onclick="deleteProjet(${i})" title="Supprimer"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function getCatLabel(cat) {
    const labels = { dev: 'Dev', reseau: 'Réseau', bdd: 'BDD', securite: 'Sécu', autre: 'Autre' };
    return labels[cat] || cat;
}

function initProjetForm() {
    document.getElementById('btnAddProjet').addEventListener('click', () => {
        document.getElementById('formProjetTitle').textContent = 'Ajouter un projet';
        document.getElementById('projetForm').reset();
        document.getElementById('projetId').value = '';
        document.getElementById('formProjet').style.display = 'flex';
    });

    document.getElementById('closeFormProjet').addEventListener('click', () => {
        document.getElementById('formProjet').style.display = 'none';
    });
    document.getElementById('cancelProjet').addEventListener('click', () => {
        document.getElementById('formProjet').style.display = 'none';
    });

    document.getElementById('projetForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = getData();
        const idx = document.getElementById('projetId').value;
        
        const projet = {
            id: generateId(document.getElementById('projetNom').value),
            nom: document.getElementById('projetNom').value,
            semestre: document.getElementById('projetSemestre').value,
            categorie: document.getElementById('projetCategorie').value,
            description: document.getElementById('projetDescription').value,
            details: document.getElementById('projetDetails').value,
            competences: document.getElementById('projetCompetences').value.split(',').map(s => s.trim()).filter(Boolean),
            technologies: document.getElementById('projetTechnologies').value.split(',').map(s => s.trim()).filter(Boolean),
            icone: document.getElementById('projetIcone').value,
            lien: document.getElementById('projetLien').value,
            objectifs: document.getElementById('projetObjectifs').value.split('\n').map(s => s.trim()).filter(Boolean),
            resultats: document.getElementById('projetResultats').value
        };

        if (idx !== '') {
            data.projets[parseInt(idx)] = projet;
            showToast('Projet modifié !');
        } else {
            data.projets.push(projet);
            showToast('Projet ajouté !');
        }

        saveData(data);
        renderProjets(data.projets);
        document.getElementById('formProjet').style.display = 'none';
    });
}

window.editProjet = function(idx) {
    const data = getData();
    const p = data.projets[idx];
    document.getElementById('formProjetTitle').textContent = 'Modifier le projet';
    document.getElementById('projetId').value = idx;
    document.getElementById('projetNom').value = p.nom;
    document.getElementById('projetSemestre').value = p.semestre;
    document.getElementById('projetCategorie').value = p.categorie;
    document.getElementById('projetDescription').value = p.description;
    document.getElementById('projetDetails').value = p.details || '';
    document.getElementById('projetCompetences').value = (p.competences || []).join(', ');
    document.getElementById('projetTechnologies').value = (p.technologies || []).join(', ');
    document.getElementById('projetIcone').value = p.icone || 'fa-code';
    document.getElementById('projetLien').value = p.lien || '';
    document.getElementById('projetObjectifs').value = (p.objectifs || []).join('\n');
    document.getElementById('projetResultats').value = p.resultats || '';
    document.getElementById('formProjet').style.display = 'flex';
};

window.deleteProjet = function(idx) {
    if (!confirm('Supprimer ce projet ?')) return;
    const data = getData();
    data.projets.splice(idx, 1);
    saveData(data);
    renderProjets(data.projets);
    showToast('Projet supprimé');
};

/* ========================================
   PARCOURS
   ======================================== */
function renderParcours(parcours) {
    const list = document.getElementById('listParcours');
    if (!parcours.length) {
        list.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:40px;">Aucune expérience. Cliquez sur "Ajouter" pour commencer.</p>';
        return;
    }
    list.innerHTML = parcours.map((p, i) => `
        <div class="admin-item">
            <div class="admin-item-icon"><i class="fas ${p.icone}"></i></div>
            <div class="admin-item-info">
                <h4>${p.titre}</h4>
                <p>${p.lieu} — ${p.date}</p>
            </div>
            <div class="admin-item-actions">
                <button onclick="moveParcoursUp(${i})" title="Monter" ${i === 0 ? 'disabled style="opacity:0.3"' : ''}><i class="fas fa-arrow-up"></i></button>
                <button onclick="moveParcoursDown(${i})" title="Descendre" ${i === parcours.length - 1 ? 'disabled style="opacity:0.3"' : ''}><i class="fas fa-arrow-down"></i></button>
                <button onclick="editParcours(${i})" title="Modifier"><i class="fas fa-pen"></i></button>
                <button class="btn-delete" onclick="deleteParcours(${i})" title="Supprimer"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function initParcoursForm() {
    document.getElementById('btnAddParcours').addEventListener('click', () => {
        document.getElementById('formParcoursTitle').textContent = 'Ajouter une expérience';
        document.getElementById('parcoursForm').reset();
        document.getElementById('parcoursIdx').value = '';
        document.getElementById('formParcours').style.display = 'flex';
    });

    document.getElementById('closeFormParcours').addEventListener('click', () => {
        document.getElementById('formParcours').style.display = 'none';
    });
    document.getElementById('cancelParcours').addEventListener('click', () => {
        document.getElementById('formParcours').style.display = 'none';
    });

    document.getElementById('parcoursForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = getData();
        const idx = document.getElementById('parcoursIdx').value;
        const type = document.getElementById('parcoursType').value;

        const item = {
            id: generateId(document.getElementById('parcoursTitre').value),
            date: document.getElementById('parcoursDate').value,
            titre: document.getElementById('parcoursTitre').value,
            lieu: document.getElementById('parcoursLieu').value,
            icone: type === 'formation' ? 'fa-graduation-cap' : (type === 'projet' ? 'fa-rocket' : 'fa-briefcase'),
            lieuIcone: type === 'formation' ? 'fa-university' : 'fa-building',
            description: document.getElementById('parcoursDescription').value,
            tags: document.getElementById('parcoursTags').value.split(',').map(s => s.trim()).filter(Boolean)
        };

        if (idx !== '') {
            data.parcours[parseInt(idx)] = item;
            showToast('Expérience modifiée !');
        } else {
            data.parcours.unshift(item);
            showToast('Expérience ajoutée !');
        }

        saveData(data);
        renderParcours(data.parcours);
        document.getElementById('formParcours').style.display = 'none';
    });
}

window.editParcours = function(idx) {
    const data = getData();
    const p = data.parcours[idx];
    document.getElementById('formParcoursTitle').textContent = 'Modifier l\'expérience';
    document.getElementById('parcoursIdx').value = idx;
    document.getElementById('parcoursDate').value = p.date;
    document.getElementById('parcoursTitre').value = p.titre;
    document.getElementById('parcoursLieu').value = p.lieu;
    document.getElementById('parcoursDescription').value = p.description;
    document.getElementById('parcoursTags').value = (p.tags || []).join(', ');
    const typeSelect = document.getElementById('parcoursType');
    if (p.icone === 'fa-graduation-cap') typeSelect.value = 'formation';
    else if (p.icone === 'fa-rocket') typeSelect.value = 'projet';
    else typeSelect.value = 'travail';
    document.getElementById('formParcours').style.display = 'flex';
};

window.deleteParcours = function(idx) {
    if (!confirm('Supprimer cette expérience ?')) return;
    const data = getData();
    data.parcours.splice(idx, 1);
    saveData(data);
    renderParcours(data.parcours);
    showToast('Expérience supprimée');
};

window.moveParcoursUp = function(idx) {
    if (idx === 0) return;
    const data = getData();
    [data.parcours[idx - 1], data.parcours[idx]] = [data.parcours[idx], data.parcours[idx - 1]];
    saveData(data);
    renderParcours(data.parcours);
};

window.moveParcoursDown = function(idx) {
    const data = getData();
    if (idx >= data.parcours.length - 1) return;
    [data.parcours[idx], data.parcours[idx + 1]] = [data.parcours[idx + 1], data.parcours[idx]];
    saveData(data);
    renderParcours(data.parcours);
};

/* ========================================
   COMPETENCES
   ======================================== */
function renderCompetences(competences) {
    const list = document.getElementById('listCompetences');
    list.innerHTML = competences.map((c, i) => `
        <div class="admin-item" style="cursor:pointer" onclick="editCompetence(${i})">
            <div class="admin-item-icon"><i class="fas ${c.icone}"></i></div>
            <div class="admin-item-info">
                <h4>${c.nom}</h4>
                <p>${c.description}</p>
            </div>
            <div class="admin-progress">
                <div class="admin-progress-bar">
                    <div class="admin-progress-fill" style="width:${c.progression}%"></div>
                </div>
                <div class="admin-progress-text">Niveau ${c.niveau} — ${c.progression}%</div>
            </div>
            <div class="admin-item-actions">
                <button onclick="event.stopPropagation();editCompetence(${i})" title="Modifier"><i class="fas fa-pen"></i></button>
            </div>
        </div>
    `).join('');
}

let currentApprentissages = [];

function initCompetenceForm() {
    document.getElementById('closeFormCompetence').addEventListener('click', () => {
        document.getElementById('formCompetence').style.display = 'none';
    });
    document.getElementById('cancelCompetence').addEventListener('click', () => {
        document.getElementById('formCompetence').style.display = 'none';
    });

    document.getElementById('competenceProgression').addEventListener('input', (e) => {
        document.getElementById('progressionValue').textContent = e.target.value + '%';
    });

    document.getElementById('btnAddApprentissage').addEventListener('click', () => {
        const input = document.getElementById('newApprentissage');
        const text = input.value.trim();
        if (!text) return;
        currentApprentissages.push({ nom: text, maitrise: false });
        renderApprentissages();
        input.value = '';
    });

    document.getElementById('newApprentissage').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btnAddApprentissage').click();
        }
    });

    document.getElementById('competenceForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = getData();
        const idx = parseInt(document.getElementById('competenceIdx').value);

        data.competences[idx].niveau = parseInt(document.getElementById('competenceNiveau').value);
        data.competences[idx].progression = parseInt(document.getElementById('competenceProgression').value);
        data.competences[idx].detailsTexte = document.getElementById('competenceDetails').value;
        data.competences[idx].apprentissages = currentApprentissages;

        saveData(data);
        renderCompetences(data.competences);
        document.getElementById('formCompetence').style.display = 'none';
        showToast('Compétence mise à jour !');
    });
}

function renderApprentissages() {
    const list = document.getElementById('apprentissagesList');
    list.innerHTML = currentApprentissages.map((a, i) => `
        <div class="apprentissage-item">
            <input type="checkbox" ${a.maitrise ? 'checked' : ''} onchange="toggleApprentissage(${i}, this.checked)">
            <span style="${a.maitrise ? '' : 'opacity:0.6'}">${a.nom}</span>
            <button type="button" class="btn-remove" onclick="removeApprentissage(${i})"><i class="fas fa-times"></i></button>
        </div>
    `).join('');
}

window.editCompetence = function(idx) {
    const data = getData();
    const c = data.competences[idx];
    document.getElementById('formCompetenceTitle').textContent = 'Modifier : ' + c.nom;
    document.getElementById('competenceIdx').value = idx;
    document.getElementById('competenceNiveau').value = c.niveau;
    document.getElementById('competenceProgression').value = c.progression;
    document.getElementById('progressionValue').textContent = c.progression + '%';
    document.getElementById('competenceDetails').value = c.detailsTexte || '';
    currentApprentissages = JSON.parse(JSON.stringify(c.apprentissages || []));
    renderApprentissages();
    document.getElementById('formCompetence').style.display = 'flex';
};

window.toggleApprentissage = function(idx, checked) {
    currentApprentissages[idx].maitrise = checked;
    renderApprentissages();
};

window.removeApprentissage = function(idx) {
    currentApprentissages.splice(idx, 1);
    renderApprentissages();
};

/* ========================================
   GLOBAL ACTIONS
   ======================================== */
function initGlobalActions() {
    document.getElementById('btnReset').addEventListener('click', () => {
        if (!confirm('Réinitialiser toutes les données aux valeurs par défaut ?')) return;
        const data = resetData();
        renderAll();
        showToast('Données réinitialisées');
    });

    document.getElementById('btnExport').addEventListener('click', () => {
        const data = getData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio_data.json';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Données exportées !');
    });

    document.getElementById('btnImport').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });

    document.getElementById('importFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                saveData(data);
                renderAll();
                showToast('Données importées !');
            } catch (err) {
                alert('Erreur : fichier JSON invalide');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });
}

/* ========================================
   TOAST
   ======================================== */
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
