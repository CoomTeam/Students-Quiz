<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Answer;


class Result extends Model
{
    // I don't think this will be ever used
    public function answers()
    {
        return $this->belongsToMany(Answer::class)->withPivot('coefficient');
    }

    use HasFactory;
}
