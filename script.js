const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


//data array of objects
const data = [
    {
      image: './img/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: './img/fun.jpg',
      text: "I'm having fun"
    },
    {
      image: './img/restroom.jpg',
      text: "I need to use the restroom"
    },
    {
      image: './img/homework.jpg',
      text: "I need help with my homework"
    },
    {
      image: './img/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: './img/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: './img/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: './img/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: './img/dontfeelgood.jpg',
      text: "I don't feel good"
    },
    {
      image: './img/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: './img/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: './img/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: './img/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: './img/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: './img/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: './img/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
  ];

  //loop thru the data to create a box
  data.forEach(createBox);
  
  //Create speech boxes
  function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item; 

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
        `;

    box.addEventListener('click', () => {
      setTextMessage(text);
      speakText(); 

      //Add active effect
      box.classList.add('active');
      setTimeout(()=> box.classList.remove('active'), 800);
    });

    main.appendChild(box);
  }

  //Init speech synthesis
  const message = new SpeechSynthesisUtterance(); 

  //Store voices
  let voices = [];

  function getVoices() {
    voices = speechSynthesis.getVoices(); 

    voices.forEach(voice => {
      const option = document.createElement('option');
      
      option.value = voice.name; 
      option.innerText = `${voice.name} ${voice.lang}`;

      voicesSelect.appendChild(option);
    });
  }

  //Set text
  function setTextMessage(text) {
    message.text = text; 
  }

  //Speak text
  function speakText() {
    speechSynthesis.speak(message);
  }

  //Set voice
  function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
  }

  // Voices changed
  speechSynthesis.addEventListener('voiceschanged', getVoices )


  //Toggle text box
  toggleBtn.addEventListener('click', () => 
    document.getElementById('text-box').classList.toggle('show')
  );

    //Close button
    closeBtn.addEventListener('click', () => 
    document.getElementById('text-box').classList.remove('show')
  );

  //Change voice
  voicesSelect.addEventListener('change', setVoice)

  //Read text button
  readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText(); 
  })

  getVoices(); 