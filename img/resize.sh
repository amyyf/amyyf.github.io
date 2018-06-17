#!/usr/bin/env bash

# duplicates images at specific sizes for my website
# to use in Bash: '. resize.sh <original file name> <name to save new image under, no extension>'

echo start

cp "$1" $2-600px.png
sips --resampleHeight 480 $2-600px.png
sips -c 480 600 $2-600px.png

cp $2-600px.png $2-300px.png
sips --resampleWidth 300 $2-300px.png

echo end
