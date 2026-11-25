import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // importation du fichier CSS de Bootstrap pour pouvoir utiliser les classes CSS de Bootstrap dans l'application

function App() {
    const [taches, setTaches] = useState([]);
    const [afficherForm, setAfficherForm] = useState(false);
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [priorite, setPriorite] = useState("Haute");
    const [responsable, setResponsable] = useState("");
    const [dateLimite, setDateLimite] = useState("");
    const [statut, setStatut] = useState("a faire");
    const [filtre, setFiltre] = useState("Toutes");

    function ajouterTache(e) {
        e.preventDefault();

        if (nom.trim() === "") {
            alert("Veuillez saisir un nom pour la tâche !");
            return;
        }

        const nouvelleTache = {
            id: Date.now(),
            nom: nom,
            description: description,
            priorite: priorite,
            responsable: responsable,
            date_limite: dateLimite,
            statut: statut
        };

        setTaches([...taches, nouvelleTache]);

        setNom("");
        setDescription("");
        setPriorite("Haute");
        setResponsable("");
        setDateLimite("");
        setStatut("a faire");

        setAfficherForm(false);
    }

    function supprimerTache(id) {
        if (window.confirm("Voulez-vous supprimer cette tâche ?")) {
            setTaches(taches.filter(tache => tache.id !== id));
        }
    }

    function changerStatut(id, nouveauStatut) {
        setTaches(
            taches.map(tache =>
                tache.id === id
                    ? { ...tache, statut: nouveauStatut }
                    : tache
            )
        );
    }

    const aujourdhui = new Date().toISOString().split("T")[0];

    const enCours = taches.filter(t => t.statut === "en cours").length;

    const terminees = taches.filter(t => t.statut === "termine").length;

    const aFaire = taches.filter(t => t.statut === "a faire").length;

    const retard = taches.filter(
        t => t.statut !== "termine" &&
        t.date_limite !== "" &&
        t.date_limite < aujourdhui
    ).length;

    const tachesFiltrees = filtre === "Toutes"
        ? taches
        : taches.filter(tache => tache.priorite === filtre);

    return (
        <div className="container mt-4">

            <h1 className="text-center mb-4">GESTION DES TÂCHES</h1>

            <div className="row">

                <div className="col-md-5">

                    <div className="text-center mb-3">
                        {!afficherForm && (
                            <button
                                className="btn btn-lg btn-secondary text-white"
                                onClick={() => setAfficherForm(true)}
                            >
                                Ajouter une nouvelle tâche
                            </button>
                        )}
                    </div>

                    {afficherForm && (
                        <div className="card">

                            <div className="card-header bg-secondary text-white text-center">
                                Nouvelle tâche
                            </div>

                            <div className="card-body">

                                <form onSubmit={ajouterTache}>

                                    <div className="mb-3">
                                        <label className="form-label">Nom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={nom}
                                            onChange={e => setNom(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Priorité</label>
                                        <select
                                            className="form-control"
                                            value={priorite}
                                            onChange={e => setPriorite(e.target.value)}
                                        >
                                            <option value="Haute">Haute</option>
                                            <option value="moyenne">Moyenne</option>
                                            <option value="basse">Basse</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Responsable</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={responsable}
                                            onChange={e => setResponsable(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Date limite</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={dateLimite}
                                            onChange={e => setDateLimite(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Statut</label>
                                        <select
                                            className="form-control"
                                            value={statut}
                                            onChange={e => setStatut(e.target.value)}
                                        >
                                            <option value="a faire">À faire</option>
                                            <option value="en cours">En cours</option>
                                            <option value="termine">Terminé</option>
                                        </select>
                                    </div>

                                    <div className="text-center mt-3">

                                        <button type="submit" className="btn btn-secondary text-white me-2">
                                            Enregistrer
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => setAfficherForm(false)}
                                        >
                                            Fermer
                                        </button>

                                    </div>

                                </form>

                            </div>
                        </div>
                    )}

                </div>

                <div className="col-md-7">

                    <h3 className="text-center">📊 Tableau de bord</h3>

                    <div className="row text-center">

                        <div className="col-3">
                            <div className="card bg-info text-white">
                                <div className="card-body">
                                    <h5>En cours</h5>
                                    <h2>{enCours}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-3">
                            <div className="card bg-success text-white">
                                <div className="card-body">
                                    <h5>Terminées</h5>
                                    <h2>{terminees}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-3">
                            <div className="card bg-secondary text-white">
                                <div className="card-body">
                                    <h5>À faire</h5>
                                    <h2>{aFaire}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-3">
                            <div className="card bg-danger text-white">
                                <div className="card-body">
                                    <h5>En retard</h5>
                                    <h2>{retard}</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-3">

                        <label className="fw-bold">Filtrer par priorité :</label>

                        <select
                            className="form-control"
                            value={filtre}
                            onChange={e => setFiltre(e.target.value)}
                        >
                            <option value="Toutes">Toutes</option>
                            <option value="Haute">Haute</option>
                            <option value="moyenne">Moyenne</option>
                            <option value="basse">Basse</option>
                        </select>

                    </div>

                    <div className="mt-3">

                        {tachesFiltrees.length === 0 ? (
                            <p className="text-muted">
                                Aucune tâche avec cette priorité.
                            </p>
                        ) : (

                            <ul className="list-group">

                                {tachesFiltrees.map(tache => (
                                    <li
                                        key={tache.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <span>
                                            <strong>{tache.nom}</strong> - {tache.description || "Pas de description"}
                                        </span>

                                        <span className="badge bg-secondary">
                                            {tache.priorite}
                                        </span>
                                    </li>
                                ))}

                            </ul>

                        )}

                    </div>

                </div>

            </div>

            <div className="row mt-4">

                {taches.map(tache => (

                    <div className="col-md-4 mb-3" key={tache.id}>

                        <div className="card h-100">

                            <div className="card-header bg-dark text-white">
                                {tache.nom}
                            </div>

                            <div className="card-body">

                                <p>{tache.description || "Pas de description"}</p>

                                <p>
                                    Statut :
                                    <span className={`badge ms-2 ${
                                        tache.statut === "a faire"
                                            ? "text-bg-info"
                                            : tache.statut === "en cours"
                                            ? "text-bg-warning"
                                            : "text-bg-success"
                                    }`}>
                                        {tache.statut}
                                    </span>
                                </p>

                                <div className="text-end">
                                    <p>
                                        Responsable : <strong>{tache.responsable}</strong>
                                    </p>

                                    <p>
                                        Date limite : <strong>{tache.date_limite}</strong>
                                    </p>
                                </div>

                                <p>
                                    Priorité :
                                    <span className={`badge ms-2 ${
                                        tache.priorite === "basse"
                                            ? "text-bg-info"
                                            : tache.priorite === "moyenne"
                                            ? "text-bg-warning"
                                            : "text-bg-danger"
                                    }`}>
                                        {tache.priorite}
                                    </span>
                                </p>

                            </div>

                            <div className="card-footer text-center">

                                {tache.statut === "termine" ? (

                                    <span className="text-success fw-bold">
                                        ✔ Tâche terminée
                                    </span>

                                ) : (

                                    <>
                                        <button
                                            className="btn btn-sm btn-warning me-1"
                                            onClick={() => changerStatut(tache.id, "en cours")}
                                        >
                                            En cours
                                        </button>

                                        <button
                                            className="btn btn-sm btn-success me-1"
                                            onClick={() => changerStatut(tache.id, "termine")}
                                        >
                                            Terminé
                                        </button>

                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => supprimerTache(tache.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </>

                                )}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default App;