import firebase from '../config'
const {database} = firebase;
const w = window;

const addUserRecord = (user) => {
  database().ref(`users/${user.uid}`).set({
     id: user.uid,
     name: user.displayName,
     phone_number: user.phoneNumber,
     avatar: user.photoURL,
     groups: [],
     timestamp: new Date().getTime(),
  })
}

export const SaveUserToLocal = (user) => {
  localStorage.chat_user = JSON.stringify(user)
}

export const removeUserFromLocal = () => {
  localStorage.clear();
}

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


export const SignUp = code => w.confirmationResult.confirm(code).then(result =>{ 
  addUserRecord(result.user);
  SaveUserToLocal(result.user);

  return ({
    status: 'success',
    message: 'user signed up successfully',
    data: result.user
  })
}).catch(error => ({
  status: 'fail',
  message: error.message
}));

export const LogIn = ({
  phone,
  password
}) => firebase.auth().signInWithEmailAndPassword(`${phone}@chatapp.com`, password)
.then(result => {
  SaveUserToLocal(result.user);
  return ({
    status: 'success',
    message: 'user signed in successfully',
    data: result.user
  })
}).catch(error =>({
  status: 'fail',
  message: error.message
}));

export const currentUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        resolve(user)
      }
      resolve(null);
    })
  })
}

export  const getUser = () => {
  if(localStorage && localStorage.chat_user) {
    return JSON.parse(localStorage.chat_user)
  }
  return null;
}

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

export const SignOut = () => {
    removeUserFromLocal();
   firebase.auth().signOut()
};
