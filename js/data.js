/* ========================================
   DATA MANAGEMENT - localStorage
   ======================================== */

const DEFAULT_DATA = {
    projets: [
        {
            id: "sae-implementation",
            nom: "SAÉ Implémentation",
            semestre: "S1",
            theme: "scolaire",
            description: "Implémentation d'un besoin client — Développement d'une application répondant à un cahier des charges.",
            details: "Ce projet consistait à développer une application Java complète en réponse à un cahier des charges fourni par un client. Nous avons suivi une méthodologie de gestion de projet agile pour organiser notre travail en sprints. L'application permet de gérer des données utilisateur avec une interface graphique intuitive.",
            competencesUtilisees: [
                { competenceId: "realiser", niveau: "Intermédiaire", utilisation: "Développement complet de l'application" },
                { competenceId: "conduire", niveau: "Débutant", utilisation: "Suivi du cahier des charges et gestion de projet" }
            ],
            technologies: ["Java", "Git"],
            icone: "fa-code",
            lien: "",
            objectifs: [
                "Analyser le cahier des charges client",
                "Concevoir l'architecture de l'application",
                "Implémenter les fonctionnalités demandées",
                "Tester et valider le produit final"
            ],
            resultats: "Application livrée dans les délais avec toutes les fonctionnalités demandées. Retour positif du client sur la qualité de l'interface."
        },
        {
            id: "sae-reseau",
            nom: "SAÉ Installation Service Réseau",
            semestre: "S2",
            theme: "scolaire",
            description: "Installation et configuration de services réseau. Mise en place de serveurs, routage inter-VLAN et sécurisation.",
            details: "Mise en place d'une infrastructure réseau complète comprenant la configuration de serveurs Linux, le routage inter-VLAN sur équipements Cisco, et la sécurisation des accès. Ce projet a permis de mettre en pratique les concepts d'administration réseau dans un environnement simulant une entreprise.",
            competencesUtilisees: [
                { competenceId: "administrer", niveau: "Intermédiaire", utilisation: "Configuration serveurs et réseau" },
                { competenceId: "collaborer", niveau: "Intermédiaire", utilisation: "Travail en équipe et documentation" }
            ],
            technologies: ["Linux", "Cisco", "VLAN"],
            icone: "fa-network-wired",
            lien: "",
            objectifs: [
                "Installer et configurer des serveurs Linux",
                "Mettre en place le routage inter-VLAN",
                "Sécuriser l'infrastructure réseau",
                "Documenter l'architecture mise en place"
            ],
            resultats: "Infrastructure réseau fonctionnelle avec routage inter-VLAN opérationnel et services sécurisés."
        },
        {
            id: "sae-bdd",
            nom: "SAÉ Exploitation BDD",
            semestre: "S2",
            theme: "scolaire",
            description: "Conception et exploitation d'une base de données relationnelle. Requêtes complexes et visualisation de données.",
            details: "Conception d'une base de données relationnelle à partir d'un cahier des charges, avec modélisation MCD/MLD. Écriture de requêtes SQL complexes (jointures, sous-requêtes, agrégations) et création de vues pour la visualisation des données. Utilisation d'Oracle SQL Developer pour l'administration.",
            competencesUtilisees: [
                { competenceId: "gerer", niveau: "Intermédiaire", utilisation: "Conception et requêtes BDD" },
                { competenceId: "optimiser", niveau: "Débutant", utilisation: "Optimisation des requêtes SQL" }
            ],
            technologies: ["SQL", "Oracle"],
            icone: "fa-database",
            lien: "",
            objectifs: [
                "Concevoir le modèle conceptuel de données",
                "Implémenter la base de données relationnelle",
                "Écrire des requêtes SQL complexes",
                "Visualiser et analyser les données"
            ],
            resultats: "Base de données performante avec des requêtes optimisées permettant une analyse efficace des données."
        },
        {
            id: "sae-dev-app",
            nom: "SAÉ Développement Application",
            semestre: "S2",
            theme: "scolaire",
            description: "Développement d'une application complète avec interface utilisateur, gestion de données et tests.",
            details: "Développement d'une application complète en Java avec interface graphique HTML/CSS. Le projet incluait la gestion de données persistantes, des tests unitaires et une documentation technique. Travail en équipe avec utilisation de Git pour la gestion de version.",
            competencesUtilisees: [
                { competenceId: "realiser", niveau: "Intermédiaire", utilisation: "Développement de l'application et tests" },
                { competenceId: "conduire", niveau: "Intermédiaire", utilisation: "Gestion de projet agile" },
                { competenceId: "collaborer", niveau: "Intermédiaire", utilisation: "Travail en équipe avec Git" }
            ],
            technologies: ["Java", "HTML/CSS", "Git"],
            icone: "fa-laptop-code",
            lien: "",
            objectifs: [
                "Développer l'interface utilisateur",
                "Implémenter la logique métier",
                "Écrire et exécuter des tests",
                "Collaborer efficacement en équipe"
            ],
            resultats: "Application complète et fonctionnelle, développée en équipe avec une bonne couverture de tests."
        }
    ],
    parcours: [
        {
            id: "but-dacs",
            date: "Depuis Septembre 2025",
            titre: "BUT Informatique — Parcours DACS",
            lieu: "IUT Lyon 1 — La Doua",
            icone: "fa-graduation-cap",
            lieuIcone: "fa-university",
            description: "Spécialisation en Déploiement d'Applications Communicantes et Sécurisées. Approfondissement en administration système, sécurité réseau et déploiement d'applications.",
            tags: ["Sécurité", "Réseau", "Déploiement"]
        },
        {
            id: "but-1ere",
            date: "Septembre 2024 — Juin 2025",
            titre: "BUT Informatique — 1ère année",
            lieu: "IUT Lyon 1 — La Doua",
            icone: "fa-graduation-cap",
            lieuIcone: "fa-university",
            description: "Formation généraliste en informatique : développement, bases de données, systèmes, réseaux et gestion de projet.",
            tags: ["Java", "SQL", "Linux", "Gestion de projet"]
        },
        {
            id: "stage-ctg",
            date: "Juillet — Août 2024",
            titre: "Technicien Support",
            lieu: "Collectivité Territoriale de Guyane",
            icone: "fa-briefcase",
            lieuIcone: "fa-building",
            description: "Installation de logiciels, maintenance des équipements informatiques, mise à niveau du parc informatique.",
            tags: ["Support", "Maintenance", "Parc informatique"]
        },
        {
            id: "bac",
            date: "2021 — 2024",
            titre: "BAC STI2D",
            lieu: "Lycée J-M Carriat",
            icone: "fa-graduation-cap",
            lieuIcone: "fa-school",
            description: "Baccalauréat Sciences et Technologies de l'Industrie et du Développement Durable. Découverte des technologies numériques et industrielles.",
            tags: ["STI2D", "Technologie"]
        }
    ],
    competences: [
        {
            id: "realiser",
            nom: "Réaliser",
            description: "Développer des applications informatiques simples",
            icone: "fa-code",
            niveau: 2,
            progression: 65,
            apprentissages: [
                { nom: "Implémenter des conceptions simples", maitrise: true },
                { nom: "Élaborer des conceptions simples", maitrise: true },
                { nom: "Faire des essais et évaluer les résultats", maitrise: true },
                { nom: "Développer une interface utilisateur", maitrise: false },
                { nom: "Utiliser un environnement de développement intégré (IDE)", maitrise: true },
                { nom: "Versionner son code avec Git", maitrise: true },
                { nom: "Écrire des tests unitaires", maitrise: false },
                { nom: "Respecter les principes SOLID", maitrise: false },
                { nom: "Documenter son code", maitrise: true }
            ],
            projetsLies: ["sae-implementation", "sae-dev-app"],
            detailsTexte: "La compétence Réaliser couvre le développement d'applications informatiques. J'ai acquis des bases solides en programmation Java et en développement d'interfaces utilisateur à travers mes projets de SAÉ. Je suis capable d'implémenter des conceptions simples et de tester mes développements."
        },
        {
            id: "optimiser",
            nom: "Optimiser",
            description: "Appréhender et construire des algorithmes",
            icone: "fa-chart-line",
            niveau: 2,
            progression: 55,
            apprentissages: [
                { nom: "Analyser un problème avec méthode", maitrise: true },
                { nom: "Comparer des algorithmes pour des problèmes classiques", maitrise: true },
                { nom: "Formaliser des outils mathématiques", maitrise: false },
                { nom: "Choisir des structures de données adaptées", maitrise: true },
                { nom: "Évaluer la complexité d'un algorithme", maitrise: false },
                { nom: "Optimiser les performances d'un programme", maitrise: false }
            ],
            projetsLies: ["sae-bdd"],
            detailsTexte: "La compétence Optimiser concerne l'analyse algorithmique et la résolution de problèmes. Je sais analyser des problèmes de manière méthodique et comparer différentes approches algorithmiques. L'optimisation de requêtes SQL fait aussi partie de cette compétence."
        },
        {
            id: "administrer",
            nom: "Administrer",
            description: "Installer, configurer et gérer un système informatique",
            icone: "fa-server",
            niveau: 2,
            progression: 75,
            apprentissages: [
                { nom: "Identifier les composants d'un système numérique", maitrise: true },
                { nom: "Utiliser les fonctionnalités multitâches d'un OS", maitrise: true },
                { nom: "Installer et configurer un OS", maitrise: true },
                { nom: "Configurer un poste sur un réseau", maitrise: true },
                { nom: "Administrer un serveur Linux", maitrise: true },
                { nom: "Gérer les droits et permissions", maitrise: true },
                { nom: "Mettre en place un service réseau (DNS, DHCP, HTTP)", maitrise: true },
                { nom: "Virtualiser des environnements (VM, conteneurs)", maitrise: false },
                { nom: "Superviser et monitorer un système", maitrise: false }
            ],
            projetsLies: ["sae-reseau"],
            detailsTexte: "La compétence Administrer est ma spécialité principale, en lien avec le parcours DACS. Je maîtrise l'installation et la configuration de systèmes Linux et Windows, la gestion de réseaux et la configuration de services réseau. C'est la compétence où je me sens le plus à l'aise."
        },
        {
            id: "gerer",
            nom: "Gérer",
            description: "Concevoir et gérer des bases de données",
            icone: "fa-database",
            niveau: 2,
            progression: 60,
            apprentissages: [
                { nom: "Interroger une base de données relationnelle", maitrise: true },
                { nom: "Visualiser des données", maitrise: true },
                { nom: "Concevoir une BDD à partir d'un cahier des charges", maitrise: false },
                { nom: "Modéliser un MCD/MLD", maitrise: true },
                { nom: "Écrire des requêtes SQL avancées (jointures, sous-requêtes)", maitrise: true },
                { nom: "Gérer les contraintes d'intégrité", maitrise: false },
                { nom: "Administrer un SGBD", maitrise: false }
            ],
            projetsLies: ["sae-bdd"],
            detailsTexte: "La compétence Gérer concerne la conception et l'exploitation de bases de données. Je sais écrire des requêtes SQL complexes et visualiser des données. La conception complète d'une BDD à partir d'un cahier des charges est en cours d'acquisition."
        },
        {
            id: "conduire",
            nom: "Conduire",
            description: "Satisfaire les besoins des utilisateurs",
            icone: "fa-users",
            niveau: 2,
            progression: 60,
            apprentissages: [
                { nom: "Appréhender les besoins du client", maitrise: true },
                { nom: "Mettre en place les outils de gestion de projet", maitrise: true },
                { nom: "Identifier les phases d'un cycle de développement", maitrise: false },
                { nom: "Rédiger un cahier des charges", maitrise: true },
                { nom: "Planifier les tâches avec un diagramme de Gantt", maitrise: false },
                { nom: "Réaliser un suivi de projet (réunions, comptes rendus)", maitrise: true },
                { nom: "Utiliser une méthode agile (Scrum, Kanban)", maitrise: false }
            ],
            projetsLies: ["sae-implementation", "sae-dev-app"],
            detailsTexte: "La compétence Conduire couvre la gestion de projet et l'analyse des besoins utilisateurs. J'ai appris à recueillir les besoins d'un client et à utiliser des outils de gestion de projet pour organiser le travail d'équipe."
        },
        {
            id: "collaborer",
            nom: "Collaborer",
            description: "Travailler dans une équipe informatique",
            icone: "fa-handshake",
            niveau: 2,
            progression: 70,
            apprentissages: [
                { nom: "Appréhender l'écosystème numérique", maitrise: true },
                { nom: "Découvrir les aptitudes des secteurs informatiques", maitrise: true },
                { nom: "Identifier les rôles dans une équipe", maitrise: true },
                { nom: "Acquérir les compétences interpersonnelles", maitrise: false },
                { nom: "Communiquer efficacement à l'écrit et à l'oral", maitrise: true },
                { nom: "Utiliser des outils collaboratifs (Git, Trello, Discord)", maitrise: true },
                { nom: "Gérer les conflits dans une équipe", maitrise: false },
                { nom: "Répartir les tâches équitablement", maitrise: true }
            ],
            projetsLies: ["sae-reseau", "sae-dev-app"],
            detailsTexte: "La compétence Collaborer est essentielle dans le travail en équipe. J'ai développé mes capacités de communication et de travail collaboratif à travers les projets de groupe. Je sais utiliser Git pour collaborer efficacement et identifier les rôles dans une équipe."
        }
    ],
    outils: [
        { id: "java", nom: "Java", categorie: "Langages", icone: "fab fa-java", niveau: 70, description: "Programmation orientée objet, développement d'applications avec interface graphique." },
        { id: "c", nom: "C", categorie: "Langages", icone: "fas fa-copyright", niveau: 40, description: "Bases de la programmation système et gestion de la mémoire." },
        { id: "html", nom: "HTML", categorie: "Langages", icone: "fab fa-html5", niveau: 75, description: "Structuration de pages web, formulaires, sémantique." },
        { id: "css", nom: "CSS", categorie: "Langages", icone: "fab fa-css3-alt", niveau: 65, description: "Mise en forme, responsive design, animations." },
        { id: "sql", nom: "SQL", categorie: "Langages", icone: "fas fa-database", niveau: 65, description: "Requêtes complexes, jointures, sous-requêtes, agrégations." },
        { id: "python", nom: "Python", categorie: "Langages", icone: "fab fa-python", niveau: 35, description: "Scripts, automatisation, bases du langage." },
        { id: "git", nom: "Git", categorie: "Outils", icone: "fab fa-git-alt", niveau: 70, description: "Gestion de version, branches, merge, collaboration en équipe." },
        { id: "docker", nom: "Docker", categorie: "Outils", icone: "fab fa-docker", niveau: 30, description: "Conteneurisation d'applications, Dockerfile, docker-compose." },
        { id: "proxmox", nom: "Proxmox", categorie: "Outils", icone: "fas fa-cubes", niveau: 35, description: "Virtualisation d'environnements, gestion de VMs et conteneurs LXC." },
        { id: "wireshark", nom: "Wireshark", categorie: "Outils", icone: "fas fa-network-wired", niveau: 50, description: "Analyse de trafic réseau, diagnostic de protocoles." },
        { id: "vmware", nom: "VMware", categorie: "Outils", icone: "fas fa-desktop", niveau: 55, description: "Virtualisation, création et gestion de machines virtuelles." },
        { id: "apache", nom: "Apache", categorie: "Outils", icone: "fas fa-server", niveau: 45, description: "Configuration de serveur HTTP, virtual hosts, modules." },
        { id: "linux", nom: "Linux", categorie: "Systèmes", icone: "fab fa-linux", niveau: 75, description: "Administration système, scripting bash, services, réseau." },
        { id: "windows", nom: "Windows", categorie: "Systèmes", icone: "fab fa-windows", niveau: 65, description: "Administration Windows, PowerShell, Active Directory." },
        { id: "active-directory", nom: "Active Directory", categorie: "Systèmes", icone: "fas fa-shield-alt", niveau: 40, description: "Gestion des utilisateurs, GPO, domaines." },
        { id: "cisco", nom: "Cisco", categorie: "Systèmes", icone: "fas fa-project-diagram", niveau: 50, description: "Configuration routeurs/switches, VLAN, routage inter-VLAN, ACL." }
    ]
};

function getData() {
    const stored = localStorage.getItem('portfolio_data');
    if (stored) {
        const data = JSON.parse(stored);
        if (!data.outils) data.outils = DEFAULT_DATA.outils;
        if (data.projets && data.projets.length > 0 && !data.projets[0].theme) {
            data.projets = data.projets.map(p => ({
                ...p,
                theme: p.theme || 'scolaire',
                competencesUtilisees: p.competencesUtilisees || (p.competences || []).map(c => ({
                    competenceId: c.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
                    niveau: 'Intermédiaire',
                    utilisation: ''
                }))
            }));
        }
        return data;
    }
    return DEFAULT_DATA;
}

function saveData(data) {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
}

function resetData() {
    localStorage.removeItem('portfolio_data');
    return DEFAULT_DATA;
}

function generateId(text) {
    return text.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

function getCompetenceById(data, id) {
    return data.competences.find(c => c.id === id);
}

function getThemeLabel(theme) {
    const labels = { scolaire: 'Scolaire', alternance: 'Alternance', stage: 'Stage' };
    return labels[theme] || theme;
}

function getNiveauColor(niveau) {
    if (niveau >= 70) return '#4ade80';
    if (niveau >= 40) return '#c9a84c';
    return '#f97316';
}
