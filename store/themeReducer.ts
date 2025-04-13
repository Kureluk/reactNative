export type ThemeState = 'dark' | 'light';

export type ThemeAction = { type: 'TOGGLE' };

export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'TOGGLE':
      return state === 'dark' ? 'light' : 'dark';
    default:
      return state;
  }
};
