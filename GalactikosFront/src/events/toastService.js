import Toast from 'react-native-toast-message';

const toastService = {
  toastGood: function (title = "Good", message = null) {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
    });
  },
  toastWarning: function (title = 'Warning', message = null) {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
    });
  },
  toastError: function (title = 'Error', message = null) {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  },
};

export default toastService;
