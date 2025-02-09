<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
                // Generate a random title
                'title' => $this->faker->sentence(6),
    
                // Generate random body/content
                'body' => $this->faker->paragraphs(rand(3, 6), true),
    
                // Generate random image
                // 'image' => $this->faker->image('public/storage/images', 640, 480, null, false),
    
                // No user_id defined, so it will be NULL by default
            
        ];
    }
}
