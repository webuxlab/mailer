## Fake SMTP Server

For test and local SMTP server

### Usage

The logs of Nginx are stored in `/srv/JAFSS/nginx/logs`

```bash
docker build --no-cache -f ./frontend/Dockerfile -t mailer-frontend ./frontend
docker build --no-cache -f ./backend/Dockerfile -t mailer-backend ./backend

docker-compose up -d
```

#### Deploy with Docker and Nginx

Don't forget to update the information according to your setup.

```bash
# On the Local Machine
export IP=1.2.3.4
export USER=root
export EMAIL=test@webuxlab.com

docker save mailer-frontend:latest > mailer-frontend.tar
docker save mailer-backend:latest > mailer-backend.tar

scp docker-compose.yml $USER@$IP:~
scp mailer-frontend.tar $USER@$IP:~
scp mailer-backend.tar $USER@$IP:~
```

```bash
# On the Remote Machine
docker load -i mailer-frontend.tar
docker load -i mailer-backend.tar

docker run --detach \
    --name nginx-proxy \
    --publish 80:80 \
    --publish 443:443 \
    --volume /etc/nginx/certs \
    --volume /etc/nginx/vhost.d \
    --volume /usr/share/nginx/html \
    --volume /var/run/docker.sock:/tmp/docker.sock:ro \
    jwilder/nginx-proxy

docker run --detach \
    --name nginx-proxy-letsencrypt \
    --volumes-from nginx-proxy \
    --volume /var/run/docker.sock:/var/run/docker.sock:ro \
    --env "DEFAULT_EMAIL=$EMAIL" \
    jrcs/letsencrypt-nginx-proxy-companion

docker-compose up -d

```
