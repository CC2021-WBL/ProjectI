import elementCreator from '../../utils/elementCreator';

/**
 * At this moment our parameter for this function is question
 * @param question
 * question as an object with answers property (answers as array)
 * this function create buttons and return an array of buttons
 * @returns {*[]}
 */

function answersButtons(question) {
  const buttons = [];
  question.answers.forEach((button, index) => {
    buttons.push(
      elementCreator(
        'button',
        { class: 'game__mode-rules-answrBtn' },
        question.answers[index],
      ),
    );
  });

  return buttons;
}

export default answersButtons;
