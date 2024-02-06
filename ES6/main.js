import { nutzerGruessen } from './modul.js';

document.getElementById('benutzerFormular').addEventListener('submit', ereignis => {
    ereignis.preventDefault();

    const name = document.getElementById('benutzerName').value;
    const alter = document.getElementById('benutzerAlter').value;

    const begruessung = nutzerGruessen(name, alter);
    document.getElementById('ausgabe').textContent = begruessung;
});
