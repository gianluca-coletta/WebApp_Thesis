//---------------------------------prenotazione details after login----------------------------------
exports.prenotazione = function(req, res){

    console.log(req.session);
    var user =  req.session;
    var corsodilaurea;
    var email = req.session.userId.email;
 
    var sql="SELECT corsodilaurea FROM `studente` WHERE `email`='"+email+"'"; 
          db.query(sql, function(err, result){
          corsodilaurea=result[0].corsodilaurea;
          console.log(corsodilaurea);
       
       var sql1="SELECT Nome FROM `insegnamento` WHERE `corsodilaurea`='"+corsodilaurea+"'"; 
             db.query(sql1, function(err, result){
             console.log(result);
       
              res.render('prenotazione.ejs',{data:result});
       });
    });
 };
 