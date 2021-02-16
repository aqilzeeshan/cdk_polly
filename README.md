https://github.com/cdk-patterns/serverless/tree/main/polly

Changing the voice
You can pick from 3 voices "Matthew" (the default), "Joanna" or "Lupe". This is using the newsreader style of voice which AWS recently launched so it currently only supports these 3.

To change voices just add a query param onto your url like:

https://{api-url}/?voice=Lupe
https://{api-url}/?voice=Joanna
https://{api-url}/?voice=Matthew
Changing the language spoken
This Lambda Function is integrated with Amazon Translate so you can have Polly speak a variety of languages

To have Lupe speak Spanish just add the translateTo query param

https://{api-url}/?voice=Lupe&translateTo=es
If the text you are translating is in a language other than english you can use the translateFrom parameter

To understand what languages are possible please refer to the documentation

Changing the text
If you use a tool like Postman to send text in the body of a POST request to the url it will use Polly to synthesize your text
