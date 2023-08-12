<?php

declare(strict_types=1);

namespace App\App\Shared\Response;

use Illuminate\Support\Facades\Log;

final class ResponseError implements ResponseInterface
{
    private $data;

    private $statusCode;

    public function __construct($data = [], int $statusCode = 400)
    {
        $this->data = $data;
        $this->statusCode = $statusCode;
    }

    public function response(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status'=>false,
            'message' => $this->data
        ], $this->statusCode);
    }
}
