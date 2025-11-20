# Quik Ledge

A simple, powerful, and collaborative financial ledger application for tracking personal finances and team expenses. Built with Laravel 12, Inertia.js, and React, Quik Ledge provides complete visibility into your financial health with beautiful visualizations and an intuitive interface.

## Features

- 📊 **Transaction Management**: Track revenue and expenses with detailed descriptions and dates
- 📈 **Financial Analytics**: Visualize your financial data with interactive charts and graphs
- 👥 **Multi-User Support**: Share transactions and collaborate with team members
- 🔐 **Secure Authentication**: Built-in authentication with two-factor authentication (2FA) support
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- 🚀 **Self-Hosted**: Complete control over your data and infrastructure

## Requirements

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL 5.7+ / MariaDB 10.3+ (or SQLite for development)
- Web server (Apache/Nginx) or PHP's built-in server

## Installation

### Quick Start

For a quick setup that installs all dependencies and builds assets:

```bash
git clone https://github.com/OnyxWM/QuikLedge
cd QuikLedge
composer launch
```

This will run `composer install`, `npm install`, and `npm run build` automatically.

### Manual Installation

### 1. Clone the Repository

```bash
git clone https://github.com/OnyxWM/QuikLedge
cd QuikLedge
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node Dependencies

```bash
npm install
```

### 4. Environment Configuration

Create your environment file and configure your application:

```bash
# If .env.example exists, copy it
cp .env.example .env

# Or create .env manually if .env.example doesn't exist
# Then run:
php artisan key:generate
```

### 5. Database Setup

#### Option A: Using SQLite (Default - Development)

The application is configured to use SQLite by default. Simply run the migrations:

```bash
php artisan migrate
```

#### Option B: Using MySQL (Production)

1. Create a MySQL database:

```sql
CREATE DATABASE ledger CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Update your `.env` file with MySQL connection details:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ledger
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

3. Run the migrations:

```bash
php artisan migrate
```

### 6. Build Frontend Assets

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
```

### 7. Start the Development Server

You can use Laravel's built-in development server:

```bash
php artisan serve
```

Or use the convenient development script that runs multiple services:

```bash
composer run dev
```

This will start:
- Laravel development server
- Queue worker
- Log viewer (Pail)
- Vite development server

The application will be available at `http://localhost:8000`.

## MySQL Connection Configuration

To connect to MySQL, update the following variables in your `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ledger
DB_USERNAME=root
DB_PASSWORD=your_password
```

### Additional MySQL Configuration (Optional)

If you need to customize the MySQL connection further, you can add these optional variables:

```env
DB_SOCKET=/path/to/mysql.sock
DB_CHARSET=utf8mb4
DB_COLLATION=utf8mb4_unicode_ci
MYSQL_ATTR_SSL_CA=/path/to/ca-cert.pem
```

After updating your `.env` file, clear the configuration cache:

```bash
php artisan config:clear
```

## Testing

Run the test suite using Pest:

```bash
php artisan test
```

Run specific tests:

```bash
php artisan test --filter=TransactionTest
```

## Code Style

This project uses Laravel Pint for code formatting. Format your code:

```bash
vendor/bin/pint
```

## Technology Stack

- **Backend**: Laravel 12
- **Frontend**: React 19 with Inertia.js v2
- **Styling**: Tailwind CSS v4
- **Authentication**: Laravel Fortify
- **Type Safety**: TypeScript with Wayfinder
- **Testing**: Pest PHP v4
- **Database**: MySQL / MariaDB / SQLite

## License

This project is open-source software licensed under the MIT license.

