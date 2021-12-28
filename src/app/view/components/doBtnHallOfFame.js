import elementCreator from '../../utils/elementCreator';
import HallOfFameBtn from '../../../../static/assets/img/HallOfFameBtn.svg';

function doBtnHallOfFame(text) {
  // eslint-disable-next-line prettier/prettier
  const imageCup = elementCreator('img', {
    src: HallOfFameBtn,
    class: 'halloffame-icon',
    alt: 'Victory Cup',
  });

  // let buttonCreator;

  // if (typeof mode === 'undefined') {
  //   buttonCreator = elementCreator(
  //     'button',
  //     {
  //       class: 'game__button game__button--disabled',
  //       disabled: 'disabled',
  //     },
  //     imageCup,
  //     text,
  //   );
  // } else {
  const buttonCreator = elementCreator(
    'button',
    {
      class: 'game__button',
    },
    imageCup,
    text,
  );
  // }

  return buttonCreator;
}
// dzialanie przycisku - eventlistener
// doBtnHallOfFame.map((button) =>
//   doBtnHallOfFame.addEventListener('click', () => {
//     clearActive(modeButtons);
//     doBtnHallOfFame.classList.add('active');
//     window.app.changeGameMode(button.textContent);
//   }),
// );

export default doBtnHallOfFame;
