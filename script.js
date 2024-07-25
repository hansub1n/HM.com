document.addEventListener('DOMContentLoaded', () => {
    const  search = document.getElementById('search');
    const  search_input = document.getElementById('search_input');
    const  movie_list = document.getElementById('movie_list');
    let movie_card = [];
    

    function fetchMovie() {
        const API_KEY = 'cb0e01db7bf2b11a14af40c71fbcfd57';

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjBlMDFkYjdiZjJiMTFhMTRhZjQwYzcxZmJjZmQ1NyIsIm5iZiI6MTcyMTgwMDk3Ni42NzQ5NzEsInN1YiI6IjY2YTA3YTdlNmIzZmUyYjc0MzUwMzQwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0fCMIDCl4V3WzblCI-iupkhhCO9OaWMPHEIn0D9imWU'
            }
        };
        const T_url ='https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1';
    
        const P_url = 'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1';
    
        fetch(P_url, options)
        .then(response => response.json())
        .then(response => {
            let movieCard = response['results'];

            let temp_html = "";
            movieCard.forEach(item => {
                let img_url = 'https://image.tmdb.org/t/p/w500' + item['backdrop_path'];
                let title = item['title'];
                let star = item['vote_average'];
                let overview = item['overview'];
                let id = item['id'];

                temp_html += `
                <div class="movie_card" id="${id}">
                    <div class="content">
                        <img src='${img_url}'>
                        <div class="info">
                            <h3>${title}</h3>
                            <p class="star">⭐${star}</p>
                            <p class="overview">${overview}</p>
                        </div>
                    </div>
                </div>
                `;
            });
            movie_list.innerHTML = temp_html;
            movie_card = document.getElementsByClassName('movie_card');

            // 영화 카드 클릭시 alert
            for (let i = 0; i < movie_card.length; i++) {
                movie_card[i].addEventListener('click', () => {
                    alert(`영화 id: ${movie_card[i].id}`);
                });
            }

            console.log(movieCard);
        })
        .catch(error => {
            // 에러가 발생하면 에러 메시지를 콘솔에 출력
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    // 영화 검색 ui 구현
    function searchMovie() {
        const search_value = search_input.value.toUpperCase();
        const matchingMovies = [];

        for (let i = 0; i < movie_card.length; i++) {
            const card = movie_card[i];
            const card_title = card.getElementsByTagName('h3')[0].innerText.toUpperCase();
            if (card_title.indexOf(search_value) > -1) {
                card.style.display = 'inline-block';
                matchingMovies.push(card_title);
            } else {
                card.style.display = 'none';
            }
        }
        console.log('Matching movies: ', matchingMovies); // 일치하는 영화 제목 콘솔에 출력
    }
    
    search_input.addEventListener('input', () => {
        searchMovie();
    });

    search.addEventListener('submit', (event) => {
        event.preventDefault();
        searchMovie();
        search_input.value = "";
    });

    fetchMovie();
})