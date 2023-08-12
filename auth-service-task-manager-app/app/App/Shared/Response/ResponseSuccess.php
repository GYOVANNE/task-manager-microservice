<?php

declare(strict_types=1);

namespace App\App\Shared\Response;

final class ResponseSuccess implements ResponseInterface
{
    private $data;

    private $statusCode;

    public function __construct($data = [], int $statusCode = 200)
    {
        $this->data = $data;
        $this->statusCode = $statusCode;
    }

    public function response()
    {
        $headers = ['Access-Control-Expose-Headers' => 'content-length, server, x-total-count'];

        if (is_countable($this->data)) {
            $headers['X-Total-Count'] = count($this->data);
        }

        return response()->json([
            'status'=>true,
            'data'=>$this->data
        ], $this->statusCode)->withHeaders($headers);
    }
}
