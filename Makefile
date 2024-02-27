start-services:
	docker compose up -d

start-sulu:
	cd sulu && symfony server:start -d

start-sulu-consumer:
	cd sulu && symfony run -d --watch=config,src,templates symfony console messenger:consume sulu_sylius_transport -vv

start-sylius:
	cd sylius && symfony server:start -d

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
	symfony php bin/console sulu-sylius:synchronize:taxon
	symfony php bin/console sulu-sylius:synchronize:products

start: start-services start-sulu start-sylius

log: log-sulu log-sylius log-services

stop: stop-services stop-sulu stop-sylius
