#outputJson=$(for app in $(find apps/* -type d -maxdepth 0 -exec basename {} \;); do
#  echo "$app"
#done | jq -R -s 'split("\n") -[""]' | jq -c '{appName: .}')
#
#echo $outputJson;

test=apps/app2/src
app=$(echo "$test" | sed -e 's/apps\///g' | sed -e 's/\/.*//g')
echo $app
