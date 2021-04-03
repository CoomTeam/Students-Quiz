<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question;
use App\Models\Result;

class Answer extends Model
{
    public function question() {
        return $this->belongsTo(Question::class);
    }

    public function results()
    {
        return $this->belongsToMany(Result::class)->withPivot('coefficient');
    }

    use HasFactory;
}
