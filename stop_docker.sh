docker images --format "{{.ID}}" | xargs -I {} docker rmi -f {}
docker ps --format "{{.ID}}" | xargs -I {} docker rmi -f {}

