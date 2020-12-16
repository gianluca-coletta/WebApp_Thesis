



/*---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
   console.log("Debug: " + userId);

   var sql="SELECT * FROM users WHERE `id`='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('edit_profile.ejs',{data:results});
   });
};
*/


  
