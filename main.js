fetch('http://localhost:4000/movies')
        .then(res => res.json())
        .then(movies => {
            const html = movies.map(movie => {
                return `<article data-id="${movie.id}">
                        <h2>${movie.title}</h2>
                        <img src="${movie.poster}" alt="${movie.title}">
                        <p>${movie.year}</p>
                        <button id="btn">ELIMINAR</button>
                        </article>`
            }).join('')
            
            $('main').innerHTML = html
            $('#btn').on('click', e => {
                if(e.target.matches('#btn')){
                    const article = e.target.closest('article')
                    const id = article.dataset.id

                    fetch(`http://localhost:4000/movies/${id}`,{
                        method: 'DELETED'
                    })
                    .then(res => res.json())
                    .then(res => {
                        if(res.ok){
                            article.remove()
                        }
                    })
                }    
            })
        })