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
    if (body.notification_type == "user_validation") {
        if (body.user.id === 12) {
          res.status(200);
          res.json('');
        }
        else { 
          res.statusMessage = 'INVALID USER';
          res.status(404);
          res.json('');
      }
    }

    if (body.notification_type == "payment") {
      if (body.user.id === 12) {
        res.status(200);
        res.json('');
      }
      else { 
        res.status(404);
        res.json('');
      }
    }
    res.status(404);
    res.json('');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))