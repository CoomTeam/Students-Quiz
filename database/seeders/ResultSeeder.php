<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Result;


class ResultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Result::factory()->count(5)->create();
    }
}
