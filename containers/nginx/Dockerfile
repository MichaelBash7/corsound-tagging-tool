FROM nginx:1.15-alpine

ARG host_group_id
ARG host_user_id

RUN set -x \
    && addgroup -g ${host_group_id} -S www-data \
    && adduser -u ${host_user_id} -D -S -G www-data www-data \
    && apk update \
    && apk add --no-cache --virtual .buildDeps \
        tzdata \
    && apk add --no-cache --virtual .runtimeDeps \
        curl \
    && cp /usr/share/zoneinfo/Israel /etc/localtime \
    && echo Israel > /etc/timezone \
    && apk del \
        .buildDeps \
    && rm -rf /var/cache/apk/* /var/tmp/* /tmp/*
