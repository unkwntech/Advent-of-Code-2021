#!/bin/bash

# Notes;
#   
#
# Requirements;
#     Bash >= 4

#Read in the entire file
mapfile -t data < ../../TheData.txt


#Read each element of the array
for (( i=0; i<${#data[@]}; i++ )); do
    
done

echo $((vPos*hPos))