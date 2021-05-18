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
        Result::factory()->create([
			'name' => 'Zombie',
		]);

		Result::factory()->create([
			'name' => 'Sceleton',
		]);

		Result::factory()->create([
			'name' => 'Drowned',
		]);

		Result::factory()->create([
			'name' => 'Slime',
		]);

		Result::factory()->create([
			'name' => 'Blaze',
		]);

		Result::factory()->create([
			'name' => 'Свинозомби',
		]);
    }
}
