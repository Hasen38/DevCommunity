<?php

namespace App\Http\Controllers;
use App\Models\User;

// use i\Http\Controllers\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;

class Authcontroller extends Controller
{
    public function register(Request $request)
    {
        try{
        $fields = $request->validate([
            "name"=> "required",
            "email"=> "required|email|unique:users",
            "password"=> "required|confirmed",
        ],);
            
            $user= user::create($fields);
            // event(new Registered($user));
            $token= $user->createToken($request->name)->plainTextToken;
            return response()->json( [
                "token"=> $token,
                "user" =>$user
            ],201);
      } catch (\Exception $e) {
            return response()->json(['error' => 'Registration failed', 'message' => $e->getMessage()], 500);
        }
    }
            

    public function login(Request $request)
    {
         $validated = Validator::make($request->all(),
         [ "email"=> "required|exists:users",
           "password"=> "required"
         ]);
         if($validated->fails()){
            return response()->json($validated->errors(),422);
         }      
           $credentials = ['email'=>$request->email,'password'=>$request->password];
           try{
            if (!Auth::attempt($credentials)) {
                return response()->json(['error'=>'Invalid credentials'],403);  
            }
            $user=User::where('email',$request->email)->firstorFail();
            $token=$user->CreateToken($request->email)->plainTextToken;
            return response()->json([
                'token'=> $token,
                'user'=>$user
                ],200);
           }     
           catch(\Exception $e){
            return response()->json(['error'=>$e->getMessage()],403);

           }
        }


  public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();
    return response()->json(['success'=> 'User has been logged out succesfully'],200);
}

}
