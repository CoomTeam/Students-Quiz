<p align="center">
	<img src="https://github.com/CoomTeam/Students-Quiz/blob/bea748181ad87e26895dba702d7c0b8df3b7bdb0/public/man.png" alt="student" width="128">
</p>

<h3 align="center">Student type quiz</h3>

<p align="center">
    <i>The quiz about finding out</i>
	<i>which student type you are!</i>
</p>

<p align="center">
|<a href="https://github.com/CoomTeam/Students-Quiz/wiki">Wiki</a>|
</p>

## Setting up Laravel project for development


### 1. Clone GitHub repo for this project locally
the project is hosted on GitHub, you can use git on your local computer to clone it from GitHub onto your local computer.

**Note:** Make sure you have git installed locally on your computer first.

```shell script
$ git clone <github-project-url>
```

### 2. cd into your project
You will need to be inside that project file to enter all of the rest of the commands in this tutorial. So remember to 
type `cd project-name` to move your terminal working location to the project file we just barely created. (Of course 
substitute “project-name” in the command above, with the name of the folder you created in the previous step).

### 3. Install Composer Dependencies
Whenever you clone a new Laravel project you must now install all of the project dependencies. This is what actually 
installs Laravel itself, among other necessary packages to get started.

When we run composer, it checks the composer.json file which is submitted to the github repo and lists all of the 
composer (PHP) packages that your repo requires. Because these packages are constantly changing, the source code is 
generally not submitted to github, but instead we let composer handle these updates. So to install all this source code 
we run composer with the following command.

```shell script
$ composer install
```

### 4. Create a copy of your .env file
`.env` files are not generally committed to source control for security reasons. But there is a `.env.example` which is 
a template of the `.env` file that the project expects us to have. So we will make a copy of the `.env.example` file and 
create a `.env` file that we can start to fill out to do things like database configuration in the next few steps.

```shell script
$ cp .env.example .env
```

This will create a copy of the `.env.example` file in your project and name the copy simply `.env`.

### 5. Generate an app encryption key
Laravel requires you to have an app encryption key which is generally randomly generated and stored in your `.env` file. 
app will use this encryption key to encode various elements of your application from cookies to password hashes and 
more.

```shell script
$ php artisan key:generate
```

If you check the `.env` file again, you will see that it now has a long random string of characters in the `APP_KEY` 
field. We now have a valid app encryption key.

### 6. In the .env file, add database information to allow Laravel to connect to the database
We will want to allow Laravel to connect to the database that you just created in the previous step. To do this, we must 
add the connection credentials in the `.env` file and Laravel will handle the connection from there.

In the `.env` file fill in the `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` options to match 
the credentials of the database you want to connect to. This will allow us to run migrations and seed the database in 
the next step.

### 7. Migrate the database
Once your credentials are in the `.env` file, now you can migrate your database.

```shell script
$ php artisan migrate
```

### 8. Seed the database
The repository has a seeding file setup, then now is the time to run the seed, which fills your database with starter 
or dummy data.

After the migrations are complete and you have the database structure required, then you can seed the database (which 
means add dummy data to it).

```shell script
$ php artisan db:seed
```

### 9. Install NPM dependencies
After setting up working Laravel project you should install NPM dependencies. They are used to run Laravel Mix, which compiles SCSS and JS from `resources/` directory to the `public/mix/` directory.

```shell script
$ npm install
```
### 10. Compiling SCSS to CSS

The HTML in the project loads CSS and JS assets from `public/mix/` directory. When you clone the project to your machine, that directory is empty, instead you get SCSS and JS files, which are stored in `resources/js` and `resources/scss` directories. The following command compiles them.
note: SCSS and CSS is like JavaScript and TypeScript.

```shell script
$ npm run dev
```




## About Laravel (test commit)

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[Curotec](https://www.curotec.com/)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
