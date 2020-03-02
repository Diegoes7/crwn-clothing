import firebase from 'firebase/app'
import 'firebase/firestore'

const firestore = firebase.firestore()

firestore.collection('users').doc('n2xNL5hWngireU9JP48S')
.collection('cartItems').doc('n3pRPlfbFp7zCOMYQu7t')

firestore.doc('/user/n2xNL5hWngireU9JP48S/cartItems/n3pRPlfbFp7zCOMYQu7t')

firestore.collection('/user/n2xNL5hWngireU9JP48S/cartItems')