build:
	docker build -t elif_tech_back .

run:
	docker run -d -p 4000:9999 --name elif_tech_back --rm elif_tech_back

stop:
	docker stop elif_tech_back
