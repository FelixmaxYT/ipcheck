# ipcheck
Checks your public IP and updates you if it changes.

Made for a colleague.

# Setup 

```
{
    "host": "smtp.gmail.com",
    "port": 465,
    "auth": {
        "user": "<your_email@gmail.com>",  
        "pass": "<your_email_password>"  <- For Gmail go to https://myaccount.google.com/apppasswords and create a Password to enter here
    },

    "recipient": "<recipient@email.com>",
    "interval": 1800  <- Interval to check external API for IP changes in seconds. Reffer to ipify for guidance on rate limits that may apply
}
```

rename the example file to credentials.json and run ``node index.js``.

If you want this to run on a server, i suggest using PM2 https://pm2.keymetrics.io/
