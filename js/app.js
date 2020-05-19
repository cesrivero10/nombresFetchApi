document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

// Llamado a Ajax e imprimir resultados
function cargarNombres(e) {
    e.preventDefault();

    //Leer las variables

    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.getElementById('numero').value;

    let url = '';
    url += 'https://randomuser.me//api/?inc=results,name,gender,nat&';
    //Si hay origen se agrega a la url
    if(origenSeleccionado !== ''){
        url+= `nat=${origenSeleccionado}&`;
    }
    if(generoSeleccionado !== ''){
        url+= `gender=${generoSeleccionado}&`;
    }
    if(cantidad !== ''){
        url+= `results=${cantidad}`;
    }
    
    // Crear fetch
    fetch(url)
        .then( res => res.json() )
        .then(data => {
            let html = `<h2>Nombres Generados</h2>`;
            html += `<ul class="lista">`
            data.results.forEach(nombre => {
                html += `
                    <li>${nombre.name.first} ${nombre.name.last}</li>
                `;
            })
            html += `</ul>`;
            document.querySelector('#resultado').innerHTML = html;
        })
        .catch(error => console.log(error))
}