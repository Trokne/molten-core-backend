const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  // .get("/items", (req, res, next) => {
  //   res.status(204);
  //   res.json('');
  // })
  .post("/items", (req, res, next) => {
    if (req.notification_type == "user_validation") {
        if (req.user.id === 1 || req.user.id === 2 || req.user.id === 12) {
          res.status(200);
          res.json('');
          return;
        }
        else { 
          res.status(404);
          res.json('INVALID USER');
          return;
      }
    }

    if (req.notification_type == "payment") {
      if (req.user.id === 1 || req.user.id === 2 || req.user.id === 12) {
        res.status(200);
        res.json('');
        return;
      }
      else { 
        res.status(404);
        res.json('INVALID USER');
        return;
      }
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))