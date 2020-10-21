// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    // Your web app's Firebase configuration
    
    apiKey: "AIzaSyABfMCDxbhWX5V-piNtKWnDBTrPxSIWqdQ",
    authDomain: "xcursaoviagens.firebaseapp.com",
    databaseURL: "https://xcursaoviagens.firebaseio.com",
    projectId: "xcursaoviagens",
    storageBucket: "xcursaoviagens.appspot.com",
    messagingSenderId: "83194349138",
    appId: "1:83194349138:web:d209241e08d1599782818b",
    measurementId: "G-J87ESMTL7C"

    // Initialize Firebase
    /* firebase.initializeApp(firebaseConfig);
     firebase.analytics();*/

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
