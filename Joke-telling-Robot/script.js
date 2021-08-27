const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


function toggleButton(){
	button.disabled = !button.disabled;
}

function speakJokes(joke) {
	const jokeString = joke.trim().replace(/ /g, '%20');
	VoiceRSS.speech({
            key: 'This is my api key',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
    });
}



async function getJokes(){
	let joke = '';
	const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,explicit';
	try{
     const response = await fetch(apiUrl);
     const data = await response.json();
     if(data.setup) {
     	joke = `${data.setup}...${data.delivery}`;
     }else{
     	joke = data.joke;
     }
     speakJokes(joke);
     toggleButton();
	}catch(err){
      console.log('woop', err);
	}
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);