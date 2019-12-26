const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post("/items", (req, res, next) => {
    const body = req.body;
    if (req.authorization === 'Signature d9c5eafbc0ee8866dbf7d95dd84f87b09cf862ab') {
      res.statusMessage = 'Bad request';
      res.status(400);
      res.json({
        "error":{
            "code":"INVALID_SIGNATURE",
            "message":"Invalid signature"
        }
      });
    }
    else if (body.notification_type == "user_validation") {
        if (body.user.id === "12") {
          res.status(200);
          res.send();
        }
        else { 
          res.statusMessage = 'Bad request';
          res.status(400);
          res.json({
            "error":{
                "code":"INVALID_USER",
                "message":"INVALID_USER"
            }
          });
      }
    }

    else if (body.notification_type == "payment") {
      if (body.user.id === "12") {
        res.status(200);
        res.send();
      }
      else { 
        res.statusMessage = 'Bad request';
        res.status(400);
        res.json({
          "error":{
              "code":"INVALID_USER",
              "message":"INVALID_USER"
          }
        });
      }
    }
    else {
      res.statusMessage = 'NOT EXISTS';
      res.status(404);
      res.send();
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))