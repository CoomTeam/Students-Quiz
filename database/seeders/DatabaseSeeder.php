<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\QuestionSeeder;
use Database\Seeders\ResultSeeder;
use Database\Seeders\CoefficientSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(QuestionSeeder::class);
        $this->call(ResultSeeder::class);
        $this->call(CoefficientSeeder::class);
    }
}
