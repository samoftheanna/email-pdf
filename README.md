# email-pdf

## to do
- get generated pdf to appear on devices
  - we may need to sideload an ipa onto the specific devices. i have asked jim for the uuids so we can add them to our enterprise developer account
  - ideally there would be a way to open/email the pdf from within Ionic View, but since it only supports [a limited number of plugins](http://docs.ionic.io/v1.0/docs/view-usage), we may not have that luxury.
- get generated pdf to email safely
- reverse order of names for cjk languages
- fix fonts in pdf so russian, chinese, japanese, korean, and thai characters appear
- pass list of children table successfully to the pdfMake content array
- skip ancestors of people without names
- get default text "false" to not show if living/deceased/unknown not selected (can't show english on language versions)
- get images taken using camera api on device to persist and add to pdf
- refactor code to not be messy :)
