<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Request;

class Forgetpasswordcontroller extends Controller
{
    // app/Http/Controllers/Auth/ForgotPasswordController.php



    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // Send password reset link
        $response = Password::sendResetLink($request->only('email'));

        return $response === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Reset link sent to your email.'], 200)
            : response()->json(['error' => 'Failed to send reset link.'], 400);
    }
}

    public function reset(){
            
    }
}
