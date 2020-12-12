//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
    message = '';
    if(req.method == "POST"){
       var post  = req.body;
       var mail= post.email;
       var uni= post.universita;
       var matr= post.matricola;
       var cdl= post.corsodilaurea
       var pass= post.password;
       var fname= post.nome;
       var lname= post.cognome;
       var mob= post.numerotelefonico;
       
       
       
       
     var sql = "INSERT INTO studente (matricola, universita, nome, cognome, password, email, numerotelefonico, corsodilaurea) VALUES (?,?,?,?,?,?,?,?)";
     var values =[matr, uni, fname, lname, pass, mail, mob, cdl];
 
         if (matr == '' || uni == ''|| fname == '' || lname =='' || pass == '' || mail == '' || mob == '' || cdl == ''){
             message = 'Controlla che tutti i campi siano riempiti correttamente! REGISTRAZIONE NON COMPLETATA!';
             res.render('signup.ejs',{message: message});			
         }
         
         else {
             var query = db.query(sql, values, function (err, result) {
                 console.log(query);
                 message = "Perfetto! Registrazione avvenuta con successo!";
                 console.log("hai appena aggiunto un nuovo studente \n Comunicazione con il database riuscita");
         
                 res.render('signup.ejs',{message: message});
             });
         }
 
     } else {
       res.render('signup');
     }
 };