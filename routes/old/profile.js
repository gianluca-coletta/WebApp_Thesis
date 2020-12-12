//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res){

    var user =  req.session,
    email = req.session.userId.email;
    if(email == null){
       res.redirect("/login");
       return;
    }
    console.log('email '+email);
    var sql="SELECT * FROM `studente` WHERE `email`='"+email+"'";          
    db.query(sql, function(err, result){  
       res.render('profile.ejs',{data:result});
    });
 };