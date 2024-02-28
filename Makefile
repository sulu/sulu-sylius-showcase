start-services:
	docker compose up -d

start-sulu:
	cd sulu && symfony server:start -d

start-sulu-consumer:
	cd sulu && symfony run -d --watch=config,src,templates symfony console messenger:consume sulu_sylius_transport -vv

start-sylius:
	cd sylius && symfony server:start -d

install-sulu:
	cd sulu && symfony php bin/console sulu:build dev

install-sylius:
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
	@echo "make synch-taxons"
	@echo "    Synchronizes Sylius Taxons into Sulu Categories."
	@echo " "
	@echo "make synch-products"
	@echo "    Synchronizes Sylius Products into Sulu Articles."
	@echo " "
	@echo "make install-symfony-cli"
	@echo "    Downloads and installs the Symfony CLI."
