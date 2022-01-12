import { createStyle } from '@scripts/utils';
import { HentaiKind, HentaiStyle } from 'src/utils';

const formBorderColor = '#8D8D8D';
const actionColor = '#888';
const actionActiveColor = '#fff';

export default createStyle({
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  body: {
    flexGrow: 1,
    marginBottom: 10,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    marginLeft: 6,
  },
  formBox: {
    marginBottom: 14,
  },
  formBoxTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    margin: '0 0 10px 0',
  },
  formBoxBody: {
    paddingLeft: 14,
  },
  formRow: {
    display: 'flex',
    alignItems: 'center',

    '& > *': {
      height: 24,
      lineHeight: '24px',
      borderColor: `${formBorderColor} !important`,
    },
  },
  formRowLabel: {
    width: 60,
    marginRight: 10,
  },
  formRowBody: {
    flexGrow: 1,
  },
  rangeRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,

    '& > *': {
      height: 24,
      lineHeight: '24px',
      borderColor: `${formBorderColor} !important`,
    },
  },
  rangeInput: {
    outline: 0,
    border: '1px solid',
    borderRadius: 4,
    boxSizing: 'border-box',
  },
  rangeDelete: {
    cursor: 'pointer',
    color: actionColor,
    transition: 'color .3s',

    '&:hover': {
      color: actionActiveColor,
    },
  },
  rangeAdd: {
    width: '100%',
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px dashed ${actionColor}`,
    color: actionColor,
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'color .3s, border-color .3s',

    '&:hover': {
      color: actionActiveColor,
      borderColor: actionActiveColor,
    },
  },
});
