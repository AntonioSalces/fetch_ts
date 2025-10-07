import './style.css'
import { fromEvent, from } from 'rxjs';
import { switchMap, tap, finalize } from 'rxjs/operators';

interface Character {
  name: string;
  race: string;
  ki: number;
  description?: string;
  image: string;
}

function fetchCharacters() {
  return fetch('https://dragonball-api.com/api/characters')
  .then(res => res.json())
  .then(data => data.items as Character[]);
}

const container = document.querySelector('.characters') as HTMLDivElement;

fromEvent(document, 'DOMContentLoaded')
  .pipe(
    tap(() => {
      container.innerHTML = `<p style="font-size:1.2em;">Cargando personajes...</p>`;
    }),
    switchMap(() => from(fetchCharacters())),
    finalize(() => {

    })
  )
  .subscribe({
    next: (characters: Character[]) => {
      container.innerHTML = characters.map(info => `
        <div class="card">
          <img src="${info.image}" alt="${info.name}" />
          <h3>${info.name}</h3>
          <p><u>Descripción</u>: ${info.description || 'Desconocida'}</p>
          <p><u>Raza</u>: ${info.race || 'Desconocida'}</p>
          <p><u>Poder</u>: ${info.ki || 'Desconocido'}</p>
        </div>
      `).join('');
    },
    error: err => {
      container.innerHTML = `<p style="color:red;">Error cargando personajes: ${err}</p>`;
    }
  });

/*async function LoadCharacters() {
  const answer = await fetch('https://dragonball-api.com/api/characters');
  const data = await answer.json();
  const characters: Character[] = data.items;
  const charactersContainer = document.querySelector('.characters') as HTMLDivElement;

  charactersContainer.innerHTML = characters.map(info => `
    <div class="card">
      <img src="${info.image}" alt="${info.name}" />
      <h3>${info.name}</h3>
      <p>Descripción: ${info.description || 'Desconocida'}
      <p>Raza: ${info.race || 'Desconocida'}</p>
      <p>Poder: ${info.ki || 'Desconocido'}</p>
    </div>
  `).join('');
}

window.addEventListener('DOMContentLoaded', LoadCharacters);*/