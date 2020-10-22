FROM node:11.1

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN npm install --global @vue/cli @vue/cli-init

ADD ./insta-front/app /app
WORKDIR /app

CMD [ "npm" , "run" , "dev" ]