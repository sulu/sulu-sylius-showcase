# sulu-sylius-showcase

## Synchronization of products and taxons to sulu

How to start the sync between Sylius und Sulu:

```bash
cd sulu
bin/console messenger:consume sulu_sylius_transport -vv
```

```bash
cd sylius
bin/console sulu-sylius:synchronize:taxon
bin/console sulu-sylius:synchronize:products
```
