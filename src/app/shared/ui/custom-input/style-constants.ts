export interface ICustomInputStyle {
  border: string;
  borderWarn: string;
  padding: string;
  borderRadius: string;
  backgroundColor: string;
  inputFontSize: string;
  inputFontColor: string;
  inputWeight: string;
  inputClass?: string;
  labelFontSize: string;
  labelFontColor: string;
  labelWeight: string;
  iconSize: string;
  labelLineHeight: string;
}

export const defaultInputStyle: ICustomInputStyle = {
  border: '1px solid var(--color)',
  borderWarn: '1px solid var(--primary-warn)',
  padding: '12px 16px',
  borderRadius: '5px',
  backgroundColor: 'var(--bg-dark)',
  inputFontSize: '',
  inputFontColor: 'var(--color)',
  inputWeight: '',
  inputClass: 'regular-14',
  labelFontSize: '14px',
  labelFontColor: 'var(--color)',
  labelWeight: '400',
  labelLineHeight: '16.8px',
  iconSize: '16',
}