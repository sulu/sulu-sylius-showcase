# Sulu Sylius Showcase

This is a Sulu and Sylius based showcase. It contains an installation of Sulu and Sylius and demonstrates how to
integrate this two systems.

---
**Important:** This project and the predefined `make` commands heavily rely on the Symfony CLI. Ensure it's installed
and available in your PATH. Download it from [here](https://symfony.com/download) or use the `make install-symfony-cli`
command to install it.
---

Following features are implemented:

* Synchronization of Sylius Taxons into Sulu Categories
* Synchronization of Sylius Products into Sulu Articles
* XML-Template of articles in Sulu contains the code, price and meta information of the product
* On the website the user can see the products on the website and can click on them to see the product details
* The user can add products to the cart and see basic information for the cart
* The user can do an example checkout with dummy data

## Installation

Follow the steps below to set up the project on your local machine.

1. Clone the repository to your local machine.

```bash
git clone git@github.com:sulu/sulu-sylius-showcase.git
```

2. Navigate to the project directory.

```bash
cd sulu-sylius-showcase
```

3. Run the Makefile install command. This will set up the development environment and destroy any existing data.

```bash
make install
```

4. Start the services using the Makefile start command.

```bash
make start
```
You can add a new section to your `README.md` file to describe the basic commands from the `Makefile`. Here's how you
can modify it:

## Basic Makefile Commands

This project includes a Makefile with predefined commands for common tasks. Here are some of the basic commands:

- `make start`: Starts the services. This command runs `start-services`, `start-sulu`, and `start-sylius`.

```bash
make start
```

- `make install`: Sets up the development environment. This command runs `install-sulu` and `install-sylius`.

```bash
make install
```

- `make log`: Shows the logs. This command runs `log-sulu`, `log-sylius`, and `log-services`.

```bash
make log
```

- `make stop`: Stops the services. This command runs `stop-services`, `stop-sulu`, and `stop-sylius`.

```bash
make stop
```

- `make synch-taxons`: Synchronizes Sylius Taxons into Sulu Categories.

```bash
make synch-taxons
```

- `make synch-products`: Synchronizes Sylius Products into Sulu Articles.

```bash
make synch-products
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to
us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
