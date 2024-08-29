import { createContext } from 'react';

export const LanguageContext = createContext();

export const languageText = {
  ru: {
    value: 'ru',
    header: {
      text: 'задание для стажировки летом 2024 - elecard',
      editButton: 'Изменить данные',
      signOut: 'Выйти',
    },
    footer: {
      text: '© 2024 фронтенд на react - данг',
    },
    taskbar: {
      selector: {
        sort: {
          text: 'сорт.',
          default: 'по умолчанию',
          size: 'по размерам',
          name: 'по именам',
          date: 'по датам',
        },
        filter: { text: 'фильтер', all: 'все' },
        order: { text: 'порядок', grow: 'растет', fall: 'падает' },
      },
      treeview: 'дерево',
      slider: 'карточки по странице',
      recover: 'восстановить карты',
    },
    tree: {
      root: 'корень',
      leaf: {
        date: 'дата',
        size: 'размер',
      },
      buttonToTop: {
        root: 'назад к началу',
        element: 'назад к',
      },
    },
    card: {
      suggestion: 'Открыть полностью',
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
  },
  en: {
    value: 'en',
    header: {
      text: 'intern task summer 2024 - elecard',
      editButton: 'Edit profile',
      signOut: 'Sign out',
    },
    footer: { text: '© 2024 frontend by react - dang' },
    taskbar: {
      selector: {
        sort: {
          text: 'sort',
          default: 'default',
          size: 'by size',
          name: 'by name',
          date: 'by date',
        },
        filter: { text: 'filter', all: 'all' },
        order: { text: 'order', grow: 'growing', fall: 'falling' },
      },
      treeview: 'tree view',
      slider: 'cards per page',
      recover: 'recover cards',
    },
    card: {
      suggestion: 'See full image',
    },
    tree: {
      root: 'root',
      leaf: {
        date: 'date',
        size: 'size',
      },
      buttonToTop: {
        root: 'back to top',
        element: 'back to',
      },
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
  },
};
