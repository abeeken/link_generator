# link_generator
Node.js self destructing link generator.

Download, do the "npm install" fandango and run with "node app.js" or "node run dev".

## What's it doing?

Use it to make a link. It stores the data for the link, JSON formatted, in a flat file with a filename made up of the data plus the current datetime, hashed.

When you access the /link page with a valid linkid (the hashed value) it tries to retrieve the file and then checks the date - if it's expired it deletes it.

You can use this to build some interesting apps with self destructing links. Includes some pug templates to get you started.

Enjoy!

### Create Link

/makelink

Displays a form which users can enter some information into

/addrecord

Writes a file containing the data in the form, as well as the current datetime. Filename is derived from all data hashed alongside the datetime to ensure randomness.

### Read Link

/link?linkid=

Uses the linkID to check the file. Once in the file it checks to see if the file is out of date (based on a hardcoded value of 24hrs). If the file is out of date, it deletes the file. If not it retrieves the data.