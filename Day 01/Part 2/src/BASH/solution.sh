#!/bin/bash

# Notes;
#   I struggled to find a solution that was suscint and didn't require
#        reading the entire file into memory but was unable to find a solution
#   I am unhappy with supressing the error on line 21, but was unable to
#       to find an easy work around.
#
# Requirements;
#     Bash >= 4

#Read in the entire file
mapfile -t data < ../../TheData.txt

#Pre-load the first window from the first 3 entries in the array
lastWindow=$((${data[0]}+${data[1]}+${data[2]}));
currentWindow=0;
count=0;

#Read each element of the array
for (( i=0; i<${#data[@]}; i++ )); do
    currentWindow=$((${data[$i]}+${data[$i+1]}+${data[$i+2]})) 2>/dev/null;
    if [ $currentWindow -gt $lastWindow ]; then
        count=$((count+1));
    fi
    lastWindow=$currentWindow;
done

echo $count