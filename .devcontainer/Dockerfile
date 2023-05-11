FROM qmcgaw/basedevcontainer:v0.19.0-debian

ARG FNM_VERSION=1.33.1
ARG YARN_VERSION=1.22.19

ENV SHELL /bin/zsh
ENV FNM_DIR /root/.fnm
ENV FNM_INTERACTIVE_CLI false

SHELL ["/bin/zsh", "-c"]

# Install Debian packages
RUN dpkg --add-architecture i386 && apt update && apt install -y curl g++-multilib git ca-certificates wget sudo zip gnupg2

# Setup shells
RUN echo "plugins=(vscode git colorize docker docker-compose)" >> /root/.zshrc-specific

# Install Task
RUN sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin && chmod +x /usr/local/bin/task

# Install Sampctl
RUN curl https://raw.githubusercontent.com/Southclaws/sampctl/master/install-deb.sh | sh

# Install fnm
RUN wget -q https://github.com/Schniz/fnm/releases/download/v${FNM_VERSION}/fnm-linux.zip \
    && unzip -j fnm-linux.zip \
    && chmod +x fnm \
    && mv fnm /usr/local/bin/ \
    && fnm install --latest

RUN wget -qO - https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo deb https://dl.yarnpkg.com/debian/ stable main | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get -yqq update && \
    apt-get -yqq install yarn=${YARN_VERSION}-1