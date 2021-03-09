@title Laravel Setup
@echo off

xcopy /f ".env.example" ".env"
composer install
php artisan key:generate --ansi
