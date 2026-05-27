import { useEffect, useState } from 'react';

type Patient = {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
};

function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL);

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();

        setPatients(data);
      } catch (err) {
        setError('Error loading patients: ' + err);
      } finally {
        setLoading(false);
      }
    }

    fetchPatients();
  }, []);

  return (
    <main>
      <header>
        <h1>Patient Dashboard</h1>
        <button>Add Patient</button>
      </header>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <section>
          {patients.map((patient) => (
            <article key={patient.id}>
              <img
                src={patient.avatar}
                alt={patient.name}
                width={50}
                height={50}
              />

              <h3>{patient.name}</h3>

              <p>
                Created:{' '}
                {new Date(patient.createdAt).toLocaleDateString()}
              </p>

              <button
                onClick={() => setSelectedPatient(patient)}
              >
                View Details
              </button>
            </article>
          ))}
        </section>
      )}

      {selectedPatient && (
        <dialog open>
          <h2>{selectedPatient.name}</h2>

          <img
            src={selectedPatient.avatar}
            alt={selectedPatient.name}
            width={80}
            height={80}
          />

          <p>{selectedPatient.description}</p>

          <a
            href={selectedPatient.website}
            target="_blank"
            rel="noreferrer"
          >
            Visit Website
          </a>

          <p>
            Created:{' '}
            {new Date(
              selectedPatient.createdAt
            ).toLocaleString()}
          </p>

          <button onClick={() => setSelectedPatient(null)}>
            Close
          </button>
        </dialog>
      )}
    </main>
  );
}

export default Dashboard;