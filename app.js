const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AbqZ1Scw5q0WZMzKTEt5MLMprdvjYoOSdXqjaMCpEe7hhdK63ytJxgMGuElZXzSUvlxOFsnOGlMPDovd',
    'client_secret': 'EP5qKFbqEL0W7rMxe6Sbs1_SRfsi99jylL7rCsw1I6YXmsZp_RVtEoeWrrrma1-JRjUuJxAa7b8KwpV5'
  });

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.post('/pay', (req, res) => {

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Parking Spot for 3 hours",
                    "sku": "001",
                    "price": "20.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "20.00"
            },
            "description": "Parking spot for a car"
        }]
    };
    //////////////////////////////////////////////////
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            
            for(let i=0; i< payment.links.length; i++){
                if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href);
                }
   
            } 
            
            /*
            console.log("Create Payment Response");
            console.log(payment);
            res.send('test'); */
        }
    });

});

/////////////////////////////////////////////////////////

app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
           // console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.send('success');
        }
    });
})

app.get('/cancel', () => res.send('Cancelled'));

app.listen(3000, () => console.log('Server Started'));
