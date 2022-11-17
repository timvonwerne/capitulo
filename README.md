# capitulo

Do you love audio books? So do I! `capitulo`helps you bring order to your collection. It downloads the metadata you need (cover, description and chapter markers) so you can create a perfect .m4b file e.g. with the awesome `m4b-tool`.

## Possible workflow

1. Get the ASIN of the audiobook from Audible. It's included in the URL of the audiobook's detail page. (so if the URL is `https://www.audible.com/pd/Steve-Jobs-Audiobook/B005V0QI82`, the ASIN would be `B005V0QI82`)
2. Navigate to the directory containing your mp3 files.
3. Call capitulo:
   `capitulo <ASIN> -r <REGION> -p ./`. For the example above, the command would be `capitulo B005V0QI82 -r us -p ./`

Capitulo will then download a cover.jpg, a description.txt and a chapters.txt. After that you can use [m4b-tool](https://github.com/sandreas/m4b-tool) to merge the mp3 files. m4b-tool will automatically pick up the files previously created by capitulo and use them for your new audiobook file.
