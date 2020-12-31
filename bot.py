import logging

from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackQueryHandler
from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackQueryHandler, CallbackContext
import os

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)
PORT = int(os.environ.get('PORT', '8443'))

# Define a few command handlers. These usually take the two arguments update and
# context. Error handlers also receive the raised TelegramError object in error.
def menu(update,context):
        menu_main = [[InlineKeyboardButton('Submit Link', callback_data='m1',)],
                [InlineKeyboardButton(
                    'Check website genuineness', callback_data='m2')],
                [InlineKeyboardButton('help', callback_data='m5')],
                [InlineKeyboardButton(
                    'List of Genuine gambling sites', callback_data='m3')],
                [InlineKeyboardButton('contact us', callback_data='m4')]]

        reply_markup = InlineKeyboardMarkup(menu_main)
        update.message.reply_text('Choose the option:', reply_markup=reply_markup)
def menuopen(update, context):
    """Send a message when the command /start is issued."""
    
    menu(update,context)
def start(update,context):
    update.message.reply_text(
        '😄Hey there mate welcome to earneybitcoin_bot😄\n here you can get real sites list \nto earn money and submit your referal link and see if the site you use is real or not\n\nbelwo are the bot ccommands: /submit \n/menu (to open menu) \n /help (to get Help Menu)')
    menuopen(update,context)    


def button(update, context) -> None:
    query = update.callback_query

    # CallbackQueries need to be answered, even if no notification to the user is needed
    # Some clients may have trouble otherwise. See https://core.telegram.org/bots/api#callbackquery
    query.answer()
    if query.data == "m3":
        query.edit_message_text(f"You can check below the list of genuine investment sites\n\n\n\nopen this link : https://telegra.ph/Bits4me-12-31")
        query = None
    menuopen(update,context)  
def help(update, context):
    """Send a message when the command /help is issued."""
    update.message.reply_text(
        'Hey! do you want any help then\ncontact below\n @earneyb\n @deadly_killer')


def echo(update, context):
    """Echo the user message."""
    update.message.reply_text(update.message.text)
    update.message.reply_text(update.message.chat_id)



def error(update, context):
    """Log Errors caused by Updates."""
    logger.warning('Update "%s" caused error "%s"', update, context.error)


def main():
    """Start the bot."""
    # Create the Updater and pass it your bot's token.
    # Make sure to set use_context=True to use the new context based callbacks
    # Post version 12 this will no longer be necessary
    updater=Updater(
        "1487976162:AAFLVPzgDCSIknZTHTvWKhqde8fz2H5-xnI", use_context = True)

    # Get the dispatcher to register handlers
    dp=updater.dispatcher

    # on different commands - answer in Telegram
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("help", help))
    dp.add_handler(CommandHandler("menu", menuopen))

    dp.add_handler(CallbackQueryHandler(button))

    # on noncommand i.e message - echo the message on Telegram
    dp.add_handler(MessageHandler(Filters.text, echo))

    # log all errors
    dp.add_error_handler(error)
    updater.start_webhook(listen="0.0.0.0",
                          port=PORT,
                          url_path=1487976162:AAFLVPzgDCSIknZTHTvWKhqde8fz2H5-xnI)
    # updater.bot.set_webhook(url=settings.WEBHOOK_URL)
    updater.bot.set_webhook("earney" + 1487976162:AAFLVPzgDCSIknZTHTvWKhqde8fz2H5-xnI)


    # Start the Bot
    updater.start_polling()

    # Run the bot until you press Ctrl-C or the process receives SIGINT,
    # SIGTERM or SIGABRT. This should be used most of the time, since
    # start_polling() is non-blocking and will stop the bot gracefully.
    updater.idle()


if __name__ == '__main__':
    main()
