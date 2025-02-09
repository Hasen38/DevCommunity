<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Web Development',
            'Mobile Development',
            'DevOps',
            'Artificial Intelligence',
            'Cybersecurity',
            'Cloud Computing',
            'Data Science',
            'UI/UX Design'
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
