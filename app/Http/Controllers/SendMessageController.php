<?php

namespace App\Http\Controllers;

use App\Mail\Message;
use App\Models\MessageMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendMessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        // dd($request->all()) ;
        try {
            $is_validate = $request->validate([
                'name' => 'required',
                'email' => 'email|required',
                'subject' => 'required',
                'message' => 'required',
            ]);

            if (!$is_validate) {
                $this->msgFlash("Veuillez renseigner tout les chanps", "danger");
                return redirect()->route("home");
            }

            $message = new MessageMail();
            $message->name = $request->name;
            $message->email = $request->email;
            $message->subject = $request->subject;
            $message->message = $request->message;
            if (!$message->save()) {
                $this->msgFlash("Erreur lors de l'enregistrement dans la base de données", "danger");
                return redirect()->route("home");
            }


            Mail::to($request->email)->queue(new Message($request->all()));
            $this->msgFlash("Message envoyé avec succès", "success");
            return redirect()->route("home");
        } catch (\Throwable $th) {
            // return $th;
            $this->msgFlash("Une erreur s'est produite", "danger");
            return redirect()->route("home");
        }
    }

    private function msgFlash($message, $type = 'success')
    {
        session()->flash('msg', $message);
        session()->flash('type', $type);
    }
}
