import { ZhihuSelectorName } from 'src/utils/constant';
import { SelectorName } from './constant';
import { addStyle } from 'src/utils/style';

addStyle({
  [`.${SelectorName.WidthFullMain}`]: {
    [`.${ZhihuSelectorName.MainSideBar}`]: {
      display: 'none',
    },
    [`.${ZhihuSelectorName.QuestionPageSideBar}`]: {
      display: 'none',
    },
    [`.${ZhihuSelectorName.SearchSideBar}`]: {
      display: 'none',
    },
    [`.${ZhihuSelectorName.MainQuestionList}`]: {
      marginRight: '0',
      width: '100%',
    },
    [`.${ZhihuSelectorName.QuestionAnswerList}`]: {
      marginRight: '0',
      width: '100%',
    },
    [`.${ZhihuSelectorName.SearchItemList}`]: {
      marginRight: '0',
      width: '100%',
    },
    [`.${ZhihuSelectorName.QuestionAnswer} figure img`]: {
      width: '70%',
    },
  },
  [`.${ZhihuSelectorName.MainContainer}, .${ZhihuSelectorName.QuestionContainer}`]: {
    position: 'relative',
  },
  [`.${SelectorName.SideBarBtn}`]: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    position: 'absolute',
    right: '-26px',
    background: '#fff',
    borderRadius: '6px',
    width: '32px',
    height: '32px',
    color: '#8590a6',
    boxShadow: '0 1px 3px rgb(18 18 18 / 10%)',
  },
});
