function kiemTra(req,res,next) {
    const data = req.body.title;
    if(!data){
      res.status(401).send("khong dc de trong");
        console.log('Khong dc de trong');
    }
    else{
        next();
    }
}


module.exports = kiemTra;