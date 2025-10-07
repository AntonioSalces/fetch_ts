import "./styles.css"
import { fromFetch } from 'rxjs/fetch';
import { BehaviorSubject, switchMap} from "rxjs";
import { Personaje } from "./interface";
import { crearCartaPersonaje } from "./PersonajeCardComponent";

const grid = document.getElementsByClassName("grid")[0];

const currentPage = new BehaviorSubject(1);

function nextPage(n:number){
  currentPage.next(n);
}
(window as any).nextPage  = nextPage

currentPage.subscribe({
  next: (value)=>{
    limpiarGrid();
    fromFetch(`https://dragonball-api.com/api/characters?page=${value}`).pipe(
      switchMap(
        (response) => response.json())
    ).subscribe((json)=>{
      const personajes :Personaje[] = json['items']
      personajes.forEach((each)=>{ grid.innerHTML += crearCartaPersonaje(each) })
    })
  }
})

function limpiarGrid(){

  const elementos = Array.from(grid.children);

  elementos.forEach((el)=>{
    if(!el.classList.contains("paginacion"))
      el.remove();
  })
}

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