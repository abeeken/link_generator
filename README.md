# link_generator
Node.js self destructing link generator

## Create Link

/makelink

Displays a form which users can enter some information into

/addrecord

Writes a file containing the data in the form, as well as the current datetime. Filename is derived from all data hashed alongside the datetime to ensure randomness.

## Read Link

/link?linkid=

Uses the linkID to check the file. Once in the file it checks to see if the file is out of date (based on a hardcoded value of 24hrs). If the file is out of date, it deletes the file. If not it retrieves the data.