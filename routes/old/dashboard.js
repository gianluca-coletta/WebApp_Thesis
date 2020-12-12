//-----------------------------------------------dashboard page functionality----------------------------------------------
           
module.exports.dashboard = function(req, res, next){
           
    var user =  req.session;
    var email = req.session.userId.email;
    console.log(req.session.userId.email);
    if(email == null){
       res.redirect("/login");
       return;
    }
    var sql="SELECT * FROM studente WHERE `email`='"+email+"'";
 
    db.query(sql, function(err, results){
        
       res.render('dashboard.ejs',{user:user});    
    });       
 };