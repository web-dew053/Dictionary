let state = {
  word: "",
  meanings: [],
  phonetics: [],
};

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const inputEl = document.querySelector("#input");
const formEl = document.querySelector("#form");
const btnEl = document.querySelector("#btn");

const containerWord = document.querySelector(".result_word");
const soundBtn = document.querySelector(".result_sound");

const resultWrapper = document.querySelector(".result");
const resultList = document.querySelector(".result_list");



           // div


const div = document.querySelector('.div_el')
const divTwo = document.querySelector('.div-2')
const divThree = document.querySelector('.div-3')
const divFour = document.querySelector('.div-4')
const divFive = document.querySelector('.div-5')


const renderDefinition = (itemDefinition) => {
  return `
   <div class="result_item__definition">
         <p>${itemDefinition.definition}</p>
          <div class="result-item__example">${itemDefinition.example}</div>
        </div>
   `
   
   // console.log(return);
};
const renderItem = (item) => {
  const itemDefinition = item.definitions[0];
  return `
   <div class="result_item">
     <div class="result_item__part">${item.partOfSpeech}</div>
      <div class="result_item__definitions">
      </div>
   </div>
   `;
};



const showResult = () => {
   
  resultList.innerHTML = "";

  state.meanings.forEach((item) => (resultList.innerHTML += renderItem(item)));
};

const insertWord = () => {
   resultWrapper.style.display = "block";
  containerWord.innerText = state.word + ` - ${state.phonetics[0].text}`;
  div.innerText = state.meanings[0].definitions[0].definition
  divTwo.innerText = state.meanings[0].definitions[0].example
  divThree.innerText = state.meanings[0].definitions[1].definition
  divFour.innerText = state.meanings[0].definitions[0].example
  divFive.innerText = state.meanings[0].definitions[2].definition
  console.log(state
   );


};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!state.word.trim()) return;

  try {
    const response = await fetch(`${url}${state.word}`);
    const data = await response.json();

    if (response.ok && data.length) {
      const item = data[0];

      state = {
        ...state,
        meanings: item.meanings,
        phonetics: item.phonetics,
      };

      insertWord();
    }
  } catch (err) {
    console.log(err);
  }
};

handleKeyup = (e) => {
  const value = e.target.value;
  state.word = value;
};

const handleSound = () => {
  if (state.phonetics.length) {
    const sound = state.phonetics[0];

    if (sound.audio) {
      new Audio(sound.audio).play();
    }
  }
};

inputEl.addEventListener("keyup", handleKeyup);
formEl.addEventListener("submit", handleSubmit);
soundBtn.addEventListener("click", handleSound);


