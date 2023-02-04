<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    {{-- <link rel="stylesheet" href="{{ asset('assets/css/main.css') }}"> --}}

    <title>FORMULAIRE DE CONTACT</title>
    <style>
        body {
            padding: 25px;
            background-color: ghostwhite
        }
        .title{
            margin-bottom: 50px;
        }
    </style>

</head>

<body>
    <div class="container">
        <h1 class="text-center text-bold text-primary title">FORMULAIRE DE CONTACT</h1>

        <div class="alert alert-primary text-center alert-js">

        </div>
        @if (session()->has('msg'))
            <div class="alert alert-{{ session()->get('type') }} text-center">
                {{ session()->get('msg') }}
            </div>
            {{session()->forget('msg')}}
        @endif


        <form action="{{ route('sendMessage') }}" method="post">
            @csrf
            <div class="row justify-content-md-center">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-12">
                            <input type="text" class="form-control" id="name" name="name" placeholder="Nom" >
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-12">
                            <input type="email" class="form-control" id="email" name="email" placeholder="Email" >
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-12">
                            <input type="text" class="form-control" id="subject" name="subject" placeholder="Sujet" >
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-12">
                            <label for="message">Message</label>
                            <textarea name="message" id="message" cols="30" rows="10" class="form-control" ></textarea>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-12">
                            <button type="button" class="btn btn-primary btn-block">ENVOYER</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <script src="{{ asset("assets/js/jquery.min.js") }}"></script>
    <script>
        $(document).ready(function(){
            $(".alert-js").hide();

            $("button").click(function(){
                if (dataVerification()) {
                    $("form").submit();
                }
            });

            function dataVerification()
            {
                if ($("#name").val() == "") {
                    errorMessage("Veuillez entrez votre nom");
                    return false;
                }
                if ($("#email").val() == "") {
                    errorMessage("Veuillez entrez votre email");
                    return false;
                }
                if ($("#subject").val() == "") {
                    errorMessage("Veuillez entrez votre sujet");
                    return false;
                }
                if ($("#message").val() == "") {
                    errorMessage("Veuillez entrez votre message");
                    return false;
                }
                return true;
            }

            function errorMessage(message){
                $(".alert").removeClass("alert-success");
                $(".alert").addClass("alert-danger");
                $(".alert").html(message);
                $(".alert").show();
            }
        })
    </script>
</body>

</html>
