var mysql = require('mysql');

function rules(bot,ctx){
  bot.telegram.sendMessage(ctx.chat.id,"📕 Important Rules 📕\n\n\n Here All The rules will be posted")
}

function start(bot,ctx) {
  username = ctx.message.from.username

  ctx.reply('Welcome to the Refs4.me telegram bot.\n\nHere you can submit your referral links and earn profit.\n\nOnce approved, your links will be advertised in our telegram channel.\n\nTo submit a link - click on the submit link button, then enter your referral code.\n\nYour link will be checked against our database and you will be notified if your link has been marked as a scam.')
  //buttons for main menu below
  
  bot.telegram.sendMessage(ctx.chat.id ,"📕 Main Menu 📕",{
      reply_markup: {
          keyboard: [
              [
                  {text: "🔗 Submit Link "},//submit link
                  {text: "📜 List Sponsors"},// list sponsors 
                                  
                ],
              [
                {text:"⏰ Stats"},//stats
                {text:"📕 Rules"},//stats
                {text:"🔗 Check Link"}//check a link


              ],
              
              [
                {text:"/start"},//start button to restart the bot
              ]
          ],
          resize_keyboard: true,
          one_time_keyboard: false
      }
  })

}

function check(bot,ctx){
  username = ctx.message.from.username
  let input  = ctx.message.text
  let inputa = input.split(" ")
  inputa.shift()
  links = inputa.join(" ")
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    
    tests = pattern.test(str);
    console.log(tests)
    if (tests === false){
      bot.telegram.sendMessage(ctx.chat.id,"Invalid format - To submit a link use: /check")
  
    }
    else{
      checks()
    }
  }
  validURL(links)
  

function checks() {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "telebot"
  });
  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "toonswal_1",
  //   password: "rger8ycure",
  //   database: "toonswal_3"
  // });
    con.connect(function(err) {
      con.query("SELECT * FROM `links` WHERE `link`='"+links+"'", function(err, row) {//function to check if the link user submits is in databse or not
  
        if(err) {
            // logger.error('Error in DB');
            // logger.debug(err);
            console.log("error in db")
            return;
        } else {
         
             
                // do something with your row variable
                var queryString = "SELECT * FROM links WHERE link ='"+links+"'";
                con.query(queryString, function(err, rows) {
                  // var sqldata = results.substring(1, 4);
  
                  if (err) throw err;
                  //  res.send(rows)
                  //  console.log(rows)//this 
                  //  t = rows + 1
                  //  console.log(t)
                  //  times = t+1;
                  
                  //  t = rows
                  //  console.log(t)
                  timess = rows[0].times
                  statuss = rows[0].status
                  payingg = rows[0].pending
                  submitedd = rows[0].user
                  site = rows[0].link
                   bot.telegram.sendMessage(ctx.chat.id,'This Link Already Exists in our database you can check if it pays or not in our telegram channel.\n\nIt has been submitted ' + timess + " times\n\n" + "Status: "+ statuss +"\n" +"Paying:" + payingg + "\n" +"Site Link: " + site + "\n" + "Submitted By: @"+ submitedd+"\n" + 'Times Submitted: ' + timess +"\n" )
                   
                   
  
                  //  console.log(rows["times"])
  
                   let data = [false, 1];
                });
                   // execute the UPDATE statement
                  //  con.query(sql, data, (error, results, fields) => {
                  //    if (error){
                  //      return console.error(error.message);
                  //    }
                  //    console.log('Rows affected:', results.affectedRows);
                   }
  })
    })
  
}



}

function getStats(bot,ctx){
  console.log(bot)
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "telebot"
  });
  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "toonswal_1",
  //   password: "rger8ycure",
  //   database: "toonswal_3"
  // });
  con.connect(function(err) {
con.query("SELECT sl FROM links ORDER BY sl DESC LIMIT 1",function(err, rows) {
  bot.telegram.sendMessage(ctx.chat.id,"Total Stats: \nTotal Links:")
  })
  })
}

function submit(bot,ctx) {
  let input  = ctx.message.text
  let inputa = input.split(" ")
  inputa.shift()
  links = inputa.join(" ") 
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    
    tests = pattern.test(str);
    console.log(tests)
    if (tests === false){
      bot.telegram.sendMessage(ctx.chat.id,"Invalid format - To submit a link use: /submit url")
 
  
    }
    else{
      submit()
    }
  }
  validURL(links)
  
  // false
  // stringIsAValidUrl('abc://www.example.com:777/a/b?c=d&e=f#g'); // true
function submit() {
  username = ctx.message.from.username
  
  // ctx.reply("In MainTainance")
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "telebot"
  });
  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "toonswal_1",
  //   password: "rger8ycure",
  //   database: "toonswal_3"
  // });
  
  con.connect(function(err) {
    con.query("SELECT * FROM `links` WHERE `link`='"+links+"'", function(err, row) {//function to check if the link user submits is in databse or not

      if(err) {
          logger.error('Error in DB');
          logger.debug(err);
          return;
      } else {
          if (row && row.length ) {
           
              // do something with your row variable
              var queryString = "SELECT times FROM links WHERE link ='"+links+"'";
              con.query(queryString, function(err, rows) {
                // var sqldata = results.substring(1, 4);

                if (err) throw err;
                //  res.send(rows)
                //  console.log(rows)//this 
                //  t = rows + 1
                //  console.log(t)
                //  times = t+1;
                
                //  t = rows
                //  console.log(t)
                timess = rows[0].times
                 let sql ="UPDATE links SET times = times + 1 WHERE link ='"+links+"'";
                 bot.telegram.sendMessage(ctx.chat.id,'This Link Already Exists in our database you can check if it pays or not in our telegram channel.\n\n\nIt has been submitted ' + timess + " times")


                //  console.log(rows["times"])

                 let data = [false, 1];
                 
                 // execute the UPDATE statement
                 con.query(sql, data, (error, results, fields) => {
                   if (error){
                     return console.error(error.message);
                   }
                   console.log('Rows affected:', results.affectedRows);
                 });
            });



          } else {
            var sql = "INSERT INTO links (link, status, user, paying,times) VALUES ('"+links+"', 'Pending', '"+username+"', 'Not Tested', '1')";
            con.query(sql, function (err, result) {
              if (err) throw err;
              bot.telegram.sendMessage(ctx.chat.id,"Your Link Is Submitted SuccessFully And Is Being Checked by our team, pls wait 24 hours")
            });
          }
      }
  });
  });
  
}
}

module.exports = { rules , check, getStats, start, submit};