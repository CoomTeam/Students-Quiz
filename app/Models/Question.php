<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Answer;

class Question extends Model
{
    public function answers() {
        return $this->hasMany(Answer::class);
    }
    
    use HasFactory;
}
