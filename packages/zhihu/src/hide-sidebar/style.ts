import { ZhihuClassName } from 'src/utils/constant';
import { ClassName } from './constant';
import { addStyle } from '@scripts/utils';

export function active() {
  addStyle({
    [`.${ClassName.WidthFullMain}`]: {
      [`.${ZhihuClassName.MainSideBar}`]: {
        display: 'none',
      },
      [`.${ZhihuClassName.QuestionPageSideBar}`]: {
        display: 'none',
      },
      [`.${ZhihuClassName.SearchSideBar}`]: {
        display: 'none',
      },
      [`.${ZhihuClassName.ShortAnswerListContainer}`]: {
        marginRight: '0',
        width: '100%',
      },
      [`.${ZhihuClassName.MainQuestionList}`]: {
        marginRight: '0',
        width: '100%',
      },
      [`.${ZhihuClassName.QuestionAnswerList}`]: {
        marginRight: '0',
        width: '100%',
      },
      [`.${ZhihuClassName.SearchItemList}`]: {
        marginRight: '0',
        width: '100%',
      },
      [`.${ZhihuClassName.AnswerContainer} figure img`]: {
        maxWidth: '70%',
      },
    },
    [`.${ZhihuClassName.MainContainer}`]: {
      position: 'relative',
    },
    [`.${ZhihuClassName.QuestionContainer}`]: {
      position: 'relative',
    },
    [`.${ClassName.SideBarBtn}`]: {
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
}
