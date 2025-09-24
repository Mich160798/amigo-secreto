const inputAmigo = document.getElementById('amigo');
const listaAmigosEl = document.getElementById('listaAmigos');
const resultadoEl = document.getElementById('resultado');

let amigos = [];

function agregarAmigo() {
  const nombre = inputAmigo.value.trim();
  if (!nombre) {
    alert('Escribe un nombre antes de añadir.');
    return;
  }
  if (amigos.includes(nombre)) {
    alert('Ese nombre ya está en la lista. Evita duplicados.');
    inputAmigo.value = '';
    return;
  }

  amigos.push(nombre);
  inputAmigo.value = '';
  inputAmigo.focus();
  renderLista();
}

function renderLista() {
  listaAmigosEl.innerHTML = '';
  if (amigos.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No hay amigos añadidos aún.';
    listaAmigosEl.appendChild(li);
    return;
  }

  amigos.forEach((nombre, index) => {
    const li = document.createElement('li');
    li.className = 'name-item';

    const span = document.createElement('span');
    span.textContent = nombre;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.style.marginLeft = '12px';
    btnEliminar.onclick = () => eliminarAmigo(index);

    li.appendChild(span);
    li.appendChild(btnEliminar);
    listaAmigosEl.appendChild(li);
  });
}

function eliminarAmigo(index) {
  amigos.splice(index, 1);
  renderLista();
  resultadoEl.innerHTML = '';
}

function mezclar(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sortearAmigo() {
  if (amigos.length < 2) {
    alert('Necesitas al menos 2 personas para sortear.');
    return;
  }

  let destinatarios = amigos.slice();
  let intentos = 0;
  const MAX_INTENTOS = 1000;

  do {
    destinatarios = mezclar(destinatarios);
    intentos++;
    if (intentos > MAX_INTENTOS) {
      alert('No se pudo generar un sorteo válido. Intenta de nuevo.');
      return;
    }
  } while (destinatarios.some((d, i) => d === amigos[i]));

  resultadoEl.innerHTML = '';
  amigos.forEach((nombre, i) => {
    const li = document.createElement('li');
    li.textContent = `${nombre} → ${destinatarios[i]}`;
    resultadoEl.appendChild(li);
  });
}

inputAmigo.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') agregarAmigo();
});

renderLista();