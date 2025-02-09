<?php

namespace App\Http\Controllers\Auth;

use App\Models\user;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Hash;

class verificationcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
     public function verifyEmail(Request $request)
{
    $user = User::find($request->id);
    if ($user && Hash::check($request->hash, $user->email_verified_at)) {
        $user->markEmailAsVerified();
        return response()->json(['message' => 'Email verified successfully.']);
    }

    return response()->json(['message' => 'Verification failed.'], 400);
}
public function verify($id, $hash)
{
$user = User::find($id);

    if (!$user || !Hash::check($hash, $user->getEmailVerificationToken())) {
        return response()->json(['message' => 'Invalid or expired verification link.'], 400);
    }

    // Mark the user's email as verified
    $user->markEmailAsVerified();
    event(new Verified($user));

    return response()->json(['message' => 'Email successfully verified.'], 200);
}

}
