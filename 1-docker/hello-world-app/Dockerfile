FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y openjdk-8-jdk && \
    apt-get install -y kotlin && \
    apt-get clean

RUN apt-get install -y curl && \
    curl -s "https://get.sdkman.io" | bash && \
    bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install gradle"

WORKDIR /app

COPY . /app

CMD ["gradle", "run"]
