# macapp1
# |-public
# | |-css
# | | |-style.css
# | |
# | |-js
# | |  |-index.js
# | |
# | |-html
# | ||-todo.html
# | |
# | |-index.html
# | |
# | |-db
# |  |-db.js
# |
# |-routes
# |
# |-views
# |
# |-docker-entrypoint-initdb.d
# | |-init.sql
# |
# |-.env
# |-Dockerfile
# |-docker-compose.yml
# |
#
#
#
#
#
#
#
#


mkdir public
mkdir public/css
touch public/css/style.css
mkdir public/js
touch public/js/index.js
touch public/index.html
mkdir public/html
touch public/html/todo.html
mkdir routes
mkdir views
mkdir docker-entrypoint-initdb.d
touch docker-entrypoint-initdb.d/init.sql
chmod 755 docker-entrypoint-initdb.d/init.sql
touch Dockerfile
touch docker-compose.yml
touch .env


