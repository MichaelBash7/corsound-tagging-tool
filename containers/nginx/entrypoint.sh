#!/usr/bin/env sh

#find /etc/nginx/tmpl -type f -name '*.conf' | while read file
#do
#    envsubst "${ENV_VAR_LIST}" < "$file" > /etc/nginx/conf.d/*.conf
#done

exec "$@"
