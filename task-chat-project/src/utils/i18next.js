import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
  ru: {
    translation: {
      value: 'ru',
      loading: 'Загрузается',
      notFound: 'Не найдено',
      header: {
        text: 'Мессенджер',
        editButton: 'Изменить данные',
        signOut: 'Выйти',
      },
      alert: {
        success: {
          load: 'загрузка картинок успешна',
          download: 'скачать начинается',
          updateProfile: 'профиль обновился',
        },
        failure: {
          load: 'загрузка картинок неуспешна',
          download: 'нельзя скачать',
          updateProfile: 'нет изменения',
        },
        message: {
          new: 'новое сообщение',
        },
        loading: 'идёт загрузка',
      },
      form: {
        buttons: {
          signUp: 'регистрироваться',
          signUpShort: 'регистрация',
          signIn: 'войти',
          updateProfile: 'обновить данные',
          cancel: 'отменить',
        },
        errors: {
          signUp: {
            default: 'идёт ошибка, нельзя регистрироваться',
            errorEmail: 'ваша почта уже использовалась',
          },
          signIn: {
            default: 'Почта или пароль не правилный',
          },
        },
        email: {
          text: 'почта',
          validationRequire: 'введите вашу почту',
          validationPattern: 'ваша почта не правильная',
        },
        password: {
          text: 'пароль',
          validationRequire: 'введите ваш пароль',
          validationLength: 'длина пароля не может быть менее 6 символов',
        },
        passwordConfirm: {
          text: 'потвердить пароль',
          validationRequire: 'потвердите ваш пароль',
          validationMatch: 'ваши пароли не совпадают',
        },
        firstName: {
          text: 'имя',
          validationRequire: 'введите ваше имя',
          validationPattern: 'имя не может включить специальные символы',
        },
        lastName: {
          text: 'фамилия',
          validationRequire: 'введите вашу фамилия',
          validationPattern: 'фамилия не может включить специальные символы',
        },
        patronym: {
          text: 'отчество',
          validationRequire: 'введите ваше отчество',
          validationPattern: 'отчество не может включить специальные символы',
        },
      },
      chat: {
        label: 'мессенджер',
        find: 'поиск людей',
        pronoun: 'Вы:',
        notFound: 'Человек не найден',
        findMes: 'Искать сообщения',
        suggest: 'Начать эту беседу вашим первым сообщением',
      },
    },
  },
  en: {
    translation: {
      value: 'en',
      loading: 'Loading',
      notFound: 'Not found',
      header: {
        text: 'Messenger',
        editButton: 'Edit profile',
        signOut: 'Sign out',
      },
      alert: {
        success: {
          load: 'images loading successful',
          download: 'starting download',
          updateProfile: 'updated user profile',
        },
        failure: {
          load: 'images loading failed',
          download: 'unable to download',
          updateProfile: 'no change to update',
        },
        message: {
          new: 'new message',
        },
        loading: 'loading',
      },
      form: {
        buttons: {
          signUp: 'sign up',
          signUpShort: 'sign up',
          signIn: 'sign in',
          updateProfile: 'update profile',
          cancel: 'cancel',
        },
        errors: {
          signUp: {
            default: 'unable to sign up',
            errorEmail: 'your email is already used',
          },
          signIn: {
            default: 'email or password is incorrect',
          },
        },
        email: {
          text: 'email ',
          validationRequire: 'please enter your email',
          validationPattern: 'your email is incorrect',
        },
        password: {
          text: 'password ',
          validationRequire: 'please enter your password',
          validationLength: 'password cannot be less than 6 characters',
        },
        passwordConfirm: {
          text: 'confirm password ',
          validationRequire: 'please confirm your password',
          validationMatch: 'your passwords do not match',
        },
        firstName: {
          text: 'first name',
          validationRequire: 'first name is required',
          validationPattern: 'first name can not include special characters',
        },
        lastName: {
          text: 'last name',
          validationRequire: 'last name is required',
          validationPattern: 'last name can not include special characters',
        },
        patronym: {
          text: 'patronym',
          validationRequire: 'patronym is required',
          validationPattern: 'patronym can not include special characters',
        },
      },
      chat: {
        label: 'messenger',
        find: 'find people',
        pronoun: 'You:',
        notFound: 'Not found',
        findMes: 'Find messages',
        suggest: 'Start chat by sending your first message',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
// export const t = (key, options) => i18n.t(key, options);
// export const changeLanguage = (language) => i18n.changeLanguage(language);
