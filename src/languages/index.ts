import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en_US from './english-US.json';
import pt_pi from './portuguese.json';
import fr_FR from './french.json';
import es_ES from './spanish.json';

export const setI18nConfig = async () => {
  try {
    i18next.language = 'en_US';
    i18next.use(initReactI18next).init({
      resources: {
        en_US: {translation: en_US},
        pt_pi: {translation: pt_pi},
        fr_FR: {translation: fr_FR},
        es_ES: {translation: es_ES},
      },
      lng: 'en_US',
      fallbackLng: 'en_US',
      interpolation: {
        escapeValue: false, // not needed for react!!
      },
    });
  } catch (error) {
    console.log('error', error);
  }
};
export const localize = (params: string) => {
  return i18next.t(params);
};

// // Define the custom function name for changing the language
export function changeLanguage(locale: string) {
  try {
    i18next.changeLanguage(locale);
  } catch (error) {
    console.log(' error>>>>>', error);
  }
}
