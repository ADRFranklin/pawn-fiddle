FROM node

# SAMPCTL
COPY sampctl-install-deb-sudo.sh /
RUN dpkg --add-architecture i386 && \
    apt update && \
    apt install -y g++-multilib git ca-certificates && \
    sh /sampctl-install-deb-sudo.sh

# FIREJAIL
RUN DEBIAN_FRONTEND=noninteractive apt install -y firejail

# SA-MP PAWN FIDDLE
WORKDIR /app
COPY package*.json ./
RUN npm install

WORKDIR /app/ui
COPY ./ui/package.json .
COPY ./ui/yarn.lock .
RUN yarn install

WORKDIR /app
COPY . .
RUN npm run compile

WORKDIR /app/ui
RUN yarn build

WORKDIR /app
ENTRYPOINT ["npm", "start"]
