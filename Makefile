start-services:
	docker compose up -d

start-sulu:
	cd sulu && symfony server:start -d --port 8000

start-sulu-consumer:
	cd sulu && ulimit -n 2048 && symfony run -d --watch=config,src,templates symfony console messenger:consume sulu_sylius_transport -vv

start-sylius:
	cd sylius && symfony server:start -d --port 8001

install-sulu:
	cd sulu && symfony composer install
	cd sulu && symfony php bin/console sulu:build dev
	cd sulu && npm install && npm run build

install-sylius:
	cd sylius && symfony composer install
	cd sylius && symfony php bin/console sylius:install
	cd sylius && npm install && npm run build

log-services:
	docker compose logs -f

log-sulu:
	cd sulu && symfony server:log

log-sylius:
	cd sylius && symfony server:log

stop-services:
	docker compose down

stop-sulu:
	cd sulu && symfony server:stop

stop-sylius:
	cd sylius && symfony server:stop

synch-taxons:
	cd sylius && symfony php bin/console sulu-sylius:synchronize:taxon

synch-products:
	cd sylius && symfony php bin/console sulu-sylius:synchronize:products

start: start-services start-sulu start-sylius

install: install-sulu install-sylius

log: log-sulu log-sylius log-services

synch: synch-taxons synch-products

stop: stop-services stop-sulu stop-sylius

install-symfony-cli:
	curl -sS https://get.symfony.com/cli/installer | bash
	mv ~/.symfony/bin/symfony /usr/local/bin/symfony

help:
	@echo "Sulu Sylius Showcase Makefile commands:"
	@echo " "
	@echo "make start"
	@echo "    Starts the services. This command runs start-services, start-sulu, and start-sylius."
	@echo " "
	@echo "make install"
	@echo "    Sets up the development environment. This command runs install-sulu and install-sylius."
	@echo " "
	@echo "make log"
	@echo "    Shows the logs. This command runs log-sulu, log-sylius, and log-services."
	@echo " "
	@echo "make stop"
	@echo "    Stops the services. This command runs stop-services, stop-sulu, and stop-sylius."
	@echo " "
	@echo "make start-sulu-consumer"
	@echo "    Starts the Sulu consumer. This command runs the Symfony console messenger to consume the sulu_sylius_transport."
	@echo " "
	@echo "make synch-taxons"
	@echo "    Synchronizes Sylius Taxons into Sulu Categories."
	@echo " "
	@echo "make synch-products"
	@echo "    Synchronizes Sylius Products into Sulu Articles."
	@echo " "
	@echo "make install-symfony-cli"
	@echo "    Downloads and installs the Symfony CLI."
