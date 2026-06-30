/* ========================================
   DATA MANAGEMENT - localStorage
   ======================================== */

const DEFAULT_DATA = {
    "projets": [
        {
            "id": "sae-implementation",
            "nom": "SAÉ Implémentation",
            "semestre": "S1",
            "categorie": "dev",
            "description": "Implémentation d'un besoin client — Développement d'une application répondant à un cahier des charges.",
            "details": "Ce projet consistait à développer une application Java complète en réponse à un cahier des charges fourni par un client. Nous avons suivi une méthodologie de gestion de projet agile pour organiser notre travail en sprints. L'application permet de gérer des données utilisateur avec une interface graphique intuitive.",
            "competences": [
                "Réaliser",
                "Conduire"
            ],
            "technologies": [
                "Java",
                "Git"
            ],
            "icone": "fa-code",
            "lien": "",
            "objectifs": [
                "Analyser le cahier des charges client",
                "Concevoir l'architecture de l'application",
                "Implémenter les fonctionnalités demandées",
                "Tester et valider le produit final"
            ],
            "resultats": "Application livrée dans les délais avec toutes les fonctionnalités demandées. Retour positif du client sur la qualité de l'interface.",
            "theme": "scolaire",
            "competencesUtilisees": [
                {
                    "competenceId": "realiser",
                    "niveau": "Intermédiaire",
                    "utilisation": ""
                },
                {
                    "competenceId": "conduire",
                    "niveau": "Intermédiaire",
                    "utilisation": ""
                }
            ]
        },
        {
            "id": "sae-reseau",
            "nom": "SAÉ Installation Service Réseau",
            "semestre": "S2",
            "categorie": "reseau",
            "description": "Installation et configuration de services réseau. Mise en place de serveurs, routage inter-VLAN et sécurisation.",
            "details": "Mise en place d'une infrastructure réseau complète comprenant la configuration de serveurs Linux, le routage inter-VLAN sur équipements Cisco, et la sécurisation des accès. Ce projet a permis de mettre en pratique les concepts d'administration réseau dans un environnement simulant une entreprise.",
            "competences": [
                "Administrer",
                "Collaborer"
            ],
            "technologies": [
                "Linux",
                "Cisco",
                "VLAN"
            ],
            "icone": "fa-network-wired",
            "lien": "",
            "objectifs": [
                "Installer et configurer des serveurs Linux",
                "Mettre en place le routage inter-VLAN",
                "Sécuriser l'infrastructure réseau",
                "Documenter l'architecture mise en place"
            ],
            "resultats": "Infrastructure réseau fonctionnelle avec routage inter-VLAN opérationnel et services sécurisés.",
            "theme": "scolaire",
            "competencesUtilisees": [
                {
                    "competenceId": "administrer",
                    "niveau": "Intermédiaire",
                    "utilisation": ""
                },
                {
                    "competenceId": "collaborer",
                    "niveau": "Intermédiaire",
                    "utilisation": ""
                }
            ]
        },
        {
            "id": "sae-bdd",
            "nom": "SAÉ Exploitation BDD",
            "semestre": "S2",
            "categorie": "bdd",
            "description": "Conception et exploitation d'une base de données relationnelle. Requêtes complexes et visualisation de données.",
            "details": "Conception d'une base de données relationnelle à partir d'un cahier des charges, avec modélisation MCD/MLD. Écriture de requêtes SQL complexes (jointures, sous-requêtes, agrégations) et création de vues pour la visualisation des données. Utilisation d'Oracle SQL Developer pour l'administration.",
            "competences": [
                "Gérer",
                "Optimiser"
            ],
            "technologies": [
                "SQL",
                "Oracle"
            ],
            "icone": "fa-database",
            "lien": "",
            "objectifs": [
                "Concevoir le modèle conceptuel de données",
                "Implémenter la base de données relationnelle",
                "Écrire des requêtes SQL complexes",
                "Visualiser et analyser les données"
            ],
            "resultats": "Base de données performante avec des requêtes optimisées permettant une analyse efficace des données.",
            "theme": "scolaire",
            "competencesUtilisees": [
                {
                    "competenceId": "gerer",
                    "niveau": "Intermédiaire",
                    "utilisation": ""
                },
                {
                    "competenceId": "optimiser",
                    "niveau": "Intermédiaire",
                    "utilisation": ""
                }
            ]
        },
        {
            "id": "sae-dev-app",
            "nom": "SAÉ Développement Application",
            "semestre": "S2",
            "categorie": "dev",
            "description": "Développement d'une application complète avec interface utilisateur, gestion de données et tests.",
            "details": "Développement d'une application complète en Java avec interface graphique HTML/CSS. Le projet incluait la gestion de données persistantes, des tests unitaires et une documentation technique. Travail en équipe avec utilisation de Git pour la gestion de version.",
            "competences": [
                "Réaliser",
                "Conduire",
                "Collaborer"
            ],
            "technologies": [
                "Java",
                "HTML/CSS",
                "Git"
            ],
            "icone": "fa-laptop-code",
            "lien": "",
            "objectifs": [
                "Développer l'interface utilisateur",
                "Implémenter la logique métier",
                "Écrire et exécuter des tests",
                "Collaborer efficacement en équipe"
            ],
            "resultats": "Application complète et fonctionnelle, développée en équipe avec une bonne couverture de tests.",
            "theme": "scolaire",
            "competencesUtilisees": [
                {
                    "competenceId": "realiser",
                    "niveau": "Intermédiaire",
                    "utilisation": ""
                },
                {
                    "competenceId": "conduire",
                    "niveau": "Intermédiaire",
                    "utilisation": ""
                },
                {
                    "competenceId": "collaborer",
                    "niveau": "Intermédiaire",
                    "utilisation": ""
                }
            ]
        },
        {
            "id": "configuration-de-pare-feux-stormshield",
            "nom": "Configuration de pare-feux Stormshield",
            "semestre": "S4",
            "theme": "stage",
            "description": "Paramétrage complet de pare-feux de A à Z., incluant la\nconfiguration en mode DHCP, la création de règles de\nfiltrage réseau, l'intégration de VPN et la mise en place\nde listes blanches de sites Web pour le Bureau d’étude\nNicolas.",
            "details": "Paramétrage de pare-feux incluant la configuration en mode DHCP, la création de règles de filtrage réseau, l'intégration de VPN et la mise en place de listes blanches de sites Web pour le Bureau d’étude Nicolas. Réplication et transfert de règles de sécurité depuis d'anciens équipements vers de nouveaux pare-feux Stormshield branchés en LAN.\n",
            "competencesUtilisees": [],
            "technologies": [],
            "icone": "fa-shield-alt",
            "lien": "",
            "objectifs": [],
            "resultats": ""
        },
        {
            "id": "audits-de-performance-et-depannage-wi-fi",
            "nom": "Audits de performance et dépannage Wi-Fi ",
            "semestre": "S4",
            "theme": "stage",
            "description": "Intervention sur site au Bar MIDI MINUIT à Confluence pour résoudre des anomalies réseau",
            "details": "Intervention sur site au Bar MIDI MINUIT à Confluence pour résoudre des anomalies réseau (analyse des paramètres Wi-Fi, tests de débit via Speedtest et diagnostic de l'infrastructure physique incluant switch, routeur et box ADSL).",
            "competencesUtilisees": [],
            "technologies": [
                "Réseau",
                "Speedtest"
            ],
            "icone": "fa-shield-alt",
            "lien": "",
            "objectifs": [],
            "resultats": ""
        },
        {
            "id": "assistance-technique-en-milieu-scolaire",
            "nom": "Assistance technique en milieu scolaire",
            "semestre": "S4",
            "theme": "stage",
            "description": "Interventions au Lycée la Martinière à Montplaisir  (support technique direct\ndurant les examens des classes prépa)",
            "details": "Masterisation et gestion de comptes : Installation d'images système Windows 10 sur des parcs de machines dédiés aux examens, création de comptes d'utilisateurs locaux (via l'invite de commande net user / netplwiz), blocage de la connexion Internet et des correcteurs de texte pour la sécurisation des épreuves.\n",
            "competencesUtilisees": [],
            "technologies": [
                "Windows",
                "Laptop"
            ],
            "icone": "fa-network-wired",
            "lien": "",
            "objectifs": [],
            "resultats": ""
        },
        {
            "id": "optimisation-de-l-espace-de-travail",
            "nom": "Optimisation de l'espace de travail ",
            "semestre": "S4",
            "theme": "stage",
            "description": "Déploiement de configurations multi-écrans avec commutations de périphériques (souris/clavier sans fil) à l'atelier des motards de Villefranche-sur-Saône.",
            "details": "",
            "competencesUtilisees": [],
            "technologies": [],
            "icone": "fa-laptop-code",
            "lien": "",
            "objectifs": [],
            "resultats": ""
        }
    ],
    "parcours": [
        {
            "id": "stage-technicien-support",
            "date": "Avril — Juillet 2026",
            "titre": "Stage  —  Technicien Support",
            "lieu": "ECOTIC",
            "icone": "fa-briefcase",
            "lieuIcone": "fa-building",
            "description": "Installation de logiciels, maintenance des équipements informatiques, mise à niveau du parc informatique.",
            "tags": [
                "Support",
                "Maintenance",
                "Parc informatique"
            ]
        },
        {
            "id": "but-dacs",
            "date": "Depuis Septembre 2025",
            "titre": "BUT Informatique — Parcours DACS",
            "lieu": "IUT Lyon 1 — La Doua",
            "icone": "fa-graduation-cap",
            "lieuIcone": "fa-university",
            "description": "Spécialisation en Déploiement d'Applications Communicantes et Sécurisées. Approfondissement en administration système, sécurité réseau et déploiement d'applications.",
            "tags": [
                "Sécurité",
                "Réseau",
                "Déploiement"
            ]
        },
        {
            "id": "but-1ere",
            "date": "Septembre 2024 — Juin 2025",
            "titre": "BUT Informatique — 1ère année",
            "lieu": "IUT Lyon 1 — La Doua",
            "icone": "fa-graduation-cap",
            "lieuIcone": "fa-university",
            "description": "Formation généraliste en informatique : développement, bases de données, systèmes, réseaux et gestion de projet.",
            "tags": [
                "Java",
                "SQL",
                "Linux",
                "Gestion de projet"
            ]
        },
        {
            "id": "bac",
            "date": "2021 — 2024",
            "titre": "BAC STI2D",
            "lieu": "Lycée J-M Carriat",
            "icone": "fa-graduation-cap",
            "lieuIcone": "fa-school",
            "description": "Baccalauréat Sciences et Technologies de l'Industrie et du Développement Durable. Découverte des technologies numériques et industrielles.",
            "tags": [
                "STI2D",
                "Technologie"
            ]
        }
    ],
    "competences": [
        {
            "id": "realiser",
            "nom": "Réaliser",
            "description": "Développer des applications informatiques simples",
            "icone": "fa-code",
            "niveau": 2,
            "progression": 48,
            "apprentissages": [
                {
                    "nom": "Implémenter des conceptions simples",
                    "maitrise": true
                },
                {
                    "nom": "Élaborer des conceptions simples",
                    "maitrise": true
                },
                {
                    "nom": "Faire des essais et évaluer les résultats",
                    "maitrise": true
                },
                {
                    "nom": "Développer une interface utilisateur",
                    "maitrise": false
                }
            ],
            "projetsLies": [
                "sae-implementation",
                "sae-dev-app"
            ],
            "detailsTexte": "La compétence Réaliser couvre le développement d'applications informatiques. J'ai acquis des bases solides en programmation Java et en développement d'interfaces utilisateur à travers mes projets de SAÉ. Je suis capable d'implémenter des conceptions simples et de tester mes développements."
        },
        {
            "id": "optimiser",
            "nom": "Optimiser",
            "description": "Appréhender et construire des algorithmes",
            "icone": "fa-chart-line",
            "niveau": 2,
            "progression": 55,
            "apprentissages": [
                {
                    "nom": "Analyser un problème avec méthode",
                    "maitrise": true
                },
                {
                    "nom": "Comparer des algorithmes pour des problèmes classiques",
                    "maitrise": true
                },
                {
                    "nom": "Formaliser des outils mathématiques",
                    "maitrise": false
                }
            ],
            "projetsLies": [
                "sae-bdd"
            ],
            "detailsTexte": "La compétence Optimiser concerne l'analyse algorithmique et la résolution de problèmes. Je sais analyser des problèmes de manière méthodique et comparer différentes approches algorithmiques. L'optimisation de requêtes SQL fait aussi partie de cette compétence."
        },
        {
            "id": "administrer",
            "nom": "Administrer",
            "description": "Installer, configurer et gérer un système informatique",
            "icone": "fa-server",
            "niveau": 2,
            "progression": 66,
            "apprentissages": [
                {
                    "nom": "Identifier les composants d'un système numérique",
                    "maitrise": true
                },
                {
                    "nom": "Utiliser les fonctionnalités multitâches",
                    "maitrise": true
                },
                {
                    "nom": "Installer et configurer un OS",
                    "maitrise": true
                },
                {
                    "nom": "Configurer un poste sur un réseau",
                    "maitrise": true
                }
            ],
            "projetsLies": [
                "sae-reseau"
            ],
            "detailsTexte": "La compétence Administrer est ma spécialité principale, en lien avec le parcours DACS. Je maîtrise l'installation et la configuration de systèmes Linux et Windows, la gestion de réseaux et la configuration de services réseau. C'est la compétence où je me sens le plus à l'aise."
        },
        {
            "id": "gerer",
            "nom": "Gérer",
            "description": "Concevoir et gérer des bases de données",
            "icone": "fa-database",
            "niveau": 2,
            "progression": 60,
            "apprentissages": [
                {
                    "nom": "Interroger une base de données relationnelle",
                    "maitrise": true
                },
                {
                    "nom": "Visualiser des données",
                    "maitrise": true
                },
                {
                    "nom": "Concevoir une BDD à partir d'un cahier des charges",
                    "maitrise": false
                }
            ],
            "projetsLies": [
                "sae-bdd"
            ],
            "detailsTexte": "La compétence Gérer concerne la conception et l'exploitation de bases de données. Je sais écrire des requêtes SQL complexes et visualiser des données. La conception complète d'une BDD à partir d'un cahier des charges est en cours d'acquisition."
        },
        {
            "id": "conduire",
            "nom": "Conduire",
            "description": "Satisfaire les besoins des utilisateurs",
            "icone": "fa-users",
            "niveau": 2,
            "progression": 65,
            "apprentissages": [
                {
                    "nom": "Appréhender les besoins du client",
                    "maitrise": true
                },
                {
                    "nom": "Mettre en place les outils de gestion de projet",
                    "maitrise": true
                },
                {
                    "nom": "Identifier les phases d'un cycle de développement",
                    "maitrise": false
                }
            ],
            "projetsLies": [
                "sae-implementation",
                "sae-dev-app"
            ],
            "detailsTexte": "La compétence Conduire couvre la gestion de projet et l'analyse des besoins utilisateurs. J'ai appris à recueillir les besoins d'un client et à utiliser des outils de gestion de projet pour organiser le travail d'équipe."
        },
        {
            "id": "collaborer",
            "nom": "Collaborer",
            "description": "Travailler dans une équipe informatique",
            "icone": "fa-handshake",
            "niveau": 2,
            "progression": 71,
            "apprentissages": [
                {
                    "nom": "Appréhender l'écosystème numérique",
                    "maitrise": true
                },
                {
                    "nom": "Découvrir les aptitudes des secteurs informatiques",
                    "maitrise": true
                },
                {
                    "nom": "Identifier les rôles dans une équipe",
                    "maitrise": true
                },
                {
                    "nom": "Acquérir les compétences interpersonnelles",
                    "maitrise": false
                }
            ],
            "projetsLies": [
                "sae-reseau",
                "sae-dev-app"
            ],
            "detailsTexte": "La compétence Collaborer est essentielle dans le travail en équipe. J'ai développé mes capacités de communication et de travail collaboratif à travers les projets de groupe. Je sais utiliser Git pour collaborer efficacement et identifier les rôles dans une équipe."
        }
    ],
    "outils": [
        {
            "id": "java",
            "nom": "Java",
            "categorie": "Langages",
            "icone": "fab fa-java",
            "niveau": 70,
            "description": "Programmation orientée objet, développement d'applications avec interface graphique."
        },
        {
            "id": "c",
            "nom": "C",
            "categorie": "Langages",
            "icone": "fas fa-copyright",
            "niveau": 40,
            "description": "Bases de la programmation système et gestion de la mémoire."
        },
        {
            "id": "html",
            "nom": "HTML",
            "categorie": "Langages",
            "icone": "fab fa-html5",
            "niveau": 75,
            "description": "Structuration de pages web, formulaires, sémantique."
        },
        {
            "id": "css",
            "nom": "CSS",
            "categorie": "Langages",
            "icone": "fab fa-css3-alt",
            "niveau": 65,
            "description": "Mise en forme, responsive design, animations."
        },
        {
            "id": "sql",
            "nom": "SQL",
            "categorie": "Langages",
            "icone": "fas fa-database",
            "niveau": 65,
            "description": "Requêtes complexes, jointures, sous-requêtes, agrégations."
        },
        {
            "id": "python",
            "nom": "Python",
            "categorie": "Langages",
            "icone": "fab fa-python",
            "niveau": 35,
            "description": "Scripts, automatisation, bases du langage."
        },
        {
            "id": "git",
            "nom": "Git",
            "categorie": "Outils",
            "icone": "fab fa-git-alt",
            "niveau": 70,
            "description": "Gestion de version, branches, merge, collaboration en équipe."
        },
        {
            "id": "docker",
            "nom": "Docker",
            "categorie": "Outils",
            "icone": "fab fa-docker",
            "niveau": 30,
            "description": "Conteneurisation d'applications, Dockerfile, docker-compose."
        },
        {
            "id": "proxmox",
            "nom": "Proxmox",
            "categorie": "Outils",
            "icone": "fas fa-cubes",
            "niveau": 35,
            "description": "Virtualisation d'environnements, gestion de VMs et conteneurs LXC."
        },
        {
            "id": "wireshark",
            "nom": "Wireshark",
            "categorie": "Outils",
            "icone": "fas fa-network-wired",
            "niveau": 50,
            "description": "Analyse de trafic réseau, diagnostic de protocoles."
        },
        {
            "id": "vmware",
            "nom": "VMware",
            "categorie": "Outils",
            "icone": "fas fa-desktop",
            "niveau": 55,
            "description": "Virtualisation, création et gestion de machines virtuelles."
        },
        {
            "id": "apache",
            "nom": "Apache",
            "categorie": "Outils",
            "icone": "fas fa-server",
            "niveau": 45,
            "description": "Configuration de serveur HTTP, virtual hosts, modules."
        },
        {
            "id": "linux",
            "nom": "Linux",
            "categorie": "Systèmes",
            "icone": "fab fa-linux",
            "niveau": 75,
            "description": "Administration système, scripting bash, services, réseau."
        },
        {
            "id": "windows",
            "nom": "Windows",
            "categorie": "Systèmes",
            "icone": "fab fa-windows",
            "niveau": 65,
            "description": "Administration Windows, PowerShell, Active Directory."
        },
        {
            "id": "active-directory",
            "nom": "Active Directory",
            "categorie": "Systèmes",
            "icone": "fas fa-shield-alt",
            "niveau": 40,
            "description": "Gestion des utilisateurs, GPO, domaines."
        },
        {
            "id": "cisco",
            "nom": "Cisco",
            "categorie": "Systèmes",
            "icone": "fas fa-project-diagram",
            "niveau": 50,
            "description": "Configuration routeurs/switches, VLAN, routage inter-VLAN, ACL."
        }
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

