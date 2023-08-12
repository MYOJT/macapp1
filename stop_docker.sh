# 全削除
docker images --format "{{.ID}}" | xargs -I {} docker rmi -f {}
docker ps --format "{{.ID}}" | xargs -I {} docker rmi -f {}
docker volume rm $(docker volume ls -q)

# apコンテナのみ削除
# docker images macapp1-app --format "{{.ID}}"
# docker ps --filter "name=macapp1-app-1" --format "{{.ID}}"
