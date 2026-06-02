/* ========================================
   ADMIN PANEL - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    renderAll();
    initProjetForm();
    initParcoursForm();
    initCompetenceForm();
    initOutilForm();
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
    renderOutils(data.outils || []);
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
                <span class="badge badge-theme">${getThemeLabel(p.theme || 'scolaire')}</span>
            </div>
            <div class="admin-item-actions">
                <button onclick="editProjet(${i})" title="Modifier"><i class="fas fa-pen"></i></button>
                <button class="btn-delete" onclick="deleteProjet(${i})" title="Supprimer"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function buildCompetencesSelection(selected) {
    const data = getData();
    const container = document.getElementById('projetCompetencesContainer');
    selected = selected || [];

    container.innerHTML = data.competences.map(c => {
        const existing = selected.find(s => s.competenceId === c.id);
        const checked = existing ? 'checked' : '';
        const niveau = existing ? existing.niveau : 'Intermédiaire';
        const utilisation = existing ? existing.utilisation : '';

        return `
        <div class="comp-select-item">
            <div class="comp-select-header">
                <label class="comp-select-check">
                    <input type="checkbox" data-comp-id="${c.id}" ${checked} onchange="toggleCompSelection(this)">
                    <i class="fas ${c.icone}" style="color:var(--accent-gold);margin:0 8px;"></i>
                    <strong>${c.nom}</strong>
                </label>
            </div>
            <div class="comp-select-details" style="display:${existing ? 'flex' : 'none'}">
                <select data-comp-niveau="${c.id}">
                    <option value="Débutant" ${niveau === 'Débutant' ? 'selected' : ''}>Débutant</option>
                    <option value="Intermédiaire" ${niveau === 'Intermédiaire' ? 'selected' : ''}>Intermédiaire</option>
                    <option value="Avancé" ${niveau === 'Avancé' ? 'selected' : ''}>Avancé</option>
                </select>
                <input type="text" data-comp-util="${c.id}" value="${utilisation}" placeholder="Utilisation (ex: Développement frontend)">
            </div>
        </div>`;
    }).join('');
}

window.toggleCompSelection = function(checkbox) {
    const details = checkbox.closest('.comp-select-item').querySelector('.comp-select-details');
    details.style.display = checkbox.checked ? 'flex' : 'none';
};

function getSelectedCompetences() {
    const items = document.querySelectorAll('#projetCompetencesContainer .comp-select-item');
    const result = [];
    items.forEach(item => {
        const cb = item.querySelector('input[type="checkbox"]');
        if (cb.checked) {
            const compId = cb.dataset.compId;
            result.push({
                competenceId: compId,
                niveau: item.querySelector(`[data-comp-niveau="${compId}"]`).value,
                utilisation: item.querySelector(`[data-comp-util="${compId}"]`).value
            });
        }
    });
    return result;
}

function initProjetForm() {
    document.getElementById('btnAddProjet').addEventListener('click', () => {
        document.getElementById('formProjetTitle').textContent = 'Ajouter un projet';
        document.getElementById('projetForm').reset();
        document.getElementById('projetId').value = '';
        buildCompetencesSelection([]);
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
            id: idx !== '' ? data.projets[parseInt(idx)].id : generateId(document.getElementById('projetNom').value),
            nom: document.getElementById('projetNom').value,
            semestre: document.getElementById('projetSemestre').value,
            theme: document.getElementById('projetTheme').value,
            description: document.getElementById('projetDescription').value,
            details: document.getElementById('projetDetails').value,
            competencesUtilisees: getSelectedCompetences(),
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
    document.getElementById('projetTheme').value = p.theme || 'scolaire';
    document.getElementById('projetDescription').value = p.description;
    document.getElementById('projetDetails').value = p.details || '';
    document.getElementById('projetTechnologies').value = (p.technologies || []).join(', ');
    document.getElementById('projetIcone').value = p.icone || 'fa-code';
    document.getElementById('projetLien').value = p.lien || '';
    document.getElementById('projetObjectifs').value = (p.objectifs || []).join('\n');
    document.getElementById('projetResultats').value = p.resultats || '';
    buildCompetencesSelection(p.competencesUtilisees || []);
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
                <p>${c.description} <span style="color:var(--accent-gold);font-size:0.8rem;">(${(c.apprentissages || []).length} apprentissages)</span></p>
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
   OUTILS
   ======================================== */
function renderOutils(outils) {
    const list = document.getElementById('listOutils');
    if (!outils.length) {
        list.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:40px;">Aucun outil. Cliquez sur "Ajouter un outil" pour commencer.</p>';
        return;
    }
    list.innerHTML = outils.map((o, i) => `
        <div class="admin-item">
            <div class="admin-item-icon"><i class="${o.icone}"></i></div>
            <div class="admin-item-info">
                <h4>${o.nom}</h4>
                <p>${o.description || o.categorie}</p>
            </div>
            <div class="admin-progress">
                <div class="admin-progress-bar">
                    <div class="admin-progress-fill" style="width:${o.niveau}%"></div>
                </div>
                <div class="admin-progress-text">${o.categorie} — ${o.niveau}%</div>
            </div>
            <div class="admin-item-actions">
                <button onclick="editOutil(${i})" title="Modifier"><i class="fas fa-pen"></i></button>
                <button class="btn-delete" onclick="deleteOutil(${i})" title="Supprimer"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function initOutilForm() {
    document.getElementById('btnAddOutil').addEventListener('click', () => {
        document.getElementById('formOutilTitle').textContent = 'Ajouter un outil';
        document.getElementById('outilForm').reset();
        document.getElementById('outilIdx').value = '';
        document.getElementById('outilNiveauValue').textContent = '50%';
        document.getElementById('formOutil').style.display = 'flex';
    });

    document.getElementById('closeFormOutil').addEventListener('click', () => {
        document.getElementById('formOutil').style.display = 'none';
    });
    document.getElementById('cancelOutil').addEventListener('click', () => {
        document.getElementById('formOutil').style.display = 'none';
    });

    document.getElementById('outilNiveau').addEventListener('input', (e) => {
        document.getElementById('outilNiveauValue').textContent = e.target.value + '%';
    });

    document.getElementById('outilForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = getData();
        if (!data.outils) data.outils = [];
        const idx = document.getElementById('outilIdx').value;

        const outil = {
            id: idx !== '' ? data.outils[parseInt(idx)].id : generateId(document.getElementById('outilNom').value),
            nom: document.getElementById('outilNom').value,
            categorie: document.getElementById('outilCategorie').value,
            icone: document.getElementById('outilIcone').value || 'fas fa-wrench',
            niveau: parseInt(document.getElementById('outilNiveau').value),
            description: document.getElementById('outilDescription').value
        };

        if (idx !== '') {
            data.outils[parseInt(idx)] = outil;
            showToast('Outil modifié !');
        } else {
            data.outils.push(outil);
            showToast('Outil ajouté !');
        }

        saveData(data);
        renderOutils(data.outils);
        document.getElementById('formOutil').style.display = 'none';
    });
}

window.editOutil = function(idx) {
    const data = getData();
    const o = data.outils[idx];
    document.getElementById('formOutilTitle').textContent = 'Modifier l\'outil';
    document.getElementById('outilIdx').value = idx;
    document.getElementById('outilNom').value = o.nom;
    document.getElementById('outilCategorie').value = o.categorie;
    document.getElementById('outilIcone').value = o.icone;
    document.getElementById('outilNiveau').value = o.niveau;
    document.getElementById('outilNiveauValue').textContent = o.niveau + '%';
    document.getElementById('outilDescription').value = o.description || '';
    document.getElementById('formOutil').style.display = 'flex';
};

window.deleteOutil = function(idx) {
    if (!confirm('Supprimer cet outil ?')) return;
    const data = getData();
    data.outils.splice(idx, 1);
    saveData(data);
    renderOutils(data.outils);
    showToast('Outil supprimé');
};

/* ========================================
   GLOBAL ACTIONS
   ======================================== */
function initGlobalActions() {
    document.getElementById('btnReset').addEventListener('click', () => {
        if (!confirm('Réinitialiser toutes les données aux valeurs par défaut ?')) return;
        resetData();
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
