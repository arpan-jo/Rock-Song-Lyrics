const getMusic = () => {
   const music = document.getElementById('inputName').value;
   if (music === '') {
      alert('type the song name that you want to listen');
      document.getElementById('container').innerHTML = '';
   } else {
      fetch(`https://api.lyrics.ovh/suggest/${music}`)
         .then(res => res.json())
         .then(data => getAlbum(data.data))
         .catch(error => console.log(error));
   }
   document.getElementById('inputName').value = '';
};

const getAlbum = album => {
   const container = document.getElementById('container');
   container.innerHTML = '';
   album.forEach(element => {
      const pot = document.createElement('div');
      pot.className = 'single-result row align-items-center my-3 p-3';
      const container2 = `
        <div class="col-md-9">
          <h3 id="musicName" class="lyrics-name">
             ${element.title}
          </h3>
          <p class="author lead">
             ${element.album.title} by <span id="singer">${element.artist.name}</span>
          </p>
            <audio controls>
                <source src="${element.preview}" type="audio/ogg">
            </audio>
       </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${element.artist.name}', '${element.title}')" class="btn btn-success">
            Get Lyrics
            </button>
        </div>`;
      pot.innerHTML = container2;
      container.appendChild(pot);
   });
};

const getLyric = async (singerName, musicName) => {
   const res = await fetch(
      `https://api.lyrics.ovh/v1/${singerName}/${musicName}`
   );
   const data = await res.json();
   if (data.lyrics === '') {
      alert('NO lyrics in this song');
   } else {
      alert(data.lyrics);
   }
};
