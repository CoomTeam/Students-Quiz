<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswerResultTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // This is a table for many-to-many relationship of answers and results.
        // When an answer is chosen by a quiz taker, then every result to which that answer is related
        //  should get an increase of its value. That increase is equal to the coefficient of answer-result relation.
        //  at the end of the quiz, the result with the highest value becomes the final result.
        Schema::create('answer_result', function (Blueprint $table) {
            $table->id();
            // To what answer is that relation
            $table->foreignId('answer_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            // To what result is that relation
            $table->foreignId('result_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            // Coefficient of that relationsip
            $table->tinyInteger('coefficient');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('answer_result');
    }
}
