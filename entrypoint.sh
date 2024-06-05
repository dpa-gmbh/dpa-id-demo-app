#!/bin/bash

BASEPATH=/config/dpa-id-auth0-spa-demo/
JSON=$(aws ssm get-parameters-by-path --path $BASEPATH)
CONFIG='{"features": {}}'
PARAMETER_NAMES=$(echo $JSON | jq '.Parameters | .[] | .Name')
IFS=$'\n'
PARAMETER_VALUES=( $(echo $JSON | jq '.Parameters | .[] | .Value') )
count=0
for nextParamName in $PARAMETER_NAMES
do
  nextParam="${nextParamName##*/}"
  nextParam=\"$nextParam
  nextValue=${PARAMETER_VALUES[$count]}
  # Replace \\n with \n to cater for newlines
  nextValue=${nextValue//\\\\n/\\n}
  # Use boolean values if the string value is either true or false
  if [ $nextValue = "\"true\"" ]; then
    echo Boolean nextvalue found: true
    nextValue=true
  fi
  if [ $nextValue = "\"false\"" ]; then
    echo Boolean nextvalue found: false
    nextValue=false
  fi

  echo $count $nextParam $nextValue
  count=$((count+1))
  if [[ $nextParam =~ "features." ]];
  then
    nextParam="${nextParam##*features.}"
    nextParam=\"$nextParam
    echo NextParam: $nextParam
    subst=$(echo ".features += { $nextParam: $nextValue }")
  else
    subst=$(echo ". += { $nextParam: $nextValue }")
  fi
  CONFIG=$(echo $CONFIG | jq ${subst})
done
echo $CONFIG | jq .
echo $CONFIG > /usr/share/nginx/stageconfigs/config.json
exec nginx -g 'daemon off;'
