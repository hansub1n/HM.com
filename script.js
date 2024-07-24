const API_KEY = 'cb0e01db7bf2b11a14af40c71fbcfd57';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjBlMDFkYjdiZjJiMTFhMTRhZjQwYzcxZmJjZmQ1NyIsIm5iZiI6MTcyMTgwMDk3Ni42NzQ5NzEsInN1YiI6IjY2YTA3YTdlNmIzZmUyYjc0MzUwMzQwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0fCMIDCl4V3WzblCI-iupkhhCO9OaWMPHEIn0D9imWU'
    }
};
const url ='https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1';
  
fetch(url, options)
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
            <a>
                <img src='${img_url}'>
                    <div class="info">
                    <h3>${title}</h3>
                    <p>${star}</p>
                    <p>${overview}</p>
                </div>
            </a>
        </div>
        `;

        document.getElementById('movie_list').innerHTML = temp_html;
        console.log(movieCard);
    });
})
.catch(error => {
    // 에러가 발생하면 에러 메시지를 콘솔에 출력
    console.error('There was a problem with the fetch operation:', error);
});

const  search = document.getElementById('search');
const  search_input = document.getElementById('search_input').value;
const  search_btn = document.getElementById('search_btn');
const  movie_card = document.getElementsByClassName('movie_card');

function searchMovie () {
    
}