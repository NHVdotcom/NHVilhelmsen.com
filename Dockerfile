FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY web/ /usr/share/nginx/html/

EXPOSE 80
