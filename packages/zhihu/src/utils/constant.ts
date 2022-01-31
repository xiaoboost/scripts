/** 知乎页面内选择器 */
export const ZhihuClassName = {
  /** 主页主卡片容器 */
  MainContainer: 'Topstory-container',
  /** 主页侧边栏 */
  MainSideBar: 'GlobalSideBar',
  /* 主页问题列表 */
  MainQuestionList: 'Topstory-mainColumn',
  /** 主页问题项 */
  MainQuestionItem: 'TopstoryItem',
  /** 主页问题列表容器 */
  MainQuestionListContainer: 'Topstory-follow',
  /** 主页问题标题 */
  MainQuestionItemTitle: 'ContentItem-title',
  /** 问题列表主容器 */
  QuestionContainer: 'Question-main',
  /* 问题页面侧边栏 */
  QuestionPageSideBar: 'Question-sideColumn--sticky',
  /* 缩略回答列表容器 */
  ShortAnswerListContainer: 'ListShortcut',
  /* 问题页面回答列表 */
  QuestionAnswerList: 'Question-mainColumn',
  /** 回答功能底栏 */
  AnswerBottomAction: 'RichContent-actions',
  /** 搜索页面列表 */
  SearchItemList: 'SearchMain',
  /** 搜索页面侧边栏 */
  SearchSideBar: 'SearchSideBar',
  /** 回答容器 */
  AnswerContainer: 'RichContent',
  /**
   * 回答文本容器
   *  - 它的子元素就是问答文本节点列表
   */
  AnswerContentContainer: 'RichText',
  /**
   * 回答被折叠
   *  - 该类与`AnswerContainer`同级
   */
  AnswerCollapsed: 'is-collapsed',
  /** 专栏文章容器 */
  ColumnContainer: 'Post-Main',
  /** 专栏文章侧边按钮 */
  ColumnAction: 'Post-SideActions',
} as const;

/** 监听元素选项 */
export const observerOption: MutationObserverInit = {
  attributes: false,
  attributeOldValue: false,
  characterData: false,
  characterDataOldValue: false,
  childList: false,
  subtree: false,
};
