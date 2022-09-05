#outputJson=$(for app in $(find apps/* -type d -maxdepth 0 -exec basename {} \;); do
#  echo "$app"
#done | jq -R -s 'split("\n") -[""]' | jq -c '{appName: .}')
#
#echo $outputJson;

#test=apps/app2/src
#app=$(echo "$test" | sed -e 's/apps\///g' | sed -e 's/\/.*//g')
#echo $app

apps=("apps/app1/" "apps/app2/src" "apps/app2/test" "apps/app1")
for path in ${apps[@]}; do
  app=$(echo "$path" | sed -e 's/apps\///g' | sed -e 's/\/.*//g')
  echo "$app"
done | jq -R -s 'split("\n") -[""]' | jq -c '{appName: [.|unique]}'
