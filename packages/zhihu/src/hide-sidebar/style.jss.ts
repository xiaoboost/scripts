import { createStyle } from '@scripts/utils';
import { ZhihuClassName } from 'src/utils/constant';

export default createStyle({
  [`.${ZhihuClassName.MainContainer}, .${ZhihuClassName.QuestionContainer}`]: {
    position: 'relative',
  },
  SideBarBtn: {
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
  WidthFullMain: {
    [`
      & .${ZhihuClassName.MainSideBar},
      & .${ZhihuClassName.QuestionPageSideBar},
      & .${ZhihuClassName.SearchSideBar}
    `.trim()]: {
      display: 'none',
    },
    [`
      & .${ZhihuClassName.MainQuestionList},
      & .${ZhihuClassName.QuestionAnswerList},
      & .${ZhihuClassName.SearchItemList}
    `.trim()]: {
      marginRight: '0',
      width: '100%',
    },
    [`& .${ZhihuClassName.AnswerContainer} figure img`]: {
      maxWidth: '70%',
    },
  },
});
