#!/bin/bash

# Notes;
#   
#
# Requirements;
#     Bash >= 4

#Read in the entire file
mapfile -t data < ./TheData.txt
vPos=0;
hPos=0;
#Pre-load the first window from the first 3 entries in the array

#Read each element of the array
for (( i=0; i<${#data[@]}; i++ )); do
    IFS=' ' read -ra line <<< ${data[$i]}
    case ${line[0]:0:1} in
        f)
            hPos=$((hPos+${line[1]}));
        ;;
        d)
            vPos=$((vPos+${line[1]}));
        ;;
        u)
            vPos=$((vPos-${line[1]}));
        ;;
    esac
done

echo $((vPos*hPos))