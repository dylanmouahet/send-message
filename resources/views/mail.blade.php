<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    {{-- <link rel="stylesheet" href="{{ asset('assets/css/main.css') }}"> --}}

    <title>MAIL</title>
    <style>
        body {
            padding: 25px;
            background-color: ghostwhite
        }

        .title {
            margin-bottom: 50px;
        }
    </style>

</head>

<body>
    <div class="container">
        <h1 class="text-center text-bold text-primary title">NOUVEAU MESSAGE</h1>
        <div class="row justify-content-md-center">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <p>Nouveau message de: <b>{{ $datas["name"] }}</b> </p>
                        <p>Sujet: <b>{{ $datas["subject"] }}</b></p>
                        <b>Message:</b>
                        <p>{{ $datas["message"] }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
