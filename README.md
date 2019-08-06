# PayPal-Implementation-with-Node.js

Combining PayPal REST SDK with the PayPal Restful API to take payments. 
Can be used for websites that use PayPal as a payment method. This was done as a part of a grad school final project (website for renting private parking spots)

Steps followed PayPal Implementation:

1) Register on developer.paypal.com and create 2 sandbox accounts and load money in these 2 accounts.
   Dashboard->Apps and Credentials-> scroll down to Rest API-> create app. Use your business account credentials for this.

2) Once the app is created, the app name is displayed under my apps. Select the created app and copy the client ID and secret    (of the associated business account account, which will be used in the code later).

3) Create a new directory. Open Visual studio code-> open the created folder and type the following commands in the integrated terminal.
   - Npm init
   - Description: paypal app
   - Entry point: app.js
Package.json is created.

4) Go to package.json
   Npm install --save paypal-rest-sdk express ejs  (in the integrated terminal)
Sdk gets installed.

5) Create a new .js file under folder -> name it app.js 
 code: https://github.com/rramesh1793/PayPal-Implementation-with-Node.js/blob/master/app.js

6) Create a new views folder under paypal app folder. 
   Under this create a new ejs file-> index.ejs
  code: https://github.com/rramesh1793/PayPal-Implementation-with-Node.js/blob/master/views/index.ejs
 
7) In terminal -> node app.js
   Server starts. Test it

8) Install nodemon for monitoring changes in the code.
   npm install -g nodemon
Once installed, type nodemon and test using localhost:3000 as the URL.

9) To stop the server, Ctrl+c.

