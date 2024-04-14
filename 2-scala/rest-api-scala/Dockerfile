FROM adoptopenjdk:11-jdk-hotspot AS base
RUN apt-get update && \
    apt-get install -y curl unzip && \
    apt-get clean

ARG SBT_VERSION=1.9.8

RUN curl -L -o sbt-${SBT_VERSION}.tgz https://github.com/sbt/sbt/releases/download/v${SBT_VERSION}/sbt-${SBT_VERSION}.tgz && \
    tar -zxvf sbt-${SBT_VERSION}.tgz -C /usr/local && \
    rm sbt-${SBT_VERSION}.tgz && \
    ln -s /usr/local/sbt/bin/sbt /usr/local/bin/sbt

FROM base AS builder

WORKDIR /app
COPY . .

ENV PATH="$PATH:/usr/local/sbt/bin"

RUN /usr/local/sbt/bin/sbt compile

FROM alpine:latest
RUN apk --no-cache add openjdk11-jre

COPY --from=builder /app/target /app

WORKDIR /app

EXPOSE 9000

CMD ["java", "-jar", "app.jar"]
