// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    // Your web app's Firebase configuration
    
    apiKey: "AIzaSyDDMrOMp3AP3-of-oBSKfQ7UEqPdrC3Htc",
    authDomain: "xcursao.firebaseapp.com",
    databaseURL: "https://xcursao.firebaseio.com",
    projectId: "xcursao",
    storageBucket: "xcursao.appspot.com",
    messagingSenderId: "407006208662",
    appId: "1:407006208662:web:be8501d2b5b9474fca18b7",
    measurementId: "G-9PT81C1N0P"

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
