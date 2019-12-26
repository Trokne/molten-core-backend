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
    if (req.authorization === 'Signature a30eaceddaba096ad5a625940109d50a78773cb6') {
      res.statusMessage = 'INVALID_SIGNATURE';
      res.status(426);
      res.send();
    }
    else if (body.notification_type == "user_validation") {
        if (body.user.id === "12") {
          res.status(200);
          res.send();
        }
        else { 
          res.statusMessage = 'INVALID_USER';
          res.status(425);
          res.send();
      }
    }

    else if (body.notification_type == "payment") {
      if (body.user.id === "12") {
        res.status(200);
        res.send();
      }
      else { 
        res.statusMessage = 'INVALID_USER';
        res.status(425);
        res.send('INVALID_USER');
      }
    }
    else {
      res.statusMessage = 'NOT EXISTS';
      res.status(404);
      res.send();
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))