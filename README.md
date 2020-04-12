## Fake SMTP Server

For test and local SMTP server

### Usage

The logs of Nginx are stored in `/srv/JAFSS/nginx/logs`

```bash
docker build --no-cache -f ./frontend/Dockerfile -t mailer-frontend ./frontend
docker build --no-cache -f ./backend/Dockerfile -t mailer-backend ./backend

docker-compose up -d
```
