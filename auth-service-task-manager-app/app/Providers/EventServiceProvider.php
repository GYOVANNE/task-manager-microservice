<?php

namespace App\Providers;

use App\Jobs\CreateUserJob;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\App;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        App::bindMethod(CreateUserJob::class . '@handle', fn($job) =>  $job->handle());
    }
}
