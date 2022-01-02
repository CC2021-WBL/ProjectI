import elementInjector from '../utils/elementInjector';
import questionForMode from './components/questionForMode';
import displayImage from './components/displayImage';
import modeButtons from './components/mainMenu';
import createLogo from './components/createLogo';
import ModalWindow from './components/modal/modalWindow';
import { INITIAL_GAME_MODE_TEXT } from '../data/consts';
import modeRules from './components/modeRules';
import buttonPlay from './components/buttonPlay';
import createImage from './components/createImage';
import doBtnHallOfFame from './components/doBtnHallOfFame';
import doHallOfFameContent from './components/doHallOfFameContent';
import displayTimerText from './components/displayTimerText';
import levelButtons from './components/settingsLevel';
import buttonWhite from './components/buttonWhite';
import answersButtons from './components/answersButtons';
import clearActive from '../utils/clearActive';
import displayWand from './components/wand';
import displayInitialMainText from './components/displayInitialMainText';
import displayButtonSettings from './components/displaySettingsBtn';

class View {
  // eslint-disable-next-line no-useless-constructor,no-empty-function
  constructor() {
    this.settings = false;
  }

  // eslint-disable-next-line class-methods-use-this
  render(query, ...children) {
    if (children.length === 0 || !query) {
      throw new Error('Required query and at least one child in arguments');
    }
    const parentElem = document.querySelector(query);
    parentElem.innerHTML = '';
    if (!parentElem) {
      throw new Error(`Not found element by query ${query}`);
    }
    elementInjector(parentElem, children);
  }

  showViewsForChosenMode(mode) {
    this.render('.game__mode', questionForMode(mode));
    this.render('.game__mode-rules', ...modeRules(mode));
    this.render(
      '.game__btns',
      doBtnHallOfFame(`Hall of fame`, mode),
      buttonPlay('Play the game'),
    );
    const settingsButton = displayButtonSettings('settings');
    settingsButton.addEventListener('click', this.toggleSettingsView);
    this.render('.game-image__btns', settingsButton);
  }

  // TODO: wyświetlanie opisu poziomu trudności w miejscu zdjęcia
  showViewsForDifficultyLevel(difficultyLevel) {
    //  wyświetlanie opisu poziomu trudności
  }

  // przygotowane pod dzialanie przycisku Hall Of Fame
  updateViewsForHallOfFameAtChosenMode(mode) {
    // this.render('.game__mode', questionForMode(mode));
    this.render('.game__mode-rules', doHallOfFameContent);
    this.render('.game__btns', doBtnHallOfFame(`Back`, mode));
  }

  renderInitialScreen() {
    this.render('.header__game-logo', createLogo());
    this.render('.header__game-nav', ...modeButtons);
    this.render('.game__mode', INITIAL_GAME_MODE_TEXT);
    this.render('.game__mode-rules', ...displayInitialMainText);
    // this.render('.game-image__content', createImage());
    // this.render('.game__mode-rules', INITIAL_MAIN_TEXT);
    this.render('.game-image__content', createImage());
  }

  showSettings() {
    this.render('.game__mode', 'Choose level');
    this.render('.game__mode-rules', ...levelButtons);
    this.bindDifficultyLevelButton(window.app.changeDifficultyLevel);
  }

  // hide settings screen
  hideSettings() {
    this.renderInitialScreen();
  }

  toggleSettingsView = () => {
    if (!this.settings) {
      this.showSettings();
    } else {
      this.hideSettings();
    }
    this.settings = !this.settings;
  };

  renderTimer(timeInSeconds, initialTime) {
    this.render('.game-timer', ...displayWand(timeInSeconds, initialTime));
    this.render('.game-timer__text', displayTimerText(timeInSeconds));
  }

  renderModal() {
    this.render('.modal', ModalWindow());
  }

  renderImage() {
    this.render('.game-image__content', displayImage());
  }

  renderQuestion(question) {
    this.render('.game__mode', 'Who is this? What is his house');
    this.render('.game__mode-rules', ...answersButtons(question));
    this.render(
      '.game-image__content',
      displayImage(question.image, 'very handsome Harry'),
    );
  }

  disappearButtonsAndBackground() {
    // TODO: dodać klasę, do wszystkich znikających elementów i zamienić na querySelecorAll
    const modeNav = document.querySelector('.header__game-nav');
    modeNav.classList.add('hidden-elements');
    const playAndHofButtons = document.querySelector('.game__btns');
    playAndHofButtons.classList.add('hidden-elements');
    const settingsButton = document.querySelector('.game-image__btns');
    settingsButton.classList.add('hidden-elements');
    const gameModeContainer = document.querySelector('.game__mode-rules');
    gameModeContainer.id = 'question-mode';
  }

  // -------------- BINDINGS ------------------------------------

  bindButtonPlay(handler) {
    const playButton = document.querySelector('.game__button--orange');
    playButton.addEventListener('click', () => {
      handler();
    });
  }

  bindModeButtons(handler) {
    modeButtons.map((button) =>
      button.addEventListener('click', () => {
        clearActive(modeButtons);
        button.classList.add('active');
        handler(button.textContent);
      }),
    );
  }

  bindAnswerButtons(handler) {
    const answerButtons = [
      ...document.getElementsByClassName('game__mode-rules-answrBtn'),
    ];
    answerButtons.map((button) =>
      button.addEventListener('click', () => {
        handler(button.textContent);
      }),
    );
  }
  // TODO: przeniesienie funkcji bindujących do controllera

  bindDifficultyLevelButton(handler) {
    /* 
  TODO: przeniesienie funkcji bindujących do controllera
    const difficultyLevelButtons =
      document.querySelectorAll('.game__mode-rules'); */
    levelButtons.map((button, index) =>
      button.addEventListener('click', () => {
        clearActive(levelButtons);
        button.classList.add('active');
        handler(index);
      }),
    );
  }
}

export default View;
