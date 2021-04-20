<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;
use App\Models\Answer;


class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create 5 quesitons, to each create 3 answers
        Question::factory()->count(5)->has(
            Answer::factory()->count(3)
        )->create();

        // 
        $questions = Question::all()->shuffle();
        foreach($questions as $index => $question) {
            $question->order = $index;
            $question->save();
        }
    }
}
