#!/bin/bash

# Notes;
#   This method only reads one line of the input data at a time
#       and might be more memory efficient because of it.
#
# Requirements;
#     Bash

#Pre-load the first line of the file
lastNum=`head -n 1 ../../TheData.txt`
count=0

#Read each line of the file in 1 line at a time
while read data; do
    if [ $data -gt $lastNum ]; then
        count=$((count+1));
    fi
    lastNum=$data;
done < ../../TheData.txt

echo $count