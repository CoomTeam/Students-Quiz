<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Result;
use App\Models\Answer;


class CoefficientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $results = Result::all();
        $answers = Answer::all();
        
        foreach ($answers as $answer) {
            foreach ($results as $result) {
                $answer->results()->attach($result, ['coefficient' => rand(0,100)]);
            }
        }
    }
}
