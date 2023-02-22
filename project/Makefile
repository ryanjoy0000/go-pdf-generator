PDF_BINARY = pdfServiceApp
# -------------------------------

up: build_pdf
	@echo "stopping docker containers if any..."
	docker-compose down
	@echo "building and starting all services..."
	docker-compose up --build

down:
	@echo "Stopping docker-compose..."
	docker-compose down

# -------------------------------

build_pdf:
	@echo "current working directory"
	pwd
	@echo "building pdf service -> binary ..."
	cd ../pdf-service && env CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -o ${PDF_BINARY} .

	