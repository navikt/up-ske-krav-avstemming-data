#!/bin/bash

default="sokos-react-template"

echo '**** Setup for sokos-react-template ****'
echo
read -p 'Project name (up-xxxx): ' projectName
echo

grep -rl $default --exclude=setupTemplate.sh | xargs -I@ sed -i '' "s|$default|up-$projectName|g" @
