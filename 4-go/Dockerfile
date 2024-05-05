FROM golang:1.19

WORKDIR /app

COPY . .

ENV CGO_ENABLED=1

RUN go mod download

RUN go build -o /docker-gs-ping


EXPOSE 1323
CMD ["/docker-gs-ping"]
