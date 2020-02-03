import firebase from '../config'

const user = firebase.auth().currentUser;

export const UpdateProfile = ({
  displayName,
  photoURL,
}) => user.updateProfile({
  displayName,
  photoURL
}).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});