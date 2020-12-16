//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
    var message = '';
    var sess = req.session; 
 
    if(req.method == "POST"){
       var post = req.body;
       var mail = post.email;
       var pass = post.password;
      
       var sql="SELECT matricola, universita, nome, cognome, email FROM studente WHERE email='"+mail+"' and password = '"+pass+"'";        
       db.query(sql, function(err, results){      
          if(results.length){
             req.session.userId = results[0];
             //req.session.userId = results[0].id;
             //req.session.user = results[1];
             console.log("ciao "+req.session.userId.nome);
             res.redirect('/home/dashboard');
          }
          else{
             message = 'Credenziali errate';
             res.render('index.ejs',{message: message});
          }
                  
       });
    } else {
       res.render('index.ejs',{message: message});
    }
            
 };
 