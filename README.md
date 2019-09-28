# SinusBot extension scripts


## Telegram Broadcast

A SinusBot plugin that will let a Telegram bot send a message when a user joins the TeamSpeak server.  
**Requires a Telegram bot created by Telegram BotFather.**

### Settings

| Property | Description                                           | Examples                                  |
| -------- | ----------------------------------------------------- | ----------------------------------------- |
| messages | The message that should be displayed. (%n = nickname) | % has joined the teamspeak.               |
| token    | Token of Telegram bot                                 | 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11 |
| chatID   | Chat ID of Telegram bot                               | -12345678                                 |


## Welcome TTS

A SinusBot plugin that greets a user when joining the TeamSpeak server.

It can send special greeting messages for individual users by assigning messages with a users *UniqueID*.
Using the value `default` sends the associated message to every user who isn't explicitly defined in the settings.
Users without a setting will only read or hear their nickname.

### Settings

| Property | Description                          | Examples                                              |
| -------- | ------------------------------------ | ----------------------------------------------------- |
| messages | Greeting Messages (%n = nickname)    | `default`  &#124; `Users+Un1queID=`<br/>`Welcome %n!` |
| type     | Message type                         | `Chat` &#124; `Poke` &#124; `TTS`                     |
| locale   | TTS Locale                           | `en` &#124; `de-DE` &#124; `…`                        |
| trigger  | Trigger always (or only direct join) | `_` &#124; `✓`                                        |
