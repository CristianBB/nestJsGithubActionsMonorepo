outputJson=$(for app in $(find apps/* -type d -maxdepth 0 -exec basename {} \;); do
  echo "$app"
done | jq -R -s 'split("\n") -[""]' | jq -c '{appName: .}')

echo $outputJson;
