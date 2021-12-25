import { SelectorName } from 'src/utils/constant';
import { addStyle } from 'src/utils/style';

addStyle({
  [SelectorName.MainSideBar]: {
    display: 'none',
  },
  [SelectorName.QuestionList]: {
    margin: '0',
    width: '100%',
  },
  [SelectorName.QuestionPageSideBar]: {
    display: 'none',
  },
  [SelectorName.AnswerList]: {
    width: '100%',
  },
  [`${SelectorName.Answer} figure img`]: {
    width: '70%',
  },
});
