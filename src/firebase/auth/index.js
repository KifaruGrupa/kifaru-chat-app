import firebase from '../config'

const w = window;

//call on componentDidMount
export const initializeCaptcha = captchaContainer =>{
  w.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(captchaContainer);
  w.recaptchaVerifier.render().then(function(widgetId) {
    w.recaptchaWidgetId = widgetId;
  });
}

//phone argument should come with appropraite prefix for country
export const VerifyPhoneNumber = phone => new Promise(
  (resolve, reject) => {
    firebase.auth().signInWithPhoneNumber(phone, w.recaptchaVerifier)
    .then(function (confirmationResult) {
      w.confirmationResult = confirmationResult;
      resolve({
        status: 200,
        message: 'OTP sent to Phone Number'
      })
    }).catch(function (error) {
      w.grecaptcha.reset(w.recaptchaWidgetId);
      reject({
        status: 400,
        message: error.message
      })
    });
  }
)


export const SignUp = code => new Promise((resolve, reject)=>{
  w.confirmationResult.confirm(code).then(function (result) {
    var user = result.user;
    console.log(user)
    resolve(user)
  }).catch(function (error) {
    console.log(error)
    reject(error)
  });
});
