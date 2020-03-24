const jwt = require('jsonwebtoken');
const users = require('../../user.json');

function veryfiToken(req,res,next){

  //FORMAT OF TOKEN
  // authorization: bearer <access_token>
  const bearerHeader = req.headers['authorization'];
  
  

  if (typeof bearerHeader !== 'undefined') {
    // xoá space trong mã token
    const token = bearerHeader.split(' ')[1];


   
    //
    jwt.verify(token, 'shhhhh', function(err, user) {
      if(err) return res.sentStatus(403);
      req.user = user;
      next();
    });
    
  } else {
    res.status(403).send('ban can dang nhap de tiep tuc');

    console.log('ban can dang nhap');
    
  }
}

module.exports = veryfiToken;