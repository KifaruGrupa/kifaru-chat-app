import firebase from '../config'

const w = window;

export const UserExist = phone => firebase.auth().fetchSignInMethodsForEmail(`${phone}@chatapp.com`)
.then(resp=>{
  if(resp.length < 1) throw Error('user does not exist')
  return ({
    status: 'success',
    message: 'user exist'
  })
})
.catch(error=>({
  status: 'fail',
  message: 'user does not exist'
}))

//call on componentDidMount
export const InitializeCaptcha = (captchaContainer) => new Promise((resolve, reject)=>{
  w.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(captchaContainer, {
  'size': 'normal',
  'callback': function(response) {
    console.log(response)
    resolve(response)
  },
  'expired-callback': function() {
    reject()
  }});
  w.recaptchaVerifier.render().then(function(widgetId) {
    w.recaptchaWidgetId = widgetId;
  })
})

//phone argument should come with appropraite prefix for country
export const VerifyPhoneNumber = phone => firebase.auth().signInWithPhoneNumber(phone, w.recaptchaVerifier)
.then(confirmationResult => {
  w.confirmationResult = confirmationResult;
  return ({
    status: 'success',
    message: 'OTP sent to Phone Number'
  })
}).catch(error => {
  w.grecaptcha.reset(w.recaptchaWidgetId);
  return {
    status: 'fail',
    message: error.message
  }
});


export const SignUp = code => w.confirmationResult.confirm(code).then(result => ({
  status: 'success',
  message: 'user signed up successfully',
  data: result.user
})).catch(error => ({
  status: 'fail',
  message: error.message
}));

export const LogIn = ({
  phone,
  password
}) => firebase.auth().signInWithEmailAndPassword(`${phone}@chatapp.com`, password)
.then(result => ({
  status: 'success',
  message: 'user signed in successfully',
  data: result.user
})).catch(error =>({
  status: 'fail',
  message: error.message
}));

export const SetPassword = async (newPassword) => {
  const user = firebase.auth().currentUser;
  try{
    if(!user.email) await user.updateEmail(`${user.phoneNumber}@chatapp.com`);
    await user.updatePassword(newPassword);
    return {
      status: 'success',
      message: 'Password updated successfully'
    }
  } catch (e){
    return {
      status: 'fail',
      message: e.message
    }
  }
}

export const SignOut = () => firebase.auth().signOut();
