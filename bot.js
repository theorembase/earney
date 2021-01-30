
const Telegraf = require('telegraf');
// import TelegrafQuestion from "telegraf-question";
const bot = new Telegraf('1661511897:AAHKdMwg635UNLizylLXrA78ZDFlcP8JEuE');


var mysql = require('mysql');
const { hostname } = require('os');
const lib = require("./functions");
const { link } = require('fs');




// start method
bot.start((ctx) => {
 lib.start(bot,ctx)
})
// sponsors
bot.hears("📜 List Sponsors", (ctx)=>{
  bot.telegram.sendMessage(ctx.chat.id,"this will display a list of \n sponsors")
})
// submit a link
bot.hears("🔗 Submit Link", (ctx)=>{
  ctx.reply("\nYou Can Submit a site link to check if it pays or not.\n \n \n\n To submit a link type /submit <your link here with your ref link> ,\n  For example /link http://earnbet.io/?bonus=ez01065951466982376 \n \n Then it will be tested by our team and if the site pays we will broadcast it in our group with your referal link and if the site is a scam we will send all the bot users a notification that new link submitted and it is a scam")
})
//stats
bot.hears("⏰ Stats", (ctx)=>{
  lib.getStats(bot,ctx)
})
//rules
bot.hears("📕 Rules", (ctx)=>{
  // bot.telegram.sendMessage(ctx.chat.id,"📕 Rules 📕")
  lib.rules(bot,ctx)
})
//check link
bot.hears("🔗 Check Link", (ctx)=>{

ctx.reply("\nYou Can check a site link to check if it pays or not.\n \n \n\n To check a link type /check <your link here> ,\n  For example /check http://earnbet.io/?bonus=ez01065951466982376 \n \n Then you check all stats of the specific site")
// lib.check(bot,ctx) 
})
bot.command("check", (ctx)=>{
lib.check(bot,ctx)
})


bot.command("send", (ctx)=>{
  bot.telegram.sendMessage("-1001265536125","hi @earneyb come online i have to show something to you")
})
//commands
bot.command("submit", (ctx)=>{
lib.submit(bot,ctx)

})

// function intervalFunc() {
//   var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "telebot"
//   });
//   con.query("SELECT link FROM `links` ORDER BY RAND()", function(err, row) {//function to check if the link user submits is in databse or not
//     if (err) throw err;

//     links = row[0].link
//     bot.telegram.sendMessage("-1001265536125",'Top Affiliate Program: \n'+ links)
//   })

// }

// setInterval(intervalFunc, 300000);
bot.launch()